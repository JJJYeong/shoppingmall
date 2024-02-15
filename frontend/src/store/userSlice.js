import { createSlice } from '@reduxjs/toolkit'
import { addToCart, authUser, getCartItems, loginUser, logoutUser, payProducts, registerUser, removeCartItem } from './thunkFunctions'
import { toast } from 'react-toastify';

const initialState = {
    userData: {
        id: '',
        email: '',
        name: '',
        role: 0,
        image: ''
    },
    isAuth: false,
    isLoading: false,
    error: '',
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            //회원가입
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(registerUser.fulfilled, (state) => {
                state.isLoading = false;
                toast.info('회원가입 성공');
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
                toast.error(action.payload);
            })
            //로그인
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.userData = action.payload;
                state.isAuth = true;
                localStorage.setItem('accessToken', action.payload.accessToken);
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
                toast.error(action.payload);
            })
            //인증
            .addCase(authUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(authUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.userData = action.payload;
                state.isAuth = true;
            })
            .addCase(authUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
                state.isAuth = false;
                localStorage.removeItem('accessToken');
            })
            //로그아웃
            .addCase(logoutUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.isLoading = false;
                state.userData = initialState.userData;
                state.isAuth = false;
                localStorage.removeItem('accessToken');
            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
                toast.error(action.payload);
            })
            //장바구니 담기
            .addCase(addToCart.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addToCart.fulfilled, (state,action) => {
                state.isLoading = false;
                state.userData.cart = action.payload;
                toast.info('장바구니 추가 완료');
            })
            .addCase(addToCart.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
                toast.error(action.payload);
            })
            //장바구니 목록
            .addCase(getCartItems.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getCartItems.fulfilled, (state,action) => {
                state.isLoading = false;
                state.cartDetail = action.payload;
            })
            .addCase(getCartItems.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
                toast.error(action.payload);
            })
            //장바구니 삭제
            .addCase(removeCartItem.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(removeCartItem.fulfilled, (state,action) => {
                state.isLoading = false;
                state.cartDetail = action.payload.productInfo;
                state.userData.cart = action.payload.cart;
                toast.info('장바구니 상품 삭제 완료');
            })
            .addCase(removeCartItem.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
                toast.error(action.payload);
            })
            //결제
            .addCase(payProducts.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(payProducts.fulfilled, (state) => {
                state.isLoading = false;
                state.cartDetail = [];
                state.userData.cart = [];
                toast.info('결제 성공');
            })
            .addCase(payProducts.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
                toast.error(action.payload);
            })
    }
});

export default userSlice.reducer