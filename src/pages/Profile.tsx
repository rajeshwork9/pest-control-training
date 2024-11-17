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

} from "@ionic/react";
import { useHistory } from 'react-router';
import { person, create, call, mail } from 'ionicons/icons';
import { toast } from 'react-toastify';
import { useAuth } from "../api/AuthContext";

const Profile: React.FC = () => {
  const { userData,logout } = useAuth();


  const logOut = async () => {
    const response = await logout();
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
          <IonButton className="changepasswordBt ion-margin" routerLink="/changepassword" shape="round" color="primary"> Change Password </IonButton>
          <IonButton className="logoutBt" onClick={(event) => logOut()} expand="block">
            Logout </IonButton>
        </IonCard>

      </IonContent>
    </IonPage>
  );
};

export default Profile;




