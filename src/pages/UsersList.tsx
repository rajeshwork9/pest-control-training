import React, { useState } from 'react';
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
    IonFooter,
    IonSearchbar,
    IonFab,
    IonFabButton
  } from "@ionic/react";
  import { useHistory } from 'react-router';
import { ribbon, ellipse, call, mail, add } from 'ionicons/icons'

const UserList: React.FC = () => {
    return (
      <>
        <IonPage>

        <IonHeader className="ion-header">
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton></IonBackButton>
          </IonButtons>
          <IonTitle className="ion-no-padding">Users List</IonTitle>
        </IonToolbar>
      </IonHeader>

          <IonContent className="colorBg dashboardWrapp">
            <IonImg className="topbg" src="./assets/images/top-bg.svg"></IonImg> 
            <IonSearchbar className="ion-seachbar"></IonSearchbar>

                <div className="statusIndicat">
                   <p className="statusActive"><IonIcon className="statusEllipse"  icon={ellipse}></IonIcon>Active</p>
                   <p className="statusInactive"><IonIcon className="statusEllipse"  icon={ellipse}></IonIcon>Inactive</p>
                </div>

<div className="ion-margin">
            <IonCard className="userItem statusActive">
                  <IonItem lines="none" color="none">
                    <IonThumbnail slot="start">
                        {/* <IonIcon icon={person}></IonIcon>*/}
                        <IonImg src="assets/images/user-icon.svg"></IonImg>
                      <IonIcon  className="statusEllipse" icon={ellipse}></IonIcon>
                    </IonThumbnail>
                    
                    <IonText>
                       <div className="detailsArrow">
                           <h3>Abdul Aziz</h3>
                          <IonButton className="detailsArrowIcon" fill="clear" routerLink="/users-details">
                            <IonImg src="./assets/images/details-arrow-icon.svg"></IonImg>
                          </IonButton>
                        </div>
                            <IonText className="d-flex phoneEmail">
                                <p><IonIcon icon={call}></IonIcon> +971 506398767</p>
                                <p><IonIcon icon={mail}></IonIcon> Abdulgmail.com</p>
                            </IonText>
                    
                    </IonText>
                  </IonItem>
            </IonCard>

            <IonCard className="userItem statusActive">
                  <IonItem lines="none" color="none">
                    <IonThumbnail slot="start">
                        {/* <IonIcon icon={person}></IonIcon>*/}
                        <IonImg src="assets/images/user-icon.svg"></IonImg>
                      <IonIcon  className="statusEllipse " icon={ellipse}></IonIcon>
                    </IonThumbnail>
                    
                    <IonText>
                       <div className="detailsArrow">
                           <h3>Abdul Aziz</h3>
                          <IonButton className="detailsArrowIcon" fill="clear" routerLink="/users-details">
                            <IonImg src="./assets/images/details-arrow-icon.svg"></IonImg>
                          </IonButton>
                        </div>
                            <IonText className="d-flex phoneEmail">
                                <p><IonIcon icon={call}></IonIcon> +971 506398767</p>
                                <p><IonIcon icon={mail}></IonIcon> Abdulgmail.com</p>
                            </IonText>
                    
                    </IonText>
                  </IonItem>
                  <div className="userStatusCourses">
                    <IonText><p><span>Course:</span> Course1</p></IonText>
                  </div>
            </IonCard>

            <IonCard className="userItem statusInactive">
                  <IonItem lines="none" color="none">
                    <IonThumbnail slot="start">
                        {/* <IonIcon icon={person}></IonIcon>*/}
                        <IonImg src="assets/images/user-icon.svg"></IonImg>
                      <IonIcon  className="statusEllipse " icon={ellipse}></IonIcon>
                    </IonThumbnail>
                    
                    <IonText>
                       <div className="detailsArrow">
                           <h3>Abdul Aziz</h3>
                          <IonButton className="detailsArrowIcon" fill="clear" routerLink="/users-details">
                            <IonImg src="./assets/images/details-arrow-icon.svg"></IonImg>
                          </IonButton>
                        </div>
                            <IonText className="d-flex phoneEmail">
                                <p><IonIcon icon={call}></IonIcon> +971 506398767</p>
                                <p><IonIcon icon={mail}></IonIcon> Abdulgmail.com</p>
                            </IonText>
                    
                    </IonText>
                  </IonItem>
            </IonCard>

            <IonCard className="userItem statusActive">
                  <IonItem lines="none" color="none">
                    <IonThumbnail slot="start">
                        {/* <IonIcon icon={person}></IonIcon>*/}
                        <IonImg src="assets/images/user-icon.svg"></IonImg>
                      <IonIcon  className="statusEllipse" icon={ellipse}></IonIcon>
                    </IonThumbnail>
                    
                    <IonText>
                       <div className="detailsArrow">
                           <h3>Abdul Aziz</h3>
                          <IonButton className="detailsArrowIcon" fill="clear" routerLink="/users-details">
                            <IonImg src="./assets/images/details-arrow-icon.svg"></IonImg>
                          </IonButton>
                        </div>
                            <IonText className="d-flex phoneEmail">
                                <p><IonIcon icon={call}></IonIcon> +971 506398767</p>
                                <p><IonIcon icon={mail}></IonIcon> Abdulgmail.com</p>
                            </IonText>
                    
                    </IonText>
                  </IonItem>
            </IonCard>
    </div>
    
       
    <IonFab slot="fixed" vertical="bottom" horizontal="end">
      <IonFabButton routerLink="/user-create">
        <IonIcon icon={add}></IonIcon>
      </IonFabButton>
    </IonFab>
          </IonContent>
        </IonPage>
      </>
    );


}

export default UserList
