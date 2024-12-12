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
  IonHeader,
  IonBackButton,
  IonButtons,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import * as Yup from "yup";
import { useHistory } from 'react-router';
import { toast } from 'react-toastify';
import { Formik, Form, Field, ErrorMessage, FormikContext } from 'formik';
import useLoading from '../components/useLoading';
import { PushNotifications } from '@capacitor/push-notifications';
import { useAuth } from '../api/AuthContext';
import { getUserTypes } from '../api/common';
import { set } from 'react-hook-form';
import Loader from '../components/Loader';

const validationSchema = Yup.object({
  current_password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  new_password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  confirmPassword: Yup.string().oneOf([Yup.ref('new_password')], 'Passwords must match').required('Confirm Password is required'),
});

const ChangePassword: React.FC = () => {
  const history = useHistory();
  const { isLoading, startLoading, stopLoading } = useLoading();
const [loadingMessage, setLoadingMessage] = useState<string>('Loading....');
  const { changePassword } = useAuth();
  const [userTypes, setUserTypes] = useState<any[]>([]);
  const app_version: any = localStorage.getItem('app_version');
  const app_name: any = localStorage.getItem('app_name');
  const [isCompanyRequired, setIsCompanyRequired] = useState(false);
  const initialValues = {
    current_password : "",
    new_password: "",
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
      const response = await changePassword(values, app_name, app_version);
      if (response.status == 200 && response.success == true) {
        toast.success(response.message);
        history.push("/");
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
      <IonHeader className="ion-header">
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton></IonBackButton>
          </IonButtons>
          <IonTitle>Profile</IonTitle>
        </IonToolbar>
      </IonHeader>
        <IonContent fullscreen className="colorBg loginwrapp signupWrapp">
          <IonImg className="topbg" src="./assets/images/top-bg.svg"></IonImg>
          <div className="bgSvg">
            <div className="ion-margin">
              <IonCard className="mainLoginCard">
                <IonText className="loginHeading">
                  <h4>Change Password</h4>
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
                          <IonLabel className="fieldName">Current Password</IonLabel>
                          <Field className="fieldControl" name="current_password" onIonChange={handleChange} value={values.current_password} placeholder="Enter Current Password"
                            type="password" />
                        </div>
                      </IonItem>
                      {touched.current_password && errors.current_password && (
                        <IonText color="danger" className="errorMessage">
                          <ErrorMessage name="current_password" />
                        </IonText>
                      )}
                      <IonItem lines="none" className="ion-align-items-center ionItemShadow inputFiledSty">
                        <div>
                          <IonLabel className="fieldName">New Password</IonLabel>
                          <Field className="fieldControl" name="new_password" onIonChange={handleChange} value={values.new_password} placeholder="Enter New Password"
                            type="password" />
                        </div>
                      </IonItem>
                      {touched.new_password && errors.new_password && (
                        <IonText color="danger" className="errorMessage">
                          <ErrorMessage name="new_password" />
                        </IonText>
                      )}
                      <IonItem lines="none" className="ion-align-items-center ionItemShadow inputFiledSty">
                        <div>
                          <IonLabel className="fieldName">Confirm New Password</IonLabel>
                          <Field className="fieldControl" name="confirmPassword" onIonChange={handleChange} value={values.confirmPassword} placeholder="Enter Confirm New Password"
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
                {isLoading && <Loader message={loadingMessage} />}
      </IonPage>
    </>
  );
};

export default ChangePassword;
