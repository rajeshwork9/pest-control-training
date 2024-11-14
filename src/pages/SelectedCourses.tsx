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
    IonFooter
  } from "@ionic/react";
  import { useHistory } from 'react-router';
import { ribbon, checkmark } from 'ionicons/icons'
 
  const SelectedCourses: React.FC = () => {
    return (
      <IonPage>

            <IonHeader className="ion-header">
              <IonToolbar>
                <IonButtons slot="start">
                  <IonBackButton></IonBackButton>
                </IonButtons>
                <IonTitle>Selected Courses List</IonTitle>
              </IonToolbar>
            </IonHeader>

            <IonContent fullscreen className="colorBg selectedCoursesWrapp">    
          <IonImg className="topbg" src="./assets/images/top-bg.svg"></IonImg>         
            <div className="bgSvg">
              <div className="ion-margin">
                <IonList className="coursesItem" lines="none">
                  <IonItem>
                    <IonThumbnail slot="start">
                        <IonIcon icon={ribbon}></IonIcon>                      
                    </IonThumbnail>
                    <IonText>
                       <div className="detailsArrow">
                           <h3>Course-1</h3>
                          <IonButton  className="detailsArrowIcon" routerLink="/selected-courses-details">
                            <IonImg src="./assets/images/details-arrow-icon.svg"></IonImg>
                          </IonButton>
                        </div>
                      
                      <p>Aliquam porttitor tincidunt purus, eget molestie dui venenatis et</p>
                    </IonText>
                  </IonItem>
                </IonList>
                
              </div>
            </div>
        </IonContent>
      </IonPage>
    );
  };
  
  export default SelectedCourses;
  