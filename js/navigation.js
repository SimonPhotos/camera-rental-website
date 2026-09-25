const menuToggle = document.querySelector('.menu-toggle');
const mainNavigation = document.querySelector('.main-nav');
const dropdownButtons = document.querySelectorAll('.nav-dropdown > button');

menuToggle?.addEventListener('click', () => {
	const isOpen = mainNavigation.classList.toggle('is-open');
	menuToggle.setAttribute('aria-expanded', String(isOpen));
});

dropdownButtons.forEach((button) => {
	button.addEventListener('click', () => {
		const dropdown = button.parentElement;
		const isOpen = dropdown.classList.toggle('is-open');
		button.setAttribute('aria-expanded', String(isOpen));
		dropdownButtons.forEach((otherButton) => {
			if (otherButton !== button) {
				otherButton.parentElement.classList.remove('is-open');
				otherButton.setAttribute('aria-expanded', 'false');
			}
		});
	});
});

document.addEventListener('click', (event) => {
	if (!event.target.closest('.main-nav')) {
		dropdownButtons.forEach((button) => {
			button.parentElement.classList.remove('is-open');
			button.setAttribute('aria-expanded', 'false');
		});
	}
});
