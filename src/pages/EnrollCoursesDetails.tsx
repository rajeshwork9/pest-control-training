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
  IonRow,
  IonCol,
} from "@ionic/react";
import { useHistory } from 'react-router';
import Loader from '../components/Loader';
import { ribbon, checkmark } from 'ionicons/icons'
import { useAuth } from '../api/AuthContext';
import useLoading from '../components/useLoading';
const EnrollCoursesDetails: React.FC = () => {

  const history = useHistory();
  const app_version: any = localStorage.getItem('app_version');
  const app_name: any = localStorage.getItem('app_name');
  const { login } = useAuth();
  const { isLoading, startLoading, stopLoading } = useLoading();
  const [loadingMessage, setLoadingMessage] = useState<string>('Loading....');
  const queryParams: any = history.location.state;
  const selectedCourseData = queryParams.data;
  const [courseData, setCourseData] = useState<any>(selectedCourseData ? selectedCourseData : []);

  useEffect(() => {
    console.log(courseData);
  }, []);


  return (
    <>
      <IonPage>
        <IonHeader className="ion-header">
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton></IonBackButton>
            </IonButtons>
            <IonTitle>Course Details</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen className="colorBg coursesDetailsWrapp">
          <IonImg className="topbg" src="./assets/images/top-bg.svg"></IonImg>
          <div className="bgSvg">
            <IonList className="coursesDHeader" lines="none">
              <IonItem className="itemActive">
                <IonThumbnail slot="start">
                  <IonIcon icon={ribbon}></IonIcon>
                </IonThumbnail>
                <IonText>
                  <h3>{courseData.course_name}</h3>
                  <p>{courseData.description}</p>

                </IonText>
              </IonItem>
            </IonList>
            <div className="coursePrice ion-padding-horizontal">
              <IonRow>
                {courseData.properties && courseData.properties.length > 0 && courseData.properties.map((res: any, propertyIndex: any) => (
                  <IonCol key={`${courseData.id}-${res.name}`}> <IonText><h6>{res.property} Price</h6><h3>{res.price} <span>AED</span></h3> </IonText></IonCol>
                ))}
              </IonRow>
            </div>
            <div className="ion-margin">
              <IonText className="daysCourse"><h2>The course includes a total of <span>10 days</span> of classes.</h2></IonText>
              <IonText className="courseHeading">This course includes:</IonText>
            </div>
          </div> 
        </IonContent>
        {isLoading && <Loader message={loadingMessage} />}
      </IonPage>
    </>
  );
};

export default EnrollCoursesDetails;

