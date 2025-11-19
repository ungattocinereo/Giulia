import React from 'react';
import { X } from 'phosphor-react';

/**
 * PrivacyPolicy Component
 * Displays privacy policy content in a modal popup
 */
export default function PrivacyPolicy({ onClose }) {
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={onClose}
            ></div>
            <div className="bg-white rounded-2xl p-8 max-w-3xl w-full relative z-10 shadow-2xl animate-fade-in max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-3xl font-bold text-neutral-800">Политика конфиденциальности</h2>
                    <button
                        onClick={onClose}
                        className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
                        aria-label="Закрыть"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Content */}
                <div className="prose prose-sm max-w-none text-gray-700 space-y-6">
                    <section>
                        <h3 className="text-xl font-semibold text-neutral-800 mb-3">1. Общие положения</h3>
                        <p className="leading-relaxed">
                            Настоящая Политика конфиденциальности определяет порядок обработки и защиты персональных данных
                            пользователей сайта popovatalk.ru (далее — «Сайт»). Используя Сайт, вы соглашаетесь с условиями
                            данной Политики конфиденциальности.
                        </p>
                        <p className="leading-relaxed">
                            Администрация Сайта уважает и соблюдает законодательство РФ в области защиты персональных данных.
                        </p>
                    </section>

                    <section>
                        <h3 className="text-xl font-semibold text-neutral-800 mb-3">2. Персональные данные пользователей</h3>
                        <p className="leading-relaxed">
                            Под персональными данными понимается информация, относящаяся к субъекту персональных данных,
                            в частности:
                        </p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Имя и фамилия</li>
                            <li>Контактный телефон</li>
                            <li>Адрес электронной почты</li>
                            <li>Telegram username или другие контактные данные мессенджеров</li>
                        </ul>
                    </section>

                    <section>
                        <h3 className="text-xl font-semibold text-neutral-800 mb-3">3. Цели сбора персональных данных</h3>
                        <p className="leading-relaxed">
                            Персональные данные пользователей собираются и обрабатываются в следующих целях:
                        </p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Обработка заявок на консультации и услуги</li>
                            <li>Связь с пользователем для уточнения деталей заявки</li>
                            <li>Предоставление информации об услугах</li>
                            <li>Улучшение качества обслуживания</li>
                        </ul>
                    </section>

                    <section>
                        <h3 className="text-xl font-semibold text-neutral-800 mb-3">4. Способы сбора информации</h3>
                        <p className="leading-relaxed">
                            Персональные данные собираются при заполнении форм обратной связи на Сайте.
                            Пользователь предоставляет свои данные добровольно, заполняя соответствующие поля форм.
                        </p>
                    </section>

                    <section>
                        <h3 className="text-xl font-semibold text-neutral-800 mb-3">5. Обработка и защита персональных данных</h3>
                        <p className="leading-relaxed">
                            Администрация Сайта обязуется:
                        </p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Использовать персональные данные исключительно в целях, указанных в настоящей Политике</li>
                            <li>Не разглашать персональные данные третьим лицам без согласия пользователя</li>
                            <li>Принимать необходимые меры для защиты персональных данных от несанкционированного доступа</li>
                            <li>Хранить персональные данные в течение срока, необходимого для достижения целей обработки</li>
                        </ul>
                    </section>

                    <section>
                        <h3 className="text-xl font-semibold text-neutral-800 mb-3">6. Передача данных третьим лицам</h3>
                        <p className="leading-relaxed">
                            Персональные данные пользователей могут быть переданы третьим лицам только в следующих случаях:
                        </p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Пользователь явно выразил свое согласие на такие действия</li>
                            <li>Передача необходима для оказания услуги пользователю</li>
                            <li>Передача предусмотрена российским или иным применимым законодательством</li>
                        </ul>
                        <p className="leading-relaxed mt-3">
                            Для отправки заявок используется Telegram Bot API. Данные передаются в зашифрованном виде
                            и хранятся в соответствии с политикой конфиденциальности Telegram.
                        </p>
                    </section>

                    <section>
                        <h3 className="text-xl font-semibold text-neutral-800 mb-3">7. Права пользователей</h3>
                        <p className="leading-relaxed">
                            Пользователь имеет право:
                        </p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Получать информацию о своих персональных данных, обрабатываемых Администрацией</li>
                            <li>Требовать уточнения, блокирования или уничтожения своих персональных данных</li>
                            <li>Отозвать согласие на обработку персональных данных</li>
                            <li>Обжаловать действия Администрации в уполномоченном органе по защите прав субъектов персональных данных</li>
                        </ul>
                    </section>

                    <section>
                        <h3 className="text-xl font-semibold text-neutral-800 mb-3">8. Файлы cookie</h3>
                        <p className="leading-relaxed">
                            Сайт может использовать технологию cookie для улучшения работы и анализа посещаемости.
                            Cookie — это небольшие текстовые файлы, которые сохраняются на устройстве пользователя.
                            Пользователь может настроить свой браузер для отказа от cookie, однако это может ограничить
                            функциональность Сайта.
                        </p>
                    </section>

                    <section>
                        <h3 className="text-xl font-semibold text-neutral-800 mb-3">9. Изменение Политики конфиденциальности</h3>
                        <p className="leading-relaxed">
                            Администрация Сайта оставляет за собой право вносить изменения в настоящую Политику конфиденциальности.
                            При внесении изменений в актуальной редакции указывается дата последнего обновления.
                            Новая редакция Политики вступает в силу с момента ее размещения на Сайте.
                        </p>
                    </section>

                    <section>
                        <h3 className="text-xl font-semibold text-neutral-800 mb-3">10. Контактная информация</h3>
                        <p className="leading-relaxed">
                            По вопросам, связанным с обработкой персональных данных, вы можете связаться с нами:
                        </p>
                        <ul className="list-none space-y-2 mt-3">
                            <li className="flex items-center gap-2">
                                <span className="font-semibold">Email:</span>
                                <a href="mailto:radio.popova@gmail.com" className="text-primary hover:underline">
                                    radio.popova@gmail.com
                                </a>
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="font-semibold">Telegram:</span>
                                <a href="https://t.me/MissisPoppins" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                                    @MissisPoppins
                                </a>
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="font-semibold">WhatsApp:</span>
                                <a href="https://wa.me/79688274447" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                                    +7 968 827 44 47
                                </a>
                            </li>
                        </ul>
                    </section>

                    <section className="pt-4 border-t border-gray-200">
                        <p className="text-sm text-gray-500 italic">
                            Дата последнего обновления: 19 ноября 2025 года
                        </p>
                    </section>
                </div>

                {/* Footer Button */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                    <button
                        onClick={onClose}
                        className="w-full bg-primary text-white py-3 rounded-xl font-semibold hover:bg-primary-dark transition-colors"
                    >
                        Закрыть
                    </button>
                </div>
            </div>
        </div>
    );
}
