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
    IonFooter,
} from "@ionic/react";
import { useHistory } from 'react-router';
import Loader from '../components/Loader';
import { ribbon, ellipse, call, mail, add, personOutline } from 'ionicons/icons'
import useLoading from '../components/useLoading';
import { toast } from 'react-toastify';
import { useEffect, useState } from "react";
import { useAuth } from "../api/AuthContext";
import '@ionic/react/css/ionic-swiper.css';
import NoDataFound from "../components/NoDataFound";


const ResultList: React.FC = () => {
    const { isLoading, startLoading, stopLoading } = useLoading();
    const [loadingMessage, setLoadingMessage] = useState<string>('Loading....');
    const { userData } = useAuth();
    const history = useHistory();
    const queryParams: any = history.location.state;


    return (
        <IonPage>
            <IonHeader className="ion-header">
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton></IonBackButton>
                    </IonButtons>
                    <IonTitle>Result List</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent fullscreen className="colorBg quizWrapp resultWrapp">
        <IonImg className="topbg" src="./assets/images/top-bg.svg"></IonImg>

      

        <div className="bgSvg">
          <div>
            <IonList className="quizIList" lines="none">
              <IonCard>
                <IonItem lines="none" color="none">
                  <IonText><h3>Sample Exam Sample ExamSample ExamSample ExamSample ExamSample Exam</h3></IonText>
                      {/* onClick={(event) => viewTransactionDetails(data)} */}
                      <IonButton slot="end" className="detailsArrowIcon" fill="clear">
                        <IonImg src="./assets/images/details-arrow-icon.svg"></IonImg>
                      </IonButton>
                </IonItem>

                <div className="quizCount resultCount">
                  <IonRow>
                    <IonCol size="4">
                      <IonText>
                        <p>No Of Questions</p>
                        <h6>29</h6>
                      </IonText>
                    </IonCol>
                    <IonCol size="4">
                      <IonText>
                        <p>Test Duration</p>
                        <h6>60</h6>
                      </IonText>
                    </IonCol>

                    <IonCol size="4">
                      <IonText>
                        <p>Status</p>
                        <h6 class="statusPending">Completed</h6>
                      </IonText>
                    </IonCol>

                    
                    
                  </IonRow>
                </div>

                {/* <div className="quizCount resultCountbottom">
                  <IonRow>    

                    <IonCol size="4">
                      <IonText>
                        <p>Total Marks</p>
                        <h6>60</h6>
                      </IonText>
                    </IonCol>

                    <IonCol size="4">
                      <IonText>
                        <p>Cutoff Marks</p>
                        <h6>35</h6>
                      </IonText>
                    </IonCol>

                    <IonCol size="4">
                      <IonText>
                        <p>Marks Obtained</p>
                        <h6>10</h6>
                      </IonText>
                    </IonCol>
                  </IonRow>
                </div> */}
              </IonCard>

     
            </IonList>

          </div>
        </div>
      </IonContent>
     
        </IonPage>
    );
};

export default ResultList;
