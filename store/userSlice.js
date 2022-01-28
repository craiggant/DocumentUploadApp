import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DefaultLinks, UserLinks } from '../helper/NavigationLinks';
import { fetchUser } from '../API/userAPI';

const initialState = {
	user: { userId: '', fName: '', lName: '', email: '', role: '' },
	links: DefaultLinks,
	status: 'notLoggedIn',
};

export const getUser = createAsyncThunk(
	'user/getUser',
	async (userCredentials) => {
		const response = await fetchUser(userCredentials);
		// The value we return becomes the `fulfilled` action payload
		return response;
	}
);

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		// as a note: it looks like this state is mutable, but it is not. This package uses immer, which allows for a bit nicer syntax while maintaing immutable state.
		resetUser: (state) => {
			state.user = initialState.user;
			state.links = DefaultLinks;
			state.status = 'notLoggedIn';
			// please see note below about local storage. This is just for this demonstration. This would not be something to use to persist data in a production app.
			localStorage.removeItem('user');
		},
		setUser: (state, action) => {
			const { user, links, status } = JSON.parse(action.payload);
			state.user = user;
			state.links = links;
			state.status = status;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getUser.pending, (state) => {
				state.status = 'pending';
			})
			.addCase(getUser.fulfilled, (state, action) => {
				state.status = 'loggedIn';
				state.user = action.payload;
				state.links = UserLinks;
				// add to local storage. This is something I would NOT do in a real life scenario. it is just to help persist state in for this example application
				localStorage.setItem('user', JSON.stringify(state));
			})
			.addCase(getUser.rejected, (state) => {
				state.status = 'notLoggedIn';
			});
	},
});

export const selectUser = (state) => state.user.user;
export const selectLinks = (state) => state.user.links;

export const { resetUser, setUser } = userSlice.actions;

export default userSlice.reducer;
