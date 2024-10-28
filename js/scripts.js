(function () {
	// Popover
	$(function () {
		$('[data-toggle="popover"]').popover(options);
	});

	// Tooltip
	$(function () {
		$('[data-toggle="tooltip"]').tooltip(options);
	});
})();

// Botão de copiar podcast

const copyButton = document.querySelectorAll('.copy-to-clip');

copyButton.forEach(btn => {
	btn.addEventListener('click', () => {
		copyToClipboard(btn);
		// tooltipShow(btn);

		tooltipFeedback(btn);
	});
});

function copyToClipboard(e) {
	const textToCopy = e.getAttribute('data-link');
	const textarea = document.createElement('textarea');
	textarea.setAttribute('readonly', '');
	textarea.style.position = 'absolute';
	textarea.value = textToCopy;
	document.body.appendChild(textarea);
	textarea.select();
	document.execCommand('copy');
	document.body.removeChild(textarea);
}
function tooltipFeedback(b) {
	let feedback = $('[data-toggle="tooltip"]');

	// feedback.tooltip('show');

	b.addEventListener('mouseout', () => {
		feedback.tooltip('hide');
	});
}

// Lightbox (insert the class "lightbox" into <figure>)

const imageToLightbox = document.querySelectorAll('.lightbox');

imageToLightbox.forEach(image => {
	image.addEventListener('click', () => {
		if (!image.classList.contains('lightbox--show')) {
			const getImage = image.querySelector('img');
			const getImageSrc = getImage.getAttribute('src');
			const imageLightbox = document.createElement('div');

			imageLightbox.classList.add('lightbox__image');

			document.body.appendChild(imageLightbox);
			imageLightbox.innerHTML = `<img src="${getImageSrc}"/>`;
			console.log(getImageSrc);

			image.classList.add('lightbox--show');

			document.body.style.overflow = 'hidden';
			document.body.style.userSelect = 'none';

			closeLightbox(imageLightbox);
		}

		function closeLightbox(e) {
			const lightboxOpen = document.querySelector('.lightbox__image');
			e.addEventListener('click', () => {
				document.body.removeChild(e);
				image.classList.remove('lightbox--show');
				document.body.style.overflow = 'auto';
				document.body.style.userSelect = 'auto';
			});
		}
	});
});

// Accordion Scroll to Selected Item

const accordions = document.querySelectorAll('.accordion__header > a');

accordions.forEach(accordion => {
	accordion.addEventListener('show.bs.collapse', function () {
		console.log('fechou');
	});
});
