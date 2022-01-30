"use strict"
let productList = document.querySelector(".product-list");
let submitedProducts;
if (sessionStorage.getItem("cartProducts")) {
    submitedProducts = JSON.parse(sessionStorage.getItem("cartProducts"));
}
else {
    submitedProducts = [];
}

function getProductNameById(productId) {
    switch (productId) {
        case 1:
            return "Candle for adults";
        case 2:
            return "Minimalist candle";
        case 3:
            return "Candle in colored glass";
        default:
            return "";
    }
}

function getProductPriceById(productId) {
    switch (productId) {
        case 1:
            return 10;
        case 2:
            return 15;
        case 3:
            return 17;
        default:
            return -1;
    }
}

function drawProductList() {
    productList.innerHTML = "";
    submitedProducts.forEach(product => {
        productList.insertAdjacentHTML("beforeend", `
                <li class="product-list__item" data-id="${product.id}" data-color="${product.color}" data-smell="${product.smell}" data-amount="${product.amount}">
                    <div class="product-list__image-container"><img src="./img/product_${product.id}.png" alt="product-image"></div>
                    <div class="product-list__text-container">
                        <button class="product-list__delete-button"><img src="./img/trash-can.svg"
                                alt="delete"></button>
                        <h2 class="product-list__description title">${getProductNameById(product.id)}</h2>
                        <p class="product-list__description usual-text usual-text_small">
                            Color - <span class="usual-text_highlited">${product.color}</span>
                        </p>
                        <p class="product-list__description usual-text usual-text_small">
                            Smell - <span class="usual-text_highlited">${product.smell}</span>
                        </p>
                        <p class="product-list__description usual-text usual-text_small">
                            Amount - <input type="number" class="product-list__product-amount usual-text_highlited"
                                value="${product.amount}">
                        </p>
                        <h3 class="product-list__price usual-text usual-text_highlited">${product.price}$</h3>
                    </div>
                </li>`);
    });
}

// function drawProductPrice {
//     productList.
// }

drawProductList();

document.addEventListener("click", event => {
    let target = event.target.closest(".product-list__delete-button");
    if (target) {
        let productFound = submitedProducts.findIndex(product => {
            if (product.id == target.closest(".product-list__item").dataset.id && product.color == target.closest(".product-list__item").dataset.color && product.smell == target.closest(".product-list__item").dataset.smell) {
                return true;
            }
        })
        if (productFound >= 0) {
            submitedProducts.splice(productFound, 1);
            sessionStorage.setItem("cartProducts", JSON.stringify(submitedProducts));
            drawProductList();
        }
    }
});

document.addEventListener("input", event => {
    let target = event.target.closest(".product-list__product-amount");
    if (target) {
        if (target.value > 10000) {
            target.value = 10000;
        }
        else if (target.value < 1) {
            target.value = 1;
        }

        let productFound = submitedProducts.findIndex(product => {
            if (product.id == target.closest(".product-list__item").dataset.id && product.color == target.closest(".product-list__item").dataset.color && product.smell == target.closest(".product-list__item").dataset.smell) {
                return true;
            }
        });
        if (productFound >= 0) {
            submitedProducts[productFound].amount = +target.value;
            submitedProducts[productFound].price = submitedProducts[productFound].amount * getProductPriceById(+target.closest(".product-list__item").dataset.id);
            sessionStorage.setItem("cartProducts", JSON.stringify(submitedProducts));
            console.log(target.closest(".product-list__item").dataset.amount)
            setTimeout(() => {
                drawProductList();
            }, 2000);
            // console.log(submitedProducts);
        }
    }
});