import { useState } from "react";

const SampleList = () => {
    const fruits = ['Banana', 'Apple', 'Orange', 'Grape', 'Mango'];
    return (
        <div>
            <h2 id="fruits-h2">Fruits List:</h2>
            <ul>
                {fruits.map((fruit, index) => (
                    <li key={index}>{index + 1}. {fruit}</li>
                ))}
            </ul>
        </div>
    );
};

const ASEANCountries = () => {
    const countries = [
        'Brunei Darussalam', 'Cambodia', 'Indonesia', 'Lao PDR', 
        'Malaysia', 'Myanmar', 'Philippines', 'Singapore', 
        'Thailand', 'Vietnam'
    ];
    return (
        <div>
            <h2>Asean Countries</h2>
            <ul>
                {countries.map((country, index) => (
                    <li key={index}>{index + 1}. {country}</li>
                ))}
            </ul>
            <hr />
        </div>
    );
};

const StudentList = () => {
    const students = [
        { name: 'Somsanouk', class: 'A1', gender: 'Male' },
        { name: 'SomVang', class: 'C1', gender: 'Male' },
        { name: 'N.Somsy', class: 'A1', gender: 'Female' }
    ];

    return (
        <div>
            <h2>List Of Students</h2>

            <h4>Show data Index = 1</h4>
            <ul>
                {students.map((student, index) => (
                    index === 1 && (
                        <li key={index}>{index}. {student.name}, Class: {student.class}</li>
                    )
                ))}
            </ul>
            <hr />
            <h3>Show All data List</h3>
            <ul>
                {students.map((student, index) => (
                    <li key={index}>{index + 1}. {student.name}, Class: {student.class}</li>
                ))}
            </ul>
            <hr />
            <h3>Show data Class A1</h3>
            <ul>
                {students.filter(student => student.class === 'A1').map((student, index) => (
                    <li key={index}>{index + 1}. {student.name}, Class: {student.class}</li>
                ))}
            </ul>
            <h3>Show Female A1</h3>
            <ul>
                {students.filter(student => student.class === 'A1' && student.gender === 'Female').map((student, index) => (
                    <li key={index}>{index + 1}. {student.name}, Class: {student.class}</li>
                ))}
            </ul>
        </div>
    );
};

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
            setNewTodo('');
        }
    };

    return (
        <div>
            <h2>To Do List</h2>
            <form onSubmit={handleFormSubmit}>
                <input 
                    value={newTodo}
                    onChange={handleInputChange} 
                    type="text" 
                    placeholder="Add New List..." 
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

const ImageCarousel = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    return (
        <div className="carousel">
            <h2>Image Carousel</h2>
            <button className="carousel-btn prev" onClick={prevSlide}>&#10094;</button>
            <div className="carousel-images">
                {images.map((image, index) => (
                    <img
                        src={image} 
                        key={index} 
                        alt={`Slide ${index + 1}`}
                        className={`carousel-image ${index === currentIndex ? 'active' : ''}`}
                    />
                ))}
            </div>
            <button className="carousel-btn next" onClick={nextSlide}>&#10095;</button>
        </div>
    );
};

const Day5 = () => {
    const carouselImages = [
        'https://assets.gqindia.com/photos/645c750df0141edcb0cc1771/16:9/w_2560%2Cc_limit/100-best-games-hp-b.jpg',
        'https://www.dsogaming.com/wp-content/uploads/2020/12/Top-10-Best-Optimized-PC-Games-2020.jpg',
        'https://firstsportz.com/wp-content/uploads/2021/05/playerunknowns-battlegrounds-pubg.jpg',
        'https://i.ytimg.com/vi/OtY7LS5CQ1s/maxresdefault.jpg'
    ];

    return (
        <div className="container">
            <p className="p-h">Day 5 Friday</p>
            <TodoList />
            <hr />
            <ImageCarousel images={carouselImages} />
            <hr />
            <SampleList />
            <ASEANCountries />
            <StudentList />
            <style jsx>{`
                .container {
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 20px;
                    display: flex;
                    flex-direction: column;
                    align-items: start;
                    min-height: 100vh;
                    background-color: #7d96b8;
                    background-image: url("https://papers.co/wallpaper/papers.co-vy76-wave-color-purple-pattern-background-34-iphone6-plus-wallpaper.jpg");
                    text-align: start;
                    border-radius: 20px;
                }
               
                ul {
                    list-style-type: none;
                    padding: 0;
                    color: #225e8c;
                    font-weight: bold;
                }

                li {
                    margin-bottom: 10px;
                    padding: 10px;
                    background-color: #f0f0f0;
                    border-radius: 5px;
                }

                #fruits-h2 {
                    color: white;
                }

                .p-h {
                    color: white;
                }

                hr {
                    color: black;
                    width: 100%;
                }

                form button {
                    margin-left: 10px;
                    cursor: pointer;
                    padding: 5px 10px;
                    color: white;
                    border: none;
                    background-color: #ff4444;
                    border-radius: 3px;
                }

                .carousel {
                    position: relative;
                    width: 100%;
                    max-width: 600px;
                    margin: 0 auto;
                }

                .carousel-images {
                    position: relative;
                }

                .carousel-image {
                    width: 100%;
                    height: auto;
                    display: none;
                }

                .carousel-image.active {
                    display: block;
                }

                .carousel-btn {
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);
                    background-color: rgba(0, 0, 0, 0.5);
                    color: white;
                    border: none;
                    padding: 10px 15px;
                    cursor: pointer;
                    font-size: 18px;
                    z-index: 2;
                    transition: background-color 0.3s ease;
                }

                .carousel-btn:hover {
                    background-color: rgba(0, 0, 0, 0.7);
                }

                .prev {
                    left: 10px;
                }

                .next {
                    right: 10px;
                }
            `}</style>
        </div>
    );
};

export default Day5;
