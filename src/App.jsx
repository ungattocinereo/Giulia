import React, { useState, useEffect } from 'react';
import {
  Menu,
  X,
  Send,
  MessageCircle,
  Mail,
  Phone,
  Instagram,
  ChevronDown,
  UserCircle,
  Briefcase,
  Users,
  Compass,
  Route,
  HeartHandshake,
  Check,
  CreditCard,
  ArrowRight,
  ChevronUp,
} from 'lucide-react';

// ============================================
// MAIN APP COMPONENT
// ============================================
export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeModal, setActiveModal] = useState(null);
  const [openFaq, setOpenFaq] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    method: 'telegram',
    message: '',
    consent: false,
  });
  const [formStatus, setFormStatus] = useState(null);

  // Scroll effect for header
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll to section
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setIsMenuOpen(false);
    }
  };

  // Form handlers
  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.consent) {
      alert('Пожалуйста, дайте согласие на обработку персональных данных');
      return;
    }

    // TODO: Replace with actual Telegram Bot API integration
    console.log('Form submitted:', formData);

    // For now, create mailto link as fallback
    const subject = 'Заявка с сайта';
    const body = `
      Имя: ${formData.name}
      Контакт: ${formData.contact}
      Способ связи: ${formData.method}
      Сообщение: ${formData.message}
    `;

    setFormStatus('success');
    setTimeout(() => {
      setFormStatus(null);
      setFormData({
        name: '',
        contact: '',
        method: 'telegram',
        message: '',
        consent: false,
      });
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* ============================================ */}
      {/* HEADER */}
      {/* ============================================ */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-white/90 backdrop-blur-md shadow-md' : 'bg-white'
        }`}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="text-2xl font-bold text-primary">
              Юлия Попова
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <button
                onClick={() => scrollToSection('about')}
                className="text-gray-700 hover:text-primary transition-colors"
              >
                О себе
              </button>
              <button
                onClick={() => scrollToSection('services')}
                className="text-gray-700 hover:text-primary transition-colors"
              >
                Услуги
              </button>
              <button
                onClick={() => scrollToSection('pricing')}
                className="text-gray-700 hover:text-primary transition-colors"
              >
                Стоимость
              </button>
              <button
                onClick={() => scrollToSection('contacts')}
                className="text-gray-700 hover:text-primary transition-colors"
              >
                Контакты
              </button>
              <button
                onClick={() => scrollToSection('contacts')}
                className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark transition-colors"
              >
                Записаться
              </button>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-gray-700"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <nav className="md:hidden mt-4 pb-4 flex flex-col space-y-4">
              <button
                onClick={() => scrollToSection('about')}
                className="text-gray-700 hover:text-primary transition-colors text-left"
              >
                О себе
              </button>
              <button
                onClick={() => scrollToSection('services')}
                className="text-gray-700 hover:text-primary transition-colors text-left"
              >
                Услуги
              </button>
              <button
                onClick={() => scrollToSection('pricing')}
                className="text-gray-700 hover:text-primary transition-colors text-left"
              >
                Стоимость
              </button>
              <button
                onClick={() => scrollToSection('contacts')}
                className="text-gray-700 hover:text-primary transition-colors text-left"
              >
                Контакты
              </button>
              <button
                onClick={() => scrollToSection('contacts')}
                className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark transition-colors"
              >
                Записаться
              </button>
            </nav>
          )}
        </div>
      </header>

      {/* ============================================ */}
      {/* HERO SECTION */}
      {/* ============================================ */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-primary to-secondary text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-4 text-balance">
              Юлия Попова
            </h1>
            <p className="text-xl md:text-2xl mb-6 opacity-90">
              Психолог | Тьютор | Профориентолог
            </p>
            <p className="text-lg md:text-xl mb-10 leading-relaxed max-w-3xl mx-auto opacity-90">
              Помогаю детям, подросткам и взрослым найти свой путь: в учёбе, карьере,
              отношениях с собой и близкими. Многофункциональный специалист, который
              закроет ваши потребности комплексно.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <button
                onClick={() => scrollToSection('contacts')}
                className="bg-white text-primary px-8 py-4 rounded-lg font-semibold hover:bg-gray-50 transition-all transform hover:scale-105 shadow-lg"
              >
                Записаться на встречу
              </button>
              <button
                onClick={() => scrollToSection('about')}
                className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/10 transition-all"
              >
                Узнать больше
              </button>
            </div>

            {/* Social Links */}
            <div className="flex justify-center gap-6">
              <a
                href="https://t.me/username"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all transform hover:scale-110"
                aria-label="Telegram"
              >
                <Send size={20} />
              </a>
              <a
                href="https://wa.me/79XXXXXXXXX"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all transform hover:scale-110"
                aria-label="WhatsApp"
              >
                <MessageCircle size={20} />
              </a>
              <a
                href="https://vk.com/username"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all transform hover:scale-110"
                aria-label="VK"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M15.07 2H8.93C3.33 2 2 3.33 2 8.93v6.14C2 20.67 3.33 22 8.93 22h6.14c5.6 0 6.93-1.33 6.93-6.93V8.93C22 3.33 20.67 2 15.07 2zm3.15 14.79c-.29.34-.85.54-1.69.54h-1.1c-.71 0-1.07-.24-1.58-.79-.48-.52-.92-.95-1.38-.95-.09 0-.18.02-.27.05-.44.14-.69.64-.69 1.4 0 .45-.36.69-1.01.69-.8 0-1.67-.14-2.45-.74-1.17-.9-2.18-2.63-3.17-4.67-.03-.07-.05-.14-.05-.21 0-.24.19-.43.55-.43h1.1c.46 0 .63.2.8.67.81 2.12 2.16 3.81 2.72 3.81.1 0 .19-.03.27-.09.36-.26.28-1.01.24-1.58-.04-.91-.09-1.95.51-2.38.19-.14.48-.2 1.01-.2h1.55c.46 0 .6.25.6.64v2.96c0 .46.2.6.33.6.24 0 .47-.14.93-.6.96-1.01 1.64-2.58 1.64-2.58.09-.17.26-.33.55-.33h1.1c.71 0 .86.36.71.85-.21.72-.96 1.88-1.79 2.94-.19.24-.25.36 0 .64.19.22.81.79 1.22 1.28.71.81 1.25 1.49 1.39 1.97.14.47-.1.72-.73.72z"/>
                </svg>
              </a>
              <a
                href="https://instagram.com/username"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all transform hover:scale-110"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* ABOUT SECTION */}
      {/* ============================================ */}
      <section id="about" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            {/* Text Content */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Привет! Я — Юлия Попова
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed text-lg">
                <p>
                  Я — психолог и тьютор с многолетним опытом работы с детьми, подростками
                  и взрослыми. Моя особенность — комплексный подход: я могу помочь не
                  только разобраться с психологическими трудностями, но и выстроить
                  образовательный маршрут, найти профессиональное призвание.
                </p>
                <p>
                  Если у вас запутанная ситуация, где переплелись учёба, самоопределение
                  и семейные отношения — вы попали по адресу. Я умею распутывать сложные
                  клубки и находить решения.
                </p>
              </div>
              <button
                onClick={() => setActiveModal('about-details')}
                className="mt-8 bg-primary text-white px-8 py-3 rounded-lg hover:bg-primary-dark transition-colors inline-flex items-center gap-2"
              >
                Подробнее обо мне
                <ArrowRight size={20} />
              </button>
            </div>

            {/* Photo Placeholder */}
            <div className="order-first md:order-last">
              <div className="relative">
                <div className="aspect-[4/5] bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl flex items-center justify-center overflow-hidden shadow-2xl">
                  <div className="text-center p-8">
                    <UserCircle size={120} className="mx-auto text-primary/40 mb-4" />
                    <p className="text-gray-500 font-medium">
                      Фото Юлии Поповой
                      <br />
                      <span className="text-sm">(400x500px)</span>
                    </p>
                  </div>
                </div>
                {/* Decorative element */}
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-secondary/20 rounded-full -z-10"></div>
                <div className="absolute -top-6 -left-6 w-24 h-24 bg-primary/20 rounded-full -z-10"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* TARGET AUDIENCE SECTION */}
      {/* ============================================ */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-4">
            Кому я могу помочь?
          </h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto text-lg">
            Работаю с разными возрастами и запросами, используя индивидуальный подход
          </p>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Card 1: Children & Teens */}
            <div className="bg-white border-2 border-gray-100 rounded-xl p-8 hover:shadow-xl transition-all hover:border-primary/30 group">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <UserCircle size={32} className="text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Дети и подростки
              </h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                Помощь в учёбе, профориентация, психологическая поддержка в переходном
                возрасте
              </p>
              <button
                onClick={() => setActiveModal('audience-kids')}
                className="text-primary font-semibold hover:text-primary-dark inline-flex items-center gap-2 group-hover:gap-3 transition-all"
              >
                Подробнее
                <ArrowRight size={18} />
              </button>
            </div>

            {/* Card 2: Adults */}
            <div className="bg-white border-2 border-gray-100 rounded-xl p-8 hover:shadow-xl transition-all hover:border-secondary/30 group">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-secondary/20 transition-colors">
                <Briefcase size={32} className="text-secondary" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Взрослые</h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                Смена профессии, карьерные кризисы, личностный рост, работа с запросами
              </p>
              <button
                onClick={() => setActiveModal('audience-adults')}
                className="text-secondary font-semibold hover:text-secondary-dark inline-flex items-center gap-2 group-hover:gap-3 transition-all"
              >
                Подробнее
                <ArrowRight size={18} />
              </button>
            </div>

            {/* Card 3: Parents */}
            <div className="bg-white border-2 border-gray-100 rounded-xl p-8 hover:shadow-xl transition-all hover:border-primary/30 group">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <Users size={32} className="text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Родители</h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                Детско-родительские отношения, семейная терапия, поддержка в воспитании
              </p>
              <button
                onClick={() => setActiveModal('audience-parents')}
                className="text-primary font-semibold hover:text-primary-dark inline-flex items-center gap-2 group-hover:gap-3 transition-all"
              >
                Подробнее
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* SERVICES SECTION */}
      {/* ============================================ */}
      <section id="services" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-4">
            Как я могу помочь вам?
          </h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto text-lg">
            Выберите подходящий формат работы — от базовой консультации до комплексного
            сопровождения
          </p>

          <div className="max-w-5xl mx-auto space-y-6">
            {/* Service Package 1 */}
            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Compass size={28} className="text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Профориентация «Точка А»
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    Комплексное тестирование, анализ результатов, рекомендации по выбору
                    направления. Для тех, кто хочет получить ответ и действовать
                    самостоятельно.
                  </p>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="font-semibold text-gray-900 mb-2">Что включает:</p>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2 text-gray-700">
                        <Check size={20} className="text-green-500 flex-shrink-0 mt-0.5" />
                        <span>Диагностика интересов и способностей</span>
                      </li>
                      <li className="flex items-start gap-2 text-gray-700">
                        <Check size={20} className="text-green-500 flex-shrink-0 mt-0.5" />
                        <span>Анализ личностных особенностей</span>
                      </li>
                      <li className="flex items-start gap-2 text-gray-700">
                        <Check size={20} className="text-green-500 flex-shrink-0 mt-0.5" />
                        <span>Рекомендации по профессиям</span>
                      </li>
                      <li className="flex items-start gap-2 text-gray-700">
                        <Check size={20} className="text-green-500 flex-shrink-0 mt-0.5" />
                        <span>Отчёт с результатами</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Service Package 2 */}
            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow border-2 border-primary/20">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-14 h-14 bg-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Route size={28} className="text-secondary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-2xl font-bold text-gray-900">
                      Профориентация «От А до Я»
                    </h3>
                    <span className="bg-primary text-white text-xs px-3 py-1 rounded-full font-semibold">
                      ПОПУЛЯРНО
                    </span>
                  </div>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    Тестирование + индивидуальное сопровождение до момента, когда вы сами
                    всё поймёте и сделаете. Для тех, кому нужна поддержка на пути.
                  </p>
                  <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-lg p-4">
                    <p className="font-semibold text-gray-900 mb-2">Что включает:</p>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2 text-gray-700">
                        <Check size={20} className="text-green-500 flex-shrink-0 mt-0.5" />
                        <span>Всё из базового пакета</span>
                      </li>
                      <li className="flex items-start gap-2 text-gray-700">
                        <Check size={20} className="text-green-500 flex-shrink-0 mt-0.5" />
                        <span>4-6 сессий сопровождения</span>
                      </li>
                      <li className="flex items-start gap-2 text-gray-700">
                        <Check size={20} className="text-green-500 flex-shrink-0 mt-0.5" />
                        <span>Разбор конкретных шагов</span>
                      </li>
                      <li className="flex items-start gap-2 text-gray-700">
                        <Check size={20} className="text-green-500 flex-shrink-0 mt-0.5" />
                        <span>Поддержка в принятии решений</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Service Package 3 */}
            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-14 h-14 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <HeartHandshake size={28} className="text-green-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Всё включено</h3>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    Когда проблема не только в выборе профессии, но и в семейных
                    отношениях. Объединяем профориентацию с семейной терапией для
                    целостного решения.
                  </p>
                  <div className="bg-green-50 rounded-lg p-4">
                    <p className="font-semibold text-gray-900 mb-2">Что включает:</p>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2 text-gray-700">
                        <Check size={20} className="text-green-500 flex-shrink-0 mt-0.5" />
                        <span>Всё из пакета «От А до Я»</span>
                      </li>
                      <li className="flex items-start gap-2 text-gray-700">
                        <Check size={20} className="text-green-500 flex-shrink-0 mt-0.5" />
                        <span>Семейные сессии</span>
                      </li>
                      <li className="flex items-start gap-2 text-gray-700">
                        <Check size={20} className="text-green-500 flex-shrink-0 mt-0.5" />
                        <span>Работа с детско-родительскими отношениями</span>
                      </li>
                      <li className="flex items-start gap-2 text-gray-700">
                        <Check size={20} className="text-green-500 flex-shrink-0 mt-0.5" />
                        <span>Глубинная проработка запросов</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Services */}
            <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-xl p-6">
              <h4 className="font-bold text-gray-900 mb-3 text-lg">
                Дополнительные услуги:
              </h4>
              <div className="grid md:grid-cols-2 gap-3">
                <div className="flex items-center gap-2 text-gray-700">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>Тьюторское сопровождение в учёбе</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>Психологическое консультирование</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>Разовые консультации</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>Онлайн и офлайн встречи</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* PRICING SECTION */}
      {/* ============================================ */}
      <section id="pricing" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-4">
            Стоимость услуг
          </h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto text-lg">
            Прозрачные цены без скрытых платежей. Первая встреча — бесплатно!
          </p>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
            {/* Free Intro */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-8 border-2 border-green-200">
              <div className="text-center mb-6">
                <div className="inline-block bg-green-500 text-white px-4 py-1 rounded-full text-sm font-semibold mb-4">
                  БЕСПЛАТНО
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Встреча-знакомство
                </h3>
                <p className="text-gray-600">30-40 минут</p>
              </div>
              <p className="text-gray-700 leading-relaxed mb-6 text-center">
                Знакомимся, обсуждаем вашу ситуацию, определяем формат работы
              </p>
              <button
                onClick={() => scrollToSection('contacts')}
                className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold"
              >
                Записаться
              </button>
            </div>

            {/* Individual Session */}
            <div className="bg-white rounded-xl p-8 border-2 border-primary shadow-lg transform md:scale-105">
              <div className="text-center mb-6">
                <div className="text-4xl font-bold text-primary mb-2">3 500 ₽</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Индивидуальная сессия
                </h3>
                <p className="text-gray-600">60-90 минут</p>
              </div>
              <p className="text-gray-700 leading-relaxed mb-6 text-center">
                Работа один на один: психологическая консультация или тьюторская сессия
              </p>
              <button
                onClick={() => scrollToSection('contacts')}
                className="w-full bg-primary text-white py-3 rounded-lg hover:bg-primary-dark transition-colors font-semibold"
              >
                Записаться
              </button>
            </div>

            {/* Family Session */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-8 border-2 border-purple-200">
              <div className="text-center mb-6">
                <div className="text-4xl font-bold text-secondary mb-2">4 500 ₽</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Парная/семейная сессия
                </h3>
                <p className="text-gray-600">90 минут</p>
              </div>
              <p className="text-gray-700 leading-relaxed mb-6 text-center">
                Работа с парой или семьёй: родитель + ребёнок, два родителя
              </p>
              <button
                onClick={() => scrollToSection('contacts')}
                className="w-full bg-secondary text-white py-3 rounded-lg hover:bg-secondary-dark transition-colors font-semibold"
              >
                Записаться
              </button>
            </div>
          </div>

          {/* Payment Info */}
          <div className="max-w-3xl mx-auto bg-gray-50 rounded-xl p-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <CreditCard size={32} className="text-primary" />
                <div>
                  <p className="font-semibold text-gray-900 mb-1">
                    Оплата картой или через СБП
                  </p>
                  <div className="flex gap-2">
                    <span className="text-sm text-gray-600">Visa</span>
                    <span className="text-sm text-gray-600">•</span>
                    <span className="text-sm text-gray-600">Mastercard</span>
                    <span className="text-sm text-gray-600">•</span>
                    <span className="text-sm text-gray-600">Мир</span>
                    <span className="text-sm text-gray-600">•</span>
                    <span className="text-sm text-gray-600">СБП</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setActiveModal('payment-policy')}
                className="text-primary font-semibold hover:text-primary-dark underline"
              >
                Правила отмены и переносов
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* FAQ SECTION */}
      {/* ============================================ */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-4">
            Часто задаваемые вопросы
          </h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto text-lg">
            Ответы на самые популярные вопросы о работе со мной
          </p>

          <div className="max-w-3xl mx-auto space-y-4">
            {/* FAQ Item 1 */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <button
                onClick={() => setOpenFaq(openFaq === 1 ? null : 1)}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
              >
                <span className="font-semibold text-gray-900 pr-4">
                  Как проходит встреча-знакомство?
                </span>
                {openFaq === 1 ? (
                  <ChevronUp className="text-primary flex-shrink-0" size={24} />
                ) : (
                  <ChevronDown className="text-gray-400 flex-shrink-0" size={24} />
                )}
              </button>
              {openFaq === 1 && (
                <div className="px-6 pb-5 text-gray-700 leading-relaxed">
                  <p>
                    Встреча-знакомство длится 30-40 минут и проходит онлайн или офлайн.
                    На ней мы знакомимся, вы рассказываете о своей ситуации и запросе, а
                    я объясняю, как могу помочь. Это возможность понять, подходим ли мы
                    друг другу, и выбрать формат дальнейшей работы. Никаких обязательств
                    — встреча полностью бесплатна.
                  </p>
                </div>
              )}
            </div>

            {/* FAQ Item 2 */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <button
                onClick={() => setOpenFaq(openFaq === 2 ? null : 2)}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
              >
                <span className="font-semibold text-gray-900 pr-4">
                  В чём отличие психолога от тьютора?
                </span>
                {openFaq === 2 ? (
                  <ChevronUp className="text-primary flex-shrink-0" size={24} />
                ) : (
                  <ChevronDown className="text-gray-400 flex-shrink-0" size={24} />
                )}
              </button>
              {openFaq === 2 && (
                <div className="px-6 pb-5 text-gray-700 leading-relaxed">
                  <p className="mb-3">
                    <strong>Психолог</strong> работает с эмоциями, отношениями,
                    внутренними конфликтами и помогает разобраться в себе. Например:
                    тревога, низкая самооценка, сложности в отношениях.
                  </p>
                  <p>
                    <strong>Тьютор</strong> помогает выстроить образовательный маршрут,
                    организовать учёбу, найти мотивацию и раскрыть потенциал. Например:
                    профориентация, помощь с выбором вуза, планирование учёбы.
                  </p>
                  <p className="mt-3 text-primary font-medium">
                    Я совмещаю обе роли — работаю и с психологическими запросами, и с
                    образовательными задачами.
                  </p>
                </div>
              )}
            </div>

            {/* FAQ Item 3 */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <button
                onClick={() => setOpenFaq(openFaq === 3 ? null : 3)}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
              >
                <span className="font-semibold text-gray-900 pr-4">
                  Как понять, какой пакет мне подходит?
                </span>
                {openFaq === 3 ? (
                  <ChevronUp className="text-primary flex-shrink-0" size={24} />
                ) : (
                  <ChevronDown className="text-gray-400 flex-shrink-0" size={24} />
                )}
              </button>
              {openFaq === 3 && (
                <div className="px-6 pb-5 text-gray-700 leading-relaxed">
                  <p className="mb-3">
                    <strong>«Точка А»</strong> — если вы хотите пройти диагностику и
                    получить рекомендации, но готовы действовать самостоятельно.
                  </p>
                  <p className="mb-3">
                    <strong>«От А до Я»</strong> — если нужна не только диагностика, но
                    и сопровождение на всём пути до результата.
                  </p>
                  <p>
                    <strong>«Всё включено»</strong> — если проблема комплексная: нужно
                    решить не только вопрос профориентации, но и улучшить семейные
                    отношения.
                  </p>
                  <p className="mt-3 text-primary font-medium">
                    На встрече-знакомстве я помогу выбрать подходящий формат!
                  </p>
                </div>
              )}
            </div>

            {/* FAQ Item 4 */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <button
                onClick={() => setOpenFaq(openFaq === 4 ? null : 4)}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
              >
                <span className="font-semibold text-gray-900 pr-4">
                  Работаете ли вы онлайн?
                </span>
                {openFaq === 4 ? (
                  <ChevronUp className="text-primary flex-shrink-0" size={24} />
                ) : (
                  <ChevronDown className="text-gray-400 flex-shrink-0" size={24} />
                )}
              </button>
              {openFaq === 4 && (
                <div className="px-6 pb-5 text-gray-700 leading-relaxed">
                  <p>
                    Да, я провожу консультации как онлайн (Zoom, Telegram видеозвонки),
                    так и офлайн (личные встречи). Формат выбираете вы — эффективность
                    работы не зависит от того, встречаемся мы лично или онлайн.
                  </p>
                </div>
              )}
            </div>

            {/* FAQ Item 5 */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <button
                onClick={() => setOpenFaq(openFaq === 5 ? null : 5)}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
              >
                <span className="font-semibold text-gray-900 pr-4">
                  Как долго длится работа?
                </span>
                {openFaq === 5 ? (
                  <ChevronUp className="text-primary flex-shrink-0" size={24} />
                ) : (
                  <ChevronDown className="text-gray-400 flex-shrink-0" size={24} />
                )}
              </button>
              {openFaq === 5 && (
                <div className="px-6 pb-5 text-gray-700 leading-relaxed">
                  <p>
                    Всё индивидуально и зависит от вашего запроса. Это может быть одна
                    консультация, пакет из 4-6 встреч или длительное сопровождение на
                    несколько месяцев. Я не ставлю жёстких рамок — работаем столько,
                    сколько нужно для достижения вашего результата.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* CONTACTS SECTION */}
      {/* ============================================ */}
      <section id="contacts" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-4">
            Свяжитесь со мной
          </h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto text-lg">
            Выберите удобный способ связи или оставьте заявку
          </p>

          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Left Column: Contact Info */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Быстрые контакты</h3>

              <div className="space-y-4 mb-8">
                {/* Telegram */}
                <a
                  href="https://t.me/username"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl hover:shadow-lg transition-all group"
                >
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Send size={24} className="text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Telegram</p>
                    <p className="text-sm text-gray-600">@username (замените на реальный)</p>
                  </div>
                </a>

                {/* WhatsApp */}
                <a
                  href="https://wa.me/79XXXXXXXXX?text=Здравствуйте,%20хочу%20записаться"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-xl hover:shadow-lg transition-all group"
                >
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <MessageCircle size={24} className="text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">WhatsApp</p>
                    <p className="text-sm text-gray-600">+7 XXX XXX XX XX</p>
                  </div>
                </a>

                {/* Email */}
                <a
                  href="mailto:julia@example.com"
                  className="flex items-center gap-4 p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl hover:shadow-lg transition-all group"
                >
                  <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Mail size={24} className="text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Email</p>
                    <p className="text-sm text-gray-600">julia@example.com</p>
                  </div>
                </a>

                {/* Phone */}
                <a
                  href="tel:+79XXXXXXXXX"
                  className="flex items-center gap-4 p-4 bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl hover:shadow-lg transition-all group"
                >
                  <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Phone size={24} className="text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Телефон</p>
                    <p className="text-sm text-gray-600">+7 XXX XXX XX XX</p>
                  </div>
                </a>
              </div>

              {/* Social Networks */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-4">Социальные сети</h4>
                <div className="flex gap-4">
                  <a
                    href="https://vk.com/username"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
                    aria-label="VK"
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                      <path d="M15.07 2H8.93C3.33 2 2 3.33 2 8.93v6.14C2 20.67 3.33 22 8.93 22h6.14c5.6 0 6.93-1.33 6.93-6.93V8.93C22 3.33 20.67 2 15.07 2zm3.15 14.79c-.29.34-.85.54-1.69.54h-1.1c-.71 0-1.07-.24-1.58-.79-.48-.52-.92-.95-1.38-.95-.09 0-.18.02-.27.05-.44.14-.69.64-.69 1.4 0 .45-.36.69-1.01.69-.8 0-1.67-.14-2.45-.74-1.17-.9-2.18-2.63-3.17-4.67-.03-.07-.05-.14-.05-.21 0-.24.19-.43.55-.43h1.1c.46 0 .63.2.8.67.81 2.12 2.16 3.81 2.72 3.81.1 0 .19-.03.27-.09.36-.26.28-1.01.24-1.58-.04-.91-.09-1.95.51-2.38.19-.14.48-.2 1.01-.2h1.55c.46 0 .6.25.6.64v2.96c0 .46.2.6.33.6.24 0 .47-.14.93-.6.96-1.01 1.64-2.58 1.64-2.58.09-.17.26-.33.55-.33h1.1c.71 0 .86.36.71.85-.21.72-.96 1.88-1.79 2.94-.19.24-.25.36 0 .64.19.22.81.79 1.22 1.28.71.81 1.25 1.49 1.39 1.97.14.47-.1.72-.73.72z"/>
                    </svg>
                  </a>
                  <a
                    href="https://instagram.com/username"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center hover:from-purple-600 hover:to-pink-600 transition-colors"
                    aria-label="Instagram"
                  >
                    <Instagram size={24} className="text-white" />
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column: Contact Form */}
            <div>
              <div className="bg-gray-50 rounded-xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Оставьте заявку</h3>
                <p className="text-gray-600 mb-6">Я свяжусь с вами в течение 24 часов</p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Name */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Имя <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleFormChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none transition-colors"
                      placeholder="Ваше имя"
                    />
                  </div>

                  {/* Contact */}
                  <div>
                    <label htmlFor="contact" className="block text-sm font-medium text-gray-700 mb-1">
                      Контакт <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="contact"
                      name="contact"
                      required
                      value={formData.contact}
                      onChange={handleFormChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none transition-colors"
                      placeholder="Телефон или email"
                    />
                  </div>

                  {/* Method */}
                  <div>
                    <label htmlFor="method" className="block text-sm font-medium text-gray-700 mb-1">
                      Удобный способ связи
                    </label>
                    <select
                      id="method"
                      name="method"
                      value={formData.method}
                      onChange={handleFormChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none transition-colors bg-white"
                    >
                      <option value="telegram">Telegram</option>
                      <option value="whatsapp">WhatsApp</option>
                      <option value="email">Email</option>
                      <option value="phone">Телефон</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Сообщение (необязательно)
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows="4"
                      value={formData.message}
                      onChange={handleFormChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none transition-colors resize-none"
                      placeholder="Расскажите вкратце о вашей ситуации"
                    ></textarea>
                  </div>

                  {/* Consent */}
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="consent"
                      name="consent"
                      checked={formData.consent}
                      onChange={handleFormChange}
                      className="mt-1 w-5 h-5 text-primary border-gray-300 rounded focus:ring-primary"
                    />
                    <label htmlFor="consent" className="text-sm text-gray-700">
                      Согласен на обработку персональных данных
                    </label>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full bg-primary text-white py-3 rounded-lg hover:bg-primary-dark transition-colors font-semibold flex items-center justify-center gap-2"
                  >
                    Отправить заявку
                    <ArrowRight size={20} />
                  </button>

                  {/* Status Messages */}
                  {formStatus === 'success' && (
                    <div className="bg-green-50 border-2 border-green-200 text-green-800 px-4 py-3 rounded-lg">
                      <p className="font-semibold">Заявка отправлена!</p>
                      <p className="text-sm">Я свяжусь с вами в ближайшее время.</p>
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* FOOTER */}
      {/* ============================================ */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            {/* Name */}
            <h3 className="text-2xl font-bold mb-2">Юлия Попова</h3>
            <p className="text-gray-400 mb-6">
              Психолог | Тьютор | Профориентолог
            </p>

            {/* Social Links */}
            <div className="flex justify-center gap-6 mb-8">
              <a
                href="https://t.me/username"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all"
                aria-label="Telegram"
              >
                <Send size={18} />
              </a>
              <a
                href="https://wa.me/79XXXXXXXXX"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all"
                aria-label="WhatsApp"
              >
                <MessageCircle size={18} />
              </a>
              <a
                href="https://vk.com/username"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all"
                aria-label="VK"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M15.07 2H8.93C3.33 2 2 3.33 2 8.93v6.14C2 20.67 3.33 22 8.93 22h6.14c5.6 0 6.93-1.33 6.93-6.93V8.93C22 3.33 20.67 2 15.07 2zm3.15 14.79c-.29.34-.85.54-1.69.54h-1.1c-.71 0-1.07-.24-1.58-.79-.48-.52-.92-.95-1.38-.95-.09 0-.18.02-.27.05-.44.14-.69.64-.69 1.4 0 .45-.36.69-1.01.69-.8 0-1.67-.14-2.45-.74-1.17-.9-2.18-2.63-3.17-4.67-.03-.07-.05-.14-.05-.21 0-.24.19-.43.55-.43h1.1c.46 0 .63.2.8.67.81 2.12 2.16 3.81 2.72 3.81.1 0 .19-.03.27-.09.36-.26.28-1.01.24-1.58-.04-.91-.09-1.95.51-2.38.19-.14.48-.2 1.01-.2h1.55c.46 0 .6.25.6.64v2.96c0 .46.2.6.33.6.24 0 .47-.14.93-.6.96-1.01 1.64-2.58 1.64-2.58.09-.17.26-.33.55-.33h1.1c.71 0 .86.36.71.85-.21.72-.96 1.88-1.79 2.94-.19.24-.25.36 0 .64.19.22.81.79 1.22 1.28.71.81 1.25 1.49 1.39 1.97.14.47-.1.72-.73.72z"/>
                </svg>
              </a>
              <a
                href="https://instagram.com/username"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
            </div>

            {/* Links */}
            <div className="flex flex-wrap justify-center gap-6 mb-8 text-sm">
              <button
                onClick={() => setActiveModal('privacy')}
                className="text-gray-400 hover:text-white transition-colors"
              >
                Политика конфиденциальности
              </button>
              <button
                onClick={() => setActiveModal('offer')}
                className="text-gray-400 hover:text-white transition-colors"
              >
                Оферта
              </button>
            </div>

            {/* Copyright */}
            <p className="text-gray-400 text-sm">
              © 2024 Юлия Попова. Все права защищены.
            </p>
          </div>
        </div>
      </footer>

      {/* ============================================ */}
      {/* MODALS */}
      {/* ============================================ */}
      {activeModal && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setActiveModal(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveModal(null)}
              className="float-right text-gray-400 hover:text-gray-600"
              aria-label="Close modal"
            >
              <X size={24} />
            </button>

            {/* Modal Content */}
            <div className="clear-both pt-4">
              {activeModal === 'about-details' && (
                <>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Подробнее обо мне
                  </h3>
                  <div className="space-y-4 text-gray-700 leading-relaxed">
                    <p>
                      Здесь будет развёрнутая информация о вашем образовании, опыте
                      работы, подходах и методиках.
                    </p>
                    <p>
                      <strong>Образование:</strong>
                      <br />• Психология (укажите вуз и год)
                      <br />• Тьюторство (укажите курсы/программы)
                      <br />• Дополнительное образование
                    </p>
                    <p>
                      <strong>Опыт работы:</strong>
                      <br />Расскажите о вашем опыте, количестве клиентов, успешных
                      кейсах.
                    </p>
                  </div>
                </>
              )}

              {activeModal === 'audience-kids' && (
                <>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Работа с детьми и подростками
                  </h3>
                  <div className="space-y-4 text-gray-700 leading-relaxed">
                    <p>
                      Помогаю детям и подросткам справиться с трудностями в учёбе,
                      найти мотивацию, определиться с будущей профессией.
                    </p>
                    <p>
                      <strong>С чем я работаю:</strong>
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Низкая мотивация к учёбе</li>
                      <li>Сложности с выбором профессии</li>
                      <li>Проблемы с концентрацией и организацией</li>
                      <li>Эмоциональные трудности переходного возраста</li>
                      <li>Конфликты со сверстниками или учителями</li>
                    </ul>
                  </div>
                </>
              )}

              {activeModal === 'audience-adults' && (
                <>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Работа со взрослыми
                  </h3>
                  <div className="space-y-4 text-gray-700 leading-relaxed">
                    <p>
                      Помогаю взрослым найти своё призвание, сменить профессию или
                      преодолеть карьерный кризис.
                    </p>
                    <p>
                      <strong>С чем я работаю:</strong>
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Смена профессии и карьерное самоопределение</li>
                      <li>Выгорание и потеря мотивации</li>
                      <li>Поиск жизненных целей и смыслов</li>
                      <li>Личностный рост и самопознание</li>
                      <li>Работа с самооценкой и уверенностью</li>
                    </ul>
                  </div>
                </>
              )}

              {activeModal === 'audience-parents' && (
                <>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Работа с родителями
                  </h3>
                  <div className="space-y-4 text-gray-700 leading-relaxed">
                    <p>
                      Помогаю родителям улучшить отношения с детьми, найти общий язык
                      и поддержать ребёнка в важных решениях.
                    </p>
                    <p>
                      <strong>С чем я работаю:</strong>
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Детско-родительские конфликты</li>
                      <li>Поддержка ребёнка в выборе профессии</li>
                      <li>Сложности в воспитании подростков</li>
                      <li>Семейные кризисы</li>
                      <li>Выстраивание доверительных отношений</li>
                    </ul>
                  </div>
                </>
              )}

              {activeModal === 'payment-policy' && (
                <>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Правила отмены и переносов
                  </h3>
                  <div className="space-y-4 text-gray-700 leading-relaxed">
                    <p>
                      <strong>Отмена встречи:</strong>
                      <br />
                      Если вы хотите отменить встречу, пожалуйста, сообщите мне не
                      менее чем за 24 часа. В этом случае оплата будет полностью
                      возвращена или перенесена на другую дату.
                    </p>
                    <p>
                      <strong>Перенос встречи:</strong>
                      <br />
                      Встречу можно перенести бесплатно при уведомлении за 24 часа. Мы
                      согласуем новое удобное время.
                    </p>
                    <p>
                      <strong>Отмена менее чем за 24 часа:</strong>
                      <br />
                      При отмене менее чем за 24 часа до встречи оплата не
                      возвращается, так как время было для вас зарезервировано.
                    </p>
                  </div>
                </>
              )}

              {activeModal === 'privacy' && (
                <>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Политика конфиденциальности
                  </h3>
                  <div className="space-y-4 text-gray-700 leading-relaxed text-sm">
                    <p>
                      Вся информация, которую вы сообщаете мне в ходе консультаций,
                      строго конфиденциальна. Я не передаю её третьим лицам без вашего
                      письменного согласия.
                    </p>
                    <p>
                      Персональные данные (имя, контакты) используются только для связи
                      с вами и организации встреч. Они не передаются третьим лицам.
                    </p>
                    <p>
                      Подробнее о правилах обработки персональных данных вы можете
                      узнать, связавшись со мной.
                    </p>
                  </div>
                </>
              )}

              {activeModal === 'offer' && (
                <>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Оферта</h3>
                  <div className="space-y-4 text-gray-700 leading-relaxed text-sm">
                    <p>
                      Настоящая оферта содержит условия оказания услуг психолога и
                      тьютора Юлией Поповой.
                    </p>
                    <p>
                      Оплачивая услугу, вы автоматически принимаете условия данной
                      оферты.
                    </p>
                    <p>
                      <strong>Основные условия:</strong>
                    </p>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>Оплата производится до начала встречи</li>
                      <li>Отмена возможна за 24 часа с полным возвратом средств</li>
                      <li>Все консультации конфиденциальны</li>
                      <li>Формат работы согласовывается индивидуально</li>
                    </ul>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
