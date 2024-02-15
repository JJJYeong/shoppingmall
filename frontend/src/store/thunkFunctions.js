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

export const addToCart = createAsyncThunk(
    //장바구니 담기
    "user/addToCart",
    async (body, thunkAPI) => {
        try {
            const res = await axiosInstance.post(
                `/users/cart`,
                body
            )
            return res.data;

        } catch (error) {
            console.log(error);
            return thunkAPI.rejectWithValue(error.response.data || error.message);
        }
    }
)

export const getCartItems = createAsyncThunk(
    //장바구니 목록
    "user/getCartItems",
    async ({cartItemIds, userCart}, thunkAPI) => {
        try {
            const res = await axiosInstance.get(
                `/products/${cartItemIds}?type=array`
            )

            userCart.forEach(cartItem => {
                res.data.forEach((productDetail, idx) => {
                    if(cartItem.id === productDetail._id) {
                        res.data[idx].quantity = cartItem.quantity;
                    }
                });
            });

            return res.data;

        } catch (error) {
            console.log(error);
            return thunkAPI.rejectWithValue(error.response.data || error.message);
        }
    }
)

export const removeCartItem = createAsyncThunk(
    //장바구니 삭제
    "user/removeCartItem",
    async (productId, thunkAPI) => {
        try {
            const res = await axiosInstance.delete(
                `/users/cart?productId=${productId}`
            )

            res.data.cart.forEach(cartItem => {
                res.data.productInfo.forEach((productDetail, idx) => {
                    if(cartItem.id === productDetail._id) {
                        res.data.productInfo[idx].quantity = cartItem.quantity;
                    }
                });
            });

            return res.data;

        } catch (error) {
            console.log(error);
            return thunkAPI.rejectWithValue(error.response.data || error.message);
        }
    }
)

export const payProducts = createAsyncThunk(
    //결제
    "user/payProducts",
    async (body, thunkAPI) => {
        try {
            const res = await axiosInstance.post(
                `/users/payment`,
                body
            )

            return res.data;

        } catch (error) {
            console.log(error);
            return thunkAPI.rejectWithValue(error.response.data || error.message);
        }
    }
)