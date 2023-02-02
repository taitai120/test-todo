import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    todos: [],
    searchTodos: [],
    selected: {},
};

export const todoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {
        addTodo: (state, action) => {
            const todo = {
                id: Math.random() * 100,
                title: action.payload,
            };

            state.todos.push(todo);
        },
        removeTodo: (state, action) => {
            state.todos = state.todos.filter(
                (todo) => todo.id !== action.payload
            );
        },
        selectTodo: (state, action) => {
            state.selected = state.todos.find(
                (todo) => todo.id === action.payload
            );
        },
        updateTodo: (state, action) => {
            const { id, title } = action.payload;
            const findTodo = state.todos.find((todo) => todo.id === id);
            if (findTodo) {
                findTodo.title = title;
            }
            state.selected = {};
        },
        searchTodo: (state, action) => {
            state.todos = state.searchTodos.filter((todo) =>
                todo.title.includes(action.payload)
            );
        },
    },
});

export const { addTodo, removeTodo, selectTodo, updateTodo, searchTodo } =
    todoSlice.actions;

export default todoSlice.reducer;
