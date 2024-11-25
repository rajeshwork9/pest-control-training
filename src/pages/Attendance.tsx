import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction'; // Enables click and drag
import { IonPage, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonContent, IonImg, IonCard, IonText, IonCardTitle, IonCardContent, IonItem, IonCheckbox, IonFooter, IonButton } from '@ionic/react';
import Loader from '../components/Loader';
import useLoading from '../components/useLoading';



const Attendance: React.FC = () => {

    const { isLoading, startLoading, stopLoading } = useLoading();
    const [loadingMessage, setLoadingMessage] = useState<string>('Loading....');
    const [events, setEvents] = useState([
        { color: '#00ca10', date: '2024-11-20' },
        { color: '#00ca10', date: '2024-11-22' },
    ]);

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
