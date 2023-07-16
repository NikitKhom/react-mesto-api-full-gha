function ImagePopup(props) {
    return (
        <div className={`popup popup_type_image ${props.card.link && 'popup_opened'}`}>
            <div className="popup__image-box">
                <img className="popup__image" src={props.card.link} alt={props.card.title}></img>
                <h2 className="popup__image-name">{props.card.name}</h2>
                <button className="popup__close-button button popup__close-button_type_image" type="button" onClick={props.onClose}></button>
            </div>
        </div>
    )
}

export default ImagePopup;