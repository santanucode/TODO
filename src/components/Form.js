import React, { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const Form = ({ input, setInput, todos, setTodos, setEditTodo, editTodo }) => {
    const updateTodo = (input, editTodo) => {
        const newTodo = todos.map((todo) =>
            todo.id === editTodo.id ? { title: input, id: editTodo.id, status: editTodo.status } : todo
        )
        setTodos(newTodo)
        setEditTodo("")
    }
    const onInputChange = (event) => {
        setInput(event.target.value);
    }
    const onFormSubmit = (e) => {
        e.preventDefault();
        if (!editTodo) {
            setTodos([...todos, { id: uuidv4(), title: input, status: false }])
            setInput("");
        } else {
            updateTodo(input, editTodo)
        }
    }
    useEffect(() => {
        if (editTodo) {
            setInput(editTodo.title)
        } else {
            setInput("")
        }
    }, [setInput, editTodo])
    return (
        <form onSubmit={onFormSubmit} style={{ justifyContent: "flex-end" }}>
            <div className="input-group mb-3">
                <input type="text"
                    className="form-control"
                    placeholder='Enter a Task'
                    value={input}
                    onChange={onInputChange}
                    required
                />
                <button className={editTodo ?  "btn btn-primary" : "btn btn-success" } type="submit"> {editTodo ? "Update" : "Add"}</button>
            </div>
        </form>
    )
}

export default Form