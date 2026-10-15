const API_URL = 'https://dummyjson.com/products';

let allProducts = [];
let filteredProducts = [];

const loadingIndicator = document.getElementById('loading-indicator');
const errorMessage = document.getElementById('error-message');

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

document.addEventListener('DOMContentLoaded', loadProducts);