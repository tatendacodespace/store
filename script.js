// Sample product data
const products = [
    {
        id: 1,
        name: "Floral Summer Dress",
        price: 49.99,
        image: "images/dresses/Floral summer dress.jfif",
        category: "Dresses",
        description: "Beautiful floral summer dress perfect for any occasion",
        rating: 4.5,
        reviews: 128
    },
    {
        id: 2,
        name: "Pink Blouse",
        price: 29.99,
        image: "images/tops/pink blouse.jfif",
        category: "Tops",
        description: "Elegant pink blouse with delicate details",
        rating: 4.2,
        reviews: 95
    },
    {
        id: 3,
        name: "Denim Skirt",
        price: 39.99,
        image: "images/bottoms/Blue Denim Skirt.jfif",
        category: "Bottoms",
        description: "Classic denim skirt with modern fit",
        rating: 4.7,
        reviews: 156
    },
    {
        id: 4,
        name: "Floral Headband",
        price: 14.99,
        image: "images/accessories/floral headband.jfif",
        category: "Accessories",
        description: "Charming floral headband for any outfit",
        rating: 4.8,
        reviews: 89
    }
];

// Cart functionality
let cart = [];

// Function to create product card
function createProductCard(product) {
    return `
        <div class="category-card product-card">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
                <div class="product-overlay">
                    <button class="quick-view" data-id="${product.id}">Quick View</button>
                </div>
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <div class="product-rating">
                    ${createStarRating(product.rating)}
                    <span>(${product.reviews})</span>
                </div>
                <p class="price">$${product.price.toFixed(2)}</p>
                <button class="add-to-cart" data-id="${product.id}">
                    <i class="fas fa-shopping-cart"></i> Add to Cart
                </button>
            </div>
        </div>
    `;
}

// Function to create star rating
function createStarRating(rating) {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    
    let stars = '';
    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star"></i>';
    }
    if (halfStar) {
        stars += '<i class="fas fa-star-half-alt"></i>';
    }
    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="far fa-star"></i>';
    }
    return stars;
}

// Function to load products
function loadProducts() {
    const productGrid = document.querySelector('.product-grid');
    if (productGrid) {
        productGrid.innerHTML = products.map(createProductCard).join('');
    }
}

// Function to handle cart functionality
function initializeCart() {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartCount = document.querySelector('.cart-count');
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = parseInt(e.target.dataset.id);
            const product = products.find(p => p.id === productId);
            
            if (product) {
                cart.push(product);
                updateCartCount();
                showNotification(`${product.name} added to cart!`);
            }
        });
    });
    
    function updateCartCount() {
        if (cartCount) {
            cartCount.textContent = cart.length;
            cartCount.style.display = cart.length > 0 ? 'block' : 'none';
        }
    }
}

// Function to show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Function to handle mobile menu
function initializeMobileMenu() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelector('.nav-links');
    
    if (window.innerWidth <= 768) {
        const menuButton = document.createElement('button');
        menuButton.className = 'mobile-menu-button';
        menuButton.innerHTML = '<i class="fas fa-bars"></i>';
        
        navbar.insertBefore(menuButton, navLinks);
        
        menuButton.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuButton.innerHTML = navLinks.classList.contains('active') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
        });
    }
}

// Function to handle newsletter form
function initializeNewsletter() {
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = newsletterForm.querySelector('input[type="email"]').value;
            showNotification('Thank you for subscribing to our newsletter!');
            newsletterForm.reset();
        });
    }
}

// Function to handle loading screen
function handleLoadingScreen() {
    const loadingScreen = document.querySelector('.loading');
    if (loadingScreen) {
        setTimeout(() => {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }, 1500);
    }
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
    initializeCart();
    initializeMobileMenu();
    initializeNewsletter();
    handleLoadingScreen();
    
    // Add smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add scroll reveal animation
    const revealElements = document.querySelectorAll('.category-card, .product-card, .newsletter');
    const revealOnScroll = () => {
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.classList.add('revealed');
            }
        });
    };
    
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Initial check
});