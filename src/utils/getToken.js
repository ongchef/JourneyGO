'use client';
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";

export const getToken = () => {
  const session = Cookies.get('__session');
  return session;
}

export const getUserId = () => {
  const session = Cookies.get('__session');
  const decoded_session = jwtDecode(session);
  const userId = decoded_session.sub;
  return userId;
}