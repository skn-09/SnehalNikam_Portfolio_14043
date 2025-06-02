$(document).ready(function () {
    // Theme toggle functionality
    const themeToggle = $('#themeToggle');
    const body = $('body');

    const currentTheme = localStorage.getItem('theme') || 'light';
    if (currentTheme === 'dark') {
        body.attr('data-theme', 'dark');
        themeToggle.html('<i class="fas fa-sun"></i>');
    }

    themeToggle.click(function () {
        const currentTheme = body.attr('data-theme');
        if (currentTheme === 'dark') {
            body.removeAttr('data-theme');
            themeToggle.html('<i class="fas fa-moon"></i>');
            localStorage.setItem('theme', 'light');
        } else {
            body.attr('data-theme', 'dark');
            themeToggle.html('<i class="fas fa-sun"></i>');
            localStorage.setItem('theme', 'dark');
        }
    });

    // Animated text effect
    const roles = ['Front End Developer', 'UI/UX Designer', 'React Developer', 'Web Developer'];
    let currentRoleIndex = 0;
    const animatedTextElement = $('#animatedText');

    function changeRole() {
        animatedTextElement.fadeOut(500, function () {
            currentRoleIndex = (currentRoleIndex + 1) % roles.length;
            $(this).text(roles[currentRoleIndex]).fadeIn(500);
        });
    }

    setTimeout(() => {
        setInterval(changeRole, 3000);
    }, 2000);

    // Mobile menu toggle
    $('.hamburger').click(function () {
        $(this).toggleClass('active');
        $('.nav-menu').toggleClass('active');
    });

    // Smooth scrolling for navigation links
    $('.nav-link').click(function (e) {
        e.preventDefault();
        const target = $(this).attr('href');
        $('html, body').animate({
            scrollTop: $(target).offset().top - 70
        }, 800);
        $('.nav-menu').removeClass('active');
        $('.hamburger').removeClass('active');
    });

    // Education data and rendering

    $(document).ready(function () {
        // Toggle details visibility
        $('.toggle-details').click(function () {
            var details = $(this).siblings('.details');
            details.slideToggle();
            $(this).text(details.is(':visible') ? 'Less Info' : 'More Info');
        });

        // Sort education items by year
        var items = $('.education-item').get();
        items.sort(function (a, b) {
            return $(b).data('year') - $(a).data('year');
        });
        $.each(items, function (i, item) {
            $('#education').append(item);
        });
    });
    // Projects data and rendering


    function renderProjects() {
        const container = $('#projectsContainer');
        projects.forEach((project, index) => {
            const techTags = project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('');
            const projectHtml = `
                <div class="project-card" data-name="project-${index}" data-file="script.js">
                    <img src="${project.image}" alt="${project.title}" style="width: 100%; height: 200px; object-fit: cover; border-radius: 15px; margin-bottom: 1.5rem; border: 3px solid var(--border-color);">
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <div class="tech-tags" style="margin-top: 1.5rem;">
                        ${techTags}
                    </div>
                </div>
            `;
            container.append(projectHtml);
        });
    }

    // Initialize content
    renderEducation();
    renderProjects();

    // Animate skill bars when in view
    function animateSkills() {
        $('.skill-progress').each(function () {
            const width = $(this).data('width');
            $(this).animate({ width: width + '%' }, 1500);
        });
    }

    // Intersection Observer for animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.id === 'skills') {
                    animateSkills();
                }
                $(entry.target).addClass('animate');
            }
        });
    });

    // Observe sections for animations
    $('section').each(function () {
        observer.observe(this);
    });

    // Contact form handling
    $('#contactForm').submit(function (e) {
        e.preventDefault();

        const formData = {
            name: $('#name').val(),
            email: $('#email').val(),
            phone: $('#phone').val(),
            message: $('#message').val()
        };

        if (!formData.name || !formData.email || !formData.phone) {
            alert('Please fill in all required fields.');
            return;
        }

        $('.submit-button').text('Sending...');

        setTimeout(() => {
            alert('Thank you for your message! I will get back to you soon.');
            $('#contactForm')[0].reset();
            $('.submit-button').html('<span>Send Message</span><i class="fas fa-paper-plane"></i>');
        }, 1000);
    });

    // Add CSS for tech tags and timeline items
    $('<style>')
        .prop('type', 'text/css')
        .html(`
            .tech-tag {
                display: inline-block;
                background: linear-gradient(135deg, #3498db, #2980b9);
                color: white;
                padding: 6px 12px;
                border-radius: 20px;
                font-size: 0.85rem;
                margin: 3px;
                font-weight: 500;
            }
            .year {
                color: #3498db;
                font-weight: 600;
                margin: 0.5rem 0;
                font-size: 1rem;
            }
            .timeline-item, .project-card {
                background: var(--card-bg);
                padding: 2.5rem;
                border-radius: 20px;
                box-shadow: var(--shadow);
                transition: all 0.3s ease;
                border: 1px solid var(--border-color);
            }
            .timeline-item:hover, .project-card:hover {
                transform: translateY(-8px);
                box-shadow: var(--shadow-hover);
            }
            .timeline-item h3, .project-card h3 {
                color: var(--text-color);
                margin-bottom: 0.5rem;
                font-size: 1.4rem;
                font-weight: 600;
            }
            .timeline-item h4 {
                color: var(--accent-color);
                margin-bottom: 0.5rem;
                font-size: 1.1rem;
                font-weight: 500;
            }
            .timeline-item p, .project-card p {
                color: var(--text-light);
                line-height: 1.6;
            }
            .skill-name {
                display: flex;
                justify-content: space-between;
                margin-bottom: 1rem;
                font-weight: 600;
                color: var(--text-color);
                font-size: 1.1rem;
            }
            .skill-bar {
                width: 100%;
                height: 12px;
                background: var(--border-color);
                border-radius: 10px;
                overflow: hidden;
                position: relative;
            }
            .skill-progress {
                height: 100%;
                background: linear-gradient(90deg, #3498db, #2980b9);
                border-radius: 10px;
                transition: width 2s ease;
                position: relative;
            }
            .skill-progress::after {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
                animation: shimmer 2s infinite;
            }
            @keyframes shimmer {
                0% { transform: translateX(-100%); }
                100% { transform: translateX(100%); }
            }
        `)
        .appendTo('head');
});
