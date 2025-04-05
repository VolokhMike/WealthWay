document.addEventListener('DOMContentLoaded', function() {
	const animateElements = document.querySelectorAll('.reveal-left, .reveal-right, .reveal-bottom');

	checkAnimations();

	window.addEventListener('scroll', checkAnimations);
	
	function checkAnimations() {
			animateElements.forEach(element => {
					const elementTop = element.getBoundingClientRect().top;
					const elementVisible = 150;
					
					if (elementTop < window.innerHeight - elementVisible) {
							const delay = element.getAttribute('data-delay') || 0;

							setTimeout(() => {
									element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
									element.style.opacity = '1';
									element.style.transform = 'translate(0)';
							}, delay);
					}
			});
	}

	const statNumbers = document.querySelectorAll('.stat-number');
	let animated = false;
	
	function animateStats() {
			if (animated) return;
			
			const statsSection = document.querySelector('.stats-section');
			if (!statsSection) return;
			
			const statsSectionTop = statsSection.getBoundingClientRect().top;
			const windowHeight = window.innerHeight;
			
			if (statsSectionTop < windowHeight - 100) {
					statNumbers.forEach(stat => {
							const target = parseInt(stat.getAttribute('data-count'));
							let count = 0;
							const duration = 2000; // ms
							const increment = target / (duration / 16); // 60fps
							
							const timer = setInterval(() => {
									count += increment;
									if (count >= target) {
											stat.textContent = target;
											clearInterval(timer);
									} else {
											stat.textContent = Math.floor(count);
									}
							}, 16);
					});
					
					animated = true;
			}
	}

	window.addEventListener('scroll', animateStats);

	animateStats();
});