import { createSlice } from "@reduxjs/toolkit";

export const postsSlice = createSlice({
  name: "posts",
  initialState: {
    posts: null,
  },
  reducers: {
    getPost: (state, action) => {
      state.posts = action.payload;
    },
    addPost: (state, action) => {
      state.posts.push(action.payload);
    },
    deletePost: (state, { payload }) => {
      state.posts = state.posts.filter((post) => post.id !== payload);
    },
    addComment: (state, { payload }) => {
      state.posts = state.posts.map((post) => {
        if (post.id === payload[0]) {
          return {
            ...post,
            comments: payload[1],
          };
        } else {
          return post;
        }
      });
    },
  },
});

export const { getPost, addPost, deletePost, addComment } = postsSlice.actions;
export default postsSlice.reducer;
