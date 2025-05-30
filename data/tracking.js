import { products, loadProducts } from "./products.js";
import { orders } from "./orders.js"
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";

const url = new URL(window.location.href);
const orderId = url.searchParams.get("orderId");
const productId = url.searchParams.get("productId");

loadProducts(renderTrackingPage);

function renderTrackingPage() {

    const order = orders.find(eachOrder => eachOrder.id === orderId);

    const product = order.products.find(eachProduct => eachProduct.productId === productId);

    const productFound = products.find(eachProduct => eachProduct.id === productId);
    let deliveryDate = dayjs(product.estimatedDeliveryTime);
    const dateString = deliveryDate.format("dddd, MMMM D");


    let html = `
        <div class="order-tracking">
        <a class="back-to-orders-link link-primary" href="orders.html">
          View all orders
        </a>

        <div class="delivery-date">${dateString}</div>

        <div class="product-info">
          ${productFound.name}
        </div>

        <div class="product-info">Quantity: ${product.quantity}</div>

        <img
          class="product-image"
          src="${productFound.image}"
        />

        <div class="progress-labels-container">
          <div class="progress-label">Preparing</div>
          <div class="progress-label current-status">Shipped</div>
          <div class="progress-label">Delivered</div>
        </div>

        <div class="progress-bar-container">
          <div class="progress-bar"></div>
        </div>
      </div>
    `;
    document.querySelector('.tracking-page').innerHTML = html;
}

