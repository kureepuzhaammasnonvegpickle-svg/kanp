/**
 * Kureepulzha Amma's Non Veg Pickle - Order Website
 * Set your company WhatsApp number below (with country code, no + or spaces)
 * e.g. 919876543210 for India
 */
const COMPANY_PHONE = '917510148020'; // Kureepulzha Amma's company number
const GST_RATE = 5; // 5% GST on bill amount

/* Prices match official Kureepulzha Amma's Price List */
const PRODUCTS = [
  {
    id: 'chicken',
    name: 'Chicken Pickle',
    image: 'chicken-pickle.png',
    quantities: [
      { weight: '1 KG', price: 1399, value: '1kg' },
      { weight: '500 g', price: 699, value: '500g' },
      { weight: '250 g', price: 349, value: '250g' },
      { weight: '150 g', price: 169, value: '150g' }
    ]
  },
  {
    id: 'beef',
    name: 'Beef Pickle',
    image: 'beef-pickle.png',
    quantities: [
      { weight: '1 KG', price: 1499, value: '1kg' },
      { weight: '500 g', price: 749, value: '500g' },
      { weight: '250 g', price: 399, value: '250g' },
      { weight: '150 g', price: 199, value: '150g' }
    ]
  },
  {
    id: 'fish',
    name: 'Fish Pickle',
    image: 'fish-pickle.png',
    quantities: [
      { weight: '1 KG', price: 1249, value: '1kg' },
      { weight: '500 g', price: 649, value: '500g' },
      { weight: '250 g', price: 349, value: '250g' },
      { weight: '150 g', price: 169, value: '150g' }
    ]
  },
  {
    id: 'kanava',
    name: 'Kanava Pickle',
    image: 'kanava-pickle.png',
    quantities: [
      { weight: '1 KG', price: 1249, value: '1kg' },
      { weight: '500 g', price: 649, value: '500g' },
      { weight: '250 g', price: 349, value: '250g' },
      { weight: '150 g', price: 169, value: '150g' }
    ]
  },
  {
    id: 'prawn',
    name: 'Prawn Pickle',
    image: 'prawn-pickle.png',
    quantities: [
      { weight: '1 KG', price: 1499, value: '1kg' },
      { weight: '500 g', price: 749, value: '500g' },
      { weight: '250 g', price: 399, value: '250g' },
      { weight: '150 g', price: 199, value: '150g' }
    ]
  }
];

const COMBO = {
  id: 'combo',
  name: 'Combo Pack (250g × 3)',
  price: 999,
  image: 'combo-pack.png'
};

let cart = [];

function getCartCount() {
  return cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
}

function renderProducts() {
  const grid = document.getElementById('productGrid');
  if (!grid) return;

  grid.innerHTML = PRODUCTS.map(product => {
    const firstQty = product.quantities[0];
    return `
      <article class="product-card" data-product-id="${product.id}">
        <div class="product-image">
          <img src="${product.image}" alt="${product.name}" loading="lazy">
        </div>
        <div class="product-info">
          <h3 class="product-name">${product.name}</h3>
          <div class="quantity-options">
            ${product.quantities.map((q, i) => `
              <button type="button" class="qty-btn ${i === 0 ? 'selected' : ''}" 
                data-value="${q.value}" data-price="${q.price}" data-weight="${q.weight}">${q.weight}</button>
            `).join('')}
          </div>
          <p class="product-price">₹ ${firstQty.price}</p>
          <button type="button" class="add-one-tap" data-product-id="${product.id}">Add to Cart</button>
        </div>
      </article>
    `;
  }).join('');

  grid.querySelectorAll('.product-card').forEach(card => {
    const productId = card.dataset.productId;
    const info = card.querySelector('.product-info');
    const priceEl = info.querySelector('.product-price');
    const qtyBtns = info.querySelectorAll('.qty-btn');
    const addBtn = info.querySelector('.add-one-tap');

    qtyBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        qtyBtns.forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        priceEl.textContent = '₹ ' + btn.dataset.price;
        addBtn.dataset.weight = btn.dataset.weight;
        addBtn.dataset.price = btn.dataset.price;
      });
    });

    addBtn.dataset.weight = qtyBtns[0].dataset.weight;
    addBtn.dataset.price = qtyBtns[0].dataset.price;

    addBtn.addEventListener('click', () => {
      const selected = info.querySelector('.qty-btn.selected');
      const product = PRODUCTS.find(p => p.id === productId);
      const qty = product.quantities.find(q => q.value === selected.dataset.value);
      addToCart({
        id: product.id + '-' + qty.value,
        name: product.name,
        weight: qty.weight,
        price: qty.price,
        image: product.image,
        quantity: 1
      });
    });
  });
}

