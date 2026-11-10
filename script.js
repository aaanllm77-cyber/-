const KEY='select_products_v2';
const CATS={care:'Доглядова косметика',decor:'Декоративна косметика',perfume:'Парфумерія'};
const ph=n=>'data:image/svg+xml;utf8,'+encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="400" height="460"><rect width="400" height="460" fill="#222"/><rect x="150" y="130" width="100" height="200" rx="10" fill="none" stroke="#e8cf9a" stroke-width="3"/><rect x="175" y="95" width="50" height="35" fill="#e8cf9a"/><text x="200" y="400" fill="#8d877d" font-size="18" text-anchor="middle" font-family="sans-serif">${n}</text></svg>`);
const im=(kw,n)=>`https://loremflickr.com/400/460/${kw}?lock=${n}`;
const P=(cat,name,brand,purpose,volume,country,price,desc,kw,n,tag)=>({cat,name,brand,purpose,volume,country,price,desc,img:im(kw,n),tag});
const DEFAULT=[
P('perfume','Bois Imperial','Essential Parfums','Унісекс','100 мл','Франція',2920,'Деревний фужерний аромат: ветивер, пачулі, ваніль, амброксан. Парфумована вода.','perfume,bottle',1,'Бестселер'),
P('perfume','Guidance','Amouage','Жіночий','100 мл','Оман',6340,'Східний квітково-пряний аромат із нотами ладану, жасмину та сандалу.','perfume,pink',2,'Хіт'),
P('perfume','Devil\'s Intrigue','Haute Fragrance Company','Жіночий','75 мл','Велика Британія',7570,'Шлейфовий парфум з нотами персика, ванілі та мускусу.','perfume,black',3),
P('perfume','Aventus','Creed','Чоловічий','100 мл','Франція',12900,'Культовий фруктово-димний аромат: ананас, береза, мускус.','cologne,men',4,'Бестселер'),
P('perfume','Gaba','Hormone Paris','Унісекс','100 мл','Франція',3880,'Свіжий пудровий аромат на основі білих квітів та кедра.','perfume,white',5),
P('perfume','Ganymede','Marc-Antoine Barrois','Унісекс','100 мл','Франція',9800,'Мінеральний ванільно-замшевий аромат із нотами мімози.','perfume,gold',6,'Бестселер'),
P('care','Effaclar Duo+','La Roche-Posay','Для жирної шкіри','40 мл','Франція',640,'Крем-гель проти недосконалостей та постакне.','skincare,cream',11),
P('care','Moisturizing Cream','CeraVe','Для сухої шкіри','177 мл','США',520,'Зволожувальний крем із керамідами та гіалуроновою кислотою.','face,cream',12,'Хіт'),
P('care','Mineral 89','Vichy','Зволоження','50 мл','Франція',780,'Щоденна зволожувальна сироватка з вулканічною водою.','serum,skincare',13),
P('care','Huile Prodigieuse','Nuxe','Живлення','100 мл','Франція',950,'Мультифункціональна суха олія для обличчя, тіла та волосся.','oil,beauty',14),
P('care','Niacinamide 10% + Zinc','The Ordinary','Для проблемної шкіри','30 мл','Канада',350,'Сироватка для звуження пор і вирівнювання тону.','serum,bottle',15),
P('care','Retinol 0.5%','Paula\'s Choice','Антивікова','30 мл','США',1850,'Нічна сироватка проти зморшок та пігментації.','skincare,serum',16),
P('decor','Ruby Woo','MAC','Для губ','3 г','США',890,'Матова червона помада з класичним ретро-відтінком.','lipstick,red',21,'Бестселер'),
P('decor','Lash Sensational','Maybelline','Для очей','9.5 мл','США',420,'Туш для об\'єму та розділення вій.','mascara,eyes',22),
P('decor','Pillow Talk','Charlotte Tilbury','Для губ','3.5 г','Велика Британія',1250,'Ніжно-рожева помада з сатиновим фінішем.','lipstick,pink',23),
P('decor','Pro Filt\'r Foundation','Fenty Beauty','Для обличчя','32 мл','США',1380,'Тональна основа з матовим покриттям до 24 годин.','foundation,makeup',24,'Хіт'),
P('decor','Soft Glam Palette','Huda Beauty','Для очей','10 г','ОАЕ',1650,'Палетка тіней із матовими та мерехтливими відтінками.','eyeshadow,palette',25),
P('decor','Orgasm Blush','NARS','Для обличчя','4.8 г','Франція',1190,'Персиково-рожеві рум\'яна з золотим шимером.','blush,makeup',26)
].map((p,i)=>({id:i+1,...p}));
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
<img src="${esc(i.img)}" alt="${esc(i.name)}" loading="lazy" onerror="this.onerror=null;this.src=ph('${esc(i.brand)}')">
<div class="brand">${esc(i.brand)}</div><h3>${esc(i.name)}</h3><div class="price">${money(i.price)}</div>
<div class="acts"><button data-a="edit" data-id="${i.id}">Редагувати</button><button data-a="del" data-id="${i.id}">Видалити</button></div></div>`;
function render(){
  tabs();fillSelects();
  const r=filtered();
  $('#grid').innerHTML=r.map(card).join('')||'<p class="muted">Нічого не знайдено.</p>';
  $('#count').textContent=`Знайдено товарів: ${r.length}`;
  ext();
}
function ext(){
  if(!items.length){$('#ext').innerHTML='<p class="muted">Немає товарів.</p>';return}
  const hi=items.reduce((a,b)=>b.price>a.price?b:a),lo=items.reduce((a,b)=>b.price<a.price?b:a);
  const e=(t,i)=>`<div class="card" data-id="${i.id}"><img src="${esc(i.img)}" onerror="this.onerror=null;this.src=ph('${esc(i.brand)}')"><div><small>${t}</small><h3>${esc(i.name)}</h3><div class="brand">${esc(i.brand)} · ${CATS[i.cat]}</div><div class="price">${money(i.price)}</div></div></div>`;
  $('#ext').innerHTML=e('НАЙДОРОЖЧИЙ ТОВАР',hi)+e('НАЙДЕШЕВШИЙ ТОВАР',lo);
}
function open(html){$('#mbody').innerHTML=html;$('#modal').classList.add('on')}
const closeM=()=>$('#modal').classList.remove('on');
function details(id){
  const i=items.find(x=>x.id==id);if(!i)return;
  open(`<div class="detail"><img src="${esc(i.img)}" onerror="this.onerror=null;this.src=ph('${esc(i.brand)}')"><div>
  <div class="brand">${esc(i.brand)}</div><h3>${esc(i.name)}</h3><p>${esc(i.desc)}</p>
  <table><tr><td>Категорія</td><td>${CATS[i.cat]}</td></tr><tr><td>Бренд</td><td>${esc(i.brand)}</td></tr>
  <tr><td>Тип шкіри / призначення</td><td>${esc(i.purpose)}</td></tr><tr><td>Об'єм</td><td>${esc(i.volume)}</td></tr>
  <tr><td>Країна виробництва</td><td>${esc(i.country)}</td></tr></table>
  <div class="big">${money(i.price)}</div><button class="btn" onclick="alert('Товар додано до кошика')">До кошика</button></div></div>`);
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
    else items.push({id:Date.now(),...o,img:img||ph(o.brand)});
    try{save()}catch{alert('Недостатньо місця для збереження фото. Використайте посилання.')}
    closeM();render();
  };
  if(file&&file.size){const r=new FileReader();r.onload=()=>done(r.result);r.readAsDataURL(file)}
  else done(fd.get('img')||'');
});
document.addEventListener('click',e=>{
  const a=e.target.closest('[data-a]');
  if(a){e.stopPropagation();
    if(a.dataset.a==='edit')form(a.dataset.id);
    else if(confirm('Видалити цей товар?')){items=items.filter(x=>x.id!=a.dataset.id);save();render()}
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
