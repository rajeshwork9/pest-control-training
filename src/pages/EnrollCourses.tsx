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
import { ribbon, checkmark } from 'ionicons/icons';
import useLoading from '../components/useLoading';
import { getCourseList } from '../api/common';
import { toast } from 'react-toastify';
import { useAuth } from '../api/AuthContext';

const EnrollCourses: React.FC = () => {
  const { isLoading, startLoading, stopLoading } = useLoading();
  const { userData } = useAuth(); 
  const selectedCourseData = localStorage.getItem('selectedCourses');
  const parsedData = selectedCourseData ? JSON.parse(selectedCourseData) : [];
  const [courseList, setCourseList] = useState<any[]>([]);
  const history = useHistory();
  const [selectedCourses, setSelectedCourses] = useState<any[]>(Array.isArray(parsedData) ? parsedData : []);


  useEffect(() => {
    console.log(userData);
    getCoursesList();
  }, []);

  const getCoursesList = async () => {
    let payload = {
      "columns": [
        "tbl_courses.id",
        "tbl_courses.course_name",
        "tbl_courses.course_price",
        "tbl_courses.exam_price",
        "tbl_courses.license_price",
        "tbl_courses.description",
        "tbl_status.status_name"
      ],
      "order_by": {
        "tbl_courses.created_on": "desc"
      },
      "filters": {},
      "pagination": {
        "limit": "10",
        "page": "1"
      }
    }

    try {
      startLoading();
      const response = await getCourseList(payload);
      console.log("Leave Details", response);
      if (response.status == 200 && response.success) {
        console.log(response);
        setCourseList(response.data);
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

  const handleCourseChange = async (event: any,data : any) => {
    const { value, checked } = event.target;
    console.log(data);
    if(userData.user_type == 17){
      setSelectedCourses([]);
    }
    setSelectedCourses((prevSelectedItems) => {
      if (checked) {
        const isSelected = selectedCourses.find((item : any) => item.id == data.id);
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
    console.log('Updated selectedItems:', selectedCourses);
  }, [selectedCourses]);

  const proceed = async () => {
    if(selectedCourses.length == 0){
      toast.dismiss();
      toast.error('Please select atleast onr course');
      return;
    }
    selectedCourses.map((course) =>{
      course.properties.map((property :any)=>{
        property.isChecked = true;
        if(property.id == 1){
          property.price = course.course_price;
        }
        if(property.id == 2){
          property.price = course.exam_price;
        }
        if(property.id == 3){
          property.price = course.license_price;
        }
      });
      course.total = course.properties.reduce((accumulator : any, currentItem : any) => {
        return accumulator + parseInt(currentItem.price);
      }, 0);
      course.total = parseFloat(course.total).toFixed(2);
  });
    if(selectedCourses.length == 1 && userData.user_type == 17){
      localStorage.setItem('selectedCourse',JSON.stringify(selectedCourses[0]));
      history.push("/select-user");
    }else{
      localStorage.setItem('selectedCourses',JSON.stringify(selectedCourses));
      history.push("/payment-details");
      
    }  
  };

  const isItemSelected = (itemId: string) => {
    console.log(selectedCourses);
    return (selectedCourses || []).find((item : any) => item.id === itemId) !== undefined;
  };
  const viewCourseDetails = async (course : any) => {
    console.log(course);
    course.properties.map((property :any)=>{
      property.isChecked = true;
      if(property.id == 1){
        property.price = course.course_price;
      }
      if(property.id == 2){
        property.price = course.exam_price;
      }
      if(property.id == 3){
        property.price = course.license_price;
      }
    });
    course.total = course.properties.reduce((accumulator : any, currentItem : any) => {
      return accumulator + parseInt(currentItem.price);
    }, 0);
    course.total = parseFloat(course.total).toFixed(2);
    console.log(course);
    history.push({
      pathname: "/enroll-courses-details",
      state: { from: 'courseList', data: course }
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
            <IonTitle>Select courses of interest</IonTitle>
          </IonToolbar>
        </IonHeader>


        <IonContent fullscreen className="colorBg enrollCoursesWrapp">
          <IonImg className="topbg" src="./assets/images/top-bg.svg"></IonImg>
          <div className="bgSvg">
            <div className="ion-margin">
              <IonList className="coursesItem" lines="none">
                {courseList && courseList.length > 0 && courseList.map((data: any, index: any) => (
                  <IonItem  key={`${index}-key`} className={isItemSelected(data.id) ? "itemActive" : ""}>
                    <IonThumbnail slot="start">
                      <IonIcon icon={ribbon}></IonIcon>
                      <div className="checkmark">
                        {/* <IonIcon icon={checkmark}></IonIcon> */}
                        <IonCheckbox className='custom-checkbox' value={data.id} checked={isItemSelected(data.id)} onIonChange={(event) => handleCourseChange(event, data)}></IonCheckbox></div>
                    </IonThumbnail>
                    <IonText>
                      <div className="detailsArrow">
                        <h3>{data.course_name}</h3>
                        <IonButton className="detailsArrowIcon" onClick={(event) => viewCourseDetails(data)}>
                          <IonImg src="./assets/images/details-arrow-icon.svg"></IonImg>
                        </IonButton>
                      </div>

                      <p>{data.description}</p>
                    </IonText>
                  </IonItem>
                ))}
              </IonList>

            </div>
          </div>
        </IonContent>

        <IonFooter>
          <IonToolbar>
            <IonButton onClick={(event) => proceed()} shape="round" expand="block" color="primary" >Continue</IonButton>
          </IonToolbar>
        </IonFooter>
      </IonPage>
    </>
  );
};

export default EnrollCourses;

