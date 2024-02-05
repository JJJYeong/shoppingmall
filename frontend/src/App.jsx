import { Outlet, Route, Routes, useLocation } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import NavBar from './layout/NavBar'
import Footer from './layout/Footer'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { authUser } from './store/thunkFunctions'
import ProtectedRoutes from './components/ProtectedRoutes'
import NotAuthRoutes from './components/NotAuthRoutes'

function Layout() {
  return (
    <div className="flex flex-col h-screen justify-between">
      <ToastContainer
        position='bottom-right'
        thema='light'
        pauseOnHover
        autoClose={1500}
      />
      <NavBar />
      <main className="mb-auto w-10/12 max-w-4xl mx-auto">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

function App() {

  const dispatch = useDispatch();
  const isAuth = useSelector(state => state.user?.user.isAuth);
  const { pathname } = useLocation();

  useEffect(() => {
    if(isAuth) {
      dispatch(authUser());
    }
  }, [isAuth, pathname, dispatch]);

  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<LandingPage />} />

        {/* 로그인 시 접근 불가능 */}
        <Route element={<NotAuthRoutes />}>  
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
        </Route>

        {/* 로그인 시 접근 가능 */}
        <Route element={<ProtectedRoutes />}>
          
        </Route>
      </Route>
    </Routes>
  )
}

export default App
