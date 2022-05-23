// import axios from "axios";
// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// export const fetchchats = createAsyncThunk('chats/fetchchats', async () => {
//     const response = await axios.get('http://localhost:5000/api/chats');
//     return response.data;
// })

// export const addchat = createAsyncThunk('chats/addchat', async initialchat => {
//     const response = await axios.chat('http://localhost:5000/api/chats', initialchat)
//     return response.data
// })

// export const removechat = createAsyncThunk('chat/removechat', async chatId => {
//     await axios.delete(`http://localhost:5000/chats/${chatId}`)
//     return chatId
// })

// export const edittchat = createAsyncThunk('chat/editchat', async (payload) => {
//     const {id} = payload
    
//     const response = await axios.put(`http://localhost:5000/chats/${id}`, payload)
//     return response.data
// })

// const initialState = {
//     chats: [],
//     status: 'idle',
//     error: null
// }

// const chatsSlice = createSlice({
//     name: 'chats',
//     initialState,
//     reducers: {
//         chatAdded: (state, action) => {
//             state.chats.push(action.payload)
//         },
//         deletechat: (state, action) => state.chats.filter((chat) => chat.id !== action.payload),
//         chatUpdate: (state, action) => {
//             const { id, title, content } = action.payload
//             const existingchat = state.chats.find((chat) => chat.id === id)
//             if (existingchat) {
//                 existingchat.title = title
//                 existingchat.content = content
//             }
//         }
//     },
//     extraReducers(builder) {
//         builder
//             .addCase(fetchchats.pending, (state, action) => {
//                 state.status = 'loading'
//             })
//             .addCase(fetchchats.fulfilled, (state, action) => {
//                 state.status = 'succeeded'
//                 // Add any fetched chats to the array
//                 state.chats = action.payload
//             })
//             .addCase(fetchchats.rejected, (state, action) => {
//                 state.status = 'failed'
//                 state.error = action.error.message
//             })
//             .addCase(addchat.fulfilled, (state, action) => {
//                 state.chats.push(action.payload)
//             })
//             .addCase(removechat.fulfilled, (state, action) => {
//                 state.chats = state.chats.filter(chat => chat.id !== action.payload)
//                 console.log(action.payload)
//             })
//             .addCase(edittchat.fulfilled, (state, action) => {
//                 const id = action.payload.id
//                 const newTitle = action.payload.title
//                 const newContent = action.payload.content

//                 state.chats = state.chats.map((chat => chat.id === id ? {
//                     ...chat, title: newTitle, content: newContent
//                 } : chat))
//             })
//     }
// })

// export const { chatAdded, deletechat, chatUpdate } = chatsSlice.actions

// export const selectAllchats = state => state.chats.chats

// export const selectchatBtId = (state, chatId) => state.chats.chats.find(chat => chat.id === chatId)

// export default chatsSlice.reducer

// import axios from "axios";
// // import socket from '../socket';

// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// export const fetchUsers = createAsyncThunk('posts/fetchPosts', async () => {
//     const response = await axios.get('http://localhost:5000/api/users/getusers/');
//     return response.data;
// })

// export const fetchUser = createAsyncThunk('post/removePost', async id => {
//     const response = await axios.get(`http://localhost:5000/users/getUser/${id}`)
//     return response.data
// })

// export const addUser = createAsyncThunk('posts/addPost', async initialPost => {
//     const response = await axios.post('http://localhost:5000/api/users/register', initialPost)
//     return response.data
// })

// export const loginUser = createAsyncThunk('posts/addPost', async loginPost => {
//     const response = await axios.post('http://localhost:5000/api/users/login', loginPost)
//     return response.data
// })

// const initialState = {
//     users: [],
//     user:[],
//     loginResponse: '',
//     registerResponse:'',
//     status: 'idle',
//     error: null
// }

// const usersSlice = createSlice({
//     name: 'users',
//     initialState,
//     reducers: {
        
//     },
//     extraReducers(builder) {
//         builder
//             .addCase(fetchUsers.pending, (state, action) => {
//                 state.status = 'loading'
//             })
//             .addCase(fetchUsers.fulfilled, (state, action) => {
//                 state.status = 'succeeded'
//                 // Add any fetched posts to the array
//                 state.users = action.payload
//             })
//             .addCase(fetchUsers.rejected, (state, action) => {
//                 state.status = 'failed'
//                 state.error = action.error.message
//             })
//             .addCase(addUser.pending, (state, action) => {
//                 state.status = 'loading'
//             })
//             .addCase(addUser.fulfilled, (state, action) => {
//                 state.status = 'succeeded'
//                 state.registerResponse = action.payload
//             })
//             .addCase(addUser.rejected, (state, action) => {
//                 state.status = 'failed'
//                 state.error = action.error.message
//             })
//             .addCase(fetchUser.fulfilled, (state, action) => {
//                 state.user = action.payload
//             })
//     }
// })


// export const selectAllUsers = state => state.users.users

// export const selectUser = state => state.users.user

// export default usersSlice.reducer
