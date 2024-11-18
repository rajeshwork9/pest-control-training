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
import { getUserList } from '../api/common';
import { toast } from 'react-toastify';
import { useEffect, useState } from "react";

const SelectUser: React.FC = () => {
  const { isLoading, startLoading, stopLoading } = useLoading();
const [loadingMessage, setLoadingMessage] = useState<string>('Loading....');
  const [UserList, setUserList] = useState<any[]>([]);
  const history = useHistory();

  const selectedCourseData = JSON.stringify(localStorage.getItem('selectedCourse'));
  const [selectedCourse, setselectedCourse] = useState<any>(JSON.parse(selectedCourseData ? JSON.parse(selectedCourseData) : []));

  const selectedUserData = localStorage.getItem('selectedUsers');
  const parsedData = selectedUserData ? JSON.parse(selectedUserData) : [];
  const [selectedUsers, setSelectedUsers] = useState<any[]>(Array.isArray(parsedData) ? parsedData : []);

  useEffect(() => {
    console.log(selectedCourse);
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
        "tbl_status.id": 3
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
  const handleUserChange = async (event: any, data: any) => {
    const { value, checked } = event.target;
    console.log(data);

    setSelectedUsers((prevSelectedItems) => {
      if (checked) {
        const isSelected = selectedUsers.find((item: any) => item.id == data.id);
        // Add the item if it's checked and not already in the array
        if (!isSelected) {
          return [...prevSelectedItems, data];
        } else {
          return [...prevSelectedItems]
        }

      } else {
        // Remove the item if it's unchecked
        return prevSelectedItems.filter((item: any) => item.id !== data.id);
      }
    });
  };
  const isItemSelected = (itemId: string) => {
    console.log(selectedUsers);
    return (selectedUsers || []).find((item: any) => item.id === itemId) !== undefined;
  };
  const proceed = async () => {
    if (selectedUsers.length == 0) {
      toast.dismiss();
      toast.error('Please select atleast one user');
      return;
    }
    selectedUsers.map((user) => {
      selectedCourse.properties.map((property: any) => {
        property.isChecked = true;
        if (property.id == 1) {
          property.price = selectedCourse.course_price;
        }
        if (property.id == 2) {
          property.price = selectedCourse.exam_price;
        }
        if (property.id == 3) {
          property.price = selectedCourse.license_price;
        }
      });
      selectedCourse.total = selectedCourse.properties.reduce((accumulator: any, currentItem: any) => {
        return accumulator + parseInt(currentItem.price);
      }, 0);
      selectedCourse.total = parseFloat(selectedCourse.total).toFixed(2);
    });
    localStorage.setItem('selectedUsers', JSON.stringify(selectedUsers));
    history.push("/payment-details");

  };
  return (
    <IonPage>
      <IonHeader className="ion-header">
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton></IonBackButton>
          </IonButtons>
          <IonTitle>Select Users</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="colorBg seclectedCoursesDetailsWrapp">
        <IonImg className="topbg" src="./assets/images/top-bg.svg"></IonImg>
        <div className="bgSvg">
          <div className="blueBg">
            <IonList className="coursesDHeader" lines="none">
              <IonItem lines="none" color="none" className="itemActive">
                <IonThumbnail slot="start">
                  <IonIcon icon={ribbon}></IonIcon>
                </IonThumbnail>
                <IonText>
                  <h3>{selectedCourse.course_name}</h3>
                  <p>{selectedCourse.description}</p>
                </IonText>
              </IonItem>
            </IonList>
          </div>
          {UserList && UserList.length > 0 && UserList.map((data: any, index: any) => (
            <IonCard className="userItem statusActive">
              <IonItem lines="none" color="none">
                <IonText>
                  <h3>{data.first_name} {data.last_name}</h3>
                  <IonText className="d-flex phoneEmail">
                    <p><IonIcon icon={call}></IonIcon>{data.mobile_no}</p>
                    <p><IonIcon icon={mail}></IonIcon> {data.email_id}</p>
                  </IonText>
                </IonText>
                <IonCheckbox className='custom-checkbox' value={data.id} checked={isItemSelected(data.id)} onIonChange={(event) => handleUserChange(event, data)}></IonCheckbox>
              </IonItem>
            </IonCard>
          ))}
        </div>
      </IonContent>
                {isLoading && <Loader message={loadingMessage} />}
      <IonFooter>
        <IonToolbar>
          <IonButton onClick={(event) => proceed()} shape="round" expand="block" color="primary" >Continue</IonButton>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};

export default SelectUser;
