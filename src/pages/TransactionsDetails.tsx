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
  import { ribbon, ellipse, call, mail, add } from 'ionicons/icons'
  import useLoading from '../components/useLoading';
  import { getUserList } from '../api/common';
  import { toast } from 'react-toastify';
  import { useEffect, useState } from "react";
  
  const TransactionsDetails: React.FC = () => {
    return (
      <IonPage>
        <IonHeader className="ion-header">
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton></IonBackButton>
            </IonButtons>
            <IonTitle>Transactions Details</IonTitle>
          </IonToolbar>
        </IonHeader>
  
        <IonContent fullscreen className="colorBg transDetailsWrapp">
          <IonImg className="topbg" src="./assets/images/top-bg.svg"></IonImg>
          <div className="bgSvg">
          <IonImg className="doneImg" src="./assets/images/done-img.svg"></IonImg>

          <IonText className="tdpayment">
              <h2>1463 <span>AED</span></h2>
              <h6>Payment Successful</h6>
            </IonText>

          <div className="tdCard ion-margin-top">      
              <IonCard className="ion-padding">
                <IonText className="headingtd"><h3>Payment Details</h3></IonText>

                <IonText>
                  <p>Date</p>
                  <h4>09/10/2023</h4>
                </IonText>

                <IonText>
                  <p>Enrollment ID</p>
                  <h4>PCT552045888</h4>
                </IonText>

                <IonText>
                  <p>No Of Courses</p>
                  <h4>1</h4>
                </IonText>

                <IonText>
                  <p>No Of Users</p>
                  <h4>23</h4>
                </IonText>

                <IonText>
                  <p>Payment Status</p>
                  <h4>completed</h4>
                </IonText>
              </IonCard>
       

          </div>
          </div>
        </IonContent>
        
      </IonPage>
    );
  };
  
  export default TransactionsDetails;
  