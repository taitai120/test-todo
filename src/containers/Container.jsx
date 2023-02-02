import React, { useState, useEffect, useRef } from "react";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import TodoList from "./TodoList/TodoList";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, updateTodo, searchTodo } from "../features/todoSlice";

const Container = () => {
    const [search, setSearch] = useState("");
    const [title, setTitle] = useState("");
    const typingTimeoutRef = useRef(null);
    const dispatch = useDispatch();
    const { todos } = useSelector((state) => state.todo);
    const { selected } = useSelector((state) => state.todo);

    const handleAddTodo = (e) => {
        e.preventDefault();

        if (!selected.id) {
            if (title !== "" && title !== undefined) {
                dispatch(addTodo(title));
                setTitle("");
            }
        } else {
            if (title !== "" && title !== undefined) {
                dispatch(
                    updateTodo({
                        id: selected.id,
                        title,
                    })
                );
                setTitle("");
            }
        }
    };

    const handleSearch = (e) => {
        const { value } = e.target;
        setSearch(value);

        if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current);
        }

        typingTimeoutRef.current = setTimeout(() => {
            dispatch(searchTodo(value));
        }, 300);
    };

    useEffect(() => {
        setTitle(selected.title);
    }, [selected]);

    return (
        <div className="container">
            <h1 className="title">Todo App</h1>
            <Paper>
                <form action="" className="todo-search-form">
                    <InputBase
                        sx={{ ml: 1, flex: 1 }}
                        placeholder="Search by name..."
                        name="search"
                        value={search}
                        onChange={handleSearch}
                    />
                    <IconButton
                        type="button"
                        sx={{ p: "10px" }}
                        aria-label="search"
                    >
                        <SearchIcon />
                    </IconButton>
                </form>
            </Paper>
            <div style={{ marginTop: "1rem" }} className="todo-content">
                <TodoList todos={todos} />
            </div>
            <div className="todo-add">
                <form action="" className="todo-add-form">
                    <TextField
                        id="title"
                        label="Add new task"
                        name="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <Button
                        variant="contained"
                        endIcon={<AddIcon />}
                        size="large"
                        onClick={handleAddTodo}
                        disabled={title === "" ? true : false}
                    >
                        {selected.id ? "Edit Task" : "Add Task"}
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default Container;
