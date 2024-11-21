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
import { ribbon, ellipse, call, mail, add, personOutline } from 'ionicons/icons'
import useLoading from '../components/useLoading';
import { getTransactionDetails, getUserList } from '../api/common';
import { toast } from 'react-toastify';
import { useEffect, useState } from "react";
import { useAuth } from "../api/AuthContext";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Keyboard, Pagination, Scrollbar, Zoom } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/keyboard';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/zoom';
import '@ionic/react/css/ionic-swiper.css';


const Quiz: React.FC = () => {
    const { isLoading, startLoading, stopLoading } = useLoading();
    const [loadingMessage, setLoadingMessage] = useState<string>('Loading....');
    const { userData } = useAuth();
    const [transactionDetails, setTransactionDetails] = useState<any>([]);
    const history = useHistory();
    const filePath = useHistory();
    const queryParams: any = history.location.state;


    useEffect(() => {
        getTransactionData();
    }, []);

    const getTransactionData = async () => {

        try {
            startLoading();
            const response = await getTransactionDetails(queryParams.id);
            console.log("Details", response);
            if (response.status == 200 && response.success) {
                console.log(response);
                setTransactionDetails(response.data);
            }
            else {
                toast.dismiss();
                toast.error(response.message);
            }
        }
        catch (error: any) {
            console.error("Error fettching the Details:", error);
        }
        finally {
            stopLoading();
        }
    }
    return (
        <IonPage>
            <IonHeader className="ion-header">
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton></IonBackButton>
                    </IonButtons>
                    <IonTitle>Transactions Details</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen className="colorBg transDetailsWrapp">
                <IonImg className="topbg" src="./assets/images/top-bg.svg"></IonImg>
                <div className="bgSvg">
                    <div className="tdCard ion-margin-top">
                        <IonCard className="ion-padding">
                            <IonText className="headingtd"><h3>Payment Details</h3></IonText>
                            <Swiper>
                                <SwiperSlide>Slide 1</SwiperSlide>
                                <SwiperSlide>Slide 2</SwiperSlide>
                                <SwiperSlide>Slide 3</SwiperSlide>
                            </Swiper>
                        </IonCard>
                    </div>
                </div>
            </IonContent>
            {isLoading && <Loader message={loadingMessage} />}

        </IonPage>
    );
};

export default Quiz;