function addToCart(item) {
  const existing = cart.find(c => c.id === item.id);
  if (existing) existing.quantity = (existing.quantity || 1) + 1;
  else cart.push({ ...item, quantity: 1 });
  updateCartUI();
  openCart();
}

function removeFromCart(id) {
  cart = cart.filter(c => c.id !== id);
  updateCartUI();
}

function updateCartUI() {
  const countEl = document.getElementById('cartCount');
  const itemsEl = document.getElementById('cartItems');
  const totalEl = document.getElementById('cartTotal');

  if (countEl) {
    const n = getCartCount();
    countEl.textContent = n;
    countEl.dataset.count = n;
  }

  if (itemsEl) {
    if (cart.length === 0) {
      itemsEl.innerHTML = '<p class="cart-empty">Your cart is empty. Tap any product to add!</p>';
    } else {
      itemsEl.innerHTML = cart.map(item => `
        <div class="cart-item">
          <img class="cart-item-image" src="${item.image}" alt="">
          <div class="cart-item-details">
            <p class="cart-item-name">${item.name} ${item.weight || ''}</p>
            <p class="cart-item-qty">Qty: ${item.quantity || 1}</p>
            <p class="cart-item-price">₹ ${(item.price * (item.quantity || 1)).toLocaleString()}</p>
          </div>
          <button type="button" class="cart-item-remove" data-id="${item.id}" aria-label="Remove">×</button>
        </div>
      `).join('');
    }
  }

  const subtotal = cart.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);
  const gst = Math.round(subtotal * GST_RATE / 100);
  const total = subtotal + gst;
  if (totalEl) {
    const subDisplay = document.getElementById('cartSubtotal');
    const gstDisplay = document.getElementById('cartGst');
    if (subDisplay) subDisplay.textContent = '₹ ' + subtotal.toLocaleString();
    if (gstDisplay) gstDisplay.textContent = '₹ ' + gst.toLocaleString();
    totalEl.textContent = '₹ ' + total.toLocaleString();
  }
}

function openCart() {
  document.getElementById('cartSidebar').classList.add('open');
  document.getElementById('cartOverlay').classList.add('open');
  document.body.classList.add('mobile-menu-open');
}

function closeCart() {
  document.getElementById('cartSidebar').classList.remove('open');
  document.getElementById('cartOverlay').classList.remove('open');
  document.body.classList.remove('mobile-menu-open');
}

function openModal(modalId) {
  var m = document.getElementById(modalId);
  if (m) { m.classList.add('open'); document.body.classList.add('mobile-menu-open'); }
}

function closeModal(modalId) {
  var m = document.getElementById(modalId);
  if (m) { m.classList.remove('open'); document.body.classList.remove('mobile-menu-open'); }
}

document.getElementById('cartBtn').addEventListener('click', function(e) { e.preventDefault(); openCart(); });
document.getElementById('closeCart').addEventListener('click', function(e) { e.preventDefault(); closeCart(); });
document.getElementById('cartOverlay').addEventListener('click', closeCart);

function buildOrderText(order) {
  let lines = [
    '🛒 *NEW ORDER - Kureepulzha Amma\'s Non Veg Pickle*',
    '',
    '📋 *Order ID:* ' + order.orderId,
    '👤 *Customer:* ' + order.name,
    '📱 *Phone:* ' + order.phone,
    '📍 *Address:* ' + order.address,
    '',
    '--- Items ---'
  ];
  order.items.forEach(item => {
    lines.push(`• ${item.name} ${item.weight || ''} × ${item.quantity} = ₹${item.price * item.quantity}`);
  });
  lines.push('');
  lines.push('📊 *Subtotal: ₹' + order.subtotal + '*' );
  lines.push('📊 *GST (5%): ₹' + order.gst + '*' );
  lines.push('💰 *Total: ₹' + order.total + '*' );
  lines.push('');
  lines.push('✅ Payment: On delivery (Cash/UPI)');
  return lines.join('\n');
}

