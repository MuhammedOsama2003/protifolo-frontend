document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. لوجيك تبديل الوضع (Dark / Light Mode)
    // ==========================================
    const themeToggleBtn = document.getElementById('theme-toggle');
    const body = document.body;

    // استعادة الثيم المفضل للزائر من الـ Local Storage في المتصفح
    const savedTheme = localStorage.getItem('portfolio-theme');
    if (savedTheme) {
        body.className = savedTheme;
    }

    themeToggleBtn.addEventListener('click', () => {
        if (body.classList.contains('theme-dark')) {
            body.classList.replace('theme-dark', 'theme-light');
            localStorage.setItem('portfolio-theme', 'theme-light');
        } else {
            body.classList.replace('theme-light', 'theme-dark');
            localStorage.setItem('portfolio-theme', 'theme-dark');
        }
    });

    // ==========================================
    // 2. كشاف النور الذكي والـ Border Glow لكروت المهارات والمشاريع
    // ==========================================
    window.addEventListener('mousemove', (e) => {
        document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
        document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
    });

    const cards = document.querySelectorAll('.skill-card, .project-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // تحديد لون كشاف حواف الكارت بناءً على الثيم النشط حالياً
            const isDarkMode = body.classList.contains('theme-dark');
            const glowColor = isDarkMode ? '#00d2ff' : '#0284c7';
            
            card.style.borderImage = `radial-gradient(200px circle at ${x}px ${y}px, ${glowColor}, transparent 80%) 1`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.borderImage = 'none';
        });
    });

    // ==========================================
    // 3. تأثير العناصر المغناطيسية لحق الماوس (Magnetic Effect)
    // ==========================================
    const magneticElements = document.querySelectorAll('.btn-main, .nav-btn, .social-icons a');

    magneticElements.forEach(element => {
        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            // سحب ناعم للعنصر بمقدار 35% باتجاه حركة الماوس ليعطي إحساس الجاذبية
            element.style.transform = `translate(${x * 0.35}px, ${y * 0.35}px)`;
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.transform = 'translate(0px, 0px)';
        });
    });

    // ==========================================
    // 4. تأثير الكتابة التلقائية المطور (Typing Effect)
    // ==========================================
    const typedTextSpan = document.querySelector(".typed-text");
    // const textArray = ["Front-End Developer.", "React Expert.", "Clean Code Writer.", "Problem Solver."];
    // استبدل السطر ده في ملف script.js
const textArray = ["Front-End Developer.", "React.js Developer.", "UI/UX Enthusiast.", "Web Performance Optimizer."];
    const typingSpeed = 100;
    const erasingSpeed = 50;
    const newTextDelay = 1800; 
    let textArrayIndex = 0;
    let charIndex = 0;

    function type() {
        if (charIndex < textArray[textArrayIndex].length) {
            typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, typingSpeed);
        } else {
            setTimeout(erase, newTextDelay);
        }
    }

    function erase() {
        if (charIndex > 0) {
            typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(erase, erasingSpeed);
        } else {
            textArrayIndex++;
            if (textArrayIndex >= textArray.length) textArrayIndex = 0;
            setTimeout(type, typingSpeed + 1000);
        }
    }
    
    if (typedTextSpan) setTimeout(type, 500);

    // ==========================================
    // 5. قائمة الموبايل (Hamburger Menu Linkage)
    // ==========================================
    const hamburger = document.querySelector('.hamburger-menu');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links a');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = hamburger.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-xmark');
    });

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const icon = hamburger.querySelector('i');
            icon.classList.add('fa-bars');
            icon.classList.remove('fa-xmark');
        });
    });

    // ==========================================
    // 6. شريط تقدم السكرول العلوي + تنشيط عناصر القائمة (Active Class)
    // ==========================================
    const scrollProgress = document.getElementById('scroll-progress');
    const sections = document.querySelectorAll('section');

    window.addEventListener('scroll', () => {
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (window.pageYOffset / totalHeight) * 100;
        scrollProgress.style.width = progress + '%';

        let currentSectionId = 'hero';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            if (window.pageYOffset >= sectionTop) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${currentSectionId}`) {
                item.classList.add('active');
            }
        });
    });

    // ==========================================
    // 7. نظام تصفية وفلترة المشاريع (Projects Filter)
    // ==========================================
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            projectCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.classList.remove('hide');
                } else {
                    card.classList.add('hide');
                }
            });
        });
    });

    // ==========================================
    // 8. أنيميشن ظهور الأقسام التدريجي (Smooth Fade-In On Scroll)
    // ==========================================
    const revealSection = function (entries, observer) {
        const [entry] = entries;
        if (!entry.isIntersecting) return;
        
        entry.target.style.transform = 'translateY(0)';
        entry.target.style.opacity = '1';
        entry.target.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        observer.unobserve(entry.target);
    };

    const sectionObserver = new IntersectionObserver(revealSection, {
        root: null, threshold: 0.1,
    });

    sections.forEach(section => {
        // نطبق الأنيميشن على الأقسام عدا السكشن الأول لراحة المستخدم عند الدخول
        if(section.id !== 'hero') {
            sectionObserver.observe(section);
            section.style.transform = 'translateY(30px)';
            section.style.opacity = '0';
        }
    });

});