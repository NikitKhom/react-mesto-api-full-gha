import {useState} from "react";
import AuthForm from "./AuthForm";

function Login(props) {
	const [formValue, setFormValue] = useState({
		password: '',
		email: ''
	});

	function handleChange(e) {
	  const {name, value} = e.target;
	  setFormValue({
		...formValue,
		[name]: value
	  });
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!formValue.email || !formValue.password){
		  return;
		}
		props.handleLogin({
			password: formValue.password,
			email: formValue.email
		})
	}

	return (
		<div className="auth-page">
			<h2 className="auth-page__welcome">Вход</h2>
			<AuthForm 
            onChange={handleChange}
            onSubmit={handleSubmit}
            formValue={formValue}
            buttonText="Зарегистрироваться"/>
	  </div>
	)
}

export default Login;