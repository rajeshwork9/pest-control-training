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
  isPlatform,
  IonSegment,
  IonSegmentButton,
  IonSegmentView,
  IonSegmentContent,
  IonFooter,

} from "@ionic/react";
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { useHistory } from 'react-router';
import Loader from '../components/Loader';
import { ribbon, checkmark, documents, download, ellipse, call, mail, add } from 'ionicons/icons'
import { getCurrentLocation } from "../utils/locationProvider";
import useLoading from "../components/useLoading";
import { useAuth } from "../api/AuthContext";
import { useEffect, useState } from "react";
import { getBase64Path, getIndividualCourseData, getIndividualCourseList, markAttendance } from "../api/common";
import { toast } from 'react-toastify';
import { Browser } from "@capacitor/browser";

const SelectedCoursesDetails: React.FC = () => {
  const { isLoading, startLoading, stopLoading } = useLoading();
  const [loadingMessage, setLoadingMessage] = useState<string>('Loading....');
  const { userData } = useAuth();
  const [courseDetails, setCourseDetails] = useState<any>([]);
  const history = useHistory();
  const filePath = useHistory();
  const queryParams: any = history.location.state;
  const apiUrl: any = import.meta.env.VITE_API_URL;
  const fileUrl: any = getFilePath(apiUrl);
  const [isSlotBooked, setIsSlotBooked] = useState<boolean>(false);

  useEffect(() => {
    getCourseData();
  }, []);
  function getFilePath(url: string): string {
    try {
      const urlObj = new URL(url);
      const segments = urlObj.pathname.split('/').filter(Boolean); // Remove empty segments
      segments.pop(); // Remove the last segment
      urlObj.pathname = '/' + segments.join('/') + '/';
      return urlObj.toString();
    } catch (error) {
      console.error('Invalid URL:', error);
      return url; // Return the original URL if it's invalid
    }
  }
  const getCourseData = async () => {
    let payload = {
      "columns": [
        "tbl_courses.id",
        "tbl_courses.course_name",
        "tbl_courses.description",
        "tbl_courses.course_price",
        "tbl_courses.exam_price",
        "tbl_courses.license_price",
        "tbl_course_materials.material_name",
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
        const result = convertStringToArray(response.data[0].properties);
        console.log(result);
        const isCoursePurchased = result.find((item: any) => item == 1);
        if (isCoursePurchased && response.data[0].is_slot_booked == 0) {
          setIsSlotBooked(false);
        } else {
          setIsSlotBooked(true);
        }
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
  const convertStringToArray = (inputString: string): string[] => {
    if (!inputString) return []; // Handle empty or undefined strings

    return [...new Set(inputString.split(",").map((item) => item.trim()))];
  };
  const openPDF = async (file_name: any, file: string) => {
    await Browser.open({ url: fileUrl + '' + file });
  };
  const downloadFile = async (file_name: any, file_path: string) => {
    startLoading();
    setLoadingMessage('Downloading...');
    getBase64Path({ file_path: file_path }).then(async (response) => {
      console.log(response);
      if (response.status == 200 && response.success) {
        console.log(response.data);
        const base64Data = `data:${response.data.mime_type};base64,${response.data.file_data}`;
        //const base64Data = file;
        const currentDate = new Date().toLocaleString().replace(/[,:\s\/]/g, '-');
        const fileName = `${file_name}-${currentDate}.pdf`;
        if (isPlatform('hybrid')) {
          // Use Capacitor Filesystem for mobile
          try {
            if (Filesystem && Directory) {
              await checkFilesystemPermissions();

              // Attempt to write the file
              const result = await Filesystem.writeFile({
                path: fileName,
                data: base64Data,
                directory: Directory.Documents,
                recursive: true
              });

              console.log("File write result:", result);
              stopLoading();
              setLoadingMessage('Loading...');
              await toast.success("File downloaded successfully.");
            } else {
              stopLoading();
              setLoadingMessage('Loading...');
              throw new Error("Filesystem components not available.");
            }
          } catch (error) {
            stopLoading();
            setLoadingMessage('Loading...');
            console.error("Error writing file:", error);
            await toast.error("Failed to download the file. Please try again.");
          }
        } else {
          // Use browser method for web
          try {
            console.log('PDF File', base64Data);
            const downloadLink = document.createElement('a');
            downloadLink.href = base64Data;
            downloadLink.download = fileName;
            downloadLink.click();
            stopLoading();
            setLoadingMessage('Loading...');
            await toast.success("File downloaded successfully.");
          } catch (error) {
            stopLoading();
            setLoadingMessage('Loading...');
            console.error("Error downloading file:", error);
            await toast.error("Failed to download the file. Please try again.");
          }
        }
      } else {
        stopLoading();
        toast.dismiss();
        toast.error(response.message);
      }
    }).catch((error) => {
      console.error('Failed to convert PDF:', error);
    });
  };
  const checkFilesystemPermissions = async () => {
    try {
      const permissionStatus = await Filesystem.requestPermissions();

      if (permissionStatus.publicStorage !== 'granted') {
        throw new Error('Filesystem permissions not granted.');
      }

      console.log('Filesystem permissions granted.');
    } catch (error) {
      console.error('Filesystem permissions error:', error);
      throw new Error('Permissions not granted.');
    }
  };
  const markTraineeAttendance = async () => {
    const position = await getCurrentLocation();
    if (position) {
      console.log(position);
      let payload = {
        attendance: new Date().toISOString().split('T')[0],//current date
        course_id: courseDetails.id,
        "latitude": "17.435291",
        "longitude": "78.451506"

        //latitude: position?.coords.latitude,
        //longitude: position?.coords.longitude,
      }
      try {
        startLoading();
        const response = await markAttendance(payload);
        console.log("Details", response);
        if ((response.status == 200 || response.status == 201) && response.success) {
          console.log(response);
          toast.dismiss();
          toast.success(response.message);
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
    } else {
      console.error("user not loggedin")
    }
  }
  const proceedWithSlotSelection = async () => {
    let courses = [];
    courses.push(courseDetails);
    history.push({
      pathname: "/slot-selection",
      state: { courses: courses }
    });
  }
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
                  <p>{courseDetails.description}</p>
                </IonText>
              </IonItem>
            </IonList>
            <div className="coursePrice ion-padding-horizontal">
              <IonRow>
                <IonCol> <IonText><h6>Course Price</h6><h3>{courseDetails.course_price} <span>AED</span></h3> </IonText></IonCol>
                <IonCol><IonText><h6>Exam Price</h6><h3>{courseDetails.exam_price} <span>AED</span></h3> </IonText></IonCol>
                <IonCol> <IonText><h6>License Price</h6><h3>{courseDetails.license_price} <span>AED</span></h3> </IonText></IonCol>
              </IonRow>
            </div>
          </div>
          <div className="innerDownloadFiles">
            <IonItem color="none" lines="none">
              <IonText className="filesActive">Files</IonText>
              <IonButton onClick={() => markTraineeAttendance()} slot="end" className="orangeBt" shape="round" expand="block">MARK ATTENDANCE</IonButton>
            </IonItem>

            <IonList lines="none" className="zipCard">
              {courseDetails.courses_details && courseDetails.courses_details.length > 0 && courseDetails.courses_details.map((data: any, index: any) => (
                <IonItem lines="none" className="ion-justify-content-between" key={`${data.id}-key`}>
                  <div className="scd-iconText">
                    <IonIcon icon={documents}></IonIcon>
                    <IonText>{data.material_name}</IonText>
                  </div>
                  <IonButton onClick={() => downloadFile(data.material_name, data.material)} slot="end" className="scd-downloadBt" fill="clear"><IonIcon slot="end" icon={download}></IonIcon>
                  </IonButton>
                </IonItem>
              ))}
            </IonList>
          </div>
        </div>
      </IonContent>
      {isLoading && <Loader message={loadingMessage} />}
      {!isSlotBooked &&
        <IonFooter>
          <IonToolbar>
            <IonButton onClick={(event) => proceedWithSlotSelection()} shape="round" expand="block" color="primary" >Select slot</IonButton>
          </IonToolbar>
        </IonFooter>
      }
    </IonPage>
  );
};

export default SelectedCoursesDetails;
