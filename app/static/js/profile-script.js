document.addEventListener('DOMContentLoaded', function() {
    initTabs();

    initExpenseChart();

    initReportChart();

    initExpenseModal();
});

document.addEventListener('DOMContentLoaded', function() {
    const editProfileBtn = document.getElementById('editProfileBtn');
    const profileModal = document.getElementById('profileModal');
    const closeModalBtn = profileModal.querySelector('.close-modal');
    const cancelProfileBtn = profileModal.getElementById('cancelProfile');
    const profileForm = document.getElementById('profileForm');

    if (editProfileBtn && profileModal && closeModalBtn && cancelProfileBtn && profileForm) {
        editProfileBtn.addEventListener('click', function() {
            profileModal.style.display = 'flex'; // Показать модальное окно
        });

        closeModalBtn.addEventListener('click', function() {
            profileModal.style.display = 'none'; // Скрыть модальное окно
        });

        cancelProfileBtn.addEventListener('click', function() {
            profileModal.style.display = 'none'; // Скрыть модальное окно
        });

        // Необязательно: Закрыть модальное окно, если пользователь кликнет за его пределами
        window.addEventListener('click', function(event) {
            if (event.target === profileModal) {
                profileModal.style.display = 'none';
            }
        });

        // Обработчик отправки формы профиля
        profileForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Предотвратить стандартную отправку формы
            // Здесь вы добавите свою логику для отправки обновленных данных профиля на сервер
            console.log('Форма профиля отправлена');
            // После успешной отправки вы можете скрыть модальное окно:
            profileModal.style.display = 'none';
        });
    } else {
        console.error('Один или несколько необходимых элементов для функциональности редактирования профиля отсутствуют.');
    }
});
function initTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    if (!tabButtons.length) return;

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            button.classList.add('active');

            const tabId = button.dataset.tab;
            document.getElementById(tabId).classList.add('active');
        });
    });
}

function initExpenseChart() {
    const chartElement = document.getElementById('expenseChart');

    if (!chartElement) return;

    const ctx = chartElement.getContext('2d');

    const data = {
        labels: ['Housing', 'Food & Dining', 'Transportation', 'Utilities', 'Entertainment', 'Other'],
        datasets: [{
            data: [1200, 450, 180, 250, 220, 45],
            backgroundColor: [
                '#3a86ff',
                '#ff9e00',
                '#8338ec',
                '#fb5607',
                '#ff006e',
                '#8d99ae'
            ],
            borderWidth: 0,
            borderRadius: 4
        }]
    };

    new Chart(ctx, {
        type: 'doughnut',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '65%',
            plugins: {
                legend: {
                    position: 'right',
                    labels: {
                        padding: 20,
                        boxWidth: 12,
                        font: {
                            size: 12
                        }
                    }
                },
                tooltip: {
                    backgroundColor: '#16213e',
                    titleColor: '#ffffff',
                    bodyColor: '#ffffff',
                    borderColor: '#3a86ff',
                    borderWidth: 1,
                    padding: 12,
                    displayColors: false,
                    callbacks: {
                        label: function(context) {
                            const value = context.raw;
                            const total = context.dataset.data.reduce((acc, val) => acc + val, 0);
                            const percentage = ((value / total) * 100).toFixed(1);
                            return `$${value} (${percentage}%)`;
                        }
                    }
                }
            }
        }
    });
}

function initReportChart() {
    const chartElement = document.getElementById('reportChart');

    if (!chartElement) return;

    const ctx = chartElement.getContext('2d');

    const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const expenseData = [2100, 2250, 3245, 2800, 2600, 2400, 2350, 2200, 2150, 2300, 2450, 2345];
    const incomeData = [4000, 4000, 4200, 4200, 4200, 4500, 4500, 4500, 4800, 4800, 4800, 5000];

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Expenses',
                    data: expenseData,
                    backgroundColor: '#ff9e00',
                    borderRadius: 4,
                    barPercentage: 0.6,
                    categoryPercentage: 0.7
                },
                {
                    label: 'Income',
                    data: incomeData,
                    backgroundColor: '#3a86ff',
                    borderRadius: 4,
                    barPercentage: 0.6,
                    categoryPercentage: 0.7
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                    align: 'end',
                    labels: {
                        boxWidth: 12,
                        padding: 20,
                        font: {
                            size: 12
                        }
                    }
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                    backgroundColor: '#16213e',
                    titleColor: '#ffffff',
                    bodyColor: '#ffffff',
                    borderColor: '#3a86ff',
                    borderWidth: 1,
                    padding: 12,
                    displayColors: true,
                    callbacks: {
                        label: function(context) {
                            return `${context.dataset.label}: $${context.raw.toLocaleString()}`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    grid: {
                        display: false
                    }
                },
                y: {
                    grid: {
                        borderDash: [5, 5],
                        color: 'rgba(0, 0, 0, 0.05)'
                    },
                    ticks: {
                        callback: function(value) {
                            return '$' + value.toLocaleString();
                        }
                    }
                }
            }
        }
    });
}

function initExpenseModal() {
    const modal = document.getElementById('expenseModal');
    const addExpenseBtn = document.getElementById('addExpenseBtn');
    const closeModal = document.querySelector('.close-modal');
    const cancelBtn = document.getElementById('cancelExpense');
    const expenseForm = document.getElementById('expenseForm');

    if (!modal || !addExpenseBtn) return;

    const closeExpenseModal = () => {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    };

    addExpenseBtn.addEventListener('click', () => {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });

    if (closeModal) closeModal.addEventListener('click', closeExpenseModal);
    if (cancelBtn) cancelBtn.addEventListener('click', closeExpenseModal);

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeExpenseModal();
        }
    });
}
