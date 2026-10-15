const API_URL = 'https://dummyjson.com/products';

let allProducts = [];
let filteredProducts = [];

const productContainer = document.getElementById('product-container');
const loadingIndicator = document.getElementById('loading-indicator');
const errorMessage = document.getElementById('error-message');
const categoryFilter = document.getElementById('category-filter');

const avgPriceEl = document.getElementById('avg-price');
const maxProductEl = document.getElementById('max-product');
const totalCategoriesEl = document.getElementById('total-categories');

async function loadProducts() {
    try {
        showLoading(true);
        errorMessage.classList.add('hidden');

        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error(`Kesalahan HTTP: ${response.status}`);
        }

        const data = await response.json();
        allProducts = data.products;
        filteredProducts = [...allProducts];

        populateCategories(allProducts);
        calculateAnalytics(allProducts);
        renderProducts(filteredProducts);
    } catch (error) {
        showError(`Gagal memuat data: ${error.message}`);
    } finally {
        showLoading(false);
    }
}

function showLoading(isLoading) {
    if (isLoading) {
        loadingIndicator.classList.remove('hidden');
    } else {
        loadingIndicator.classList.add('hidden');
    }
}

function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.remove('hidden');
}

function renderProducts(products) {
    productContainer.innerHTML = '';

    if (products.length === 0) {
        productContainer.innerHTML = '<p>Tidak ada produk yang cocok dengan pencarian kamu.</p>';
        return;
    }

    products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
      <img src="${product.thumbnail}" alt="${product.title}">
      <h3>${product.title}</h3>
      <p>Kategori: <strong>${product.category}</strong></p>
      <p>Harga: <strong>$${product.price}</strong></p>
    `;
        productContainer.appendChild(card);
    });
}

function calculateAnalytics(products) {
    if (products.length === 0) return;

    const totalHarga = products.reduce((acc, curr) => acc + curr.price, 0);
    const avgPrice = (totalHarga / products.length).toFixed(2);
    avgPriceEl.textContent = `$${avgPrice}`;

    const termahal = products.reduce((max, curr) => curr.price > max.price ? curr : max, products[0]);
    maxProductEl.textContent = `${termahal.title} ($${termahal.price})`;

    const categories = new Set(products.map(p => p.category));
    totalCategoriesEl.textContent = categories.size;
}

function populateCategories(products) {
    const categories = [...new Set(products.map(p => p.category))];
    categories.forEach(cat => {
        const option = document.createElement('option');
        option.value = cat;
        option.textContent = cat.charAt(0).toUpperCase() + cat.slice(1);
        categoryFilter.appendChild(option);
    });
}

categoryFilter.addEventListener('change', () => {
    const selectedCategory = categoryFilter.value;
    filteredProducts = allProducts.filter(product => {
        return selectedCategory === 'all' || product.category === selectedCategory;
    });
    renderProducts(filteredProducts);
});

document.addEventListener('DOMContentLoaded', loadProducts);