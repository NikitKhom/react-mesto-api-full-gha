import React from "react";
import welcomeIcon from "../images/Union.svg";
import errorIcon from "../images/Union-error.svg";


function InfoTooltip(props) {
    const titles = {
        welcome: "Вы успешно зарегистрировались!",
        error: "Что-то пошло не так! Попробуйте ещё раз."
    }

    const alts = {
        welcome: "Иконка успешной операции",
        error: "Иконка ошибки"
    }


    return (
        <div className={`popup ${props.isOpen && 'popup_opened'}`}>
            <div className="popup__content popup__content_type_info">
                <img className="popup__infoTooltip-icon" src={props.isRegistered ? welcomeIcon : errorIcon } alt={props.isRegistered ? alts.welcome : alts.error}/>
                <h2 className="popup__title popup__title_type_info">{props.isRegistered ? titles.welcome : titles.error}</h2>
                <button className="popup__close-button button" type="button" onClick={props.onClose}/> 
            </div>
        </div>
    )
}

export default InfoTooltip;