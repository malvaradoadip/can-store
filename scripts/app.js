
async function initialize() {
    let categorySelection = document.querySelector("#category");
    let searchText = document.querySelector("#search-term");
    let searchBtn = document.querySelector("button");
    searchBtn.addEventListener('click', (evt) => {
        evt.preventDefault();
        console.log('Hi');
    });
    let productJson = await fetch('/data/products.json');
    let productList = await productJson.json();
    console.log(productList);
    updateDisplay(productList);
}
function updateDisplay(products) {
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