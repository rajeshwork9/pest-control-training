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
import { getQuizList, getTransactionDetails, getUserList } from '../api/common';
import { toast } from 'react-toastify';
import { useEffect, useState } from "react";
import { useAuth } from "../api/AuthContext";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Keyboard, Pagination, Scrollbar, Zoom } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/keyboard';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/zoom';
import '@ionic/react/css/ionic-swiper.css';
import NoDataFound from "../components/NoDataFound";


const Quiz: React.FC = () => {
    const { isLoading, startLoading, stopLoading } = useLoading();
    const [loadingMessage, setLoadingMessage] = useState<string>('Loading....');
    const { userData } = useAuth();
    const [quizList, setQuizList] = useState<any>([]);
    const history = useHistory();
    const queryParams: any = history.location.state;


    useEffect(() => {
        getQuiz();
    }, []);

    const getQuiz = async () => {

        try {
            startLoading();
            const response = await getQuizList();
            console.log("Details", response);
            if (response.status == 200 && response.success) {
                console.log(response);
                setQuizList(response.data);
            }
            else {
                toast.dismiss();
                toast.error(response.message);
            }
        }
        catch (error: any) {
            console.error("Error fettching the Details:", error);
        }
        finally {
            stopLoading();
        }
    }
    const viewQuizDetails = async (quiz: any) => {
        history.push({
          pathname: "/exam",
          state: { id: quiz.id }
        });
      }
    return (
        <IonPage>
            <IonHeader className="ion-header">
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton></IonBackButton>
                    </IonButtons>
                    <IonTitle>Quiz List</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen className="colorBg selectedCoursesWrapp">
        <IonImg className="topbg" src="./assets/images/top-bg.svg"></IonImg>
        <div className="bgSvg">
          <div className="ion-margin">
            <IonList className="coursesItem" lines="none">
            {quizList && quizList.length > 0 && quizList.map((data: any, index: any) => (
              <IonCard className="userItem">
                <IonItem lines="none" color="none">
                  <IonText>
                    <div className="detailsArrow">
                      <h3>{data.quiz_name}</h3>
                      {/* onClick={(event) => viewTransactionDetails(data)} */}
                      <IonButton className="detailsArrowIcon" fill="clear" onClick={(event) => viewQuizDetails(data)}>
                        <IonImg src="./assets/images/details-arrow-icon.svg"></IonImg>
                      </IonButton>
                    </div>
                  </IonText>
                </IonItem>
                <div className="tranListCount">
                  <IonRow>
                    <IonCol size="4">
                      <IonText>
                        <p>Marks</p>
                        <h6>{data.total_marks}</h6>
                      </IonText>
                    </IonCol>
                    <IonCol size="4">
                      <IonText>
                        <p>Questions</p>
                        <h6>{data.no_of_questions}</h6>
                      </IonText>
                    </IonCol>
                    <IonCol size="4">
                      <IonText>
                        <p>Time</p>
                        <h6>{data.no_of_questions}</h6>
                      </IonText>
                    </IonCol>
                  </IonRow>
                </div>
              </IonCard>
            ))}
              {quizList && quizList.length === 0 &&
                    <NoDataFound message="No data found" />
              }
            </IonList>

          </div>
        </div>
      </IonContent>
      {isLoading && <Loader message={loadingMessage} />}
            {isLoading && <Loader message={loadingMessage} />}

        </IonPage>
    );
};

export default Quiz;
