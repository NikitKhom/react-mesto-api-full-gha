import ImagePopup from './ImagePopup';
import {CurrentUserContext} from '../context/CurrentUserContext';
import api from '../utils/api';
import Header from './Header';
import Register from './Register';
import Login from './Login';
import Main from './Main';
import InfoTooltip from './InfoTooltip';
import ProtectedRouteElement from './ProtectedRoute';
import { useState, useEffect } from 'react';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import { Route, Routes, Navigate, useNavigate} from 'react-router-dom'
import * as auth from '../utils/auth';

function App() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [currentUser, setCurrentUser] = useState({name: '', about: '', avatar: '', _id: ''});
    const [cards, setCards] = useState([]);
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [infoTooltip, setInfoTooltip] = useState({isOpen: false, isRegistered: false});
    const [selectedCard, setSelectedCard] = useState({name: '', link: ''});
    const [userEmail, setUserEmail] = useState('');
    
    const navigate = useNavigate();

    useEffect(() => {
        handleTokenCheck();
    }, [])



    function handleLoadMainPage() {
        Promise.all([api.getUserInfo(), api.getCards()])
        .then(([userInfo, userCards]) => {
                setCurrentUser(userInfo.data);
                userCards.data.reverse(); 
                setCards(userCards.data);
        })  
        .catch(err => console.log(err));
    }

    function handleTokenCheck() {
        
        if (localStorage.getItem('jwt')){
            auth.checkToken(localStorage.getItem('jwt'))
            .then(res => {
                if (res){
                    api.setToken(localStorage.getItem('jwt'));
                    handleLoadMainPage();
                    setLoggedIn(true);
                    if (res.data) {
                        setUserEmail(res.data.email);
                        navigate("/", {replace: true})
                    }
                }
            })
            .catch(err => console.log(err));
        }
    }

    function handleLogin({password, email}) {
        auth.authorize(password, email)
		.then((data) => {
			if (data.token){
                api.setToken(data.token);
                setLoggedIn(true);
                handleLoadMainPage();
                setUserEmail(email);
				navigate('/', {replace: true});
			}
		})
		.catch(err => console.log(err));
    }

    function handleRegister({email, password}) {
        auth.register(password, email)
        .then((res) => {
            if (res.data) {
                openInfoTooltip(true);
                navigate('/sign-in', {replace: true});
            } 
        })
        .catch(err => {
            console.log(err);
            openInfoTooltip(false);
        })
    }

    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i._id === currentUser._id);
        api.changeLikeCardStatus(card._id, isLiked)
        .then((newCard) => {
            setCards((state) => state.map((c) => c._id === card._id ? newCard.data : c));
        })
        .catch(err => console.log(err));
    } 

    function handleCardDelete(card) {
        api.deleteCard(card._id)
        .then(res => {
            setCards((state) => state.filter((c) => c._id !== card._id));
        })
        .catch(err => console.log(err));
    }

    function handleAddPlaceSubmit(card) {
        api.addCard(card)
        .then(newCard => {
            setCards([newCard.data, ...cards]);
            closeAllPopups();
        })
        .catch(err => console.log(err));
    }

    function handleUpdateUser(info) {
        api.changeUserInfo({userName: info.name, userInfo: info.about})
        .then(info => {
            setCurrentUser(info.data);
            closeAllPopups();
        })
        .catch(err => console.log(err));
    }

    function handleUpdateAvatar(avatar) {
        api.setUserAvatar(avatar)
        .then(info => {
            setCurrentUser(info.data);
            closeAllPopups();
        })
        .catch(err => console.log(err));
    }

    function closeAllPopups() {
        setIsEditAvatarPopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setSelectedCard({name: '', link: ''});
        setInfoTooltip({...infoTooltip, isOpen: false});
    }

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    }

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    }

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
    }

    function handleСardClick(card) {
        setSelectedCard({name: card.name, link: card.link});
    }

    function openInfoTooltip(isRegistered) {
        setInfoTooltip({isRegistered, isOpen: true});
    }

    return (
    
        <CurrentUserContext.Provider value={currentUser}>

            <Header 
            userEmail={userEmail}/>
        
            <Routes>
                <Route path="/" element={
                    <ProtectedRouteElement 
                    element={Main} 
                    loggedIn={loggedIn}
                    onEditProfile={handleEditProfileClick} 
                    onAddPlace={handleAddPlaceClick} 
                    onEditAvatar={handleEditAvatarClick} 
                    onCardClick={handleСardClick} 
                    onCardLike={handleCardLike}
                    onCardDelete={handleCardDelete}
                    cards={cards}
                    setCards={setCards}/>} />
                <Route path="/sign-up" element={<Register handleRegister={handleRegister}/>}/>
                <Route path="/sign-in" element={<Login handleLogin={handleLogin}/>}/>
                <Route path="*" element={<Navigate to="/sign-in" />} />
            </Routes>

            <InfoTooltip 
            isRegistered={infoTooltip.isRegistered}
            isOpen={infoTooltip.isOpen}
            onClose={closeAllPopups}/>

            <EditProfilePopup 
            isOpen={isEditProfilePopupOpen} 
            onClose={closeAllPopups} 
            onUpdateUser={handleUpdateUser}/>

            <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}/>

            <EditAvatarPopup 
            isOpen={isEditAvatarPopupOpen} 
            onClose={closeAllPopups} 
            onUpdateAvatar={handleUpdateAvatar}/>

            <ImagePopup  card={selectedCard} onClose={closeAllPopups}/>
    </CurrentUserContext.Provider>
    );
}

export default App;
