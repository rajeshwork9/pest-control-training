import React, { useState } from 'react';
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
  IonCardTitle,
  IonCardContent,
  IonFooter,
} from "@ionic/react";
import { useHistory } from 'react-router';
import { ribbon, checkmark, create } from 'ionicons/icons'
const PaymentDetails: React.FC = () => {
  return (
    <>
      <IonPage>

      <IonHeader className="ion-header">
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton></IonBackButton>
          </IonButtons>
          <IonTitle>Payment Details</IonTitle>
        </IonToolbar>
      </IonHeader>


      <IonContent fullscreen className="colorBg paymentDetails ionContentBottom">    
          <IonImg className="topbg" src="./assets/images/top-bg.svg"></IonImg>         
            <div className="bgSvg">
              <IonCard className="totalPaymentCard">
                <IonText>
                  <p>Selected Courses Total Payment</p>
                    <h2>3000 AED</h2>
                  </IonText>
              </IonCard>

              {/* Corporate Start*/}
              {/* <IonCard className="totalPaymentCard">
                <IonText>
                  <p>Selected Total Users</p>
                  <div className="d-flex ion-justify-content-between">
                    <h2>O5</h2>
                    <IonButton shape="round" size="small" color="primary"><ion-icon icon={create}></ion-icon> Edit</IonButton>
                  </div>
                  </IonText>
              </IonCard> */}
               {/* Corporate End*/}

              <IonCard className="cardPaymentDetails">
                    <IonCardTitle>Course-1</IonCardTitle>
                    <IonCardContent>
                      <IonItem lines="none">
                          <div><IonCheckbox checked="true" labelPlacement="end">Course Price</IonCheckbox></div>
                          <IonText slot="end"><h5>900</h5></IonText>
                        </IonItem>

                        <IonItem lines="none">
                          <div><IonCheckbox checked="true" labelPlacement="end">Exam Price</IonCheckbox></div>
                          <IonText slot="end"><h5>50</h5></IonText>
                        </IonItem>

                        <IonItem lines="none">
                        <div><IonCheckbox checked="true" labelPlacement="end">License Price</IonCheckbox></div>
                          <IonText slot="end"><h5>50</h5></IonText>
                        </IonItem>

                        <IonItem className="totalAde" lines="none">
                          <h4>Total</h4>
                          <IonText slot="end"><h5><span>AED</span> 1000</h5></IonText>
                        </IonItem>
                      </IonCardContent>
              </IonCard>

              <IonCard className="cardPaymentDetails">
                    <IonCardTitle>Course-2</IonCardTitle>
                    <IonCardContent>
                      <IonItem lines="none">
                          <div><IonCheckbox checked="true" labelPlacement="end">Course Price</IonCheckbox></div>
                          <IonText slot="end"><h5>900</h5></IonText>
                        </IonItem>

                        <IonItem lines="none">
                          <div><IonCheckbox checked="true" labelPlacement="end">Exam Price</IonCheckbox></div>
                          <IonText slot="end"><h5>50</h5></IonText>
                        </IonItem>

                        <IonItem lines="none">
                        <div><IonCheckbox checked="true" labelPlacement="end">License Price</IonCheckbox></div>
                          <IonText slot="end"><h5>50</h5></IonText>
                        </IonItem>

                        <IonItem className="totalAde" lines="none">
                          <h4>Total</h4>
                          <IonText slot="end"><h5><span>AED</span> 1000</h5></IonText>
                        </IonItem>
                      </IonCardContent>
              </IonCard>

  {/* Corporate Start*/}
              {/* <IonCard className="corporateTotalPaymentCard">
                <IonText>
                  <p>Total Payment <span> 5 X 1000</span></p>
                    <h2>5000 AED</h2>
                  </IonText>
              </IonCard> */}
  {/* Corporate Start*/}
            </div>
        </IonContent>

        <IonFooter>
          <IonToolbar>
            <IonButton routerLink="/payment-confirmation" shape="round" expand="block" color="primary" >Proceed to Payment</IonButton>
          </IonToolbar>
        </IonFooter>

      </IonPage>
    </>
  );
};

export default PaymentDetails;

