import '../Global.css';

import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { Api } from '../util/customAPI';

const Main = styled.div`
	width: 100%;
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const Content = styled.div`
	background: rgba(0, 0, 0, 0.03);
	width: 350px;
	height: 600px;
	color: rgba(0, 0, 0, 0.8);
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	border-radius: 30px;
	box-shadow: 5px 5px 10px 0px rgba(0, 0, 0, 0.1);
	div {
		margin-bottom: 40px;
		font-size: 50px;
		font-weight: bold;
	}
	form {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		input {
			width: 200px;
			padding: 10px;
			margin: 20px 0;
			border-radius: 10px;
			border: 1px solid gray;
			&:focus {
				outline: none;
			}
		}
		button {
			margin-top: 30px;
			color: rgba(0, 0, 0, 0.8);
			width: 200px;
			font-size: 22px;
			font-weight: bold;
			padding: 10px;
			border-radius: 10px;
			background: rgba(0, 0, 0, 0.03);
			box-shadow: 5px 5px 5px 0px rgba(0, 0, 0, 0.09);
			&:hover {
				cursor: pointer;
				background: rgba(0, 0, 0, 0.05);
			}
		}
	}
`;

function Join() {
	const navigate = useNavigate();

	const signupHandler = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const el = e.target as HTMLFormElement;
		const btn = document.querySelector('button') as HTMLButtonElement;
		if (!el.email.value.includes('@') || el.password.value.length < 8)
			btn.disabled = true;
		else if (el.email.value.includes('@') && el.password.value.length >= 8) {
			btn.disabled = false;
			try {
				await Api.post('/auth/signup', {
					email: el.email.value,
					password: el.password.value,
				});
				navigate('/signin');
			} catch (err) {
				navigate('/error');
			}
		}
	};
	return (
		<Main>
			<Content>
				<div>Sign Up</div>
				<form onSubmit={(e) => signupHandler(e)}>
					<input
						data-testid="email-input"
						name="email"
						placeholder="Email"
						type="text"
					/>
					<input
						data-testid="password-input"
						name="password"
						placeholder="Password"
						type="password"
					/>
					<button data-testid="signup-button" type="submit">
						Sign Up
					</button>
				</form>
			</Content>
		</Main>
	);
}

export default Join;