function sendToCompany(order) {
  const text = buildOrderText(order);
  const url = 'https://wa.me/' + COMPANY_PHONE + '?text=' + encodeURIComponent(text);
  var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  if (isMobile) {
    window.location.href = url;
  } else {
    window.open(url, '_blank');
  }
}

function showOrderToCustomer(order) {
  const box = document.getElementById('orderDetailsBox');
  box.textContent = buildOrderText(order).replace(/\*/g, '').replace(/🛒|📋|👤|📱|📍|---|💰|✅/g, '').trim();
}

document.getElementById('checkoutBtn').addEventListener('click', function(e) {
  e.preventDefault();
  if (cart.length === 0) {
    alert('Your cart is empty. Add products first!');
    return;
  }
  closeCart();
  var modal = document.getElementById('checkoutModal');
  var summaryEl = document.getElementById('orderSummaryInline');
  var subtotal = cart.reduce(function(sum, item) { return sum + item.price * (item.quantity || 1); }, 0);
  var gst = Math.round(subtotal * GST_RATE / 100);
  var total = subtotal + gst;
  summaryEl.innerHTML = '<strong>Order summary</strong><br>' +
    cart.map(function(i) { return i.name + ' ' + (i.weight || '') + ' × ' + (i.quantity || 1) + ' — ₹' + (i.price * (i.quantity || 1)); }).join('<br>') +
    '<br><span class="summary-subtotal">Subtotal: ₹' + subtotal + '</span><br>' +
    '<span class="summary-gst">GST (5%): ₹' + gst + '</span><br>' +
    '<strong>Total: ₹' + total + '</strong>';
  openModal('checkoutModal');
});

document.getElementById('closeCheckout').addEventListener('click', function(e) { e.preventDefault(); closeModal('checkoutModal'); });

document.getElementById('checkoutForm').addEventListener('submit', function(e) {
  e.preventDefault();
  var form = e.target;
  var name = form.name.value.trim();
  var phone = form.phone.value.trim();
  var address = form.address.value.trim();

  var subtotal = cart.reduce(function(sum, item) { return sum + item.price * (item.quantity || 1); }, 0);
  var gst = Math.round(subtotal * GST_RATE / 100);
  var total = subtotal + gst;
  var orderId = 'KA-' + Date.now();

  var order = {
    orderId: orderId,
    name: name,
    phone: phone,
    address: address,
    items: cart.map(function(i) { var c = {}; for (var k in i) c[k] = i[k]; c.quantity = i.quantity || 1; return c; }),
    subtotal: subtotal,
    gst: gst,
    total: total
  };

  closeModal('checkoutModal');
  showOrderToCustomer(order);
  openModal('successModal');

  sendToCompany(order);

  var customerPhone = phone.replace(/\D/g, '');
  var customerWa = customerPhone.length === 10 ? '91' + customerPhone : customerPhone;
  var orderForCustomer = buildOrderText(order);
  window.sendOrderToCustomerUrl = 'https://wa.me/' + customerWa + '?text=' + encodeURIComponent(
    'Hi, here is my order summary from Kureepulzha Amma\'s:\n\n' + orderForCustomer
  );

  cart = [];
  updateCartUI();
  form.reset();
});

document.getElementById('closeSuccess').addEventListener('click', function(e) { e.preventDefault(); closeModal('successModal'); });

document.getElementById('sendToMyWhatsApp').addEventListener('click', function(e) {
  e.preventDefault();
  if (window.sendOrderToCustomerUrl) {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      window.location.href = window.sendOrderToCustomerUrl;
    } else {
      window.open(window.sendOrderToCustomerUrl, '_blank');
    }
  }
});

document.getElementById('comboCard').querySelector('.btn-primary').addEventListener('click', function(e) {
  e.preventDefault();
  addToCart({
    id: 'combo-250x3',
    name: COMBO.name,
    weight: '',
    price: COMBO.price,
    image: COMBO.image,
    quantity: 1
  });
});

/* Event delegation: cart remove buttons (reliable on mobile) */
document.getElementById('cartItems').addEventListener('click', function(e) {
  var btn = e.target.closest('.cart-item-remove');
  if (btn && btn.dataset.id) removeFromCart(btn.dataset.id);
});

function init() {
  renderProducts();
  updateCartUI();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
