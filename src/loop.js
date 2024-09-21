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

import EditPost from './EditPost.js';

const routes = [
    { path: '/', component: App },
    { path: '/day1', component: Day1 },
    { path: '/day2', component: Day2 },
    { path: '/day3', component: Day3 },
    { path: '/day4', component: Day4 },
    { path: '/day5', component: Day5 },
    { path: '/day6', component: Day6 },
    { path: '/day7', component: Day7 },
    { path: '/day8', component: Day8 },
    { path: '/day9', component: Day9 },
    { path: '/edit/:id', component: EditPost },
];

const AppRouter = () => {
    return (
        <Router>
            <Routes>
                {routes.map(({ path, component: Component }) => (
                    <Route key={path} path={path} element={<Component />} />
                ))}
            </Routes>
        </Router>
    );
};

export default AppRouter;
