(() => {
	const AUTH_USER_KEY = 'cameraRentalUser';
	window.CameraAuth = {
		isLoggedIn() {
			try {
				return Boolean(localStorage.getItem(AUTH_USER_KEY));
			} catch (e) {
				return false;
			}
		},
		getCurrentUser() {
			try {
				const user = localStorage.getItem(AUTH_USER_KEY);
				return user ? JSON.parse(user) : null;
			} catch (e) {
				return null;
			}
		},
		login(user) {
			const demoUser = user || {
				email: 'customer@example.com',
				name: 'Simon Veres Sianturi',
				customerId: 'CUST-001'
			};
			localStorage.setItem(AUTH_USER_KEY, JSON.stringify(demoUser));
			document.dispatchEvent(new CustomEvent('authchange', { detail: demoUser }));
		},
		logout() {
			localStorage.removeItem(AUTH_USER_KEY);
			document.dispatchEvent(new CustomEvent('authchange', { detail: null }));
		}
	};

	function initLogin(form) {
		const email = form.querySelector('#login-email');
		const password = form.querySelector('#login-password');
		const success = document.querySelector('[data-login-success]');
		const notice = document.querySelector('[data-login-notice]');
		let hasAttemptedSubmit = false;
		const messages = {
			id: { emailRequired: 'Email wajib diisi.', emailInvalid: 'Masukkan email yang valid.', passwordRequired: 'Password wajib diisi.', passwordShort: 'Password minimal 8 karakter.', forgot: 'Fitur reset password akan tersedia setelah sistem backend diaktifkan.', success: 'Login berhasil.', welcome: 'Selamat datang kembali.', continue: 'Lanjut ke Dashboard Demo' },
			en: { emailRequired: 'Email is required.', emailInvalid: 'Enter a valid email address.', passwordRequired: 'Password is required.', passwordShort: 'Password must be at least 8 characters.', forgot: 'Password reset will be available once the backend system is connected.', success: 'Login successful.', welcome: 'Welcome back.', continue: 'Continue to Demo Dashboard' }
		};
		function language() { return window.siteLanguage || localStorage.getItem('framehouse-language') || 'id'; }
		function setError(name, message) {
			const field = form.querySelector(`#${name}`).closest('.field');
			field.classList.toggle('is-invalid', Boolean(message));
			form.querySelector(`[data-error-for="${name}"]`).textContent = message || '';
		}
		function validate() {
			const copy = messages[language()];
			setError('login-email', '');
			setError('login-password', '');
			let valid = true;
			if (!email.value.trim()) { setError('login-email', copy.emailRequired); valid = false; } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) { setError('login-email', copy.emailInvalid); valid = false; }
			if (!password.value) { setError('login-password', copy.passwordRequired); valid = false; } else if (password.value.length < 8) { setError('login-password', copy.passwordShort); valid = false; }
			return valid;
		}
		function updateSuccessCopy() {
			const copy = messages[language()];
			success.querySelector('h2').textContent = copy.success;
			success.querySelector('p:not(.eyebrow)').textContent = copy.welcome;
			success.querySelector('.button').innerHTML = `${copy.continue} <span>→</span>`;
		}
		function updateAccountLink() {
			document.querySelector('.login-account-switch a').textContent = language() === 'id' ? 'Daftar Sekarang' : 'Create Account';
		}
		function updateLoginLanguage() {
			document.querySelectorAll('.login-intro h1, .login-card__heading h2').forEach((heading) => { heading.textContent = 'Login'; });
			document.querySelector('.login-submit').innerHTML = 'Login <span>→</span>';
		}
		form.querySelector('[data-login-password-toggle]').addEventListener('click', (event) => {
			const showing = password.type === 'text';
			password.type = showing ? 'password' : 'text';
			const action = showing ? (language() === 'id' ? 'Tampilkan' : 'Show') : (language() === 'id' ? 'Sembunyikan' : 'Hide');
			event.currentTarget.textContent = action;
			event.currentTarget.setAttribute('aria-label', `${action} ${language() === 'id' ? 'password' : 'password'}`);
		});
		document.querySelector('[data-forgot-password]').addEventListener('click', (event) => {
			event.preventDefault();
			notice.textContent = messages[language()].forgot;
			notice.dataset.kind = 'forgot';
		});
		form.addEventListener('submit', (event) => {
			event.preventDefault();
			hasAttemptedSubmit = true;
			notice.textContent = '';
			if (!validate()) return;
			const loggedInEmail = email.value.trim();
			window.CameraAuth?.login({
				email: loggedInEmail,
				name: loggedInEmail.split('@')[0] || 'Simon Veres Sianturi',
				customerId: 'CUST-001'
			});
			form.hidden = true;
			success.hidden = false;
			document.querySelector('.login-account-switch').hidden = true;
			document.querySelector('.demo-note').hidden = true;
			updateSuccessCopy();
		});
		document.addEventListener('languagechange', () => {
			updateAccountLink();
			updateLoginLanguage();
			if (hasAttemptedSubmit && !form.hidden) validate();
			if (notice.dataset.kind === 'forgot') notice.textContent = messages[language()].forgot;
			if (form.hidden) updateSuccessCopy();
		});
		updateAccountLink();
		updateLoginLanguage();
	}

	const form = document.querySelector('[data-registration-form]');
	if (!form) {
		const loginForm = document.querySelector('[data-login-form]');
		if (loginForm) initLogin(loginForm);
		return;
	}

	const fields = {
		fullName: form.querySelector('#full-name'),
		email: form.querySelector('#email'),
		whatsapp: form.querySelector('#whatsapp'),
		password: form.querySelector('#password'),
		confirmPassword: form.querySelector('#confirm-password'),
		terms: form.querySelector('#terms')
	};
	const success = document.querySelector('[data-registration-success]');
	let hasAttemptedSubmit = false;
	const originalErrors = {
		id: {
			fullName: 'Nama lengkap wajib diisi.', email: 'Masukkan alamat email yang valid.', whatsapp: 'Nomor WhatsApp wajib diisi.', whatsappFormat: 'Gunakan format nomor Indonesia +62 atau 08.', password: 'Password minimal 8 karakter.', passwordRules: 'Password harus mengandung huruf besar, huruf kecil, dan angka.', confirmPassword: 'Password tidak cocok.', terms: 'Anda harus menyetujui Syarat & Ketentuan.'
		},
		en: {
			fullName: 'Full name is required.', email: 'Enter a valid email address.', whatsapp: 'WhatsApp number is required.', whatsappFormat: 'Use an Indonesian +62 or 08 number format.', password: 'Password must be at least 8 characters.', passwordRules: 'Password must contain uppercase, lowercase, and a number.', confirmPassword: 'Passwords do not match.', terms: 'You must agree to the Terms & Conditions.'
		}
	};
	const successCopy = {
		id: { title: 'Registrasi berhasil!', body: 'Selamat datang. Akun demo Anda berhasil dibuat.', home: 'Kembali ke Beranda' },
		en: { title: 'Registration successful!', body: 'Welcome. Your demo account has been created successfully.', home: 'Back to Home' }
	};

	function language() { return window.siteLanguage || localStorage.getItem('framehouse-language') || 'id'; }
	function errorElement(name) { return form.querySelector(`[data-error-for="${name}"]`); }
	function setError(name, message) {
		const field = fields[name]?.closest('.field, .terms-field');
		field?.classList.toggle('is-invalid', Boolean(message));
		if (errorElement(name)) errorElement(name).textContent = message || '';
	}
	function passwordRules(password) { return { length: password.length >= 8, uppercase: /[A-Z]/.test(password), lowercase: /[a-z]/.test(password), number: /\d/.test(password) }; }
	function updatePasswordRequirements() {
		const rules = passwordRules(fields.password.value);
		Object.entries(rules).forEach(([rule, passed]) => form.querySelector(`[data-requirement="${rule}"]`)?.classList.toggle('is-met', passed));
	}
	function validate() {
		const messages = originalErrors[language()];
		Object.keys(fields).forEach((name) => setError(name, ''));
		let valid = true;
		if (!fields.fullName.value.trim()) { setError('fullName', messages.fullName); valid = false; }
		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email.value.trim())) { setError('email', messages.email); valid = false; }
		const phone = fields.whatsapp.value.replace(/[\s-]/g, '');
		if (!phone) { setError('whatsapp', messages.whatsapp); valid = false; } else if (!/^(?:\+62|62|0)8\d{7,12}$/.test(phone)) { setError('whatsapp', messages.whatsappFormat); valid = false; }
		const rules = passwordRules(fields.password.value);
		if (fields.password.value.length < 8) { setError('password', messages.password); valid = false; } else if (!rules.uppercase || !rules.lowercase || !rules.number) { setError('password', messages.passwordRules); valid = false; }
		if (!fields.confirmPassword.value || fields.confirmPassword.value !== fields.password.value) { setError('confirmPassword', messages.confirmPassword); valid = false; }
		if (!fields.terms.checked) { setError('terms', messages.terms); valid = false; }
		return valid;
	}
	function updateSuccessCopy() {
		const copy = successCopy[language()];
		success.querySelector('h2').textContent = copy.title;
		success.querySelector('p:not(.eyebrow)').textContent = copy.body;
		success.querySelector('.button').innerHTML = `${copy.home} <span>→</span>`;
	}

	form.querySelectorAll('[data-password-toggle]').forEach((button) => {
		button.addEventListener('click', () => {
			const input = form.querySelector(`#${button.dataset.passwordToggle}`);
			const showing = input.type === 'text';
			input.type = showing ? 'password' : 'text';
			button.textContent = showing ? 'Show' : 'Hide';
			button.setAttribute('aria-label', `${showing ? 'Show' : 'Hide'} ${input.id === 'password' ? 'password' : 'confirm password'}`);
		});
	});
	fields.password.addEventListener('input', updatePasswordRequirements);
	fields.confirmPassword.addEventListener('input', () => { if (fields.confirmPassword.value) setError('confirmPassword', ''); });
	form.addEventListener('submit', (event) => {
		event.preventDefault();
		hasAttemptedSubmit = true;
		if (!validate()) return;
		window.CameraAuth?.login({
			email: fields.email.value.trim(),
			name: fields.fullName.value.trim() || 'Simon Veres Sianturi',
			whatsapp: fields.whatsapp.value.trim(),
			customerId: 'CUST-001'
		});
		form.hidden = true;
		success.hidden = false;
		updateSuccessCopy();
		document.querySelector('.account-switch').hidden = true;
	});
	document.addEventListener('languagechange', () => { if (!form.hidden && hasAttemptedSubmit) validate(); else if (form.hidden) updateSuccessCopy(); });
	updatePasswordRequirements();
})();
