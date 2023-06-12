import './Global.css';

import { lazy, Suspense } from 'react';

import { Route, Routes } from 'react-router-dom';

import Loading from './pages/Loading';
import { getLocalStorage } from './util/Localstorage';

const Error = lazy(() => import('./pages/Error'));
const Join = lazy(() => import('./pages/Join'));
const Login = lazy(() => import('./pages/Login'));
const Todo = lazy(() => import('./pages/Todo'));
const Landing = lazy(() => import('./pages/Landing'));

function App() {
	if (
		new URL(window.location.href).pathname === '/todo' &&
		!getLocalStorage('accessToken')
	)
		window.location.assign('/signin');
	return (
		<Suspense fallback={<Loading />}>
			<Routes>
				<Route path="/" element={<Landing />} />
				<Route path="/signup" element={<Join />} />
				<Route path="/signin" element={<Login />} />
				<Route path="/todo" element={<Todo />} />
				<Route path="/error" element={<Error />} />
			</Routes>
		</Suspense>
	);
}

export default App;
