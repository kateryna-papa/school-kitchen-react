import UserPage from "./UserPage";
import KitchenPage from "./KitchenPage";
import {Link, Route, Routes, BrowserRouter as Router} from "react-router-dom";

function App() {

    return (
        <Router>
        <div className="App">
            <Link to="/"></Link>
            <Link to="/kitchen"></Link>
            <Routes>
                <Route exact path="/" element={<UserPage/>}/>
                <Route path="/kitchen" element={<KitchenPage/>}/>
            </Routes>
        </div>
        </Router>
    );
}

export default App;
