import React from 'react';
import { createRoot, Root } from 'react-dom/client';
import App from './App';

const main: HTMLElement|null = document.getElementById('main');
if (main === null)
  throw new Error('Could not find the "main" element.')

const root: Root = createRoot(main);

root.render(<App></App>);