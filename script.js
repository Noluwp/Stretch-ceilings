document.addEventListener('DOMContentLoaded', () => {
    
    // 1. АНИМАЦИЯ ПОЯВЛЕНИЯ
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => { 
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in-section').forEach(section => {
        observer.observe(section);
    });

    setTimeout(() => {
        const heroElements = document.querySelectorAll('#hero .fade-in-section');
        heroElements.forEach(el => el.classList.add('is-visible'));
    }, 100);

    // 2. МОБИЛЬНОЕ МЕНЮ
    const navMenu = document.getElementById('navMenu');
    window.toggleMenu = () => {
        navMenu.classList.toggle('active');
    };

    // 3. МОДАЛЬНЫЕ ОКНА
    const modal = document.getElementById('modal-callback');
    const thanksModal = document.getElementById('modal-thanks');

    window.openModal = () => {
        modal.style.display = 'flex';
    };

    window.closeModalBtn = () => {
        modal.style.display = 'none';
    };

    // Закрытие по клику на фон или крестик
    window.closeModal = (e) => { 
        if(e.target === modal) closeModalBtn(); 
        if(e.target === thanksModal) thanksModal.style.display = 'none';
    };

    // 4. ГАЛЕРЕЯ (С ИСПРАВЛЕНИЕМ ЗАКРЫТИЯ)
    const lb = document.getElementById('lightbox');
    const lbImg = document.getElementById('lightbox-img');
    
    window.openLightbox = (el) => {
        lbImg.src = el.querySelector('img').src;
        lb.style.display = 'flex';
    };
    
    // Теперь закрывается по любому клику (включая крестик, который мы добавили в HTML)
    window.closeLightbox = () => {
        lb.style.display = 'none';
    };

    // 5. ОТПРАВКА ФОРМЫ В TELEGRAM (ЧЕРЕЗ PHP)
    window.submitForm = (e) => {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const submitBtn = e.target.querySelector('button');
        
        // Визуальная индикация отправки
        submitBtn.disabled = true;
        submitBtn.innerText = 'Отправка...';

        fetch('send.php', {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (response.ok) {
                // Если успешно — закрываем форму и показываем "Спасибо"
                closeModalBtn();
                if (thanksModal) thanksModal.style.display = 'flex';
                e.target.reset();
            } else {
                alert('Ошибка сервера. Пожалуйста, позвоните нам напрямую.');
            }
        })
        .catch(error => {
            console.error('Ошибка:', error);
            alert('Не удалось отправить. Проверьте интернет-соединение.');
        })
        .finally(() => {
            submitBtn.disabled = false;
            submitBtn.innerText = 'Отправить';
        });
    };

    // 6. ПЛАВНЫЙ СКРОЛЛ
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                navMenu.classList.remove('active');
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});