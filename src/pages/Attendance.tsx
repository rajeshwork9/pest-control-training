import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction'; // Enables click and drag
import { IonPage, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonContent, IonImg, IonCard, IonText, IonCardTitle, IonCardContent, IonItem, IonCheckbox, IonFooter, IonButton } from '@ionic/react';
import Loader from '../components/Loader';
import useLoading from '../components/useLoading';
import { getCourseList, getUserAttendance } from '../api/common';
import { toast } from 'react-toastify';



const Attendance: React.FC = () => {

    const { isLoading, startLoading, stopLoading } = useLoading();
    const [loadingMessage, setLoadingMessage] = useState<string>('Loading....');
    const [events, setEvents] = useState<any[]>([]);
    useEffect(() => {
        getAttendanceList();
    }, []);

    const getAttendanceList = async () => {
        let payload = {
            "columns": [
                "tbl_training_users.id",
                "tbl_training_users.first_name",
                "tbl_training_users.last_name",
                "tbl_courses.id as course_id",
                "tbl_courses.course_name",
                "tbl_status.status_name",
                "tbl_training_users_attendance.attendance",
                "tbl_training_users_attendance.latitude",
                "tbl_training_users_attendance.longitude"
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
            const response = await getUserAttendance(payload);
            console.log("Leave Details", response);
            if (response.status == 200 && response.success) {
                console.log(response);
                let events : any = [];
                response.data.map((property: any) => {
                    events.push({ color: '#00ca10',title: 'simple event', display: 'background', date: property.attendance });
                });
                setEvents(events);
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



    const handleDateClick = (info: any) => {
        alert(`Date clicked: ${info.dateStr}`);
        // Add a new event or show a form to add an event
    };

    const handleEventClick = (info: any) => {
        alert(`Event clicked: ${info.event.title}`);
        // You can handle event details or deletion here
    };
    return (
        <>
            <IonPage>

                <IonHeader className="ion-header">
                    <IonToolbar>
                        <IonButtons slot="start">
                            <IonBackButton></IonBackButton>
                        </IonButtons>
                        <IonTitle>Attendance</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent fullscreen className="colorBg paymentDetails ionContentBottom">
                    <IonImg className="topbg" src="./assets/images/top-bg.svg"></IonImg>
                    <div className="bgSvg">
                        <IonCard>
                            <div style={{ padding: '1rem' }}>
                                <FullCalendar
                                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                                    initialView="dayGridMonth"
                                    events={events}
                                    dateClick={handleDateClick}
                                    eventClick={handleEventClick}
                                    editable={true}
                                    selectable={true}
                                />
                            </div>
                        </IonCard>
                    </div>
                </IonContent>
                {isLoading && <Loader message={loadingMessage} />}

                <IonFooter>
                    <IonToolbar>

                    </IonToolbar>
                </IonFooter>

            </IonPage>
        </>
    );
};

export default Attendance;
