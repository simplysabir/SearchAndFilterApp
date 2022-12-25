(async () => {

    const productContainerEl = document.getElementById("productContainer");
    const searchInputEl = document.getElementById("searchInput");
const url = "https://fakestoreapi.com/products";
const fetchProduct = async () => {
    
    try {
        const res = await fetch(url);
        return await res.json();

    } catch (error) {
        return error;
    }
}

const products = await fetchProduct()

const generateProducts = (product) => {
    return `
        <div class="product-card">
        <div class="img-container">
            <img src="${product.image}" alt="">
        </div>
        <div class="product-content">
            <h2>${product.title}</h2>
            <p>${product.description.split(" ").slice(0,20).join(" ")}</p>
            <button>$${product.price}</button>
        </div>
        </div>
    `;
}

const renderProducts = (products) => {
    productContainerEl.innerHTML = "";
    products.forEach(product => {
        productContainerEl.innerHTML += generateProducts(product)
    });
};

    const checkTextContains = (text, searchText)=>{
        return text.toString().toLowerCase().includes(searchText);
    }


    const filterHandler = (event) => {
        const searchText = event.target.value.toLowerCase();
        const filteredProduct = products.filter((product) => {
            return (
                checkTextContains(product.description, searchText) ||
                checkTextContains(product.title, searchText) ||
                checkTextContains(product.price, searchText)

            );
        });

        renderProducts(filteredProduct);
    }

    searchInputEl.addEventListener("keyup", filterHandler);
renderProducts(products);
})()