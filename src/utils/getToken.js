'use client';
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";

export const getToken = () => {
  const session = Cookies.get('__session');
  return session;
}

export const getUserId = () => {
  const session = Cookies.get('__session');
  if (session) {
    const decoded_session = jwtDecode(session);
    const userId = decoded_session.sub;
    return userId;
  }else{
    console.error("No session found" );
    return null;
  }
  
}

console.log("Get: "+getToken());