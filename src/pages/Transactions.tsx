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
  
  const Transactions: React.FC = () => {
    return (
      <IonPage>
        <IonHeader className="ion-header">
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton></IonBackButton>
            </IonButtons>
            <IonTitle>Transactions</IonTitle>
          </IonToolbar>
        </IonHeader>
  
        <IonContent fullscreen className="colorBg transactionsWrapp">
          <IonImg className="topbg" src="./assets/images/top-bg.svg"></IonImg>
          <div className="bgSvg">
          
          <div className="ion-margin">          

              <IonCard className="userItem">
                <IonItem lines="none" color="none">
                  <IonThumbnail slot="start">                 
                    <IonImg src="assets/images/transactions-icon.svg"></IonImg>
                  </IonThumbnail>

                  <IonText>
                    <div className="detailsArrow">
                      <h3>dca03e9b-c4b6-4c59-a9d1-f2855285d048</h3>
                      <IonButton className="detailsArrowIcon" fill="clear" routerLink="transactions-details">
                        <IonImg src="./assets/images/details-arrow-icon.svg"></IonImg>
                      </IonButton>
                    </div>
                  </IonText>
                </IonItem>

                <div className="tranListCount">
                        <IonRow>
                            <IonCol size="4">
                                <IonText>
                                    <p>Courses</p>
                                    <h6>2</h6>
                                </IonText>
                            </IonCol>

                            <IonCol size="4">
                                <IonText>
                                <p>Users</p>
                                <h6>2</h6>
                                </IonText>
                            </IonCol>

                            <IonCol size="4">
                                <IonText>
                                <p>Amount (ADE)</p>
                                <h6>135432</h6>
                                </IonText>
                            </IonCol>
                        </IonRow>
                    </div>
              </IonCard>
       

          </div>
          </div>
        </IonContent>
        
      </IonPage>
    );
  };
  
  export default Transactions;
  