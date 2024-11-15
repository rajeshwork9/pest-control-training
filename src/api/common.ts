import axios, { AxiosProgressEvent } from 'axios';
import axiosInstance from '../interceptors/ApiInterceptor';

import { formatDateTime } from '../utils/dateTimeUtils';
import { useIonLoading } from '@ionic/react';
import { useState } from 'react';



const apiUrl: any = import.meta.env.VITE_API_URL;


export const uploadFile = async (formData: FormData) => {
  const config = {
    onUploadProgress: (progressEvent: AxiosProgressEvent) => {
      const percentCompleted = progressEvent.total ? Math.max(Math.round((progressEvent.loaded * 100) / progressEvent.total) - 5, 0) : 0;
      console.log(percentCompleted);
    },
  };
  try {
    const response = await axiosInstance.post(`${apiUrl}api/v1/uplod-file`,formData);
    console.log(response);
    return response;
  }
  catch(error){
      console.error(error);
  }   
};
export const getCourseList = async (payload: any) => {
  try{
    const response = await axiosInstance.post(`${apiUrl}v1/courses-list`, payload);
    return response.data;
  }
  catch(error){
    console.error(error);
  }
};
export const getIndividualCourseList = async (payload: any) => {
  try{
    const response = await axiosInstance.post(`${apiUrl}v1/trainee-users-courses-list`, payload);
    return response.data;
  }
  catch(error){
    console.error(error);
  }
};
export const getIndividualCourseData = async (payload: any) => {
  try{
    const response = await axiosInstance.post(`${apiUrl}v1/trainee-users-course-materials`, payload);
    return response.data;
  }
  catch(error){
    console.error(error);
  }
};
export const getUserList = async (payload: any) => {
  try{
    const response = await axiosInstance.post(`${apiUrl}v1/users-list`, payload);
    return response.data;
  }
  catch(error){
    console.error(error);
  }
};
export const registerUser = async (payload: any) => {
  try{
    const response = await axiosInstance.post(`${apiUrl}v1/create-user`, payload);
    return response.data;
  }
  catch(error : any){
    return error.response.data;
    console.error(error);
  }
};
export const getUserTypes = async (payload: any) => {
  try{
    const response = await axiosInstance.post(`${apiUrl}v1/get-registered-user-types`, payload);
    return response.data;
  }
  catch(error){
    console.error(error);
  }
};
export const enrollCourseTraining = async (payload: any) => {
  try{
    const response = await axiosInstance.post(`${apiUrl}v1/enroll-course-training`, payload);
    return response.data;
  }
  catch(error){
    console.error(error);
  }
};
export const appSettings = async (payload: any) => {
  try{
    const response = await axiosInstance.post(`${apiUrl}api/v1/get-settings`, payload);
    return response;
  }
  catch(error){
    console.error(error);
  }
};