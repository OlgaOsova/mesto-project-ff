export {
  getData,
  updateProfile,
  updateCard,
  addLike,
  deleteLike,
  updateAvatar,
  deleteCard,
}

// Конфигурация API
const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-8",
  headers: {
    authorization: "fda0d25e-1116-4785-b3a1-842d34e7432a",
    "Content-Type": "application/json"
  }
}

// Универсальная функция для проверки и получения данных ответа
const getResponseData = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

// Универсальная функция запроса с проверкой ответа
const request = (url, options) => {
  return fetch(`${config.baseUrl}${url}`, options)
  .then(getResponseData);
}

// Получение карточек с сервера
const getCard = () => {
  return request(`/cards`, {
    headers: config.headers
  });
}

// Получение информации о пользователе с сервера
const getProfile = () => {
  return request(`/users/me`, {
    headers: config.headers
  });
}

// Параллельный запуск и выполнение созданных промисов
const getData = () => {
  return Promise.all([getProfile(), getCard()]);
}

// Сохранение данных пользователя в окне "Редактировать профиль"
const updateProfile = (name, about) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: about
    }),
  });
}

// Добавление новой карточки из формы "Новое место"
const updateCard = (name, link) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link
    }),
  });
}

// Постановка лайка карточки
const addLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: config.headers
  });
}

// Снятие лайка карточки
const deleteLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: config.headers
  });
}

// Удаление карточки пользователя
const deleteCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers
  });
}

// Обновление аватара пользователя
const updateAvatar = (avatar) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatar
    })
  });
}