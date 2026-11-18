/* Дані: опублікований products.js. Режим ?preview — чернетка з адмін-панелі (лише для перегляду). */
const PREVIEW=new URLSearchParams(location.search).has('preview');
let items=window.PRODUCTS||[];
if(PREVIEW){try{const d=JSON.parse(localStorage.getItem('select_admin_draft_v1')||'null');if(Array.isArray(d)){items=d;
  const b=document.createElement('div');b.className='pvbar';b.innerHTML='Попередній перегляд чернетки з адмін-панелі — це бачите лише ви. <a href="admin.html">Повернутись до адмінки</a>';document.body.prepend(b)}}catch{}}
let cat='all';

function fillSelects(){
  const b=$('#fBrand'),p=$('#fPurpose'),vb=b.value,vp=p.value;
  const uniq=k=>[...new Set(items.map(i=>i[k]))].sort();
  b.innerHTML='<option value="">Усі бренди</option>'+uniq('brand').map(x=>`<option>${esc(x)}</option>`).join('');
  p.innerHTML='<option value="">Усі призначення</option>'+uniq('purpose').map(x=>`<option>${esc(x)}</option>`).join('');
  b.value=vb;p.value=vp;
}
function tabs(){
  $('#tabs').innerHTML=[['all','Усі товари'],...Object.entries(CATS)].map(([k,v])=>`<button class="tab ${k===cat?'on':''}" data-c="${k}">${v}</button>`).join('');
}
function filtered(){
  const q=$('#q').value.trim().toLowerCase(),b=$('#fBrand').value,pu=$('#fPurpose').value;
  const mn=parseFloat($('#pMin').value),mx=parseFloat($('#pMax').value),s=$('#sort').value;
  let r=items.filter(i=>(cat==='all'||i.cat===cat)&&(!b||i.brand===b)&&(!pu||i.purpose===pu)
    &&(isNaN(mn)||i.price>=mn)&&(isNaN(mx)||i.price<=mx)
    &&(!q||[i.name,i.brand,CATS[i.cat]].some(x=>x.toLowerCase().includes(q))));
  if(s==='asc')r.sort((a,b)=>a.price-b.price);
  if(s==='desc')r.sort((a,b)=>b.price-a.price);
  if(s==='name')r.sort((a,b)=>a.name.localeCompare(b.name,'uk'));
  return r;
}
const card=i=>`<div class="card" data-id="${i.id}">${i.tag?`<span class="tag">${esc(i.tag)}</span>`:''}
<img src="${esc(i.img)}" alt="${esc(i.name)}" loading="lazy" data-t="${tp(i)}" data-l="${esc(i.name)}">
<div class="brand">${esc(i.brand)}</div><h3>${esc(i.name)}</h3><div class="price">${money(i.price)}</div>
<div class="acts"><button class="buy" data-a="cart" data-id="${i.id}">У кошик</button></div></div>`;
function render(){
  tabs();fillSelects();
  const r=filtered();
  $('#grid').innerHTML=r.map(card).join('')||'<p class="muted">Нічого не знайдено.</p>';
  $('#count').textContent=`Знайдено товарів: ${r.length}`;
  $('#hits').innerHTML=items.filter(i=>i.tag).slice(0,4).map(card).join('');
}
function open(html){$('#mbody').innerHTML=html;$('#modal').classList.add('on')}
const closeM=()=>$('#modal').classList.remove('on');
function details(id){
  const i=items.find(x=>x.id==id);if(!i)return;
  open(`<div class="detail"><img src="${esc(i.img)}" data-t="${tp(i)}" data-l="${esc(i.name)}"><div>
  <div class="brand">${esc(i.brand)}</div><h3>${esc(i.name)}</h3><p>${esc(i.desc)}</p>
  <table><tr><td>Категорія</td><td>${CATS[i.cat]}</td></tr><tr><td>Бренд</td><td>${esc(i.brand)}</td></tr>
  <tr><td>Тип шкіри / призначення</td><td>${esc(i.purpose)}</td></tr><tr><td>Об'єм</td><td>${esc(i.volume)}</td></tr>
  <tr><td>Країна виробництва</td><td>${esc(i.country)}</td></tr></table>
  <div class="big">${money(i.price)}</div><button class="btn" onclick="addToCart(${i.id});closeM()">До кошика</button></div></div>`);
}
document.addEventListener('click',e=>{
  const a=e.target.closest('[data-a]');
  if(a){e.stopPropagation();addToCart(a.dataset.id);return}
  const t=e.target.closest('.tab');if(t){cat=t.dataset.c;render();return}
  const c=e.target.closest('.card');if(c)details(c.dataset.id);
});
$('#close').onclick=closeM;
$('#modal').onclick=e=>{if(e.target.id==='modal')closeM()};
['q','fBrand','fPurpose','pMin','pMax','sort'].forEach(id=>$('#'+id).addEventListener('input',render));
$('#reset').onclick=()=>{['q','pMin','pMax'].forEach(i=>$('#'+i).value='');['fBrand','fPurpose','sort'].forEach(i=>$('#'+i).value='');cat='all';render()};
render();


