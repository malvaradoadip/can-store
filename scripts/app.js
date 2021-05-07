
async function initialize() {
    let categorySelection = document.querySelector("#category");
    let searchTextInput = document.querySelector("#search-term");
    
    let searchBtn = document.querySelector("button");
    let productList = [];
    try {
        let productJson = await fetch('/data/products.json');
        productList = await productJson.json();
        initializeDisplay(productList);
    } catch (error) {
        console.log(`Error fetching data:`, error);
    }
    searchBtn.addEventListener('click', (evt) => {
        evt.preventDefault();
        let searchText = searchTextInput.value.trim();
        getProducts(productList, categorySelection.value, searchText);
    });
}
function getProducts(products, category, queryString) {
    catalogGrid = document.querySelector('#catalog');
    let filteredProducts = [];
    if(category !== "all"){
        filteredProducts = filterItemsByCategory(products, category, queryString);
    }
    else {
        filteredProducts = filterItemsByText(products, queryString);
    }     
    updateDisplay(filteredProducts);
}

function filterItemsByCategory(arr, category, queryString) {
    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/indexOf
    let prefilter = arr.filter(elem => elem.type.indexOf(category) !== -1);
    return prefilter.filter(item => item.name.indexOf(queryString) !== -1);
};
function filterItemsByText(arr, queryString) {
    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/indexOf
    return arr.filter(item => item.name.indexOf(queryString) !== -1);
};



function updateDisplay(filteredProducts) {
    catalogGrid = document.querySelector("#catalog");
    listOfItems = catalogGrid.querySelectorAll('.article-container')
    arrayOfCurrentItems = [...listOfItems]
    arrayOfCurrentItems.forEach(container => {
        container.remove();
    });
    filteredProducts.forEach(item => {
        createArticle(item);
    });
}

function initializeDisplay(products) {
    catalogGrid = document.querySelector("#catalog");
    
    products.forEach(item => {
        createArticle(item);
    });
}
async function createArticle(item) {
    let articleContainer = document.createElement('article');
    let articleContainerHeader = document.createElement('div');
    let articleIconContainer = document.createElement('div');
    let articleIcon = document.createElement('i');
    let articleName = document.createElement('p');
    let articleImageContainer = document.createElement('div');
    let articlePriceContainer = document.createElement('div');
    let articlePrice = document.createElement('p');

    articlePrice.classList.add('article-price');
    articlePrice.textContent = `$ ${item.price.toFixed(2)}`;
    
    articlePriceContainer.classList.add('article-price-container');
    articlePriceContainer.appendChild(articlePrice);

    articleImageContainer.classList.add('article-image-container');
    articleImageContainer.style.backgroundImage = `url("/images/${item.image}")`;
    
    articleImageContainer.appendChild(articlePriceContainer);
    
    articleIconContainer.classList.add("article-icon-container")
    articleName.classList.add("article-name");
    articleName.textContent = item.name[0].toUpperCase() + item.name.slice(1);
    
    articleIcon.classList.add('fas');
    
    switch (item.type) {
        case "vegetables":
            articleIcon.classList.add('fa-carrot');
            break;
        case "meat":
            articleIcon.classList.add('fa-drumstick-bite');
            break;
        case "soup":
            articleIcon.classList.add('fa-glass-whiskey');
            break;
        default:
            break;
    }
    articleIconContainer.appendChild(articleIcon);
    
    articleContainerHeader.classList.add('article-container-header');
    articleContainerHeader.appendChild(articleIconContainer);
    articleContainerHeader.appendChild(articleName);
    
    articleContainer.classList.add('article-container');
    articleContainer.appendChild(articleContainerHeader);
    articleContainer.appendChild(articleImageContainer);
    
    catalogGrid.appendChild(articleContainer);
}

initialize();