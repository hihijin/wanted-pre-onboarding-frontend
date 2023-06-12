import '../Global.css';

import React, { FocusEvent } from 'react';

import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { Api } from '../util/customAPI';
import { setLocalStorage } from '../util/Localstorage';
import { SweetAlert2 } from '../util/SweetAlert';

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
		.keyUp {
			font-size: 12px;
			width: 98%;
			color: #0db4f3;
			text-align: left;
			margin-top: 0px;
			margin-bottom: -10px;
			@media (max-height: 700px) {
				margin-top: 1px;
				margin-bottom: -15px;
			}
		}
		.hide {
			display: none;
		}
		button {
			margin-top: 10px;
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
	.gotoJoin {
		color: rgba(0, 0, 0, 0.5);
		margin-top: 40px;
		font-size: 13px;
	}
	.gotoJoinBtn {
		color: #0db4f3;
		font-size: 13px;
		margin-top: 7px;
		&:hover {
			color: #4ec9ff;
		}
	}
`;

function Login() {
	const navigate = useNavigate();

	const signupHandler = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const el = e.target as HTMLFormElement;
		const btn = document.querySelector('button') as HTMLButtonElement;
		if (!el.email.value.includes('@') || el.password.value.length < 8)
			btn.disabled = true;
		else {
			btn.disabled = false;
			try {
				const data = await Api.post('/auth/signin', {
					email: el.email.value,
					password: el.password.value,
				});
				setLocalStorage('accessToken', data.data.access_token);
				const sweetAlert2 = await SweetAlert2(
					'로그인되었습니다.',
					'Todo List로 이동하시겠습니까?',
				);
				if (sweetAlert2.isConfirmed) {
					navigate('/todo');
				}
			} catch (err) {
				navigate('/error');
			}
		}
	};

	// input창 focus 핸들러
	const displayNameKeyFocus = (e: FocusEvent<HTMLInputElement>) => {
		const keyUp = e.target.previousSibling as HTMLDivElement;
		keyUp?.classList.remove('hide');
	};
	// input창 blur 핸들러
	const displayNameKeyBlur = (e: FocusEvent<HTMLInputElement>) => {
		const keyUp = e.target.previousSibling as HTMLDivElement;
		keyUp?.classList.add('hide');
	};
	return (
		<Main>
			<Content>
				<div>Sign In</div>
				<form onSubmit={(e) => signupHandler(e)}>
					<div className="keyUp hide">Email</div>
					<input
						data-testid="email-input"
						name="email"
						placeholder="Email"
						type="text"
						onFocus={(e) => displayNameKeyFocus(e)}
						onBlur={(e) => displayNameKeyBlur(e)}
					/>
					<div className="keyUp hide">Password</div>
					<input
						data-testid="password-input"
						name="password"
						placeholder="Password"
						type="password"
						onFocus={(e) => displayNameKeyFocus(e)}
						onBlur={(e) => displayNameKeyBlur(e)}
					/>
					<button data-testid="signin-button" type="submit">
						Sign In
					</button>
				</form>
				<span className="gotoJoin">아직 회원가입을 안하셨나요?</span>
				<Link to="/signup">
					<button className="gotoJoinBtn">Join</button>
				</Link>
			</Content>
		</Main>
	);
}

export default Login;
