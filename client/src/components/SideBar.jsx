import { Link } from "react-router-dom";
import RoomUserCard from "./RoomUserCard";

export default function SideBar({ profiles = [], roomName, leaveRoom }) {
    return (
        <div className="w-[30%] flex flex-col px-5 py-2.5 bg-[rgba(31,41,55,.9)] gap-3">
            <Link onClick={()=>{leaveRoom()}} to={"/rooms"}>
                <div className="h-10 w-10 rounded-full bg-white text-3xl flex justify-center items-center">
                    <span className="mt-[-8px] ml-[2px] cursor-pointer">
                        &larr;
                    </span>{" "}
                </div>
            </Link>
              <div className="flex-1 flex flex-col gap-2.5 text-white px-2.5">
                <div className="flex justify-between text-2xl px-2.5 pt-2.5">
                    <h2 className="text-2xl font-semibold">{roomName}</h2>{" "}
                    <span>{profiles.length}</span>
                </div>
                <p className="text-sm pl-3 mt-[-10px]">joined users</p>
                <div className="py-2.5 flex flex-col gap-2.5">
                    {profiles.map((profile,index) => (
                        <RoomUserCard key={index} profile={profile} />
                    ))}
                </div>
            </div>
        </div>
    );
}
