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

} from "@ionic/react";
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { useHistory } from 'react-router';
import Loader from '../components/Loader';
import { ribbon, checkmark, documents, download, ellipse, call, mail, add } from 'ionicons/icons'
import { getCurrentLocation } from "../utils/locationProvider";
import useLoading from "../components/useLoading";
import { useAuth } from "../api/AuthContext";
import { useEffect, useState } from "react";
import { getBase64Path, getCorporateCourseData, getIndividualCourseData, getIndividualCourseList, markAttendance } from "../api/common";
import { toast } from 'react-toastify';
import { Browser } from "@capacitor/browser";

const CorporateSelectedCoursesDetails: React.FC = () => {
    const { isLoading, startLoading, stopLoading } = useLoading();
const [loadingMessage, setLoadingMessage] = useState<string>('Loading....');
    const { userData } = useAuth();
    const [courseDetails, setCourseDetails] = useState<any>([]);
    const history = useHistory();
    const filePath = useHistory();
    const queryParams: any = history.location.state;
    const apiUrl: any = import.meta.env.VITE_API_URL;
    const fileUrl: any = getFilePath(apiUrl);

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
                "tbl_courses.id as course_id",
                "tbl_courses.course_name",
                "tbl_courses.description",
                "tbl_courses.course_price",
                "tbl_courses.exam_price",
                "tbl_courses.license_price",
                "tbl_training_users.first_name",
                "tbl_training_users.last_name",
                "tbl_training_users.email_id",
                "tbl_training_users.mobile_no",
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
            const response = await getCorporateCourseData(payload);
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
    const openPDF = async (file_name: any, file: string) => {
        await Browser.open({ url: fileUrl + '' + file });
    };
    const downloadFile = async (file_name: any, file_path: string) => {
        getBase64Path({ file_path: file_path }).then(async (file) => {
            if (file) {
                console.log(file.data);
                const base64Data = `data:${file.data.data.mime_type};base64,${file.data.data.file_data}`;
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
                            await toast.success("File downloaded successfully.");
                        } else {
                            throw new Error("Filesystem components not available.");
                        }
                    } catch (error) {
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
                        await toast.success("File downloaded successfully.");
                    } catch (error) {
                        console.error("Error downloading file:", error);
                        await toast.error("Failed to download the file. Please try again.");
                    }
                }
            } else {
                await toast.error("No proposal file found.");
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
                            <IonText className="filesActive">Users</IonText>
                        </IonItem>

                        <IonList lines="none" className="zipCard">
                            {courseDetails.training_users && courseDetails.training_users.length > 0 && courseDetails.training_users.map((data: any, index: any) => (
                                <IonCard className="userItem selectedCoursesUsers">
                                    <IonItem lines="none" color="none">
                                        <IonThumbnail slot="start">
                                            <IonImg src="assets/images/user-icon.svg"></IonImg>
                                        </IonThumbnail>

                                        <IonText>
                                            <div className="detailsArrow">
                                                <h3>{data.first_name} {data.last_name}</h3>
                                                {/* <IonButton className="detailsArrowIcon" fill="clear" routerLink="/users-details">
                                                    <IonImg src="./assets/images/details-arrow-icon.svg"></IonImg>
                                                </IonButton> */}
                                            </div>
                                            <IonText className="d-flex phoneEmail">
                                                <p><IonIcon icon={call}></IonIcon>{data.mobile_no}</p>
                                                <p><IonIcon icon={mail}></IonIcon>{data.email_id}</p>
                                            </IonText>

                                        </IonText>
                                    </IonItem>
                                </IonCard>
                            ))}
                        </IonList>
                    </div>
                </div>
            </IonContent>
                {isLoading && <Loader message={loadingMessage} />}
        </IonPage>
    );
};

export default CorporateSelectedCoursesDetails;
