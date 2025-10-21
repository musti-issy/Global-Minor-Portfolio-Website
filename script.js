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

/* ====== GALLERY TABS FUNCTIONALITY ====== */

function showTab(tabId) {
  // Hide all tab contents
  const allTabs = document.querySelectorAll("#gallery .tab-content");
  allTabs.forEach(tab => tab.classList.remove("active"));

  // Remove 'active' from all tab buttons
  const allButtons = document.querySelectorAll("#gallery .tab-btn");
  allButtons.forEach(btn => btn.classList.remove("active"));

  // Show selected tab
  const selectedTab = document.getElementById(tabId);
  if (selectedTab) {
    selectedTab.classList.add("active");
  }

  // Activate the button that was clicked
  const clickedButton = event.currentTarget;
  clickedButton.classList.add("active");
}

/* ====== OPTIONAL: Lazy Loading for Performance ====== */
document.addEventListener("DOMContentLoaded", () => {
  const lazyMedia = document.querySelectorAll("#gallery img, #gallery video");
  const options = {
    rootMargin: "50px 0px",
    threshold: 0.01
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const element = entry.target;
        if (element.dataset.src) {
          element.src = element.dataset.src;
        }
        obs.unobserve(element);
      }
    });
  }, options);

  lazyMedia.forEach(media => {
    observer.observe(media);
  });
});

/* ====== OPTIONAL: Smooth Scroll to Top of Gallery ====== */
function scrollToGalleryTop() {
  const gallery = document.getElementById("gallery");
  if (gallery) {
    gallery.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}
