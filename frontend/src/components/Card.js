import { CurrentUserContext } from "../context/CurrentUserContext";
import React from "react";

function Card(props) {

    const currentUser = React.useContext(CurrentUserContext); 
    const isOwn = props.card.owner._id === currentUser._id;  
    const isLiked = props.card.likes.some(i => i._id === currentUser._id);


    function handleClick() {
        props.onCardClick(props.card);
    }  

    function handleCardLike() {
        props.onCardLike(props.card);
    }

    function handleCardDelete() {
        props.onCardDelete(props.card);
    }

    return(
            <div className="cards__card">
                {isOwn && <button className="cards__delete-button button" type="button" onClick={handleCardDelete} />} 
                <img className="cards__image" src={props.card.link} alt={props.card.name} onClick={handleClick}></img>
                <div className="cards__stuff">
                    <h2 className="cards__title">{props.card.name}</h2>
                    <div className="cards__group">
                        <button className={`cards__like-button ${isLiked && 'cards__like-button_active'} button`} type="button" onClick={handleCardLike}></button>
                        <p className="cards__like-count">{props.card.likes.length}</p>
                    </div>
                </div>
            </div>
    )
}

export default Card;