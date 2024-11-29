import React, { useEffect, useState } from 'react';
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
import Loader from '../components/Loader';
import { ribbon, checkmark } from 'ionicons/icons'
import { useAuth } from '../api/AuthContext';
import useLoading from '../components/useLoading';
const ExamResult: React.FC = () => {

  const history = useHistory();
  const queryParams: any = history.location.state;
  const result = queryParams.data;
  return (
    <>
      <IonPage>
        <IonHeader className="ion-header">
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton></IonBackButton>
            </IonButtons>
            <IonTitle>Exam Result</IonTitle>
          </IonToolbar>
        </IonHeader>
       
      <IonContent fullscreen className="colorBg examResultWrapp">    
          <IonImg className="topbg" src="./assets/images/top-bg.svg"></IonImg>         
            <div className="bgSvg"> 
               
                      <IonCard className="blueBg ion-padding">

                          <IonText className="examResultHeading">
                          <h4>Raghuvarma Rudroju</h4>
                          <h5><span>Exam:</span> Sample Exam</h5>
                          </IonText>


                
                      </IonCard> 

                      <div className="examResultCount ">
                          <IonText>
                            <h5>Marks Obtained</h5>
                            <h2>44/60</h2>
                            </IonText>
                        </div>

                      <IonRow className="totalExamResultBlock">
                        <IonCol size="6">
                          <IonCard>
                            <IonText>
                              <h6>Status</h6>
                              <h3 className="passedText">Passed</h3>
                              </IonText>
                          </IonCard>
                        </IonCol>

                        <IonCol size="6">
                          <IonCard>
                            <IonText>
                              <h6>Duration Taken</h6>
                              <h3>0 Hour 19 Minutes</h3>
                              </IonText>
                          </IonCard>
                        </IonCol>

                       
                      </IonRow>     
     

                </div>
           
        </IonContent>

      </IonPage>
    </>
  );
};

export default ExamResult;

