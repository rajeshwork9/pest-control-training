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
} from "@ionic/react";
import { useHistory } from 'react-router';

const OtpLogin = () => {
    const [showAlert, setShowAlert] = useState(false);
    return (
      <>
        <IonPage>
        <IonContent fullscreen className="colorBg ionHome loginwrapp">             
                <IonImg className="topbg" src="./assets/images/top-bg.svg"></IonImg>            
                <div className="bgSvg">
                    <div className="ion-margin">
                        <div className="headerLoginImgLogo">
                            <div className="loginlogoLeft">
                                <IonButton routerLink="/home"><IonImg src="./assets/images/arrow-back.svg"></IonImg></IonButton>
                                <IonImg className="loginlogoSvg"  src="./assets/images/psd-logo.svg"></IonImg>
                            </div>
                            
                            <div><IonImg className="headerImg" src="./assets/images/otp-img.svg"></IonImg></div>
                        </div>

                        <IonCard className="mainLoginCard">
                            <IonText className="loginHeading">
                                <h1>Otp Verification </h1>
                                <p>Code is sent to <strong>+971 506398767</strong></p>
                            </IonText>

                          <div className="opTInput">
                            <form>             
                                <IonItem lines="none" color="none"  className="ion-align-items-center">
                                  <IonInput type="number"/>
                                  <IonInput type="number"/>
                                  <IonInput type="number"/>
                                  <IonInput type="number"/>
                                </IonItem>

                                <div className="ionRemember">                               
                                    <IonButton fill="clear" className="forgotpassword ion-text-uppercase ion-float-end"><span>Don't Receive A Code?</span> Resend!
                                  </IonButton>
                                </div>
                           
                                <IonButton routerLink="/otplogin" className="ion-button" slot="primary" fill="solid" expand="block">Verify and Proceed</IonButton>
                            </form>
                          </div>

                            <div className="bottomLinkLogin">
                                <IonText>Want to change mobile number? </IonText>
                                <IonButton routerLink="/loginwithmobile" className="textLink ion-text-center" fill="clear">Change!</IonButton>
                            </div>

                        </IonCard>
                    
                    </div>
                </div>
             </IonContent>
        </IonPage>
      </>
    );
}

export default OtpLogin