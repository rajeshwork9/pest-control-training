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
} from "@ionic/react";
import { useHistory } from 'react-router';
import { ribbon, checkmark, create } from 'ionicons/icons'

import useLoading from '../components/useLoading';
import { enrollCourseTraining, getCourseList } from '../api/common';
import { toast } from 'react-toastify';
import { useAuth } from '../api/AuthContext';

const CorporatePaymentDetails: React.FC = () => {
  const { isLoading, startLoading, stopLoading } = useLoading();
  const history = useHistory();
  const { userData } = useAuth();
  const selectedCourseData = JSON.stringify(localStorage.getItem('selectedCourse'));
  const [selectedCourse, setSelectedCourse] = useState<any>(JSON.parse(selectedCourseData ? JSON.parse(selectedCourseData) : []));

  const selectedUserData = JSON.stringify(localStorage.getItem('selectedUsers'));
  const [selectedUsers, setSelectedUsers] = useState<any[]>(JSON.parse(selectedUserData ? JSON.parse(selectedUserData) : []));
  const [totalAmount, setTotalAmount] = useState<any>(0);
 

  useEffect(() => {
    console.log(selectedCourse);
    setTotalAmount(selectedCourse.total * selectedUsers.length);
  }, []);

  useEffect(() => {
    localStorage.setItem('selectedCourse', JSON.stringify(selectedCourse));
  }, [selectedCourse]);

  const handlePropertyChange = async (event: any, courseId: any, propertyId: any) => {
    const { value, checked } = event.target;
    console.log(checked);
    setSelectedCourse((prevCourse : any) => {
        // Update the properties array within the single course object
        const updatedProperties = prevCourse.properties.map((property: any) =>
          property.id === propertyId
            ? { ...property, isChecked: checked }
            : property
        );
      
        // Calculate the new total based on updated properties
        const newTotal = updatedProperties
          .filter((property: any) => property.isChecked)
          .reduce((sum: number, property: any) => sum + parseFloat(property.price), 0)
          .toFixed(2);
      
          setTotalAmount(newTotal * selectedUsers.length);
        // Return the updated course object with new properties and total
        return {
          ...prevCourse,
          properties: updatedProperties,
          total: newTotal,
        };
      });
  };
  const proceedWithPayment = async () => {
    // Check if there is at least one unchecked property (isChecked = false)
    const hasUnchecked = selectedCourse.properties.every((property: any) => !property.isChecked);
    if (hasUnchecked) {
      toast.dismiss();
      toast.error('Please select atleast one Property for '+selectedCourse.course_name+'.');
      return;
    }
    const payload: any = {
      no_of_courses: 1,
      no_of_users: selectedUsers.length,
      total_amount: totalAmount,
      payment_status: "initiated",
      courses: [],
      //users: []
    }
    selectedUsers.map((user) => {
        selectedCourse.properties.map((property: any) => {
        if (property.isChecked == true) {
          payload.courses.push({
            course_id: selectedCourse.id,
            course_property: property.id,
            amount: property.price,
            user_id: user.id
          })
        };
      });
    });
    // payload.users.push({
    //   user_id : userData.id
    // })

    console.log(payload);
    //return;
    try {
      const response = await enrollCourseTraining(payload);
      console.log(response);
      if ((response.status === 200 || response.status == 201) && response.success == true) {
        localStorage.removeItem('selectedCourse');
        localStorage.removeItem('selectedUsers');
        toast.dismiss();
        toast.success(response.message);
        history.push({
          pathname: "/payment-confirmation",
          state: { from: 'dashboard', data: response.data }
        });
        //history.push("/payment-confirmation");
      }
      else {
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
        console.error('An unexpected error occurred:', error);
      }
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
            {/* Corporate Start*/}
            <IonCard className="totalPaymentCard">
                <IonText>
                  <p>Selected Total Users</p>
                  <div className="d-flex ion-justify-content-between">
                    <h2>{selectedUsers.length}</h2>
                    <IonButton shape="round" size="small" color="primary"><IonIcon icon={create}></IonIcon> Edit</IonButton>
                  </div>
                  </IonText>
              </IonCard>
            {/* Corporate End*/}
            {selectedCourse &&  (
                <IonCard className="cardPaymentDetails">
                <IonCardTitle>{selectedCourse.course_name}</IonCardTitle>
                <IonCardContent>
                    {selectedCourse.properties && selectedCourse.properties.length > 0 && selectedCourse.properties.map((res: any, propertyIndex: any) => (
                    <IonItem lines="none" key={`${selectedCourse.id}-${res.name}`}>
                        <div><IonCheckbox checked={res.isChecked} onIonChange={(event) => handlePropertyChange(event, selectedCourse.id, res.id)} labelPlacement="end">{res.property} Price</IonCheckbox></div>
                        {res.id === '1' && <IonText slot="end"><h5>{selectedCourse.course_price}</h5></IonText>}
                        {res.id === '2' && <IonText slot="end"><h5>{selectedCourse.exam_price}</h5></IonText>}
                        {res.id === '3' && <IonText slot="end"><h5>{selectedCourse.license_price}</h5></IonText>}
                    </IonItem>
                    ))}
                    <IonItem className="totalAde" lines="none">
                    <h4>Total</h4>
                    <IonText slot="end"><h5><span>AED</span> {selectedCourse.total}</h5></IonText>
                    </IonItem>
                </IonCardContent>
                </IonCard>
            )}
            {/* Corporate Start*/}
            <IonCard className="corporateTotalPaymentCard">
                <IonText>
                  <p>Total Payment <span> {selectedUsers.length} X 1000</span></p>
                    <h2>{parseFloat(totalAmount).toFixed(2)} AED</h2>
                  </IonText>
              </IonCard>
            {/* Corporate Start*/}
          </div>
        </IonContent>

        <IonFooter>
          <IonToolbar>
            <IonButton onClick={(event) => proceedWithPayment()} shape="round" expand="block" color="primary" >Proceed to Payment</IonButton>
          </IonToolbar>
        </IonFooter>

      </IonPage>
    </>
  );
};

export default CorporatePaymentDetails;

