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
    IonRadioGroup,
    IonRadio,
    IonAlert,
    IonProgressBar,
} from "@ionic/react";
import { useHistory } from 'react-router';
import Loader from '../components/Loader';
import { ribbon, ellipse, call, mail, add, personOutline } from 'ionicons/icons'
import useLoading from '../components/useLoading';
import { getExamData, getTransactionDetails, getUserList, validateExam } from '../api/common';
import { toast } from 'react-toastify';
import { useEffect, useRef, useState } from "react";
import { useAuth } from "../api/AuthContext";
import NoDataFound from "../components/NoDataFound";
import { Swiper, SwiperSlide } from "swiper/react";




const Exam: React.FC = () => {
    const { isLoading, startLoading, stopLoading } = useLoading();
    const [loadingMessage, setLoadingMessage] = useState<string>('Loading....');
    const { userData } = useAuth();
    const [examData, setExamData] = useState<any>([]);
    const [selectedAnswers, setSelectedAnswers] = useState<{ question_id: string; answer_id: string }[]>([]);
    const history = useHistory();
    const filePath = useHistory();
    const queryParams: any = history.location.state;
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [questionsCount, setQuestionsCount] = useState<number>(0); // Track the current slide index
    const [submitExam, setSubmitExam] = useState<boolean>(false);
    const [submitExamMessage, setSubmitExamMessage] = useState<string>('');
    const swiperRef = useRef<any>(null); // Ref for the Swiper component
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        getExam();
    }, []);
    useEffect(() => {
        setProgress((selectedAnswers.length || 0) / questionsCount);
    }, [selectedAnswers]);
    const getExam = async () => {



        try {
            startLoading();
            const response = await getExamData(queryParams.id);
            console.log("Details", response);
            if (response.status == 200 && response.success) {
                console.log(response);
                setExamData(response.data);
                setQuestionsCount(response.data.no_of_questions);

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
    // Function to handle option selection
    const handleAnswerClick = async (question_id: string, answer_id: string) => {
        await setSelectedAnswers((prev) => {
            const existingAnswerIndex = prev.findIndex((ans) => ans.question_id === question_id);

            if (existingAnswerIndex >= 0) {
                // Update existing answer
                const updatedAnswers = [...prev];
                updatedAnswers[existingAnswerIndex] = { question_id, answer_id };
                return updatedAnswers;
            }

            // Add new answer
            return [...prev, { question_id, answer_id }];
        });
    };
    // Go to the next slide
    const nextSlide = () => {
        swiperRef.current?.swiper.slideNext();
    };
    const jumpToQuestion = (question_no: any) => {
        swiperRef.current?.swiper.slideTo(question_no);
    };
    // Go to the previous slide
    const prevSlide = () => {
        swiperRef.current?.swiper.slidePrev();
    };

    // Update the current slide index when the slide changes
    const onSlideChange = (swiper: any) => {
        setCurrentIndex(swiper.activeIndex);
    };
    const isSelected = (question_id: string) => {
        return selectedAnswers.some((ans) => ans.question_id === question_id);
    };
    // Function to handle submit
    const handleSubmit = () => {
        const allAnswered = examData.questions.every((q: any) =>
            selectedAnswers.some((ans) => ans.question_id === q.question_id)
        );
        console.log("Answers submitted:", allAnswered);
        if (!allAnswered) {
            setSubmitExam(true);
            setSubmitExamMessage('Some of questions are not answered.Do you want to submit the exam')
        } else {
            setSubmitExam(true);
            setSubmitExamMessage('Do you want to submit the exam?')
        }
    };

    const submitExamData = async () => {
        const payload: any = {
            quiz_id: examData.quiz_id,
            quiz_details: selectedAnswers
        }
        console.log(payload);
        try {
            const response = await validateExam(payload);
            console.log(response);
            if ((response.status == 200 || response.status == 201) && response.success == true) {
                console.log(JSON.parse(response.data.quiz_details));
                toast.dismiss();
                toast.success(response.message);
                // history.push({
                //     pathname: "/payment-confirmation",
                //     state: { from: 'dashboard', data: response.data }
                // });
                history.push("/dashboard");
            }
            else {
                if (response.status == 400 && response.success == false) {
                    if (response.error) {
                        const apiErrors = response.error;
                        Object.keys(apiErrors).forEach((field) => {
                            toast.dismiss();
                            toast.error(apiErrors[field][0]);
                        });
                    } else {
                        console.error('An unexpected error occurred:', response.message);
                        toast.dismiss();
                        toast.error(response.message);
                    }
                }
            }
        }
        catch (error: any) {
            console.log(error);
            if (error.response && error.response.data) {
                // Assuming error.response.data is in the { field: [error messages] } format
                const apiErrors = error.response.data;

                // Map API errors to Formik's error format
                const formikErrors = {};
                Object.keys(apiErrors).forEach((field) => {
                    console.log(field);
                });
            } else {
                console.error('An unexpected error occurred:', error);
            }
            toast.dismiss();
            toast.error(error.message);
        }
        finally {
            stopLoading();
        }
    };

    return (
        <IonPage>
            <IonHeader className="ion-header">
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton></IonBackButton>
                    </IonButtons>
                    <IonTitle>Exam</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent fullscreen className="colorBg transDetailsWrapp">
                <IonImg className="topbg" src="./assets/images/top-bg.svg"></IonImg>
                <div className="bgSvg">

                    <div className="examhd">
                        <IonText>
                            <h2>{examData.quiz_name} <span></span></h2>
                            <h6><span>Questions :</span> {examData.no_of_questions} &nbsp;
                                <span>Marks :</span> {examData.total_marks}</h6>
                        </IonText>

                        <IonProgressBar color="warning" value={progress}></IonProgressBar>
                        <IonText className="probarCount">{selectedAnswers.length} of {examData.no_of_questions}</IonText>
                    </div>

                    {/* <div className="">
                        <IonCard className="questionList">
                            <IonRow>
                                {examData.questions && examData.questions.length > 0 && examData.questions.map((data: any, index: any) => (
                                    <div className="ques">
                                        <IonButton shape="round" expand="block" color={currentIndex == index ? "secondary" : isSelected(data.question_id) ? "primary" : "light"} className={isSelected(data.question_id) ? "selected" : ""} onClick={(event) => jumpToQuestion(index)}>
                                            <IonText>{index + 1}</IonText>
                                        </IonButton>
                                    </div>
                                ))}
                            </IonRow>
                        </IonCard>
                    </div> */}
                    <div className="examDataWrapp ion-margin-top ">
                        <Swiper
                            ref={swiperRef}
                            onSlideChange={onSlideChange} // Update the index on slide change
                            spaceBetween={0}
                            effect="flip"
                            slidesPerView={1}
                            centeredSlides={false}
                        >
                            {examData.questions && examData.questions.length > 0 && examData.questions.map((data: any, index: any) => (
                                <SwiperSlide>
                                    <div className="questionNum">{index + 1}</div>
                                    <IonCard className="ion-padding questionsData">
                                        <IonText className="headingtd"><h3> {data.question}</h3></IonText>
                                        <IonRadioGroup className="optionsRadioGroup"
                                            value={selectedAnswers.find((ans) => ans.question_id === data.question_id)?.answer_id || ''}
                                            onIonChange={(e) => handleAnswerClick(data.question_id, e.detail.value)}
                                        >
                                            {data.options && data.options.length > 0 && data.options.map((option: any, optionIndex: any) => (
                                                <IonRadio value={option.answer_id}>{option.answer}</IonRadio>
                                            ))}
                                        </IonRadioGroup>
                                    </IonCard>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                        {examData.questions && examData.questions.length === 0 &&
                            <NoDataFound message="No questions found" />
                        }
                    </div>
                </div>
            </IonContent>
            {isLoading && <Loader message={loadingMessage} />}
            <IonFooter>
                <IonToolbar>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <IonButton shape="round" expand="full" color="primary" fill="outline"
                            onClick={prevSlide}
                            disabled={currentIndex === 0} // Disable "Previous" on the first slide
                        >
                            Previous
                        </IonButton>
                        {currentIndex !== questionsCount- 1 &&

                            <IonButton shape="round" expand="full" color="primary"
                                onClick={nextSlide}
                            // Disable "Next" on the last slide
                            >
                                Next
                            </IonButton>
                        }
                        {currentIndex === questionsCount - 1 &&
                            <IonButton onClick={(event) => handleSubmit()} shape="round" expand="full" color="primary" >Submit</IonButton>
                        }
                    </div>
                </IonToolbar>
            </IonFooter>
            <IonAlert
                isOpen={submitExam}
                onDidDismiss={() => setSubmitExam(false)}
                header={"Confirm"}
                message={submitExamMessage}
                buttons={[
                    {
                        text: "No",
                        role: "cancel",
                        handler: () => setSubmitExam(false),
                    },
                    {
                        text: "Yes",
                        handler: () => {
                            setSubmitExam(true);
                            submitExamData();
                        },
                    },
                ]}
            />
        </IonPage>
    );
};

export default Exam;
