function PopupWithForm({isOpen, onClose, name, title, buttonText, children, onSubmit}) {

    return (
        <div className={`popup popup_type_${name} ${isOpen && 'popup_opened'}`}  >
            <div className="popup__content">
                <h2 className="popup__title">{title}</h2>
                <form className="popup__form" name={name} onSubmit={onSubmit}>
                    <fieldset className="popup__set">
                        {children}
                        <button className={`popup__save-button button popup__save-button_type_${name}`} type="submit">{buttonText}</button>
                    </fieldset>
                </form>
                <button className="popup__close-button button" type="button" onClick={onClose}/> 
            </div>
        </div>
    )
}

export default PopupWithForm;