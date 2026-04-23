$(document).ready(function() {
    Fancybox.bind("[data-fancybox]");

    $('input[type=tel]').inputmask({
        mask: '+7 (*{1}99) 999-99-99',
        placeholder: "+7 (___) ___-__-__",
        definitions: {
            '*': {
                validator: "[0-6,9]"
            }
        }
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            $('.modal').removeClass('modal-opened');
            $('body').removeClass('noscroll');
            window.scroll(0, scrollTop);

            if (targetElement) {
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                const startPosition = window.pageYOffset;
                const distance = targetPosition - startPosition;
                const duration = 800;

                let startTimestamp = null;

                function animation(timestamp) {
                    if (!startTimestamp) startTimestamp = timestamp;

                    const elapsed = timestamp - startTimestamp;
                    const progress = Math.min(elapsed / duration, 1);
                    const easeInOut = progress < 0.5
                    ? 2 * progress * progress
                    : -1 + (4 - 2 * progress) * progress;

                    window.scrollTo(0, startPosition + distance * easeInOut);

                    if (elapsed < duration) {
                        window.requestAnimationFrame(animation);
                    }
                }
            }

            window.requestAnimationFrame(animation);
        });
    });

    let scrollTop = 0;
    window.addEventListener('scroll', function () {
        if (!$('body').hasClass('noscroll')) {
            scrollTop = window.scrollY;
        }
    });

    $('.header__burger-btn, .sidebar__burger-btn').on('click', function () {
        const burger = $('.burger');
        const body = $('body');
        
        $('.modal').removeClass('modal-opened');
        burger.toggleClass('modal-opened');

        if (burger.hasClass('modal-opened')) {
            body.addClass('noscroll');
            body.css('top', `-${scrollTop}px`);
        } else {
            body.removeClass('noscroll');
            window.scroll(0, scrollTop);
        }
    });

    $('.order-btn').on('click', function () {
        const order = $('.order');
        const body = $('body');

        Fancybox.close();
        $('.modal').removeClass('modal-opened');

        order.addClass('modal-opened');
        body.addClass('noscroll');
        body.css('top', `-${scrollTop}px`);
    });

    $('.modal-close, .modal-space').on('click', function () {
        $('.modal').removeClass('modal-opened');
        $('body').removeClass('noscroll');
        window.scroll(0, scrollTop);
    });

    $(document).on('scroll', function() {
        if ($(window).scrollTop() >= 1100) {
            $('.header-mini').removeClass('header-mini-invisible');
            $('.sidebar').removeClass('sidebar-invisible');
            $('.float, .float-pattern').removeClass('float-invisible');
        } else {
            $('.header-mini').addClass('header-mini-invisible');
            $('.sidebar').addClass('sidebar-invisible');
            $('.float, .float-pattern').addClass('float-invisible');
        }
    });

    $('.up').on('click', () => {
        const body = $("html, body");
        body.animate({
            scrollTop: 0
        }, 800, 'swing');
    });

    if ($('.utp').length) {
        const utpSlider = new Swiper('.utp__slider .swiper', {
            speed: 1000,
            slidesPerView: 1,
            spaceBetween: 15,
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true
            },
            pagination: {
                el: '.utp__slider .slider-progressbar',
                type: 'progressbar'
            },
            breakpoints: {
                993: {
                    slidesPerView: 4,
                    spaceBetween: 85
                },
                769: {
                    slidesPerView: 2,
                    spaceBetween: 15
                }
            }
        });
    }

    if ($('.gallery').length) {
        const gallerySlider = new Swiper('.gallery__slider .swiper', {
            speed: 1000,
            slidesPerView: 1,
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true
            },
            pagination: {
                el: '.gallery__slider .slider-progressbar',
                type: 'progressbar'
            },
            navigation: {
                prevEl: '.gallery__slider .slider-arrow-prev',
                nextEl: '.gallery__slider .slider-arrow-next'
            },
        });

        const galleryPopupSlider = new Swiper('.gallery-popup__slider .swiper', {
            speed: 1000,
            freeMode: true,
            slidesPerView: 1.2,
            spaceBetween: 10,
            grid: {
                fill: 'row',
                rows: 1
            },
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true
            },
            pagination: {
                el: '.gallery-popup__slider .slider-progressbar',
                type: 'progressbar'
            },
            breakpoints: {
                993: {
                    slidesPerView: 4,
                    spaceBetween: 20,
                    grid: {
                        fill: 'row',
                        rows: 2
                    }
                },
                769: {
                    slidesPerView: 2,
                    spaceBetween: 15
                },
                577: {
                    slidesPerView: 1.5,
                    spaceBetween: 15
                }
            }
        });
    }

    if ($('.catalog').length) {
        const catalogSlider = new Swiper('.catalog__slider .swiper', {
            speed: 1000,
            slidesPerView: 1,
            spaceBetween: 15,
            navigation: {
                prevEl: '.catalog__slider .slider-arrow-prev',
                nextEl: '.catalog__slider .slider-arrow-next'
            },
            pagination: {
                el: '.catalog__slider .slider-progressbar',
                type: 'progressbar'
            },
            breakpoints: {
                993: {
                    slidesPerView: 4,
                    spaceBetween: 24
                },
                769: {
                    slidesPerView: 2,
                    spaceBetween: 24
                }
            }
        });
    }

    if ($('.promo__countdown').length) {
        var countdown = document.getElementById('promoCountdown');
        if (!countdown) return;

        var deadline = new Date(countdown.dataset.deadline).getTime();
        var items = countdown.querySelectorAll('.countdown-item');

        items.forEach(function (item) {
            var circle = item.querySelector('.countdown-progress');
            var radius = 100;
            var circumference = 2 * Math.PI * radius;

            circle.style.strokeDasharray = circumference;
            circle.style.strokeDashoffset = 0;
            item.dataset.circumference = circumference;
        });

        function pad(num) {
            return String(num).padStart(2, '0');
        }

        function getDaysWord(value) {
        value = Math.abs(value) % 100;
        var num = value % 10;

        if (value > 10 && value < 20) return 'дней';
        if (num > 1 && num < 5) return 'дня';
        if (num === 1) return 'день';
        return 'дней';
        }

        function getHoursWord(value) {
        value = Math.abs(value) % 100;
        var num = value % 10;

        if (value > 10 && value < 20) return 'часов';
        if (num > 1 && num < 5) return 'часа';
        if (num === 1) return 'час';
        return 'часов';
        }

        function getMinutesWord(value) {
        value = Math.abs(value) % 100;
        var num = value % 10;

        if (value > 10 && value < 20) return 'минут';
        if (num > 1 && num < 5) return 'минуты';
        if (num === 1) return 'минута';
        return 'минут';
        }

        function getSecondsWord(value) {
        value = Math.abs(value) % 100;
        var num = value % 10;

        if (value > 10 && value < 20) return 'секунд';
        if (num > 1 && num < 5) return 'секунды';
        if (num === 1) return 'секунда';
        return 'секунд';
        }

        function updateCountdown() {
            var now = new Date().getTime();
            var diff = deadline - now;

            if (diff <= 0) {
            items.forEach(function (item) {
                item.querySelector('.countdown-value').textContent = '00';
                var unit = item.dataset.unit;
                if (unit === 'days') item.querySelector('.countdown-label').textContent = 'дней';
                if (unit === 'hours') item.querySelector('.countdown-label').textContent = 'часов';
                if (unit === 'minutes') item.querySelector('.countdown-label').textContent = 'минут';
                if (unit === 'seconds') item.querySelector('.countdown-label').textContent = 'секунд';

                var circle = item.querySelector('.countdown-progress');
                var circumference = parseFloat(item.dataset.circumference);
                circle.style.strokeDashoffset = circumference;
            });

            clearInterval(timer);
            return;
            }

            var totalSeconds = Math.floor(diff / 1000);
            var days = Math.floor(totalSeconds / 86400);
            var hours = Math.floor((totalSeconds % 86400) / 3600);
            var minutes = Math.floor((totalSeconds % 3600) / 60);
            var seconds = totalSeconds % 60;

            items.forEach(function (item) {
            var unit = item.dataset.unit;
            var max = parseInt(item.dataset.max, 10);
            var valueEl = item.querySelector('.countdown-value');
            var labelEl = item.querySelector('.countdown-label');
            var circle = item.querySelector('.countdown-progress');
            var circumference = parseFloat(item.dataset.circumference);

            var value = 0;
            if (unit === 'days') {
                value = days;
                valueEl.textContent = days;
                labelEl.textContent = getDaysWord(days);
            }
            if (unit === 'hours') {
                value = hours;
                valueEl.textContent = pad(hours);
                labelEl.textContent = getHoursWord(hours);
            }
            if (unit === 'minutes') {
                value = minutes;
                valueEl.textContent = pad(minutes);
                labelEl.textContent = getMinutesWord(minutes);
            }
            if (unit === 'seconds') {
                value = seconds;
                valueEl.textContent = pad(seconds);
                labelEl.textContent = getSecondsWord(seconds);
            }

            var percent = Math.min(value / max, 1);
            var offset = circumference * (1 - percent);
            circle.style.strokeDashoffset = offset;
            });
        }

        updateCountdown();
        var timer = setInterval(updateCountdown, 1000);
    }

    if ($('.infrastructure').length) {
        $('.infrastructure-sections li a').on('click', function () {
            $('.infrastructure-sections li a').removeClass('active');
            $(this).addClass('active');
        });
    }
});