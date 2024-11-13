import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
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
} from "@ionic/react";
import { useHistory } from 'react-router';
import { ribbon, checkmark } from 'ionicons/icons'
const UserCreate: React.FC = () => {
  return (
    <>
      <IonPage>

      {/* <IonHeader className="ion-header">
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton></IonBackButton>
          </IonButtons>
          <IonTitle>Create User</IonTitle>
        </IonToolbar>
      </IonHeader> */}


    <IonContent fullscreen className="colorBg loginwrapp signupWrapp">         
        <IonImg className="topbg" src="./assets/images/top-bg.svg"></IonImg>  
            <div className="bgSvg">
            <div className="ion-margin">
                                <div className="headerLoginImgLogo">
                                    <div className="loginlogoLeft">
                                        <IonButton routerLink="/home"><IonImg src="./assets/images/arrow-back.svg"></IonImg></IonButton>
                                        <IonImg className="loginlogoSvg"  src="./assets/images/psd-logo.svg"></IonImg>
                                    </div>
                                </div> 

                    <IonCard className="mainCreateUserCard ion-padding-vertical">

                            <IonText className="loginHeading"><h1>Create User</h1></IonText>

                        <Formik>
                            <Form>
                
                                <IonItem lines="none" className="ionItemShadow inputFiledSty">
                                    <div className="width100">
                                    <IonLabel className="fieldName">First Name</IonLabel>
                                    <Field className="fieldControl" placeholder="Enter Your First Name"
                                        type="text" />
                                    </div>
                                </IonItem>

                                <IonItem lines="none" className="ionItemShadow inputFiledSty">
                                    <div className="width100">
                                    <IonLabel className="fieldName">Last Name</IonLabel>
                                    <Field className="fieldControl" placeholder="Enter Your Last Name"
                                        type="text" />
                                    </div>
                                </IonItem>

                                <IonItem lines="none" className="ionItemShadow inputFiledSty">
                                    <div className="width100">
                                    <IonLabel className="fieldName">Email ID</IonLabel>
                                    <Field className="fieldControl" placeholder="Enter Your Email ID"
                                        type="text" />
                                    </div>
                                </IonItem>

                                <IonItem lines="none" className="ionItemShadow inputFiledSty">
                                    <div className="width100">
                                    <IonLabel className="fieldName">Mobile No</IonLabel>
                                    <Field className="fieldControl" placeholder="Enter Your Mobile No"
                                        type="text" />
                                    </div>
                                </IonItem>

                                <IonItem lines="none" className="ionItemShadow inputFiledSty">
                                    <div className="width100">
                                    <IonLabel className="fieldName">Emirates ID</IonLabel>
                                    <Field className="fieldControl" placeholder="Enter Your Emirates ID"
                                        type="text" />
                                    </div>
                                </IonItem>
                                
                            </Form>  
                        </Formik>  
                    </IonCard>
            </div>
            </div>
        </IonContent>

          <IonFooter  className="ion-padding-horizontal">
          <IonToolbar>
            <IonButton routerLink="/users-list" shape="round" expand="block" color="primary" >Add User</IonButton>
          </IonToolbar>
        </IonFooter>
      </IonPage>
    </>
  );
};

export default UserCreate;

