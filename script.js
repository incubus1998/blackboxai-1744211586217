// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Parallax Effect
    const parallax = document.querySelector('.parallax-bg');
    if (parallax) {
        window.addEventListener('scroll', function() {
            let scrollPosition = window.pageYOffset;
            parallax.style.transform = 'translateY(' + scrollPosition * 0.5 + 'px)';
        });
    }

    // Floating Hearts Animation
    function createHeart() {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.innerHTML = '❤️';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = Math.random() * 3 + 2 + 's';
        document.body.appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
        }, 5000);
    }

    setInterval(createHeart, 3000);

    // Scroll Progress Indicator
    const scrollProgress = document.getElementById('scroll-progress');
    if (scrollProgress) {
        window.onscroll = function() {
            let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            let scrolled = (winScroll / height) * 100;
            scrollProgress.style.width = scrolled + "%";
        };
    }

    // Back to Top Button
    const backToTopButton = document.getElementById('back-to-top');
    if (backToTopButton) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.add('show');
            } else {
                backToTopButton.classList.remove('show');
            }
        });

        backToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Photo Lightbox
    const galleryImages = document.querySelectorAll('.gallery-image');
    if (galleryImages.length > 0) {
        galleryImages.forEach(image => {
            image.addEventListener('click', e => {
                const lightbox = document.createElement('div');
                lightbox.id = 'lightbox';
                lightbox.className = 'fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50';
                
                const img = document.createElement('img');
                img.src = e.target.src;
                img.className = 'max-h-[90vh] max-w-[90vw] object-contain';
                
                lightbox.appendChild(img);
                document.body.appendChild(lightbox);
                
                lightbox.addEventListener('click', e => {
                    if (e.target !== img) {
                        lightbox.remove();
                    }
                });
            });
        });
    }

    // Anniversary Countdown
    const countdownElement = document.getElementById('countdown');
    if (countdownElement) {
    function updateCountdown() {
            const anniversaryDate = new Date('2025-04-14').getTime();
            const now = new Date().getTime();
            const distance = anniversaryDate - now;

            if (distance < 0) {
                countdownElement.innerHTML = `
                    <div class="countdown-item text-pink-500">Anniversary has passed!</div>
                `;
            } else {
                const days = Math.floor(distance / (1000 * 60 * 60 * 24));
                const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((distance % (1000 * 60)) / 1000);

                countdownElement.innerHTML = `
                    <div class="countdown-item">${days}d</div>
                    <div class="countdown-item">${hours}h</div>
                    <div class="countdown-item">${minutes}m</div>
                    <div class="countdown-item">${seconds}s</div>
                `;
            }
        }

        updateCountdown();
        setInterval(updateCountdown, 1000);
    }

    // Rotating Love Quotes
    const quotes = [
        "Love is not about how many days, months, or years you have been together. Love is about how much you love each other every single day.",
        "The best thing to hold onto in life is each other.",
        "I love you not only for what you are, but for what I am when I am with you.",
        "Every love story is beautiful, but ours is my favorite."
    ];

    const quoteElement = document.getElementById('rotating-quote');
    if (quoteElement) {
        let currentQuote = 0;
        function rotateQuotes() {
            quoteElement.style.opacity = 0;
            setTimeout(() => {
                currentQuote = (currentQuote + 1) % quotes.length;
                quoteElement.textContent = quotes[currentQuote];
                quoteElement.style.opacity = 1;
            }, 500);
        }

        setInterval(rotateQuotes, 5000);
    }

    // Carousel functionality
    const slides = document.querySelectorAll('.carousel-item');
    const indicators = document.querySelectorAll('.carousel-indicator');
    const nextButton = document.querySelector('.carousel-next');
    const prevButton = document.querySelector('.carousel-prev');

    if (slides.length > 0 && indicators.length > 0) {
        let currentSlide = 0;

        function showSlide(n) {
            slides.forEach(slide => slide.style.opacity = 0);
            indicators.forEach(indicator => indicator.classList.remove('opacity-100'));
            
            slides[n].style.opacity = 1;
            indicators[n].classList.add('opacity-100');
        }

        function nextSlide() {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }

        function prevSlide() {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            showSlide(currentSlide);
        }

        if (nextButton) nextButton.addEventListener('click', nextSlide);
        if (prevButton) prevButton.addEventListener('click', prevSlide);

        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                currentSlide = index;
                showSlide(currentSlide);
            });
        });

        // Initialize carousel
        showSlide(0);
        setInterval(nextSlide, 5000);
    }

    // Smooth scroll for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});
