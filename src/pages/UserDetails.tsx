import React, { useEffect, useState } from "react";
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
  IonSelect,
  IonSelectOption,
} from "@ionic/react";
import { ribbon, ellipse, call, mail, add } from 'ionicons/icons'


const UserDetails: React.FC = () => {
  return (
    <>
      <IonPage>

      <IonHeader className="ion-header">
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton></IonBackButton>
            </IonButtons>
            <IonTitle className="ion-no-padding">Users Details</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonContent fullscreen className="colorBg userDetailsWrapp">
          <IonImg className="topbg" src="./assets/images/top-bg.svg"></IonImg>
          <div className="bgSvg">
          <div className="blueBg userItem">
            <IonItem lines="none" color="none">
                  <IonThumbnail slot="start">
                    {/* <IonIcon icon={person}></IonIcon>*/}
                    <IonImg src="assets/images/user-icon.svg"></IonImg>                  
                  </IonThumbnail>

                  <IonText>
                    <div className="detailsArrow">
                      <h3>Ragu Varma</h3>
                    
                    </div>
                    <IonText className="phoneEmail">
                      <p><IonIcon icon={call}></IonIcon>9878623322</p>
                      <p><IonIcon icon={mail}></IonIcon>raguvarma@gmail.com</p>
                      <p>User: <span>Active</span></p>
                    </IonText>
                  </IonText>
                </IonItem>
          </div>


          <div className="innerDownloadFiles">
            <IonItem color="none" lines="none">
              <IonText className="filesActive">Course</IonText>
            
            </IonItem>

            <IonList lines="none" className="zipCard">
                <IonItem lines="none" className="ion-justify-content-between">
                  <div className="scd-iconText">
                     <IonIcon icon={ribbon}></IonIcon>
                    <IonText>Course B</IonText>
                  </div>
                </IonItem>
      
            </IonList>
          </div>

          </div>
        </IonContent>
      </IonPage>
    </>
  );
};

export default UserDetails;

