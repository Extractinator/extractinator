import './styles.css';
import App from './components/App.tsx';
import React from 'react';
import { createRoot } from 'react-dom/client';

// Clear the existing HTML content
document.body.innerHTML = '<div id="app"></div>';

// Render your React component instead
const container = document.getElementById('app');
if (!container) {
  throw new Error(
    'No container found, this likely means this JS was run on a page that it was not designed for',
  );
}
const root = createRoot(container);
root.render(<App />);
