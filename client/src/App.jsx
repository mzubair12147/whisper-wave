import Navbar from "./components/Navbar.jsx";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home.jsx";
import LoginRegister from "./Pages/LoginRegister.jsx";
import Rooms from "./Pages/Rooms.jsx";
import Room from "./Pages/Room.jsx";
import NotFound from "./components/NotFound.jsx";
import { authenticateUser } from "./store/slices/userSlice.js";

const App = () => {
    const dispatch = useDispatch();
    useEffect(function () {
        let userData = localStorage.getItem("user-data");
        if (userData) {
            userData = JSON.parse(userData);
            dispatch(authenticateUser(userData));
        }
    }, []);

    return (
        <>
            <div>
                <BrowserRouter>
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route
                            path="/login"
                            element={<LoginRegister type="login" />}
                        />
                        <Route
                            path="/register"
                            element={<LoginRegister type="register" />}
                        />
                        <Route path="/rooms" element={<Rooms />} />
                        <Route path="/room/:roomId" element={<Room />} />

                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </BrowserRouter>
            </div>
        </>
    );
};

export default App;
