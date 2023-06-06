import '../Global.css';

import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { getLocalStorage } from '../util/Localstorage';

const Main = styled.div`
	color: rgba(0, 0, 0, 0.8);
	width: 100%;
	height: 100vh;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	div {
		margin-bottom: 100px;
		font-size: 50px;
		font-weight: bold;
		width: 300px;
		line-height: 70px;
	}
	button {
		color: rgba(0, 0, 0, 0.8);
		margin-bottom: 50px;
		width: 250px;
		font-size: 20px;
		font-weight: bold;
		padding: 20px;
		border-radius: 30px;
		background: rgba(0, 0, 0, 0.05);
		&:hover {
			cursor: pointer;
			border: 3px solid rgba(0, 0, 0, 0.8);
		}
	}
`;

function Landing() {
	return (
		<Main>
			<div>Wanted pre-onboarding 선발 과제</div>
			{!getLocalStorage('accessToken') ? (
				<>
					<Link to="/signup">
						<button>회원가입 하러가기</button>
					</Link>
					<Link to="/signin">
						<button>로그인 하러가기</button>
					</Link>
				</>
			) : (
				<>
					<Link to="/todo">
						<button>회원가입 하러가기</button>
					</Link>
					<Link to="/todo">
						<button>로그인 하러가기</button>
					</Link>
				</>
			)}
		</Main>
	);
}

export default Landing;
