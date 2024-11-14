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

const validationSchema = Yup.object({

  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  confirmPassword: Yup.string().oneOf([Yup.ref('password')], 'Passwords must match').required('Confirm Password is required'),
});

const ResetPassword: React.FC = () => {
  const history = useHistory();
  const { isLoading, startLoading, stopLoading } = useLoading();
  const { resetPassword } = useAuth();
  const [userTypes, setUserTypes] = useState<any[]>([]);
  const app_version: any = localStorage.getItem('app_version');
  const app_name: any = localStorage.getItem('app_name');
  const [isCompanyRequired, setIsCompanyRequired] = useState(false);
  const initialValues = {
    password: "",
    confirmPassword: "",
  };

  const handleSubmit = async (values: any) => {
    console.log('Form Data:', values);
    startLoading();
    // let deviceToken: any = localStorage.getItem('device_token');
    // if(deviceToken === null) {
    //     await PushNotifications.register();
    // }
    try {
      console.log("values", values);
      //return;
      const response = await resetPassword(values, app_name, app_version);
      if (response.status == 200 && response.success == true) {
        toast.success(response.message);
        if (response.data.user_type == 8) {
        }
        else {
          history.push("/dashboard");
        }
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
      toast.error(error.message);
    }
    finally {
      stopLoading();
    }
  }

  const getUserTypeList = async (value: any) => {
    startLoading();
    try {
      const payload = {
        "registering_user": value //accepts corporate,individual
      }
      const response = await getUserTypes(payload);
      if (response.status == 200 && response.success == true) {
        console.log(response);
        setUserTypes(response.data);
        if (value === 'corporate') {
          setIsCompanyRequired(true);
        } else {
          setIsCompanyRequired(false);
        }
      }
      else {
        setUserTypes([]);
        toast.dismiss();
        toast.error(response.message)
      }
    }
    catch (error: any) {
      console.log(error);

    }
    finally {
      stopLoading();
    }
  };
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

              <div className="ionRemember">
                <IonButton fill="clear" className="forgotpassword ion-text-uppercase ion-float-start"><span>Already have an account?</span> Login
                </IonButton>
              </div>

              <IonCard className="mainLoginCard">
                <IonText className="loginHeading">
                  <h1>Reset Password</h1>
                  <p>Create new password to continue</p>
                </IonText>

                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
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

            </div>
          </div>
        </IonContent>
      </IonPage>
    </>
  );
};

export default ResetPassword;
