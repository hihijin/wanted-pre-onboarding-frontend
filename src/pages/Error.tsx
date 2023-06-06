import '../Global.css';

import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Main = styled.div`
	width: 100%;
	height: 100vh;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	color: rgba(0, 0, 0, 0.8);
	div {
		margin-bottom: 40px;
		font-size: 50px;
		font-weight: bold;
	}
	span {
		font-size: 20px;
		font-weight: bold;
	}
`;

function Error() {
	return (
		<Main>
			<div>404 Not Found</div>
			<span>
				Please Click{' '}
				<Link to="/" style={{ textDecoration: 'none', color: '#0DB4F3' }}>
					here
				</Link>
			</span>
		</Main>
	);
}

export default Error;
