document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navMenu = document.querySelector('nav ul');
    
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }
    
    // Header scroll effect
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (header) {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (navMenu) {
                    navMenu.classList.remove('active');
                }
            }
        });
    });
    
    // Module card click functionality
    document.querySelectorAll('.module-card').forEach(card => {
        card.addEventListener('click', function() {
            const module = this.getAttribute('data-module');
            openModulePage(module);
        });
        
        // Add keyboard accessibility
        card.setAttribute('tabindex', '0');
        card.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const module = this.getAttribute('data-module');
                openModulePage(module);
            }
        });
    });
    
    // Function to open module pages
    function openModulePage(module) {
        // Map module names to their HTML files
        const modulePages = {
            'online-week': 'online-week.html',
            'netherlands': 'netherlands.html',
            'spain': 'spain.html',
            'austria': 'austria.html',
            'belgium': 'belgium.html',
            'south-africa': 'south-africa.html'
        };
        
        // Check if the page exists and redirect
        if (modulePages[module]) {
            window.location.href = modulePages[module];
        } else {
            // Fallback - show alert for pages not created yet
            alert(`The ${module.replace('-', ' ')} page is coming soon!`);
        }
    }
    
    // Add animation to elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Animate skill bars in about section
                if(entry.target.classList.contains('about-content')) {
                    animateSkillBars();
                }
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const elementsToObserve = document.querySelectorAll(
        '.module-card, .about-content, .overview-card, .team-member, ' +
        '.reflection-card, .takeaway-card, .experience-card, ' +
        '.learning-card, .cultural-card, .project-card'
    );
    
    elementsToObserve.forEach(element => {
        if (element) {
            observer.observe(element);
        }
    });
    
    // Animate skill bars
    function animateSkillBars() {
        const skillBars = document.querySelectorAll('.skill-bar');
        skillBars.forEach(bar => {
            bar.classList.add('animated');
            const skillLevel = bar.querySelector('.skill-level');
            const width = skillLevel.style.width;
            skillLevel.style.width = '0';
            setTimeout(() => {
                skillLevel.style.width = width;
            }, 300);
        });
    }
    
    // Create floating particles
    function createParticles() {
        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'particles';
        document.body.appendChild(particlesContainer);
        
        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // Random properties
            const size = Math.random() * 5 + 1;
            const posX = Math.random() * 100;
            const delay = Math.random() * 15;
            const duration = Math.random() * 10 + 10;
            
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${posX}vw`;
            particle.style.animationDelay = `${delay}s`;
            particle.style.animationDuration = `${duration}s`;
            
            particlesContainer.appendChild(particle);
        }
    }
    
    // Only create particles on index page
    if (document.querySelector('.hero')) {
        createParticles();
        
        // Add typing effect to hero title
        const heroTitle = document.querySelector('.hero h1');
        if (heroTitle) {
            const originalText = heroTitle.textContent;
            heroTitle.textContent = '';
            
            let i = 0;
            function typeWriter() {
                if (i < originalText.length) {
                    heroTitle.textContent += originalText.charAt(i);
                    i++;
                    setTimeout(typeWriter, 50);
                }
            }
            
            // Start typing effect after a short delay
            setTimeout(typeWriter, 500);
        }
    }
});

// Tab functionality for learning outcomes section
document.addEventListener('DOMContentLoaded', function() {
    const tabs = document.querySelectorAll('.learning-tab');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs and contents
            tabs.forEach(t => t.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding content
            tab.classList.add('active');
            const tabId = tab.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // Mobile menu toggle
    const mobileToggle = document.querySelector('.mobile-toggle');
    const nav = document.querySelector('nav');
    
    if (mobileToggle && nav) {
        mobileToggle.addEventListener('click', () => {
            nav.classList.toggle('active');
        });
    }
});

// Gallery functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize gallery
    initGallery();
    
    // Gallery functionality
    const galleryItems = document.querySelectorAll('.gallery-item');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const searchInput = document.getElementById('gallery-search');
    const loadMoreBtn = document.getElementById('load-more');
    
    let currentFilter = 'all';
    let currentSearch = '';
    let visibleItems = 12; // Initial number of items to show
    const itemsPerLoad = 12; // Items to load each time
    
    // Filter functionality
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            currentFilter = filter;
            filterGallery();
        });
    });
    
    // Search functionality
    searchInput.addEventListener('input', function() {
        currentSearch = this.value.toLowerCase();
        filterGallery();
    });
    
    // Load more functionality
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            visibleItems += itemsPerLoad;
            filterGallery();
            updateLoadMoreButton();
        });
    }
    
    function filterGallery() {
        let visibleCount = 0;
        
        galleryItems.forEach((item, index) => {
            const category = item.getAttribute('data-category');
            const tags = item.getAttribute('data-tags').toLowerCase();
            const title = item.querySelector('h4')?.textContent.toLowerCase() || '';
            const description = item.querySelector('p')?.textContent.toLowerCase() || '';
            
            const matchesFilter = currentFilter === 'all' || category === currentFilter;
            const matchesSearch = !currentSearch || 
                                tags.includes(currentSearch) || 
                                title.includes(currentSearch) || 
                                description.includes(currentSearch);
            
            const shouldShow = matchesFilter && matchesSearch && visibleCount < visibleItems;
            
            if (shouldShow) {
                item.style.display = 'block';
                visibleCount++;
                // Add fade-in animation
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, index * 50);
            } else {
                item.style.display = 'none';
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
            }
        });
        
        updateGalleryStats();
    }
    
    function updateGalleryStats() {
        const totalPhotos = document.querySelectorAll('.gallery-item:not(.video)').length;
        const totalVideos = document.querySelectorAll('.gallery-item.video').length;
        const visiblePhotos = document.querySelectorAll('.gallery-item:not(.video)[style="display: block"]').length;
        const visibleVideos = document.querySelectorAll('.gallery-item.video[style="display: block"]').length;
        
        document.getElementById('photo-count').textContent = `${visiblePhotos}/${totalPhotos} photos`;
        document.getElementById('video-count').textContent = `${visibleVideos}/${totalVideos} videos`;
    }
    
    function updateLoadMoreButton() {
        const totalVisible = document.querySelectorAll('.gallery-item[style="display: block"]').length;
        const totalItems = document.querySelectorAll('.gallery-item').length;
        
        if (totalVisible >= totalItems) {
            loadMoreBtn.style.display = 'none';
        } else {
            loadMoreBtn.style.display = 'block';
        }
    }
    
    // Initialize gallery
    filterGallery();
    updateLoadMoreButton();
});

// Lightbox functionality
let currentLightboxIndex = 0;
let lightboxItems = [];

function initGallery() {
    // Collect all gallery items for lightbox navigation
    lightboxItems = Array.from(document.querySelectorAll('.gallery-item'));
}

function zoomImage(button) {
    const galleryItem = button.closest('.gallery-item');
    const img = galleryItem.querySelector('img');
    const title = galleryItem.querySelector('h4')?.textContent || '';
    const description = galleryItem.querySelector('p')?.textContent || '';
    const date = galleryItem.querySelector('.gallery-date')?.textContent || '';
    const category = galleryItem.getAttribute('data-category');
    
    currentLightboxIndex = lightboxItems.indexOf(galleryItem);
    
    openLightbox({
        type: 'image',
        src: img.src,
        title: title,
        description: description,
        date: date,
        category: category
    });
}

function playVideo(button) {
    const galleryItem = button.closest('.gallery-item');
    const videoSrc = galleryItem.getAttribute('data-video-src') || '#';
    const title = galleryItem.querySelector('h4')?.textContent || '';
    const description = galleryItem.querySelector('p')?.textContent || '';
    const date = galleryItem.querySelector('.gallery-date')?.textContent || '';
    const category = galleryItem.getAttribute('data-category');
    
    currentLightboxIndex = lightboxItems.indexOf(galleryItem);
    
    openLightbox({
        type: 'video',
        src: videoSrc,
        title: title,
        description: description,
        date: date,
        category: category
    });
}

function openLightbox(item) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxVideo = document.getElementById('lightbox-video');
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxDescription = document.getElementById('lightbox-description');
    const lightboxDate = document.getElementById('lightbox-date');
    const lightboxCategory = document.getElementById('lightbox-category');
    
    if (item.type === 'image') {
        lightboxImg.style.display = 'block';
        lightboxVideo.style.display = 'none';
        lightboxImg.src = item.src;
    } else {
        lightboxImg.style.display = 'none';
        lightboxVideo.style.display = 'block';
        lightboxVideo.src = item.src;
    }
    
    lightboxTitle.textContent = item.title;
    lightboxDescription.textContent = item.description;
    lightboxDate.textContent = item.date;
    lightboxCategory.textContent = item.category;
    
    lightbox.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxVideo = document.getElementById('lightbox-video');
    
    lightbox.style.display = 'none';
    document.body.style.overflow = 'auto';
    
    // Pause video when closing lightbox
    if (lightboxVideo) {
        lightboxVideo.pause();
    }
}

function changeImage(direction) {
    currentLightboxIndex += direction;
    
    // Loop around
    if (currentLightboxIndex >= lightboxItems.length) {
        currentLightboxIndex = 0;
    } else if (currentLightboxIndex < 0) {
        currentLightboxIndex = lightboxItems.length - 1;
    }
    
    const nextItem = lightboxItems[currentLightboxIndex];
    const img = nextItem.querySelector('img');
    const title = nextItem.querySelector('h4')?.textContent || '';
    const description = nextItem.querySelector('p')?.textContent || '';
    const date = nextItem.querySelector('.gallery-date')?.textContent || '';
    const category = nextItem.getAttribute('data-category');
    
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxVideo = document.getElementById('lightbox-video');
    
    if (nextItem.classList.contains('video')) {
        const videoSrc = nextItem.getAttribute('data-video-src') || '#';
        lightboxImg.style.display = 'none';
        lightboxVideo.style.display = 'block';
        lightboxVideo.src = videoSrc;
        lightboxVideo.play();
    } else {
        lightboxImg.style.display = 'block';
        lightboxVideo.style.display = 'none';
        lightboxImg.src = img.src;
    }
    
    document.getElementById('lightbox-title').textContent = title;
    document.getElementById('lightbox-description').textContent = description;
    document.getElementById('lightbox-date').textContent = date;
    document.getElementById('lightbox-category').textContent = category;
}

// Close lightbox when clicking outside content
document.getElementById('lightbox').addEventListener('click', function(e) {
    if (e.target === this) {
        closeLightbox();
    }
});

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    const lightbox = document.getElementById('lightbox');
    if (lightbox.style.display === 'block') {
        if (e.key === 'Escape') {
            closeLightbox();
        } else if (e.key === 'ArrowLeft') {
            changeImage(-1);
        } else if (e.key === 'ArrowRight') {
            changeImage(1);
        }
    }
});
