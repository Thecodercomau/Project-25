// JavaScript for interactive features

// Navbar active link highlighting
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');

    // Set active link on page load
    updateActiveLink();

    // Update active link on scroll
    window.addEventListener('scroll', updateActiveLink);

    // Handle click on nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            // Add active class to clicked link
            this.classList.add('active');
        });
    });

    function updateActiveLink() {
        let currentSection = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (window.pageYOffset >= sectionTop - 200) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + currentSection) {
                link.classList.add('active');
            }
        });
    }

    // Smooth scroll for nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const offsetTop = target.offsetTop - 70;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });

                    // Close mobile menu if open
                    const navbarCollapse = document.querySelector('.navbar-collapse');
                    if (navbarCollapse.classList.contains('show')) {
                        const toggleButton = document.querySelector('.navbar-toggler');
                        toggleButton.click();
                    }
                }
            }
        });
    });
});

// Navbar background color on scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.pageYOffset > 50) {
        navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
    }
});

// Banner animation on scroll
window.addEventListener('scroll', function() {
    const banner = document.querySelector('.banner-section');
    if (banner) {
        const bannerImg = banner.querySelector('.banner-img');
        const scrollPosition = window.pageYOffset;
        
        // Parallax effect
        if (scrollPosition < 600) {
            bannerImg.style.transform = 'translateY(' + (scrollPosition * 0.5) + 'px)';
        }
    }
});

// Fade in elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards and section headings
document.querySelectorAll('.card, section h2').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Add scroll-to-top button functionality
function createScrollToTopButton() {
    const button = document.createElement('button');
    button.innerHTML = '↑';
    button.id = 'scrollToTop';
    button.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background-color: #4a90e2;
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        font-size: 24px;
        font-weight: bold;
        display: none;
        z-index: 999;
        transition: all 0.3s ease;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    `;

    button.addEventListener('mouseover', function() {
        this.style.backgroundColor = '#2563eb';
        this.style.transform = 'scale(1.1)';
    });

    button.addEventListener('mouseout', function() {
        this.style.backgroundColor = '#4a90e2';
        this.style.transform = 'scale(1)';
    });

    button.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    document.body.appendChild(button);

    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            button.style.display = 'block';
        } else {
            button.style.display = 'none';
        }
    });
}

// Initialize scroll-to-top button when DOM is ready
document.addEventListener('DOMContentLoaded', createScrollToTopButton);

// Console message
console.log('✨ Welcome to MyWebsite! This navbar includes smooth scrolling, active link highlighting, parallax effects, and more.');
