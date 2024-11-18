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
} from "@ionic/react";
import { useHistory } from 'react-router';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from "yup";
import useLoading from '../../components/useLoading';
import { useAuth } from '../../api/AuthContext';
import { PushNotifications } from '@capacitor/push-notifications';
import { toast } from 'react-toastify';
import { eye, eyeOff } from 'ionicons/icons';
import Loader from '../../components/Loader';


const Login: React.FC = () => {
    const logo = 'assets/images/psd-logo.svg';
    const history = useHistory();
    const app_version: any = localStorage.getItem('app_version');
    const app_name: any = localStorage.getItem('app_name');
    const { login } = useAuth();
    const { isLoading, startLoading, stopLoading } = useLoading();
    const [loadingMessage, setLoadingMessage] = useState<string>('Loading....');
    const [showPassword, setShowPassword] = useState(false);


    const validationSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email address').required('Email is required'),
        password: Yup.string()
            .min(6, "Password must be at least 8 characters")
            .required("Password is required"),
        rememberMe: Yup.boolean()
    });

    const initialValues = {
        email: localStorage.getItem('rememberedUserName') || "",
        password: localStorage.getItem('rememberedPassword') || "",
        rememberMe: localStorage.getItem('rememberedUserName') ? true : false
    };
    useEffect(() => {
        const storedUserData: any = localStorage.getItem('userData');
        if (storedUserData) {
            history.push('/dashboard');
        }
    }, []);
    const onSubmit = async (values: any) => {
        startLoading();
        setLoadingMessage('Authenticating');
        let deviceToken: any = localStorage.getItem('device_token');
        if (deviceToken === null) {
            await PushNotifications.register();
        }
        try {
            console.log("values", values);
            const response = await login(values, app_name, app_version);
            console.log(response);
            if (values.rememberMe) {
                localStorage.setItem('rememberedUserName', values.email);
                localStorage.setItem('rememberedPassword', values.password);
            } else {
                localStorage.removeItem('rememberedUserName');
                localStorage.removeItem('rememberedPassword')
            }
            if (response.status == 200 && response.success == true) {
                console.log("hi")
                toast.success(response.message);
                console.log(response.user_type, 'User Type');

                if (response.data.user_type == 8 || response.data.user_type == 16) {
                    if (response.data.password_reset == 1) {
                        history.push("/reset-password");
                    } else {
                        history.push("/dashboard");
                    }
                }
                else {
                    history.push("/corporate-dashboard");
                }
            }
            else {
                toast.error(response.message);
            }
        }
        catch (error: any) {
            console.log(error);
        }
        finally {
            stopLoading();
        }

    }

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    }
    return (
        <>
            <IonPage>
                <IonContent fullscreen className="colorBg ionHome loginwrapp">
                    <IonImg className="topbg" src="./assets/images/top-bg.svg"></IonImg>
                    <div className="bgSvg">
                        <div className="ion-margin">
                            <div className="headerLoginImgLogo">
                                <div className="loginlogoLeft">
                                    <IonButton routerLink="/home"><IonImg src="./assets/images/arrow-back.svg"></IonImg></IonButton>
                                    <IonImg className="loginlogoSvg" src="./assets/images/psd-logo.svg"></IonImg>
                                </div>

                                <div><IonImg className="headerImg" src="./assets/images/login-img.svg"></IonImg></div>
                            </div>

                            <IonCard className="mainLoginCard">
                                <IonText className="loginHeading">
                                    <h1>Login</h1>
                                    <p>Enter your Email and Password</p>
                                </IonText>

                                <Formik
                                    initialValues={initialValues}
                                    validationSchema={validationSchema}
                                    onSubmit={onSubmit}
                                >
                                    {({ touched, errors, handleChange, handleSubmit, setFieldValue, values }) => (
                                        <Form>
                                            <IonItem lines="none" className="ion-align-items-center ionItemShadow  inputFiledSty">
                                            <div className='width100'>
                                                    <IonLabel className="fieldName">Email Address</IonLabel>
                                                    <Field className="fieldControl" name="email" onIonChange={handleChange} value={values.email} placeholder="Enter Your Email"
                                                        type="email" />
                                                </div>
                                            </IonItem>
                                            {touched.email && errors.email && (
                                                <IonText color="danger" className="errorMessage">
                                                    <ErrorMessage name="email" />
                                                </IonText>
                                            )}
                                            <IonItem lines="none" className="ion-align-items-center ionItemShadow inputFiledSty">
                                                <div className='eyePosition'>
                                                    <IonLabel className="fieldName">Password</IonLabel>
                                                    <Field className="fieldControl" name="password" onIonChange={handleChange} value={values.password} placeholder="Enter Your Password"
                                                        type={showPassword ? "text" : "password"} />
                                                    <IonButton className='eyeButton'
                                                        fill="clear"
                                                        slot="end"
                                                        onClick={handleShowPassword}
                                                    >
                                                        <IonIcon icon={showPassword ? eyeOff : eye} />
                                                    </IonButton>
                                                </div>
                                            </IonItem>
                                            {touched.password && errors.password && (
                                                <IonText color="danger" className="errorMessage">
                                                    <ErrorMessage name="password" />
                                                </IonText>
                                            )}
                                            <div className="ionRemember">
                                                <IonCheckbox className="ionCheckbox" labelPlacement="end" checked={values.rememberMe}
                                                    onIonChange={(e) => setFieldValue("rememberMe", e.detail.checked)}>Remember me</IonCheckbox>
                                                <IonButton fill="clear" className="forgotpassword ion-text-uppercase ion-float-end">Forgot Password
                                                </IonButton>
                                            </div>

                                            <IonButton type='submit' className="ion-button" slot="primary" fill="solid" expand="block">Login</IonButton>
                                        </Form>
                                    )}
                                </Formik>

                                <div className="bottomLinkLogin">
                                    <IonText>Don't have an account?</IonText>
                                    <IonButton routerLink="/signup" className="textLink ion-text-center" fill="clear">Sign Up Now !</IonButton>
                                </div>

                            </IonCard>

                        </div>
                    </div>

                </IonContent>
                {isLoading && <Loader message={loadingMessage} />}
            </IonPage>
        </>
    );
}

export default Login
