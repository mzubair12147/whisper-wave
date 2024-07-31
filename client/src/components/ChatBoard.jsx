import { useState, useEffect, useRef } from "react";
import MessageBox from "./MessageBox";
import { socket } from "../socket";

export default function ChatBoard({ messages, room, fullName}) {
    const [message, setMessage] = useState("");
    const endOfMessagesRef = useRef(null);

    useEffect(function () {
        function handleEnterKeyDown(event) {
            if (event.key === "Enter") {
                handleSendMessage();
            }
        }
        document.addEventListener("keydown", handleEnterKeyDown);
        return ()=>{
            document.removeEventListener('keydown', handleEnterKeyDown);
        }
    }, []);

    function handleMessageChange(e) {
        setMessage(e.target.value);
    }

    function handleSendMessage() {
        if (!message.trim()) {
            return ;
        }
        console.log('send message');
        socket.emit("message", { room, fullName, message });
        setMessage("");
    }

    useEffect(() => {
        endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <div className="flex flex-col h-full bg-white w-[70%]">
            <div className="flex-1 overflow-y-auto overflow-x-hidden bg-violet-300 px-14 py-5 w-full scrollbar-hide">
                <div className="flex flex-col gap-3 scrollbar-hide">
                    {messages.map((msg, index) => (
                        <MessageBox
                            key={index}
                            userMessage={msg.user === socket.id}
                            message={msg.message}
                            name={msg.name}
                            time={msg.time}
                        />
                    ))}
                    <div ref={endOfMessagesRef} /> {/* Scroll marker */}
                </div>
            </div>
            <div className="bg-violet-300 p-4 border-t border-violet-200">
                <div className="flex gap-4">
                    <input
                        className="flex-1 border rounded-xl p-2 text-lg"
                        type="text"
                        value={message}
                        placeholder="Enter Message"
                        onChange={handleMessageChange}
                    />
                    <button
                        className="bg-violet-900 text-white px-4 py-2 rounded-xl hover:bg-violet-700"
                        onClick={handleSendMessage}
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
}
