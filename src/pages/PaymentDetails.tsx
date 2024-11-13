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

const PaymentDetails: React.FC = () => {
  const { isLoading, startLoading, stopLoading } = useLoading();
  const history = useHistory();
  const { userData } = useAuth(); 
  const selectedCourseData = JSON.stringify(localStorage.getItem('selectedCourses'));
  const [selectedCourses, setSelectedCourses] = useState<any[]>(JSON.parse(selectedCourseData ? JSON.parse(selectedCourseData) : []));
  //const [totalAmount, setTotalAmount] = useState<any>(0);
  const totalAmount = selectedCourses.reduce((accumulator, currentItem) => {
    return accumulator + parseInt(currentItem.total);
  }, 0);

  useEffect(() => {

  }, []);

  useEffect(() => {
    localStorage.setItem('selectedCourses', JSON.stringify(selectedCourses));
  }, [selectedCourses]);

  const handlePropertyChange = async (event: any, courseId: any, propertyId: any) => {
    const { value, checked } = event.target;
    console.log(checked);
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
  const proceedWithPayment = async () => {
    // Check if there is at least one unchecked property (isChecked = false)
    const hasUnchecked = selectedCourses.some(course =>
      course.properties.every((property: any) => !property.isChecked)
    );
    if (hasUnchecked) {
      toast.error('Please select atleast one Property for each course');
      return;
    }
    const payload : any = {
      no_of_courses: selectedCourses.length,
      no_of_users: 1,
      total_amount: totalAmount,
      payment_status: "initiated",
      courses: [],
      users: []
    }
    selectedCourses.map((course) =>{
      course.properties.map((property :any)=>{
        if(property.isChecked == true){
          payload.courses.push({
            course_id: course.id,
            course_property: property.id,
            amount: property.price
          })
        };
      });
    });
    payload.users.push({
      user_id : userData.id
    })

    console.log(payload);
    try {
      const response = await enrollCourseTraining(payload);
      console.log(response);
      if (response.status == 200 && response.success == true) {
        
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

            {/* Corporate Start*/}
            {/* <IonCard className="totalPaymentCard">
                <IonText>
                  <p>Selected Total Users</p>
                  <div className="d-flex ion-justify-content-between">
                    <h2>O5</h2>
                    <IonButton shape="round" size="small" color="primary"><ion-icon icon={create}></ion-icon> Edit</IonButton>
                  </div>
                  </IonText>
              </IonCard> */}
            {/* Corporate End*/}
            {selectedCourses && selectedCourses.length > 0 && selectedCourses.map((data: any, courseIndex: any) => (
              <IonCard className="cardPaymentDetails">
                <IonCardTitle>{data.course_name}</IonCardTitle>
                <IonCardContent>
                  {data.properties && data.properties.length > 0 && data.properties.map((res: any, propertyIndex: any) => (
                    <IonItem lines="none">
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
            {/* Corporate Start*/}
            {/* <IonCard className="corporateTotalPaymentCard">
                <IonText>
                  <p>Total Payment <span> 5 X 1000</span></p>
                    <h2>5000 AED</h2>
                  </IonText>
              </IonCard> */}
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

export default PaymentDetails;
