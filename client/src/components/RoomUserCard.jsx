export default function RoomUserCard({ profile }) {
    const { fullName, user: id } = profile;
    if(!fullName ){
        return<></>
    }
    return (
        <div className="w-full bg-slate-300 text-gray-900 rounded-xl px-5 py-2.5">
            <h3 className="font-semibold">{fullName}</h3>
            <p className="text-[12px] w-[20%] overflow-hidden text-nowrap text-ellipsis">{`id: ${id}`}</p>
        </div>
    );
}
