/**
 * Framehouse Rentals - Master Product Data
 * Connected across Catalog, Product Detail, Rental Cart, and Admin Console.
 */
(() => {
	const CAMERA_PRODUCTS = [
		{
			id: 'sony-fx3',
			name: 'Sony FX3',
			fullName: 'Sony FX3 Cinema Line Full-Frame Camera',
			category: 'Camera',
			subCategory: 'Cinema Camera',
			brand: 'Sony',
			dailyPrice: 750000,
			stock: 5,
			available: 3,
			imageText: 'FX3',
			badge: 'POPULAR',
			description: 'Kamera sinema full-frame ringkas dengan perekaman 4K 120p, dynamic range 15+ stop, profil warna S-Cinetone, dan sistem pendingin aktif untuk produksi intensif.',
			descriptionEn: 'Compact full-frame cinema camera with 4K 120p recording, 15+ stops dynamic range, S-Cinetone color profile, and active cooling for demanding productions.',
			features: [
				'Sensor Full-Frame 10.2MP Back-Illuminated Exmor R CMOS',
				'Perekaman 4K hingga 120fps, FHD hingga 240fps',
				'Rentang ISO 80 - 102.400 (Dapat diperluas ke 409.600)',
				'Stabilisasi Gambar 5-Axis In-Body (IBIS) dengan Active Mode',
				'Dual CFexpress Type A / SD Card Slots',
				'Mount: Sony E-Mount'
			],
			includes: [
				'Body Sony FX3',
				'Top Handle XLR Unit',
				'2x Baterai Sony NP-FZ100',
				'Dual Battery Charger',
				'Kabel HDMI & Body Cap',
				'Tas Proteksi Hardcase'
			]
		},
		{
			id: 'canon-eos-r6',
			name: 'Canon EOS R6',
			fullName: 'Canon EOS R6 Mirrorless Camera',
			category: 'Camera',
			subCategory: 'Mirrorless',
			brand: 'Canon',
			dailyPrice: 500000,
			stock: 8,
			available: 6,
			imageText: 'EOS R6',
			badge: 'AVAILABLE',
			description: 'Kamera mirrorless serbaguna dengan sensor full-frame 20.1MP, perekaman 4K 60p 10-bit internal, dan autofokus Dual Pixel CMOS AF II super cepat.',
			descriptionEn: 'Versatile full-frame mirrorless camera featuring 20.1MP sensor, 4K 60p 10-bit internal recording, and lightning-fast Dual Pixel CMOS AF II.',
			features: [
				'Sensor Full-Frame 20.1MP CMOS',
				'4K 60p 10-Bit 4:2:2 dengan Canon Log & HDR PQ',
				'In-Body Image Stabilizer (IBIS) hingga 8 Stop',
				'Kecepatan burst hingga 20fps Electronic Shutter',
				'Dual SD UHS-II Card Slots',
				'Mount: Canon RF'
			],
			includes: [
				'Body Canon EOS R6',
				'2x Baterai LP-E6NH',
				'Charger Baterai',
				'Strap Kamera & Body Cap',
				'Tas Kamera Padded'
			]
		},
		{
			id: 'lens-24-70',
			name: '24-70mm Professional Lens',
			fullName: 'Sony FE 24-70mm f/2.8 GM II Lens',
			category: 'Lens',
			subCategory: 'Zoom',
			brand: 'Sony',
			dailyPrice: 250000,
			stock: 10,
			available: 7,
			imageText: '24—70 MM',
			badge: 'ESSENTIAL',
			description: 'Lensa zoom standar profesional generasi kedua yang sangat tajam, ringan, dengan bukaan konstan f/2.8 di seluruh rentang fokal.',
			descriptionEn: 'Second-generation professional standard zoom lens offering ultimate sharpness, lightweight build, and fast f/2.8 constant aperture across the range.',
			features: [
				'Rentang Fokal: 24-70mm',
				'Bukaan Maksimum: f/2.8 | Minimum: f/22',
				'4x Motor Linear XD untuk AF sangat cepat dan hening',
				'Diameter Filter: 82mm',
				'Konstruksi tahan debu dan kelembapan',
				'Mount: Sony E-Mount'
			],
			includes: [
				'Lensa Sony FE 24-70mm f/2.8 GM II',
				'Lens Hood ALC-SH168',
				'Front Cap 82mm & Rear Lens Cap',
				'Pouch Pelindung Lensa'
			]
		},
		{
			id: 'led-600',
			name: 'Professional LED Light',
			fullName: 'Aputure LS 600d Pro Daylight LED Light',
			category: 'Lighting',
			subCategory: 'LED Light',
			brand: 'Aputure',
			dailyPrice: 300000,
			stock: 6,
			available: 4,
			imageText: 'LED 600',
			badge: 'STUDIO',
			description: 'Lampu LED point-source daylight 600W berkekuatan tinggi dengan kontrol nirkabel Sidus Link, rating cuaca IP54, dan Bowens mount universal.',
			descriptionEn: 'High-output 600W daylight point-source LED fixture with Sidus Link wireless control, IP54 weather resistance, and universal Bowens mount.',
			features: [
				'Daya Output: 600W Daylight (5600K)',
				'CRI ≥96, TLCI ≥96, SSI (D56) 72',
				'Kontrol Nirkabel: Sidus Link App, DMX512, 2.4GHz',
				'Desain Tahan Cuaca IP54',
				'Mount: Standar Bowens Mount'
			],
			includes: [
				'Lamp Head LS 600d Pro',
				'Control Box & Kabel Daya Neutrik 6m',
				'Hyper Reflector Bowens',
				'Rolling Hardcase'
			]
		},
		{
			id: 'wireless-mic',
			name: 'Wireless Microphone',
			fullName: 'DJI Mic 2 Dual Wireless Microphone System',
			category: 'Audio',
			subCategory: 'Wireless Microphone',
			brand: 'DJI',
			dailyPrice: 175000,
			stock: 8,
			available: 5,
			imageText: 'WIRELESS',
			badge: 'CLEAR AUDIO',
			description: 'Sistem mikrofon nirkabel 2-channel dengan rekaman internal 32-bit float, active noise cancelling cerdas, dan jangkauan transmisi hingga 250m.',
			descriptionEn: 'Dual-channel wireless microphone system with 32-bit float internal recording, intelligent active noise cancelling, and up to 250m transmission range.',
			features: [
				'2 Transmitter (TX) + 1 Receiver (RX)',
				'Perekaman Internal 32-Bit Float 8GB per TX',
				'Active Noise Cancelling Cerdas',
				'Baterai tahan hingga 18 jam dengan Charging Case',
				'Konektivitas Lightning, USB-C, dan 3.5mm TRS'
			],
			includes: [
				'2x DJI Mic 2 Transmitter',
				'1x DJI Mic 2 Receiver',
				'Charging Case',
				'2x Windscreen Bulu (Deadcat)',
				'Kabel Kamera 3.5mm TRS & Adapter HP'
			]
		},
		{
			id: 'camera-monitor',
			name: 'Professional Camera Monitor',
			fullName: 'Atomos Ninja V 5" 4K HDMI Recording Monitor',
			category: 'Monitor & Wireless',
			subCategory: 'Camera Monitor',
			brand: 'Atomos',
			dailyPrice: 250000,
			stock: 4,
			available: 3,
			imageText: 'MONITOR',
			badge: '4K MONITOR',
			description: 'Monitor on-camera 5.2 inci 1000-nit HDR dengan kemampuan perekaman Apple ProRes & Avid DNx langsung dari sensor kamera via HDMI 2.0.',
			descriptionEn: 'Compact 5.2-inch 1000-nit HDR on-camera monitor capable of recording Apple ProRes and Avid DNx directly from camera sensors via HDMI 2.0.',
			features: [
				'Layar 5.2" 1920 x 1080 IPS 1000-nit Sunlight Viewable',
				'Perekaman 4Kp60 Apple ProRes & Avid DNxHR',
				'Alat Bantu Fokus: Peaking, False Color, Waveform, Vectorscope',
				'Dukungan 3D LUT Preview kustom',
				'Slot Baterai Sony NP-F & input DC'
			],
			includes: [
				'Unit Atomos Ninja V',
				'Sunhood Atomos',
				'2x Baterai Sony NP-F970 & Charger',
				'Cold Shoe Swivel Mount',
				'Kabel Micro/Mini/Full HDMI'
			]
		}
	];

	function getAll() {
		return CAMERA_PRODUCTS;
	}

	function getById(id) {
		if (!id) return null;
		return CAMERA_PRODUCTS.find((p) => p.id === id || p.id.toLowerCase() === id.toLowerCase()) || null;
	}

	function formatRupiah(number) {
		const num = Math.round(Number(number) || 0);
		return 'Rp' + num.toLocaleString('id-ID');
	}

	window.CameraProducts = {
		getAll,
		getById,
		formatRupiah
	};
})();
