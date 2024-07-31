import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    id: "",
    username: "",
    fullName: "",
    token: "",
    email: "",
    authenticated: false,
    loggedIn: false,
    isOnline: false,
    profileImage: null,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        authenticateUser: (state, action) => {
            const { id, username, fullName, token, email, profileImage } =
                action.payload;
            state.id = id;
            state.username = username;
            state.fullName = fullName;
            state.email = email;
            state.token = token;
            state.authenticated = true;
            state.loggedIn = true;
            state.profileImage = profileImage;
        },
        updateProfileImage: (state, action) => {
            state.profileImage = action.payload;
        },

        userLogout:(state) =>{
            state = initialState;
        }
    },
});

export const { authenticateUser, updateProfileImage, userLogout } = userSlice.actions;
export default userSlice.reducer;
