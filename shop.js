// Shop Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize variables
    const productsGrid = document.querySelector('.products-grid');
    const viewButtons = document.querySelectorAll('.view-btn');
    const sortSelect = document.querySelector('.sort-options select');
    const priceSlider = document.querySelector('.price-slider');
    const sizeButtons = document.querySelectorAll('.size-btn');
    const colorButtons = document.querySelectorAll('.color-btn');
    const categoryLinks = document.querySelectorAll('.category-list a');
    const paginationButtons = document.querySelectorAll('.pagination-btn');

    // View Toggle Functionality
    viewButtons.forEach(button => {
        button.addEventListener('click', function() {
            viewButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            if (this.dataset.view === 'list') {
                productsGrid.classList.add('list-view');
            } else {
                productsGrid.classList.remove('list-view');
            }
        });
    });

    // Sort Functionality
    sortSelect.addEventListener('change', function() {
        const sortValue = this.value;
        const products = Array.from(productsGrid.children);
        
        products.sort((a, b) => {
            const priceA = parseFloat(a.querySelector('.product-price').textContent.replace('$', ''));
            const priceB = parseFloat(b.querySelector('.product-price').textContent.replace('$', ''));
            
            if (sortValue === 'price-low') {
                return priceA - priceB;
            } else if (sortValue === 'price-high') {
                return priceB - priceA;
            } else if (sortValue === 'name') {
                const nameA = a.querySelector('.product-title').textContent;
                const nameB = b.querySelector('.product-title').textContent;
                return nameA.localeCompare(nameB);
            }
            return 0;
        });
        
        products.forEach(product => productsGrid.appendChild(product));
    });

    // Price Range Filter
    priceSlider.addEventListener('input', function() {
        const maxPrice = parseFloat(this.value);
        const products = document.querySelectorAll('.category-card');
        
        products.forEach(product => {
            const price = parseFloat(product.querySelector('.product-price').textContent.replace('$', ''));
            if (price <= maxPrice) {
                product.style.display = 'block';
            } else {
                product.style.display = 'none';
            }
        });
    });

    // Size Filter
    sizeButtons.forEach(button => {
        button.addEventListener('click', function() {
            this.classList.toggle('active');
            filterProducts();
        });
    });

    // Color Filter
    colorButtons.forEach(button => {
        button.addEventListener('click', function() {
            this.classList.toggle('active');
            filterProducts();
        });
    });

    // Category Filter
    categoryLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            categoryLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            filterProducts();
        });
    });

    // Pagination
    paginationButtons.forEach(button => {
        button.addEventListener('click', function() {
            paginationButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            // Add pagination logic here
        });
    });

    // Combined Filter Function
    function filterProducts() {
        const products = document.querySelectorAll('.category-card');
        const selectedSizes = Array.from(document.querySelectorAll('.size-btn.active'))
            .map(btn => btn.textContent.trim());
        const selectedColors = Array.from(document.querySelectorAll('.color-btn.active'))
            .map(btn => btn.dataset.color);
        const selectedCategory = document.querySelector('.category-list a.active')?.textContent.trim();
        
        products.forEach(product => {
            const productSize = product.dataset.size;
            const productColor = product.dataset.color;
            const productCategory = product.dataset.category;
            
            const sizeMatch = selectedSizes.length === 0 || selectedSizes.includes(productSize);
            const colorMatch = selectedColors.length === 0 || selectedColors.includes(productColor);
            const categoryMatch = !selectedCategory || productCategory === selectedCategory;
            
            if (sizeMatch && colorMatch && categoryMatch) {
                product.style.display = 'block';
            } else {
                product.style.display = 'none';
            }
        });
    }

    // Add to Cart Functionality
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const product = this.closest('.category-card');
            const productId = product.dataset.id;
            const productName = product.querySelector('.product-title').textContent;
            const productPrice = product.querySelector('.product-price').textContent;
            
            // Add to cart logic here
            console.log(`Added to cart: ${productName} - ${productPrice}`);
            
            // Show notification
            showNotification(`${productName} added to cart!`);
        });
    });

    // Notification Function
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

    // Quick View Functionality
    const productCards = document.querySelectorAll('.category-card');
    const quickViewModal = document.getElementById('quickViewModal');
    const closeModal = document.querySelector('.close-modal');
    const modalProductImage = document.getElementById('modalProductImage');
    const modalProductTitle = document.getElementById('modalProductTitle');
    const modalProductRating = document.getElementById('modalProductRating');
    const modalProductPrice = document.getElementById('modalProductPrice');
    const modalProductDescription = document.getElementById('modalProductDescription');
    const modalProductSize = document.getElementById('modalProductSize');
    const productQuantity = document.getElementById('productQuantity');
    const decreaseQuantity = document.getElementById('decreaseQuantity');
    const increaseQuantity = document.getElementById('increaseQuantity');
    const addToCartModal = document.querySelector('.add-to-cart-modal');

    // Sample product descriptions (you can replace these with your actual product data)
    const productDescriptions = {
        "Floral Summer Dress": "A beautiful floral summer dress perfect for any occasion. Made with high-quality fabric for maximum comfort and style.",
        "Pink Blouse": "Elegant pink blouse with delicate details. Perfect for both casual and formal occasions.",
        "Denim Skirt": "Classic denim skirt with modern fit. Versatile and stylish for any season.",
        "Floral Headband": "Charming floral headband that adds a touch of elegance to any outfit.",
        "White Party Dress": "Elegant white party dress perfect for special occasions. Features delicate lace details.",
        "Black Crop Top": "Trendy black crop top that pairs well with any bottom. Made with comfortable, breathable fabric."
    };

    // Function to open quick view modal
    function openQuickView(productCard) {
        const productImage = productCard.querySelector('img').src;
        const productTitle = productCard.querySelector('.product-title').textContent;
        const productRating = productCard.querySelector('.product-rating').innerHTML;
        const productPrice = productCard.querySelector('.product-price').textContent;
        const productSize = productCard.dataset.size;
        
        modalProductImage.src = productImage;
        modalProductImage.alt = productTitle;
        modalProductTitle.textContent = productTitle;
        modalProductRating.innerHTML = productRating;
        modalProductPrice.textContent = productPrice;
        modalProductDescription.textContent = productDescriptions[productTitle] || "No description available.";
        modalProductSize.value = productSize;
        productQuantity.value = 1;
        
        quickViewModal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }

    // Function to close quick view modal
    function closeQuickView() {
        quickViewModal.classList.remove('show');
        document.body.style.overflow = '';
    }

    // Event listeners for product cards
    productCards.forEach(card => {
        card.addEventListener('click', (e) => {
            // Don't open quick view if clicking on the Add to Cart button
            if (!e.target.closest('.add-to-cart')) {
                openQuickView(card);
            }
        });
    });

    // Close modal when clicking the close button
    closeModal.addEventListener('click', closeQuickView);

    // Close modal when clicking outside the modal content
    quickViewModal.addEventListener('click', (e) => {
        if (e.target === quickViewModal) {
            closeQuickView();
        }
    });

    // Close modal when pressing Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && quickViewModal.classList.contains('show')) {
            closeQuickView();
        }
    });

    // Quantity controls
    decreaseQuantity.addEventListener('click', () => {
        const currentValue = parseInt(productQuantity.value);
        if (currentValue > 1) {
            productQuantity.value = currentValue - 1;
        }
    });

    increaseQuantity.addEventListener('click', () => {
        const currentValue = parseInt(productQuantity.value);
        productQuantity.value = currentValue + 1;
    });

    // Add to cart from modal
    addToCartModal.addEventListener('click', () => {
        const productTitle = modalProductTitle.textContent;
        const productPrice = modalProductPrice.textContent;
        const quantity = parseInt(productQuantity.value);
        const size = modalProductSize.value;
        
        // Add to cart logic here
        console.log(`Added to cart: ${quantity} x ${productTitle} (${size}) - ${productPrice}`);
        showNotification(`${quantity} x ${productTitle} added to cart!`);
        closeQuickView();
    });
}); 