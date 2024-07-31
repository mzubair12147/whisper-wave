/* eslint-disable react/prop-types */
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authenticateUser } from "../store/slices/userSlice";

export default function LoginRegister({ type }) {
    const [state, setState] = useState({
        fullName: "",
        email: "",
        password: "",
        username: "",
    });

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleValueChange = (e) => {
        setState((state) => {
            return { ...state, [e.target.name]: e.target.value };
        });
    };

    const handleSubmit = async () => {
        let responseData;

        await axios
            .post(`http://localhost:4000/user/${type}`, state)
            .then((response) => {
                responseData = response.data;
            })
            .catch((error) => alert(error.message));
        if (responseData.success) {
            localStorage.setItem("auth-token", responseData.token);
            const userData = {
                ...state,
                ...responseData.resData,
                token: responseData.token,
                profileImage: `http://localhost:4000/file/profile-image/${responseData.resData.id}`,
            };
            dispatch(authenticateUser(userData));
            localStorage.setItem("user-data", JSON.stringify(userData));
            navigate("/");
        } else {
            alert(responseData.message);
        }
    };

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img
                    alt="Your Company"
                    src="/logo.png"
                    className="mx-auto h-10 w-auto"
                />
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    {type === "login"
                        ? "Login in to your account"
                        : "Create a new Account"}
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <div className="space-y-3">
                    {type === "register" && (
                        <>
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Full Name
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="fullName"
                                        name="fullName"
                                        type="text"
                                        required
                                        autoComplete="true"
                                        value={state.fullName}
                                        onChange={handleValueChange}
                                        className="block w-full rounded-md border-0 py-2 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    User Name
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="username"
                                        name="username"
                                        type="text"
                                        required
                                        autoComplete="false"
                                        value={state.username}
                                        onChange={handleValueChange}
                                        className="block w-full rounded-md border-0 py-2 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                        </>
                    )}
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            Email address
                        </label>
                        <div className="mt-2">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                autoComplete="email"
                                value={state.email}
                                onChange={handleValueChange}
                                className="block w-full rounded-md border-0 py-2 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between mb-3">
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Password
                            </label>
                        </div>
                        <div className="mt-2">
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                autoComplete="current-password"
                                value={state.password}
                                onChange={handleValueChange}
                                className="block w-full rounded-md border-0 py-2 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="mt-7 flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 px-4 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            onClick={() => handleSubmit()}
                        >
                            Sign in
                        </button>
                    </div>
                </div>
                <p className="mt-4 text-center text-sm text-gray-500">
                    {type === "register" && (
                        <p style={{ cursor: "pointer" }}>
                            Already have an account? then{" "}
                            <Link
                                className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                                to="/login"
                            >
                                Login
                            </Link>
                        </p>
                    )}
                    {type === "login" && (
                        <p style={{ cursor: "pointer" }}>
                            Do not have an account?{" "}
                            <Link
                                className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                                to="/register"
                            >
                                register
                            </Link>
                        </p>
                    )}
                </p>
            </div>
        </div>
    );
}

/* <label
                        htmlFor="email"
                        className="block text-sm font-medium leading-6 text-gray-900"
                    >
                        Choose Profile Image
                    </label>
                    <input
                        type="file"
                        name="profileImage"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="mb-4 p-2 border rounded-md ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 w-full"
                    />
                    {preview && (
                        <img
                            src={preview}
                            alt="Image Preview"
                            className="w-48 h-auto mb-4 border rounded p-2 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 w-full"
                        />
                    )}*/

// const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//         setSelectedImage(file);
//         const reader = new FileReader();
//         reader.onloadend = () => {
//             setPreview(reader.result);
//         };
//         reader.readAsDataURL(file);
//     }
// };

// const [selectedImage, setSelectedImage] = useState(null);
// const [preview, setPreview] = useState(null);

// <div>
//     <form action={`http://localhost:4000/user/${type}`} method="post">
//         {type === "register" && (<>
//             <input type="text" name="fullName" id="full-name" placeholder="Enter your Full Name" />
//             <input
//                 type="text"
//                 name="username"
//                 id="username"
//                 placeholder="Enter your username"
//             />
//         </>
//         )}
//         <input
//             type="email"
//             id="email"
//             name="email"
//             placeholder="Enter your Email"
//         />
//         <input
//             type="password"
//             id="password"
//             name="password"
//             placeholder="Enter your password"
//         />
//         <button type="submit">
//             {type === "login" ? "Login" : "register"}
//         </button>
//     </form>
//     {type === "register" && (
//         <p style={{cursor:'pointer'}}>
//             Already have an account? then{" "}
//             <Link to='/login'>Login</Link>
//         </p>
//     )}
//     {type === "login" && (
//         <p style={{cursor:'pointer'}}>
//             Do not have an account? {" "}
//             <Link to='/register'>register</Link>
//         </p>
//     )}
// </div>
