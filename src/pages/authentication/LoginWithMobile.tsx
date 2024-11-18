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
import Loader from '../../components/Loader';

const LoginWithMobile: React.FC = () => {
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
                            
                            <div><IonImg className="headerImg" src="./assets/images/login-mobile-img.svg"></IonImg></div>
                        </div>

                        <IonCard className="mainLoginCard">
                            <IonText className="loginHeading">
                                <h1>Login with Mobile</h1>
                                <p>Enter Your Mobile Number</p>
                            </IonText>

                            <form>             
                                <IonItem lines="none"  className="ion-align-items-center ionItemShadow">
                                <IonInput  label="Mobile Number" labelPlacement="stacked" placeholder="Enter Your Mobile Number"
                                    type="number"/>
                                </IonItem>
                        
                                                    
                        

                                <IonButton routerLink="/otplogin" className="ion-button" slot="primary" fill="solid" expand="block">Continue</IonButton>
                            </form>

                            <div className="bottomLinkLogin">
                                <IonText>Don't have an account?</IonText>
                                <IonButton routerLink="/signup" className="textLink ion-text-center" fill="clear">Sign Up Now !</IonButton>
                            </div>

                        </IonCard>
                    
                    </div>
                </div>
             </IonContent>
                {isLoading && <Loader message={loadingMessage} />}
          </IonPage>
        </>
      );


}
export default LoginWithMobile
