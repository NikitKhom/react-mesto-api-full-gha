import logo from '../images/header-logo.svg';
import NavBar from './NavBar';

function Header(props) {
  return (
      <header className="header">
        <img className="header__logo" src={logo} alt="логотип сервиса Место"></img>
        <NavBar userEmail={props.userEmail}/>
      </header>
  )
}

export default Header;