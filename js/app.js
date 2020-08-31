const carouselSlide = document.querySelector(`.carousel-slide`);
const carouselImages = document.querySelectorAll(`.carousel-slide img`);

const previousButton = document.querySelector(`#previousButton`);
const nextButton = document.querySelector(`#nextButton`);

const pageDots = document.querySelectorAll(`.page-dots li`);

let noClicks = true;

let counter = 1;
let pageCounter = counter;
const imgWidth = carouselImages[0].clientWidth;

carouselSlide.style.transform = `translateX( ${-imgWidth * counter}px)`;

const updateCarousel = (animate = true) => {
    carouselSlide.style.transition = animate ? `transform 0.4s ease-in-out` : `none`;
    carouselSlide.style.transform = `translateX( ${-imgWidth * counter}px)`;

    console.log(counter);
    pageCounter = counter == 0 ? 0 : (counter-1) % pageDots.length;
    pageDots[pageCounter].classList.add(`active`);
}

nextButton.addEventListener(`click`, () => {
    if(noClicks){
        noClicks = false;
        setTimeout(() => {
            pageDots[counter-1].classList.remove(`active`);
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
            pageDots[counter-1 % pageDots.length].classList.remove(`active`);
            counter--;
            updateCarousel();
            noClicks = true;
        }, 400);
    }
});

carouselSlide.addEventListener(`transitionend`, () => {
    if(carouselImages[counter].id === `lastClone`){
        counter = carouselImages.length -2;
        // pageDots[counter-1].classList.remove(`active`);
        updateCarousel(false);
    }
    if(carouselImages[counter].id === `firstClone`){
        counter = 1;
        pageDots[counter-1].classList.remove(`active`);
        updateCarousel(false);
    }
});

let intervalID = setInterval( () => {
    nextButton.click();
    console.log(`triggered! ${intervalID}`);
}, 3000 );

const clearInterval = () => {
    console.log(intervalID);
    clearInterval(intervalID);
}