import React, { useEffect } from "react";

import TodoList from "./TodoList";
import { createUser } from "./Services/todoListServices";


const Home = () => {
	useEffect(() => {
		createUser()
	}, [])
	return (
		<div>
			<TodoList />
		</div>
	);
};


export default Home;