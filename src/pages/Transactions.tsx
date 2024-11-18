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
import { getTransactions, getUserList } from '../api/common';
import { toast } from 'react-toastify';
import { useEffect, useState } from "react";
import { useAuth } from "../api/AuthContext";

const Transactions: React.FC = () => {
  const { isLoading, startLoading, stopLoading } = useLoading();
const [loadingMessage, setLoadingMessage] = useState<string>('Loading....');
  const { userData } = useAuth();
  const selectedTransactionData = localStorage.getItem('selectedTransactions');
  const parsedData = selectedTransactionData ? JSON.parse(selectedTransactionData) : [];
  const [transactionList, setTransactionList] = useState<any[]>([]);
  const history = useHistory();
  const [selectedTransactions, setSelectedTransactions] = useState<any[]>(Array.isArray(parsedData) ? parsedData : []);


  useEffect(() => {
    console.log(userData);
    getTransactionsList();
  }, []);

  const getTransactionsList = async () => {
    let payload = {
      "columns": [
        "tbl_enrolls.id",
        "tbl_enrolls.enrollment_id",
        "tbl_enrolls.no_of_courses",
        //"tbl_courses.course_name",
        "tbl_enrolls.no_of_users",
        "tbl_enrolls.total_amount",
        "tbl_enrolls.payment_status",
        "tbl_enrolls.payment_id"
      ],
      "order_by": {
        "tbl_enrolls.created_on": "desc"
      },
      "filters": {
        //"tbl_enrolls.created_by" : userData.id,
      },
      "pagination": {
        "limit": "10",
        "page": "1"
      }
    }
    try {
      startLoading();
      const response = await getTransactions(payload);
      console.log("Details", response);
      if (response.status == 200 && response.success) {
        console.log(response);
        setTransactionList(response.data);
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
  const viewTransactionDetails = async (transaction: any) => {
    history.push({
      pathname: "/transactions-details",
      state: { id: transaction.enrollment_id }
    });
  }
  return (
    <IonPage>
      <IonHeader className="ion-header">
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton></IonBackButton>
          </IonButtons>
          <IonTitle>Transactions</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="colorBg transactionsWrapp">
        <IonImg className="topbg" src="./assets/images/top-bg.svg"></IonImg>
        <div className="bgSvg">
          <div className="ion-margin">
            {transactionList && transactionList.length > 0 && transactionList.map((data: any, index: any) => (
              <IonCard className="userItem">
                <IonItem lines="none" color="none">
                  <IonThumbnail slot="start">
                    <IonImg src="assets/images/transactions-icon.svg"></IonImg>
                  </IonThumbnail>
                  <IonText>
                    <div className="detailsArrow">
                      <h3>{data.enrollment_id}</h3>
                      {/* onClick={(event) => viewTransactionDetails(data)} */}
                      <IonButton className="detailsArrowIcon" fill="clear" >
                        <IonImg src="./assets/images/details-arrow-icon.svg"></IonImg>
                      </IonButton>
                    </div>
                  </IonText>
                </IonItem>
                <div className="tranListCount">
                  <IonRow>
                    <IonCol size="4">
                      <IonText>
                        <p>Courses</p>
                        <h6>{data.no_of_courses}</h6>
                      </IonText>
                    </IonCol>
                    {userData.user_type == 17 && 
                    <IonCol size="4">
                      <IonText>
                        <p>Users</p>
                        <h6>{data.no_of_users}</h6>
                      </IonText>
                    </IonCol>
                    }
                    <IonCol size="4">
                      <IonText>
                        <p>Amount (ADE)</p>
                        <h6>{data.total_amount}</h6>
                      </IonText>
                    </IonCol>
                  </IonRow>
                </div>
              </IonCard>
            ))}
          </div>
        </div>
      </IonContent>
                {isLoading && <Loader message={loadingMessage} />}

    </IonPage>
  );
};

export default Transactions;
