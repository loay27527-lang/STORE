// TECHSTORE - Firebase Realtime Database
const _fc = {
  databaseURL: atob('aHR0cHM6Ly9zdG9yZS1wcm8tbWF4LWRlZmF1bHQtcnRkYi5maXJlYmFzZWlvLmNvbQ=='),
  apiKey: (()=>{const p=['AIzaSyCI','JpQ8Y5ja','pUgdtDzJ','Z3G_N2OR','gMyLCOs'];return p.join('');})()
};
const FB_URL = _fc.databaseURL;

async function fbGet(path){try{const r=await fetch(`${FB_URL}/${path}.json?auth=${_fc.apiKey}`);return await r.json();}catch(e){return null;}}
async function fbSet(path,data){try{await fetch(`${FB_URL}/${path}.json?auth=${_fc.apiKey}`,{method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)});}catch(e){}}

const _cache={};
function lsGet(k){try{return JSON.parse(localStorage.getItem(k));}catch{return null;}}
function lsSet(k,v){try{localStorage.setItem(k,JSON.stringify(v));}catch{}}

const DB={
  _fbReady:false,

  async init(){
    const existing=await fbGet('store');
    if(!existing||!existing.products){
      const seed={
        products:[
          {id:1,name:'iPhone 15 Pro Max',category:'phones',price:67999,oldPrice:79999,images:['https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600'],rating:4.8,reviews:128,stock:50,description:'iPhone 15 Pro Max يجمع بين الأداء الخارق والتصميم الفاخر، مع شريحة A17 Pro وكاميرا احترافية.',colors:[{name:'أزرق تيتانيوم',hex:'#4A6FA5',price:0},{name:'أسود تيتانيوم',hex:'#2C2C2E',price:0},{name:'فضي تيتانيوم',hex:'#C0C0C0',price:0},{name:'طبيعي تيتانيوم',hex:'#D4C5A9',price:0}],storage:[{size:'256GB',price:0},{size:'512GB',price:5000},{size:'1TB',price:10000}],featured:true,discount:15},
          {id:2,name:'AirPods Pro 2',category:'accessories',price:1999,oldPrice:null,images:['https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=600'],rating:4.9,reviews:89,stock:5,description:'AirPods Pro الجيل الثاني مع إلغاء ضجيج نشط.',colors:[{name:'أبيض',hex:'#FFFFFF',price:0}],storage:[],featured:true,discount:0},
          {id:3,name:'Samsung S24 Ultra',category:'phones',price:54999,oldPrice:null,images:['https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=600'],rating:4.7,reviews:64,stock:30,description:'سامسونج S24 Ultra بقلم S-Pen وكاميرا 200 ميجابكسل.',colors:[{name:'أسود',hex:'#1C1C1E',price:0},{name:'بنفسجي',hex:'#9B59B6',price:0}],storage:[{size:'256GB',price:0},{size:'512GB',price:4000}],featured:false,discount:0},
          {id:4,name:'Apple Watch Ultra 2',category:'watches',price:24999,oldPrice:null,images:['https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=600'],rating:4.8,reviews:45,stock:20,description:'Apple Watch Ultra 2 للمغامرين والرياضيين.',colors:[{name:'تيتانيوم',hex:'#A9A9A9',price:0}],storage:[],featured:true,discount:0},
          {id:5,name:'MacBook Air M2',category:'laptops',price:44999,oldPrice:null,images:['https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=600'],rating:4.9,reviews:112,stock:15,description:'MacBook Air بشريحة M2 - رفيع وخفيف وأداء لا يصدق.',colors:[{name:'فضي',hex:'#C0C0C0',price:0},{name:'ذهبي',hex:'#D4AF37',price:0},{name:'رمادي',hex:'#808080',price:0}],storage:[{size:'256GB',price:0},{size:'512GB',price:3000},{size:'1TB',price:6000}],featured:true,discount:0},
          {id:6,name:'Dell XPS 15',category:'laptops',price:54999,oldPrice:null,images:['https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600'],rating:4.7,reviews:78,stock:8,description:'Dell XPS 15 بشاشة OLED وأداء احترافي.',colors:[{name:'فضي',hex:'#C0C0C0',price:0},{name:'أسود',hex:'#1C1C1E',price:0}],storage:[{size:'512GB',price:0},{size:'1TB',price:5000}],featured:false,discount:0},
          {id:7,name:'Sony WH-1000XM5',category:'headphones',price:8999,oldPrice:null,images:['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600'],rating:4.8,reviews:203,stock:3,description:'سماعات سوني بأفضل إلغاء ضجيج في السوق.',colors:[{name:'أسود',hex:'#1C1C1E',price:0},{name:'فضي',hex:'#C0C0C0',price:0}],storage:[],featured:false,discount:0},
          {id:8,name:'iPad Pro M2',category:'tablets',price:34999,oldPrice:null,images:['https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600'],rating:4.9,reviews:156,stock:12,description:'iPad Pro بشريحة M2 وشاشة Liquid Retina XDR.',colors:[{name:'فضي',hex:'#C0C0C0',price:0},{name:'رمادي',hex:'#808080',price:0}],storage:[{size:'128GB',price:0},{size:'256GB',price:3000},{size:'512GB',price:7000},{size:'1TB',price:12000}],featured:false,discount:0},
          {id:9,name:'Samsung 4K Monitor 27"',category:'screens',price:12999,oldPrice:null,images:['https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600'],rating:4.6,reviews:67,stock:25,description:'شاشة سامسونج 4K بتقنية QLED.',colors:[{name:'أسود',hex:'#1C1C1E',price:0}],storage:[],featured:false,discount:0},
        ],
        admins:[{username:'loay',password:'11211',name:'لؤي',role:'super'}],
        users:[],orders:[],
        coupons:[{code:'TECH20',discount:20,type:'percent',active:true},{code:'SAVE2000',discount:2000,type:'fixed',active:true}],
        reviews:[
          {id:1,productId:1,name:'أحمد محمد',rating:5,comment:'هاتف رائع بكل المقاييس 🔥',date:'2024-05-20'},
          {id:2,productId:1,name:'سارة علي',rating:5,comment:'أفضل هاتف استخدمته ✨',date:'2024-05-18'},
        ],
        categories:[
          {id:'phones',name:'هواتف',icon:'📱'},
          {id:'laptops',name:'لابتوبات',icon:'💻'},
          {id:'headphones',name:'سماعات',icon:'🎧'},
          {id:'screens',name:'شاشات',icon:'🖥️'},
          {id:'tablets',name:'أجهزة لوحية',icon:'📟'},
          {id:'accessories',name:'إكسسوارات',icon:'🎮'},
          {id:'watches',name:'ساعات',icon:'⌚'},
        ],
        settings:{storeName:'TECHSTORE',freeShippingMin:500,shippingCost:60}
      };
      await fbSet('store',seed);
      _cache['store']=seed;
    } else {
      // Ensure admins always exist even in old stores loaded from Firebase
      if (!existing.admins || !Object.values(existing.admins||[]).length) {
        existing.admins = [{username:'loay',password:'11211',name:'لؤي',role:'super'}];
        await fbSet('store', existing);
      }
      _cache['store']=existing;
    }
    this._fbReady=true;
  },

  _store(){return _cache['store']||{};},
  async _save(){await fbSet('store',this._store());},

  // Products
  getProducts(filters={}){
    let arr=Object.values(this._store().products||{});
    if(!Array.isArray(arr))arr=Object.values(arr);
    if(filters.category)arr=arr.filter(p=>p.category===filters.category);
    if(filters.search)arr=arr.filter(p=>p.name.toLowerCase().includes(filters.search.toLowerCase()));
    if(filters.featured)arr=arr.filter(p=>p.featured);
    return arr;
  },
  getProduct(id){
    const arr=Object.values(this._store().products||{});
    return arr.find(p=>p.id==id);
  },
  async saveProduct(product){
    const store=this._store();
    const arr=Object.values(store.products||[]);
    if(!product.id)product.id=Date.now();
    const idx=arr.findIndex(p=>p.id==product.id);
    if(idx>=0)arr[idx]=product;else arr.push(product);
    store.products=arr;
    await this._save();
    return product;
  },
  async deleteProduct(id){
    const store=this._store();
    store.products=Object.values(store.products||[]).filter(p=>p.id!=id);
    await this._save();
  },

  // Categories
  getCategories(){return Object.values(this._store().categories||[]);},
  async saveCategory(cat){
    const store=this._store();
    const cats=Object.values(store.categories||[]);
    const idx=cats.findIndex(c=>c.id===cat.id);
    if(idx>=0)cats[idx]=cat;else cats.push(cat);
    store.categories=cats;await this._save();
  },
  async deleteCategory(id){
    const store=this._store();
    store.categories=Object.values(store.categories||[]).filter(c=>c.id!==id);
    await this._save();
  },

  // Cart - localStorage (per device)
  getCart(){return lsGet('ts_cart')||[];},
  addToCart(productId,qty=1,color=null,storage=null){
    let cart=this.getCart();
    const key=`${productId}-${color}-${storage}`;
    const ex=cart.find(i=>i.key===key);
    if(ex)ex.qty+=qty;else cart.push({key,productId,qty,color,storage});
    lsSet('ts_cart',cart);updateCartCount();
  },
  updateCartQty(key,qty){
    let cart=this.getCart();
    const item=cart.find(i=>i.key===key);
    if(item){if(qty<=0)cart=cart.filter(i=>i.key!==key);else item.qty=qty;}
    lsSet('ts_cart',cart);updateCartCount();
  },
  clearCart(){lsSet('ts_cart',[]);updateCartCount();},

  // Wishlist - localStorage
  getWishlist(){return lsGet('ts_wishlist')||[];},
  toggleWishlist(id){
    let w=this.getWishlist();
    const idx=w.indexOf(id);
    if(idx>=0)w.splice(idx,1);else w.push(id);
    lsSet('ts_wishlist',w);return idx<0;
  },
  isWishlisted(id){return this.getWishlist().includes(id);},

  // Users
  getUser(){return lsGet('ts_currentUser');},
  login(user){lsSet('ts_currentUser',user);},
  logout(){localStorage.removeItem('ts_currentUser');},
  async register(userData){
    const store=this._store();
    const users=Object.values(store.users||[]);
    if(users.find(u=>u.email===userData.email))return{error:'البريد الإلكتروني مستخدم بالفعل'};
    userData.id=Date.now();userData.joinDate=new Date().toISOString();userData.orders=[];
    users.push(userData);store.users=users;await this._save();
    this.login(userData);return{success:true,user:userData};
  },
  async loginUser(email,password){
    const users=Object.values(this._store().users||[]);
    const user=users.find(u=>u.email===email&&u.password===password);
    if(!user)return{error:'البريد الإلكتروني أو كلمة المرور خاطئة'};
    this.login(user);return{success:true,user};
  },
  async updateUser(u){
    const store=this._store();
    const users=Object.values(store.users||[]);
    const idx=users.findIndex(x=>x.id===u.id);
    if(idx>=0)users[idx]=u;store.users=users;
    await this._save();this.login(u);
  },

  // Orders
  async createOrder(orderData){
    const store=this._store();
    const orders=Object.values(store.orders||[]);
    const order={...orderData,id:Date.now(),status:'new',date:new Date().toISOString(),statusHistory:[{status:'new',date:new Date().toISOString()}]};
    orders.push(order);store.orders=orders;
    const cu=this.getUser();
    if(cu){const users=Object.values(store.users||[]);const u=users.find(x=>x.id===cu.id);if(u){u.orders=u.orders||[];u.orders.push(order.id);store.users=users;this.login(u);}}
    await this._save();return order;
  },
  getOrders(userId=null){
    const orders=Object.values(this._store().orders||[]);
    return userId?orders.filter(o=>o.userId===userId):orders;
  },
  async updateOrderStatus(orderId,status){
    const store=this._store();
    const orders=Object.values(store.orders||[]);
    const o=orders.find(x=>x.id==orderId);
    if(o){o.status=status;o.statusHistory=o.statusHistory||[];o.statusHistory.push({status,date:new Date().toISOString()});}
    store.orders=orders;await this._save();
  },

  // Coupons
  validateCoupon(code){
    return Object.values(this._store().coupons||[]).find(c=>c.code===code.toUpperCase()&&c.active);
  },
  async saveCoupons(coupons){const store=this._store();store.coupons=coupons;await this._save();},

  // Reviews
  getReviews(productId){return Object.values(this._store().reviews||[]).filter(r=>r.productId==productId);},
  async addReview(review){
    const store=this._store();
    const reviews=Object.values(store.reviews||[]);
    review.id=Date.now();review.date=new Date().toLocaleDateString('ar-EG');
    reviews.push(review);store.reviews=reviews;await this._save();
  },

  // Admin
  getAdminUser(){return lsGet('ts_adminUser');},
  adminLogin(username,password){
    let admins=this._store().admins||[];
    if(!Array.isArray(admins))admins=Object.values(admins);
    // fallback: if no admins in store, use default
    if(!admins.length)admins=[{username:'loay',password:'11211',name:'لؤي',role:'super'}];
    const admin=admins.find(a=>a.username===username&&a.password===password);
    if(!admin)return false;lsSet('ts_adminUser',admin);return admin;
  },
  adminLogout(){localStorage.removeItem('ts_adminUser');},
  getAdmins(){return Object.values(this._store().admins||[]);},
  async saveAdmin(admin){
    const store=this._store();
    const admins=Object.values(store.admins||[]);
    const idx=admins.findIndex(a=>a.username===admin.username);
    if(idx>=0)admins[idx]=admin;else admins.push(admin);
    store.admins=admins;await this._save();
  },
  async deleteAdmin(username){
    if(username==='loay')return false;
    const store=this._store();
    store.admins=Object.values(store.admins||[]).filter(a=>a.username!==username);
    await this._save();return true;
  },

  // Stats
  getStats(){
    const store=this._store();
    const products=Object.values(store.products||[]);
    const orders=Object.values(store.orders||[]);
    const users=Object.values(store.users||[]);
    const revenue=orders.filter(o=>o.status!=='cancelled').reduce((s,o)=>s+(o.total||0),0);
    return{products:products.length,orders:orders.length,users:users.length,revenue};
  },

  getSettings(){return this._store().settings||{freeShippingMin:500,shippingCost:60};},
  async saveSettings(settings){const store=this._store();store.settings=settings;await this._save();},

  // Compatibility
  get(key){
    const map={ts_products:()=>Object.values(this._store().products||[]),ts_categories:()=>Object.values(this._store().categories||[]),ts_coupons:()=>Object.values(this._store().coupons||[]),ts_orders:()=>Object.values(this._store().orders||[]),ts_users:()=>Object.values(this._store().users||[]),ts_admins:()=>Object.values(this._store().admins||[]),ts_reviews:()=>Object.values(this._store().reviews||[])};
    return map[key]?map[key]():lsGet(key);
  },
  set(key,val){
    const map={ts_products:'products',ts_categories:'categories',ts_coupons:'coupons',ts_orders:'orders',ts_users:'users',ts_admins:'admins',ts_reviews:'reviews'};
    if(map[key]){const store=this._store();store[map[key]]=val;fbSet('store',store);}
    else lsSet(key,val);
  }
};

