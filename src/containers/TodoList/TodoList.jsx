import React, { useState, useEffect } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import { removeTodo, selectTodo } from "../../features/todoSlice";
import { useDispatch, useSelector } from "react-redux";
import TextField from "@mui/material/TextField";

const TodoList = ({ todos }) => {
    const dispatch = useDispatch();
    const [title, setTitle] = useState("");
    const { selected } = useSelector((state) => state.todo);

    const renderList = (arr) => {
        return arr?.map((item) => (
            <li key={item.id} className="todo-item">
                <p>{item.title}</p>
                <div className="todo-action">
                    <EditIcon
                        className="action-icon"
                        color="primary"
                        onClick={() => dispatch(selectTodo(item.id))}
                    />
                    <DeleteIcon
                        className="action-icon"
                        sx={{ color: "#d1485f" }}
                        onClick={() => {
                            dispatch(removeTodo(item.id));
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
