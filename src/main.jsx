import React from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import App from './App.jsx'
import { MotionConfig } from 'framer-motion'
import './index.css'

const root = document.getElementById('root')
const app = <React.StrictMode><MotionConfig reducedMotion="user"><App /></MotionConfig></React.StrictMode>
const options = { identifierPrefix: 'popovatalk-' }
if (root.hasChildNodes()) hydrateRoot(root, app, options)
else createRoot(root, options).render(app)
