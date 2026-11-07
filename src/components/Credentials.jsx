import React, { useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { documents, education, interests } from '../content/credentials';
import Dialog from './ui/Dialog';
import { ArrowLeft, ArrowRight, Close, Plus } from './ui/icons';

function DocumentGallery() {
    const [current, setCurrent] = useState(0);
    const [expanded, setExpanded] = useState(false);
    const reduceMotion = useReducedMotion();
    const transition = reduceMotion ? { duration: 0 } : { type: 'spring', bounce: 0.14, duration: 0.9 };
    const touch = useRef(null);
    const count = documents.length;
    const active = documents[current];
    const move = step => setCurrent(index => (index + step + count) % count);

    const openDocument = event => {
        event.currentTarget.focus({ preventScroll: true });
        setExpanded(true);
    };

    const navigate = event => {
        if (event.target.closest('dialog')) return;
        if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
            event.preventDefault();
            if (event.target.closest('.credential-stage')) event.currentTarget.focus({ preventScroll: true });
            move(event.key === 'ArrowLeft' ? -1 : 1);
        }
    };

    return (
        <div className="credential-gallery" role="region" tabIndex={0} aria-roledescription="карусель" aria-label="Галерея дипломов и сертификатов" onKeyDown={navigate}>
            <div className="credential-stage"
                onTouchStart={event => { touch.current = event.touches[0]; }}
                onTouchCancel={() => { touch.current = null; }}
                onTouchEnd={event => {
                    if (!touch.current) return;
                    const dx = event.changedTouches[0].clientX - touch.current.clientX;
                    const dy = event.changedTouches[0].clientY - touch.current.clientY;
                    touch.current = null;
                    if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) move(dx < 0 ? 1 : -1);
                }}>
                {[-2, -1, 0, 1, 2].map(offset => {
                    const index = (current + offset + count) % count;
                    const doc = documents[index];
                    const isActive = offset === 0;
                    return <motion.div key={doc.src} className="credential-slot"
                        initial={false} animate={{ x: `${offset * 89}%` }} transition={transition}
                        style={{ zIndex: 3 - Math.abs(offset) }}>
                        <motion.button type="button" data-offset={offset} className="credential-sheet"
                            initial={false} transition={transition}
                            animate={{ rotateY: -offset * 60, scale: isActive ? 1 : 0.85 }}
                            aria-label={isActive ? `Увеличить документ «${doc.title}»` : `Показать документ «${doc.title}»`}
                            tabIndex={isActive ? 0 : -1} onClick={isActive ? openDocument : () => setCurrent(index)}>
                            <img src={doc.src} alt={doc.title} loading="lazy" decoding="async" draggable="false" />
                        </motion.button>
                    </motion.div>;
                })}
            </div>
            {/* Shared grid cell reserves the tallest caption at the current font size and width. */}
            <div className="credential-captions">
                {documents.map(doc => <div key={doc.src} className="credential-caption" aria-hidden="true">
                    <span className="credential-caption-title">{doc.title}</span><p>{doc.caption}</p>
                </div>)}
                <div className="credential-caption" aria-live="polite" aria-atomic="true">
                    <h3 className="credential-caption-title">{active.title}</h3><p>{active.caption}</p>
                </div>
            </div>
            <div className="credential-toolbar">
                <button type="button" className="icon-link" aria-label="Предыдущий документ" onClick={() => move(-1)}><ArrowLeft size={15} /></button>
                <span className="tabular-nums">{current + 1} / {count}</span>
                <button type="button" className="icon-link" aria-label="Следующий документ" onClick={() => move(1)}><ArrowRight size={15} /></button>
                <button type="button" className="text-link" onClick={openDocument}>Увеличить <Plus size={12} /></button>
            </div>
            <AnimatePresence>
                {expanded && <Dialog key="document-viewer" onClose={() => setExpanded(false)} labelledBy="document-heading" className="document-dialog">
                    <motion.div className="document-viewer"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        transition={{ duration: reduceMotion ? 0 : 0.16 }}>
                        <div className="document-viewer-header">
                            <h3 id="document-heading" className="font-semibold">{active.title}</h3>
                            <button type="button" className="document-close" aria-label="Закрыть документ" data-dialog-focus onClick={() => setExpanded(false)}><Close size={18} /></button>
                        </div>
                        <button type="button" className="document-scan" aria-label="Закрыть увеличенный диплом" onClick={() => setExpanded(false)}>
                            <motion.img src={active.src} alt={active.title} draggable="false"
                                initial={{ scale: 0.97 }} animate={{ scale: 1 }} exit={{ scale: 0.98 }}
                                transition={{ duration: reduceMotion ? 0 : 0.18, ease: 'easeOut' }} />
                        </button>
                    </motion.div>
                </Dialog>}
            </AnimatePresence>
        </div>
    );
}

export default function Credentials() {
    return <section id="education" className="credential-section py-16 sm:py-24" aria-labelledby="education-title">
        <div className="page-container">
            <div className="education-intro">
                <div>
                    <p className="section-label">Юлия Сергеевна Попова</p>
                    <h2 id="education-title" className="section-title">Моё образование<br /><em className="text-primary-dark">и практика</em></h2>
                </div>
                <div className="max-w-lg leading-relaxed">
                    <p>В 2011 году я получила диплом педагога-психолога. Позже прошла переподготовку по системной семейной терапии и тьюторству. Работе с подростками посвятила отдельный курс в «Психодемии».</p>
                    <p className="mt-3">С 2023 года регулярно прохожу супервизию и личную терапию.</p>
                </div>
            </div>
            <DocumentGallery />
            <h3 className="mb-5 font-display text-3xl text-primary-dark sm:text-4xl">Образование по годам</h3>
            <ol className="credential-history">
                {education.map(([years, title, body, topics]) => <li className="credential-entry" key={title}>
                    <span>{years}</span><h4>{title}</h4>
                    <div><p>{body}</p>
                        {topics && <details className="course-list">
                            <summary>Темы и преподаватели</summary>
                            <ul>{topics.map(topic => <li key={topic}>{topic}</li>)}</ul>
                        </details>}
                    </div>
                </li>)}
            </ol>
            <aside className="mt-8 max-w-3xl"><h3 className="mb-2 font-display text-3xl text-primary-dark">Мои интересы</h3><p>{interests}</p></aside>
        </div>
    </section>;
}
