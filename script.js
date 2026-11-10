const KEY='select_products_v4';
const CATS={care:'Доглядова косметика',decor:'Декоративна косметика',perfume:'Парфумерія'};
const DT={perfume:'perfume',care:'jar',decor:'lipstick'};
const KW={perfume:'perfume,bottle',lipstick:'lipstick',mascara:'mascara',palette:'eyeshadow,palette',jar:'face,cream,jar',serum:'serum,dropper',tube:'skincare,tube',foundation:'foundation,makeup',compact:'compact,powder'};
const SV={
perfume:'<rect x="140" y="150" width="120" height="170" rx="10"/><rect x="175" y="105" width="50" height="45"/><rect x="165" y="85" width="70" height="20"/>',
lipstick:'<rect x="165" y="210" width="70" height="130" rx="6"/><rect x="175" y="150" width="50" height="60"/><path d="M175 150L200 110L225 150Z"/>',
mascara:'<rect x="185" y="90" width="30" height="230" rx="8"/><rect x="175" y="320" width="50" height="40" rx="6"/>',
palette:'<rect x="90" y="150" width="220" height="150" rx="12"/><circle cx="140" cy="200" r="22"/><circle cx="200" cy="200" r="22"/><circle cx="260" cy="200" r="22"/><circle cx="140" cy="255" r="22"/><circle cx="200" cy="255" r="22"/><circle cx="260" cy="255" r="22"/>',
jar:'<rect x="110" y="200" width="180" height="120" rx="14"/><rect x="100" y="165" width="200" height="35" rx="8"/>',
serum:'<rect x="145" y="170" width="110" height="160" rx="12"/><rect x="185" y="120" width="30" height="50"/><path d="M200 120V90Q200 75 225 75"/>',
tube:'<path d="M150 120H250L240 330H160Z"/><rect x="170" y="90" width="60" height="30"/>',
foundation:'<rect x="150" y="190" width="100" height="150" rx="10"/><rect x="190" y="130" width="20" height="60"/><rect x="165" y="115" width="70" height="15"/>',
compact:'<circle cx="200" cy="230" r="95"/><circle cx="200" cy="230" r="65"/>'};
const ph=(t,n)=>'data:image/svg+xml;utf8,'+encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="400" height="460"><rect width="400" height="460" fill="#1c1c1c"/><g fill="none" stroke="#e8cf9a" stroke-width="3">${SV[t]||SV.perfume}</g><text x="200" y="410" fill="#8d877d" font-size="16" text-anchor="middle" font-family="sans-serif">${String(n).replace(/[&<>]/g,'').slice(0,28)}</text></svg>`);
const im=(t,n)=>`https://loremflickr.com/400/460/${KW[t]}?lock=${n}`;
const tp=i=>i.type||DT[i.cat];
const P=(cat,name,brand,purpose,volume,country,price,desc,type,n,tag)=>({cat,name,brand,purpose,volume,country,price,desc,type,img:im(type,n),tag});
const IMG={"Addict Lip Glow Oil": "images/decor/addict-lip-glow-oil.webp", "All Nighter Setting Spray": "images/decor/all-nighter-setting-spray.webp", "Better Than Sex Mascara": "images/decor/better-than-sex-mascar.webp", "Forever Cushion": "images/decor/forever-cushion.webp", "Ruby Woo": "images/decor/mac-ruby-woo.webp", "Lash Sensational": "images/decor/maybelline.webp", "Orgasm Blush": "images/decor/orgasm-blush.webp", "Pillow Talk": "images/decor/pillow-talk.webp", "Pro Filt'r Foundation": "images/decor/pro-filt-r-foundation.webp", "Soft Glam Palette": "images/decor/soft-glam-palette.webp", "Anthelios UVMune 400 SPF50+": "images/care/anthelios-uvmune.webp", "Cicaplast Baume B5": "images/care/cicaplast-baume-b5.webp", "Double Serum": "images/care/double-serum.webp", "Effaclar Duo+": "images/care/effaclar-duo.png", "Huile Prodigieuse": "images/care/huile-prodigieuse.webp", "Mineral 89": "images/care/mineral-89.jpg", "Moisturizing Cream": "images/care/moisturizing-cream.webp", "Hydro Boost Water Gel": "images/care/neutrogena.webp", "Niacinamide 10% + Zinc": "images/care/niacinamide-10-zinc.webp", "Retinol 0.5%": "images/care/retinol-0-5.webp", "Angels' Share": "images/perfume/angels-share.webp", "Aventus": "images/perfume/aventus.webp", "Baccarat Rouge 540": "images/perfume/baccarat-rouge-540.webp", "Bois Imperial": "images/perfume/bois-imperial.webp", "Devil's Intrigue": "images/perfume/devil-s-intrigue.webp", "Gaba": "images/perfume/gaba.webp", "Ganymede": "images/perfume/ganymede.webp", "Guidance": "images/perfume/guidance.webp", "Layton": "images/perfume/layton.webp", "Tobacco Vanille": "images/perfume/tobacco-vanille.webp"};
const DEFAULT=[
P('perfume','Bois Imperial','Essential Parfums','Унісекс','100 мл','Франція',2920,'Деревний фужерний аромат: ветивер, пачулі, ваніль, амброксан. Парфумована вода.','perfume',1,'Бестселер'),
P('perfume','Guidance','Amouage','Жіночий','100 мл','Оман',6340,'Східний квітково-пряний аромат із нотами ладану, жасмину та сандалу.','perfume',2,'Хіт'),
P('perfume','Devil\'s Intrigue','Haute Fragrance Company','Жіночий','75 мл','Велика Британія',7570,'Шлейфовий парфум з нотами персика, ванілі та мускусу.','perfume',3),
P('perfume','Aventus','Creed','Чоловічий','100 мл','Франція',12900,'Культовий фруктово-димний аромат: ананас, береза, мускус.','perfume',4,'Бестселер'),
P('perfume','Gaba','Hormone Paris','Унісекс','100 мл','Франція',3880,'Свіжий пудровий аромат на основі білих квітів та кедра.','perfume',5),
P('perfume','Ganymede','Marc-Antoine Barrois','Унісекс','100 мл','Франція',9800,'Мінеральний ванільно-замшевий аромат із нотами мімози.','perfume',6,'Бестселер'),
P('perfume','Baccarat Rouge 540','Maison Francis Kurkdjian','Унісекс','70 мл','Франція',14500,'Повітряний амбровий аромат із шафраном, жасмином та кедром.','perfume',7,'Хіт'),
P('perfume','Tobacco Vanille','Tom Ford','Унісекс','50 мл','США',9800,'Теплий тютюнно-ванільний аромат зі спеціями та сухофруктами.','perfume',8),
P('perfume','Layton','Parfums de Marly','Чоловічий','125 мл','Франція',8900,'Пряний ванільний аромат: яблуко, лаванда, кардамон, сандал.','perfume',9),
P('perfume','Angels\' Share','Kilian','Унісекс','50 мл','Франція',8400,'Гурманський аромат із нотами коньяку, кориці та тонки.','perfume',10),
P('care','Effaclar Duo+','La Roche-Posay','Для жирної шкіри','40 мл','Франція',640,'Крем-гель проти недосконалостей та постакне.','tube',11),
P('care','Moisturizing Cream','CeraVe','Для сухої шкіри','177 мл','США',520,'Зволожувальний крем із керамідами та гіалуроновою кислотою.','jar',12,'Хіт'),
P('care','Mineral 89','Vichy','Зволоження','50 мл','Франція',780,'Щоденна зволожувальна сироватка з вулканічною водою.','serum',13),
P('care','Huile Prodigieuse','Nuxe','Живлення','100 мл','Франція',950,'Мультифункціональна суха олія для обличчя, тіла та волосся.','serum',14),
P('care','Niacinamide 10% + Zinc','The Ordinary','Для проблемної шкіри','30 мл','Канада',350,'Сироватка для звуження пор і вирівнювання тону.','serum',15),
P('care','Retinol 0.5%','Paula\'s Choice','Антивікова','30 мл','США',1850,'Нічна сироватка проти зморшок та пігментації.','serum',16),
P('care','Cicaplast Baume B5','La Roche-Posay','Відновлення','40 мл','Франція',480,'Відновлювальний бальзам для подразненої та чутливої шкіри.','tube',17),
P('care','Hydro Boost Water Gel','Neutrogena','Зволоження','50 мл','США',430,'Легкий гель-крем з гіалуроновою кислотою для 48 год зволоження.','jar',18),
P('care','Double Serum','Clarins','Антивікова','50 мл','Франція',3200,'Двофазна сироватка з 21 рослинним екстрактом для пружності шкіри.','serum',19),
P('care','Anthelios UVMune 400 SPF50+','La Roche-Posay','Сонцезахист','50 мл','Франція',720,'Флюїд для щоденного захисту від UVA/UVB-променів.','tube',20),
P('decor','Ruby Woo','MAC','Для губ','3 г','США',890,'Матова червона помада з класичним ретро-відтінком.','lipstick',21,'Бестселер'),
P('decor','Lash Sensational','Maybelline','Для очей','9.5 мл','США',420,'Туш для об\'єму та розділення вій.','mascara',22),
P('decor','Pillow Talk','Charlotte Tilbury','Для губ','3.5 г','Велика Британія',1250,'Ніжно-рожева помада з сатиновим фінішем.','lipstick',23),
P('decor','Pro Filt\'r Foundation','Fenty Beauty','Для обличчя','32 мл','США',1380,'Тональна основа з матовим покриттям до 24 годин.','foundation',24,'Хіт'),
P('decor','Soft Glam Palette','Huda Beauty','Для очей','10 г','ОАЕ',1650,'Палетка тіней із матовими та мерехтливими відтінками.','palette',25),
P('decor','Orgasm Blush','NARS','Для обличчя','4.8 г','Франція',1190,'Персиково-рожеві рум\'яна з золотим шимером.','compact',26),
P('decor','Better Than Sex Mascara','Too Faced','Для очей','8 мл','США',1050,'Туш для драматичного об\'єму та довжини вій.','mascara',27),
P('decor','All Nighter Setting Spray','Urban Decay','Для обличчя','118 мл','США',1150,'Фіксуючий спрей для макіяжу, що тримається до 16 годин.','serum',28),
P('decor','Addict Lip Glow Oil','Dior','Для губ','6 мл','Франція',1400,'Живильна олія-блиск для губ із вишневим ароматом.','lipstick',29,'Хіт'),
P('decor','Forever Cushion','Dior','Для обличчя','14 г','Франція',2300,'Кушон із сяйливим покриттям та SPF 35.','compact',30)
].map((p,i)=>({id:i+1,...p,img:IMG[p.name]||p.img}));
let items=JSON.parse(localStorage.getItem(KEY)||'null')||DEFAULT;
const save=()=>localStorage.setItem(KEY,JSON.stringify(items));
const $=s=>document.querySelector(s);
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const money=n=>Number(n).toLocaleString('uk-UA')+' грн';
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
<div class="acts"><button class="buy" data-a="cart" data-id="${i.id}">У кошик</button><button data-a="edit" data-id="${i.id}">Редагувати</button><button data-a="del" data-id="${i.id}">Видалити</button></div></div>`;
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
function form(id){
  const i=items.find(x=>x.id==id)||{cat:'perfume',name:'',brand:'',purpose:'',volume:'',country:'',price:'',desc:'',img:''};
  const f=(k,l,t='text')=>`<label>${l}<input name="${k}" type="${t}" value="${esc(i[k])}" required ${t==='number'?'min="0"':''}></label>`;
  open(`<h3 style="font-family:'Cormorant Garamond',serif;font-size:28px;margin-bottom:16px">${id?'Редагувати':'Додати'} товар</h3>
  <form id="pf" data-id="${id||''}">${f('name','Назва')}${f('brand','Бренд')}
  <label>Категорія<select name="cat">${Object.entries(CATS).map(([k,v])=>`<option value="${k}" ${k===i.cat?'selected':''}>${v}</option>`).join('')}</select></label>
  ${f('purpose','Тип шкіри / призначення')}${f('volume','Об\'єм')}${f('country','Країна виробництва')}${f('price','Ціна, грн','number')}
  <label>Посилання на фото<input name="img" type="url" value="${esc(i.img&&i.img.startsWith('data:')?'':i.img)}" placeholder="https://…"></label>
  <label class="full">Або завантажте фото<input type="file" name="file" accept="image/*"></label>
  <label class="full">Опис<textarea name="desc" required>${esc(i.desc)}</textarea></label>
  <div class="full"><button class="btn" type="submit">Зберегти</button></div></form>`);
}
document.addEventListener('submit',e=>{
  if(e.target.id!=='pf')return;e.preventDefault();
  const fd=new FormData(e.target),id=e.target.dataset.id,file=fd.get('file');
  const done=img=>{
    const o={cat:fd.get('cat'),name:fd.get('name').trim(),brand:fd.get('brand').trim(),purpose:fd.get('purpose').trim(),
      volume:fd.get('volume').trim(),country:fd.get('country').trim(),price:+fd.get('price'),desc:fd.get('desc').trim()};
    if(id){const it=items.find(x=>x.id==id);Object.assign(it,o);if(img)it.img=img}
    else items.push({id:Date.now(),...o,img:img||ph(DT[o.cat],o.name)});
    try{save()}catch{alert('Недостатньо місця для збереження фото. Використайте посилання.')}
    closeM();render();
  };
  if(file&&file.size){const r=new FileReader();r.onload=()=>done(r.result);r.readAsDataURL(file)}
  else done(fd.get('img')||'');
});
document.addEventListener('click',e=>{
  const a=e.target.closest('[data-a]');
  if(a){e.stopPropagation();
    if(a.dataset.a==='cart')addToCart(a.dataset.id);else if(a.dataset.a==='edit')form(a.dataset.id);
    else if(confirm('Видалити цей товар?')){items=items.filter(x=>x.id!=a.dataset.id);save();cart=cart.filter(c=>c.id!=a.dataset.id);saveCart();render();cartUI()}
    return}
  const t=e.target.closest('.tab');if(t){cat=t.dataset.c;render();return}
  const c=e.target.closest('.card');if(c)details(c.dataset.id);
});
$('#add').onclick=()=>form();
$('#close').onclick=closeM;
$('#modal').onclick=e=>{if(e.target.id==='modal')closeM()};
['q','fBrand','fPurpose','pMin','pMax','sort'].forEach(id=>$('#'+id).addEventListener('input',render));
$('#reset').onclick=()=>{['q','pMin','pMax'].forEach(i=>$('#'+i).value='');['fBrand','fPurpose','sort'].forEach(i=>$('#'+i).value='');cat='all';render()};
render();

document.addEventListener('error',e=>{const t=e.target;if(t.tagName==='IMG'&&t.dataset.t&&!t.dataset.f){t.dataset.f=1;t.src=ph(t.dataset.t,t.dataset.l)}},true);

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
