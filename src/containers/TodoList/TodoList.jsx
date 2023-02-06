import React, { useState, useEffect } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { removeTodo, selectTodo } from "../../features/todoSlice";
import { useDispatch, useSelector } from "react-redux";
import { getTodos, deleteTodo } from "../../features/todoSlice";

const TodoList = ({ todos }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTodos());
    }, [dispatch]);

    const renderList = (arr) => {
        return arr?.map((item) => (
            <li key={item._id} className="todo-item">
                <p>{item.title}</p>
                <div className="todo-action">
                    <EditIcon
                        className="action-icon"
                        color="primary"
                        onClick={() => dispatch(selectTodo(item._id))}
                    />
                    <DeleteIcon
                        className="action-icon"
                        sx={{ color: "#d1485f" }}
                        onClick={() => {
                            dispatch(deleteTodo(item._id));
                            console.log("Deleted");
                        }}
                    />
                </div>
            </li>
        ));
    };

    return (
        <div>
            <ul className="todo-list">
                {todos.length > 0 && renderList(todos)}
                {todos.length === 0 && <p>No todos.</p>}
            </ul>
        </div>
    );
};

export default TodoList;
