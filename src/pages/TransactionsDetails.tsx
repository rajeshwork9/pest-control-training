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
import { getTransactionDetails, getUserList } from '../api/common';
import { toast } from 'react-toastify';
import { useEffect, useState } from "react";
import { useAuth } from "../api/AuthContext";

const TransactionsDetails: React.FC = () => {
  const { isLoading, startLoading, stopLoading } = useLoading();
  const [loadingMessage, setLoadingMessage] = useState<string>('Loading....');
  const { userData } = useAuth();
  const [transactionDetails, setTransactionDetails] = useState<any>([]);
  const history = useHistory();
  const filePath = useHistory();
  const queryParams: any = history.location.state;


  useEffect(() => {
    getTransactionData();
  }, []);

  const getTransactionData = async () => {

    try {
      startLoading();
      const response = await getTransactionDetails(queryParams.id);
      console.log("Details", response);
      if (response.status == 200 && response.success) {
        console.log(response);
        setTransactionDetails(response.data);
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
  return (
    <IonPage>
      <IonHeader className="ion-header">
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton></IonBackButton>
          </IonButtons>
          <IonTitle>Transactions Details</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="colorBg transDetailsWrapp">
        <IonImg className="topbg" src="./assets/images/top-bg.svg"></IonImg>
        <div className="bgSvg">
          <IonImg className="doneImg" src="./assets/images/done-img.svg"></IonImg>

          <IonText className="tdpayment">
            <h2>{transactionDetails.total_amount} <span>AED</span></h2>
            <h6>Payment {transactionDetails.payment_status}</h6>
          </IonText>

          <div className="tdCard ion-margin-top">
            <IonCard className="ion-padding">
              <IonText className="headingtd"><h3>Payment Details</h3></IonText>
              <IonText>
                <p>Date</p>
                <h4>09/10/2023</h4>
              </IonText>
              <IonText>
                <p>Enrollment ID</p>
                <h4>{transactionDetails.enrollment_id}</h4>
              </IonText>
              <IonText>
                <p>No Of Transactions</p>
                <h4>1</h4>
              </IonText>
              {transactionDetails.course_name &&
                <IonText>
                  <p>Course Name</p>
                  <h4>{transactionDetails.course_name}</h4>
                </IonText>
              }
              {!transactionDetails.course_name &&
                <IonText>
                  <p>No Of Courses</p>
                  <h4>{transactionDetails.no_of_courses}</h4>
                </IonText>
              }
              {transactionDetails.user_details &&
                <IonText>
                  <p>No Of Users</p>
                  <h4>{transactionDetails.no_of_users}</h4>
                </IonText>
              }
              <IonText>
                <p>Payment Status</p>
                <h4>{transactionDetails.payment_status}</h4>
              </IonText>
            </IonCard>
            {transactionDetails.course_details && transactionDetails.course_details.length > 0 &&
              <IonCard className="ion-padding">
                <IonText className="headingtd"><h3>Course Details</h3></IonText>
                <IonList className="coursesItem" lines="none">
                  {transactionDetails.course_details.map((data: any, index: any) => (
                    <IonItem>
                      <IonThumbnail slot="start">
                        <IonIcon icon={ribbon}></IonIcon>
                      </IonThumbnail>
                      <IonText className="width100">
                        <div className="detailsArrow">
                          <h3>{data.course_name}</h3>
                        </div>
                        <p>{data.description}</p>
                      </IonText>
                    </IonItem>
                  ))}
                </IonList>
              </IonCard>
            }
            {transactionDetails.user_details && transactionDetails.user_details.length > 0 &&
              <IonCard className="ion-padding">
                <IonText className="headingtd"><h3>User Details</h3></IonText>
                <IonList className="usersItem" lines="none">
                  {transactionDetails.user_details.map((data: any, index: any) => (
                    <IonItem>
                      <IonThumbnail slot="start">
                        <IonIcon icon={personOutline}></IonIcon>
                      </IonThumbnail>
                      <IonText className="width100">
                        <div className="detailsArrow">
                          <h3>{data.first_name} {data.last_name}</h3>
                        </div>
                        <IonText className="d-flex phoneEmail">
                          <p><IonIcon icon={call}></IonIcon> {data.mobile_no}</p>
                          <p><IonIcon icon={mail}></IonIcon> {data.email_id}</p>
                        </IonText>
                      </IonText>
                    </IonItem>
                  ))}
                </IonList>
              </IonCard>
            }
          </div>
        </div>
      </IonContent>
      {isLoading && <Loader message={loadingMessage} />}

    </IonPage>
  );
};

export default TransactionsDetails;
