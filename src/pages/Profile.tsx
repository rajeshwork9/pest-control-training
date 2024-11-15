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
  import { person, create, call, mail} from 'ionicons/icons';
  import { toast } from 'react-toastify';
  
  const Profile: React.FC = () => {   
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
                             <ion-icon icon={create}></ion-icon>
                        </IonButton>
               </div>
                
       
       
       
            <IonCard className="porfileCard">
                    <IonText className="profileName"> 
                        <h1>Naresh Kumar</h1>
                        <h6>Technician</h6>
                    </IonText>

                    <IonText className="contactProfile">
                        <p><IonIcon icon={call}></IonIcon>9878765566</p>
                        <p><IonIcon icon={mail}></IonIcon>naresh@gmail.com</p>
                    </IonText>
                    <IonButton className="changepasswordBt ion-margin" routerLink="/changepassword" shape="round"  color="primary"> Change Password </IonButton>
               

                    <IonButton className="logoutBt" routerLink="/login"  expand="block">
                   Logout </IonButton>
            </IonCard> 
       
        </IonContent>
      </IonPage>
    );
  };
  
  export default Profile;
  



