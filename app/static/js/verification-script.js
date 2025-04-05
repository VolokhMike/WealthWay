document.addEventListener('DOMContentLoaded', function() {
	const navbarToggle = document.querySelector('.navbar-toggle');
	const navbarMenu = document.querySelector('.navbar-menu');

	if (navbarToggle && navbarMenu) {
			navbarToggle.addEventListener('click', function() {
					this.classList.toggle('active');
					navbarMenu.classList.toggle('active');
					document.body.classList.toggle('menu-open');
			});
	}

	const dropdownItems = document.querySelectorAll('.nav-item.dropdown');
	dropdownItems.forEach(item => {
			const link = item.querySelector('.nav-link');
			if (link) {
					link.addEventListener('click', function(e) {
							if (window.innerWidth <= 992) {
									e.preventDefault();
									item.classList.toggle('active');
									dropdownItems.forEach(otherItem => {
											if (otherItem !== item) {
													otherItem.classList.remove('active');
											}
									});
							}
					});
			}
	});

	window.addEventListener('resize', function() {
			if (window.innerWidth > 992) {
					if (navbarToggle) navbarToggle.classList.remove('active');
					if (navbarMenu) navbarMenu.classList.remove('active');
					document.body.classList.remove('menu-open');
					dropdownItems.forEach(item => {
							item.classList.remove('active');
					});
			}
	});

	const themeButton = document.querySelector('.theme-button');
	if (themeButton) {
			themeButton.addEventListener('click', function() {
					document.body.classList.toggle('dark-theme');
					const isDarkTheme = document.body.classList.contains('dark-theme');
					localStorage.setItem('darkTheme', isDarkTheme);
			});

			const savedTheme = localStorage.getItem('darkTheme');
			if (savedTheme === 'true') {
					document.body.classList.add('dark-theme');
			}
	}

	document.getElementById('verification-form').addEventListener('submit', function (e) {
		const digits = [
			document.getElementById('digit1').value,
			document.getElementById('digit2').value,
			document.getElementById('digit3').value,
			document.getElementById('digit4').value,
			document.getElementById('digit5').value,
			document.getElementById('digit6').value
		];
		const fullCode = digits.join('');
		document.getElementById('verification_code').value = fullCode;
	})
	
});