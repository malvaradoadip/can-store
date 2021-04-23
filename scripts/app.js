let productGrid = document.querySelector(".product-list");

async function initialize() {
    let response = await fetch("../data/products.json");
    let data = await response.json();
    console.log(data);
    data.forEach(element => {
        console.log(element.type);
        createArticleBox(element);
    });
}

async function createArticleBox(item){
    let articleBox = document.createElement("article");
    articleBox.classList.add("articleBox");

    let articleHeader = document.createElement('div');
    articleHeader.classList.add("articleHeader");
    
    let articleIconContainer = document .createElement('div');
    articleIconContainer.classList.add("articleIconContainer");
    
    let articleIconText = document.createElement('i');
    
    let articleNameText = document.createElement('p');
    articleNameText.classList.add("articleNameText");
    
    let articleImageContainer = document.createElement('div');
    articleImageContainer.classList.add("articleImageContainer");

    let articleImage = document.createElement('img');
    
    let articlePriceContainer = document.createElement('div');
    articlePriceContainer.classList.add("articlePriceContainer");
    
    let articlePriceText = document.createElement('p');

    articleIconText.classList.add("fas");
    switch (item.type) {
        case "vegetables":
            articleIconText.classList.add("fa-carrot");
            break;
        case "meat":
            articleIconText.classList.add("fa-drumstick-bite");
            break;
        case "soup":
            articleIconText.classList.add("fa-glass-whiskey");
            break;
        default:
            break;
    }
    articleIconContainer.appendChild(articleIconText);
    articleNameText.textContent = item.name[0].toUpperCase() + item.name.slice(1);
    
    articleHeader.appendChild(articleIconContainer);
    articleHeader.appendChild(articleNameText);
    
    articleImage.src = await getImageBlob(item.image);
    
    articlePriceText.textContent = `$ ${item.price}`;
    
    articlePriceContainer.appendChild(articlePriceText);
    articleImageContainer.appendChild(articleImage);
    articleImageContainer.appendChild(articlePriceContainer);
    
    articleBox.appendChild(articleHeader);
    articleBox.appendChild(articleImageContainer);
    
    productGrid.appendChild(articleBox);

}

async function getImageBlob(filename){
    let response = await fetch(`images/${filename}`);
    if(!response.ok){
        throw new Error(`HTTP error status:${response.status}`);
    }
    let imgBlob = await response.blob();
    let objectURL = URL.createObjectURL(imgBlob);
    return objectURL;
}

initialize();
