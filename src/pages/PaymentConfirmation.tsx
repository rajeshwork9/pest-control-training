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
  IonFooter,
} from "@ionic/react";
import { useHistory } from 'react-router';
import Loader from '../components/Loader';
import { ribbon, checkmark } from 'ionicons/icons';
import { useAuth } from '../api/AuthContext';
import useLoading from '../components/useLoading';
const PaymentConfirmation: React.FC = () => {
  const history = useHistory();
  const [enrolledData, setEnrolledData] = useState<any>([]);
  const queryParams: any = history.location.state;
  const app_version: any = localStorage.getItem('app_version');
  const app_name: any = localStorage.getItem('app_name');
  const { login } = useAuth();
  const { userData } = useAuth();
  const [userList, setUserList] = useState<any[]>([]);
  const [courseId, setCourseId] = useState<number>(0);
  const { isLoading, startLoading, stopLoading } = useLoading();
  const [loadingMessage, setLoadingMessage] = useState<string>('Loading....');

  useEffect(() => {
    if(queryParams){
      setEnrolledData(queryParams.data);
      setUserList(queryParams.users);
      setCourseId(queryParams.course_id);
      console.log(queryParams);
    }else{
      alert('No Payment data found')
    }
  }, []);

  const proceedWithSlotSelection = async () => {
    if(userData.user_type == 17){
      history.push({
        pathname: "/corporate-slot-selection",
        state: {users : userList,course_id : courseId }
      });
    }else{
      history.push({
        pathname: "/slot-selection",
        state: {courses : queryParams.courses }
      });
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
          <IonTitle>Payment Confirmation</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="colorBg paymentConfirmation">    
          <IonImg className="topbg" src="./assets/images/top-bg.svg"></IonImg>         
            <div className="bgSvg"> 
                <div className="ion-margin paymentSuccessfulWrapp">            
                    <IonImg className="paymentImg" src="./assets/images/payment-successful-icon.svg"></IonImg>
                   <IonText><h1 className="ion-text-uppercase">payment successful</h1></IonText>
                   <IonText><h4 className="ion-text-uppercase">--- Enrollment Id ---</h4></IonText>
                   <IonText><h6 className="">{enrolledData.enrollment_id}</h6></IonText>
                   <IonButton routerLink="/payment-details" shape="round" fill="outline" expand="block" color="primary" >Download Payment Receipt</IonButton>
                </div>
            </div>
        </IonContent>
        {isLoading && <Loader message={loadingMessage} />}
        <IonFooter>
          <IonToolbar>
            <IonButton onClick={(event) => proceedWithSlotSelection()} shape="round" expand="block" color="primary" >Select slot</IonButton>
          </IonToolbar>
        </IonFooter>
      </IonPage>
    </>
  );
};
export default PaymentConfirmation;
