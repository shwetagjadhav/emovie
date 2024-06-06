import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from './pages/Home';
import Booking from './pages/Booking';
import Prof from './pages/ProfilePage';
import ForgotPasswordForm from './pages/ForgotPasswordForm';
import LoginForm from './pages/LoginForm';
import SignUpForm from './pages/SignUpForm';
import Moviedetail from './pages/Moviedetail';
import WelcomePage from './pages/WelcomePage';
import useAuth from './hooks/useAuth';
 
const App = () => {
    const { isAuthenticated, loading, firstLogin } = useAuth();
   
    if (loading) {
       return <div></div>;
    }
   
   
    const initialRoute = firstLogin ? '/' : '/';
   
    return (
       <BrowserRouter>
         <Routes>
           <Route path='/' element={<WelcomePage />}></Route>
           <Route path='/home' element={isAuthenticated ? <Home /> : <Navigate to={initialRoute} />}></Route>
           <Route path='/movie/:id' element={isAuthenticated ? <Moviedetail /> : <Navigate to={initialRoute} />}></Route>
           <Route path='/Prof' element={isAuthenticated ? <Prof /> : <Navigate to={initialRoute} />}></Route>
           <Route path='/book/:id' element={isAuthenticated ? <Booking /> : <Navigate to={initialRoute} />}></Route>
           <Route path='/login' element={<LoginForm />}></Route>
           <Route path='/signup' element={<SignUpForm />}></Route>
           <Route path='/forgotpassword' element={<ForgotPasswordForm />}></Route>
         </Routes>
       </BrowserRouter>
    );
   };
   
   export default App;