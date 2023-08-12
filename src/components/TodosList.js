import { ArchiveTick, Edit2, Trash } from 'iconsax-react';
import React, { useEffect, useState } from 'react';

const TodosList = ({ todos, setTodos, setEditTodo }) => {
    const [inprogress, setInprogress] = useState([]);
    const [closed, setClosed] = useState([]);
    const [dragData, setDragData] = useState(null);

    function handleOnDrag(data) {
        setDragData(data);
    }
    function handleOnDrop(e) {
        const targetId = e.target.id === "ongoing" ? false : 1;
        if (targetId !== dragData.status) {
            const newTodo = todos.map((todo) =>
                todo.id === dragData.id ? { title: dragData.title, id: dragData.id, status: !dragData.status } : todo
            )
            setTodos(newTodo)
            setDragData(null);
        }
    }
    function handleDragOver(e) {
        e.preventDefault();
    }

    useEffect(() => {
        const prgTodos = todos.filter((ele) => ele.status === false);
        const compltTodos = todos.filter((ele) => ele.status === true);
        setInprogress(prgTodos);
        setClosed(compltTodos);
    }, [todos]);

    const handleComplted = (todo) => {
        setTodos(
            todos.map((item) => {
                if (item.id === todo.id) {
                    return { ...item, status: !item.status }
                }
                return item
            })
        )
    }
    const handleDelete = ({ id }) => {
        setTodos(todos.filter((todo) => todo.id !== id))
    }
    const handleEdit = ({ id }) => {
        const findTodo = todos.find((todo) => todo.id === id)
        setEditTodo(findTodo)
    }

    return (
        <div className="row">
            <div className="col-sm-6">
                <div className="card text-white mb-3" style={{ height: "400px", backgroundColor: "#14746f" }} >
                    <div className="card-header">Active Task</div>
                    <div className="card-body"
                        id="ongoing"
                        draggable
                        onDrop={handleOnDrop}
                        onDragOver={handleDragOver}
                    >
                        {inprogress.map((todo) => (
                            <div className="input-group mb-3" key={todo.id}
                                draggable
                                onDragStart={() => handleOnDrag(todo)}>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder='Enter a Task'
                                    value={todo.title}
                                    disabled
                                />
                                <div className="btn-group" role="group" aria-label="Basic mixed styles example">
                                    <button type="button" className="btn btn-warning" onClick={() => handleEdit(todo)}>
                                        <Edit2
                                            size="15"
                                            color="black"
                                        />
                                    </button>
                                    <button type="button" className="btn btn-warning" onClick={() => handleDelete(todo)}>
                                        <Trash
                                            size="15"
                                            color="black"
                                        />
                                    </button>
                                    <button type="button" className="btn btn-warning" onClick={() => handleComplted(todo)}>
                                        <ArchiveTick
                                            size="15"
                                            color="black"
                                        />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="col-sm-6">
                <div className="card text-white mb-3" style={{ height: "400px", backgroundColor: "#248277" }}>
                    <div className="card-header">Completed Task</div>
                    <div className="card-body"
                        id="done"
                        draggable
                        onDrop={handleOnDrop}
                        onDragOver={handleDragOver}>
                        {closed.map((todo) => (
                            <div className="input-group mb-3"
                                key={todo.id}
                                onDragStart={() => handleOnDrag(todo)}
                                draggable
                            >
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder='Enter a Task'
                                    value={todo.title}
                                    disabled
                                />
                                <div className="btn-group" role="group" aria-label="Basic mixed styles example">
                                    <button type="button" className="btn btn-warning" onClick={() => handleEdit(todo)}>
                                        <Edit2
                                            size="15"
                                            color="black"
                                        />
                                    </button>
                                    <button type="button" className="btn btn-warning" onClick={() => handleDelete(todo)}>
                                        <Trash
                                            size="15"
                                            color="black"
                                        />
                                    </button>
                                    <button type="button" className="btn btn-warning" onClick={() => handleComplted(todo)}>
                                        <ArchiveTick
                                            size="15"
                                            color="black"
                                        />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TodosList