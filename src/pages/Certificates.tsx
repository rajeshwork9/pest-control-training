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
    isPlatform,
} from "@ionic/react";
import { useHistory } from 'react-router';
import Loader from '../components/Loader';
import { ribbon, ellipse, call, mail, add, personOutline, documents, download } from 'ionicons/icons'
import useLoading from '../components/useLoading';
import { toast } from 'react-toastify';
import { useEffect, useState } from "react";
import { useAuth } from "../api/AuthContext";
import '@ionic/react/css/ionic-swiper.css';
import NoDataFound from "../components/NoDataFound";
import { getBase64Path, getCertificates, getResults, getTransactions } from "../api/common";
import { Directory, Filesystem } from "@capacitor/filesystem";


const Certificates: React.FC = () => {
    const { isLoading, startLoading, stopLoading } = useLoading();
    const [loadingMessage, setLoadingMessage] = useState<string>('Loading....');
    const { userData } = useAuth();
    const history = useHistory();
    const [certificateList, setCertificateList] = useState<any[]>([]);
    const queryParams: any = history.location.state;

    useEffect(() => {
        console.log(userData);
        getResultsList();
    }, []);

    const getResultsList = async () => {
        let payload = {
            "columns": [
                "tbl_training_certificates.id as certificate_id",
                "tbl_courses.course_name",
                "tbl_courses.description",
                "tbl_tests.test_name",
                "tbl_training_certificates.certificate"
            ],
            "order_by": {
                "tbl_training_certificates.created_on": "DESC"
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
            const response = await getCertificates(payload);
            console.log("Details", response);
            if (response.status == 200 && response.success) {
                console.log(response);
                setCertificateList(response.data);
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
    return (
        <IonPage>
            <IonHeader className="ion-header">
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton></IonBackButton>
                    </IonButtons>
                    <IonTitle>My Certificates</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent fullscreen className="colorBg certificateWrapp transactionsWrapp">
                <IonImg className="topbg" src="./assets/images/top-bg.svg"></IonImg>
                <div className="bgSvg">
                    <div className="ion-margin">
                        <IonList lines="none" className="zipCard">
                            {certificateList && certificateList.length > 0 && certificateList.map((data: any, index: any) => (
                                <IonItem lines="none" className="ion-justify-content-between" key={`${data.id}-key`}>
                                    <div className="scd-iconText">
                                        <IonImg src="./assets/images/certificate-icon2.svg" />
                                        <div>
                                            <IonText>{data.course_name}</IonText>
                                            <p>{data.test_name}</p>
                                        </div>
                                    </div>
                                    <IonButton onClick={() => downloadFile(data.test_name, data.certificate)} slot="end" className="scd-downloadBt" fill="clear"><IonIcon slot="end" icon={download}></IonIcon>
                                    </IonButton>
                                </IonItem>
                            ))}
                        </IonList>
                        {certificateList && certificateList.length === 0 &&
                            <NoDataFound message="No results found" />
                        }
                    </div>
                </div>
            </IonContent>
            {isLoading && <Loader message={loadingMessage} />}
        </IonPage>
    );
};

export default Certificates;
