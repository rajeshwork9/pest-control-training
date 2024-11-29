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
const QuizResult: React.FC = () => {
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
            <IonTitle>Quiz Result</IonTitle>
          </IonToolbar>
        </IonHeader>
       
      <IonContent fullscreen className="colorBg quizResultWrapp">    
          <IonImg className="topbg" src="./assets/images/top-bg.svg"></IonImg>         
            <div className="bgSvg"> 
               
                      <IonCard className="blueBg ion-padding">
                        <div className="quizResultCount ">
                          <IonText>
                            <h5>Your Score</h5>
                            <h2>{result.secured_marks}</h2>
                            </IonText>
                        </div>
                      </IonCard> 

                      <IonRow className="totalResultBlock">
                        <IonCol size="4">
                          <IonCard>
                            <IonText>
                              <h6>Total Questios</h6>
                              <h3>05</h3>
                              </IonText>
                          </IonCard>
                        </IonCol>

                        <IonCol size="4">
                          <IonCard>
                            <IonText>
                              <h6>Answered</h6>
                              <h3>05</h3>
                              </IonText>
                          </IonCard>
                        </IonCol>

                        <IonCol size="4">
                          <IonCard>
                            <IonText>
                              <h6>Correct</h6>
                              <h3>04</h3>
                              </IonText>
                          </IonCard>
                        </IonCol>
                      </IonRow>     
                <IonText className="quizResultCont">
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam et enim in enim egestas semper vitae mattis est. Sed vehicula, ipsum sed suscipit laoreet, mi elit scelerisque tellus</p>
                </IonText>

                </div>
           
        </IonContent>

      </IonPage>
    </>
  );
};

export default QuizResult;

