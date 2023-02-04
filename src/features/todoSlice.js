import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    todos: [],
    searchTerm: "",
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
            const index = state.todos.findIndex((todo) => todo.id === id);
            state.todos[index].title = title;
            state.selected = {};
        },
        searchTodo: (state, action) => {
            state.searchTerm = action.payload;
        },
    },
});

export const { addTodo, removeTodo, selectTodo, updateTodo, searchTodo } =
    todoSlice.actions;

export default todoSlice.reducer;
