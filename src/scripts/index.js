import "../pages/index.css";
import { initialCards } from "./cards.js";
import { createCard, deleteCard, toggleLike } from "../components/card.js";
import { openPopup, closePopup } from "../components/modal.js";

// DOM узлы
const placesList = document.querySelector(".places__list");

// Константы
const popup = document.querySelector(".popup");
const profileOpenButton = document.querySelector(".profile__edit-button");
const profileCloseButton = document.querySelector(".popup__close-button_type_edit");
const newFormOpenButton = document.querySelector(".profile__add-button");
const newFormCloseButton = document.querySelector(".popup__close-button_type_new-card");
const imageCloseButton = document.querySelector(".popup__close-button_type_image");
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
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

// Функция выведения карточек на страницу
function arrInitialCards(initialCards) {
  initialCards.forEach((dataCard) => {
    placesList.append(createCard(dataCard, deleteCard, toggleLike, openImage));
  });
}

// Функция открытия картинки кликом
function openImage(imageSrc, captionTxt) {
  image.src = imageSrc;
  image.alt = captionTxt;
  imageCaption.textContent = captionTxt;
  openPopup(popupImage);
}

imageCloseButton.addEventListener("click", () => { // Закрытие кликом картинки
  closePopup(popupImage);
});

// Функция открытия формы "Редактировать профиль"
function openEditProfileForm() {
  openPopup(popupInfo);
  nameInput.value = profileTitle.textContent;
  descriptionInput.value = profileDescription.textContent;
}

// Функция закрытия формы "Редактировать профиль"
function closeEditProfileForm() {
  closePopup(popupInfo);
}

// Функция открытия формы "Новое место"
function openNewAddForm() {
  openPopup(popupNew);
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

// Закрытие формы кликом по оверлею
popup.addEventListener("click", (evt) => { // Форма "Редактировать профиль"
  if (evt.target === popup) {
    popup.classList.remove("popup_is-opened");
  }
});

popupNew.addEventListener("click", (evt) => { // Форма "Новое место"
  if (evt.target === popupNew) {
    popupNew.classList.remove("popup_is-opened");
  }
});

popupImage.addEventListener("click", (evt) => { // Картинка
  if (evt.target === popupImage) {
    popupImage.classList.remove("popup_is-opened");
  }
});

// Функция закрытия формы кнопкой Esc
function formCloseEsc(evt) { // Форма "Редактировать профиль"
  if (evt.key === "Escape") {
    popup.classList.remove("popup_is-opened");
  }

  if (evt.key === "Escape") { // Форма "Новое место"
    popupNew.classList.remove("popup_is-opened");
  }

  if (evt.key === "Escape") { // Картинка
    popupImage.classList.remove("popup_is-opened");
  }
}

document.addEventListener("keydown", formCloseEsc); // Слушатель для Esc

// Функция отправки формы редактирования
function handleProfileformSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  closeEditProfileForm();
}

formEditElement.addEventListener("submit", handleProfileformSubmit);

// Функция добавления новой карточки из формы
function handleAddCardSubmit(evt) {
  evt.preventDefault();
  placesList.prepend(
    createCard(
      { name: titleInput.value, link: linkInput.value },
      deleteCard,
      toggleLike,
      openImage
    )
  );
  closeNewAddForm();
  formAddElement.reset();
}

formAddElement.addEventListener("submit", handleAddCardSubmit);

// Вызов функции добавления карточек из массива
arrInitialCards(initialCards);