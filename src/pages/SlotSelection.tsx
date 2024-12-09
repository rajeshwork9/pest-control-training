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
  IonFooter,
  IonicSlides,
  IonRow,
  IonCol,
  IonGrid,


} from "@ionic/react";
import { useHistory } from 'react-router';
import Loader from '../components/Loader';
import { ribbon, checkmark } from 'ionicons/icons';
import useLoading from '../components/useLoading';
import { bookSlot, getSlotAvailability } from '../api/common';
import { toast } from 'react-toastify';
import { useAuth } from '../api/AuthContext';
import NoDataFound from '../components/NoDataFound';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import '@ionic/react/css/ionic-swiper.css';

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
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<number>(0);

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
        "tbl_slot_bookings.created_on": "DESC"
      },
      "filters": {
        "tbl_slot_bookings.course_id": 2
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

  const handleSlotChange = async (event: any, data: any) => {
    const { value, checked } = event.target;
    console.log(data);
    if (userData.user_type == 17) {
      setSelectedSlot([]);
    }
    setSelectedSlot((prevSelectedItems) => {
      if (checked) {
        const isSelected = selectedSlot.find((item: any) => item.id == data.id);
        // Add the item if it's checked and not already in the array
        if (!isSelected) {
          return [...prevSelectedItems, data];
        } else {
          return [...prevSelectedItems]
        }

      } else {
        // Remove the item if it's unchecked
        return prevSelectedItems.filter((item: any) => item.id !== data.id);
      }
    });
  };
  useEffect(() => {
    console.log('Updated selectedItems:', selectedSlot);
  }, [selectedSlot]);

  const proceed = async () => {
    if (selectedTimeSlot == 0) {
      toast.dismiss();
      toast.error('Please select atleast one slot');
      return;
    }
    let payload: any = [];
    payload.push({
      slot_time_id: selectedTimeSlot,
      user_id: userData.id
    }
    )
    try {
      startLoading();
      const response = await bookSlot(payload);
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
  };

  const isItemSelected = (itemId: string) => {
    console.log(selectedSlot);
    return (selectedSlot || []).find((item: any) => item.id === itemId) !== undefined;
  };
  const viewSlotDetails = async (slot: any) => {
    console.log(slot);
    setSelectedSlot(slot);
    setSelectedSlotTimings(slot.timings);
  }
  const setTimeSlot = async (timeSlot: any) => {
    console.log(timeSlot);
    if ((timeSlot.no_of_attendees - timeSlot.attendees_booked) > 0) {
      setSelectedTimeSlot(timeSlot.slot_time_id);
    } else {
      toast.dismiss();
      toast.error('Slot full.Please select other time slot');
      return;
    }
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
        <IonContent fullscreen className="colorBg">
          <IonImg className="topbg" src="./assets/images/top-bg.svg"></IonImg>
          <div className="bgSvg">
       
            <div className="dateSelectionCard">
              <h3>Select Date</h3>

                <Swiper slidesPerView={4} loop={false}>
                  <SwiperSlide>
                    <IonCard>
                    <IonText><h6>10 DEC 2024</h6> <p>to</p> <h6>17 DEC 2024</h6></IonText>
                    </IonCard>
                  </SwiperSlide>

                  <SwiperSlide>
                    <IonCard className="selectedDate">
                    <IonText><h6>10 DEC 2024</h6> <p>to</p> <h6>17 DEC 2024</h6></IonText>
                    </IonCard>
                  </SwiperSlide>

                  <SwiperSlide>
                    <IonCard>
                    <IonText><h6>10 DEC 2024</h6> <p>to</p> <h6>17 DEC 2024</h6></IonText>
                    </IonCard>
                  </SwiperSlide>

                  <SwiperSlide>
                    <IonCard>
                    <IonText><h6>10 DEC 2024</h6> <p>to</p> <h6>17 DEC 2024</h6></IonText>
                    </IonCard>
                  </SwiperSlide>

                  <SwiperSlide>
                    <IonCard>
                    <IonText><h6>10 DEC 2024</h6> <p>to</p> <h6>17 DEC 2024</h6></IonText>
                    </IonCard>
                  </SwiperSlide>

                      {/* ExtraSwiperSlide */}
                          <SwiperSlide></SwiperSlide>
                      {/* ExtraSwiperSlide */}
                </Swiper>
            </div>

            <div className="timeSelecationCard">
              <h3>Select Time</h3>
            <IonGrid>
              <IonRow>
                  <IonCol size="4" ><IonCard><h4>09AM To 06PM</h4></IonCard></IonCol>
                  <IonCol size="4"><IonCard><h4>09AM To 06PM</h4></IonCard></IonCol>
                  <IonCol size="4"><IonCard className="selectedTime"><h4>09AM To 06PM</h4></IonCard></IonCol>
                  <IonCol size="4"><IonCard><h4>09AM To 06PM</h4></IonCard></IonCol>
                  <IonCol size="4"><IonCard><h4>09AM To 06PM</h4></IonCard></IonCol>
              </IonRow>
              </IonGrid>
         
              

            </div>
        

 
         



              {/* <IonList className="slotsItem" lines="none">
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
              </IonList> */}

       
          </div>
        </IonContent>
        {isLoading && <Loader message={loadingMessage} />}

        <IonFooter>
          <IonToolbar>
            <IonButton onClick={(event) => proceed()} shape="round" expand="block" color="primary" >Book slot</IonButton>
          </IonToolbar>
        </IonFooter>
      </IonPage>
    </>
  );
};

export default SlotSelection;

