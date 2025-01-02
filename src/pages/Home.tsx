import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonImg,
  IonButton,
  IonText,
  IonItem,
  IonButtons
} from "@ionic/react";

// import ExploreContainer from '../components/ExploreContainer';
// import './Home.css';

const Home: React.FC = () => {

  const navigatetoUae = async () => {
    window.location.href = "https://stg-id.uaepass.ae/idshub/authorize?response_type=code&client_id=rakpsd_mobile_stage&scope=urn:uae:digitalid:profile:general&state=HnlHOJTkTb66Y5H&redirect_uri=http://localhost/uaepassverification&acr_values=urn:safelayer:tws:policies:authentication:level:low";  
  }
  return (
    <IonPage>
      <IonContent fullscreen className="ionHome">
        <IonImg className="topbg" src="./assets/images/top-bg.svg"></IonImg>
        <div className="bgSvg">
          <div className="ion-margin">
            <IonImg className="logoLeft" src="./assets/images/psd-logo.svg"></IonImg>
            <div><IonImg className="headerImg" src="./assets/images/home-img.svg"></IonImg></div>
            <IonText className="homeHeading">Training</IonText>

 
            <IonItem className="loginOptionsBt" onClick={navigatetoUae} lines="none">            
                <IonImg slot="start" src="assets/images/uaepass-icon.svg" ></IonImg>
                <IonText>Sign in with UAE PASS</IonText>               
            </IonItem>

            <IonItem className="loginOptionsBt" routerLink="/loginwithmobile" lines="none"> 
                <IonImg slot="start" src="assets/images/login-mobile-icon.svg"></IonImg>
                <IonText>Login with Mobile</IonText>
             </IonItem>

             <IonItem className="loginOptionsBt"  routerLink="/login" lines="none">
                <IonImg slot="start" src="assets/images/login-icon.svg"></IonImg>
                <IonText>Login</IonText>
              </IonItem>
        

          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
