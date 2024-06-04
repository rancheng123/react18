import { createSlice } from "@reduxjs/toolkit";
import { getTokenAPI } from "@/api/user";


export const userSlice = createSlice({
    name: "user",
    initialState: {
        token: localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null,
    },
    reducers: {
        // 获取token数据
        getToken: (state) => {
            return state.token.value
        },

        // 设置token数据
        setToken: (state, action) => {
            state.token = action.payload;
            localStorage.setItem("token", JSON.stringify(action.payload));
        },

        // 清空token数据
        clearToken: (state) => {
            state.token = null;
            localStorage.removeItem("token");
        },

    },
});

// 获取token
const fetchToken = () => {
    return async (dispatch) => {
        // 定义查询参数对象
        // 英文参数
        // client_id: 'reanod_api_001',
        // client_secret: 'B5035688FE885568A0365C0928A50698',
        const queryParams = {
            // 中文参数
            client_id: 'reanod_api_002',
            client_secret: 'B5035688D66F823SSDF546AA12385WE5',
        };

        await getTokenAPI(queryParams).then(res => {
            const obj = {
                expiration: res.data.expires_in,
                value: res.data.token,
            }
            // 派发保存token数据
            dispatch(setToken(obj))
        })

    };
};


const { getToken, setToken, clearToken } = userSlice.actions;

// 暴露操作函数
export { getToken, setToken, clearToken, fetchToken }
// 暴露reducer
export default userSlice.reducer;
