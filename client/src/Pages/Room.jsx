import { useEffect, useState } from "react";
import SideBar from "../components/SideBar.jsx";
import { socket } from "../socket.js";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import ChatBoard from "../components/ChatBoard.jsx";

export default function Room() {
    const {token,fullName, profileImage, id} = useSelector((state) => state.userSlice);
    const roomId = useParams().roomId;
    
    const [roomData, setRoomData] = useState({});
    const [receivedMessages, setReceivedMessages] = useState([]);
    const [joinedUsers,setJoinedUsers] = useState([]);
    
    useEffect(() => {
        async function getRoomData() {
            try {
                const response = await fetch(
                    `http://localhost:4000/room/room/${roomId}`,
                    {
                        method: "GET",
                        headers: {
                            Accept: "application/json",
                            "Content-Type": "application/json",
                            "auth-token": localStorage.getItem('auth-token'),
                        },
                    }
                );
                const data = await response.json();
                setRoomData(data.data);
                handleJoinRoom(data.data.name);
            } catch (error) {
                console.log(error);
            }
        }
        
        getRoomData();
    }, [roomId]);
    
    useEffect(() => {
        function handleMessage(message) {
            setReceivedMessages((prevMessages) => [...prevMessages, {...message, time:new Date().toLocaleTimeString()}]);
        }
        
        function handleJoinUser(users){
            setJoinedUsers(users)
        }
        
        socket.on("message", handleMessage);
        
        socket.on('take-users',handleJoinUser);
        
        return () => {
            socket.off("message", handleMessage);
            socket.off('take-users',handleJoinUser);
        };
    }, []);
    
    function handleJoinRoom(room) {
        socket.emit("join", {room,fullName,token});
        socket.emit('get-users');
    }
    
    function handleLeaveRoom(){
        socket.emit('leave',roomData.name);
    }

    return (
        <div className="bg-blue-500 h-[89.8vh] w-screen flex justify-start item-start">
            <SideBar profiles={joinedUsers} roomName={roomData.name} leaveRoom={handleLeaveRoom}/>
            <ChatBoard messages={receivedMessages} room={roomData.name} fullName={fullName}/>
        </div>
    );
}
