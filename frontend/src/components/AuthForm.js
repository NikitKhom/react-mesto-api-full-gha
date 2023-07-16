
function AuthForm({onChange, onSubmit, buttonText, formValue}) {
    return(
        <form className="auth-form__form" onSubmit={onSubmit}>
            <input className="auth-form__input" id="email" name="email" type="email" placeholder="Email" onChange={onChange} value={formValue.email}/>
            <input className="auth-form__input" id="password" name="password" type="password" placeholder="Password" onChange={onChange} value={formValue.password}/>
            <button className="auth-form__button button" type="submit">{buttonText}</button>
        </form>
    )
}

export default AuthForm;