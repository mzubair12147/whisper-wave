export default function MessageBox({ userMessage, name, message, time }) {
    return (
        <div className={`relative p-3 rounded-xl text-white w-fit max-w-[60%] ${userMessage ? "bg-blue-700 self-end" : "bg-gray-600 border border-blue-700"}`}>
            <img
                className={`absolute rounded-full h-8 w-8 ${userMessage ? "right-[-2.5rem] top-1" : "left-[-2.5rem] top-1"}`}
                src="/default_user_image.jpg"
                alt="user profile"
            />
            <p className="text-yellow-400 text-sm font-semibold">{name}</p>
            <p className="break-words mt-1">{message}</p>
            <p className="text-yellow-400 text-xs font-semibold">{time}</p>
        </div>
    );
}
