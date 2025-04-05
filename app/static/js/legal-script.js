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
	
	document.querySelectorAll('a[href^="#"]').forEach(anchor => {
			anchor.addEventListener('click', function(e) {
					const targetId = this.getAttribute('href');
					
					if (targetId === '#') return;
					
					const targetElement = document.querySelector(targetId);
					
					if (targetElement) {
							e.preventDefault();
							
							const navbarHeight = document.querySelector('.navbar').offsetHeight;
							const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
							
							window.scrollTo({
									top: targetPosition - navbarHeight - 20,
									behavior: 'smooth'
							});
							
							if (navbarToggle && navbarToggle.classList.contains('active')) {
									navbarToggle.classList.remove('active');
									navbarMenu.classList.remove('active');
									document.body.classList.remove('menu-open');
							}

							history.pushState(null, null, targetId);
					}
			});
	});

	const sections = document.querySelectorAll('.legal-section');
	const tocLinks = document.querySelectorAll('.toc-list a');
})