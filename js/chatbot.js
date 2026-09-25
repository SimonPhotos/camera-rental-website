(() => {
	const chatbot = document.querySelector('[data-chatbot]');
	if (!chatbot) return;

	const messages = chatbot.querySelector('[data-chat-messages]');
	const quickSuggestions = chatbot.querySelector('[data-chat-quick]');
	const form = chatbot.querySelector('[data-chat-form]');
	const input = chatbot.querySelector('[data-chat-input]');
	const windowElement = chatbot.querySelector('.chat-window');
	const toggle = chatbot.querySelector('[data-chat-toggle]');
	const close = chatbot.querySelector('[data-chat-close]');
	let messageSequence = 0;

	const copy = {
		id: {
			greeting: 'Halo! Saya Rental Assistant. Ada yang bisa saya bantu?',
			quick: ['Rekomendasi Kamera', 'Harga Rental', 'Cek Ketersediaan', 'Cara Rental', 'Hubungi Admin'],
			responses: {
				camera: 'Tentu. Kami menyediakan berbagai kategori kamera seperti Mirrorless, Cinema Camera, Action Camera, dan Camcorder.',
				price: 'Untuk harga rental, silakan pilih equipment yang ingin Anda gunakan. Harga akan ditampilkan pada halaman detail produk.',
				rent: 'Untuk melakukan rental, pilih equipment yang Anda butuhkan lalu tentukan tanggal rental dan pengembalian.',
				availability: 'Untuk mengecek ketersediaan, pilih equipment dan tanggal rental. Tim kami akan membantu mengonfirmasinya.',
				admin: 'Silakan hubungi admin melalui WhatsApp atau halaman kontak untuk bantuan lebih lanjut.',
				default: 'Baik, saya bisa membantu mengenai equipment, rental, harga, ketersediaan, dan proses penyewaan.'
			}
		},
		en: {
			greeting: "Hello! I'm the Rental Assistant. How can I help you?",
			quick: ['Camera Recommendation', 'Rental Prices', 'Check Availability', 'How to Rent', 'Contact Admin'],
			responses: {
				camera: 'Certainly. We provide camera categories including Mirrorless, Cinema Camera, Action Camera, and Camcorder.',
				price: 'For rental prices, choose the equipment you need. Pricing will be shown on the product detail page.',
				rent: 'To rent equipment, choose what you need and select your rental and return dates.',
				availability: 'To check availability, choose the equipment and rental dates. Our team will help confirm it.',
				admin: 'Please contact our admin through WhatsApp or the contact page for further assistance.',
				default: 'I can help with equipment, rentals, pricing, availability, and the rental process.'
			}
		}
	};

	function getLanguage() {
		return window.siteLanguage || localStorage.getItem('framehouse-language') || 'id';
	}

	function timeStamp() {
		return new Intl.DateTimeFormat(getLanguage() === 'id' ? 'id-ID' : 'en-US', { hour: '2-digit', minute: '2-digit' }).format(new Date());
	}

	function addMessage(text, sender = 'assistant') {
		const message = document.createElement('div');
		message.className = `chat-message chat-message--${sender}`;
		message.style.setProperty('--message-order', messageSequence++);
		message.innerHTML = `<p>${text}</p><time>${timeStamp()}</time>`;
		messages.appendChild(message);
		messages.scrollTop = messages.scrollHeight;
	}

	function showTyping() {
		const typing = document.createElement('div');
		typing.className = 'chat-typing';
		typing.dataset.typing = 'true';
		typing.setAttribute('aria-label', getLanguage() === 'id' ? 'Assistant sedang mengetik' : 'Assistant is typing');
		typing.innerHTML = '<i></i><i></i><i></i>';
		messages.appendChild(typing);
		messages.scrollTop = messages.scrollHeight;
	}

	function replyFor(text) {
		const normalized = text.toLowerCase();
		const responses = copy[getLanguage()].responses;
		if (/(harga|price|biaya|cost)/.test(normalized)) return responses.price;
		if (/(kamera|camera|mirrorless|cinema)/.test(normalized)) return responses.camera;
		if (/(sewa|rental|rent|menyewa)/.test(normalized)) return responses.rent;
		if (/(tersedia|availability|ketersediaan|cek)/.test(normalized)) return responses.availability;
		if (/(admin|kontak|contact|hubungi)/.test(normalized)) return responses.admin;
		return responses.default;
	}

	function sendMessage(text) {
		const cleanText = text.trim();
		if (!cleanText) return;
		addMessage(cleanText, 'user');
		input.value = '';
		showTyping();
		window.setTimeout(() => {
			messages.querySelector('[data-typing]')?.remove();
			addMessage(replyFor(cleanText));
		}, 650);
	}

	function renderQuickSuggestions() {
		quickSuggestions.innerHTML = '';
		copy[getLanguage()].quick.forEach((suggestion) => {
			const button = document.createElement('button');
			button.type = 'button';
			button.textContent = suggestion;
			button.addEventListener('click', () => sendMessage(suggestion));
			quickSuggestions.appendChild(button);
		});
	}

	function updateHeaderCopy() {
		const language = getLanguage();
		chatbot.querySelector('.chat-window__header small').textContent = language === 'id' ? 'Online · Siap membantu' : 'Online · Ready to help';
		chatbot.querySelector('.chat-window__header').setAttribute('aria-label', language === 'id' ? 'Rental Assistant, online dan siap membantu' : 'Rental Assistant, online and ready to help');
	}

	function resetConversation() {
		messages.innerHTML = '';
		messageSequence = 0;
		updateHeaderCopy();
		addMessage(copy[getLanguage()].greeting);
		renderQuickSuggestions();
	}

	function setOpen(isOpen) {
		windowElement.hidden = !isOpen;
		toggle.setAttribute('aria-expanded', String(isOpen));
		if (isOpen) input.focus();
	}

	toggle.addEventListener('click', () => setOpen(windowElement.hidden));
	close.addEventListener('click', () => setOpen(false));
	form.addEventListener('submit', (event) => {
		event.preventDefault();
		sendMessage(input.value);
	});
	document.addEventListener('languagechange', () => {
		resetConversation();
		if (!windowElement.hidden) input.focus();
	});
	document.addEventListener('DOMContentLoaded', resetConversation);
})();
