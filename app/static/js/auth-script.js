document.addEventListener('DOMContentLoaded', function() {
	const togglePasswordButtons = document.querySelectorAll('.toggle-password');
	
	togglePasswordButtons.forEach(button => {
			button.addEventListener('click', function() {
					const eyeIcon = this.querySelector('.eye-icon');

					eyeIcon.classList.toggle('eye-open');
					eyeIcon.classList.toggle('eye-closed');
			});
	});

	const passwordInput = document.getElementById('password');
	const passwordStrength = document.getElementById('passwordStrength');
	
	if (passwordInput && passwordStrength) {
			const strengthSegments = passwordStrength.querySelectorAll('.strength-segment');
			
			passwordInput.addEventListener('input', function() {
					const password = this.value;
					let strength = 0;

					strengthSegments.forEach(segment => {
							segment.className = 'strength-segment';
					});
					
					if (password.length > 0) {
							if (password.length >= 8) strength++;
							if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength++;
							if (password.match(/\d/)) strength++;
							if (password.match(/[^a-zA-Z\d]/)) strength++;
							
							for (let i = 0; i < strength; i++) {
									if (strengthSegments[i]) {
											strengthSegments[i].classList.add('active');
									}
							}
					}
			});
	}
});