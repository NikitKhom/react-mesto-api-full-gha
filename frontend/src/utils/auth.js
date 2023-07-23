const BASE_URL = 'http://localhost:3000';

export const register = (password, email) => {
   return checkServerStatus(
      fetch(`${BASE_URL}/signup`, {
         method: 'POST',
         headers: {
             'Content-Type': 'application/json'
         },
         body: JSON.stringify({password, email})
      })
   );
};

export const authorize = (password, email) => {
   return  checkServerStatus(
      fetch(`${BASE_URL}/signin`, {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json'
         },
         body: JSON.stringify({password, email})
      })
   )
   .then(data => {
      if (data){
            localStorage.setItem('jwt', data.token);
            return data;
      }
   });
};

export const checkToken = (token) => {
   return checkServerStatus(
      fetch(`${BASE_URL}/users/me`, {
         method: 'GET',
         headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
         }
       })
   )
   .then(data => data);
};

const checkServerStatus = (promise) => {
   return promise
   .then(res => {
       if (res.ok) {
           return  res.json();
       }
      return Promise.reject(`Ошибка: ${res.status}`)
   })
}