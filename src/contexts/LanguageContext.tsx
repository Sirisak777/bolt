import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { initReactI18next } from 'react-i18next';
import i18n from 'i18next';
import { Language } from '../types';

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

const resources = {
  en: {
    translation: {
      // Navigation
      dashboard: 'Dashboard',
      predictions: 'Predictions',
      history: 'History',
      settings: 'Settings',
      logout: 'Logout',
      
      // Auth
      login: 'Login',
      register: 'Register',
      email: 'Email',
      password: 'Password',
      name: 'Full Name',
      shopName: 'Shop Name',
      signIn: 'Sign In',
      signUp: 'Sign Up',
      createAccount: 'Create Account',
      alreadyHaveAccount: 'Already have an account?',
      dontHaveAccount: "Don't have an account?",
      
      // Dashboard
      welcome: 'Welcome to',
      totalSales: 'Total Sales',
      predictions: 'Active Predictions',
      accuracy: 'Prediction Accuracy',
      growth: 'Growth Rate',
      
      // Products
      selectProduct: 'Select Product',
      croissant: 'Croissant',
      milkBread: 'Milk Bread',
      baguette: 'Baguette',
      whiteBread: 'White Bread',
      wholeBread: 'Whole Wheat Bread',
      sweetBread: 'Sweet Bread',
      danish: 'Danish Pastry',
      muffin: 'Muffin',
      
      // Predictions
      makePrediction: 'Make Prediction',
      predictSales: 'Predict Sales',
      tomorrowPrediction: "Tomorrow's Prediction",
      confidence: 'Confidence',
      shouldProduce: 'Should Produce',
      pieces: 'pieces',
      
      // History
      predictionHistory: 'Prediction History',
      date: 'Date',
      product: 'Product',
      predicted: 'Predicted',
      actual: 'Actual',
      downloadCSV: 'Download CSV',
      
      // Common
      loading: 'Loading...',
      error: 'Error',
      success: 'Success',
      cancel: 'Cancel',
      save: 'Save',
      edit: 'Edit',
      delete: 'Delete',
      confirm: 'Confirm',
    }
  },
  th: {
    translation: {
      // Navigation
      dashboard: 'แดชบอร์ด',
      predictions: 'การพยากรณ์',
      history: 'ประวัติ',
      settings: 'ตั้งค่า',
      logout: 'ออกจากระบบ',
      
      // Auth
      login: 'เข้าสู่ระบบ',
      register: 'สมัครสมาชิก',
      email: 'อีเมล',
      password: 'รหัสผ่าน',
      name: 'ชื่อ-นามสกุล',
      shopName: 'ชื่อร้าน',
      signIn: 'เข้าสู่ระบบ',
      signUp: 'สมัครสมาชิก',
      createAccount: 'สร้างบัญชี',
      alreadyHaveAccount: 'มีบัญชีอยู่แล้ว?',
      dontHaveAccount: 'ยังไม่มีบัญชี?',
      
      // Dashboard
      welcome: 'ยินดีต้อนรับสู่',
      totalSales: 'ยอดขายรวม',
      predictions: 'การพยากรณ์ที่ใช้งาน',
      accuracy: 'ความแม่นยำ',
      growth: 'อัตราการเติบโต',
      
      // Products
      selectProduct: 'เลือกสินค้า',
      croissant: 'ครัวซองต์',
      milkBread: 'ขนมปังนม',
      baguette: 'บาแกตต์',
      whiteBread: 'ขนมปังขาว',
      wholeBread: 'ขนมปังโฮลวีท',
      sweetBread: 'ขนมปังหวาน',
      danish: 'เดนิช',
      muffin: 'มัฟฟิน',
      
      // Predictions
      makePrediction: 'ทำการพยากรณ์',
      predictSales: 'พยากรณ์ยอดขาย',
      tomorrowPrediction: 'การพยากรณ์วันพรุ่งนี้',
      confidence: 'ความมั่นใจ',
      shouldProduce: 'ควรผลิต',
      pieces: 'ชิ้น',
      
      // History
      predictionHistory: 'ประวัติการพยากรณ์',
      date: 'วันที่',
      product: 'สินค้า',
      predicted: 'ที่พยากรณ์',
      actual: 'ที่เกิดขึ้นจริง',
      downloadCSV: 'ดาวน์โหลด CSV',
      
      // Common
      loading: 'กำลังโหลด...',
      error: 'เกิดข้อผิดพลาด',
      success: 'สำเร็จ',
      cancel: 'ยกเลิก',
      save: 'บันทึก',
      edit: 'แก้ไข',
      delete: 'ลบ',
      confirm: 'ยืนยัน',
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('bakery_language') as Language;
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'th')) {
      setLanguageState(savedLanguage);
      i18n.changeLanguage(savedLanguage);
    }
  }, []);

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