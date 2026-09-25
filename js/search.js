const searchForm = document.querySelector('[data-search-form]');

searchForm?.addEventListener('submit', (event) => {
	event.preventDefault();
	const searchInput = searchForm.querySelector('input');
	const query = searchInput.value.trim();
	if (query) {
		const target = searchForm.dataset.searchTarget || 'pages/search/index.html';
		window.location.href = `${target}?q=${encodeURIComponent(query)}`;
	}
});
