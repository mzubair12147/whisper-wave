import { Disclosure } from "@headlessui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { updateProfileImage, userLogout } from "../store/slices/userSlice";

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

export default function NavBar() {
    const [showDropDown, setShowDropDown] = useState(false);
    const user = useSelector((state) => state.userSlice);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const defaultProfileImage = "default_user_image.jpg";

    useEffect(function(){
        function closeDropDown(){
            if(showDropDown){
                setShowDropDown(false);
            }
        }
        document.addEventListener('click',closeDropDown)
        return () => {
            document.removeEventListener('click',closeDropDown);
        }
    },[])

    async function handleProfileUpload(e) {
        const file = e.target.files[0];

        if (file) {
            const formData = new FormData();
            formData.append("profileImage", file);

            await fetch("http://localhost:4000/file/upload", {
                method: "POST",
                headers: {
                    "auth-token": user.token,
                },
                body: formData,
            })
                .then((response) => {
                    if (response.ok) {
                        dispatch(
                            updateProfileImage(
                                `http://localhost:4000/file/profile-image/${user.id}`
                            )
                        );
                        console.log('profile image is updated');
                        window.location.reload();
                    }
                })
                .catch((error) => console.log(error));
        }
    }

    function handleLogOut() {
        dispatch(userLogout());
        localStorage.removeItem("auth-token");
        localStorage.removeItem("user-data");
        navigate("/"); 
        window.location.reload();
    }

    function handleDropDown() {
        setShowDropDown(!showDropDown);
    }

    return (
        <Disclosure as="nav" className="bg-gray-800 z-[10000] ">
            <div className="mx-auto w-full px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                    <Link to="/">
                        <div className="flex items-center justify-center sm:items-stretch sm:justify-start">
                            <div className="flex flex-shrink-0 items-center">
                                <img
                                    alt="Your Company"
                                    src="/logo.png"
                                    className="h-10 w-auto"
                                />
                            </div>
                        </div>
                    </Link>

                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                        {showDropDown && (
                            <ul className="z-10 absolute rounded-xl top-[85%] right-0 h-[15vh] w-[15%] text-white bg-gray-700 list-none flex flex-col justify-center items-center text-base">
                                <li className="py-[1.75vh] relative overflow-hidden">
                                    <input
                                        type="file"
                                        name="profileImage"
                                        onChange={handleProfileUpload}
                                        className="absolute opacity-0 cursor-pointer"
                                    />
                                    <button
                                        type="button"
                                        className="cursor-pointer"
                                    >
                                        Upload Profile Image
                                    </button>
                                </li>
                                <li
                                    onClick={handleLogOut}
                                    className="border-t-[1px] border-t-white w-full text-center py-[1.75vh] cursor-pointer"
                                >
                                    <Link to="/">Log out</Link>
                                </li>
                            </ul>
                        )}
                        {user.authenticated ? (
                            <div className="flex text-white gap-3 items-center">
                                <h3>{user.fullName}</h3>
                            <div onClick={handleDropDown} className="cursor-pointer rounded-full h-12 w-12 bg-black flex justify-center items-center overflow-hidden">
                                    <img
                                        className="h-full"
                                        src={user.profileImage}
                                        alt="Profile"
                                        onError={(e) => {
                                            e.target.src = defaultProfileImage;
                                        }}
                                        />
                            </div>
                                        </div>
                        ) : (
                            <div className="flex gap-3">
                                <Link
                                    to="/login"
                                    className={classNames(
                                        "bg-gray-900 text-gray-300 hover:bg-gray-700 hover:text-white cursor-pointer",
                                        "rounded-md px-3 py-2 text-sm font-medium"
                                    )}
                                >
                                    Login
                                </Link>

                                <Link
                                    to="/register"
                                    className={classNames(
                                        "bg-gray-900 text-gray-300 hover:bg-gray-700 hover:text-white cursor-pointer",
                                        "rounded-md px-3 py-2 text-sm font-medium"
                                    )}
                                >
                                    Register
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Disclosure>
    );
}
