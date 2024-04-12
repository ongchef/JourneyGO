'use client';
import Cookies from 'js-cookie';

export const getToken = () => {
  const output = Cookies.get('__session');
  return output;
}