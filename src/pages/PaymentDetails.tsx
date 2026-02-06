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
  IonRow,
  IonCol,
  IonCardTitle,
  IonCardContent,
  IonFooter,
  IonActionSheet,
  IonModal,
} from "@ionic/react";

import { useHistory } from 'react-router';
import Loader from '../components/Loader';
import { ribbon, checkmark, create, closeOutline, timeOutline } from 'ionicons/icons'

import useLoading from '../components/useLoading';
import { enrollCourseTraining, getCourseList, savePaymentStatus } from '../api/common';
import { toast } from 'react-toastify';
import { useAuth } from '../api/AuthContext';
import { checkPaymentStatus, createPurchase, createSession, generateOrderId, getCheckoutDetails } from '../api/Payment';
import { Browser } from '@capacitor/browser';
import { generate } from 'rxjs';
import { InAppBrowser } from '@ionic-native/in-app-browser';

const PaymentDetails: React.FC = () => {
  const { isLoading, startLoading, stopLoading } = useLoading();
  const [loadingMessage, setLoadingMessage] = useState<string>('Loading....');
  const history = useHistory();
  const { userData } = useAuth();
  const selectedCourseData = JSON.stringify(localStorage.getItem('selectedCourses'));
  const [selectedCourses, setSelectedCourses] = useState<any[]>(JSON.parse(selectedCourseData ? JSON.parse(selectedCourseData) : []));
  const [paymentGatewayType, setPaymentGatewayType] = useState<string>(localStorage.getItem('paymentGateway') || '');
  const [totalAmount, setTotalAmount] = useState<any>(0);
  const [slotSelectionCourses, setSlotSelectionCourses] = useState<any[]>([]);
  const [checkoutReady, setCheckoutReady] = useState(false);
  const [orderId, setOrderId] = useState<any>('');
  const [showActionSheet, setShowActionSheet] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes (300 seconds)
  let intervalId: NodeJS.Timeout | null = null;

  const apiUrl: any = import.meta.env.VITE_PAYMENT_GATEWAY_URL;
  const checkoutScript: any = import.meta.env.VITE_CHECKOUT_SCRIPT;

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (showActionSheet) {
      setShowLoading(true); // Show loader initially
      // Start the countdown
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setShowActionSheet(false); // Auto-close after countdown ends
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      // Hide loader after a few seconds (simulating API response)
      setTimeout(() => {
        setShowLoading(false);
      }, 5000);
    }

    return () => clearInterval(timer);
  }, [showActionSheet]);

  useEffect(() => {
    startLoading();
    const script = document.createElement("script");
    script.src = checkoutScript;
    script.async = true;
    script.onload = () => {
      if (window.Checkout) {
        stopLoading();
        setCheckoutReady(true);
      }
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);
  // Format time in MM:SS format
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };
  const startPayment = async (paymentMethod: "LIGHTBOX" | "PAYMENT_PAGE") => {
    startLoading();
    if (!checkoutReady || !window.Checkout) {
      console.error("Checkout.js is not ready yet.");
      return;
    }

    try {
      // 🔹 Simulating API request to get a new session ID
      const order_id = await generateOrderId();
      localStorage.setItem('order_id', order_id);
      console.log(order_id);
      setOrderId(order_id);
      const sessionResponse = await createSession(totalAmount, order_id);

      console.log(sessionResponse);

      if (sessionResponse.result === "SUCCESS") {
        const sessionId = sessionResponse.session.id;
        // 🔹 Configure Checkout with the new session ID
        window.Checkout.configure({
          session: {
            id: sessionId,
          },
        });
        console.log("Checkout object after configuration:", window.Checkout);
        const paymentURL = apiUrl + 'checkout/pay/' + sessionId + '?checkoutVersion=1.0.0';
        openPaymentPage(paymentURL);
      }


    } catch (error) {
      console.error("Payment initialization error:", error);
    }
  };
  const startCheckout = async () => {
    startLoading();
    try {
      // 🔹 Simulating API request to get a new session ID
      const order_id = await generateOrderId();
      localStorage.setItem('order_id', order_id);
      console.log(order_id);
      setOrderId(order_id);
      const sessionResponse = await createPurchase(totalAmount, order_id);

      console.log(sessionResponse);

      if (sessionResponse.http_code == "200" && sessionResponse.status == true) {
        const checkoutId = sessionResponse.response.checkoutId;
        localStorage.setItem('checkoutId', checkoutId);
        console.log("Checkout object after configuration:", window.Checkout);
        const paymentURL = sessionResponse.response.checkoutUrl;
        openCheckoutPage(paymentURL);
      }


    } catch (error) {
      console.error("Payment initialization error:", error);
    }
  };
  const openCheckoutPage = (paymentURL: string) => {
    let shouldCloseBrowser = false;

    const browser = InAppBrowser.create(
      paymentURL,
      '_self',
      'location=no,toolbar=no,hideurlbar=yes' // Additional options
    );

    browser.on('loadstart').subscribe(async (event) => {
      try {
        const url = new URL(event.url);
        const status = url.searchParams.get('status');

        console.log('Payment status:', status);

        if (status === 'payment_deposited') {
          shouldCloseBrowser = true;

          await updateCheckoutStatus(); // backend success
          // ❌ DO NOT close here
        }
      } catch (err) {
        console.log('Invalid URL:', event.url);
      }
    });

    browser.on('loadstop').subscribe(() => {
      console.log('Page fully loaded.');

      if (shouldCloseBrowser) {
        browser.close(); // ✅ SAFE PLACE
      }
    });

    browser.on('exit').subscribe(() => {
      stopLoading();
      console.log('Browser closed.');
    });
  };

  const openPaymentPage = (paymentURL: any) => {
    // Open a browser instance
    const browser = InAppBrowser.create(
      paymentURL, // URL to open
      '_self',             // Target ('_self', '_blank', '_system')
      'location=no,toolbar=no,hideurlbar=yes' // Additional options
    );
    // Listen for the `loadstart` event (when a page starts loading)
    browser.on('loadstart').subscribe(async (event) => {
      if (event.url.includes('payment-confirmation')) {
        updatePaymentStatus();
        browser.close();
      }
      else {
        console.log('Unknown URL:', event.url);
      }
      console.log('Page loading started:', event.url);
    });

    // Listen for the `loadstop` event (when a page finishes loading)
    browser.on('loadstop').subscribe(() => {
      console.log('Page fully loaded.');
    });

    // Listen for the `exit` event (when the browser is closed)
    browser.on('exit').subscribe(() => {
      stopLoading();
      console.log('Browser closed.');
    });
  };
  const updatePaymentStatus = async () => {
    const element = document.getElementById("hc-loader-container");
    if (element) {
      element.remove(); // Removes the element from the DOM
      //setIsRemoved(true); // Update state to reflect removal
    }

    const paymentStatus = await checkPaymentStatus(localStorage.getItem('order_id'));
    console.log(paymentStatus);
    if (paymentStatus.result === 'SUCCESS' && paymentStatus.status === 'CAPTURED') {
      if (paymentStatus.transaction[1].response.acquirerCode === '00' && paymentStatus.transaction[1].result === 'SUCCESS') {
        // Stop interval when payment is successful
        if (intervalId) {
          clearInterval(intervalId);
          intervalId = null;
          console.log("Payment successful. Interval stopped.");
        }
        EnrollCourses(paymentStatus.transaction[1].transaction.receipt, paymentStatus.status, paymentStatus);
      }
    }
  };
  const updateCheckoutStatus = async () => {
    const checkoutStatus = await getCheckoutDetails(localStorage.getItem('order_id'), localStorage.getItem('checkoutId'));
    console.log("checkoutStatus", checkoutStatus);
    if (checkoutStatus.checkoutStatus === 'CLOSED' && checkoutStatus.responseCode == 0) {
      if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
        console.log("Payment successful. Interval stopped.");
      }
      EnrollCourses(checkoutStatus.purchaseBreakdown.uniqueReferenceNumber, checkoutStatus.checkoutStatus, checkoutStatus);
    }
  };
  useEffect(() => {
    setTotalAmount(selectedCourses.reduce((accumulator, currentItem) => {
      return accumulator + parseInt(currentItem.total);
    }, 0));
  }, [selectedCourses]);

  useEffect(() => {
    localStorage.setItem('selectedCourses', JSON.stringify(selectedCourses));
  }, [selectedCourses]);

  const handlePropertyChange = async (event: any, courseId: any, propertyId: any) => {
    const { value, checked } = event.target;
    setSelectedCourses((prevCourses) =>
      prevCourses.map((course) => {
        if (course.id === courseId) {
          const updatedProperties = course.properties.map((property: any) =>
            property.id === propertyId
              ? { ...property, isChecked: checked }
              : property
          );

          // Calculate the new total based on updated properties
          const newTotal = updatedProperties
            .filter((property: any) => property.isChecked)
            .reduce((sum: any, property: any) => sum + parseFloat(property.price), 0)
            .toFixed(2);
          return {
            ...course,
            properties: updatedProperties,
            total: newTotal
          };
        }
        return course;
      })
    );

  };

  const EnrollCourses = async (receipt: any, status: any, responseBody: any) => {
    let courseSlots: any = [];
    console.log(slotSelectionCourses);
    startLoading();
    // Check if there is at least one unchecked property (isChecked = false)
    const hasUnchecked = selectedCourses.some(course =>
      course.properties.every((property: any) => !property.isChecked)
    );
    if (hasUnchecked) {
      toast.dismiss();
      toast.error('Please select atleast one Property for each course');
      return;
    }
    const payload: any = {
      no_of_courses: selectedCourses.length,
      no_of_users: 1,
      total_amount: totalAmount,
      payment_status: "initiated",
      courses: [],
      //users: []
    }
    selectedCourses.map((course) => {
      course.properties.map((property: any) => {
        if (property.isChecked == true) {
          payload.courses.push({
            course_id: course.id,
            course_property: property.id,
            amount: property.price,
            user_id: userData.id
          })
          if (property.id == 1) {
            courseSlots.push(course);
          }
        };
      });
    });
    setSlotSelectionCourses(courseSlots);
    console.log(courseSlots);
    // payload.users.push({
    //   user_id : userData.id
    // })
    console.log(payload);
    try {
      const response = await enrollCourseTraining(payload);
      console.log(response);
      if ((response.status === 200 || response.status == 201) && response.success == true) {
        if (userData.is_internal_user == 1) {
          localStorage.removeItem('selectedCourses');
          toast.dismiss();
          toast.success(response.message);
          stopLoading();
          setShowActionSheet(false);
          history.push({
            pathname: "/payment-confirmation", //pathname: "/payment-confirmation",
            state: { from: 'dashboard', data: response.data, courses: courseSlots }
          });
          //history.push("/payment-confirmation");
        } else {
          try {
            const paymentPayload = {
              "enrollment_id": response.data.enrollment_id,
              "payment_status": status,
              "payment_id": receipt,
              "payment_details": JSON.stringify(responseBody)
            }
            const paymentResponse = await savePaymentStatus(paymentPayload);
            console.log(paymentResponse);
            if (paymentResponse.status === '200' && paymentResponse.success == true) {
              localStorage.removeItem('selectedCourses');
              toast.dismiss();
              toast.success(response.message);
              stopLoading();
              setShowActionSheet(false);
              history.push({
                pathname: "/payment-confirmation", //pathname: "/payment-confirmation",
                state: { from: 'dashboard', data: response.data, courses: courseSlots }
              });
              //history.push("/payment-confirmation");
            }
          }
          catch (error: any) {
            console.log(error);
            stopLoading();
            toast.dismiss();
            toast.error(error.message);
          }
          finally {
            stopLoading();
          }
        }


      }
      else {
        if (response.status == 400 && response.success == false) {
          if (response.error) {
            const apiErrors = response.error;
            Object.keys(apiErrors).forEach((field) => {
              toast.dismiss();
              toast.error(apiErrors[field][0]);
            });
            stopLoading();
          } else {
            stopLoading();
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
      stopLoading();
      toast.dismiss();
      toast.error(error.message);
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
            <IonTitle>Payment Details</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen className="colorBg paymentDetails ionContentBottom">
          <IonImg className="topbg" src="./assets/images/top-bg.svg"></IonImg>
          <div className="bgSvg">
            <IonCard className="totalPaymentCard">
              <IonText>
                <p>Selected Courses Total Payment</p>
                <h2>{parseFloat(totalAmount).toFixed(2)} AED</h2>
              </IonText>
            </IonCard>
            {selectedCourses && selectedCourses.length > 0 && selectedCourses.map((data: any, courseIndex: any) => (
              <IonCard className="cardPaymentDetails" key={`${data.id}-cardPaymentDetails`}>
                <IonCardTitle>{data.course_name}</IonCardTitle>
                <IonCardContent>
                  {data.properties && data.properties.length > 0 && data.properties.map((res: any, propertyIndex: any) => (
                    <IonItem lines="none" key={`${res.id}-key`}>
                      <div><IonCheckbox checked={res.isChecked} onIonChange={(event) => handlePropertyChange(event, data.id, res.id)} labelPlacement="end">{res.property} Price</IonCheckbox></div>
                      {res.id === '1' && <IonText slot="end"><h5>{data.course_price}</h5></IonText>}
                      {res.id === '2' && <IonText slot="end"><h5>{data.exam_price}</h5></IonText>}
                      {res.id === '3' && <IonText slot="end"><h5>{data.license_price}</h5></IonText>}
                    </IonItem>
                  ))}
                  <IonItem className="totalAde" lines="none">
                    <h4>Total</h4>
                    <IonText slot="end"><h5><span>AED</span> {data.total}</h5></IonText>
                  </IonItem>
                </IonCardContent>
              </IonCard>
            ))}
          </div>
          <IonModal isOpen={showActionSheet} className="awaitingResponse custom-modal" backdropDismiss={false}>
            <IonContent className="ion-padding modal-content">
              <div className="modal-container">
                {/* <div className="modal-header">
                  <IonIcon icon={closeOutline} className="close-icon" />
                </div> */}
                <IonText className="modal-title">Awaiting Response</IonText>
                <IonText className="modal-subtitle">
                  Please wait while we process your payment.
                </IonText>
                <IonIcon icon={timeOutline} className="timer-icon" />
                <IonText className="timer">{formatTime(timeLeft)}</IonText>
              </div>
            </IonContent>
          </IonModal>
          {/* <IonActionSheet
            isOpen={showActionSheet}
            header="Payment in Process"
            subHeader={`Please wait... ${formatTime(timeLeft)} remaining`}
            buttons={[]} // No buttons
            backdropDismiss={false} // Prevent manual dismissal
          /> */}
        </IonContent>
        {isLoading && <Loader message={loadingMessage} />}

        <IonFooter>
          <IonToolbar>
            {/* <IonButton onClick={(event) => proceedWithPayment()} shape="round" expand="block" color="primary" >Proceed to Payment</IonButton> */}
            {userData.is_internal_user == 0 &&
              <span>
                <IonButton onClick={() => paymentGatewayType === 'old' ? startPayment("PAYMENT_PAGE") : startCheckout()} disabled={!checkoutReady} shape="round" expand="block" color="primary" >Proceed to Payment</IonButton>
                {/* <IonButton onClick={() => startPayment2("PAYMENT_PAGE")} disabled={!checkoutReady} shape="round" expand="block" color="primary" >External Browser</IonButton> */}
              </span>

            }
            {userData.is_internal_user == 1 &&
              <IonButton onClick={() => EnrollCourses("", "", "'")} shape="round" expand="block" color="primary" >Enroll</IonButton>
            }
          </IonToolbar>
        </IonFooter>

      </IonPage>
    </>
  );
};

export default PaymentDetails;

