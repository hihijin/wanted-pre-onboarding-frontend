import React from 'react';

import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Normalize } from 'styled-normalize';

import App from './App';

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement,
);
root.render(
	<BrowserRouter>
		<Normalize />
		<App />
	</BrowserRouter>,
);
