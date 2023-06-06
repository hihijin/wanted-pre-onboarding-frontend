import './Global.css';

import React from 'react';

import { Route, Routes } from 'react-router-dom';

import Error from './pages/Error';
import Join from './pages/Join';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Todo from './pages/Todo';
import { getLocalStorage } from './util/Localstorage';

function App() {
	if (
		new URL(window.location.href).pathname === '/todo' &&
		!getLocalStorage('accessToken')
	)
		window.location.assign('/signin');
	return (
		<Routes>
			<Route path="/" element={<Landing />} />
			<Route path="/signup" element={<Join />} />
			<Route path="/signin" element={<Login />} />
			<Route path="/todo" element={<Todo />} />
			<Route path="/error" element={<Error />} />
		</Routes>
	);
}

export default App;
