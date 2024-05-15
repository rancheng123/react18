import { configureStore } from "@reduxjs/toolkit";

import collectionRducer from "./module/collectionSlice";

export default configureStore({
    reducer: {
        collectionRducer,
    },
});