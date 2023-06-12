import '../Global.css';

import React, { FocusEvent, useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { Api } from '../util/customAPI';
import { SweetAlert2 } from '../util/SweetAlert';
import ToastAlert from '../util/ToastAlert';

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
		.check {
			color: red;
			font-size: 10px;
			margin: 0px;
			margin-top: -10px;
			margin-bottom: 15px;
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

function Join() {
	const navigate = useNavigate();

	const [emailValid, setEmailValid] = useState(true);
	const [passwordValid, setPasswordValid] = useState(true);

	const signupHandler = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const el = e.target as HTMLFormElement;
		const btn = document.querySelector('button') as HTMLButtonElement;
		try {
			if (!el.email.value.includes('@')) {
				setEmailValid(false);
				setPasswordValid(true);
			} else if (el.password.value.length < 8) {
				setPasswordValid(false);
				setEmailValid(true);
			} else if (
				// eslint-disable-next-line no-dupe-else-if
				!el.email.value.includes('@') &&
				el.password.value.length < 8
			) {
				setPasswordValid(false);
				setEmailValid(false);
				btn.disabled = true;
			} else if (
				el.email.value.includes('@') &&
				el.password.value.length >= 8
			) {
				setEmailValid(true);
				setPasswordValid(true);
				btn.disabled = false;
				await Api.post('/auth/signup', {
					email: el.email.value,
					password: el.password.value,
				});
				const sweetAlert2 = await SweetAlert2(
					'회원가입되었습니다.',
					'로그인으로 이동하시겠습니까?',
				);
				if (sweetAlert2.isConfirmed) {
					navigate('/signin');
				}
			}
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (err: any) {
			if (err.response.status === 400) {
				ToastAlert('이미 가입한 이메일 입니다');
			} else {
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
				<div>Sign Up</div>
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
					<div className="check">
						{!emailValid && '이메일 형식으로 입력해주세요'}
					</div>
					<div className="keyUp hide">Password</div>
					<input
						data-testid="password-input"
						name="password"
						placeholder="Password"
						type="password"
						onFocus={(e) => displayNameKeyFocus(e)}
						onBlur={(e) => displayNameKeyBlur(e)}
					/>
					<div className="check">
						{!passwordValid && '비밀번호 형식은 8글자이상 입니다'}
					</div>
					<button data-testid="signup-button" type="submit">
						Sign Up
					</button>
				</form>
				<span className="gotoJoin">이미 회원가입을 하셨나요?</span>
				<Link to="/signin">
					<button className="gotoJoinBtn">Login</button>
				</Link>
			</Content>
		</Main>
	);
}

export default Join;
