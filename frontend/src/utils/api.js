class API {
    constructor({baseUrl, headers}){
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    getUserInfo(){
        return this._checkServerStatus(
            fetch(`${this._baseUrl}/users/me`, {
                headers: this._headers
            })
        )
    }

    getCards(){
        return this._checkServerStatus(
            fetch(`${this._baseUrl}/cards`, {
                headers: this._headers
            })
        )
    }

    changeUserInfo({userName, userInfo}) {
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

    addCard({cardName, cardLink}) {
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

    deleteCard(cardId){
        return this._checkServerStatus(
            fetch(`${this._baseUrl}/cards/${cardId}`, {
                method: 'DELETE',
                headers: this._headers
            })
        )
    }

    changeLikeCardStatus(cardId, isLiked){
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

    setUserAvatar(userAvatar) {
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
}

const api = new API({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-63',
    headers: {
        authorization: '36dd83f2-042c-49c6-87f3-0e8edbb54688',
        'Content-Type': 'application/json'
    }
});
export default api;
