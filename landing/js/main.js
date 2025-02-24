// Плавная прокрутка к секциям
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const section = document.querySelector(this.getAttribute('href'));
        section.scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Анимация появления кнопки "Наверх" при прокрутке
window.addEventListener('scroll', function() {
    // Здесь можно добавить логику появления кнопки
});

// Обработка отправки формы
document.addEventListener('DOMContentLoaded', function() {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            // Здесь можно добавить логику отправки формы
        });
    });
});

// Добавляем обработчик для FAQ
document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Закрываем все активные элементы
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
            });
            
            // Если текущий элемент не был активен, открываем его
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
});

// Функция для кнопки прокрутки наверх
function handleScrollToTop() {
    const scrollToTopButton = document.getElementById('scrollToTop');
    
    // Показываем/скрываем кнопку в зависимости от прокрутки
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollToTopButton.classList.add('visible');
        } else {
            scrollToTopButton.classList.remove('visible');
        }
    });
    
    // Прокрутка наверх при клике
    scrollToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Вызываем функцию после загрузки DOM
document.addEventListener('DOMContentLoaded', handleScrollToTop);

// Обработка модального окна
function handleCallbackModal() {
    const modal = document.getElementById('callbackModal');
    const callbackButtons = document.querySelectorAll('.callback-btn');
    const closeButton = modal.querySelector('.modal-close');
    const form = document.getElementById('callbackForm');

    // Открытие модального окна
    callbackButtons.forEach(button => {
        button.addEventListener('click', () => {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Запрет прокрутки
        });
    });

    // Закрытие модального окна
    closeButton.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = ''; // Возвращаем прокрутку
    }

    // Маска для телефона
    const phoneInput = document.getElementById('phone');
    IMask(phoneInput, {
        mask: '+{7} (000) 000-00-00'
    });

    // Обработка отправки формы
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const agreement = form.querySelector('input[name="agreement"]');
        if (!agreement.checked) {
            alert('Пожалуйста, подтвердите согласие на обработку персональных данных');
            return;
        }
        
        const submitButton = form.querySelector('.submit-button');
        submitButton.disabled = true;
        submitButton.textContent = 'Отправка...';

        try {
            // Здесь будет логика отправки формы на сервер
            await new Promise(resolve => setTimeout(resolve, 1000)); // Имитация запроса

            // Показываем сообщение об успехе
            form.innerHTML = `
                <div class="form-success active">
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="green">
                        <path d="M20 6L9 17L4 12" stroke-width="2" stroke-linecap="round"/>
                    </svg>
                    <h3>Спасибо за заявку!</h3>
                    <p>Мы перезвоним вам в ближайшее время</p>
                </div>
            `;

            // Закрываем модальное окно через 2 секунды
            setTimeout(() => {
                closeModal();
                // Восстанавливаем форму
                setTimeout(() => {
                    form.innerHTML = originalFormHTML;
                    initForm(); // Реинициализация формы
                }, 300);
            }, 2000);

        } catch (error) {
            console.error('Ошибка отправки формы:', error);
            submitButton.textContent = 'Ошибка! Попробуйте еще раз';
            submitButton.disabled = false;
        }
    });
}

// Сохраняем оригинальный HTML формы
const originalFormHTML = document.getElementById('callbackForm').innerHTML;

// Инициализация формы
function initForm() {
    handleCallbackModal();
}

// Запускаем после загрузки DOM
document.addEventListener('DOMContentLoaded', initForm); 