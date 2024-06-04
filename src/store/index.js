import { configureStore } from "@reduxjs/toolkit";

import userStore from "./module/userStore";

export default configureStore({
    reducer: {
        userStore
    },
});