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
import { ribbon, checkmark, create } from 'ionicons/icons';
import useLoading from '../components/useLoading';
import { bookSlot, getSlotAvailability } from '../api/common';
import { toast } from 'react-toastify';
import { useAuth } from '../api/AuthContext';
import NoDataFound from '../components/NoDataFound';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import '@ionic/react/css/ionic-swiper.css';
const CorporateSlotSelection: React.FC = () => {
  const { isLoading, startLoading, stopLoading } = useLoading();
  const [loadingMessage, setLoadingMessage] = useState<string>('Loading....');
  const { userData } = useAuth();
  const selectedSlotData = localStorage.getItem('selectedSlots');
  const parsedData = selectedSlotData ? JSON.parse(selectedSlotData) : [];
  const [slotList, setSlotList] = useState<any[]>([]);
  const history = useHistory();
  const queryParams: any = history.location.state;
  const [userList, setUserList] = useState<any[]>([]);
  const [courseId, setCourseId] = useState<number>(0);
  const [selectedSlot, setSelectedSlot] = useState<number>(0);
  const [selectedSlotTimings, setSelectedSlotTimings] = useState<any[]>([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<number>(0);

  useEffect(() => {
    console.log(userData);
    if (queryParams) {
      setUserList(queryParams.users);
      setCourseId(queryParams.course_id);
      console.log(queryParams);
    } else {
      alert('No Payment data found')
    }
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
        "tbl_slot_bookings.course_id": queryParams.course_id
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
    userList.map((user: any) =>
      payload.push({
        slot_time_id: selectedTimeSlot,
        user_id: user.id
      })
    );

    try {
      startLoading();
      const response = await bookSlot(payload);
      console.log("Leave Details", response);
      if (response.status == 201 && response.success) {
        console.log(response);
        //setSlotList(response.data);
        toast.dismiss();
        toast.success(response.message);
        history.push({
          pathname: "/corporate-dashboard",
          state: {}
        });
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

  const viewSlotDetails = async (slot: any) => {
    console.log(slot);
    setSelectedSlot(slot.slot_id);
    setSelectedSlotTimings(slot.timings);
    setSelectedTimeSlot(0);
  }

  const setTimeSlot = async (timeSlot: any) => {
    console.log(timeSlot);
    if ((timeSlot.no_of_attendees - timeSlot.attendees_booked) >= userList.length) {
      setSelectedTimeSlot(timeSlot.slot_time_id);
    } else {
      toast.dismiss();
      toast.error('Slot full.Please select other time slot');
      return;
    }
  }
  const viewCourseDetails = async () => {
    history.push({
        pathname: "/corporate-selected-courses-details",
        state: { id: queryParams.course_id }
    });
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
        <IonContent fullscreen className="paymentDetails colorBg">
          <IonImg className="topbg" src="./assets/images/top-bg.svg"></IonImg>
          {slotList && slotList.length > 0 &&
            <div className="bgSvg">
              <IonCard className="totalPaymentCard">
                <IonText>
                  <p>Selected Total Users</p>
                  <div className="d-flex ion-justify-content-between">
                    <h2>{userList.length}</h2>
                    <IonButton shape="round" onClick={(event) => viewCourseDetails()} size="small" color="primary"><IonIcon icon={create}></IonIcon> Edit</IonButton>
                  </div>
                  </IonText>
              </IonCard>
              <div className="dateSelectionCard">
                <h3>Select Date</h3>
                <Swiper slidesPerView={4} loop={false}>
                  {slotList && slotList.length > 0 && slotList.map((data: any, index: any) => (
                    <SwiperSlide>
                      <IonCard className={selectedSlot == data.slot_id ? "selectedDate" : ""} onClick={(event) => viewSlotDetails(data)}>
                        <IonText><h6>{data.slot_start}</h6> <p>to</p> <h6>{data.slot_end}</h6></IonText>
                      </IonCard>
                    </SwiperSlide>
                  ))}
                  {/* ExtraSwiperSlide */}
                  <SwiperSlide></SwiperSlide>
                  {/* ExtraSwiperSlide */}
                </Swiper>
              </div>
              {selectedSlotTimings && selectedSlotTimings.length > 0 && (
                <IonCard className="timeSelecationCard">
                  <h3>Select Time</h3>
                  <IonGrid>
                    <IonRow>
                      {selectedSlotTimings.map((timing: any, index: any) => (
                        <IonCol size="4" ><IonCard disabled={(timing.no_of_attendees - timing.attendees_booked) >= userList.length ? false : true} className={timing.slot_time_id == selectedTimeSlot ? "selectedTime" : ""} onClick={(event) => setTimeSlot(timing)}><h4>{timing.start_time} - {timing.end_time}</h4></IonCard></IonCol>
                      ))}
                    </IonRow>
                  </IonGrid>
                </IonCard>
              )}
              {!selectedSlot && selectedSlotTimings && selectedSlotTimings.length == 0 && (
                <NoDataFound message="Please select the slot" />
              )}
              {selectedSlot && selectedSlotTimings && selectedSlotTimings.length == 0 && (
                <NoDataFound message="No Time slots available. Please select other slot" />
              )}
            </div>
          }
          {slotList && slotList.length === 0 &&
            <NoDataFound message="Oops! Nothing to display here." />
          }
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
export default CorporateSlotSelection;
