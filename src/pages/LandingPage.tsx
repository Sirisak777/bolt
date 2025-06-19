import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { 
  BarChart3, 
  TrendingUp, 
  Target, 
  Shield, 
  Clock, 
  DollarSign,
  ChevronRight,
  Star,
  Users,
  Award,
  ArrowRight,
  CheckCircle,
  Croissant,
  PieChart,
  Brain,
  Zap
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';


const heroBackgrounds = [
  '/images/1.jpg',
  '/images/2.jpg',
  '/images/3.jpg',
  '/images/5.jpg',
  '/images/6.jpg',
];

const LandingPage: React.FC = () => {
  const { t } = useTranslation();
  const { language, setLanguage } = useLanguage();
  const [bgIndex, setBgIndex] = useState(0);

  const features = [
    {
      icon: Brain,
      titleEn: 'AI-Powered Predictions',
      titleTh: 'การพยากรณ์ด้วย AI',
      descEn: 'Advanced machine learning algorithms analyze your sales patterns to predict tomorrow\'s demand with 90%+ accuracy.',
      descTh: 'อัลกอริทึมการเรียนรู้ของเครื่องขั้นสูงวิเคราะห์รูปแบบการขายของคุณเพื่อพยากรณ์ความต้องการของวันพรุ่งนี้ด้วยความแม่นยำ 90%+'
    },
    {
      icon: TrendingUp,
      titleEn: 'Reduce Food Waste',
      titleTh: 'ลดของเสีย',
      descEn: 'Optimize production quantities based on accurate forecasts, reducing waste by up to 30% while maintaining customer satisfaction.',
      descTh: 'เพิ่มประสิทธิภาพปริมาณการผลิตตามการพยากรณ์ที่แม่นยำ ลดของเสียได้ถึง 30% พร้อมรักษาความพึงพอใจของลูกค้า'
    },
    {
      icon: DollarSign,
      titleEn: 'Increase Profits',
      titleTh: 'เพิ่มกำไร',
      descEn: 'Smart inventory management and production planning help maximize revenue while minimizing costs and waste.',
      descTh: 'การจัดการสต็อกและการวางแผนการผลิตอย่างชาญฉลาดช่วยเพิ่มรายได้สูงสุดพร้อมลดต้นทุนและของเสีย'
    },
    {
      icon: Clock,
      titleEn: 'Save Time',
      titleTh: 'ประหยัดเวลา',
      descEn: 'Automated forecasting eliminates guesswork and manual calculations, giving you more time to focus on your craft.',
      descTh: 'การพยากรณ์อัตโนมัติช่วยขจัดการเดาและการคำนวณด้วยตนเอง ให้เวลาคุณมากขึ้นในการมุ่งเน้นฝีมือของคุณ'
    },
    {
      icon: PieChart,
      titleEn: 'Detailed Analytics',
      titleTh: 'การวิเคราะห์โดยละเอียด',
      descEn: 'Comprehensive reports and visualizations help you understand sales patterns and make data-driven decisions.',
      descTh: 'รายงานและการแสดงผลที่ครอบคลุมช่วยให้คุณเข้าใจรูปแบบการขายและตัดสินใจโดยใช้ข้อมูล'
    },
    {
      icon: Shield,
      titleEn: 'Secure & Reliable',
      titleTh: 'ปลอดภัยและเชื่อถือได้',
      descEn: 'Enterprise-grade security ensures your business data is protected with bank-level encryption and regular backups.',
      descTh: 'ความปลอดภัยระดับองค์กรรับประกันว่าข้อมูลธุรกิจของคุณได้รับการปกป้องด้วยการเข้ารหัสระดับธนาคารและการสำรองข้อมูลสม่ำเสมอ'
    }
  ];

  const testimonials = [
    {
      name: 'สมชาย ใจดี',
      nameEn: 'Somchai Jaidee',
      shop: 'Sweet Dreams Bakery',
      rating: 5,
      textTh: 'ระบบนี้ช่วยลดของเสียในร้านได้มากจริงๆ ตอนนี้รู้ว่าต้องทำขนมปังเท่าไหร่แต่ละวัน ไม่ต้องเดาแล้ว',
      textEn: 'This system really helped reduce waste in my shop. Now I know exactly how much bread to make each day without guessing.'
    },
    {
      name: 'มาลี สุขใส',
      nameEn: 'Malee Suksai',
      shop: 'Golden Crust Bakery',
      rating: 5,
      textTh: 'การพยากรณ์แม่นยำมาก ช่วยให้วางแผนการผลิตได้ดีขึ้น กำไรเพิ่มขึ้น 25% ในเดือนแรก',
      textEn: 'Very accurate predictions helped me plan production better. Profits increased by 25% in the first month.'
    },
    {
      name: 'วิชัย รุ่งเรือง',
      nameEn: 'Wichai Rungruang',
      shop: 'Artisan Bread Co.',
      rating: 5,
      textTh: 'ใช้งานง่าย ข้อมูลชัดเจน ทีมงานให้การสนับสนุนดีมาก แนะนำให้เพื่อนเบเกอรี่ใช้หมดแล้ว',
      textEn: 'Easy to use, clear data, excellent support team. I\'ve recommended it to all my bakery friends.'
    }
  ];

  const stats = [
    { number: '500+', labelEn: 'Active Bakeries', labelTh: 'เบเกอรี่ที่ใช้งาน' },
    { number: '92%', labelEn: 'Prediction Accuracy', labelTh: 'ความแม่นยำ' },
    { number: '30%', labelEn: 'Waste Reduction', labelTh: 'ลดของเสีย' },
    { number: '24/7', labelEn: 'Support Available', labelTh: 'บริการสนับสนุน' }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % heroBackgrounds.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-amber-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
           <div className="flex items-center space-x-3">
            <div className="p-2 rounded-xl">
              <img 
                src="/images/nompangmaeo.png" 
                alt="Nom Pung Meaw Logo" 
                className="h-12 w-12 object-contain rounded-lg"
              />
            </div>
            <div>
              <h1 className="font-prompt text-xl font-bold text-gray-900">Nom Pang Maeo</h1>
              <p className="text-xs text-gray-500">Smart Sales Prediction</p>
            </div>
          </div>



            <div className="flex items-center space-x-4">
              {/* Language Toggle */}
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setLanguage('en')}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                    language === 'en'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  🇺🇸 EN
                </button>
                <button
                  onClick={() => setLanguage('th')}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                    language === 'th'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  🇹🇭 TH
                </button>
              </div>

              <Link
                to="/auth"
                className="bg-gradient-to-r from-orange-500 to-amber-500 text-white px-6 py-2 rounded-lg font-medium hover:from-orange-600 hover:to-amber-600 transition-all duration-200 flex items-center space-x-2"
              >
                <span>{language === 'th' ? 'เข้าสู่ระบบ' : 'Sign In'}</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
     <section
  className="relative py-20 transition-all duration-1000"
  style={{
    backgroundImage: `url(${heroBackgrounds[bgIndex]})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }}
>
  {/* ▻ overlay สีดำบาง ๆ คลุมเต็มรูป เพื่อเพิ่ม contrast */}
  <div className="absolute inset-0 bg-black/10"></div>

  <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="mx-auto max-w-3xl rounded-3xl bg-white/10 backdrop-blur-lg p-10 md:p-14 flex flex-col justify-center items-center text-center min-h-[250px]">
      <h1
        className="
          relative
          font-pacifico
          text-5xl md:text-6xl
          font-bold
          mb-6
          leading-relaxed
          bg-gradient-to-r
          from-red-500 via-orange-300 to-red-500
          bg-clip-text text-transparent
        "
          style={{ minHeight: '6rem' }}
      >
        <span className={language === 'th' ? 'font-anuphan' : 'font-pacifico'}>
          {language === 'th' ? 'หนมปังแมว' : 'Nom Pang Maeo'}
        </span>
      </h1>

      <p className="font-anuphan text-xl text-amber-100 mb-8 leading-relaxed">
        {language === 'th'
          ? 'ลดของเสีย เพิ่มกำไร และเพิ่มประสิทธิภาพการผลิตด้วยระบบพยากรณ์ยอดขายอัจฉริยะของเรา'
          : 'Reduce waste, increase profits, and optimize your production with our intelligent sales forecasting system.'}
      </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link
                to="/auth"
                className="font-anuphan bg-gradient-to-r from-orange-500 to-amber-500 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-orange-600 hover:to-amber-600 transition-all duration-200 flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                <span>{language === 'th' ? 'เริ่มใช้งานฟรี' : 'Start Free Trial'}</span>
                <Zap className="h-5 w-5" />
              </Link>
              
              <button className="font-anuphan border-2 border-orange-100 text-amber-100 px-8 py-4 rounded-xl font-semibold text-lg hover:border-orange-300 hover:text-orange-400 transition-all duration-200 flex items-center space-x-2">
                <span>{language === 'th' ? 'ดูการสาธิต' : 'Watch Demo'}</span>
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>

            {/* Stats */}
            <div className="font-anuphan grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-bold text-orange-300 mb-2">{stat.number}</div>
                  <div className="text-amber-100 text-sm">
                    {language === 'th' ? stat.labelTh : stat.labelEn}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {language === 'th' ? 'ฟีเจอร์ที่ทรงพลัง' : 'Powerful Features'}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {language === 'th' 
                ? 'ทุกสิ่งที่คุณต้องการเพื่อเพิ่มประสิทธิภาพธุรกิจเบเกอรี่ของคุณ'
                : 'Everything you need to optimize your bakery business operations'
              }
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-2">
                <div className="bg-gradient-to-br from-orange-500 to-amber-500 p-3 rounded-xl w-fit mb-6">
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {language === 'th' ? feature.titleTh : feature.titleEn}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {language === 'th' ? feature.descTh : feature.descEn}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gradient-to-br from-orange-50 to-amber-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {language === 'th' ? 'วิธีการใช้งาน' : 'How It Works'}
            </h2>
            <p className="text-xl text-gray-600">
              {language === 'th' 
                ? 'เริ่มต้นใช้งานได้ในเพียง 3 ขั้นตอนง่ายๆ'
                : 'Get started in just 3 simple steps'
              }
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                1
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {language === 'th' ? 'อัปโหลดข้อมูล' : 'Upload Your Data'}
              </h3>
              <p className="text-gray-600">
                {language === 'th' 
                  ? 'อัปโหลดข้อมูลการขายย้อนหลังหรือกรอกข้อมูลผ่านฟอร์ม'
                  : 'Upload your historical sales data or input through our simple form'
                }
              </p>
            </div>

            <div className="text-center">
              <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                2
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {language === 'th' ? 'เลือกสินค้า' : 'Select Products'}
              </h3>
              <p className="text-gray-600">
                {language === 'th' 
                  ? 'เลือกสินค้าที่ต้องการพยากรณ์จากรายการสินค้าของคุณ'
                  : 'Choose which products you want to forecast from your product list'
                }
              </p>
            </div>

            <div className="text-center">
              <div className="bg-gradient-to-br from-purple-500 to-pink-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                3
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {language === 'th' ? 'รับผลพยากรณ์' : 'Get Predictions'}
              </h3>
              <p className="text-gray-600">
                {language === 'th' 
                  ? 'รับผลการพยากรณ์พร้อมความมั่นใจและคำแนะนำการผลิต'
                  : 'Receive accurate predictions with confidence levels and production recommendations'
                }
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {language === 'th' ? 'ความคิดเห็นจากลูกค้า' : 'What Our Customers Say'}
            </h2>
            <p className="text-xl text-gray-600">
              {language === 'th' 
                ? 'เบเกอรี่ทั่วประเทศไว้วางใจเราในการเพิ่มประสิทธิภาพธุรกิจ'
                : 'Bakeries across the country trust us to optimize their business'
              }
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl border border-gray-100 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic leading-relaxed">
                  "{language === 'th' ? testimonial.textTh : testimonial.textEn}"
                </p>
                <div className="flex items-center">
                  <div className="bg-gradient-to-br from-orange-500 to-amber-500 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                    {(language === 'th' ? testimonial.name : testimonial.nameEn).charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">
                      {language === 'th' ? testimonial.name : testimonial.nameEn}
                    </p>
                    <p className="text-gray-600 text-sm">{testimonial.shop}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-orange-500 to-amber-500">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            {language === 'th' 
              ? 'พร้อมที่จะเริ่มต้นแล้วหรือยัง?'
              : 'Ready to Get Started?'
            }
          </h2>
          <p className="text-xl text-white/90 mb-8">
            {language === 'th' 
              ? 'เข้าร่วมกับเบเกอรี่หลายร้อยแห่งที่ใช้ BakeryAI เพื่อเพิ่มประสิทธิภาพธุรกิจ'
              : 'Join hundreds of bakeries using BakeryAI to optimize their business operations'
            }
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/auth"
              className="bg-white text-orange-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-50 transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <span>{language === 'th' ? 'เริ่มใช้งานฟรี' : 'Start Free Trial'}</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
            <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-orange-600 transition-all duration-200">
              {language === 'th' ? 'ติดต่อฝ่ายขาย' : 'Contact Sales'}
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-gradient-to-br from-amber-400 to-orange-500 p-2 rounded-xl">
                  <Croissant className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">BakeryAI</h3>
                  <p className="text-gray-400 text-sm">Smart Sales Prediction</p>
                </div>
              </div>
              <p className="text-gray-400 mb-4 max-w-md">
                {language === 'th' 
                  ? 'ระบบพยากรณ์ยอดขายอัจฉริยะสำหรับธุรกิจเบเกอรี่ ช่วยลดของเสียและเพิ่มกำไร'
                  : 'Intelligent sales forecasting system for bakery businesses. Reduce waste and increase profits.'
                }
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">
                {language === 'th' ? 'ผลิตภัณฑ์' : 'Product'}
              </h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">
                  {language === 'th' ? 'ฟีเจอร์' : 'Features'}
                </a></li>
                <li><a href="#" className="hover:text-white transition-colors">
                  {language === 'th' ? 'ราคา' : 'Pricing'}
                </a></li>
                <li><a href="#" className="hover:text-white transition-colors">
                  {language === 'th' ? 'การสาธิต' : 'Demo'}
                </a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">
                {language === 'th' ? 'บริษัท' : 'Company'}
              </h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">
                  {language === 'th' ? 'เกี่ยวกับเรา' : 'About'}
                </a></li>
                <li><a href="#" className="hover:text-white transition-colors">
                  {language === 'th' ? 'ติดต่อ' : 'Contact'}
                </a></li>
                <li><a href="#" className="hover:text-white transition-colors">
                  {language === 'th' ? 'สนับสนุน' : 'Support'}
                </a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 BakeryAI. {language === 'th' ? 'สงวนลิขสิทธิ์' : 'All rights reserved.'}</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;