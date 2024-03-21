import "../pages/index.css";
import { createCard, toggleLike, removeCard } from "../components/card.js";
import { openPopup, closePopup, formCloseOverlay } from "../components/modal.js";
import { enableValidation, clearValidation } from "../components/validation.js";
import { getData, updateProfile, updateCard, updateAvatar } from "../components/api.js";

// DOM узлы // Константы
const placesList = document.querySelector(".places__list");
const popups = document.querySelectorAll(".popup");
const profileOpenButton = document.querySelector(".profile__edit-button");
const profileCloseButton = document.querySelector(".popup__close-button_type_edit");
const newFormOpenButton = document.querySelector(".profile__add-button");
const newFormCloseButton = document.querySelector(".popup__close-button_type_new-card");
const imageCloseButton = document.querySelector(".popup__close-button_type_image");
const avatarCloseButton = document.querySelector(".popup__close-button_type_avatar");
const popupAvatarForm = document.forms["edit-avatar"];
const popupInfoForm = document.forms["edit-profile"];
const popupNewForm = document.forms["new-place"];
const popupInfo = document.querySelector(".popup_type_edit");
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
const avatarLinkInput = popupAvatarForm.querySelector(".popup__input_type_url");
const popupAvatar = document.querySelector(".popup_type_avatar");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileImage = document.querySelector(".profile__image");

const validationConfig = { // Настройки валидации
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

let userId = null;

// Выведение карточек с сервера на страницу
getData()
  .then(([userData, cardsData]) => {
    console.info("Объект пользователя и массивы карточек:", [
      userData,
      cardsData,
    ]);
    userId = userData._id;
    profileImage.style.backgroundImage = `url(${userData.avatar})`;
    profileTitle.textContent = userData.name;
    profileDescription.textContent = userData.about;

    cardsData.forEach((dataCard) => {
      placesList.append(
        createCard(dataCard, removeCard, toggleLike, openImage, userId)
      );
    });
  })
  .catch((err) => {
    console.error(err);
  });

// Функция открытия попап-картинки кликом
const openImage = (imageSrc, captionTxt) => {
  image.src = imageSrc;
  image.alt = captionTxt;
  imageCaption.textContent = captionTxt;
  openPopup(popupImage);
};

imageCloseButton.addEventListener("click", () => { // Слушатель закрытия кликом попап-картинки
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

// Функция открытия формы "Обновить аватар"
function openEditAvatarForm() {
  openPopup(popupAvatar);
}

// Функция закрытия формы "Обновить аватар"
function closeAvatarForm() {
  closePopup(popupAvatar);
}

// Слушатели событий попапов
profileOpenButton.addEventListener("click", openEditProfileForm); // Открыть по клику "Редактировать профиль"
profileCloseButton.addEventListener("click", closeEditProfileForm); // Закрыть по клику "Редактировать профиль"
newFormOpenButton.addEventListener("click", openNewAddForm); // Открыть по клику "Новое место"
newFormCloseButton.addEventListener("click", closeNewAddForm); // Закрыть по клику "Новое место"
avatarCloseButton.addEventListener("click", closeAvatarForm); // Закрыть по клику "Обновить аватар"
profileImage.addEventListener("click", openEditAvatarForm); // Закрыть по клику "Обновить аватар"

popups.forEach((popup) => {
  popup.addEventListener("mousedown", formCloseOverlay);
});

// Функция изменения формы "Обновить аватар"
const handleAvatarFormSubmit = (evt) => {
  evt.preventDefault();
  const buttonTxt = evt.submitter;
  buttonLoading(true, buttonTxt);

  updateAvatar(avatarLinkInput.value)
    .then((userData) => {
      profileImage.style.backgroundImage = `url(${userData.avatar})`;
      popupAvatarForm.reset();
      closeAvatarForm();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      buttonLoading(false, buttonTxt);
    });
  clearValidation(popupAvatarForm, validationConfig);
};

popupAvatarForm.addEventListener("submit", (evt) => { // Cлушатель формы аватара
  handleAvatarFormSubmit(evt);
});

// Функция отправки формы формы "Редактировать профиль"
const handleProfileFormSubmit = (evt) => {
  evt.preventDefault();
  const buttonTxt = evt.submitter;
  buttonLoading(true, buttonTxt);

  updateProfile(nameInput.value, descriptionInput.value)
    .then((userData) => {
      profileTitle.textContent = userData.name;
      profileDescription.textContent = userData.about;
      
      closeEditProfileForm();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      buttonLoading(false, buttonTxt);
    });
  clearValidation(popupInfoForm, validationConfig);
};

formEditElement.addEventListener("submit", (evt) => {  // Слушатель формы редактирования
  handleProfileFormSubmit(evt);
});

// Функция добавления новой карточки из формы "Новое место"
const handleAddCardSubmit = (evt) => {
  evt.preventDefault();
  const buttonTxt = evt.submitter;
  buttonLoading(true, buttonTxt);

  updateCard(titleInput.value, linkInput.value)
    .then((cardData) => {
      placesList.prepend(
        createCard(cardData, removeCard, toggleLike, openImage, userId));
      popupNewForm.reset();
      closeNewAddForm();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      buttonLoading(false, buttonTxt);
    });
  clearValidation(popupNewForm, validationConfig);
};

formAddElement.addEventListener("submit", (evt) => { // Cлушатель добавления карточек
  handleAddCardSubmit(evt);
});

// Функция уведомления на кнопке о процессе загрузки
function buttonLoading(isLoading, buttonTxt) {
  if (isLoading) {
    buttonTxt.textContent = "Сохранение...";
    buttonTxt.classList.add("popup__button_loading");
    return;
  }
  buttonTxt.textContent = "Сохранить";
}

// Вызов функции валидации
enableValidation(validationConfig);
