import PropTypes from 'prop-types'
import React, { Component } from 'react'

import {
  IonButton,
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
  IonButtons,
  IonRow,
  IonCol,
  IonCard,
  IonSearchbar,
  IonIcon,
  IonThumbnail,
  IonList,
  IonBackButton,
} from "@ionic/react";

import { ellipse } from 'ionicons/icons'

const Dashboard: React.FC = () => {
  return (
    <>
      <IonPage>
        <IonHeader className="ion-header">
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton></IonBackButton>
            </IonButtons>
            <IonTitle slot="start"> <IonImg className="headerLogoSvg" src="./assets/images/psd-logo.svg"></IonImg></IonTitle>
            <div className="headerBts">
              <div className="ion-float-start notificationBt">
                <IonButton routerLink="/notification" className="notificationsIcon" shape="round">
                  <IonImg src="assets/images/notifications-icon.svg" />
                </IonButton>
                <IonIcon className="alertNotifi" icon={ellipse}></IonIcon>
              </div>
              <IonButton shape="round" routerLink="/Profile">
                <IonImg src="assets/images/user-icon.svg" />
              </IonButton>
            </div>
          </IonToolbar>
        </IonHeader>
        <IonContent className="colorBg dashboardWrapp">
          <IonImg className="topbg" src="./assets/images/top-bg.svg"></IonImg>
          <div className="bgSvg">
            <IonCard className="corporateTotalPaymentCard">
              <IonItem lines="none" color="none" routerLink="/selected-courses">
                <IonText className="ctpcInner" slot="start">
                  <h2>Courses</h2>
                  <p>See your selected Courses</p>
                  <IonButton>
                    <IonImg className="detailsArrow" src="./assets/images/details-arrow-icon.svg" />
                  </IonButton>
                </IonText>
                <IonImg className="coursesImgDash" slot="end" src="./assets/images/time-img.svg" />
              </IonItem>
            </IonCard>
            <IonRow className="dashboardCard ion-margin-top">
              <IonCol size="6">
                <IonCard>
                  <IonImg src="./assets/images/attendance-icon.svg" />
                  <IonText><h3>Attendance</h3></IonText>
                </IonCard>
              </IonCol>
              <IonCol size="6">
                <IonCard>
                  <IonImg src="./assets/images/results-icon.svg" />
                  <IonText><h3>Results</h3></IonText>
                </IonCard>
              </IonCol>
              <IonCol size="6">
                <IonCard>
                  <IonImg src="./assets/images/quiz-icon.svg" />
                  <IonText><h3>Quiz</h3></IonText>
                </IonCard>
              </IonCol>
              <IonCol size="6">
                <IonCard>
                  <IonImg src="./assets/images/transactions-icon.svg" />
                  <IonText><h3>Transactions</h3></IonText>
                </IonCard>
              </IonCol>
            </IonRow>
            <IonButton routerLink="/enrollcourses" className="outlineBt ion-margin-top" shape="round" expand="block" color="primary" fill="outline">
              <IonImg src="./assets/images/enroll-courses-icon.svg" /> Enroll courses
            </IonButton>
          </div>
        </IonContent>
      </IonPage>
    </>
  );


}

export default Dashboard
