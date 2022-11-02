
let photoPrevButton = document.querySelector('.photo__prev');
let photoNextButton = document.querySelector('.photo__next');
const swiper = document.querySelector('.photo__container');
let sliderWidth = document.querySelector('.photo__slider');
import listPhoto from "./listPhoto.js";
let listLength = listPhoto.length;

let widthUser = document.documentElement.clientWidth;
let amountCards = 6;
let widthTablet = 894;
let widthPhone = 540;
let counterSlides = 0;
if (widthUser <= widthTablet) {
	amountCards = 4;
}
if (widthUser <= widthPhone) { amountCards = 2; }

function createItem(counter) {
	const photoItem = document.createElement('div');
	const photoImage = document.createElement('div');
	const photoContent = document.createElement('div');
	const photoText = document.createElement('div');
	const photoTitle = document.createElement('h3');
	const photoSubTitle = document.createElement('h4');
	const photoIcons = document.createElement('div');
	photoItem.classList.add('photo__item');
	photoImage.classList.add('photo__image');
	photoContent.classList.add('photo__content');
	photoText.classList.add('photo__text');
	photoTitle.classList.add('photo__title');
	photoSubTitle.classList.add('photo__sub-title');
	photoIcons.classList.add('photo__icons');
	photoTitle.textContent = listPhoto[counter].title;
	photoSubTitle.textContent = listPhoto[counter].subTitle;
	photoImage.style.backgroundImage = `url(${listPhoto[counter].src})`;
	photoIcons.style.backgroundImage = `url(${listPhoto[counter].srcIcon})`;
	photoItem.append(photoImage);
	photoItem.append(photoContent);
	photoContent.append(photoText);
	photoContent.append(photoIcons);
	photoText.append(photoTitle);
	photoText.append(photoSubTitle);
	photoItem.classList.add('photo__item');
	return photoItem;
}

function createSlide(amountCards, classSlide) {
	const photoItems = document.createElement('div');
	photoItems.classList.add('photo__items');
	photoItems.classList.add(classSlide);
	for (let i = 0; i < amountCards; i++) {
		photoItems.append(createItem(i));
	}
	swiper.append(photoItems);
}


function createSlideRandom(amountCards, classSlide) {
	const photoItems = document.createElement('div');
	photoItems.classList.add('photo__items');
	photoItems.classList.add(classSlide);
	for (let i = counterSlides; i < (counterSlides + amountCards); i++) {
		photoItems.append(createItem(i));
	}
	swiper.append(photoItems);
}
createSlide(amountCards, 'active');

let currentItem = document.querySelector('.active');

sliderWidth.style.height = currentItem.offsetHeight + 'px';
console.log(currentItem.offsetHeight);
console.log(sliderWidth.offsetHeight);

console.log(currentItem);

photoNextButton.addEventListener('click', (e) => {
	photoPrevButton.classList.remove('unvisible');
	counterSlides = counterSlides + amountCards;
	console.log(counterSlides);
	console.log(listLength - amountCards);
	if (counterSlides >= (listLength - amountCards)) {
		photoNextButton.classList.add('unvisible');
	}
	createSlideRandom(amountCards, 'next');
	currentItem.classList.add('to-left');
	let photoNext = document.querySelector('.next');
	photoNext.classList.add('from-right');
	currentItem.addEventListener('animationend', () => {
		currentItem.classList.remove('active');
		photoNext.classList.remove('next');
		photoNext.classList.add('active');
		currentItem = document.querySelector('.active');
		currentItem.classList.remove('from-right');
	
			album();
		
	})

}
);

photoPrevButton.addEventListener('click', () => {
	photoNextButton.classList.remove('unvisible');
	counterSlides = counterSlides - amountCards;
	if (counterSlides < 0) {
		counterSlides = listLength - amountCards;
	}
	if (counterSlides == 0) { photoPrevButton.classList.add('unvisible'); }

	console.log(counterSlides);
	createSlideRandom(amountCards, 'next');
	currentItem.classList.add('to-right');
	let photoNext = document.querySelector('.next');
	photoNext.classList.add('from-left');
	currentItem.addEventListener('animationend', () => {
		currentItem.classList.remove('active');
		photoNext.classList.remove('next');
		photoNext.classList.add('active');
		currentItem = document.querySelector('.active');
		currentItem.classList.remove('from-left');
			album();
		})
	});

	album();

function album() {
	if (widthUser > widthPhone) {
		let itemOnScreen = [];
		itemOnScreen = currentItem.querySelectorAll('.photo__item');
		for (let i = 0; i < itemOnScreen.length; i++) {
			itemOnScreen[i].addEventListener('click', () => {
				console.log(i);
				let itemScreen = document.createElement('div');
				sliderWidth.append(itemScreen);
				itemScreen.style.backgroundImage = `url(${listPhoto[i + counterSlides].src})`;
				itemScreen.classList.add('screen');
				itemScreen.addEventListener('click', () => { itemScreen.remove(); });
			})
		}
	}
}








