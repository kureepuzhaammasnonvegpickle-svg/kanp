# Kureepulzha Amma's Non Veg Pickle – Website

A simple order website for **Kureepulzha Amma's Non Veg Pickle**. Built with **HTML**, **CSS**, and **JavaScript** (no server required).

## What’s included

- **5 products:** Chicken, Beef, Fish, Kanava, Prawn pickles  
- **Weights:** 1 kg, 500 g, 250 g, 150 g  
- **Combo:** 250 g × 3 products (₹999)  
- **One-tap add to cart** – choose weight, then “Add to Cart”  
- **Cart** – view items, total, remove items  
- **Checkout** – name, phone, address  
- **Order flow:**  
  - Order summary shown to customer  
  - WhatsApp opens to **company number** with full order (so you receive it)  
  - Customer can use **“Send order to my WhatsApp”** to get a copy

## How to run

1. **Set your company number**  
   Open `script.js` and change the first line:
   ```js
   const COMPANY_PHONE = '919876543210';  // e.g. 91 + 10-digit Indian number
   ```
   Use country code + number, no `+` or spaces (e.g. `919876543210` for India).

2. **Open the website**  
   Double-click `index.html` or open it in a browser.  
   Or run a simple server from this folder, for example:
   ```bash
   npx serve .
   ```
   Then open the URL it shows (e.g. http://localhost:3000).

## Payment

The site is set up for **pay on delivery** (Cash/UPI). The order message says “Payment: On delivery”. To add online payment later, you’d need a payment gateway (e.g. Razorpay, Paytm) and a backend.

## Editing products / prices

In `script.js`, edit the `PRODUCTS` array and the `COMBO` object to change names, weights, prices, or image URLs.
