import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../utils/axios'

export const registerUser = createAsyncThunk(
    //회원가입
    "user/registerUser",
    async (body, thunkAPI) => {
        try {
            const res = await axiosInstance.post(
                `/users/register`,
                body
            )
            return res.data;

        } catch (error) {
            console.log(error);
            return thunkAPI.rejectWithValue(error.response.data || error.message);
        }
    }
)

export const loginUser = createAsyncThunk(
    //로그인
    "user/loginUser",
    async (body, thunkAPI) => {
        try {
            const res = await axiosInstance.post(
                `/users/login`,
                body
            )
            return res.data;

        } catch (error) {
            console.log(error);
            return thunkAPI.rejectWithValue(error.response.data || error.message);
        }
    }
)

export const authUser = createAsyncThunk(
    //인증
    "user/authUser",
    async (_, thunkAPI) => {
        try {
            const res = await axiosInstance.get(
                `/users/auth`
            )
            return res.data;

        } catch (error) {
            console.log(error);
            return thunkAPI.rejectWithValue(error.response.data || error.message);
        }
    }
)

export const logoutUser = createAsyncThunk(
    //로그아웃
    "user/logoutUser",
    async (_, thunkAPI) => {
        try {
            const res = await axiosInstance.post(
                `/users/logout`
            )
            return res.data;

        } catch (error) {
            console.log(error);
            return thunkAPI.rejectWithValue(error.response.data || error.message);
        }
    }
)