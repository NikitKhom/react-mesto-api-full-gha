import React from "react";
import PopupWithForm from "./PopupWithForm";


function AddPlacePopup(props) {
    const [cardName, setCardName] = React.useState('');
    const [cardLink, setCardLink] = React.useState('');

    function handleSubmit(e) {
        e.preventDefault();
        props.onAddPlace({ 
            cardName,
            cardLink
        });
      } 

    React.useEffect(() => {
        setCardName('');
        setCardLink('');
    }, [props.isOpen]);


    function handleNameChange(e) {
        setCardName(e.target.value);
    } 

    function handleLinkChange(e) {
        setCardLink(e.target.value);
    } 

    return (
        <PopupWithForm 
        onSubmit={handleSubmit}
        name='addPlace'
        title='Новое место'
        isOpen={props.isOpen}
        onClose={props.onClose}
        buttonText='Сохранить'>
        <input className="popup__text-field popup__text-field_type_title" id="title" type="text" value={cardName} name="name" required placeholder="Название" minLength="2" maxLength="30" onChange={handleNameChange}/>
        <span className="popup__input-error title-error">.</span>
        <input className="popup__text-field popup__text-field_type_link" id="link" type="url" value={cardLink} name="link" required placeholder="Ссылка на картинку" onChange={handleLinkChange}/>
        <span className="popup__input-error link-error">.</span>
    </PopupWithForm>
    )
}

export default AddPlacePopup;