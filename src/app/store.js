import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "../features/todoSlice";

const localStorageMiddleware = ({ getState }) => {
    return (next) => (action) => {
        const result = next(action);
        localStorage.setItem("todos", JSON.stringify(getState()));
        return result;
    };
};

const reHydrateStore = () => {
    if (localStorage.getItem("todos") !== null) {
        return JSON.parse(localStorage.getItem("todos")); // re-hydrate the store
    }
};

const store = configureStore({
    reducer: {
        todo: todoReducer,
    },
    preloadedState: reHydrateStore(),
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(localStorageMiddleware),
});

export default store;
