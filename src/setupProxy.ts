import { Application } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

// eslint-disable-next-line func-names
export default function (app: Application) {
	app.use(
		createProxyMiddleware('/api', {
			target: 'https://www.pre-onboarding-selection-task.shop',
			changeOrigin: true,
		}),
	);
}
