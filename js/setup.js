'use strict';

const MAGE_NAME = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
const MAGE_SURNAME = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
const COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
const EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
const MAGE_QUANTITY = `4`;

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

renderSetup();
