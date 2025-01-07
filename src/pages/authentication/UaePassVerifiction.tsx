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
import { getaccesstoken, uaeuserInfo } from '../../api/common';

const UaePassVerification: React.FC = () => {
  const { isLoading, startLoading, stopLoading } = useLoading();
const [loadingMessage, setLoadingMessage] = useState<string>('Loading....');
  const { userData } = useAuth(); 
  const selectedCourseData = localStorage.getItem('selectedCourses');
  const parsedData = selectedCourseData ? JSON.parse(selectedCourseData) : [];
  const [courseList, setCourseList] = useState<any[]>([]);
  
  const history = useHistory();
  const queryParams: any = history.location.state;


  useEffect(() =>  {
    console.log("queryParams---------------",queryParams);
    if(queryParams){

      const getAccessToken = async () => {
        console.log(queryParams.authorization_code,"Authorization Code");
      try{
        const username = import.meta.env.VITE_USERNAME;
        const password = import.meta.env.VITE_PASSWORD;
        const credentials = `${username}:${password}`;
        const creds = btoa(credentials);
        const accessTokenResponse = await getaccesstoken(queryParams.authorization_code,creds);
        console.log('Access Token', accessTokenResponse);
        if(accessTokenResponse){
          getUserInfo(accessTokenResponse.access_token);
        }
      }
      catch(error: any){
        console.error(error);
      }
      }
      
      getAccessToken();

    }else{
      alert('Error')
    }
  }, []);
  

  const getUserInfo = async (token: any) => {
    const response = await uaeuserInfo(token);
    console.log('userInfo Response', response);
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

