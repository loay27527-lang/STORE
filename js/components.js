// TECHSTORE - Shared Components

function renderHeader(activePage = '') {
  const user = DB.getUser();
  const cart = DB.getCart();
  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  const wishCount = DB.getWishlist().length;

  return `
  <header class="ts-header">
    <div class="ts-header-inner">
      <a href="index.html" class="ts-logo">
        <div class="logo-icon">⚡</div>
        <div class="ts-logo-text"><span>TECH</span><span>STORE</span></div>
      </a>

      <div class="ts-search">
        <input type="text" placeholder="ابحث عن منتج..." id="headerSearch" autocomplete="off">
        <span class="ts-search-icon">🔍</span>
        <div class="ts-search-results" id="searchResults"></div>
      </div>

      <div class="ts-header-actions">
        <a href="wishlist.html" class="ts-header-btn" title="المفضلة">
          🤍
          <span class="ts-badge wish-count" style="display:${wishCount>0?'flex':'none'}">${wishCount}</span>
        </a>
        <a href="${user ? 'account.html' : '#'}" class="ts-header-btn" title="حسابي" onclick="${user ? '' : 'showAuthModal(); return false;'}">
          👤
        </a>
        <button class="ts-header-btn" onclick="openCart()" title="السلة">
          🛒
          <span class="ts-badge cart-count" style="display:${cartCount>0?'flex':'none'}">${cartCount}</span>
        </button>
        <button class="ts-menu-btn" onclick="toggleNavDrawer()">
          <span></span><span></span><span></span>
        </button>
      </div>
    </div>
  </header>

  <!-- Cart Drawer -->
  <div class="ts-drawer-overlay" id="drawerOverlay" onclick="closeAll()"></div>
  <div class="ts-cart-drawer" id="cartDrawer">
    <div class="ts-cart-header">
      <h3>🛒 سلة التسوق</h3>
      <button class="ts-btn ts-btn-sm" onclick="closeCart()">✕</button>
    </div>
    <div class="ts-cart-body" id="cartBody"></div>
    <div class="ts-cart-footer" id="cartFooter"></div>
  </div>

  <!-- Nav Drawer -->
  <div class="ts-nav-drawer" id="navDrawer">
    <div class="ts-nav-drawer-header">
      <div class="ts-logo">
        <div class="logo-icon">⚡</div>
        <div class="ts-logo-text"><span>TECH</span><span>STORE</span></div>
      </div>
    </div>
    <a href="index.html" class="ts-nav-link"><span class="nav-icon">🏠</span> الرئيسية</a>
    <a href="products.html" class="ts-nav-link"><span class="nav-icon">📦</span> جميع المنتجات</a>
    <a href="products.html?cat=phones" class="ts-nav-link"><span class="nav-icon">📱</span> هواتف</a>
    <a href="products.html?cat=laptops" class="ts-nav-link"><span class="nav-icon">💻</span> لابتوبات</a>
    <a href="products.html?cat=headphones" class="ts-nav-link"><span class="nav-icon">🎧</span> سماعات</a>
    <a href="products.html?cat=screens" class="ts-nav-link"><span class="nav-icon">🖥️</span> شاشات</a>
    <a href="products.html?cat=tablets" class="ts-nav-link"><span class="nav-icon">📟</span> أجهزة لوحية</a>
    <a href="products.html?cat=accessories" class="ts-nav-link"><span class="nav-icon">⌚</span> إكسسوارات</a>
    <hr style="border-color:var(--border); margin: 8px 0;">
    <a href="wishlist.html" class="ts-nav-link"><span class="nav-icon">❤️</span> المفضلة</a>
    <a href="${user ? 'account.html' : '#'}" class="ts-nav-link" onclick="${user ? '' : 'showAuthModal(); closeNavDrawer();'}"><span class="nav-icon">👤</span> حسابي</a>
    <a href="chat.html" class="ts-nav-link"><span class="nav-icon">💬</span> خدمة العملاء</a>
    ${user ? `<a href="#" class="ts-nav-link" onclick="DB.logout();location.href='index.html'"><span class="nav-icon">🚪</span> تسجيل الخروج</a>` : ''}
  </div>

  <!-- Auth Modal -->
  <div class="ts-modal-overlay" id="authModal">
    <div class="ts-modal">
      <div class="ts-tabs" id="authTabs">
        <button class="ts-tab active" onclick="switchAuthTab('login')">تسجيل الدخول</button>
        <button class="ts-tab" onclick="switchAuthTab('register')">حساب جديد</button>
      </div>
      <div id="loginForm">
        <div class="ts-form-group">
          <label>البريد الإلكتروني</label>
          <input type="email" class="ts-input" id="loginEmail" placeholder="بريدك الإلكتروني">
        </div>
        <div class="ts-form-group">
          <label>كلمة المرور</label>
          <div class="ts-input-wrap">
            <input type="password" class="ts-input" id="loginPw" placeholder="كلمة المرور" style="padding-left:40px">
            <button class="ts-eye-btn" onclick="togglePw('loginPw',this)">👁️</button>
          </div>
        </div>
        <button class="ts-btn ts-btn-primary ts-btn-full" onclick="doLogin()">تسجيل الدخول</button>
      </div>
      <div id="registerForm" style="display:none">
        <div class="ts-form-group">
          <label>الاسم الكامل</label>
          <input type="text" class="ts-input" id="regName" placeholder="اسمك بالكامل">
        </div>
        <div class="ts-form-group">
          <label>البريد الإلكتروني</label>
          <input type="email" class="ts-input" id="regEmail" placeholder="بريدك الإلكتروني">
        </div>
        <div class="ts-form-group">
          <label>رقم الهاتف</label>
          <input type="tel" class="ts-input" id="regPhone" placeholder="رقم هاتفك">
        </div>
        <div class="ts-form-group">
          <label>كلمة المرور</label>
          <div class="ts-input-wrap">
            <input type="password" class="ts-input" id="regPw" placeholder="اختر كلمة مرور" style="padding-left:40px">
            <button class="ts-eye-btn" onclick="togglePw('regPw',this)">👁️</button>
          </div>
        </div>
        <button class="ts-btn ts-btn-primary ts-btn-full" onclick="doRegister()">إنشاء الحساب</button>
      </div>
      <button onclick="closeAuthModal()" style="background:none;border:none;color:var(--text3);cursor:pointer;width:100%;margin-top:12px;font-family:Cairo,sans-serif;font-size:13px;">إغلاق</button>
    </div>
  </div>
  `;
}

