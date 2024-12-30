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
import Loader from '../../components/Loader';
import { ribbon, checkmark } from 'ionicons/icons';
import useLoading from '../../components/useLoading';
import { getCourseList } from '../../api/common';
import { toast } from 'react-toastify';
import { useAuth } from '../../api/AuthContext';
import NoDataFound from '../../components/NoDataFound';

const UaePassVerification: React.FC = () => {
  const { isLoading, startLoading, stopLoading } = useLoading();
const [loadingMessage, setLoadingMessage] = useState<string>('Loading....');
  const { userData } = useAuth(); 
  const selectedCourseData = localStorage.getItem('selectedCourses');
  const parsedData = selectedCourseData ? JSON.parse(selectedCourseData) : [];
  const [courseList, setCourseList] = useState<any[]>([]);
  const history = useHistory();
  const [selectedCourses, setSelectedCourses] = useState<any[]>(Array.isArray(parsedData) ? parsedData : []);


  useEffect(() => {
    
  }, []);

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
          
        </IonContent>
        {isLoading && <Loader message={loadingMessage} />}

        <IonFooter>
          <IonToolbar>
            {/* <IonButton onClick={(event) => proceed()} shape="round" expand="block" color="primary" >Continue</IonButton> */}
          </IonToolbar>
        </IonFooter>
      </IonPage>
    </>
  );
};

export default UaePassVerification;

