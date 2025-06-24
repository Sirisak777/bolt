import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { initReactI18next } from 'react-i18next';
import i18n from 'i18next';
import { Language } from '../types';

// Create Context
interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

// Translation Resources
const resources = {
  en: {
    translation: {
      // Predictions
      makePrediction: 'Make Prediction',
      predictSales: 'Predict Sales',
      shouldProduce: 'Should Produce',
      pieces: 'pieces',
      predictionResult: "Tomorrow should produce '{{menu}}' about {{quantity}} pieces",

      // Form
      selectProduct: 'Select Product',
      lastDayQuantity: 'Last Day Quantity',
      enterNumber: 'Enter number',
      dayOfWeek: 'Day of Week',
      chooseOption: 'Choose',

      // Errors
      fillAllFields: 'Please fill in all fields',
      quantityMustBeNumber: 'Last day quantity must be a number',
      apiError: 'Error while calling API',

      // Common
      loading: 'Loading...',
    }
  },
  th: {
    translation: {
      // Predictions
      makePrediction: 'ทำการพยากรณ์',
      predictSales: 'พยากรณ์ยอดขาย',
      shouldProduce: 'ควรผลิต',
      pieces: 'ชิ้น',
      predictionResult: "พรุ่งนี้ควรผลิต '{{menu}}' ประมาณ {{quantity}} ชิ้น",

      // Form
      selectProduct: 'เลือกสินค้า',
      lastDayQuantity: 'จำนวนที่ขายเมื่อวาน',
      enterNumber: 'ใส่ตัวเลข',
      dayOfWeek: 'วันของสัปดาห์',
      chooseOption: 'เลือก',

      // Errors
      fillAllFields: 'กรุณากรอกข้อมูลให้ครบถ้วน',
      quantityMustBeNumber: 'จำนวนเมื่อวานต้องเป็นตัวเลข',
      apiError: 'เกิดข้อผิดพลาดในการเรียก API',

      // Common
      loading: 'กำลังโหลด...',
    }
  }
};

// Initialize i18n
i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem('bakery_language') || 'en',
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
  });

// Provider
interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('bakery_language') as Language;
    return saved || 'en';
  });

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    i18n.changeLanguage(lang);
    localStorage.setItem('bakery_language', lang);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
