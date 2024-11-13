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
  first_name: Yup.string().required('First Name is required'),
  last_name: Yup.string().required('Last Name is required'),
  user_type: Yup.string().required('User Type is required'),
  company_name:Yup.string().when('registration_type', (registration_type : any , schema) => {
    return registration_type == 'corporate'
      ? schema.required('Company Name is required')
      : schema.notRequired(); // Ensures phoneNumber is optional otherwise
  }),
  registration_type: Yup.string().required('Registration Type is required'),
  email_id: Yup.string().email('Invalid email address').required('Email is required'),
  mobile_no: Yup.string().required('Mobile Number is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  confirmPassword: Yup.string().oneOf([Yup.ref('password')], 'Passwords must match').required('Confirm Password is required'),
});

const Signup: React.FC = () => {
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
    company_name: "",
    registration_type: "",
    email_id: "",
    mobile_no: "",
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
      const response = await register(values, app_name, app_version);
      if (response.status == 200 && response.success == true) {
        console.log("hi")
        localStorage.setItem('token', response.data.api_token);
        localStorage.setItem('userData', JSON.stringify(response.data));
        localStorage.setItem('userPermissions', JSON.stringify(response.data.permission_types));
        toast.success(response.message);
        if (response.data.user_type == 8) {

          history.push("/dashboard");
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
                  <h1>Create Account</h1>
                  <p>Sign up to Continue</p>
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
                        <IonSelect
                          label="Register As"
                          name="registration_type"
                          labelPlacement="stacked"
                          value={values.registration_type}
                          placeholder="Select Register As"
                          onIonChange={(event) => {
                            const value = event.detail.value;
                            setFieldValue("registration_type", value); // Update Formik's state
                            setFieldValue("user_type", '');
                            getUserTypeList(value);
                          }}
                        >
                          <IonSelectOption value="corporate">Corporate</IonSelectOption>
                          <IonSelectOption value="individual">Individual</IonSelectOption>
                        </IonSelect>
                      </IonItem>
                      {touched.registration_type && errors.registration_type && (
                        <IonText color="danger" className="errorMessage">
                          <ErrorMessage name="registration_type" />
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
                      
                      {isCompanyRequired && (
                        <span>
                          <IonItem lines="none" className="ion-align-items-center ionItemShadow inputFiledSty">
                            <div>
                              <IonLabel className="fieldName">Company Name</IonLabel>
                              <Field className="fieldControl" name="company_name" onIonChange={handleChange} value={values.company_name} placeholder="Enter Your Company Name"
                                type="text" />
                            </div>
                          </IonItem>
                          {touched.company_name && errors.company_name && (
                            <IonText color="danger" className="errorMessage">
                              <ErrorMessage name="company_name" />
                            </IonText>
                          )}
                        </span>
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
                      <IonButton type="submit" className="ion-button" slot="primary" fill="solid" expand="block">Sign Up</IonButton>
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

export default Signup;
