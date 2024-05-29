'use client';

import { SignIn } from "@clerk/nextjs";
import { useContext } from 'react';
import { DataContext } from '@/app/components/dataContext';
import Image from "next/image";


export default function Page() {
  const { currentLang } = useContext(DataContext);

  const translate = (key) => {
    const translations = {
        welcome: {
            zh: "歡迎來到 JourneyGo",
            en: "Welcome to JourneyGo",
        },
        description: {
            zh: "這是提供旅程規劃與分帳的最佳選擇",
            en: "This is the best platform for planning and splitting bills for your trips!",
        },
    };
    return translations[key][currentLang];
  }

  return (
    <div className="flex lg:flex-row flex-col lg:gap-10 gap-3 mt-10 justify-center items-center">
      <div className="p-5 flex flex-col gap-3 max-w-[400px] justify-center items-center">
        <h1 className="text-3xl font-bold">{translate('welcome')}</h1>
        <p className="text-lg text-wrap">{translate('description')}</p>
        <Image src="/images/groupDefaultImg.png" alt="logo" width={400} height={400} className="lg:w-[400px] w-[200px]" />
      </div>
      <SignIn />
    </div>
  );
}