// script.js

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        hamburger.innerHTML = navMenu.classList.contains('active') 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
    });
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            hamburger.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });
    
    // Login Modal
    const loginBtn = document.querySelector('.btn-login');
    const loginModal = document.getElementById('loginModal');
    const closeModal = document.querySelector('.close-modal');
    const signupLink = document.getElementById('signupLink');
    const loginLink = document.getElementById('loginLink');
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    
    // Open login modal
    loginBtn.addEventListener('click', function(e) {
        e.preventDefault();
        loginModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
    
    // Close modal
    closeModal.addEventListener('click', function() {
        loginModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
    
    // Close modal when clicking outside
    loginModal.addEventListener('click', function(e) {
        if (e.target === loginModal) {
            loginModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
    
    // Switch between login and signup forms
    signupLink.addEventListener('click', function(e) {
        e.preventDefault();
        loginForm.classList.add('hidden');
        signupForm.classList.remove('hidden');
    });
    
    loginLink.addEventListener('click', function(e) {
        e.preventDefault();
        signupForm.classList.add('hidden');
        loginForm.classList.remove('hidden');
    });
    
    // Form submissions
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        // In a real app, you would send this to a server
        alert(`Login attempted with email: ${email}`);
        
        // Close modal after "login"
        loginModal.classList.remove('active');
        document.body.style.overflow = 'auto';
        
        // Change login button to show user is logged in
        loginBtn.textContent = 'My Account';
        loginBtn.style.backgroundColor = '#4CAF50';
    });
    
    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('signupName').value;
        const email = document.getElementById('signupEmail').value;
        const userType = document.getElementById('userType').value;
        
        alert(`Thank you for signing up, ${name}! You've registered as a ${userType}.`);
        
        // Switch back to login form
        signupForm.classList.add('hidden');
        loginForm.classList.remove('hidden');
    });
    
    // Novel Filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const novelsContainer = document.getElementById('novels-container');
    
    // Sample novels data
    const novels = [
        {
            id: 1,
            title: "The God of Small Things",
            author: "Arundhati Roy",
            description: "A story about childhood experiences and how small things affect people's behavior.",
            language: "english",
            genre: "fiction",
            rating: 4.5
        },
        {
            id: 2,
            title: "Gaban",
            author: "Premchand",
            description: "A moral tale about the consequences of dishonesty and greed.",
            language: "hindi",
            genre: "fiction",
            rating: 4.7
        },
        {
            id: 3,
            title: "Chokher Bali",
            author: "Rabindranath Tagore",
            description: "A novel exploring relationships, widowhood, and societal expectations.",
            language: "bengali",
            genre: "romance",
            rating: 4.6
        },
        {
            id: 4,
            title: "Ponniyin Selvan",
            author: "Kalki Krishnamurthy",
            description: "Historical fiction set in the Chola dynasty era.",
            language: "tamil",
            genre: "historical",
            rating: 4.8
        },
        {
            id: 5,
            title: "Aadujeevitham",
            author: "Benyamin",
            description: "The story of an Indian migrant worker in Saudi Arabia.",
            language: "malayalam",
            genre: "biography",
            rating: 4.9
        },
        {
            id: 6,
            title: "The White Tiger",
            author: "Aravind Adiga",
            description: "A story about ambition, corruption, and class struggle in India.",
            language: "english",
            genre: "fiction",
            rating: 4.3
        },
        {
            id: 7,
            title: "Raag Darbari",
            author: "Shrilal Shukla",
            description: "A satire on Indian village politics and corruption.",
            language: "hindi",
            genre: "fiction",
            rating: 4.4
        },
        {
            id: 8,
            title: "Parineeta",
            author: "Sarat Chandra Chattopadhyay",
            description: "A classic Bengali romance about love and societal norms.",
            language: "bengali",
            genre: "romance",
            rating: 4.5
        }
    ];
    
    // Function to display novels
    function displayNovels(filter = 'all') {
        novelsContainer.innerHTML = '';
        
        const filteredNovels = filter === 'all' 
            ? novels 
            : filter === 'best'
            ? novels.filter(novel => novel.rating >= 4.5)
            : novels.filter(novel => novel.language === filter);
        
        filteredNovels.forEach(novel => {
            const novelCard = document.createElement('div');
            novelCard.className = 'novel-card';
            novelCard.innerHTML = `
                <div class="novel-img">
                    <i class="fas fa-book"></i>
                </div>
                <div class="novel-content">
                    <h3>${novel.title}</h3>
                    <span class="novel-author">${novel.author}</span>
                    <p class="novel-description">${novel.description}</p>
                    <div class="novel-meta">
                        <span class="novel-language">${novel.language.toUpperCase()}</span>
                        <span class="novel-rating">
                            ${'★'.repeat(Math.floor(novel.rating))}${novel.rating % 1 !== 0 ? '½' : ''} ${novel.rating}
                        </span>
                    </div>
                </div>
            `;
            novelsContainer.appendChild(novelCard);
        });
    }
    
    // Initialize novels display
    displayNovels();
    
    // Add event listeners to filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Filter novels
            const filter = this.getAttribute('data-filter');
            displayNovels(filter);
        });
    });
    
    // Upload Form Toggle
    const uploadBtn = document.getElementById('uploadBtn');
    const uploadForm = document.getElementById('uploadForm');
    const cancelUpload = document.getElementById('cancelUpload');
    const novelUploadForm = document.getElementById('novelUploadForm');
    
    uploadBtn.addEventListener('click', function() {
        uploadForm.classList.add('active');
        uploadForm.scrollIntoView({ behavior: 'smooth' });
    });
    
    cancelUpload.addEventListener('click', function() {
        uploadForm.classList.remove('active');
    });
    
    novelUploadForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const title = document.getElementById('novelTitle').value;
        const author = document.getElementById('authorName').value;
        const language = document.getElementById('language').value;
        
        alert(`Thank you for uploading "${title}" by ${author}. Your novel in ${language} will be reviewed and published soon!`);
        
        // Reset form
        novelUploadForm.reset();
        uploadForm.classList.remove('active');
        
        // Add the new novel to the display
        const newNovel = {
            id: novels.length + 1,
            title: title,
            author: author,
            description: document.getElementById('description').value,
            language: language,
            genre: document.getElementById('genre').value,
            rating: 4.0 // Default rating for new novels
        };
        
        novels.push(newNovel);
        
        // Update display
        const activeFilter = document.querySelector('.filter-btn.active').getAttribute('data-filter');
        displayNovels(activeFilter);
        
        // Scroll to novels section
        document.getElementById('discover').scrollIntoView({ behavior: 'smooth' });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's a login link (handled separately)
            if (href === '#login') return;
            
            e.preventDefault();
            
            if (href !== '#') {
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Add some interactivity to novel cards
    document.addEventListener('click', function(e) {
        if (e.target.closest('.novel-card')) {
            const novelCard = e.target.closest('.novel-card');
            const title = novelCard.querySelector('h3').textContent;
            const author = novelCard.querySelector('.novel-author').textContent;
            
            alert(`You selected "${title}" by ${author}. In a real app, this would open the novel details page.`);
        }
    });
    
    // Add hover effect to author cards
    const authorCards = document.querySelectorAll('.author-card');
    authorCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.05)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add a simple animation to stats on scroll
    function animateStats() {
        const statsSection = document.querySelector('.stats');
        const statItems = document.querySelectorAll('.stat-item h3');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    statItems.forEach((stat, index) => {
                        // Animate counting up
                        const target = parseInt(stat.textContent);
                        let current = 0;
                        const increment = target / 50;
                        
                        const timer = setInterval(() => {
                            current += increment;
                            if (current >= target) {
                                current = target;
                                clearInterval(timer);
                            }
                            stat.textContent = Math.floor(current) + '+';
                        }, 30);
                    });
                    
                    // Stop observing after animation
                    observer.unobserve(statsSection);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(statsSection);
    }
    
    // Initialize stats animation
    animateStats();
});