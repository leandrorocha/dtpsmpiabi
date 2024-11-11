// Instant Animation

const headerTitleLabel = document.querySelector('.header__title div div div:first-child');
const headerTitle = document.querySelector('.header__title div div div:last-child');

function animate(element, type, delay) {
	if (!element) {
	  return;
	}
  
	element.classList.add('animate__animated', 'animate__' + type);
	element.style.animationDelay = delay;
  }
  

animate(headerTitleLabel, 'fadeIn', '0.2s');
animate(headerTitle, 'fadeIn', '0.5s');

// Intersection Observer Animation - CARDS

const cards = document.querySelectorAll('.card.shadow');

const options = {
	root: null, //it is the viewport
	rootMargin: '-150px',
	threshold: 0,
};

const observerCards = new IntersectionObserver(function (entries, observer) {
	entries.forEach(entry => {
		if (entry.isIntersecting) {
			// .log(entry.target)
			entry.target.classList.add('card--in');
			entry.target.classList.remove('card--out');
		} else {
			// .log(entry.target)
			entry.target.classList.remove('card--in');
			entry.target.classList.add('card--out');
		}
	});
}, options);

cards.forEach(card => {
	observerCards.observe(card);
});

// Intersection Observer Animation - CARDS Timeline

const timelineCards = document.querySelectorAll('.cd-timeline__content');

const optionsTimeline = {
	root: null, //it is the viewport
	rootMargin: '0px',
	threshold: 0,
};

const observerTimeline = new IntersectionObserver(function (entries, optionsTimeline) {
	entries.forEach(entry => {
		if (entry.isIntersecting) {
			//.log(entry.target)
			entry.target.classList.add('animate__animated');

			if (entry.target.classList.contains('bounce-left')) {
				entry.target.classList.remove('animate__fadeOutLeft');
				entry.target.classList.add('animate__fadeInLeft');
			} else {
				entry.target.classList.remove('animate__fadeOutRight');
				entry.target.classList.add('animate__fadeInRight');
			}
		} else {
			entry.target.classList.add('animate__animated');

			if (entry.target.classList.contains('bounce-left')) {
				entry.target.classList.remove('animate__fadeInLeft');
				entry.target.classList.add('animate__fadeOutLeft');
			} else {
				entry.target.classList.remove('animate__fadeInRight');
				entry.target.classList.add('animate__fadeOutRight');
			}
		}
	});
}, optionsTimeline);

timelineCards.forEach(card => {
	observerTimeline.observe(card);
});
