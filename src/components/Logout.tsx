import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { removeLocalStorage } from '../util/Localstorage';
import { SweetAlert1 } from '../util/SweetAlert';

const Button = styled.button`
	color: rgba(0, 0, 0, 0.8);
	margin-top: 20px;
	font-weight: bold;
	padding: 10px 15px;
	font-size: 12px;
	font-weight: bold;
	border-radius: 5px;
	background: rgba(0, 0, 0, 0.03);
	box-shadow: 5px 5px 5px 0px rgba(0, 0, 0, 0.09);
	&:hover {
		cursor: pointer;
		background: rgba(0, 0, 0, 0.07);
	}
`;

function Logout() {
	const navigate = useNavigate();
	// 로그아웃 핸들러
	const logoutHandler = async () => {
		const sweetAlert1 = await SweetAlert1(
			'로그아웃',
			'로그아웃하시겠습니까?',
			'로그아웃',
			'취소',
		);
		if (sweetAlert1.isConfirmed) {
			removeLocalStorage('accessToken');
			navigate('/');
		}
	};
	return (
		<Button className="logoutBtn" onClick={logoutHandler}>
			Log Out
		</Button>
	);
}

export default Logout;
