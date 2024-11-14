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
import { ribbon, checkmark } from 'ionicons/icons';

const PaymentConfirmation: React.FC = () => {
  const history = useHistory();
  const [enrolledData, setEnrolledData] = useState<any>([]);
  const queryParams: any = history.location.state;


  useEffect(() => {
    if(queryParams){
      setEnrolledData(queryParams.data);
    }else{
      alert('No Payment data found')
    }
  }, []);


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

        <IonFooter>
          <IonToolbar>
            <IonButton routerLink="/dashboard" shape="round" expand="block" color="primary" >Continue</IonButton>
          </IonToolbar>
        </IonFooter>

      </IonPage>
    </>
  );
};

export default PaymentConfirmation;

