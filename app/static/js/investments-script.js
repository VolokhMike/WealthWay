document.addEventListener('DOMContentLoaded', function() {
    initViewToggle();
    initInvestmentModal();
});

function initViewToggle() {
    const viewButtons = document.querySelectorAll('.view-btn');
    const viewContents = document.querySelectorAll('.view-content');

    if (!viewButtons.length) return;

    viewButtons.forEach(button => {
        button.addEventListener('click', () => {
            viewButtons.forEach(btn => btn.classList.remove('active'));
            viewContents.forEach(content => content.classList.remove('active'));

            button.classList.add('active');

            const viewType = button.dataset.view;
            document.querySelector(`.${viewType}-view`).classList.add('active');
        });
    });
}

function initInvestmentModal() {
    const modal = document.getElementById('investmentModal');
    const addInvestmentBtn = document.getElementById('addInvestmentBtn');
    const closeModal = document.querySelector('.close-modal');
    const cancelBtn = document.getElementById('cancelInvestment');

    if (!modal || !addInvestmentBtn) return;

    addInvestmentBtn.addEventListener('click', () => {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });

    const closeInvestmentModal = () => {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    };

    if (closeModal) closeModal.addEventListener('click', closeInvestmentModal);
    if (cancelBtn) cancelBtn.addEventListener('click', closeInvestmentModal);

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeInvestmentModal();
        }
    });
}