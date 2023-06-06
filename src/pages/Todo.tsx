import '../Global.css';

import { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { Api } from '../util/customAPI';
import { removeLocalStorage } from '../util/Localstorage';

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
	padding: 20px;
	color: rgba(0, 0, 0, 0.8);
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	border-radius: 30px;
	box-shadow: 5px 5px 10px 0px rgba(0, 0, 0, 0.1);
	div {
		font-size: 50px;
		font-weight: bold;
	}
	form {
		display: flex;
		justify-content: center;
		align-items: center;

		.createInput {
			padding: 10px;
			width: 200px;
			height: 30px;
			margin: 30px 10px;
			border-radius: 5px;
			border: 1px solid gray;
			&:focus {
				outline: none;
			}
		}
		.submitBtn {
			margin: 30px 10px;
			color: rgba(0, 0, 0, 0.8);
			width: 60px;
			height: 30px;
			font-size: 12px;
			font-weight: bold;
			border-radius: 5px;
			background: rgba(0, 0, 0, 0.03);
			box-shadow: 5px 5px 5px 0px rgba(0, 0, 0, 0.09);
			&:hover {
				cursor: pointer;
				background: rgba(0, 0, 0, 0.07);
			}
		}
	}
	.logoutBtn {
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
	}
`;

const TodoList = styled.ul`
	border: 1px solid gray;
	width: 300px;
	height: 400px;
	padding: 10px;
	display: flex;
	flex-direction: column;
	justify-content: baseline;
	align-items: flex-start;
	overflow-x: hidden;

	li {
		padding: 10px 0;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		width: 300px;
		height: auto;
		span {
			font-weight: bold;
			font-size: 15px;
			width: 167px;
			margin: 0 7px;
			word-wrap: break-word;
		}
		button {
			background: rgba(0, 0, 0, 0.05);
			padding: 5px;
			border-radius: 5px;
			font-size: 10px;
			margin: 0 2px;
			&:hover {
				background: rgba(0, 0, 0, 0.1);
			}
		}
		.editInput {
			width: 155px;
			margin: 0 7px;
			padding: 3px;
			border-radius: 5px;
			border: 1px solid gray;
			&:focus {
				outline: none;
			}
		}
	}
`;

interface Itodo {
	id: number;
	todo: string;
	isCompleted: boolean;
	userId: number;
	isEditMode: boolean;
}

function Todo() {
	const navigate = useNavigate();

	const [todos, setTodos] = useState<Itodo[]>([]);

	const [text, setText] = useState<string>('');

	// todolist 목록 가져오기
	useEffect(() => {
		Api.get('/todos')
			.then((res) => {
				setTodos(
					res.data.map((item: Itodo) => ({ ...item, isEditMode: false })),
				);
			})
			.catch(() => {
				navigate('/error');
			});
	}, [navigate]);

	// todo 생성 핸들러
	const createTodoHandler = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const el = e.target as HTMLFormElement;
		try {
			const data = await Api.post('/todos', {
				todo: el.todo.value,
			});
			setTodos([...todos, data.data]);
			setText('');
		} catch (err) {
			navigate('/error');
		}
	};

	// 수정모드 변경 핸들러
	const editmodeHandler = (id: number) => {
		setTodos((prevTodos) =>
			prevTodos.map((todo) =>
				todo.id === id ? { ...todo, isEditMode: true } : todo,
			),
		);
	};

	// 수정 완료 핸들러
	const editSubmitHandler = async (
		id: number,
		e: React.FormEvent<HTMLFormElement>,
	) => {
		const todoValue = (e.target as HTMLFormElement).todo.value;
		try {
			await Api.put(`/todos/${id}`, {
				todo: todoValue,
				isCompleted: false,
			});
			setTodos((prevTodos) =>
				prevTodos.map((todo) =>
					todo.id === id ? { ...todo, isEditMode: false } : todo,
				),
			);
		} catch (err) {
			navigate('/error');
		}
	};

	// 수정 취소 핸들러
	const cancelHandler = (id: number) => {
		setTodos((prevTodos) =>
			prevTodos.map((todo) =>
				todo.id === id ? { ...todo, isEditMode: false } : todo,
			),
		);
	};

	// todo 삭제 핸들러
	const deleteHandler = async (id: number) => {
		try {
			await Api.delete(`/todos/${id}`);
			setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
		} catch (err) {
			navigate('/error');
		}
	};

	// todo 체크시 수정 핸들러
	const checkHandler = async (
		todo: string,
		id: number,
		isCompleted: boolean,
	) => {
		try {
			await Api.put(`/todos/${id}`, {
				todo,
				isCompleted: !isCompleted,
			});
		} catch (err) {
			navigate('/error');
		}
	};

	// 로그아웃 핸들러
	const logoutHandler = () => {
		removeLocalStorage('accessToken');
		navigate('/');
	};

	// input창 리셋을 위한 value설정
	const inputResetHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		setText(e.target.value);
	};
	return (
		<Main>
			<Content>
				<div>Todo List</div>
				<form onSubmit={(e) => createTodoHandler(e)}>
					<input
						data-testid="new-todo-input"
						className="createInput"
						name="todo"
						placeholder="todo"
						type="text"
						onChange={(e) => inputResetHandler(e)}
						value={text}
					/>
					<button
						data-testid="new-todo-add-button"
						type="submit"
						className="submitBtn"
					>
						Add
					</button>
				</form>
				<TodoList>
					{todos.length > 0 &&
						todos.map((todo) => (
							<li key={todo.id}>
								{!todo.isEditMode ? (
									<>
										<input
											className="checkInput"
											type="checkbox"
											defaultChecked={todo.isCompleted}
											onClick={() =>
												checkHandler(todo.todo, todo.id, todo.isCompleted)
											}
										/>
										<span>{todo.todo}</span>
										<button onClick={() => editmodeHandler(todo.id)}>
											Edit
										</button>
										<button onClick={() => deleteHandler(todo.id)}>
											Delete
										</button>
									</>
								) : (
									<>
										<input
											type="checkbox"
											className="checkInput"
											defaultChecked={false}
										/>
										<form onSubmit={(e) => editSubmitHandler(todo.id, e)}>
											<input
												data-testid="modify-input"
												className="editInput"
												defaultValue={todo.todo}
												name="todo"
											/>
											<button data-testid="submit-button" type="submit">
												submit
											</button>
											<button
												data-testid="cancel-button"
												onClick={() => cancelHandler(todo.id)}
											>
												cancel
											</button>
										</form>
									</>
								)}
							</li>
						))}
				</TodoList>
				<button className="logoutBtn" onClick={logoutHandler}>
					Log Out
				</button>
			</Content>
		</Main>
	);
}

export default Todo;
