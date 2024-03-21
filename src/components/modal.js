export { openPopup, closePopup, closeFormOverlay };

// Функция открытия окна
function openPopup(popup) {
  popup.classList.add("popup_is-opened", "popup_is-animated");
  popup.addEventListener("click", closeFormOverlay);
  document.addEventListener("keydown", closeFormEsc);
}

// Функция закрытия окна
function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
  popup.removeEventListener("click", closeFormOverlay);
  document.removeEventListener("keydown", closeFormEsc);
}

// Закрытие окна кликом по оверлею
const closeFormOverlay = (evt) => {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.target);
  }
}

// Закрытие окна кнопкой Esc
const closeFormEsc = (evt) => {
  if (evt.key === "Escape") {
    closePopup(document.querySelector(".popup_is-opened"));
  }
}