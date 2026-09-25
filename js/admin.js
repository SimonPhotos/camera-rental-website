(() => {
	const sidebar = document.querySelector('[data-admin-sidebar]');
	const toggle = document.querySelector('[data-admin-sidebar-toggle]');
	const close = document.querySelector('[data-admin-sidebar-close]');
	const toast = document.querySelector('[data-admin-toast]');
	const adminLogin = document.querySelector('[data-admin-login]');

	function setSidebar(open) {
		sidebar?.classList.toggle('is-open', open);
		toggle?.setAttribute('aria-expanded', String(open));
	}
	function showToast(message) {
		if (!toast) return;
		toast.textContent = message;
		toast.classList.add('is-visible');
		window.setTimeout(() => toast.classList.remove('is-visible'), 2400);
	}
	function language() { return window.siteLanguage || localStorage.getItem('framehouse-language') || 'id'; }

	toggle?.addEventListener('click', () => setSidebar(!sidebar.classList.contains('is-open')));
	close?.addEventListener('click', () => setSidebar(false));
	document.addEventListener('click', (event) => {
		if (window.innerWidth <= 820 && sidebar?.classList.contains('is-open') && !event.target.closest('.admin-sidebar, [data-admin-sidebar-toggle]')) setSidebar(false);
	});

	document.querySelectorAll('[data-admin-action]').forEach((button) => {
		button.addEventListener('click', () => showToast(language() === 'id' ? 'Aksi demo dipilih.' : 'Demo action selected.'));
	});
	document.querySelectorAll('[data-admin-status]').forEach((select) => {
		select.addEventListener('change', () => showToast(language() === 'id' ? `Status diperbarui menjadi ${select.value}.` : `Status updated to ${select.value}.`));
	});
	document.querySelectorAll('[data-admin-filter]').forEach((input) => {
		input.addEventListener('input', () => {
			const term = input.value.toLowerCase();
			document.querySelectorAll('[data-filter-row]').forEach((row) => { row.hidden = term && !row.innerText.toLowerCase().includes(term); });
		});
	});
	document.querySelector('[data-admin-logout]')?.addEventListener('click', () => {
		const confirmed = window.confirm(language() === 'id' ? 'Keluar dari area admin demo?' : 'Leave the admin demo area?');
		if (confirmed) window.location.href = '../login/index.html';
	});
	adminLogin?.addEventListener('submit', (event) => {
		event.preventDefault();
		const email = adminLogin.querySelector('[name="email"]');
		const password = adminLogin.querySelector('[name="password"]');
		const error = adminLogin.querySelector('[data-admin-login-error]');
		if (!email.value.trim() || !password.value.trim()) { error.textContent = language() === 'id' ? 'Email dan password wajib diisi.' : 'Email and password are required.'; return; }
		if (!email.value.includes('@') || password.value.length < 8) { error.textContent = language() === 'id' ? 'Masukkan email valid dan password minimal 8 karakter.' : 'Enter a valid email and a password of at least 8 characters.'; return; }
		window.location.href = '../dashboard/index.html';
	});
})();
