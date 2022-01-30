"use strict"
const popupButtons = document.querySelector("._popup-button");
const popupsBackground = document.querySelector(".popups__background");
let scrollbarWidth = window.innerWidth - document.body.clientWidth;
let previousPopup;
let submitedProducts;
if (sessionStorage.getItem("cartProducts")) {
    submitedProducts = JSON.parse(sessionStorage.getItem("cartProducts"));
}
else {
    submitedProducts = [];
}

document.addEventListener("click", event => {
    let target = event.target.closest("._popup-button");
    if (target) {
        document.getElementById(target.getAttribute("value")).classList.add("_activated");
        if (target.closest(".popup")) {
            target.closest(".popup").classList.remove("_activated");
        }
        popupsBackground.classList.add("_activated");
        document.body.style.overflow = "hidden";
        document.body.style.paddingRight = scrollbarWidth + "px";
    }
    else {
        target = event.target;
        if (target.classList.contains("popup") || target.closest(".popup__close") || target.closest(".popup__submit-button")) {
            target.closest(".popup").classList.remove("_activated");
            let activatedPopups = document.querySelectorAll(".popup._activated");
            if (activatedPopups.length == 0) {
                popupsBackground.classList.remove("_activated");
                setTimeout(() => {
                    document.body.style.overflow = "auto";
                    document.body.style.paddingRight = "0px";
                }, 500);
            }
        }
    }

    target = event.target.closest(".popup__submit-button");
    if (target) {
        event.preventDefault();
        const submitForm = target.closest(".popup__form");
        const productItem = {
            id: +target.closest(".popup").getAttribute("id").match(/\d+/g)[0],
            color: submitForm.color.options[submitForm.color.selectedIndex].value,
            smell: submitForm.smell.options[submitForm.smell.selectedIndex].value,
            amount: +submitForm.candlesAmount.value,
            price: getProductPriceById(+target.closest(".popup").getAttribute("id").match(/\d+/g)[0]) * +submitForm.candlesAmount.value,
        };
        const submitedProductIndexFound = submitedProducts.findIndex((element, index, array) => {
            if (element.id == productItem.id && element.color == productItem.color && element.smell == productItem.smell) {
                return true;
            }
        });

        if (submitedProductIndexFound < 0) {
            submitedProducts.push(productItem);
        }
        else {
            submitedProducts[submitedProductIndexFound].amount += productItem.amount;
            submitedProducts[submitedProductIndexFound].price += productItem.price;
        }
        sessionStorage.setItem("cartProducts", JSON.stringify(submitedProducts));
    }
});

document.addEventListener("keydown", event => {
    if (event.code == "Escape") {
        let activatedPopups = document.querySelectorAll(".popup._activated");
        if (activatedPopups.length > 0) {
            activatedPopups[activatedPopups.length - 1].classList.remove("_activated");
        }
        activatedPopups = document.querySelectorAll(".popup._activated");
        if (activatedPopups.length == 0) {
            popupsBackground.classList.remove("_activated");
            setTimeout(() => {
                document.body.style.overflow = "auto";
                document.body.style.paddingRight = "0px";
            }, 500);
        }
    }
});

document.addEventListener("input", event => {
    const target = event.target.closest(".popup__candles-amount");
    if (target) {
        if (target.value > 10000) {
            target.value = 10000;
        }
        else if (target.value < 1) {
            target.value = 1;
        }
        let popupPriceElement = target.closest(".popup__form").querySelector(".popup__price");
        let productId = +target.closest(".popup").getAttribute("id").match(/\d+/g)[0];
        popupPriceElement.innerHTML = target.value * getProductPriceById(productId) + "$";
    }
});

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