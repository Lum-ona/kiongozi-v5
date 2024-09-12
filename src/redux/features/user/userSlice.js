import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    accessToken: null,
    userId : null,
    ageGroup: null,
    aspirancy: null,
    constituency: null,
    county: null,
    email: null,
    name: null,
    phoneNumber: null,
    profilePhotoURL: null,
    politicalParty: null,
    refreshToken: null,
    signature: null,
    username: null,
    ward:null,
    isLoggedIn: false,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.accessToken = action.payload.accessToken;
            state.userId = action.payload.userId;
            state.ageGroup = action.payload.ageGroup;
            state.aspirancy = action.payload.aspirancy;
            state.constituency = action.payload.constituency;
            state.county = action.payload.county;
            state.email = action.payload.email;
            state.name = action.payload.name;
            state.phoneNumber = action.payload.phoneNumber;
            state.profilePhotoURL = action.payload.profilePhotoURL;
            state.politicalParty = action.payload.politicalParty;
            state.refreshToken = action.payload.refreshToken;
            state.signature = action.payload.signature;
            state.username = action.payload.username;
            state.ward = action.payload.ward;
            state.isLoggedIn = true;
        },
        clearUser: (state) => {
            state.accessToken = null;
            state.userId = null;
            state.ageGroup = null;
            state.aspirancy = null;
            state.constituency = null;
            state.county = null;
            state.email = null;
            state.name = null;
            state.phoneNumber = null;
            state.profilePhotoURL = null;
            state.politicalParty = null;
            state.refreshToken = null;
            state.signature = null;
            state.username = null;
            state.ward = null;
            state.isLoggedIn = false;
        }
    }
});

export const { setUser, clearUser } = userSlice.actions;

export const loggedInState = (state) => state.isLoggedIn;

export default userSlice.reducer;