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
import { getResults, getTransactions } from "../api/common";


const ResultList: React.FC = () => {
  const { isLoading, startLoading, stopLoading } = useLoading();
  const [loadingMessage, setLoadingMessage] = useState<string>('Loading....');
  const { userData } = useAuth();
  const history = useHistory();
  const [resultList, setResultList] = useState<any[]>([]);
  const queryParams: any = history.location.state;

  useEffect(() => {
    console.log(userData);
    getResultsList();
  }, []);

  const getResultsList = async () => {
    let payload = {
      "columns": [
        "tbl_scheduled_exams.id",
        "tbl_scheduled_exams.marks_obtained",
        "tbl_scheduled_exams.total_marks",
        "tbl_scheduled_exams.cutoff_marks",
        "tbl_scheduled_exams.is_qualified",
        "tbl_tests.test_name",
        "tbl_tests.no_of_questions",
        "tbl_tests.test_duration",
        "tbl_tests.test_marks",
        "tbl_status.status_name"
      ],
      "order_by": {
        "tbl_scheduled_exams.updated_on": "DESC"
      },
      "filters": {},
      "pagination": {
        "limit": "10",
        "page": "1"
      }
    }

    try {
      startLoading();
      const response = await getResults(payload);
      console.log("Details", response);
      if (response.status == 200 && response.success) {
        console.log(response);
        setResultList(response.data);
      }
      else {
        toast.dismiss();
        toast.error(response.message);
      }
    }
    catch (error: any) {
      console.error("Error fettching the leaves:", error);
    }
    finally {
      stopLoading();
    }
  }
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
          {resultList && resultList.length > 0 && resultList.map((data: any, index: any) => (
            <IonList className="quizIList" lines="none">
              <IonCard>
                <IonItem lines="none" color="none">
                  <IonText><h3>{data.test_name}</h3></IonText>
                </IonItem>
                <div className="quizCount resultCount">
                  <IonRow>
                    <IonCol size="4">
                      <IonText>
                        <p>No Of Questions</p>
                        <h6>{data.no_of_questions}</h6>
                      </IonText>
                    </IonCol>
                    <IonCol size="4">
                      <IonText>
                        <p>Test Duration</p>
                        <h6>{data.test_duration}</h6>
                      </IonText>
                    </IonCol>
                    <IonCol size="4">
                      <IonText>
                        <p>Status</p>
                        <h6 className="statusPending">{data.status_name}</h6>
                      </IonText>
                    </IonCol>
                  </IonRow>
                </div>
                <div className="quizCount resultCountbottom">
                  <IonRow>
                    <IonCol size="4">
                      <IonText>
                        <p>Total Marks</p>
                        <h6>{data.total_marks}</h6>
                      </IonText>
                    </IonCol>
                    <IonCol size="4">
                      <IonText>
                        <p>Cutoff Marks</p>
                        <h6>{data.cutoff_marks}</h6>
                      </IonText>
                    </IonCol>
                    <IonCol size="4">
                      <IonText>
                        <p>Marks Obtained</p>
                        <h6>{data.marks_obtained}</h6>
                      </IonText>
                    </IonCol>
                  </IonRow>
                </div>
              </IonCard>
            </IonList>
            ))}
            {resultList && resultList.length === 0 &&
                    <NoDataFound message="No results found" />
              }
          </div>
        </div>
      </IonContent>
      {isLoading && <Loader message={loadingMessage} />}
    </IonPage>
  );
};

export default ResultList;
