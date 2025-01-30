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
  IonSegment,
  IonSegmentButton,
  IonSegmentView,
  IonSegmentContent,
  IonFooter,

} from "@ionic/react";
import { useHistory } from 'react-router';
import Loader from '../components/Loader';
import { person, create, call, mail } from 'ionicons/icons';
import { toast } from 'react-toastify';
import { useAuth } from "../api/AuthContext";
import { useState } from "react";
import useLoading from "../components/useLoading";
import { Browser } from "@capacitor/browser";
import { App } from "@capacitor/app";

const Profile: React.FC = () => {
  const { userData,logout } = useAuth();
  const app_version: any = localStorage.getItem('app_version');
  const app_name: any = localStorage.getItem('app_name');
  const { login } = useAuth();
  const { isLoading, startLoading, stopLoading } = useLoading();
  const [loadingMessage, setLoadingMessage] = useState<string>('Loading....');

  const logOut = async () => {
    try {
      const response = await logout();
      // const url = `https://stg-id.uaepass.ae/idshub/logout?redirect_uri=http://localhost/profile`;
      // await Browser.open({ url });

      // Browser.addListener('browserFinished', async () => {
      //   console.log('Browser closed');
      // });

      // App.addListener('appUrlOpen', async (data: { url: string }) => {
      //   console.log('Got URL:', data.url);
      //   if (data.url.includes('localhost/profile')) {
      //     const response = await logout();
      //   }
        
      // });
    } catch (error) {
      console.error('Error opening browser', error);
    }
  }
  return (
    <IonPage>
      <IonHeader className="ion-header">
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton></IonBackButton>
          </IonButtons>
          <IonTitle>Profile</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="colorBg profileWrapp">
        <IonImg className="topbg" src="./assets/images/top-bg.svg"></IonImg>

        <div className="porfileUserblock">
          <IonIcon className="personIcon" icon={person}></IonIcon>
          <IonButton className="editBtPosition">
            <IonIcon icon={create}></IonIcon>
          </IonButton>
        </div>
        <IonCard className="porfileCard">
          <IonText className="profileName">
            <h1>{userData.first_name} {userData.last_name}</h1>
            <h6>{userData.role_name}</h6>
          </IonText>
          <IonText className="contactProfile">
            <p><IonIcon icon={call}></IonIcon>{userData.mobile_no}</p>
            <p><IonIcon icon={mail}></IonIcon>{userData.email_id}</p>
          </IonText>
          <IonButton className="changepasswordBt ion-margin"  routerLink="/change-password" shape="round" color="primary"> Change Password </IonButton> 
          <IonButton className="logoutBt" onClick={(event) => logOut()} expand="block">
            Logout </IonButton>
        </IonCard>

      </IonContent>
      {isLoading && <Loader message={loadingMessage} />}
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

export default Profile;




