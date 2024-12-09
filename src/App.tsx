import { Redirect, BrowserRouter as Router, Route, Switch, useHistory } from 'react-router-dom';
import { IonApp, IonRouterOutlet, isPlatform, setupIonicReact, useIonViewDidEnter, } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';



/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
// import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.scss';
import './global.scss';
import Home from './pages/Home';

import Dashboard from './pages/Dashboard';
import Login from './pages/authentication/Login';
import { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { registerPushHandlers } from './utils/pushNotifications';
import { loadGoogleMapsScript } from './utils/googleApiLoader';
import { App as CapacitorApp } from '@capacitor/app';
import { Device } from '@capacitor/device';
import { Capacitor, Plugins } from '@capacitor/core';
import { PushNotifications, Token } from '@capacitor/push-notifications';
import { AuthProvider, useAuth } from './api/AuthContext';
import { appSettings } from './api/common';
import AuthGuard from './guards/AuthGuard';
import EnrollCourses from './pages/EnrollCourses';
import EnrollCoursesDetails from './pages/EnrollCoursesDetails';
import PaymentConfirmation from './pages/PaymentConfirmation';
import PaymentDetails from './pages/PaymentDetails';
import SelectedCourses from './pages/SelectedCourses';
import SelectedCoursesDetails from './pages/SelectedCoursesDetails';
import LoginWithMobile from './pages/authentication/LoginWithMobile';
import Signup from './pages/authentication/Signup';
import AppUpdate from './components/AppUpdate';
import NetworkSpeedCheck from './components/NetworkSpeedCheck';
import NetworkStatus from './components/NetworkStatus';
const { SwipeBack } = Plugins;
import CorporateDashboard from './pages/CorporateDashboard';
import UsersList from './pages/UsersList';
import UserDetails from './pages/UserDetails';
import UserCreate from './pages/UserCreate';
import SelectUser from './pages/SelectUser';
import Profile from './pages/Profile';
import CorporatePaymentDetails from './pages/CorporatePaymentDetails';
import ResetPassword from './pages/authentication/ResetPassword';
import { Geolocation } from '@capacitor/geolocation';
import { Filesystem } from '@capacitor/filesystem';
import Transactions from './pages/Transactions';
import TransactionsDetails from './pages/TransactionsDetails';
import CorporateSelectedCourses from './pages/CorporateSelectedCourses';
import CorporateSelectedCoursesDetails from './pages/CorporateSelectedCoursesDetails';
import Attendance from './pages/Attendance';
import Quiz from './pages/Quiz';
import QuizResult from './pages/QuizResult';
import Exam from './pages/Exam';
import ExamResult from './pages/ExamResult'; 
import ResultList from './pages/ResultList'; 
import SlotSelection from './pages/SlotSelection';




setupIonicReact({
  swipeBackEnabled: false,
});
const App: React.FC = () => {
  const history = useHistory();
  const { isLoggedIn, userData } = useAuth();
  const token = localStorage.getItem('token');
  const check = localStorage.getItem('checkIn');
  console.log("token", token);
  const [position, setPosition] = useState<any>();
  const [error, setError] = useState<string>("");
  const taskId = localStorage.getItem('taskId');

  const [appInfo, setAppInfo] = useState<any>([]);
  const [googleApiKey, setGoogleApiKey] = useState<string>(localStorage.getItem('Google_Map_API_Key') || '');
  const [appVersion, setAppVersion] = useState<string>('');
  const storedUserData: any = localStorage.getItem('userData');
  const parsedUserData: any = JSON.parse(storedUserData);
  const userId = parsedUserData?.user_id;
  const user_type = parsedUserData?.user_type;

  useEffect(() => {
    localStorage.setItem('app_name', 'psd-training-app');
    registerPushHandlers();
    handlePlatform();
  }, []);

  const requestPermissions = async () => {
    try {
      // Request Location Permission
      const locationPermission = await Geolocation.requestPermissions();
      if (locationPermission.location === 'granted') {
        console.log('Location permission granted');
      } else {
        console.warn('Location permission denied');
      }

      // Request Storage Permission
      const permissionStatus = await Filesystem.requestPermissions();

      if (permissionStatus.publicStorage !== 'granted') {
        console.log('Filesystem permissions not granted.');
      } else {
        console.warn('Storage permission denied');
      }
    } catch (error) {
      console.error('Error requesting permissions:', error);
    }
  };

  async function handlePlatform() {
    try {
      const payload = { "type": "SETTINGS" }
      const AppSettings = await appSettings(payload);
      console.log(AppSettings);
      if (AppSettings && AppSettings.data.success) {
        const GoogleKey = AppSettings.data.data.find((setting: any) => setting.title === "Google_Map_API_Key");
        console.log(GoogleKey);
        if (GoogleKey) {
          localStorage.setItem('Google_Map_API_Key', GoogleKey.description);
        }
      }
      const info = await Device.getInfo();
      const platform = info.platform;
      console.log(platform);
      if (platform === 'ios' || platform === 'android') {
        requestPermissions();
        const deviceToken: any = localStorage.getItem('device_token');
        // Request permission to use Push Notifications
        if (deviceToken === null) {
          await PushNotifications.register();
        }
        console.log('Running on Device');
        const appInfos = await CapacitorApp.getInfo();
        setAppInfo(appInfos);
        setAppVersion(appInfos.version);

        localStorage.setItem('app_version', appInfos.version);
      } else {
        console.log('Running on Web');
        setAppInfo([]);
        localStorage.setItem('app_version', 'web');
      }
    } catch (error) {
      console.error('Error getting device info:', error);
    } finally {
      console.log(appInfo);
      console.log(appVersion);
    }
  }
  const checkIfLoggedIn = () => {
    const userDataString = localStorage.getItem("userData");
    if (userDataString) {
      const parsedData = JSON.parse(userDataString);
      return !!parsedData.api_token;
    }
    return false;
  };

  return (
    <IonApp>
      <NetworkSpeedCheck />

      <AuthProvider>
        <IonReactRouter>
          <IonRouterOutlet>
            <Switch>
              <Route path="/home" component={Home} />
              <Route path="/login" component={Login} />
              <Route path="/loginwithmobile" component={LoginWithMobile} />
              <Route path="/signup" component={Signup} />
              <AuthGuard roles={[8, 16, 17]} path="/reset-password" component={ResetPassword} />
              <AuthGuard roles={[8, 16]} path="/dashboard" component={Dashboard} />
              <AuthGuard roles={[8, 16]} path="/attendance" component={Attendance} />
              <AuthGuard roles={[8, 16, 17]} path="/enrollcourses" component={EnrollCourses} />
              <AuthGuard roles={[8, 16, 17]} path="/enroll-courses-details" component={EnrollCoursesDetails} />
              <AuthGuard roles={[8, 16, 17]} path="/payment-details" component={user_type == 17 ? CorporatePaymentDetails : PaymentDetails} />
              <AuthGuard roles={[8, 16, 17]} path="/payment-confirmation" component={PaymentConfirmation} />
              <AuthGuard roles={[8, 16]} path="/selected-courses" component={SelectedCourses} />
              <AuthGuard roles={[8, 16]} path="/selected-courses-details" component={SelectedCoursesDetails} />
              <AuthGuard roles={[8, 16]} path="/quiz" component={Quiz} />
              <AuthGuard roles={[8, 16]} path="/quiz-result" component={QuizResult} />
              <AuthGuard roles={[8, 16]} path="/slot-selection" component={SlotSelection} />
              <AuthGuard roles={[8, 16]} path="/exam" component={Exam} />
              <AuthGuard roles={[8, 16]} path="/exam-result" component={ResultList} />

              <AuthGuard roles={[8,16,17]} path="/profile" component={Profile} />
              <AuthGuard roles={[8,16,17]} path="/transactions" component={Transactions} />
              <AuthGuard roles={[8,16,17]} path="/transactions-details" component={TransactionsDetails} />
              <AuthGuard roles={[8,16,17]} path="/results-list" component={ResultList} />
              
              

              <AuthGuard roles={[17]} path="/corporate-dashboard" component={CorporateDashboard} />
              <AuthGuard roles={[17]} path="/corporate-selected-courses" component={CorporateSelectedCourses} />
              <AuthGuard roles={[17]} path="/corporate-selected-courses-details" component={CorporateSelectedCoursesDetails} />
              <AuthGuard roles={[17]} path="/users-list" component={UsersList} />
              <AuthGuard roles={[17]} path="/user-details" component={UserDetails} />
              <AuthGuard roles={[17]} path="/user-create" component={UserCreate} />
              <AuthGuard roles={[17]} path="/select-user" component={SelectUser} />

              {/* <Route path="/test" component={MistingChemicalInformationTest} /> */}
              {/* <Route path="/stopwatch" component={Stopwatch} /> */}
              {token ? (
                user_type == 8 || user_type == 16 ? (
                  <Redirect exact from="/" to="/dashboard" />
                ) : (
                  <Redirect exact from="/" to="/corporate-dashboard" />
                )
              ) : (
                <Redirect exact from="/" to="/login" />
              )}

              {/* {check ? <Redirect exact from="/" to="/dashboard" /> : <Redirect exact from="/" to="/home" />} */}
            </Switch>

          </IonRouterOutlet>
        </IonReactRouter>
      </AuthProvider>
      <NetworkStatus />
      <ToastContainer />

    </IonApp>
  )
};

export default App;

