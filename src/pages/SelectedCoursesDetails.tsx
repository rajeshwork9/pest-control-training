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
  } from "@ionic/react";
  import { useHistory } from 'react-router';
import { ribbon, checkmark } from 'ionicons/icons'
 
  const SelectedCoursesDetails: React.FC = () => {
    return (
      <IonPage>
          <IonHeader className="ion-header">
              <IonToolbar>
                <IonButtons slot="start">
                  <IonBackButton></IonBackButton>
                </IonButtons>
                <IonTitle>Selected Course Details</IonTitle>
              </IonToolbar>
            </IonHeader>

            <IonContent fullscreen className="colorBg seclectedCoursesDetailsWrapp">    
          <IonImg className="topbg" src="./assets/images/top-bg.svg"></IonImg>         
            <div className="bgSvg">
                  <div className="blueBg">
                    <IonList className="coursesDHeader" lines="none">
                        <IonItem lines="none" color="none" className="itemActive">
                          <IonThumbnail slot="start">
                              <ion-icon icon={ribbon}></ion-icon>                     
                          </IonThumbnail>
                          <IonText>                      
                            <h3>Course-1</h3>
                            <p>Aliquam porttitor tincidunt purus, eget molestie dui venenatis et Aliquam porttitor tincidunt purus, eget molestie dui venenatis.</p>

                            <p>Aliquam porttitor tincidunt purus, eget molestie dui venenatis et Aliquam porttitor tincidunt purus, eget molestie dui venenatis.</p>
                          </IonText>                    
                        </IonItem>
                      </IonList>
                

                          <div className="coursePrice ion-padding-horizontal">
                            <IonRow>
                              <IonCol> <IonText><h6>Course Price</h6><h3>900 <span>AED</span></h3> </IonText></IonCol>
                              <IonCol><IonText><h6>Exam Price</h6><h3>50 <span>AED</span></h3> </IonText></IonCol>
                              <IonCol> <IonText><h6>License Price</h6><h3>50 <span>AED</span></h3> </IonText></IonCol>
                            </IonRow>
                          </div>
                  </div>

            <div className="InnerDownloadFiles">
                <IonItem color="none" lines="none">

                </IonItem>
            </div>


        

          </div>
        </IonContent>
      </IonPage>
    );
  };
  
  export default SelectedCoursesDetails;
  