/**
 * Framehouse Rentals - Customer Rental Cart System
 * Manages customer rental cart, quantity validation, and localStorage integration.
 */
(() => {
	const CART_STORAGE_KEY = 'cameraRentalCart';

	function getLanguage() {
		return window.siteLanguage || localStorage.getItem('framehouse-language') || 'id';
	}

	function showToast(message, isError = false) {
		let toast = document.querySelector('.rental-toast');
		if (!toast) {
			toast = document.createElement('div');
			toast.className = 'rental-toast';
			toast.setAttribute('role', 'status');
			toast.setAttribute('aria-live', 'polite');
			document.body.appendChild(toast);
		}
		toast.textContent = message;
		toast.classList.toggle('rental-toast--error', Boolean(isError));
		toast.classList.add('is-visible');

		if (window._rentalToastTimer) clearTimeout(window._rentalToastTimer);
		window._rentalToastTimer = setTimeout(() => {
			toast.classList.remove('is-visible');
		}, 3000);
	}

	function getCustomerLoginUrl() {
		const path = window.location.pathname.replace(/\\/g, '/');
		if (path.includes('/products/product-detail/') || path.includes('/products/camera/') || path.includes('/products/lens/') || path.includes('/customer/rental-cart/') || path.includes('/customer/rental-request/')) {
			return '../../customer/login.html';
		}
		if (path.includes('/products/') || path.includes('/customer/')) {
			return '../customer/login.html';
		}
		return 'customer/login.html';
	}

	function getCart() {
		try {
			const data = localStorage.getItem(CART_STORAGE_KEY);
			return data ? JSON.parse(data) : [];
		} catch (e) {
			console.error('Error loading rental cart:', e);
			return [];
		}
	}

	function saveCart(cart) {
		try {
			localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
		} catch (e) {
			console.error('Error saving rental cart:', e);
		}
		updateNavbarCartCount();
		document.dispatchEvent(new CustomEvent('cartupdated', { detail: cart }));
	}

	function updateNavbarCartCount() {
		const cart = getCart();
		const count = cart.length; // number of different products
		const lang = getLanguage();
		const itemText = lang === 'en' ? `${count} item${count === 1 ? '' : 's'}` : `${count} item`;

		document.querySelectorAll('.header-action--cart').forEach((link) => {
			const small = link.querySelector('small');
			if (small) {
				small.textContent = itemText;
			}
			const countBadge = link.querySelector('.cart-count-badge');
			if (countBadge) {
				countBadge.textContent = count;
				countBadge.hidden = count === 0;
			}
		});
	}

	function addToRentalCart(productId) {
		const lang = getLanguage();

		// Check login requirement
		if (window.CameraAuth && !window.CameraAuth.isLoggedIn()) {
			const loginMsg = lang === 'en'
				? 'Please login first to rent equipment.'
				: 'Silakan login terlebih dahulu untuk melakukan rental.';
			showToast(loginMsg, true);
			setTimeout(() => {
				window.location.href = getCustomerLoginUrl();
			}, 900);
			return false;
		}

		if (!window.CameraProducts) {
			console.error('CameraProducts module not loaded.');
			return false;
		}

		const product = window.CameraProducts.getById(productId);
		if (!product) {
			console.error('Product not found:', productId);
			return false;
		}

		if (product.available < 1) {
			const unavailMsg = lang === 'en'
				? 'This item is currently out of stock.'
				: 'Unit peralatan ini sedang tidak tersedia.';
			showToast(unavailMsg, true);
			return false;
		}

		const cart = getCart();
		const existingItem = cart.find((item) => item.productId === product.id);

		if (existingItem) {
			if (existingItem.quantity + 1 > product.available) {
				const stockMsg = lang === 'en'
					? 'Quantity exceeds available stock.'
					: 'Jumlah melebihi unit yang tersedia.';
				showToast(stockMsg, true);
				return false;
			}
			existingItem.quantity += 1;
			saveCart(cart);
			const successMsg = lang === 'en'
				? 'Product added to rental list.'
				: 'Produk berhasil ditambahkan ke daftar rental.';
			showToast(successMsg, false);
			return true;
		}

		const today = new Date().toISOString().split('T')[0];
		const endObj = new Date();
		endObj.setDate(endObj.getDate() + 3);
		const defaultEnd = endObj.toISOString().split('T')[0];

		cart.push({
			productId: product.id,
			name: product.name,
			category: product.category,
			brand: product.brand,
			dailyPrice: product.dailyPrice,
			quantity: 1,
			image: product.imageText || product.name,
			rentalStart: today,
			rentalEnd: defaultEnd
		});

		saveCart(cart);
		const successMsg = lang === 'en'
			? 'Product added to rental list.'
			: 'Produk berhasil ditambahkan ke daftar rental.';
		showToast(successMsg, false);
		return true;
	}

	function updateQuantity(productId, delta) {
		const cart = getCart();
		const item = cart.find((i) => i.productId === productId);
		if (!item) return;

		const product = window.CameraProducts?.getById(productId);
		const maxStock = product ? product.available : 99;
		const lang = getLanguage();

		const nextQty = item.quantity + delta;

		if (nextQty < 1) {
			// Validation: minimum = 1
			return;
		}

		if (nextQty > maxStock) {
			const msg = lang === 'en'
				? 'Quantity exceeds available stock.'
				: 'Jumlah melebihi unit yang tersedia.';
			showToast(msg, true);
			return;
		}

		item.quantity = nextQty;
		saveCart(cart);
	}

	function removeItem(productId) {
		const cart = getCart().filter((i) => i.productId !== productId);
		saveCart(cart);
		const lang = getLanguage();
		showToast(lang === 'en' ? 'Equipment removed from rental cart.' : 'Peralatan dihapus dari daftar rental.');
	}

	function clearCart() {
		localStorage.removeItem(CART_STORAGE_KEY);
		updateNavbarCartCount();
		document.dispatchEvent(new CustomEvent('cartupdated', { detail: [] }));
	}

	document.addEventListener('DOMContentLoaded', () => {
		updateNavbarCartCount();
	});

	document.addEventListener('languagechange', () => {
		updateNavbarCartCount();
	});

	window.CameraCart = {
		CART_STORAGE_KEY,
		getCart,
		saveCart,
		addToRentalCart,
		updateQuantity,
		removeItem,
		clearCart,
		updateNavbarCartCount,
		showToast
	};

	window.addToRentalCart = (id) => addToRentalCart(id);
})();
