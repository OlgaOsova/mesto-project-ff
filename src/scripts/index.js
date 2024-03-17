import "../pages/index.css";
import { createCard, toggleLike, deleteMyCard } from "../components/card.js";
import { openPopup, closePopup, formCloseOverlay } from "../components/modal.js";
import { enableValidation, clearValidation } from "../components/validation.js";
import { getData, updateProfile, updateCard, updateAvatar } from "../components/api.js";

// DOM узлы
const placesList = document.querySelector(".places__list");

// Константы
const profileOpenButton = document.querySelector(".profile__edit-button");
const profileCloseButton = document.querySelector(".popup__close-button_type_edit");
const newFormOpenButton = document.querySelector(".profile__add-button");
const newFormCloseButton = document.querySelector(".popup__close-button_type_new-card");
const imageCloseButton = document.querySelector(".popup__close-button_type_image");
const popupInfoForm = document.forms["edit-profile"];
const popupInfo = document.querySelector(".popup_type_edit");
const popupNewForm = document.forms["new-place"];
const popupNew = document.querySelector(".popup_type_new-card");
const popupImage = document.querySelector(".popup_type_image");
const image = popupImage.querySelector(".popup__image");
const imageCaption = popupImage.querySelector(".popup__caption");
const formEditElement = popupInfo.querySelector(".popup__form");
const formAddElement = popupNew.querySelector(".popup__form");
const nameInput = popupInfo.querySelector(".popup__input_type_name");
const descriptionInput = popupInfo.querySelector(".popup__input_type_description");
const titleInput = popupNew.querySelector(".popup__input_type_card-name");
const linkInput = popupNew.querySelector(".popup__input_type_url");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileImage = document.querySelector(".profile__image");
/*const popupConfirm = document.querySelector(".popup_type_confirm");
const popupConfirmButton = document.querySelector(".popup__button"); */
const popupAvatar = document.querySelector(".popup_type_avatar");
const popupAvatarForm = document.forms["edit-avatar"];
const avatarEditButton = document.querySelector(".profile__image-container");

const validationConfig = { // Настройки валидации
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible"
};

let userId = null;

/*const profileInfo = (userInfo) => {
  profileTitle.textContent = userInfo.name;
  profileDescription.textContent = userInfo.about;
  profileImage.style.backgroundImage = `url(${userInfo.avatar})`;
} */

// Выведение карточек с сервера на страницу
getData().then((result) => {
  console.info('Объект пользователя и массивы карточек:', result);
  const userInfo = result[0];
  userId = userInfo._id;
  profileTitle.textContent = userInfo.name;
  profileDescription.textContent = userInfo.about;
  profileImage.style.backgroundImage = `url(${userInfo.avatar})`

  result[1].forEach((dataCard) => {
    placesList.append(createCard(dataCard, removeCard, toggleLike, onOpenImage, userId));
  })
}).catch((err) => {
    console.error(err);
});



// Функция открытия попап-картинки кликом
const onOpenImage = (imageSrc, captionTxt) => {
  image.src = imageSrc;
  image.alt = captionTxt;
  imageCaption.textContent = captionTxt;
  openPopup(popupImage);
}

imageCloseButton.addEventListener("click", () => { // Закрытие кликом попап-картинки
  closePopup(popupImage);
});

// Функция открытия формы "Редактировать профиль"
function openEditProfileForm() {
  nameInput.value = profileTitle.textContent;
  descriptionInput.value = profileDescription.textContent;

  openPopup(popupInfo);
  clearValidation(formEditElement, validationConfig);
}

// Функция закрытия формы "Редактировать профиль"
function closeEditProfileForm() {
  closePopup(popupInfo);
}

// Функция открытия формы "Новое место"
function openNewAddForm() {
  openPopup(popupNew);
  clearValidation(formAddElement, validationConfig);
  formAddElement.reset();
}

// Функция закрытия формы "Новое место"
function closeNewAddForm() {
  closePopup(popupNew);
}

