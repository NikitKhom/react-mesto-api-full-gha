import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../context/CurrentUserContext";

function EditAvatarPopup(props) {
    const currentUser = React.useContext(CurrentUserContext);
    const avatarRef = React.useRef();

    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateAvatar(avatarRef.current.value);
      }
      
    React.useEffect(() => {
        avatarRef.current.value = '';
    }, [currentUser]); 

    return (
        <PopupWithForm 
            onSubmit={handleSubmit}
            name='avatar'
            title='Обновить аватар'
            isOpen={props.isOpen}
            onClose={props.onClose}
            buttonText='Сохранить'>
                    <input ref={avatarRef} className="popup__text-field popup__text-field_type_avatar" id="avatar" type="url" defaultValue="" name="avatar" required placeholder="Ссылка на картинку" minLength="5"/>
                    <span className="popup__input-error avatar-error"></span>
        </PopupWithForm>
    )
}

export default EditAvatarPopup;