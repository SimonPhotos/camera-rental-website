document.querySelectorAll('.wishlist-button').forEach((button) => {
	button.addEventListener('click', () => {
		const isSaved = button.classList.toggle('is-saved');
		button.textContent = isSaved ? '♥' : '♡';
		button.setAttribute('aria-pressed', String(isSaved));
	});
});
