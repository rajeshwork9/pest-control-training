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
  IonSelect,
  IonSelectOption,
} from "@ionic/react";
import { useHistory } from 'react-router';

const Signup: React.FC = () => {
  return (
    <>
      <IonPage>
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

                              <div className="ionRemember">                               
                                    <IonButton fill="clear" className="forgotpassword ion-text-uppercase ion-float-start"><span>Already have an account?</span> Login
                                  </IonButton>
                              </div>

                            <IonCard className="mainLoginCard">
                        <IonText className="loginHeading">
                            <h1>Create Account</h1>
                            <p>Sign up to Continue</p>
                        </IonText>

                        <form>             
                            <IonItem lines="none"  className="ion-align-items-center ionItemShadow">
                               <IonInput  label="First Name" labelPlacement="stacked" placeholder="Enter Your First Name"
                                type="text"/>
                            </IonItem>

                        
                            <IonItem  lines="none"  className="ion-align-items-center ionItemShadow">
                               <IonInput label="Last Name" labelPlacement="stacked"  placeholder="Enter Your Last Name"
                                type="text" required/>
                            </IonItem>

                            <IonItem  lines="none"  className="ion-align-items-center ionItemShadow">
                               <IonInput label="Email ID" labelPlacement="stacked"  placeholder="Enter Your Email ID"
                                type="text" required/>
                            </IonItem>

                            <IonItem  lines="none"  className="ion-align-items-center ionItemShadow">
                                <IonSelect label="Register As" labelPlacement="stacked" placeholder="Select Register As">
                                  <IonSelectOption value="corporate">Corporate</IonSelectOption>
                                  <IonSelectOption value="individual">Individual</IonSelectOption>                                  
                                </IonSelect>
                            </IonItem> 

                            <IonItem  lines="none"  className="ion-align-items-center ionItemShadow">
                                <IonSelect label="User Type" labelPlacement="stacked" placeholder="Select User Type">
                                  <IonSelectOption value="technician">Technician</IonSelectOption>
                                  <IonSelectOption value="supervisor">Supervisor</IonSelectOption>                                  
                                </IonSelect>
                            </IonItem> 

                            <IonItem  lines="none"  className="ion-align-items-center ionItemShadow">
                               <IonInput label="Mobile No" labelPlacement="stacked"  placeholder="Enter Your Mobile No"
                                type="text" required/>
                            </IonItem>

                            <IonItem  lines="none"  className="ion-align-items-center ionItemShadow">
                               <IonInput label="Password" labelPlacement="stacked"  placeholder="Enter Password"
                                type="password" required/>
                            </IonItem>

                            <IonItem  lines="none"  className="ion-align-items-center ionItemShadow">
                               <IonInput label="Confirm Password" labelPlacement="stacked"  placeholder="Enter Confirm Password"
                                type="password" required/>
                            </IonItem>
                            <IonButton className="ion-button" slot="primary" fill="solid" expand="block">Sign Up</IonButton>
                        </form>
                    </IonCard>
                    
                    </div>
            </div>
        </IonContent>
      </IonPage>
    </>
  );
};

export default Signup;
