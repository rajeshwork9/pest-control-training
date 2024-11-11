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
} from "@ionic/react";
import { useHistory } from 'react-router';
import { ribbon, checkmark } from 'ionicons/icons'
const EnrollCoursesDetails: React.FC = () => {
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
                        <ion-icon icon={ribbon}></ion-icon>                     
                    </IonThumbnail>
                    <IonText>                      
                      <h3>Course-1</h3>
                      <p>Aliquam porttitor tincidunt purus, eget molestie dui venenatis et Aliquam porttitor tincidunt purus, eget molestie dui venenatis.</p>

                      <p>Aliquam porttitor tincidunt purus, eget molestie dui venenatis et Aliquam porttitor tincidunt purus, eget molestie dui venenatis.</p>
                    </IonText>
                  </IonItem>
                </IonList>
                    <div className="coursePrice ion-padding-horizontal">
                      <IonRow>
                        <IonCol> <IonText><h6>Course Price</h6><h3>900 <span>AED</span></h3> </IonText></IonCol>
                        <IonCol><IonText><h6>Exam Price</h6><h3>50 <span>AED</span></h3> </IonText></IonCol>
                        <IonCol> <IonText><h6>License Price</h6><h3>50 <span>AED</span></h3> </IonText></IonCol>
                      </IonRow>
                    </div>

                    <div className="ion-margin">
                    <IonText className="daysCourse"><h2>The course includes a total of <span>10 days</span> of classes.</h2></IonText>

                    <IonText className="courseHeading">This course includes:</IonText>
                    </div>
            </div>
        </IonContent>
      </IonPage>
    </>
  );
};

export default EnrollCoursesDetails;