function renderFooter() {
  return `
  <div class="ts-features">
    <div class="ts-feature">
      <div class="ts-feature-icon">🚚</div>
      <div class="ts-feature-text">
        <strong>شحن سريع</strong>
        <span>خلال 24 - 48 ساعة</span>
      </div>
    </div>
    <div class="ts-feature">
      <div class="ts-feature-icon">🔄</div>
      <div class="ts-feature-text">
        <strong>ضمان استرجاع</strong>
        <span>14 يوم استرجاع مجاني</span>
      </div>
    </div>
    <div class="ts-feature">
      <div class="ts-feature-icon">🔒</div>
      <div class="ts-feature-text">
        <strong>دفع آمن</strong>
        <span>100% حماية لبياناتك</span>
      </div>
    </div>
    <div class="ts-feature">
      <div class="ts-feature-icon">🎧</div>
      <div class="ts-feature-text">
        <strong>دعم فني</strong>
        <span>24/7 لجميع استفساراتك</span>
      </div>
    </div>
  </div>
  <footer class="ts-footer">
    <p>جميع حقوق الملكية محفوظة لـ <strong style="color:var(--blue3)">LOAY</strong> © ${new Date().getFullYear()} | <a href="chat.html">خدمة العملاء</a></p>
  </footer>
  `;
}

// CART FUNCTIONS
function openCart() {
  renderCartDrawer();
  document.getElementById('cartDrawer').classList.add('open');
  document.getElementById('drawerOverlay').classList.add('show');
}
function closeCart() {
  document.getElementById('cartDrawer').classList.remove('open');
  document.getElementById('drawerOverlay').classList.remove('show');
}
function toggleNavDrawer() {
  document.getElementById('navDrawer').classList.toggle('open');
  document.getElementById('drawerOverlay').classList.add('show');
}
function closeNavDrawer() {
  document.getElementById('navDrawer').classList.remove('open');
  if (!document.getElementById('cartDrawer').classList.contains('open')) {
    document.getElementById('drawerOverlay').classList.remove('show');
  }
}
function closeAll() {
  document.getElementById('cartDrawer').classList.remove('open');
  document.getElementById('navDrawer').classList.remove('open');
  document.getElementById('drawerOverlay').classList.remove('show');
}

function renderCartDrawer() {
  const cart = DB.getCart();
  const body = document.getElementById('cartBody');
  const footer = document.getElementById('cartFooter');

  if (cart.length === 0) {
    body.innerHTML = `<div class="ts-empty"><div class="empty-icon">🛒</div><h3>السلة فارغة</h3><p>لم تضف أي منتجات بعد</p><a href="products.html" class="ts-btn ts-btn-primary" onclick="closeCart()">تصفح المنتجات</a></div>`;
    footer.innerHTML = '';
    return;
  }

  let total = 0;
  body.innerHTML = cart.map(item => {
    const p = DB.getProduct(item.productId);
    if (!p) return '';
    let price = p.price;
    if (item.storage) {
      const s = p.storage.find(s => s.size === item.storage);
      if (s) price += s.price;
    }
    if (item.color) {
      const c = p.colors.find(c => c.name === item.color);
      if (c) price += c.price;
    }
    const itemTotal = price * item.qty;
    total += itemTotal;
    return `
    <div class="ts-cart-item">
      <img src="${p.images[0]}" alt="${p.name}" onerror="this.src='https://placehold.co/60x60/0D1B30/60A5FA?text=📦'">
      <div class="ts-cart-item-info" style="flex:1">
        <div class="ts-cart-item-name">${p.name}</div>
        ${item.color ? `<div class="ts-cart-item-meta">${item.color}${item.storage ? ' | ' + item.storage : ''}</div>` : ''}
        <div class="ts-cart-item-price">${formatPrice(price)}</div>
        <div class="ts-qty-ctrl">
          <button class="ts-qty-btn" onclick="changeCartQty('${item.key}', ${item.qty - 1})">−</button>
          <span class="ts-qty-val">${item.qty}</span>
          <button class="ts-qty-btn" onclick="changeCartQty('${item.key}', ${item.qty + 1})">+</button>
        </div>
      </div>
      <span class="ts-cart-del" onclick="changeCartQty('${item.key}', 0)">🗑️</span>
    </div>
    `;
  }).join('');

  footer.innerHTML = `
  <div class="ts-cart-total">
    <span>الإجمالي</span>
    <span>${formatPrice(total)}</span>
  </div>
  <a href="checkout.html" class="ts-btn ts-btn-primary ts-btn-full" onclick="closeCart()">إتمام الطلب ←</a>
  `;
}

