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

        const interval = setInterval(() => {
            setProgress((prevProgress) => prevProgress + 0.01);
          });        
          return () => clearInterval(interval);

    }, []);

    const getExam = async () => {



        try {
            startLoading();
            const response = await getExamData(queryParams.id);
            console.log("Details", response);
            if (response.status == 200 && response.success) {
                console.log(response);
                const res = {
                    "message": "Quiz questions fetched successfully",
                    "data": {
                        "quiz_id": "2",
                        "quiz_name": "Random Quiz",
                        "total_marks": "20",
                        "no_of_questions": "20",
                        "questions": [
                            {
                                "question_id": "1",
                                "question": "What is the capital of France?",
                                "marks": "1",
                                "options": [
                                    { "answer_id": "1", "answer": "Berlin", "is_correct": "0" },
                                    { "answer_id": "2", "answer": "Madrid", "is_correct": "0" },
                                    { "answer_id": "3", "answer": "Paris", "is_correct": "1" },
                                    { "answer_id": "4", "answer": "Rome", "is_correct": "0" }
                                ]
                            },
                            {
                                "question_id": "2",
                                "question": "Which planet is known as the Red Planet?",
                                "marks": "1",
                                "options": [
                                    { "answer_id": "5", "answer": "Mars", "is_correct": "1" },
                                    { "answer_id": "6", "answer": "Earth", "is_correct": "0" },
                                    { "answer_id": "7", "answer": "Venus", "is_correct": "0" },
                                    { "answer_id": "8", "answer": "Jupiter", "is_correct": "0" }
                                ]
                            },
                            {
                                "question_id": "3",
                                "question": "What is the largest ocean on Earth?",
                                "marks": "1",
                                "options": [
                                    { "answer_id": "9", "answer": "Indian Ocean", "is_correct": "0" },
                                    { "answer_id": "10", "answer": "Atlantic Ocean", "is_correct": "0" },
                                    { "answer_id": "11", "answer": "Pacific Ocean", "is_correct": "1" },
                                    { "answer_id": "12", "answer": "Arctic Ocean", "is_correct": "0" }
                                ]
                            },
                            {
                                "question_id": "4",
                                "question": "Who wrote 'Romeo and Juliet'?",
                                "marks": "1",
                                "options": [
                                    { "answer_id": "13", "answer": "Shakespeare", "is_correct": "1" },
                                    { "answer_id": "14", "answer": "Mark Twain", "is_correct": "0" },
                                    { "answer_id": "15", "answer": "Jane Austen", "is_correct": "0" },
                                    { "answer_id": "16", "answer": "Charles Dickens", "is_correct": "0" }
                                ]
                            },
                            {
                                "question_id": "5",
                                "question": "What is the chemical formula for water?",
                                "marks": "1",
                                "options": [
                                    { "answer_id": "17", "answer": "O2", "is_correct": "0" },
                                    { "answer_id": "18", "answer": "CO2", "is_correct": "0" },
                                    { "answer_id": "19", "answer": "H2O", "is_correct": "1" },
                                    { "answer_id": "20", "answer": "NaCl", "is_correct": "0" }
                                ]
                            },
                            {
                                "question_id": "6",
                                "question": "What is the capital of Japan?",
                                "marks": "1",
                                "options": [
                                    { "answer_id": "21", "answer": "Tokyo", "is_correct": "1" },
                                    { "answer_id": "22", "answer": "Osaka", "is_correct": "0" },
                                    { "answer_id": "23", "answer": "Kyoto", "is_correct": "0" },
                                    { "answer_id": "24", "answer": "Nagoya", "is_correct": "0" }
                                ]
                            },
                            {
                                "question_id": "7",
                                "question": "How many continents are there?",
                                "marks": "1",
                                "options": [
                                    { "answer_id": "25", "answer": "5", "is_correct": "0" },
                                    { "answer_id": "26", "answer": "6", "is_correct": "0" },
                                    { "answer_id": "27", "answer": "7", "is_correct": "1" },
                                    { "answer_id": "28", "answer": "8", "is_correct": "0" }
                                ]
                            },
                            {
                                "question_id": "8",
                                "question": "Which is the largest mammal?",
                                "marks": "1",
                                "options": [
                                    { "answer_id": "29", "answer": "Elephant", "is_correct": "0" },
                                    { "answer_id": "30", "answer": "Blue Whale", "is_correct": "1" },
                                    { "answer_id": "31", "answer": "Giraffe", "is_correct": "0" },
                                    { "answer_id": "32", "answer": "Hippopotamus", "is_correct": "0" }
                                ]
                            },
                            {
                                "question_id": "9",
                                "question": "Where are the Great Pyramids located?",
                                "marks": "1",
                                "options": [
                                    { "answer_id": "33", "answer": "Egypt", "is_correct": "1" },
                                    { "answer_id": "34", "answer": "Greece", "is_correct": "0" },
                                    { "answer_id": "35", "answer": "Mexico", "is_correct": "0" },
                                    { "answer_id": "36", "answer": "India", "is_correct": "0" }
                                ]
                            },
                            {
                                "question_id": "10",
                                "question": "What travels at a speed of 300,000 km/s?",
                                "marks": "1",
                                "options": [
                                    { "answer_id": "37", "answer": "Light", "is_correct": "1" },
                                    { "answer_id": "38", "answer": "Gravity", "is_correct": "0" },
                                    { "answer_id": "39", "answer": "Magnetism", "is_correct": "0" },
                                    { "answer_id": "40", "answer": "Electricity", "is_correct": "0" }
                                ]
                            }
                        ]
                    }
                }
                setExamData(response.data);
                setQuestionsCount(response.data.questions.length - 1);
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
    const handleAnswerClick = (question_id: string, answer_id: string) => {
        setSelectedAnswers((prev) => {
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
                // localStorage.removeItem('selectedCourses');
                // toast.dismiss();
                // toast.success(response.message);
                // history.push({
                //     pathname: "/payment-confirmation",
                //     state: { from: 'dashboard', data: response.data }
                // });
                //history.push("/payment-confirmation");
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
                        <IonText className="probarCount">3 of 20</IonText>
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
                        {currentIndex !== questionsCount &&

                            <IonButton shape="round" expand="full" color="primary"
                                onClick={nextSlide}
                            // Disable "Next" on the last slide
                            >
                                Next
                            </IonButton>
                        }
                        {currentIndex === questionsCount &&
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
