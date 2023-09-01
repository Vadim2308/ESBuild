import React from 'react';
import { createRoot } from 'react-dom/client';
import App from "./App";
import "./second.css"

const container = document.getElementById('root')

if(!container) {
    throw new Error('root not found')
}

const root = createRoot(container);
root.render(<App />);