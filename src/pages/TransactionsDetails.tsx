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
import { ribbon, ellipse, call, mail, add } from 'ionicons/icons'
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

    let payload = {
      "columns": [
        "tbl_transactions.id as transaction_id",
        "tbl_transactions.transaction_name",
        "tbl_transactions.description",
        "tbl_enrolls.enrollment_id",
        "tbl_training_users.first_name",
        "tbl_training_users.last_name",
        "tbl_training_users.email_id",
        "tbl_training_users.mobile_no"
      ],
      "order_by": {
        "tbl_enrolls.created_on": "desc"
      },
      "filters": {
        "tbl_enrolls.enrollment_id": queryParams.id
      },
      "pagination": {
        "limit": "10",
        "page": "1"
      }
    }
    try {
      startLoading();
      const response = await getTransactionDetails(payload);
      console.log("Details", response);
      if (response.status == 200 && response.success) {
        console.log(response);
        setTransactionDetails(response.data[0]);
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
            <h2>1463 <span>AED</span></h2>
            <h6>Payment Successful</h6>
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
                <h4>PCT552045888</h4>
              </IonText>

              <IonText>
                <p>No Of Transactions</p>
                <h4>1</h4>
              </IonText>

              <IonText>
                <p>No Of Users</p>
                <h4>23</h4>
              </IonText>

              <IonText>
                <p>Payment Status</p>
                <h4>completed</h4>
              </IonText>
            </IonCard>


          </div>
        </div>
      </IonContent>
                {isLoading && <Loader message={loadingMessage} />}

    </IonPage>
  );
};

export default TransactionsDetails;
