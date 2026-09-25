(() => {
	const sidebar = document.querySelector('[data-dashboard-sidebar]');
	const sidebarToggle = document.querySelector('[data-sidebar-toggle]');
	const sidebarClose = document.querySelector('[data-sidebar-close]');
	const contactAdmin = document.querySelector('[data-contact-admin]');
	const notifications = document.querySelectorAll('[data-notification]');
	const details = document.querySelectorAll('[data-detail]');

	function setSidebar(open) {
		if (!sidebar) return;
		sidebar.classList.toggle('is-open', open);
		sidebarToggle?.setAttribute('aria-expanded', String(open));
	}

	sidebarToggle?.addEventListener('click', () => setSidebar(!sidebar.classList.contains('is-open')));
	sidebarClose?.addEventListener('click', () => setSidebar(false));
	document.addEventListener('click', (event) => {
		if (window.innerWidth <= 820 && sidebar?.classList.contains('is-open') && !event.target.closest('.dashboard-sidebar, [data-sidebar-toggle]')) setSidebar(false);
	});

	details.forEach((button) => {
		button.addEventListener('click', () => {
			button.textContent = window.siteLanguage === 'en' ? 'Details selected' : 'Detail dipilih';
			button.classList.add('is-selected');
		});
	});

	notifications.forEach((notification) => {
		notification.addEventListener('click', () => notification.classList.remove('is-unread'));
	});

	if (!localStorage.getItem('cameraRentalUser')) {
		localStorage.setItem('cameraRentalUser', JSON.stringify({
			email: 'customer@example.com',
			name: 'Simon Veres Sianturi',
			customerId: 'CUST-001'
		}));
	}

	contactAdmin?.addEventListener('click', () => document.querySelector('[data-chat-toggle]')?.click());
	document.querySelector('[data-logout]')?.addEventListener('click', () => {
		const confirmed = window.confirm(window.siteLanguage === 'en' ? 'Leave the demo dashboard?' : 'Keluar dari dashboard demo?');
		if (confirmed) {
			localStorage.removeItem('cameraRentalUser');
			window.location.href = 'login.html';
		}
	});
})();