/* ===== КОШИК ===== */
let cart=JSON.parse(localStorage.getItem('select_cart_v1')||'[]');
const saveCart=()=>localStorage.setItem('select_cart_v1',JSON.stringify(cart));
const lines=()=>cart.map(c=>({p:items.find(x=>x.id==c.id),q:c.qty})).filter(l=>l.p);
const sum=()=>lines().reduce((s,l)=>s+l.p.price*l.q,0);
function toast(t){let e=document.createElement('div');e.className='toast';e.textContent=t;document.body.appendChild(e);setTimeout(()=>e.remove(),1800)}
function addToCart(id,q=1){id=+id;const c=cart.find(x=>x.id==id);c?c.qty+=q:cart.push({id,qty:q});saveCart();cartUI();toast('Товар додано до кошика')}
function cartUI(){
  const L=lines();
  $('#cartCount').textContent=L.reduce((s,l)=>s+l.q,0);
  $('#cartItems').innerHTML=L.length?L.map(({p,q})=>`<div class="crow"><img src="${esc(p.img)}" alt="" data-t="${tp(p)}" data-l="${esc(p.name)}">
  <div class="cinfo"><div class="brand">${esc(p.brand)}</div><b>${esc(p.name)}</b><div class="muted">${esc(p.volume)} · ${money(p.price)}</div>
  <div class="qty"><button data-ci="dec" data-id="${p.id}">−</button><span>${q}</span><button data-ci="inc" data-id="${p.id}">+</button><button class="rm" data-ci="rm" data-id="${p.id}">Видалити</button></div></div>
  <div class="cl">${money(p.price*q)}</div></div>`).join(''):'<p class="muted" style="padding:20px">Кошик порожній.</p>';
  $('#cartTotal').textContent=money(sum());
  $('#checkoutBtn').disabled=!L.length;
}
const drawer=on=>$('#drawer').classList.toggle('on',on);
$('#cartBtn').onclick=()=>drawer(true);
$('#drawerClose').onclick=$('#overlay').onclick=()=>drawer(false);
$('#clearCart').onclick=()=>{if(cart.length&&confirm('Очистити кошик?')){cart=[];saveCart();cartUI()}};
$('#cartItems').addEventListener('click',e=>{
  const b=e.target.closest('[data-ci]');if(!b)return;
  const c=cart.find(x=>x.id==b.dataset.id);if(!c)return;
  if(b.dataset.ci==='inc')c.qty++;
  if(b.dataset.ci==='dec')c.qty=Math.max(1,c.qty-1);
  if(b.dataset.ci==='rm')cart=cart.filter(x=>x!==c);
  saveCart();cartUI();
});
/* ===== ОФОРМЛЕННЯ ЗАМОВЛЕННЯ ===== */
const DELIV={np:['Нова пошта (відділення)',0],cour:['Кур\'єр по Києву',120],pick:['Самовивіз із шоуруму (Київ)',0]};
const shipCost=d=>d==='cour'&&sum()<3000?120:0;
$('#checkoutBtn').onclick=()=>{drawer(false);checkout()};
function checkout(){
  const L=lines();if(!L.length)return;
  open(`<h3 class="mt">Оформлення замовлення</h3><div class="ck">
  <form id="ck" novalidate>
    <label>Прізвище та ім'я*<input name="name" required></label>
    <label>Телефон*<input name="phone" placeholder="+38 (0__) ___-__-__" required></label>
    <label>Email<input name="email" type="email"></label>
    <label>Місто*<input name="city" required></label>
    <label>Доставка<select name="deliv">${Object.entries(DELIV).map(([k,v])=>`<option value="${k}">${v[0]}</option>`).join('')}</select></label>
    <label id="addrL">Відділення Нової пошти*<input name="addr"></label>
    <label>Оплата<select name="pay"><option value="cod">При отриманні</option><option value="card">Карткою онлайн</option></select></label>
    <label>Коментар<textarea name="note"></textarea></label>
    <p id="err" class="err"></p><button class="btn" type="submit">Підтвердити замовлення</button></form>
  <div class="sumbox"><h4>Ваше замовлення</h4>${L.map(({p,q})=>`<div class="srow"><span>${esc(p.name)} × ${q}</span><span>${money(p.price*q)}</span></div>`).join('')}
  <div class="srow"><span>Товари</span><span>${money(sum())}</span></div><div class="srow"><span>Доставка</span><span id="sh">за тарифами перевізника</span></div>
  <div class="srow tot"><span>Разом</span><span id="tt">${money(sum())}</span></div></div></div>`);
  const f=$('#ck'),upd=()=>{
    const d=f.deliv.value,c=shipCost(d);
    $('#addrL').firstChild.textContent=d==='np'?'Відділення Нової пошти*':d==='cour'?'Адреса кур\'єра*':'Адреса (не потрібна)';
    f.addr.disabled=d==='pick';
    $('#sh').textContent=d==='np'?'за тарифами перевізника':c?money(c):'безкоштовно';
    $('#tt').textContent=money(sum()+c);
  };
  f.deliv.onchange=upd;upd();
}
document.addEventListener('submit',e=>{
  if(e.target.id!=='ck')return;e.preventDefault();
  const f=e.target,v=n=>f[n].value.trim(),err=m=>{$('#err').textContent=m;return false};
  const digits=v('phone').replace(/\D/g,'');
  if(!v('name'))return err('Вкажіть прізвище та ім\'я.');
  if(digits.length<10||digits.length>12)return err('Введіть коректний номер телефону.');
  if(v('email')&&!/^\S+@\S+\.\S+$/.test(v('email')))return err('Некоректний email.');
  if(!v('city'))return err('Вкажіть місто.');
  if(f.deliv.value!=='pick'&&!v('addr'))return err('Вкажіть відділення або адресу доставки.');
  const L=lines(),ship=shipCost(f.deliv.value);
  const o={id:'SL-'+Date.now().toString().slice(-6),date:new Date().toLocaleString('uk-UA'),
    customer:{name:v('name'),phone:v('phone'),email:v('email'),city:v('city'),addr:v('addr')},
    delivery:DELIV[f.deliv.value][0],pay:f.pay.value==='cod'?'При отриманні':'Карткою онлайн',note:v('note'),
    items:L.map(l=>({name:l.p.name,brand:l.p.brand,qty:l.q,price:l.p.price})),total:sum()+ship};
  const orders=JSON.parse(localStorage.getItem('select_orders_v1')||'[]');orders.push(o);
  localStorage.setItem('select_orders_v1',JSON.stringify(orders));
  cart=[];saveCart();cartUI();
  open(`<div class="ok"><div class="check">✓</div><h3 class="mt">Дякуємо за замовлення!</h3>
  <p>Номер замовлення: <b>${o.id}</b></p><p class="muted">Менеджер зв'яжеться з вами за номером ${esc(o.customer.phone)}.</p>
  <p>${o.delivery} · ${o.pay}</p><div class="big">${money(o.total)}</div><button class="btn" onclick="closeM()">Продовжити покупки</button></div>`);
});
cartUI();
