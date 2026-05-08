document.addEventListener('DOMContentLoaded', () => {
    // 1. Dark Mode Toggle
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const htmlEl = document.documentElement;
    
    // Check local storage or system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
        htmlEl.setAttribute('data-theme', 'dark');
        if(themeIcon) {
            themeIcon.classList.replace('bi-moon', 'bi-sun');
        }
    }

    if(themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = htmlEl.getAttribute('data-theme');
            if (currentTheme === 'dark') {
                htmlEl.removeAttribute('data-theme');
                localStorage.setItem('theme', 'light');
                themeIcon.classList.replace('bi-sun', 'bi-moon');
            } else {
                htmlEl.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
                themeIcon.classList.replace('bi-moon', 'bi-sun');
            }
        });
    }

    // 2. RTL Toggle
    const rtlToggleBtn = document.getElementById('rtl-toggle');
    
    if(rtlToggleBtn) {
        rtlToggleBtn.addEventListener('click', () => {
            const currentDir = htmlEl.getAttribute('dir');
            if (currentDir === 'rtl') {
                htmlEl.setAttribute('dir', 'ltr');
                rtlToggleBtn.setAttribute('title', 'Toggle RTL');
            } else {
                htmlEl.setAttribute('dir', 'rtl');
                rtlToggleBtn.setAttribute('title', 'Toggle LTR');
            }
        });
    }

    // 3. Navbar Sticky Effect
    const navbar = document.querySelector('.navbar');
    if(navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('shadow-sm');
            } else {
                navbar.classList.remove('shadow-sm');
            }
        });
    }

    // 4. Scroll Animations (Intersection Observer)
    const fadeElements = document.querySelectorAll('.fade-in-up, .zoom-in-scroll, .slide-in-left, .slide-in-right, .flip-up');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeElements.forEach(el => {
        observer.observe(el);
    });

    // 5. Form Validation (Bootstrap)
    const forms = document.querySelectorAll('.needs-validation')
    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
                event.preventDefault()
                event.stopPropagation()
            }
            form.classList.add('was-validated')
        }, false)
    });

    // 6. Mobile Sidebar Offcanvas Fix
    const navCollapses = document.querySelectorAll('.navbar-collapse');
    navCollapses.forEach(collapse => {
        collapse.addEventListener('show.bs.collapse', () => {
            collapse.classList.add('sidebar-open');
        });
        collapse.addEventListener('hide.bs.collapse', () => {
            collapse.classList.remove('sidebar-open');
        });
    });

    // 7. Back To Top Button
    const backToTopBtn = document.createElement('button');
    backToTopBtn.type = 'button';
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.setAttribute('aria-label', 'Back to top');
    backToTopBtn.innerHTML = '<i class="bi bi-arrow-up"></i>';
    document.body.appendChild(backToTopBtn);

    const toggleBackToTop = () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    };

    window.addEventListener('scroll', toggleBackToTop);
    toggleBackToTop();

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // 8. Portfolio Filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    if (filterButtons.length > 0 && portfolioItems.length > 0) {
        filterButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Update active button
                filterButtons.forEach(b => {
                    b.classList.remove('btn-primary', 'active');
                    b.classList.add('btn-outline-primary');
                });
                btn.classList.remove('btn-outline-primary');
                btn.classList.add('btn-primary', 'active');

                const filterValue = btn.getAttribute('data-filter');

                portfolioItems.forEach(item => {
                    // Hide all items first with a smooth fade
                    item.classList.remove('visible');
                    
                    setTimeout(() => {
                        if (filterValue === 'all' || item.classList.contains(filterValue)) {
                            item.style.display = 'block';
                            // Re-trigger animation
                            setTimeout(() => {
                                item.classList.add('visible');
                            }, 50);
                        } else {
                            item.style.display = 'none';
                        }
                    }, 300); // Wait for fade out
                });
            });
        });
    }
});
