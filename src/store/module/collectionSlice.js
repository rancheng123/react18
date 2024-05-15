import { createSlice } from "@reduxjs/toolkit";

export const collectionSlice = createSlice({
    name: "collection",
    initialState: {
        collectionList: [],
    },
    reducers: {
        // 修改收藏数据
        setCollection: (state, action) => {
            state.collectionList = action.payload;
        },
    },
});

export const { setCollection } = collectionSlice.actions;

export default collectionSlice.reducer;
