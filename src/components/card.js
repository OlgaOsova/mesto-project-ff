export { createCard, toggleLike, removeCard };
import { addLike, deleteLike, deleteCard } from "./api";

// Темплейт карточки
const cardTmp = document.querySelector("#card-template").content;

// Функция создания карточки
function createCard(dataCard, onDelete, onLike, openImage, userId) {
  const cardElement = cardTmp.querySelector(".card").cloneNode(true);
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");
  const likeCount = cardElement.querySelector(".card__like-count");

  cardElement.dataset.cardId = dataCard._id;
  cardElement.dataset.ownerId = dataCard.owner._id;
  cardImage.src = dataCard.link;
  cardImage.alt = dataCard.name;
  cardTitle.textContent = dataCard.name;
  likeCount.textContent = dataCard.likes.length;

  const isLiked = dataCard.likes.some((like) => like._id === userId);

  if (isLiked) {
    likeButton.classList.add("card__like-button_is-active");
  }

  if (userId === dataCard.owner._id) {
    deleteButton.addEventListener("click", () => { // Удаление карточки кликом
      onDelete(cardElement, dataCard._id);
    });
  } else {
    deleteButton.remove();
  }

  likeButton.addEventListener("click", (evt) => { // Лайк карточки кликом
    onLike(evt, dataCard._id);
  });

  cardImage.addEventListener("click", () => { // Попап-картинка по клику
    openImage(dataCard.link, dataCard.name);
  });

  return cardElement;
}

// Функция удаления карточки
function removeCard(cardElement, cardId) {
  deleteCard(cardId)
    .then(() => cardElement.remove())
    .catch((err) => {
      console.error(err);
    });
}

// Функция лайка карточки
const toggleLike = (evt, cardId) => {
  let currentLikes = evt.target.parentNode.querySelector(".card__like-count");

  if (evt.target.classList.contains("card__like-button_is-active")) {
    deleteLike(cardId)
      .then((data) => {
        evt.target.classList.remove("card__like-button_is-active");
        currentLikes.textContent = data.likes.length;
      })
      .catch((err) => {
        console.error(err);
      });
  } else {
    addLike(cardId)
      .then((data) => {
        evt.target.classList.add("card__like-button_is-active");
        currentLikes.textContent = data.likes.length;
      })
      .catch((err) => {
        console.error(err);
      });
  }
};
