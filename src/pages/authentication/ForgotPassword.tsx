import React, { useContext, useRef, useState } from 'react';
import {
    IonButton,
    IonContent,
    IonImg,
    IonInput,
    IonItem,
    IonPage,
    IonText,
    IonCard,
    IonSelect,
    IonSelectOption,
    IonLabel,
} from "@ionic/react";
import * as Yup from "yup";
import { useHistory } from 'react-router';
import { toast } from 'react-toastify';
import { Formik, Form, Field, ErrorMessage, FormikContext } from 'formik';
import useLoading from '../../components/useLoading';
import { PushNotifications } from '@capacitor/push-notifications';
import { useAuth } from '../../api/AuthContext';
import { getUserTypes } from '../../api/common';
import { set } from 'react-hook-form';
import Loader from '../../components/Loader';
import OtpInput from 'react-otp-input';

const emailValidationSchema = Yup.object({
    email_id: Yup.string().email('Invalid email address').required('Email is required'),
});

const passwordValidationSchema = Yup.object({
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password')], 'Passwords must match').required('Confirm Password is required'),
});

const ForgotPassword: React.FC = () => {
    const history = useHistory();
    const { isLoading, startLoading, stopLoading } = useLoading();
    const [loadingMessage, setLoadingMessage] = useState<string>('Loading....');
    const { resetPassword, forgotPassword } = useAuth();
    const [userTypes, setUserTypes] = useState<any[]>([]);
    const app_version: any = localStorage.getItem('app_version');
    const app_name: any = localStorage.getItem('app_name');
    const [isOtpTriggerd, setIsOtpTriggered] = useState(false);
    const [isOtpVerified, setIsOtpVerified] = useState(false);
    const [checkOtp, setCheckOtp] = useState<string>('');
    const [otp, setOtp] = useState<string>('');
    
    const passwordInitialValues = {
        password: "",
        confirmPassword: "",
    };
    const emailInitialValues = {
        email_id: "",
    };
    const handleEmailSubmit = async (values: any) => {
        console.log('Form Data:', values);
        setLoadingMessage('Verifying your email address');
        startLoading();
        try {
            console.log("values", values);
            //return;
            const response = await forgotPassword(values, app_name, app_version);
            if (response.status == 200 && response.success == true) {
                toast.dismiss();
                toast.success(response.message);
                localStorage.setItem('token', response.data.api_token);
                setCheckOtp(response.data.otp_code);
                setIsOtpTriggered(true);
            }
            else {
                if (response.status == 400 && response.success == false) {
                    if (response.error) {
                        const apiErrors = response.error;
                        Object.keys(apiErrors).forEach((field) => {
                            toast.error(apiErrors[field][0]);
                        });
                    } else {
                        console.error('An unexpected error occurred:', response.message);
                        toast.dismiss();
                        toast.error(response.message);
                    }
                }else{
                    toast.dismiss();
                    toast.error(response.message);
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
    }
    const verifyOTP = async () => {
        console.log('Check OTP:', checkOtp);
        console.log('OTP:', otp);
        if(parseInt(checkOtp) === parseInt(otp)){
            toast.dismiss();
            toast.success("OTP verified sucessfully");
            setIsOtpTriggered(true);
            setIsOtpVerified(true);
        }else{
            toast.error("Invalid OTP");
        }
    }
    const handleSubmit = async (values: any) => {
        console.log('Form Data:', values);
        startLoading();
        try {
            console.log("values", values);
            //return;
            const response = await resetPassword(values, app_name, app_version);
            if (response.status == 200 && response.success == true) {
                toast.dismiss();
                toast.success(response.message);
                history.push("/login");
            }
            else {
                if (response.status == 400 && response.success == false) {
                    if (response.error) {
                        const apiErrors = response.error;
                        Object.keys(apiErrors).forEach((field) => {
                            toast.error(apiErrors[field][0]);
                        });
                    } else {
                        console.error('An unexpected error occurred:', response.message);
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
    }
    return (
        <>
            <IonPage>
                <IonContent fullscreen className="colorBg loginwrapp signupWrapp">
                    <IonImg className="topbg" src="./assets/images/top-bg.svg"></IonImg>
                    <div className="bgSvg">
                        <div className="ion-margin">
                            <div className="headerLoginImgLogo">
                                <div className="loginlogoLeft">
                                    <IonButton routerLink="/home"><IonImg src="./assets/images/arrow-back.svg"></IonImg></IonButton>
                                    <IonImg className="loginlogoSvg" src="./assets/images/psd-logo.svg"></IonImg>
                                </div>
                            </div>
                            {(!isOtpTriggerd && !isOtpVerified) && 
                            <IonCard className="mainLoginCard">
                                <IonText className="loginHeading">
                                    <h4>Forgot Password</h4>
                                    <p>Enter registered email to continue</p>
                                </IonText>

                                <Formik
                                    initialValues={emailInitialValues}
                                    validationSchema={emailValidationSchema}
                                    onSubmit={handleEmailSubmit}
                                >
                                    {({ touched, errors, handleChange, handleSubmit, setFieldValue, values }) => (
                                        <Form>
                                            <IonItem lines="none" className="ion-align-items-center ionItemShadow  inputFiledSty">
                                                <div className='width100'>
                                                    <IonLabel className="fieldName">Email Address</IonLabel>
                                                    <Field className="fieldControl" name="email_id" onIonChange={handleChange} value={values.email_id} placeholder="Enter Your Email"
                                                        type="email" />
                                                </div>
                                            </IonItem>
                                            {touched.email_id && errors.email_id && (
                                                <IonText color="danger" className="errorMessage">
                                                    <ErrorMessage name="email_id" />
                                                </IonText>
                                            )}

                                            <IonButton type="submit" className="ion-button" slot="primary" fill="solid" expand="block">Send OTP</IonButton>
                                        </Form>
                                    )}
                                </Formik>
                            </IonCard>
                            }
                            {isOtpTriggerd && !isOtpVerified && 
                            <IonCard className="mainLoginCard">
                                <IonText className="loginHeading">
                                    <h4>Forgot Password</h4>
                                    <p>Enter OTP sent to registered email address</p>
                                </IonText>

                                <OtpInput
                                    value={otp}
                                    onChange={setOtp}
                                    numInputs={6}
                                    containerStyle = "OTPInput"
                                    renderSeparator={<span>-</span>}
                                    renderInput={(props) => <input {...props} />}
                                />
                                <IonButton onClick={(event) => verifyOTP()} className="ion-button" fill='solid' shape="round" expand="block" color="primary" >Verify</IonButton>
                                
                            </IonCard>
                            }
                            {isOtpTriggerd && isOtpVerified && 
                            <IonCard className="mainLoginCard">
                                <IonText className="loginHeading">
                                    <h4>Forgot Password</h4>
                                    <p>Enter your new password</p>
                                </IonText>

                                <Formik
                                    initialValues={passwordInitialValues}
                                    validationSchema={passwordValidationSchema}
                                    onSubmit={handleSubmit}
                                >
                                    {({ touched, errors, handleChange, handleSubmit, setFieldValue, values }) => (
                                        <Form>
                                            <IonItem lines="none" className="ion-align-items-center ionItemShadow inputFiledSty">
                                                <div>
                                                    <IonLabel className="fieldName">Password</IonLabel>
                                                    <Field className="fieldControl" name="password" onIonChange={handleChange} value={values.password} placeholder="Enter Password"
                                                        type="password" />
                                                </div>
                                            </IonItem>
                                            {touched.password && errors.password && (
                                                <IonText color="danger" className="errorMessage">
                                                    <ErrorMessage name="password" />
                                                </IonText>
                                            )}
                                            <IonItem lines="none" className="ion-align-items-center ionItemShadow inputFiledSty">
                                                <div>
                                                    <IonLabel className="fieldName">Confirm Password</IonLabel>
                                                    <Field className="fieldControl" name="confirmPassword" onIonChange={handleChange} value={values.confirmPassword} placeholder="Enter Confirm Password"
                                                        type="password" />
                                                </div>
                                            </IonItem>
                                            {touched.confirmPassword && errors.confirmPassword && (
                                                <IonText color="danger" className="errorMessage">
                                                    <ErrorMessage name="confirmPassword" />
                                                </IonText>
                                            )}
                                            <IonButton type="submit" className="ion-button" slot="primary" fill="solid" expand="block">Reset</IonButton>
                                        </Form>
                                    )}
                                </Formik>
                            </IonCard>
                            }
                        </div>
                    </div>
                </IonContent>
                {isLoading && <Loader message={loadingMessage} />}
            </IonPage>
        </>
    );
};

export default ForgotPassword;
