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
  IonThumbnail,
  IonList,
  IonFooter,
  IonSelect,
  IonSelectOption
} from "@ionic/react";
import { useHistory } from 'react-router';
import Loader from '../../components/Loader';
import { ribbon, checkmark } from 'ionicons/icons';
import useLoading from '../../components/useLoading';
import * as Yup from "yup";
import { getCourseList, getUserTypes, validateUser } from '../../api/common';
import { toast } from 'react-toastify';
import { useAuth } from '../../api/AuthContext';
import NoDataFound from '../../components/NoDataFound';
import { getaccesstoken, uaeuserInfo } from '../../api/common';
import { Formik, Form, Field, ErrorMessage } from 'formik';

const validationSchema = Yup.object({
  user_type: Yup.string().required('User Type is required'),
  company_name: Yup.string().when('registration_type', (registration_type: any, schema) => {
    return registration_type == 'corporate'
      ? schema.required('Company Name is required')
      : schema.notRequired(); // Ensures phoneNumber is optional otherwise
  }),
  registration_type: Yup.string().required('Registration Type is required')
});
const UaePassVerification: React.FC = () => {
  const { isLoading, startLoading, stopLoading } = useLoading();
  const [loadingMessage, setLoadingMessage] = useState<string>('Loading....');
  const { userData, register, updateUserData } = useAuth();
  const [isRegistrationRequired, setIsRegistrationRequired] = useState(false);
  const [userInfo, setUserInfo] = useState<any>([]);
  const [userTypes, setUserTypes] = useState<any[]>([]);
  const app_version: any = localStorage.getItem('app_version');
  const app_name: any = localStorage.getItem('app_name');
  const [isCompanyRequired, setIsCompanyRequired] = useState(false);
  const initialValues = {
    user_type: "",
    company_name: "",
    registration_type: "",
  };
  const history = useHistory();
  const queryParams: any = history.location.state;


  useEffect(() => {
    console.log("queryParams---------------", history.location);
    if (queryParams) {

      const getAccessToken = async () => {
        console.log(queryParams.authorization_code, "Authorization Code");
        try {
          startLoading();
          setLoadingMessage('Authenticating...');
          const username = import.meta.env.VITE_USERNAME;
          const password = import.meta.env.VITE_PASSWORD;
          const credentials = `${username}:${password}`;
          const creds = btoa(credentials);
          const accessTokenResponse: any = await getaccesstoken(queryParams.authorization_code, creds);
          console.log('Access Token', accessTokenResponse);
          if (accessTokenResponse) {
            getUserInfo(accessTokenResponse.access_token);
          } else {
            stopLoading();
            setLoadingMessage('Loading...');
          }
        }
        catch (error: any) {
          console.error(error);
          stopLoading();
          setLoadingMessage('Loading...');
        }
      }

      getAccessToken();

    } else {

    }
  }, []);

  const getUserInfo = async (token: any) => {

    try {
      const response: any = await uaeuserInfo(token);

      if (response?.email) {
        setUserInfo(response);
        const payload = {
          email_id: response?.email,
          emirates_id: response?.emirates_id ? response?.emirates_id : ''
        }
        const userVerification = await validateUser(payload);
        console.log(userVerification);
        if (userVerification.status == 200 && userVerification.success == true) {
          if (userVerification.user_exists == true) {
            setIsRegistrationRequired(false);
            await updateUserData(userVerification.data);
            localStorage.setItem('token', userVerification.data.api_token);
            localStorage.setItem('userData', JSON.stringify(userVerification.data));
            history.push("/dashboard")
          } else {
            stopLoading();
            setLoadingMessage('Loading...');
            setIsRegistrationRequired(true);
          }
        }
      } else {
        stopLoading();
        setLoadingMessage('Loading...');
      }
    }
    catch (error: any) {
      console.error(error);
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

  const handleSubmit = async (values: any) => {
    console.log('Form Data:', values);
    startLoading();
    // let deviceToken: any = localStorage.getItem('device_token');
    // if(deviceToken === null) {
    //     await PushNotifications.register();
    // }
    try {
      const payload = {
        first_name: userInfo.firstnameEN,
        last_name: userInfo.lastnameEN,
        email_id: userInfo.email,
        user_type: values.user_type,// Training Company User = 17
        mobile_no: userInfo.mobile,
        emirates_id: userInfo?.emirates_id ? userInfo?.emirates_id : '',
        company_name: values.company_name
      }

      console.log("payload", payload);
      const response = await register(payload, app_name, app_version);
      if (response.status == 200 && response.success == true) {
        history.push("/dashboard")
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
  return (
    <>
      <IonPage>
        {isRegistrationRequired && (
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
                  <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                  >
                    {({ touched, errors, handleChange, handleSubmit, setFieldValue, values }) => (
                      <Form>
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

                        <IonButton type="submit" className="ion-button" slot="primary" fill="solid" expand="block">Next</IonButton>
                      </Form>
                    )}
                  </Formik>
                </IonCard>

              </div>
            </div>
          </IonContent>
        )}
        {isLoading && <Loader message={loadingMessage} />}
      </IonPage>
    </>
  );
};

export default UaePassVerification;

