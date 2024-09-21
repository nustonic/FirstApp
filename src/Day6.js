import { useEffect, useState } from "react";
function BasicForm() {
    const [name, setName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`Send that name: ${name}`);
    };
    // const handleInputChange = (e) => {
    //     setName(e.target.value);
    // };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder='Please input your name' onChange={(e) => setName(e.target.value)} value={name}>
                </input>
                <button>Submit</button>
            </form>
        </div>
    )
}
const MultipleInputsForm = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: ''
    })
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    const handleSubmitData = (e) => {
        e.preventDefault();
        alert(`data sent: ${JSON.stringify(formData)}`)
    }
    return (
        <div>
            <form onSubmit={handleSubmitData}>
                <input name="firstName" placeholder="Name" value={formData.firstName} onChange={handleChange}></input>
                <input name="lastName" placeholder="LastName" value={formData.lastName} onChange={handleChange}></input>
                <input name="email" placeholder="Email" value={formData.email} onChange={handleChange}></input>
                <button type="submit" >Submit</button>
            </form>
        </div>
    )
}
const SelectAndRadio = () => {
    const [selectedFruit, setSelectFruit] = useState('');
    const [gender, setGender] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <select value={selectedFruit} onChange={(e) => setSelectFruit(e.target.value)}>
                    <option value=''>Chose Fruit</option>
                    <option value='apple'>Apple</option>
                    <option valu='banana'>Banana</option>
                    <option value='Orange'>Orange</option>
                    <option value='Mango'>Mango</option>
                </select>

                {selectedFruit && <h4>you select: {selectedFruit}</h4>}

                <div>
                    <input onChange={(e) => setGender(e.target.value)} type="radio" id="male" name="gender" value="male"></input>
                    <label>Male</label>
                    <input onChange={(e) => setGender(e.target.value)} type="radio" id="female" name="gender" value="female"></input>
                    <label>Female</label>
                </div>
                {gender && <h4>you select: {gender}</h4>}
                <button type="submit">send Data</button>
            </form>
        </div>
    )
}
const ProductSearch = () => {
    const [sortOrder, setSortOrder] = useState('asc');
    const [priceFilter, setPriceFilter] = useState({ min: '', max: '' });
    const [SearchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemPerPage = 3;

    const products = [{
        id: 1, name: 'Mobile', price: 5
    }, {
        id: 2, name: 'iPhone18', price: 10

    },
    {
        id: 3, name: 'Speaker', price: 20

    },
    {
        id: 4, name: 'Laptop', price: 6

    },
    {
        id: 5, name: 'Camera', price: 8

    },
    {
        id: 6, name: 'charger', price: 6

    },
    {
        id: 7, name: 'Bluetooth', price: 8

    },
    ]
    const [results, setResults] = useState([...products]);
    useEffect(() => {
        handleSearch();
    }, [sortOrder, priceFilter, currentPage])

    const handleSearch = () => {

        let filterProducts = products.filter((product) => product.name.toLowerCase().includes(SearchTerm.toLowerCase()));

        if (priceFilter.min != '') {
            filterProducts = filterProducts.filter(
                (product) => product.price >= parseInt(priceFilter.min)
            )
        }
        if (priceFilter.max != '') {
            filterProducts = filterProducts.filter(
                (product) => product.price <= parseInt(priceFilter.max)
            )
        }
        filterProducts.sort((a, b) => {
            return sortOrder === 'asc' ? a.price - b.price : b.price - a.price;
        });
        setResults(filterProducts);
    }
    const handleSortChange = (e) => {
        setSortOrder(e.target.value);
    }
    const handlePriceFilterChange = (e) => {
        setPriceFilter({ ...priceFilter, [e.target.name]: [e.target.value] });
    }

    const indexOfLastItem = currentPage * itemPerPage;
    const indexOfFirstItem = indexOfLastItem - itemPerPage;
    const currentItems = results.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(results.length / itemPerPage);

    return (
        <div>

            <form onSubmit={(e) => { e.preventDefault(); handleSearch(); }}>
                <input type='text' value={SearchTerm} onChange={(e) => setSearchTerm(e.target.value)}></input>
                <button type="submit">Search</button>

            </form>
            <div>
                <label>
                    Sort by price: <select onChange={handleSortChange}>
                        <option value='asc'>Low-hight</option>
                        <option value='desc'>hight-low</option>
                    </select>
                </label>
            </div>

            <div>
                <label>Min price: <input type="number" name="min" value={priceFilter.min} onChange={handlePriceFilterChange}></input></label>
                <label>Max price: <input type="number" name="max" value={priceFilter.max} onChange={handlePriceFilterChange}></input></label>
            </div>
            <ul>
                {currentItems.map((product, index) => (
                    <li key={product.id}>
                        {index + 1}. {product.name}, Price: {product.price} LAK
                    </li>
                ))}

            </ul>
            <div>
                <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1}>Previous</button><span> Page {currentPage} OF {totalPages} </span>
                <button onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>Next</button>
            </div>
        </div>
    )
}
function Day6() {
    return (<div className="container">
        <h1> Form and controlled component</h1>
        <h2>Basic Form</h2>
        <BasicForm></BasicForm><hr></hr>
        <h2>Multiple Input form</h2>
        <MultipleInputsForm></MultipleInputsForm><hr></hr>
        <h2>Radio and Dropdown Select</h2>
        <SelectAndRadio></SelectAndRadio><hr></hr>
        <h2>Product Search System</h2>
        <ProductSearch></ProductSearch>
        <style jsx>
            {`
        .container{
            padding: 20px;
            max-width: 800px;
            // text-align: center;
            margin: 0 auto;
        }
        form{
            margin-bottom:20px;
        }
        input, select {
            margin:5px;
            padding: 5px;
        }
           form button {
           background-color: #669cd1;
            margin-top: 10px;
            padding: 5px 10px;
            color:white;
            
            border:none;
            cursor: pointer;
            }
            .error {
            color: red;
            font-size: 20px;
            }
            ul {
            list-style-type: none;
            padding: 0;

            }
            li {
            margin:5px 0;
            padding:5px;
            background-color: #f0f0f0;
            border-radius: 3px;

            }
        `}
        </style>
    </div>
    );

}
export default Day6;
