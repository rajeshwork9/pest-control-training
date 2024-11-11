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
  IonFooter
} from "@ionic/react";
import { useHistory } from 'react-router';
import { ribbon, checkmark } from 'ionicons/icons'
const EnrollCourses: React.FC = () => {
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
                  <IonItem className="itemActive">
                    <IonThumbnail slot="start">
                        <ion-icon icon={ribbon}></ion-icon>
                        <div className="checkmark"><ion-icon icon={checkmark}></ion-icon></div>
                    </IonThumbnail>
                    <IonText>
                       <div className="detailsArrow">
                           <h3>Course-1</h3>
                          <IonButton  className="detailsArrowIcon" routerLink="/enroll-courses-details">
                            <IonImg src="./assets/images/details-arrow-icon.svg"></IonImg>
                          </IonButton>
                        </div>
                      
                      <p>Aliquam porttitor tincidunt purus, eget molestie dui venenatis et</p>
                    </IonText>
                  </IonItem>

                  <IonItem>
                    <IonThumbnail slot="start">
                        <ion-icon icon={ribbon}></ion-icon>
                        <div className="checkmark"><ion-icon icon={checkmark}></ion-icon></div>
                    </IonThumbnail>
                    <IonText>
                        <div className="detailsArrow">
                           <h3>Course-2</h3>
                           <IonButton  className="detailsArrowIcon" routerLink="/enroll-courses-details">
                            <IonImg src="./assets/images/details-arrow-icon.svg"></IonImg>
                          </IonButton>
                        </div>
                      <p>Aliquam porttitor tincidunt purus, eget molestie dui venenatis et</p>
                    </IonText>
                  </IonItem>

                </IonList>
                
              </div>
            </div>
        </IonContent>

          <IonFooter>
          <IonToolbar>
            <IonButton routerLink="/payment-details" shape="round" expand="block" color="primary" >Continue</IonButton>
          </IonToolbar>
        </IonFooter>
      </IonPage>
    </>
  );
};

export default EnrollCourses;

