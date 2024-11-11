import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
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
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.scss';
import './global.scss';
import Home from './pages/Home';
import Login from './pages/authentication/Login';
import OtpLogin from './pages/authentication/OtpLogin';
import Signup from './pages/authentication/Signup';
import LoginWithMobile from './pages/authentication/LoginWithMobile';
import Dashboard from './pages/Dashboard';
import EnrollCourses from './pages/EnrollCourses';
import EnrollCoursesDetails from './pages/EnrollCoursesDetails';
import PaymentDetails from './pages/PaymentDetails';
import PaymentConfirmation from './pages/PaymentConfirmation';
import SelectedCourses from './pages/SelectedCourses';
import SelectedCoursesDetails from './pages/SelectedCoursesDetails';
import CorporateDashboard from './pages/CorporateDashboard';
import UsersList from './pages/UsersList';
import UserCreate from './pages/UserCreate';
import SelectUser from './pages/SelectUser';

setupIonicReact();
const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        
      <Route exact path="/dashboard">
          <Dashboard/>
        </Route>

        <Route exact path="/loginwithmobile">
          <LoginWithMobile/>
        </Route>

        <Route exact path="/signup">
          <Signup/>
        </Route>

        <Route exact path="/login">
          <Login/>
        </Route>

        <Route exact path="/otplogin">
          <OtpLogin />
        </Route>

        <Route exact path="/enrollcourses">
          <EnrollCourses />
        </Route>

        <Route exact path="/enroll-courses-details">
          <EnrollCoursesDetails />
        </Route>

        <Route exact path="/payment-details">
          <PaymentDetails />
        </Route>
        
        <Route exact path="/payment-confirmation">
          <PaymentConfirmation />
        </Route>

        <Route exact path="/selected-courses">
          <SelectedCourses />
        </Route>

        <Route exact path="/selected-courses-details">
          <SelectedCoursesDetails />
        </Route>       

          <Route exact path="/corporate-dashboard">
          <CorporateDashboard />
        </Route> 

        <Route exact path="/users-list">
          <UsersList />
        </Route> 

        <Route exact path="/user-create">
          <UserCreate />
        </Route> 

        <Route exact path="/select-user">
          <SelectUser />
        </Route>

        <Route exact path="/home">
          <Home />
        </Route>
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
