'use strict';

const MAGE_NAME = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
const MAGE_SURNAME = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
const COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
const FIREBALL_COLORS = [`#ee4830`, `#30a8ee`, `#5ce6c0`, `#e848d5`, `#e6e848`];
const EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
const MAGE_QUANTITY = `4`;

// M4-T1
const setupOpen = document.querySelector('.setup-open');
const setup = document.querySelector('.setup');
const setupClose = setup.querySelector('.setup-close');
const mageCoat = setup.querySelector('.wizard-coat');
const mageEyes = setup.querySelector('.wizard-eyes');
const fireballColor = setup.querySelector('.setup-fireball-wrap');
const setupForm = document.querySelector('.setup-wizard-form');
const mageCoatField = setupForm.querySelector('input[name="coat-color"]');
const mageEyesField = setupForm.querySelector('input[name="eyes-color"]');
const fireballColorField = setupForm.querySelector('input[name="fireball-color"]');

const onPopupEscPress = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closePopup();
  }
};
const openPopup = () => {
  setup.classList.remove(`hidden`);
  document.addEventListener('keydown', onPopupEscPress);
};
const closePopup = () => {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};
// Изменение цветов у мага
const changeCoat = () => {
  const randomCoatColor = getRandomMageFeatures(COAT_COLORS);
  mageCoat.style.fill = randomCoatColor;
  mageCoatField.value = randomCoatColor;
};

const changeEyes = () => {
  const randomEyesColor = getRandomMageFeatures(EYES_COLORS);
  mageEyes.style.fill = randomEyesColor;
  mageEyesField.value = randomEyesColor;
};

const changeFireball = () => {
  const randomFireballColor = getRandomMageFeatures(FIREBALL_COLORS);
  fireballColor.style.background = randomFireballColor;
  fireballColorField.value = randomFireballColor;
};

const getRandomMageFeatures = (array) => array[Math.floor(Math.random() * array.length)];

let getMage = (number) => {
  let mageArray = [];
  for (var i = 0; i < number; i++) {
    mageArray.push({
      name: getRandomMageFeatures(MAGE_NAME) + ' ' + getRandomMageFeatures(MAGE_SURNAME),
      coatColor: getRandomMageFeatures(COAT_COLORS),
      eyeColor: getRandomMageFeatures(EYES_COLORS)
    });
  }
  return mageArray;
};

let renderMage = (mage) => {
  let template = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
  let mageItem = template.cloneNode(true);
  mageItem.querySelector(`.setup-similar-label`).textContent = mage.name;
  mageItem.querySelector(`.wizard-coat`).style.fill = mage.coatColor;
  mageItem.querySelector(`.wizard-eyes`).style.fill = mage.eyeColor;
  return mageItem;
};

let buildFragment = (mageArray) => {
  let fragment = document.createDocumentFragment();
  mageArray.forEach((item) => {
    fragment.appendChild(renderMage(item));
  });
  return fragment;
};

let renderSetup = () => {
  let setupWindow = document.querySelector('.setup');
  let similarMage = setupWindow.querySelector('.setup-similar-list');
  let similarMageBlock = setupWindow.querySelector('.setup-similar');
  similarMage.appendChild(buildFragment(getMage(MAGE_QUANTITY)));
  setupWindow.classList.remove('hidden');
  similarMageBlock.classList.remove('hidden');
};
// Появление окна настроек

setupOpen.addEventListener(`click`, openPopup);

setupOpen.addEventListener(`keydown`, function (evt) {
  if (evt.key === `Enter`) {
    openPopup();
  }
});

setupClose.addEventListener(`click`, closePopup);

setupClose.addEventListener(`keydown`, function (evt) {
  if (evt.key === `Enter`) {
    closePopup();
  }
});

mageCoat.addEventListener(`click`, changeCoat);
mageEyes.addEventListener(`click`, changeEyes);
fireballColor.addEventListener(`click`, changeFireball);

renderSetup();
