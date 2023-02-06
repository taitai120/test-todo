import {
    createSlice,
    createAsyncThunk,
    createEntityAdapter,
} from "@reduxjs/toolkit";
import todoService from "./todoService";

const initialState = {
    todos: [],
    searchTerm: "",
    selected: {},
    newTodo: {},
    isLoading: null,
    isSuccess: null,
    isError: null,
    message: "",
};

export const getTodos = createAsyncThunk(
    "todos/getTodos",
    async (_, thunkAPI) => {
        try {
            return await todoService.getTodos();
        } catch (error) {
            return await thunkAPI.rejectWithValue(error);
        }
    }
);

export const createTodo = createAsyncThunk(
    "todos/createTodo",
    async (newTodo, thunkAPI) => {
        try {
            return await todoService.createTodo(newTodo);
        } catch (error) {
            return await thunkAPI.rejectWithValue(error);
        }
    }
);

export const updateTodo = createAsyncThunk(
    "todos/updateTodo",
    async (newTodo, thunkAPI) => {
        try {
            return await todoService.updateTodo(newTodo);
        } catch (error) {
            return await thunkAPI.rejectWithValue(error);
        }
    }
);

export const deleteTodo = createAsyncThunk(
    "todos/deleteTodo",
    async (id, thunkAPI) => {
        try {
            return await todoService.deleteTodo(id);
        } catch (error) {
            return await thunkAPI.rejectWithValue(error);
        }
    }
);

const todosAdapter = createEntityAdapter();

export const todoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {
        selectTodo: (state, action) => {
            state.selected = state.todos.find(
                (todo) => todo._id === action.payload
            );
        },
        searchTodo: (state, action) => {
            state.searchTerm = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getTodos.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(getTodos.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.todos = action.payload;
            })
            .addCase(getTodos.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.message = action.error;
            })
            .addCase(createTodo.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(createTodo.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.newTodo = action.payload;
                state.todos = [...state.todos, action.payload];
            })
            .addCase(createTodo.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.message = action.error;
            })
            .addCase(deleteTodo.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(deleteTodo.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.todos = state.todos.filter(
                    (todo) => todo._id !== action.payload
                );
            })
            .addCase(deleteTodo.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.message = action.error;
            })
            .addCase(updateTodo.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(updateTodo.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                const index = state.todos.findIndex(
                    (todo) => todo._id === action.payload._id
                );
                state.todos[index] = action.payload;
                state.searchTerm = "";
                state.selected = {};
            })
            .addCase(updateTodo.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.isError = true;
                state.message = action.error;
            });
    },
});

export const { addTodo, removeTodo, selectTodo, searchTodo } =
    todoSlice.actions;

export default todoSlice.reducer;
