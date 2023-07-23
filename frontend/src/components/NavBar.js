import {Link, Routes, Route, useNavigate} from 'react-router-dom';

function NavBar(props) {
    const navigation = useNavigate();
    function signOut(){
        localStorage.removeItem('jwt');
        navigation("/sign-in", {replace: true});
      }
    return (
        <Routes>
            <Route path='/sign-in' element={
                <Link to="/sign-up" className="navbar navbar__link button">Регистрация</Link>
            }/>
            <Route path='/sign-up' element={
                <Link to="/sign-in" className=" navbar navbar__link button">Вход</Link>
            }/>
            <Route path='/' element={
                <>
                    <ul className="navbar">
                        <li>{props.userEmail}</li>
                        <li><button className="navbar__link navbar__button_type_exit button" onClick={signOut}>Выйти</button></li>
                    </ul> 
                </>

            }/>
        </Routes>
    )
}

export default NavBar;