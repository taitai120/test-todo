import axios from "axios"

const getTodos = async () => {
    const response = await axios.get(`http://localhost:8000/api/v1/todos`);

    const {data} = response.data

    return data;
}

const createTodo = async (newTodo) => {
    const response = await axios.post(`http://localhost:8000/api/v1/todos`, newTodo);

    const {data} = response.data;

    return data;
}

const updateTodo = async (newTodo) => {
    const {_id, title} = newTodo
    const response = await axios.put(`http://localhost:8000/api/v1/todos/${_id}`, {
        title
    });

    const {data} = response.data;

    return data;
}

const deleteTodo = async (id) => {
    await axios.delete(`http://localhost:8000/api/v1/todos/${id}`);

    return id;
}

const todoService = {
    getTodos,
    createTodo,
    updateTodo,
    deleteTodo
}

export default todoService