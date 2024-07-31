import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setCurrentRoom, updateRooms } from "../store/slices/roomSlice";

export default function RoomList() {
    const authenticated = useSelector((state) => state.userSlice.authenticated);
    const rooms = useSelector((state) => state.roomSlice.rooms);

    const [state, setState] = useState("show-rooms");
    const [message, setMessage] = useState("");
    const [formData, setFormData] = useState({
        name: "",
        description: "",
    });

    const dispatch = useDispatch();
    const defaultProfileImage = "default_user_image.jpg";

    async function getRooms() {
        try {
            const response = await fetch(
                "http://localhost:4000/room/all-rooms",
                {
                    method: "GET",
                    headers: {
                        Accept: "application/form-data",
                        "auth-token": `${localStorage.getItem("auth-token")}`,
                        "Content-Type": "application-json",
                    },
                }
            );

            const data = await response.json();

            if (data.success && data.data) {
                dispatch(updateRooms(data.data));
            } else if (data.success && !data.data) {
                setState("create");
            } else {
                setState("failed");
            }
        } catch (error) {
            setState("failed");
        }
    }

    useEffect(function () {
        getRooms();
    }, []);

    async function handleRoomCreate() {
        const { name, description } = formData;
        if (!name || !description) {
            setMessage("Please provide all the required fields");
            return;
        }
        try {
            const response = await fetch(
                "http://localhost:4000/room/create-room",
                {
                    method: "POST",
                    headers: {
                        Accept: "application/form-data",
                        "auth-token": `${localStorage.getItem("auth-token")}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        name: formData.name,
                        description: formData.description,
                    }),
                }
            );

            const data = await response.json();
            console.log(data);
            if (data.success) {
                setMessage("Room Created Successfully");
                setTimeout(() => {
                    getRooms();
                    setState("show-rooms");
                }, 2000);
            } else {
                setState(data.message);
            }
        } catch (error) {
            setState("failed");
        }
    }
    async function removeRoom(roomId) {
        await fetch(`http://localhost:4000/room/delete-room/${roomId}`, {
            method: "DELETE",
            headers: {
                "auth-token": localStorage.getItem("auth-token"),
            },
        })
            .then((response) =>{console.log(response); return  response.json()})
            .then((data) => {
                if (data.success) {
                    getRooms();
                }
            })
            .catch((error) => {
                console.log(error.message);
            });
    }

    function handleRemoveRoom(roomId) {
        const confirm = window.confirm(
            "Do you really want to delete the room?"
        );
        if (confirm) {
            removeRoom(roomId);
        }
    }

    function handleChangeValue(e) {
        setFormData((data) => {
            return { ...data, [e.target.name]: e.target.value };
        });
    }

    function handleChangeCrete() {
        setState("create-room");
    }

    function handleChangeState() {
        setState("create-room");
    }

    return (
        <div>
            {authenticated ? (
                <div className="from-black to-violet-900 bg-gradient-to-br h-[89.8vh] w-screen flex justify-center items-center">
                    <div className="h-[80%] w-[70%] bg-zinc-50 rounded-lg py-8 px-10 flex flex-col justify-start items-center">
                        <div className="px-2.5 w-full flex justify-between mb-[-10px]">
                            <h1 className="font-bold text-5xl text-slate-900">
                                {state === "create-room"
                                    ? "Create Room"
                                    : "Rooms"}
                            </h1>
                            {state === "show-rooms" && (
                                <button
                                    onClick={handleChangeState}
                                    className="py-2.5 px-5 rounded-xl bg-violet-900 text-white hover:cursor-pointer hover:opacity-85"
                                >
                                    Create Room
                                </button>
                            )}
                        </div>
                        <div className=" w-[100%] flex-1 border-2 border-transparent border-t-zinc-900 mt-8">
                            <div className="flex relative flex-col gap-4 justify-center items-center h-full ">
                                {state === "create" && (
                                    <>
                                        <p className="text-xl">
                                            There are currently no rooms in the
                                            server
                                        </p>
                                        <button
                                            onClick={() => handleChangeCrete()}
                                            className="py-2.5 px-5 rounded-xl bg-violet-900 text-white hover:cursor-pointer hover:opacity-85"
                                        >
                                            Create Room
                                        </button>
                                    </>
                                )}
                                {state === "failed" && (
                                    <p className="text-red-600 text-2xl">
                                        Failed to fetch rooms
                                    </p>
                                )}
                                {state === "create-room" && (
                                    <>
                                        <p className="text-2xl">{message}</p>
                                        <label className="self-start ml-20 mb-[-10px]">
                                            Room Name
                                        </label>
                                        <input
                                            className="peer w-[80%] border border-black  text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2  focus: text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
                                            placeholder=" Enter Room Name "
                                            name="name"
                                            required
                                            value={formData.name}
                                            onChange={handleChangeValue}
                                        />

                                        <label className="self-start ml-20  mb-[-10px]">
                                            Description
                                        </label>
                                        <textarea
                                            className="peer w-[80%] border border-black  text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200  focus:border-2  focus: text-sm px-3 py-2.5 rounded-[7px]  focus:border-gray-900"
                                            placeholder=" Enter Room Description "
                                            name="description"
                                            required
                                            value={formData.description}
                                            onChange={handleChangeValue}
                                        />
                                        <button
                                            onClick={() => handleRoomCreate()}
                                            className="py-2.5 px-5 rounded-xl bg-violet-900 text-white hover:cursor-pointer hover:opacity-85"
                                            type="submit"
                                        >
                                            Create Room
                                        </button>
                                    </>
                                )}
                                {state === "show-rooms" && (
                                    <div className="self-start h-full w-full flex p-5 overflow-y-auto  flex-col gap-2.5 overflow-x-visible">
                                        {rooms.map((room, index) => (
                                            <div key={index} className="grid grid-cols-[95%_5%] items-center ">
                                                <Link
                                                    onClick={() => {
                                                        dispatch(
                                                            setCurrentRoom(room)
                                                        );
                                                    }}
                                                    to={`/room/${room._id}`}
                                                >
                                                    <div className="relative border w-full border-black bg-slate-300 cursor-pointer rounded-xl px-5 py-2.5 flex justify-between transition-all hover:translate-y-[-5px] hover:bg-violet-800 hover:text-white">
                                                        <div>
                                                            <h2 className="font-semibold text-xl">
                                                                {room.name}
                                                            </h2>
                                                            <p className="text-sm ml-2.5 w-[100%] whitespace-nowrap overflow-hidden text-ellipsis">
                                                                {
                                                                    room.description
                                                                }
                                                            </p>
                                                        </div>
                                                        <div className="flex h-full gap-2.5">
                                                            <p className="text-sm text-right">
                                                                Created By{" "}
                                                                <br />{" "}
                                                                <span>
                                                                    {
                                                                        room
                                                                            .createdBy
                                                                            .fullName
                                                                    }
                                                                </span>
                                                            </p>
                                                            <img
                                                                className="rounded-full h-10"
                                                                src={`http://localhost:4000/file/profile-image/${room.createdBy._id}`}
                                                                alt="user image"
                                                                onError={(
                                                                    e
                                                                ) => {
                                                                    e.target.src =
                                                                        defaultProfileImage;
                                                                }}
                                                            />
                                                        </div>
                                                    </div>
                                                </Link>
                                                <svg
                                                    onClick={() => {
                                                        handleRemoveRoom(
                                                            room._id
                                                        );
                                                    }}
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 24 24"
                                                    fill="currentColor"
                                                    class="w-6 z-20 h-6 translate-y-[-30%] ml-[15px] cursor-pointer hover:text-red-600"
                                                >
                                                    <path d="M3 6h18v2H3V6zm2 3h14v13H5V9zm3 0v11h2V9H8zm4 0v11h2V9h-2zM5 4V3h14v1H5z" />
                                                </svg>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="h-full w-full flex justify-center items-center">
                    <p>Sorry you are not authenticated</p>
                </div>
            )}
        </div>
    );
}
