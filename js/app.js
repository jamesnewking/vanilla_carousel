const carouselSlide = document.querySelector(`.carousel-slide`);
const carouselImages = document.querySelectorAll(`.carousel-slide img`);
const previousButton = document.querySelector(`#previousButton`);
const nextButton = document.querySelector(`#nextButton`);
const pageDots = document.querySelectorAll(`.page-dots li`);
const carouselLength = carouselImages.length - 2;
let noClicks = true;
let counter = 1;
let pageCounter = counter;
const imgWidth = carouselImages[0].clientWidth;
carouselSlide.style.transform = `translateX( ${-imgWidth * counter}px)`;

const updateCarousel = (animate = true) => {
    carouselSlide.style.transition = animate ? `transform 0.4s ease-in-out` : `none`;
    carouselSlide.style.transform = `translateX( ${-imgWidth * counter}px)`;
    pageCounter = counter == 0 ? 0 : (counter-1) % carouselLength;
    animate ? null: pageDots[0].classList.remove(`active`);
    pageDots[pageCounter].classList.add(`active`);
}

nextButton.addEventListener(`click`, () => {
    if(noClicks){
        noClicks = false;
        setTimeout(() => {
            pageDots[counter-1 % carouselLength].classList.remove(`active`);
            counter++;
            updateCarousel();
            noClicks = true;
        }, 400);
        // clearInterval();
    }
})

previousButton.addEventListener(`click`, () => {
    if(noClicks){
        noClicks = false;
        setTimeout( () => {
            pageDots[pageCounter].classList.remove(`active`);
            counter--;
            updateCarousel();
            noClicks = true;
        }, 400);
    }
});

carouselSlide.addEventListener(`transitionend`, () => {
    if(carouselImages[counter].id === `lastClone`){
        counter = carouselLength;
        updateCarousel(false);
    }
    if(carouselImages[counter].id === `firstClone`){
        counter = 1;
        updateCarousel(false);
    }
});

let intervalID = setInterval( () => {
    nextButton.click();
    // console.log(`triggered! ${intervalID}`);
}, 4000 );

const clearInterval = () => {
    console.log(intervalID);
    clearInterval(intervalID);
}