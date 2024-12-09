import React, { useEffect, useState } from 'react';
import {
  IonButton,
  IonCheckbox,
  IonContent,
  IonHeader,
  IonImg,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
  IonCard,
  IonButtons,
  IonBackButton,
  IonIcon,
  IonThumbnail,
  IonList,
  IonFooter
} from "@ionic/react";
import { useHistory } from 'react-router';
import Loader from '../components/Loader';
import { ribbon, checkmark } from 'ionicons/icons';
import useLoading from '../components/useLoading';
import { getSlotAvailability } from '../api/common';
import { toast } from 'react-toastify';
import { useAuth } from '../api/AuthContext';
import NoDataFound from '../components/NoDataFound';

const SlotSelection: React.FC = () => {
  const { isLoading, startLoading, stopLoading } = useLoading();
const [loadingMessage, setLoadingMessage] = useState<string>('Loading....');
  const { userData } = useAuth(); 
  const selectedSlotData = localStorage.getItem('selectedSlots');
  const parsedData = selectedSlotData ? JSON.parse(selectedSlotData) : [];
  const [slotList, setSlotList] = useState<any[]>([]);
  const history = useHistory();
  const [selectedSlot, setSelectedSlot] = useState<any[]>(Array.isArray(parsedData) ? parsedData : []);
  const [selectedSlotTimings, setSelectedSlotTimings] = useState<any[]>(Array.isArray(parsedData) ? parsedData : []);

  useEffect(() => {
    console.log(userData);
    getSlots();
  }, []);

  const getSlots = async () => {
    let payload = {
        "columns": [
            "tbl_slot_bookings.id as slot_id",
            "tbl_slot_bookings.slot_name",
            "tbl_slot_bookings.slot_start",
            "tbl_slot_bookings.slot_end",
            "tbl_slot_bookings.total_attendees",
            "tbl_slot_timings.id as slot_time_id",
            "tbl_slot_timings.start_time",
            "tbl_slot_timings.end_time",
            "tbl_slot_timings.no_of_attendees",
            "tbl_slot_timings.attendees_booked",
            "tbl_status.status_name"
        ],
        "order_by": {
           "tbl_slot_bookings.created_on":"DESC"
        },
        "filters": {
            "tbl_slot_bookings.course_id":2
        },
        "pagination": {
            "limit": "10",
            "page": "1"
        }
    }
    
    

    try {
      startLoading();
      const response = await getSlotAvailability(payload);
      console.log("Leave Details", response);
      if (response.status == 200 && response.success) {
        console.log(response);
        setSlotList(response.data);
      }
      else {
        toast.dismiss();
        toast.error(response.message);
      }
    }
    catch (error: any) {
      console.error("Error fettching the leaves:", error);
    }
    finally {
      stopLoading();
    }
  }

  const handleSlotChange = async (event: any,data : any) => {
    const { value, checked } = event.target;
    console.log(data);
    if(userData.user_type == 17){
      setSelectedSlot([]);
    }
    setSelectedSlot((prevSelectedItems) => {
      if (checked) {
        const isSelected = selectedSlot.find((item : any) => item.id == data.id);
        // Add the item if it's checked and not already in the array
        if(!isSelected){
          return [...prevSelectedItems, data];
        }else{
          return [...prevSelectedItems]
        }
        
      } else {
        // Remove the item if it's unchecked
        return prevSelectedItems.filter((item : any) => item.id !== data.id);
      }
    });
  };
  useEffect(() => {
    console.log('Updated selectedItems:', selectedSlot);
  }, [selectedSlot]);

  const proceed = async () => {
    if(selectedSlot.length == 0){
      toast.dismiss();
      toast.error('Please select atleast onr slot');
      return;
    }
    selectedSlot.map((slot) =>{
      slot.properties.map((property :any)=>{
        property.isChecked = true;
        if(property.id == 1){
          property.price = slot.slot_price;
        }
        if(property.id == 2){
          property.price = slot.exam_price;
        }
        if(property.id == 3){
          property.price = slot.license_price;
        }
      });
      slot.total = slot.properties.reduce((accumulator : any, currentItem : any) => {
        return accumulator + parseInt(currentItem.price);
      }, 0);
      slot.total = parseFloat(slot.total).toFixed(2);
  });
    if(selectedSlot.length == 1 && userData.user_type == 17){
      localStorage.setItem('selectedSlot',JSON.stringify(selectedSlot[0]));
      history.push("/select-user");
    }else{
      localStorage.setItem('selectedSlots',JSON.stringify(selectedSlot));
      history.push("/payment-details");
      
    }  
  };

  const isItemSelected = (itemId: string) => {
    console.log(selectedSlot);
    return (selectedSlot || []).find((item : any) => item.id === itemId) !== undefined;
  };
  const viewSlotDetails = async (slot : any) => {
    console.log(slot);
    setSelectedSlot(slot);
    setSelectedSlotTimings(slot.timings);
    
  }
  return (
    <>
      <IonPage>

        <IonHeader className="ion-header">
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton></IonBackButton>
            </IonButtons>
            <IonTitle>Select slots of interest</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen className="colorBg enrollSlotsWrapp">
          <IonImg className="topbg" src="./assets/images/top-bg.svg"></IonImg>
          <div className="bgSvg">
            <div className="ion-margin">
              <IonList className="slotsItem" lines="none">
                {slotList && slotList.length > 0 && slotList.map((data: any, index: any) => (
                  <IonItem  key={`${index}-key`} className={isItemSelected(data.id) ? "itemActive" : ""}>
                    <IonText className="enrollSlotsText">
                      <div className="detailsArrow">
                        <h3 onClick={(event) => viewSlotDetails(data)}>{data.slot_id}</h3>
                        {data.timings && data.timings.length > 0 && data.timings.map((timing: any, index: any) => (
                        <IonButton className={isItemSelected(data.id) ? "itemActive" : ""} onClick={(event) => viewSlotDetails(data)}>
                          {timing.start_time} - {timing.end_time}
                        </IonButton>
                         ))}
                      </div>

                      <p>{data.description}</p>
                    </IonText>
                  </IonItem>
                ))}
                {slotList && slotList.length === 0 &&
                    <NoDataFound message="Oops! Nothing to display here." />
                }
              </IonList>

            </div>
          </div>
        </IonContent>
        {isLoading && <Loader message={loadingMessage} />}

        <IonFooter>
          <IonToolbar>
            <IonButton onClick={(event) => proceed()} shape="round" expand="block" color="primary" >Continue</IonButton>
          </IonToolbar>
        </IonFooter>
      </IonPage>
    </>
  );
};

export default SlotSelection;

