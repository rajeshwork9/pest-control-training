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
import { ribbon, checkmark, documents, download } from 'ionicons/icons'
import { getCurrentLocation } from "../utils/locationProvider";
import useLoading from "../components/useLoading";
import { useAuth } from "../api/AuthContext";
import { useEffect, useState } from "react";
import { getIndividualCourseData, getIndividualCourseList } from "../api/common";
import { toast } from 'react-toastify';

const SelectedCoursesDetails: React.FC = () => {
  const { isLoading, startLoading, stopLoading } = useLoading();
  const { userData } = useAuth();
  const [courseDetails, setCourseDetails] = useState<any>([]);
  const history = useHistory();

  const queryParams: any = history.location.state;

  useEffect(() => {
    console.log(queryParams);
    getCourseData();
  }, []);

  const getCourseData = async () => {
    let payload = {
      "columns": [
        "tbl_courses.id as course_id",
        "tbl_courses.course_name",
        "tbl_courses.description",
        "tbl_course_materials.material",
        "tbl_enrolled_courses.user_id"
      ],
      "order_by": {
        "tbl_courses.course_name": "desc"
      },
      "filters": {
        "tbl_enrolled_courses.course_id": queryParams.id
      },
      "pagination": {
        "limit": "10",
        "page": "1"
      }
    }
    try {
      startLoading();
      const response = await getIndividualCourseData(payload);
      console.log("Details", response);
      if (response.status == 200 && response.success) {
        console.log(response);
        setCourseDetails(response.data[0]);
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
  const pollLocation = async () => {
    try {
      const position = await getCurrentLocation();

      if (position) {
        console.log(position);
        // toast.info(response.data.message);
      } else {
        console.error("user not loggedin")
      }
    } catch (e) {
      console.error("Geolocation Error or user not logged in.");
    }
  };
  return (
    <IonPage>
      <IonHeader className="ion-header">
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton></IonBackButton>
          </IonButtons>
          <IonTitle>Selected Course Details</IonTitle>
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
                  <h3>{courseDetails.course_name}</h3>
                  <p>Aliquam porttitor tincidunt purus, eget molestie dui venenatis et Aliquam porttitor tincidunt purus, eget molestie dui venenatis.</p>

                  <p>Aliquam porttitor tincidunt purus, eget molestie dui venenatis et Aliquam porttitor tincidunt purus, eget molestie dui venenatis.</p>
                </IonText>
              </IonItem>
            </IonList>


            <div className="coursePrice ion-padding-horizontal">
              <IonRow>
                <IonCol> <IonText><h6>Course Price</h6><h3>900 <span>AED</span></h3> </IonText></IonCol>
                <IonCol><IonText><h6>Exam Price</h6><h3>50 <span>AED</span></h3> </IonText></IonCol>
                <IonCol> <IonText><h6>License Price</h6><h3>50 <span>AED</span></h3> </IonText></IonCol>
              </IonRow>
            </div>
          </div>

          <div className="innerDownloadFiles">
            <IonItem color="none" lines="none">
              <IonText className="filesActive">Files</IonText>
              <IonButton slot="end" className="orangeBt" shape="round" expand="block">MARK ATTENDANCE</IonButton>
            </IonItem>

            <IonList lines="none" className="zipCard">
              <IonItem lines="none" className="ion-justify-content-between">
                <div className="scd-iconText">
                  <IonIcon icon={documents}></IonIcon>
                  <IonText>Curabitur efficitur turpis ut odio</IonText>
                </div>
                <IonButton slot="end" className="scd-downloadBt" fill="clear"><IonIcon slot="end" icon={download}></IonIcon>
                </IonButton>
              </IonItem>

              <IonItem lines="none" className="ion-justify-content-between">
                <div className="scd-iconText">
                  <IonIcon icon={documents}></IonIcon>
                  <IonText>Curabitur efficitur turpis ut odio</IonText>
                </div>
                <IonButton slot="end" className="scd-downloadBt" fill="clear"><IonIcon slot="end" icon={download}></IonIcon>
                </IonButton>
              </IonItem>

            </IonList>

          </div>




        </div>
      </IonContent>
    </IonPage>
  );
};

export default SelectedCoursesDetails;
