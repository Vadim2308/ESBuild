import React from 'react';
import { createRoot } from 'react-dom/client';
import App from "./App";
import "./second.module.scss"

const container = document.getElementById('root')

if(!container) {
    throw new Error('root not found')
}

const root = createRoot(container);
root.render(<App />);