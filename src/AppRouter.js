import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import App from './App.js';
import Day2 from './Day2.js';
import Day1 from './Day1.js';
import Day3 from './Day3.js';
import Day4 from "./Day4";
import Day5 from "./Day5";
import Day6 from "./Day6";
import Day7 from "./Day7";
import Day8 from "./Day8";
import Day9 from "./Day9";
import Day10 from "./Day10";
import CartPage from './CartPage';
import Authentication from './Authentication.js';
import EditPost from './EditPost.js';
import CurrencyConverter from "./CurrencyConverter";
const AppRouter =()=>{
    return(
        <Router>
        <Routes>
        <Route path='/day2' element={<Day2></Day2>}></Route>
        <Route path='/'     element={<App></App>}></Route>
        <Route path='/auth' element={<Authentication></Authentication>}></Route>
        <Route path='/day1' element={<Day1></Day1>}></Route>
        <Route path='/day3' element={<Day3></Day3>}></Route>
        <Route path='/day4' element={<Day4></Day4>}></Route>
        <Route path='/day5' element={<Day5></Day5>}></Route>
        <Route path='/day6' element={<Day6></Day6>}></Route>
        <Route path='/day7' element={<Day7></Day7>}></Route>
        <Route path='/day8' element={<Day8></Day8>}></Route>
        <Route path='/profile' element={<Day9></Day9>}></Route>
        <Route path='/products' element={<Day10></Day10>}></Route>
        <Route path='/cart' element={<CartPage></CartPage>}></Route>
        <Route path="/converter" element={<CurrencyConverter />} />
        <Route path='/edit/:id' element={<EditPost></EditPost>}></Route>
        </Routes>
        </Router>
      
    )
}
export default AppRouter;