function changeCartQty(key, qty) {
  DB.updateCartQty(key, qty);
  renderCartDrawer();
}

// SEARCH
function initSearch() {
  const input = document.getElementById('headerSearch');
  const results = document.getElementById('searchResults');
  if (!input) return;

  let timeout;
  input.addEventListener('input', () => {
    clearTimeout(timeout);
    const q = input.value.trim();
    if (q.length < 2) { results.classList.remove('show'); return; }
    timeout = setTimeout(() => {
      const products = DB.getProducts({ search: q }).slice(0, 5);
      if (!products.length) { results.classList.remove('show'); return; }
      results.innerHTML = products.map(p => `
        <a href="product.html?id=${p.id}" class="ts-search-item" onclick="results.classList.remove('show')">
          <img src="${p.images[0]}" alt="${p.name}" onerror="this.src='https://placehold.co/40x40/0D1B30/60A5FA?text=📦'">
          <div class="ts-search-item-info">
            <div class="ts-search-item-name">${p.name}</div>
            <div class="ts-search-item-price">${formatPrice(p.price)}</div>
          </div>
        </a>
      `).join('');
      results.classList.add('show');
    }, 300);
  });

  document.addEventListener('click', e => {
    if (!e.target.closest('.ts-search')) results.classList.remove('show');
  });

  input.addEventListener('keydown', e => {
    if (e.key === 'Enter' && input.value.trim()) {
      window.location.href = `products.html?search=${encodeURIComponent(input.value.trim())}`;
    }
  });
}

// AUTH MODAL
function showAuthModal() {
  document.getElementById('authModal').classList.add('show');
}
function closeAuthModal() {
  document.getElementById('authModal').classList.remove('show');
}
function switchAuthTab(tab) {
  document.querySelectorAll('#authTabs .ts-tab').forEach((b, i) => b.classList.toggle('active', (tab === 'login' && i === 0) || (tab === 'register' && i === 1)));
  document.getElementById('loginForm').style.display = tab === 'login' ? 'block' : 'none';
  document.getElementById('registerForm').style.display = tab === 'register' ? 'block' : 'none';
}
function togglePw(id, btn) {
  const inp = document.getElementById(id);
  inp.type = inp.type === 'password' ? 'text' : 'password';
  btn.textContent = inp.type === 'password' ? '👁️' : '🙈';
}
async function doLogin() {
  const email = document.getElementById('loginEmail').value.trim();
  const pw = document.getElementById('loginPw').value;
  if (!email || !pw) { showToast('يرجى ملء جميع الحقول', 'error'); return; }
  const result = await DB.loginUser(email, pw);
  if (result.error) { showToast(result.error, 'error'); return; }
  showToast('تم تسجيل الدخول بنجاح ✅');
  closeAuthModal();
  setTimeout(() => location.reload(), 1000);
}
async function doRegister() {
  const name = document.getElementById('regName').value.trim();
  const email = document.getElementById('regEmail').value.trim();
  const phone = document.getElementById('regPhone').value.trim();
  const pw = document.getElementById('regPw').value;
  if (!name || !email || !phone || !pw) { showToast('يرجى ملء جميع الحقول', 'error'); return; }
  if (pw.length < 6) { showToast('كلمة المرور يجب أن تكون 6 أحرف على الأقل', 'error'); return; }
  const result = await DB.register({ name, email, phone, password: pw, avatar: null });
  if (result.error) { showToast(result.error, 'error'); return; }
  showToast('تم إنشاء الحساب بنجاح 🎉');
  closeAuthModal();
  setTimeout(() => location.href = 'account.html', 1000);
}

function renderStars(rating) {
  let s = '';
  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(rating)) s += '★';
    else if (i - rating < 1) s += '☆';
    else s += '☆';
  }
  return s;
}

async function initPage(callback) {
  showDBLoader();
  await DB.init();
  hideDBLoader();
  document.getElementById('header-placeholder').innerHTML = renderHeader();
  document.getElementById('footer-placeholder').innerHTML = renderFooter();
  initSearch();
  if (callback) callback();
}
