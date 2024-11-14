import React, { useEffect, useState } from "react";
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
  IonFooter,
  IonSelect,
  IonSelectOption,
} from "@ionic/react";
import { useHistory } from 'react-router';
import { ribbon, checkmark } from 'ionicons/icons'
import * as Yup from "yup";
import { toast } from 'react-toastify';
import { Formik, Form, Field, ErrorMessage, FormikContext } from 'formik';
import useLoading from '../components/useLoading';
import { PushNotifications } from '@capacitor/push-notifications';
import { useAuth } from '../api/AuthContext';
import { getUserTypes, registerUser } from '../api/common';

const validationSchema = Yup.object({
  first_name: Yup.string().required('First Name is required'),
  last_name: Yup.string().required('Last Name is required'),
  user_type: Yup.string().required('User Type is required'),
  email_id: Yup.string().email('Invalid email address').required('Email is required'),
  mobile_no: Yup.string().required('Mobile Number is required')
});

const UserCreate: React.FC = () => {
  const history = useHistory();
  const { isLoading, startLoading, stopLoading } = useLoading();
  const { register } = useAuth();
  const [userTypes, setUserTypes] = useState<any[]>([]);
  const app_version: any = localStorage.getItem('app_version');
  const app_name: any = localStorage.getItem('app_name');
  const [isCompanyRequired, setIsCompanyRequired] = useState(false);

  const initialValues = {
    first_name: "",
    last_name: "",
    user_type: "",
    email_id: "",
    mobile_no: "",
  };
  useEffect(() => {
    getUserTypeList("individual");
  }, []);


  const handleSubmit = async (values: any) => {
    console.log('Form Data:', values);
    startLoading();

    try {
      console.log("values", values);
      const response = await registerUser(values);
      if (response.status == 201 && response.success == true) {
        toast.dismiss();
        toast.success(response.message);
        history.push("/users-list");
      }else {
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
        toast.error(error.message);
        console.error('An unexpected error occurred:', error);
      }
      
    }
    finally {
      stopLoading();
    }
  }

  const getUserTypeList = async (value: any) => {
    startLoading();
    try {
      const payload = {
        "registering_user": value//accepts corporate,individual
      }
      const response = await getUserTypes(payload);
      if (response.status == 200 && response.success == true) {
        console.log(response);
        setUserTypes(response.data);
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
              <IonCard className="mainCreateUserCard ion-padding-vertical">
                <IonText className="loginHeading"><h1>Create User</h1></IonText>
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}
                >
                  {({ touched, errors, handleChange, handleSubmit, setFieldValue, values }) => (
                    <Form>
                      <IonItem lines="none" className="ion-align-items-center ionItemShadow inputFiledSty">
                        <div>
                          <IonLabel className="fieldName">First Name</IonLabel>
                          <Field className="fieldControl" name="first_name" onIonChange={handleChange} value={values.first_name} placeholder="Enter Your First Name"
                            type="text" />
                        </div>
                      </IonItem>
                      {touched.first_name && errors.first_name && (
                        <IonText color="danger" className="errorMessage">
                          <ErrorMessage name="first_name" />
                        </IonText>
                      )}
                      <IonItem lines="none" className="ion-align-items-center ionItemShadow inputFiledSty">
                        <div>
                          <IonLabel className="fieldName">Last Name</IonLabel>
                          <Field className="fieldControl" name="last_name" onIonChange={handleChange} value={values.last_name} placeholder="Enter Your Last Name"
                            type="text" />
                        </div>
                      </IonItem>
                      {touched.last_name && errors.last_name && (
                        <IonText color="danger" className="errorMessage">
                          <ErrorMessage name="last_name" />
                        </IonText>
                      )}
                      <IonItem lines="none" className="ion-align-items-center ionItemShadow inputFiledSty">
                        <div>
                          <IonLabel className="fieldName">Email ID</IonLabel>
                          <Field className="fieldControl" name="email_id" onIonChange={handleChange} value={values.email_id} placeholder="Enter Your Email ID"
                            type="text" />
                        </div>
                      </IonItem>
                      {touched.email_id && errors.email_id && (
                        <IonText color="danger" className="errorMessage">
                          <ErrorMessage name="email_id" />
                        </IonText>
                      )}
                      <IonItem lines="none" className="ion-align-items-center ionItemShadow">
                        <IonSelect label="User Type" name="user_type" labelPlacement="stacked" onIonChange={handleChange} value={values.user_type} placeholder="Select User Type">
                          {userTypes.map((data: any) => (
                            <IonSelectOption key={data.id} value={data.id}>
                              {data.role_name}
                            </IonSelectOption>
                          ))}
                        </IonSelect>
                      </IonItem>
                      {touched.user_type && errors.user_type && (
                        <IonText color="danger" className="errorMessage">
                          <ErrorMessage name="user_type" />
                        </IonText>
                      )}
                      
                      <IonItem lines="none" className="ion-align-items-center ionItemShadow inputFiledSty">
                        <div>
                          <IonLabel className="fieldName">Mobile No</IonLabel>
                          <Field className="fieldControl" name="mobile_no" onIonChange={handleChange} value={values.mobile_no} placeholder="Enter Your Mobile No"
                            type="text" />
                        </div>
                      </IonItem>
                      {touched.mobile_no && errors.mobile_no && (
                        <IonText color="danger" className="errorMessage">
                          <ErrorMessage name="mobile_no" />
                        </IonText>
                      )}
                      <IonButton type="submit" shape="round" expand="block" color="primary" >Add User</IonButton>
                    </Form>
                  )}
                </Formik>
              </IonCard>
            </div>
          </div>
        </IonContent>

        <IonFooter className="ion-padding-horizontal">
          <IonToolbar>
            <IonButton routerLink="/users-list" shape="round" expand="block" color="primary" >Add User</IonButton>
          </IonToolbar>
        </IonFooter>
      </IonPage>
    </>
  );
};

export default UserCreate;

