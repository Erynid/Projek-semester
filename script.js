const API_URL = 'https://dummyjson.com/products';

let allProducts = [];
let filteredProducts = [];

async function loadProducts() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error(`Kesalahan HTTP: ${response.status}`);
        }
        const data = await response.json();
        allProducts = data.products;
        filteredProducts = [...allProducts];
        console.log('Data produk Toko A berhasil dimuat:', allProducts);
    } catch (error) {
        console.error('Error saat mengambil data:', error.message);
    }
}

document.addEventListener('DOMContentLoaded', loadProducts);