import loadingIcon from '../images/loading_icon.svg';
import React from 'react';
import Card from './Card';
import { CurrentUserContext } from '../context/CurrentUserContext';
import Footer from './Footer';

function Main(props) {
    
    const [userName, setUserName] = React.useState('');
    const [userDescription, setUserDescription] = React.useState('');
    const [userAvatar, setUserAvatar] = React.useState('');
    const currentUser = React.useContext(CurrentUserContext);

    React.useEffect(() => {
        setUserAvatar(currentUser.avatar);
        setUserDescription(currentUser.about);
        setUserName(currentUser.name);
    }, [currentUser])
    return (
        <>
            <main>
                <section className="profile">
                    <div className="profile__avatar">
                        <img className="profile__image" src={userAvatar ? userAvatar : loadingIcon} alt="фото профиля"></img>
                        <button className="profile__overlay button" onClick={props.onEditAvatar}></button>
                    </div>
                    <div className="profile__info">
                        <h1 className="profile__name">{userName}</h1>
                        <button className="profile__edit-button button" type="button" onClick={props.onEditProfile}></button>
                        <p className="profile__personal-info">{userDescription}</p>
                    </div>
                    <button className="profile__add-button button" type="button" onClick={props.onAddPlace}></button>
                </section>
                <section className="cards">
                    {props.cards.map(card => <Card key={card._id} card={card} onCardClick={props.onCardClick} onCardLike={props.onCardLike} onCardDelete={props.onCardDelete}/>)}
                </section>
            </main>
            <Footer />
        </>
        
    )
}

export default Main;