"use strict"
const candlesAmountCounterElement = document.querySelector(".header__candles-amount");

function submittedCandlesCounter() {
    if (sessionStorage.getItem("cartProducts")) {
        let cartProducts = JSON.parse(sessionStorage.getItem("cartProducts"));
        let candlesAmountCounter = 0;
        cartProducts.forEach(element => {
            candlesAmountCounter += element.amount;
        });
        candlesAmountCounterElement.innerHTML = candlesAmountCounter + " candles";
        console.log(sessionStorage.getItem("cartProducts"));
    }
    else {
        candlesAmountCounterElement.innerHTML = "0 candles";
    }
}

submittedCandlesCounter();

document.addEventListener("click", event => {
    if (event.target.closest(".popup__submit-button")) {
        submittedCandlesCounter();
    }
    else if (event.target.closest(".product-list__delete-button")) {
        setTimeout(() => {
            submittedCandlesCounter();
        }, 100);
    }
});

document.addEventListener("input", event => {
    if (event.target.closest(".product-list__product-amount")) {
        setTimeout(() => {
            submittedCandlesCounter();
        }, 100);
    }
});