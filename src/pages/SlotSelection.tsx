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
interface SlotItem {
  course: any[];
  slots: any[]; // Adjust the type of slots based on your data structure
  timings: []
}
const SlotSelection: React.FC = () => {
  const { isLoading, startLoading, stopLoading } = useLoading();
  const [loadingMessage, setLoadingMessage] = useState<string>('Loading....');
  const { userData } = useAuth();
  const selectedSlotData = localStorage.getItem('selectedSlots');
  const parsedData = selectedSlotData ? JSON.parse(selectedSlotData) : [];
  const [slotList, setSlotList] = useState<SlotItem[]>([]);
  const history = useHistory();
  const queryParams: any = history.location.state;
  const [selectedSlot, setSelectedSlot] = useState<any[]>([]);
  const [courseList, setCourseList] = useState<any[]>([]);
  const [selectedSlotTimings, setSelectedSlotTimings] = useState<any[]>([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<any[]>([]);

  useEffect(() => {
    console.log(userData);
    if (queryParams) {
      setCourseList(queryParams.courses);
      console.log(queryParams);
      queryParams.courses.map((course: any) => {
        getSlots(course);
      });
    } else {
      alert('No course data found')
    }
    //getSlots();
  }, []);

  const getSlots = async (course: any) => {
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
        "tbl_slot_bookings.course_id": course.id
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
        let newItem: SlotItem = {
          course: course,
          slots: response.data,
          timings: []
        }
        setSlotList((prevItems) => {
          const isDuplicate = prevItems.some((item) => item.course === newItem.course);

          if (isDuplicate) {
            return prevItems.map((item) =>
              item.course === newItem.course ? { ...item, slots: newItem.slots, timings: [] } : item
            );
          }
          return [...prevItems, newItem];
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
      console.log(slotList);
      stopLoading();
    }
  }
  useEffect(() => {
    console.log('Updated selectedItems:', slotList);
  }, [slotList]);

  const proceed = async () => {
    if (selectedTimeSlot.length == 0) {
      toast.dismiss();
      toast.error('Please select slot for respective courses');
      return;
    }
    let errors = 0;
    
    slotList.forEach((course: any) => {
      console.log(course);
      const isSlotSelected = selectedTimeSlot.some(
        (item) => item.course_id === course.course.id
      );

      if (!isSlotSelected) {
        errors++;
        toast.dismiss();
        toast.error(`Please select a slot for ${course.course.course_name}`); // Assuming course name is in `course.course.name`
        return; // Exit the function immediately
      }
    });
    //return;
    let payload: any = selectedTimeSlot;
    // payload.push({
    //   slot_time_id: selectedTimeSlot,
    //   user_id: userData.id
    // })
    if(errors == 0){
      try {
        startLoading();
        const response = await bookSlot(payload);
        console.log("Details", response);
        if (response.status == 201 && response.success) {
          console.log(response);
          toast.dismiss();
          toast.success(response.message);
          history.push({
            pathname: "/",
            state: {  }
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
    }
  };

  const viewSlotDetails = async (slot: any, course_id: any) => {
    console.log(slot);

    let newItem: any = {
      course_id: course_id,
      slot_id: slot.slot_id
    }
    setSelectedSlot((prevItems) => {

      const filteredItems = prevItems.filter((item) => item.course_id !== newItem.course_id);
      return [...filteredItems, newItem];

    });
    setSlotList((prevItems) => {
      const isDuplicate = prevItems.some((item: any) => item.course.id === course_id);
      if (isDuplicate) {
        return prevItems.map((item: any) =>
          item.course.id === course_id ? { ...item, timings: slot.timings } : item
        );
      }
      return [...prevItems, newItem];
    });
    console.log(slotList);
  }
  const isSlotSelected = (course_id: any, slot_id: any) => {
    return (selectedSlot || []).find((item: any) => item.course_id === course_id && item.slot_id === slot_id) !== undefined;
  };
  const isTimeSlotSelected = (slot_time_id: any) => {
    return (selectedTimeSlot || []).find((item: any) => item.slot_time_id === slot_time_id) !== undefined;
  };
  const setTimeSlot = async (timeSlot: any, course_id: any, slot_id: any) => {
    if (timeSlot.no_of_attendees - timeSlot.attendees_booked > 0) {
      let newItem: any = {
        course_id: course_id,
        slot_id: slot_id,
        slot_time_id: timeSlot.slot_time_id,
        user_id: userData.id,
      };
      setSelectedTimeSlot((prevItems) => {
        const filteredItems = prevItems.filter((item) => item.course_id !== newItem.course_id);
        return [...filteredItems, newItem];
      });

      console.log(selectedTimeSlot);
    } else {
      toast.dismiss();
      toast.error("Slot full. Please select another time slot.");
      return;
    }
  };

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
          {slotList && slotList.length > 0 && slotList.map((slot: any, index: any) => (
            <div className="bgSvg">
              <div className="dateSelectionCard">
                <h3>{slot.course.course_name}</h3>

                <Swiper slidesPerView={4} loop={false}>
                  {slot.slots && slot.slots.length > 0 && slot.slots.map((data: any, index: any) => (
                    <SwiperSlide>
                      <IonCard className={isSlotSelected(slot.course.id, data.slot_id) ? "selectedDate" : ""} onClick={(event) => viewSlotDetails(data, slot.course.id)}>
                        <IonText><h6>{data.slot_start}</h6> <p>to</p> <h6>{data.slot_end}</h6></IonText>
                      </IonCard>
                    </SwiperSlide>
                  ))}
                  {/* ExtraSwiperSlide */}
                  <SwiperSlide></SwiperSlide>
                  {/* ExtraSwiperSlide */}
                </Swiper>
              </div>
              {slot.timings && slot.timings.length > 0 && (
                <IonCard className="timeSelecationCard">
                  <h3>Select Time</h3>
                  <IonGrid>
                    <IonRow>
                      {slot.timings.map((timing: any, index: any) => (
                        <IonCol size="4" ><IonCard className={isTimeSlotSelected(timing.slot_time_id) ? "selectedTime" : ""} onClick={(event) => setTimeSlot(timing, slot.course.id, timing.slot_id)}><h4>{timing.start_time} - {timing.end_time}</h4></IonCard></IonCol>
                      ))}
                    </IonRow>
                  </IonGrid>
                </IonCard>
              )}
              {!selectedSlot && slot.timings && slot.timings.length == 0 && (
                <NoDataFound message="Please select the slot" />
              )}
              {selectedSlot && slot.timings && slot.timings.length == 0 && (
                <NoDataFound message="No Time slots available. Please select other slot" />
              )}

            </div>
          ))}
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

export default SlotSelection;

