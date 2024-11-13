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
import { ribbon, checkmark, documents, download  } from 'ionicons/icons'
 
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
                              <IonIcon icon={ribbon}></IonIcon>                     
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

            <div className="innerDownloadFiles">
                <IonItem color="none" lines="none">
                <IonText className="filesActive">Files</IonText>
                <IonButton slot="end" className="orangeBt" shape="round" expand="block">MARK ATTENDANCE</IonButton>
                </IonItem>

              <IonList lines="none" className="zipCard">
                  <IonItem lines="none" className="ion-justify-content-between">
                      <div className="scd-iconText">
                        <ion-icon icon={documents}></ion-icon>
                        <IonText>Curabitur efficitur turpis ut odio</IonText>
                      </div>
                      <IonButton slot="end" className="scd-downloadBt" fill="clear"><ion-icon slot="end" icon={download}></ion-icon>
                      </IonButton>
                  </IonItem>

                  <IonItem lines="none" className="ion-justify-content-between">
                      <div className="scd-iconText">
                        <ion-icon icon={documents}></ion-icon>
                        <IonText>Curabitur efficitur turpis ut odio</IonText>
                      </div>
                      <IonButton slot="end" className="scd-downloadBt" fill="clear"><ion-icon slot="end" icon={download}></ion-icon>
                      </IonButton>
                  </IonItem>

              </IonList>

            </div>


        

          </div>
        </IonContent>
      </IonPage>
    );
  };
  
  export default SelectedCoursesDetails;
  