import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../store/slices/themeSlice.js";

const ToggleThemeBtn = ({className = ""}) => {
    const dispatch = useDispatch();
    const theme = useSelector((state) => {
        return state.themeSlice.theme;
    });

    return (
        <button className={className} onClick={() => dispatch(toggleTheme())}>
            Switch to {theme !== "light" ? "Dark" : "Light"} Mode
        </button>
    );
};

export default ToggleThemeBtn;
