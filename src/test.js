import { useState } from "react";

const TodoList = () => {
    const [todos, setTodos] = useState([
        { text: 'learn React', completed: false },
        { text: 'create todo list', completed: false },
        { text: 'practice list & keys', completed: false },
    ]);

    const [newTodo, setNewTodo] = useState('');

    const onToggleTodo = (index) => {
        const newTodos = [...todos];
        newTodos[index].completed = !newTodos[index].completed;
        setTodos(newTodos);
    };

    const handleInputChange = (e) => {
        setNewTodo(e.target.value);
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (newTodo.trim()) {
            setTodos([...todos, { text: newTodo, completed: false }]);
            setNewTodo(''); // Clear the input field
        }
    };

    return (
        <div>
            <h2>To do List</h2>
            <form onSubmit={handleFormSubmit}>
                <input
                    type="text"
                    placeholder="Add New list..."
                    value={newTodo}
                    onChange={handleInputChange}
                />
                <button type="submit">Add</button>
            </form>
            <ul>
                {todos.map((todo, index) => (
                    <li
                        key={index}
                        onClick={() => onToggleTodo(index)}
                        style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
                    >
                        {todo.text}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TodoList;
