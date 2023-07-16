import {useState} from "react";
import {Link} from 'react-router-dom';
import AuthForm from "./AuthForm";

function Register(props) {
    const [formValue, setFormValue] = useState({
        email: '',
        password: ''
    });


    function handleChange(e) {
        const {name, value} = e.target;
        setFormValue({
          ...formValue,
          [name]: value
        });
      }

    function handleSubmit(e) {
        e.preventDefault();
        if (!formValue.password || !formValue.email) {
            return;
        }
        props.handleRegister({
            email: formValue.email,
            password: formValue.password
        })
    }

    return (
        <div className="auth-page">
            <h2 className="auth-page__welcome">Регистрация</h2>
            <AuthForm 
            onChange={handleChange}
            onSubmit={handleSubmit}
            formValue={formValue}
            buttonText="Зарегистрироваться"/>
            <div className="auth-page__signin">  
                <p className="auth-page__question">Уже зарегистрированы?</p>
                <Link to="/sign-in" className="auth-page__login-link button">Войти</Link>
            </div>
      </div>
    )
}

export default Register;