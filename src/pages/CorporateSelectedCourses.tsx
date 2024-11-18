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
    IonFooter
} from "@ionic/react";
import { useHistory } from 'react-router';
import Loader from '../components/Loader';
import { ribbon, checkmark } from 'ionicons/icons';
import useLoading from '../components/useLoading';
import { getCorporateCourseList, getCourseList, getIndividualCourseList } from '../api/common';
import { toast } from 'react-toastify';
import { useAuth } from '../api/AuthContext';

const CorporateSelectedCourses: React.FC = () => {
    const { isLoading, startLoading, stopLoading } = useLoading();
const [loadingMessage, setLoadingMessage] = useState<string>('Loading....');
    const { userData } = useAuth();
    const selectedCourseData = localStorage.getItem('selectedCourses');
    const parsedData = selectedCourseData ? JSON.parse(selectedCourseData) : [];
    const [courseList, setCourseList] = useState<any[]>([]);
    const history = useHistory();
    const [selectedCourses, setSelectedCourses] = useState<any[]>(Array.isArray(parsedData) ? parsedData : []);


    useEffect(() => {
        console.log(userData);
        getCoursesList();
    }, []);

    const getCoursesList = async () => {
        let payload = {
            "columns": [
                "tbl_courses.id as course_id",
                "tbl_courses.course_name",
                "tbl_courses.description"
            ],
            "order_by": {
                "tbl_courses.course_name":"DESC"
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
            const response = await getCorporateCourseList(payload);
            console.log("Leave Details", response);
            if (response.status == 200 && response.success) {
                console.log(response);
                setCourseList(response.data);
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
    const viewCourseDetails = async (course: any) => {
        history.push({
            pathname: "/corporate-selected-courses-details",
            state: { id: course.course_id }
        });
    }
    return (
        <IonPage>

            <IonHeader className="ion-header">
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton></IonBackButton>
                    </IonButtons>
                    <IonTitle>Selected Courses List</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent fullscreen className="colorBg selectedCoursesWrapp">
                <IonImg className="topbg" src="./assets/images/top-bg.svg"></IonImg>
                <div className="bgSvg">
                    <div className="ion-margin">
                        <IonList className="coursesItem" lines="none">
                            {courseList && courseList.length > 0 && courseList.map((data: any, index: any) => (
                                <IonItem onClick={(event) => viewCourseDetails(data)}>
                                    <IonThumbnail slot="start">
                                        <IonIcon icon={ribbon}></IonIcon>
                                    </IonThumbnail>
                                    <IonText className="width100">
                                        <div className="detailsArrow">
                                            <h3>{data.course_name}</h3>
                                            <IonButton className="detailsArrowIcon" routerLink="/selected-courses-details">
                                                <IonImg src="./assets/images/details-arrow-icon.svg"></IonImg>
                                            </IonButton>
                                        </div>
                                        <p>{data.description}</p>
                                    </IonText>
                                </IonItem>
                            ))}
                        </IonList>

                    </div>
                </div>
            </IonContent>
                {isLoading && <Loader message={loadingMessage} />}
        </IonPage>
    );
};

export default CorporateSelectedCourses;
