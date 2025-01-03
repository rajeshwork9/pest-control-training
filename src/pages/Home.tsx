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
import { Browser } from '@capacitor/browser';
import { App } from "@capacitor/app";
import { useHistory } from "react-router";
import { useEffect } from "react";
import { Capacitor } from "@capacitor/core";
// import ExploreContainer from '../components/ExploreContainer';
// import './Home.css';

const Home: React.FC = () => {
 const history = useHistory();

  const navigatetoUae = async () => {

    const url = `https://stg-id.uaepass.ae/idshub/authorize?response_type=code&client_id=rakpsd_mobile_stage&scope=urn:uae:digitalid:profile:general&state=HnlHOJTkTb66Y5H&redirect_uri=http://localhost/uaepassverification&acr_values=urn:safelayer:tws:policies:authentication:level:low`;

    try{

      if(Capacitor.isNativePlatform()){
        await Browser.removeAllListeners();
      }
      
      await Browser.open({ url });

    Browser.addListener('browserFinished', async () => {
      console.log('Browser closed');
    });
      App.addListener('appUrlOpen',(data : {url : string}) => {
        console.log('Got URL:', data.url);
        if(data.url.includes('localhost/uaepassverification')){
          const urlParams = new URLSearchParams(data.url.split('?')[1]);
          const code = urlParams.get('code');

          if(code){
            console.log('Authorization code:', code);
            const username = import.meta.env.VITE_USER_NAME
            const password = import.meta.env.VITE_PASSWORD
            history.push({
              pathname: "/uaepassverification",
              state: { from: 'uaepassverification', authorization_code: code, user_name: username, password: password }
            });
            
          }
        }
      });
    } catch(error){
      console.error('Error opening browser', error);
    }

  }
  // useEffect(() => {
  //   const handlePageLoaded = (info: any) => {
  //     console.log('Page Loaded: ', info);
  //     // Example: Check if URL contains specific data
  //     const url = info.url;
  //     if (url.includes('access_token')) {
  //       const token = new URL(url).searchParams.get('access_token');
  //       console.log('Access Token:', token);
  //       // Close browser if needed
  //       Browser.close();
  //       // Handle token (e.g., redirect to another page)
  //     }
  //   };

  //   Browser.addListener('browserFinished', () => {
  //     console.log('Browser closed.');
      
  //   });
  
  //   // Listen for when a page is loaded
  //   Browser.addListener('browserPageLoaded', () => {
  //     console.log('Page loaded:');
  //   });

  //   // Listen to Browser events
  //   // Browser.addListener('browserPageLoaded', handlePageLoaded);
  //   // Browser.addListener('browserFinished', handleBrowserClose);

  //   return () => {
  //     // Clean up listeners
  //     Browser.removeAllListeners();
  //   };
  // }, []);

  // const openBrowser = async () => {
  //   await Browser.open({ url: 'https://example.com/oauth/authorize' });
  // };
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
