export { openPopup, closePopup };

// Функция добавления класса открытия формы
function openPopup(popup) {
  popup.classList.add("popup_is-opened", "popup_is-animated");
}
  
  
// Функция удаления класса открытия формы
function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
}