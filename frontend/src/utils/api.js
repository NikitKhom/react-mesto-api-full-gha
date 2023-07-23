class API {
    constructor({baseUrl}){
        this._baseUrl = baseUrl;
    }

    getUserInfo(token){
        return this._checkServerStatus(
            fetch(`${this._baseUrl}/users/me`, {
                headers: this._headers
            })
        )
    }

    getCards(token){
        return this._checkServerStatus(
            fetch(`${this._baseUrl}/cards`, {
                headers: this._headers
            })
        )
    }

    changeUserInfo({userName, userInfo}, token) {
        return this._checkServerStatus(
            fetch(`${this._baseUrl}/users/me`, {
                method: 'PATCH',
                headers: this._headers,
                body: JSON.stringify({
                    name: userName,
                    about: userInfo
                })
            })
        )
    }

    addCard({cardName, cardLink}, token) {
        return this._checkServerStatus(
            fetch(`${this._baseUrl}/cards`, {
                method: 'POST',
                headers: this._headers,
                body: JSON.stringify({
                    name: cardName,
                    link: cardLink
                })
            })
        )
    }

    deleteCard(cardId, token){
        return this._checkServerStatus(
            fetch(`${this._baseUrl}/cards/${cardId}`, {
                method: 'DELETE',
                headers: this._headers
            })
        )
    }

    changeLikeCardStatus(cardId, isLiked, token){
        if (!isLiked) {
            return this._checkServerStatus(
                fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
                    method: 'PUT',
                    headers: this._headers
                })
            )
        }
        else {
            return this._checkServerStatus(
                fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
                    method: 'DELETE',
                    headers: this._headers
                })
            )
        }
    }

    setUserAvatar(userAvatar, token) {
        return this._checkServerStatus(
            fetch(`${this._baseUrl}/users/me/avatar`, {
                method: 'PATCH',
                headers: this._headers,
                body: JSON.stringify({
                    avatar: userAvatar
                })
            })
        )
    }

    _checkServerStatus(promise) {
        return promise
        .then(res => {
            if (res.ok) {
                return  res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
    }

    setToken(token) {
        this._headers = {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    }
}


const api = new API({
    baseUrl: 'http://localhost:3000',
});
export default api;
