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
    import { ribbon, ellipse, call, mail, add } from 'ionicons/icons'
   
    const SelectUser: React.FC = () => {
      return (
        <IonPage>
            <IonHeader className="ion-header">
                <IonToolbar>
                  <IonButtons slot="start">
                    <IonBackButton></IonBackButton>
                  </IonButtons>
                  <IonTitle>Select Users</IonTitle>
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
                            </IonText>                    
                          </IonItem>
                        </IonList>
                    </div>
  
            <IonCard className="userItem statusActive">
                  <IonItem lines="none" color="none">
                    <IonText>
                           <h3>Abdul Aziz</h3>                      
                            <IonText className="d-flex phoneEmail">
                                <p><IonIcon icon={call}></IonIcon> +971 506398767</p>
                                <p><IonIcon icon={mail}></IonIcon> Abdulgmail.com</p>
                            </IonText>
                    </IonText>
                    <ion-checkbox slot="end"></ion-checkbox>
                  </IonItem>
            </IonCard>

            <IonCard className="userItem statusActive">
                  <IonItem lines="none" color="none">
                    <IonText>
                           <h3>Abdul Aziz</h3>                      
                            <IonText className="d-flex phoneEmail">
                                <p><IonIcon icon={call}></IonIcon> +971 506398767</p>
                                <p><IonIcon icon={mail}></IonIcon> Abdulgmail.com</p>
                            </IonText>
                    </IonText>
                    <ion-checkbox slot="end"></ion-checkbox>
                  </IonItem>
            </IonCard>
        
  
          
  
                </div>
          </IonContent>
        </IonPage>
      );
    };
    
    export default SelectUser;
    