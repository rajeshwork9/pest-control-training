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
  IonFooter,
  IonSearchbar,
  IonFab,
  IonFabButton
} from "@ionic/react";
import { useHistory } from 'react-router';
import Loader from '../components/Loader';
import { ribbon, ellipse, call, mail, add } from 'ionicons/icons'
import useLoading from '../components/useLoading';
import { getUserList } from '../api/common';
import { toast } from 'react-toastify';

const UserList: React.FC = () => {
  const { isLoading, startLoading, stopLoading } = useLoading();
const [loadingMessage, setLoadingMessage] = useState<string>('Loading....');
  const [UserList, setUserList] = useState<any[]>([]);
  const history = useHistory();

  useEffect(() => {
    getUsersList();
  }, []);

  const getUsersList = async () => {
    let payload = {
      "columns": [
        "tbl_training_users.id",
        "tbl_training_users.first_name",
        "tbl_training_users.last_name",
        "tbl_training_users.email_id",
        "tbl_training_users.mobile_no",
        "tbl_status.status_name",
        "tbl_roles.role_name",
        "tbl_status.id as status_id",

      ],
      "order_by": {
        "tbl_training_users.created_on": "desc"
      },
      "filters": {
        
      },
      "pagination": {
        "limit": "10",
        "page": "1"
      }
    }
    try {
      startLoading();
      const response = await getUserList(payload);
      console.log("Leave Details", response);
      if (response.status == 200 && response.success) {
        console.log(response);
        setUserList(response.data);
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
            <p className="statusActive"><IonIcon className="statusEllipse" icon={ellipse}></IonIcon>Active</p>
            <p className="statusInactive"><IonIcon className="statusEllipse" icon={ellipse}></IonIcon>Inactive</p>
          </div>

          <div className="ion-margin">
            {UserList.map((data: any) => (
              <IonCard key={data.id} className={data.status_name === 'Active' ? "userItem statusActive" : "userItem statusInactive"}>
                <IonItem lines="none" color="none">
                  <IonThumbnail slot="start">
                    {/* <IonIcon icon={person}></IonIcon>*/}
                    <IonImg src="assets/images/user-icon.svg"></IonImg>
                    <IonIcon className="statusEllipse" icon={ellipse}></IonIcon>
                  </IonThumbnail>

                  <IonText>
                    <div className="detailsArrow">
                      <h3>{data.first_name} {data.last_name}</h3>
                      <IonButton className="detailsArrowIcon" fill="clear">
                        <IonImg src="./assets/images/details-arrow-icon.svg"></IonImg>
                      </IonButton>
                    </div>
                    <IonText className="d-flex phoneEmail">
                      <p><IonIcon icon={call}></IonIcon>{data.mobile_no}</p>
                      <p><IonIcon icon={mail}></IonIcon>{data.email_id}</p>
                    </IonText>

                  </IonText>
                </IonItem>
              </IonCard>
            ))}

          </div>


          <IonFab slot="fixed" vertical="bottom" horizontal="end">
            <IonFabButton routerLink="/user-create">
              <IonIcon icon={add}></IonIcon>
            </IonFabButton>
          </IonFab>
        </IonContent>
                {isLoading && <Loader message={loadingMessage} />}
      </IonPage>
    </>
  );


}

export default UserList
