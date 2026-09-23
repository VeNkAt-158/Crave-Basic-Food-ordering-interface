const foods = [
    {
        id: 1,
        name: "Margherita Pizza",
        category: "Pizza",
        price: 249,
        emoji: "🍕",
        description: "Classic tomato, mozzarella and basil."
    },

    {
        id: 2,
        name: "Farmhouse Pizza",
        category: "Pizza",
        price: 329,
        emoji: "🍕",
        description: "Fresh vegetables loaded with cheese."
    },

    {
        id: 3,
        name: "Classic Burger",
        category: "Burger",
        price: 179,
        emoji: "🍔",
        description: "Crispy patty with lettuce and tomato."
    },

    {
        id: 4,
        name: "Cheese Burger",
        category: "Burger",
        price: 219,
        emoji: "🍔",
        description: "Juicy burger with melted cheese."
    },

    {
        id: 5,
        name: "Cold Coffee",
        category: "Drink",
        price: 129,
        emoji: "🥤",
        description: "Cold creamy coffee with ice."
    },

    {
        id: 6,
        name: "Lemon Soda",
        category: "Drink",
        price: 89,
        emoji: "🍋",
        description: "Refreshing fizzy lemon drink."
    },

    {
        id: 7,
        name: "Chocolate Cake",
        category: "Dessert",
        price: 159,
        emoji: "🍰",
        description: "Soft chocolate cake with rich frosting."
    },

    {
        id: 8,
        name: "Ice Cream",
        category: "Dessert",
        price: 99,
        emoji: "🍨",
        description: "Creamy vanilla ice cream."
    }
];


let cart = {};



/* Display food cards */

function renderMenu(category = "All") {

    const menu = document.getElementById("foodMenu");

    let items;

    if (category === "All") {

        items = foods;

    } else {

        items = foods.filter(function(food) {
            return food.category === category;
        });

    }


    menu.innerHTML = items.map(function(food) {

        return `
            <article class="food-card">

                <div class="food-image">
                    ${food.emoji}
                </div>

                <div class="food-info">

                    <h3>${food.name}</h3>

                    <p>${food.description}</p>

                    <div class="food-bottom">

                        <span class="price">
                            ₹${food.price}
                        </span>

                        <button
                            class="add-button"
                            onclick="addToCart(${food.id})">

                            Add to Cart

                        </button>

                    </div>

                </div>

            </article>
        `;

    }).join("");

}



/* Add food to cart */

function addToCart(id) {

    if (cart[id]) {

        cart[id]++;

    } else {

        cart[id] = 1;

    }

    updateCart();
}



/* Increase/decrease quantity */

function changeQuantity(id, amount) {

    cart[id] += amount;

    if (cart[id] <= 0) {

        delete cart[id];

    }

    updateCart();
}



/* Update cart */

function updateCart() {

    const cartItems =
        document.getElementById("cartItems");

    const ids = Object.keys(cart);


    if (ids.length === 0) {

        cartItems.innerHTML = `
            <div class="empty-cart">
                Your cart is empty.
            </div>
        `;

    } else {

        cartItems.innerHTML = ids.map(function(id) {

            const food = foods.find(function(item) {
                return item.id == id;
            });


            return `
                <div class="cart-item">

                    <div>

                        <strong>
                            ${food.name}
                        </strong>

                        <br>

                        ₹${food.price * cart[id]}

                    </div>


                    <div class="quantity">

                        <button
                            onclick="changeQuantity(${id}, -1)">
                            −
                        </button>

                        <span>
                            ${cart[id]}
                        </span>

                        <button
                            onclick="changeQuantity(${id}, 1)">
                            +
                        </button>

                    </div>

                </div>
            `;

        }).join("");

    }


    /* Calculate number of items */

    let itemCount = 0;

    for (let id in cart) {

        itemCount += cart[id];

    }


    /* Calculate total price */

    let total = 0;

    for (let id in cart) {

        const food = foods.find(function(item) {
            return item.id == id;
        });

        total += food.price * cart[id];

    }


    /* Put values into HTML */

    document.getElementById("cartCount")
        .textContent = itemCount;

    document.getElementById("total")
        .textContent = total;
}



/* Category filtering */

function filterFood(category, button) {

    const buttons =
        document.querySelectorAll(".category-button");


    buttons.forEach(function(btn) {

        btn.classList.remove("active");

    });


    button.classList.add("active");

    renderMenu(category);
}



/* Open/close cart */

function toggleCart() {

    const cartElement =
        document.getElementById("cart");

    cartElement.classList.toggle("open");
}



/* Checkout */

function checkout() {

    if (Object.keys(cart).length === 0) {

        alert("Your cart is empty!");

        return;
    }


    alert("Order placed successfully!");

    cart = {};

    updateCart();
}



/* Initial page setup */

renderMenu();

updateCart();