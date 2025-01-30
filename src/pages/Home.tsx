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
  IonButtons,
  IonFooter
} from "@ionic/react";
import { Browser } from '@capacitor/browser';
import { App } from "@capacitor/app";
import { useHistory } from "react-router";
import { useEffect } from "react";
import { Capacitor, Plugins } from "@capacitor/core";
// import ExploreContainer from '../components/ExploreContainer';
// import './Home.css';
import { InAppBrowser } from '@ionic-native/in-app-browser';
const { WebViewCache } = Plugins;
import { Storage } from '@capacitor/storage';
import { toast } from "react-toastify";

const Home: React.FC = () => {
  const history = useHistory();
  const app_version: any = localStorage.getItem('app_version');


  useEffect(() => {
    const storedUserData: any = localStorage.getItem('userData');
    if (storedUserData) {
      if (storedUserData.user_type == 8 || storedUserData.user_type == 16) {
        history.push("/dashboard");
      }
      else {
        history.push("/corporate-dashboard");
      }
    }
  }, []);
  const navigatetoUae = () => {
    // Open a browser instance
    const browser = InAppBrowser.create(
      'https://stg-id.uaepass.ae/idshub/authorize?response_type=code&client_id=rakpsd_mobile_stage&scope=urn:uae:digitalid:profile:general&state=HnlHOJTkTb66Y5H&redirect_uri=http://localhost/uaepassverification&acr_values=urn:safelayer:tws:policies:authentication:level:low', // URL to open
      '_self',             // Target ('_self', '_blank', '_system')
      'location=yes,toolbarcolor=#ffffff' // Additional options
    );

    // Listen for the `loadstart` event (when a page starts loading)
    browser.on('loadstart').subscribe(async (event) => {
      // Check for authentication URL
      if (event.url.includes('authenticationendpoint/login.do')) {
        // This is the login URL
        if (event.url.includes('error=access_denied')) {
          console.log('User canceled the authentication.');
          // Handle the access denied error (e.g., show a message to the user)
        } else {
          console.log('Login URL with possible params:', event.url);
          // Handle the login redirection (e.g., start authentication process)
        }
      }
      // Check for polling URL
      else if (event.url.includes('authenticationendpoint/polling.jsp')) {
        // This is the polling URL
        console.log('Polling URL:', event.url);
        // Handle the polling response (e.g., check for successful authentication)
      }
      // Check for retry URL
      else if (event.url.includes('authenticationendpoint/retry.do')) {
        // This is the retry URL
        toast.error('Please try again');
        //await browser.close();
        history.push('/home');
        console.log('Retry URL:', event.url);
        // Handle retry logic (e.g., show retry message or re-trigger authentication)
      }
      // Check for redirect URL with error
      else if (event.url.includes('uaepassverification')) {
        if (event.url.includes('localhost/uaepassverification')) {

          const urlParams = new URLSearchParams(event.url.split('?')[1]);
          const code = urlParams.get('code');

          if (code) {
            console.log('Authorization code:', code);

            // Retrieve credentials
            const username = import.meta.env.VITE_USER_NAME;
            const password = import.meta.env.VITE_PASSWORD;

            // Close the browser
            await browser.close();

            // Navigate to the verification page
            history.push({
              pathname: "/uaepassverification",
              state: {
                from: 'uaepassverification',
                authorization_code: code,
                user_name: username,
                password: password,
              },
            });
          } else {
            // This is the redirection URL after authentication
            const urlParams = new URLSearchParams(new URL(event.url).search);
            const error = urlParams.get('error');
            const errorDescription = urlParams.get('error_description');
            if (error === 'access_denied') {
              console.log('Authentication was canceled by user on UAE PASS app.');
              toast.error(errorDescription);
              await browser.close();
              history.push('/home');
              // Handle error (e.g., show an appropriate message to the user)
            } else if (error) {
              console.log('Error:', error, 'Description:', errorDescription);
              toast.error(errorDescription);
              await browser.close();
              history.push('/home');
              // Handle other error cases (e.g., display error message)
            } else {
              toast.error(errorDescription);
              await browser.close();
              history.push('/home');
            }
          }
        }

      }
      else {
        console.log('Unknown URL:', event.url);
      }

      console.log('Page loading started:', event.url);
    });

    // Listen for the `loadstop` event (when a page finishes loading)
    browser.on('loadstop').subscribe(() => {
      console.log('Page fully loaded.');
    });

    // Listen for the `exit` event (when the browser is closed)
    browser.on('exit').subscribe(() => {
      console.log('Browser closed.');
    });
  };
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

            <IonItem className="loginOptionsBt" routerLink="/login" lines="none">
              <IonImg slot="start" src="assets/images/login-icon.svg"></IonImg>
              <IonText>Login</IonText>
            </IonItem>


          </div>
        </div>
      </IonContent>
      <IonFooter className="ion-footer networkTimeText">
        <IonToolbar>
          <IonText className=''>
            <p>App Version &nbsp;{app_version}</p>
          </IonText>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};

export default Home;
