import React from 'react';
import { renderToString } from 'react-dom/server';
import { MotionConfig } from 'framer-motion';
import App from './App.jsx';

export function render() {
    return renderToString(
        <React.StrictMode><MotionConfig reducedMotion="user"><App /></MotionConfig></React.StrictMode>,
        { identifierPrefix: 'popovatalk-' },
    );
}
