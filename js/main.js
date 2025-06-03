$(function() {

    'use strict';

    // smooth scroll
    $("a").on("click", function(event) {

        if (this.hash !== "") {
            event.preventDefault();

            var hash = this.hash;

            $("html, body").animate({

                scrollTop: $(hash).offset().top - 50

            }, 850);

        }

    });

    // hide navbar on mobile after click
    $('.navbar-nav a').on('click', function() {
        $('.navbar-collapse').collapse('hide');
    });

    // navbar on scroll
    $(window).on("scroll", function() {

        var onScroll = $(this).scrollTop();

        if( onScroll > 50) {
            $(".navbar").addClass("navbar-fixed");

            $(".navbar-ng .navbar-collapse .current a").css({
                "color": "#0D3B66"
            });
        }
        else {
            $(".navbar").removeClass("navbar-fixed");
            $(".navbar-ng .navbar-collapse .current a").css({
                "background-color": "#F4B400"
            });

        }

    });


    // porfolio filterizr
    $('.filter-container').imagesLoaded( function() {
        var filterizr = $('.filter-container').filterizr();
    });

    // portfolio filter
    $('.portfolio-filter-menu li').on('click', function() {
        $('.portfolio-filter-menu li').removeClass('active');
        $(this).addClass('active');
    });

    // portfolio magnific popup
    $('.portfolio').each(function() { // the containers for all your galleries
        $(this).magnificPopup({
            delegate: '.portfolio-popup', // the selector for portfolio item
            type: 'image',
            gallery: {
                enabled: true
            }
        });
    });

    // Blog filtering functionality
    const blogFilters = document.querySelectorAll('.filter-btn');
    const blogCards = document.querySelectorAll('.blog-card');

    if (blogFilters.length > 0) {
        blogFilters.forEach(filter => {
            filter.addEventListener('click', function() {
                // Remove active class from all filters
                blogFilters.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked filter
                this.classList.add('active');

                const filterValue = this.getAttribute('data-filter');

                // Filter blog cards
                blogCards.forEach(card => {
                    const cardCategory = card.getAttribute('data-category');

                    if (filterValue === 'all' || cardCategory === filterValue) {
                        card.classList.remove('hidden');
                        card.classList.add('fade-in');
                    } else {
                        card.classList.add('hidden');
                        card.classList.remove('fade-in');
                    }
                });
            });
        });
    }

    // Load More functionality
    const loadMoreBtn = document.getElementById('load-more-btn');
    let articlesVisible = 6; // Initial number of visible articles
    const articlesPerLoad = 3; // Number of articles to load each time

    if (loadMoreBtn) {
        // Initially hide extra articles (if any)
        const allCards = document.querySelectorAll('.blog-card');
        if (allCards.length > articlesVisible) {
            for (let i = articlesVisible; i < allCards.length; i++) {
                allCards[i].style.display = 'none';
            }
        }

        loadMoreBtn.addEventListener('click', function() {
            const hiddenCards = document.querySelectorAll('.blog-card[style*="display: none"]');

            // Show next batch of articles
            for (let i = 0; i < Math.min(articlesPerLoad, hiddenCards.length); i++) {
                hiddenCards[i].style.display = 'flex';
                hiddenCards[i].classList.add('fade-in');
            }

            // Hide button if no more articles
            const remainingHidden = document.querySelectorAll('.blog-card[style*="display: none"]');
            if (remainingHidden.length === 0) {
                loadMoreBtn.style.display = 'none';
            }
        });
    }

    // Lazy loading for blog images using Intersection Observer
    const blogImages = document.querySelectorAll('.blog-image img[loading="lazy"]');

    if ('IntersectionObserver' in window && blogImages.length > 0) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.src; // Trigger loading
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px 0px',
            threshold: 0.1
        });

        blogImages.forEach(img => {
            imageObserver.observe(img);
        });
    }

    // Enhanced dropdown functionality
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');

    if (dropdownToggles.length > 0) {
        // Check if we're on mobile
        function isMobile() {
            return window.innerWidth <= 768;
        }

        dropdownToggles.forEach(toggle => {
            const dropdown = toggle.closest('.dropdown');

            // Mobile: Click to toggle
            toggle.addEventListener('click', function(e) {
                if (isMobile()) {
                    e.preventDefault();

                    const dropdownMenu = dropdown.querySelector('.dropdown-menu');
                    const isOpen = dropdown.classList.contains('show');

                    // Close all other dropdowns
                    document.querySelectorAll('.dropdown.show').forEach(openDropdown => {
                        if (openDropdown !== dropdown) {
                            openDropdown.classList.remove('show');
                        }
                    });

                    // Toggle current dropdown
                    if (isOpen) {
                        dropdown.classList.remove('show');
                    } else {
                        dropdown.classList.add('show');
                    }
                }
            });

            // Desktop: Hover behavior is handled by CSS
            // But we add touch support for tablets
            dropdown.addEventListener('touchstart', function(e) {
                if (!isMobile()) {
                    const isOpen = dropdown.classList.contains('show');

                    // Close all other dropdowns
                    document.querySelectorAll('.dropdown.show').forEach(openDropdown => {
                        if (openDropdown !== dropdown) {
                            openDropdown.classList.remove('show');
                        }
                    });

                    if (!isOpen) {
                        dropdown.classList.add('show');
                    }
                }
            });
        });

        // Close dropdowns when clicking outside
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.dropdown')) {
                document.querySelectorAll('.dropdown.show').forEach(dropdown => {
                    dropdown.classList.remove('show');
                });
            }
        });

        // Close dropdowns on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                document.querySelectorAll('.dropdown.show').forEach(dropdown => {
                    dropdown.classList.remove('show');
                });
            }
        });

        // Handle window resize
        window.addEventListener('resize', function() {
            if (!isMobile()) {
                // On desktop, remove show classes to let CSS hover take over
                document.querySelectorAll('.dropdown.show').forEach(dropdown => {
                    dropdown.classList.remove('show');
                });
            }
        });
    }

});