// Слушатели событий
profileOpenButton.addEventListener("click", openEditProfileForm); // Открыть по клику "Редактировать профиль"
profileCloseButton.addEventListener("click", closeEditProfileForm); // Закрыть по клику "Редактировать профиль"
newFormOpenButton.addEventListener("click", openNewAddForm); // Открыть по клику "Новое место"
newFormCloseButton.addEventListener("click", closeNewAddForm); // Закрыть по клику "Новое место"


/*const handleConfirmDelete = (evt) => {
  removeCard(popupConfirm.dataset.cardId)
  .then((result) => {
    const card = document.querySelector(`[data-card-id="${popupConfirm.dataset.cardId}"]`);
    card.remove();
    closePopup(popupConfirm);
  })
  .catch((err) => {
    console.error(err);
  });
}*/

// Функция отправки формы редактирования
const handleProfileFormSubmit = (evt) => {
  evt.preventDefault();
  updateProfile(nameInput.value, descriptionInput.value).then((data) => {

    /*profileTitle.textContent = nameInput.value;
    profileDescription.textContent = descriptionInput.value;*/
    const userName = data.name;
    const userAbout = data.about;
    const userAvatar = data.avatar;

    profileImage.style.backgroundImage = `url(${userAvatar})`;
    profileTitle.textContent = userName;
    profileDescription.textContent = userAbout;

    closeEditProfileForm();
    clearValidation(popupInfoForm, validationConfig);
  })
  .catch((err) => {
    console.error(err);
  });
}

formEditElement.addEventListener("submit", () => {              // !!!!!!!!!!!!!!!!!!!!
  updateProfile(nameInput.value, descriptionInput.value);
  handleProfileFormSubmit();
});

// Функция добавления новой карточки из формы
const handleAddCardSubmit = (evt) => {
  evt.preventDefault();

  updateCard(titleInput.value, linkInput.value).then((data) => {
    
    const cardName = data.name;
    const cardLink = data.link;
  
    const newCardTitleName = document.querySelector(".card__title");
    newCardTitleName.textContent = cardName;
    newCardTitleName.alt = cardName;
  
    const newCardImageLink = document.querySelector(".card__image");
    newCardImageLink.src = cardLink;
    
    placesList.prepend(updateCard(titleInput.value, linkInput.value), removeCard, toggleLike, onOpenImage, userId);

    closeNewAddForm();
    formAddElement.reset();
    clearValidation(popupNewForm, validationConfig);
  })
  .catch((err) => {
    console.error(err);
  });
}

formAddElement.addEventListener("submit", handleAddCardSubmit);

const handleAvatarFormSubmit = (evt) => {
  evt.preventDefault();
  updateAvatar(popupAvatarForm.link.value).then((data) => {

    const userAvatar = data.avatar;

    profileImage.style.backgroundImage = `url(${userAvatar})`;

    closePopup(popupAvatar);
    clearValidation(popupAvatarForm, validationConfig)
  })
  .catch((err) => {
    console.error(err);
  });
}

avatarEditButton.addEventListener("click", (evt) => {
  clearValidation(popupAvatarForm, validationConfig);
  popupAvatarForm.reset();
  openPopup(popupAvatar);
})

popupAvatarForm.addEventListener("summit", handleAvatarFormSubmit);

popupAvatar.addEventListener("click", (evt) => {
  formCloseOverlay(evt);
})


/*popupConfirm.addEventListener("click", (evt) => {
  formCloseOverlay(evt);
})
popupConfirmButton.addEventListener("click", handleConfirmDelete);*/



// Вызов функции валидации
enableValidation(validationConfig);

function removeCard(cardElement, dataCard) {
  console.log ("Delete");
  deleteCard(dataCard._id)
  .then(() => deleteMyCard(cardElement))
  .catch((err) => console.error(err));
}

/*function onOpenImage(dataCard) {
  const newCard = dataCard.closest(".card");
  const cardImage = newCard.querySelector(".card__image");
  const cardTitle = newCard.querySelector(".card__title");

  cardImage.src = dataCard.link;
  cardImage.alt = dataCard.name;
  cardTitle.textContent = dataCard.name;

  openPopup(popupImage);
} */