// UI Helpers
function updateCartCount(){
  const total=DB.getCart().reduce((s,i)=>s+i.qty,0);
  document.querySelectorAll('.cart-count').forEach(el=>{el.textContent=total;el.style.display=total>0?'flex':'none';});
}
function showToast(msg,type='success'){
  const t=document.createElement('div');t.className=`ts-toast ts-toast-${type}`;
  t.innerHTML=`<span>${type==='success'?'✅':type==='error'?'❌':'ℹ️'}</span> ${msg}`;
  document.body.appendChild(t);setTimeout(()=>t.classList.add('show'),10);
  setTimeout(()=>{t.classList.remove('show');setTimeout(()=>t.remove(),300);},3000);
}
function formatPrice(p){return Number(p).toLocaleString('ar-EG')+' جنيه';}
function statusLabel(s){
  const m={new:['جديد','#3B82F6'],preparing:['جاري التجهيز','#F59E0B'],shipped:['في الطريق','#8B5CF6'],delivered:['تم التوصيل','#10B981'],cancelled:['ملغي','#EF4444']};
  return m[s]||['غير معروف','#6B7280'];
}
function renderStars(r){let s='';for(let i=1;i<=5;i++)s+=i<=Math.round(r)?'★':'☆';return s;}

function showDBLoader(){
  const el=document.createElement('div');el.id='dbLoader';
  el.style.cssText='position:fixed;inset:0;background:var(--bg);display:flex;align-items:center;justify-content:center;z-index:9999;flex-direction:column;gap:16px;';
  el.innerHTML=`<div style="width:56px;height:56px;background:linear-gradient(135deg,#1D4ED8,#3B82F6);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:28px;animation:pulse 1.5s infinite;">⚡</div><div style="font-size:15px;font-weight:700;color:var(--text2);">جاري تحميل البيانات...</div><style>@keyframes pulse{0%,100%{box-shadow:0 0 15px rgba(59,130,246,0.4)}50%{box-shadow:0 0 30px rgba(59,130,246,0.8)}}</style>`;
  document.body.appendChild(el);
}
function hideDBLoader(){const el=document.getElementById('dbLoader');if(el)el.remove();}
