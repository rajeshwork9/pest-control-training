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



const Login: React.FC = () => {
    const logo = 'assets/images/psd-logo.svg';
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [showAlert, setShowAlert] = useState(false);

    const history = useHistory();

    const handleLogin = (e: React.FormEvent) => {
        history.push('/Dashboard')
        // e.preventDefault(); // prevents from submission
        // if(!email.trim() || !password.trim()){
        //     console.log("fields are empty"); 
        //     return
        // }      
        // else{
        // }
      
    };
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
                        
                        <div><IonImg className="headerImg" src="./assets/images/login-img.svg"></IonImg></div>
                    </div>

                    <IonCard className="mainLoginCard">
                        <IonText className="loginHeading">
                            <h1>Login</h1>
                            <p>Enter your Email and Password</p>
                        </IonText>

                        <form onSubmit={handleLogin}>             
                            <IonItem lines="none"  className="ion-align-items-center ionItemShadow">
                            <IonInput  label="Email" labelPlacement="stacked" placeholder="Enter Your Email"
                                type="email"/>
                            </IonItem>

                        
                            <IonItem  lines="none"  className="ion-align-items-center ionItemShadow">
                            <IonInput label="Password" labelPlacement="stacked"  placeholder="Enter Password"
                                type="password" required/>
                            </IonItem>

                            
                            <div className="ionRemember">
                                <IonCheckbox className="ionCheckbox" labelPlacement="end">Remember me</IonCheckbox>
                                <IonButton fill="clear" className="forgotpassword ion-text-uppercase ion-float-end">Forgot Password
                            </IonButton>
                            </div>
                           
                            <IonButton routerLink="/enrollcourses" className="ion-button" slot="primary" fill="solid" expand="block">Login</IonButton>
                        </form>

                        <div className="bottomLinkLogin">
                            <IonText>Don't have an account?</IonText>
                            <IonButton routerLink="/signup" className="textLink ion-text-center" fill="clear">Sign Up Now !</IonButton>
                        </div>

                    </IonCard>
                
                </div>
            </div>
      
          </IonContent>
        </IonPage>
      </>
    );
}

export default Login
