export {createCard, deleteCard, toggleLike};

// Темплейт карточки
const cardTmp = document.querySelector("#card-template").content;

// Функция создания карточки
function createCard(dataCard, deleteCard, toggleLike, imageCallback) {
  const cardElement = cardTmp.querySelector(".card").cloneNode(true);
  const deleteButton = cardElement.querySelector(".card__delete-button");

  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");

  cardImage.src = dataCard.link;
  cardImage.alt = dataCard.name;
  cardTitle.textContent = dataCard.name;

  deleteButton.addEventListener("click", () => { // Удаление карточки кликом
    deleteCard(cardElement);
  });

  likeButton.addEventListener("click", toggleLike); // Лайк карточки кликом

  cardImage.addEventListener("click", () => { // Картинка
    imageCallback(dataCard.link, dataCard.name);
  });

  return cardElement;
}

// Функция удаления карточки
function deleteCard(cardElement) {
  cardElement.remove();
}

//Функция лайка карточки
function toggleLike(evt) {
  evt.target.classList.toggle("card__like-button_is-active");
}