/* Адмін-панель. Працює без сервера: зміни йдуть у чернетку (localStorage),
   а на сайт потрапляють після заміни products.js у репозиторії. */
const DRAFT='select_admin_draft_v1', AUTH='select_admin_auth_v1';
const published=window.PRODUCTS||[];
const cfg=window.ADMIN_CONFIG||{};
const clone=o=>JSON.parse(JSON.stringify(o));
const readDraft=()=>{try{const d=JSON.parse(localStorage.getItem(DRAFT)||'null');return Array.isArray(d)?d:null}catch{return null}};
let items=readDraft()||clone(published);

/* ---------- Пароль ---------- */
async function sha256(s){
  const b=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(s));
  return [...new Uint8Array(b)].map(x=>x.toString(16).padStart(2,'0')).join('');
}
let fails=0,lockUntil=0;
$('#loginForm').addEventListener('submit',async e=>{
  e.preventDefault();
  const err=$('#loginErr'),now=Date.now();
  if(now<lockUntil){err.textContent=`Забагато спроб. Зачекайте ${Math.ceil((lockUntil-now)/1000)} с.`;return}
  if(!window.crypto||!crypto.subtle){err.textContent='Браузер не підтримує перевірку пароля (потрібен https).';return}
  const h=await sha256((cfg.salt||'')+$('#pw').value);
  if(h===cfg.hash){fails=0;try{sessionStorage.setItem(AUTH,'1')}catch{}enter()}
  else{fails++;$('#pw').value='';err.textContent='Невірний пароль.';if(fails>=5){lockUntil=Date.now()+30000;fails=0}}
});
function enter(){$('#login').hidden=true;$('#app').hidden=false;render()}
$('#logout').onclick=()=>{try{sessionStorage.removeItem(AUTH)}catch{};location.reload()};

/* ---------- Список ---------- */
const same=()=>JSON.stringify(items)===JSON.stringify(published);
function persist(){
  try{same()?localStorage.removeItem(DRAFT):localStorage.setItem(DRAFT,JSON.stringify(items))}
  catch{alert('Не вдалося зберегти чернетку: недостатньо місця (можливо, надто велике фото). Використайте шлях до фото в папці images/.')}
  render();
}
function render(){
  const q=$('#aq').value.trim().toLowerCase(),c=$('#acat').value;
  if(!$('#acat').options.length)$('#acat').innerHTML='<option value="">Усі категорії</option>'+Object.entries(CATS).map(([k,v])=>`<option value="${k}">${v}</option>`).join('');
  const r=items.filter(i=>(!c||i.cat===c)&&(!q||[i.name,i.brand].some(x=>String(x).toLowerCase().includes(q))));
  $('#rows').innerHTML=r.map(i=>`<tr><td><img src="${esc(i.img)}" alt="" data-t="${tp(i)}" data-l="${esc(i.name)}"></td>
  <td class="nm"><b>${esc(i.name)}</b><small>${esc(i.brand)}</small></td><td>${CATS[i.cat]||''}</td><td class="pr">${money(i.price)}</td>
  <td>${esc(i.tag||'—')}</td><td class="ac"><button class="mini" data-a="edit" data-id="${i.id}">Редагувати</button><button class="mini del" data-a="del" data-id="${i.id}">Видалити</button></td></tr>`).join('')
    ||'<tr><td colspan="6" class="muted" style="padding:20px">Нічого не знайдено.</td></tr>';
  $('#acount').textContent=`Показано ${r.length} із ${items.length}`;
  const d=!same(),n=$('#notice');
  n.className='notice'+(d?' dirty':'');
  n.textContent=d?'Є неопубліковані зміни. Завантажте products.js і замініть його в репозиторії (див. «Публікація змін» нижче).':'Усе синхронізовано: список збігається з тим, що зараз на сайті.';
}
['aq','acat'].forEach(id=>$('#'+id).addEventListener('input',render));
$('#addBtn').onclick=()=>form();
$('#rows').addEventListener('click',e=>{
  const b=e.target.closest('[data-a]');if(!b)return;
  const id=+b.dataset.id,i=items.find(x=>x.id===id);if(!i)return;
  if(b.dataset.a==='edit')form(id);
  else if(confirm(`Видалити «${i.name}»?`)){items=items.filter(x=>x.id!==id);persist()}
});

/* ---------- Модальне вікно ---------- */
const open=h=>{$('#mbody').innerHTML=h;$('#modal').classList.add('on')};
const closeM=()=>$('#modal').classList.remove('on');
$('#close').onclick=closeM;
$('#modal').onclick=e=>{if(e.target.id==='modal')closeM()};
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeM()});

/* ---------- Форма товару ---------- */
function form(id){
  const i=items.find(x=>x.id===id)||{cat:'perfume',name:'',brand:'',purpose:'',volume:'',country:'',price:'',desc:'',img:'',tag:''};
  const f=(k,l,t='text',x='')=>`<label>${l}<input name="${k}" type="${t}" value="${esc(i[k])}" required ${t==='number'?'min="0" step="any"':''} ${x}></label>`;
  open(`<h3 class="mt">${id?'Редагувати':'Додати'} товар</h3>
  <form id="pf" data-id="${id||''}">${f('name','Назва')}${f('brand','Бренд')}
  <label>Категорія<select name="cat">${Object.entries(CATS).map(([k,v])=>`<option value="${k}" ${k===i.cat?'selected':''}>${v}</option>`).join('')}</select></label>
  ${f('purpose','Тип шкіри / призначення')}${f('volume',"Об'єм")}${f('country','Країна виробництва')}${f('price','Ціна, грн','number')}
  <label>Мітка (необов'язково)<input name="tag" list="tags" value="${esc(i.tag||'')}" placeholder="Хіт, Бестселер…"><datalist id="tags"><option value="Хіт"><option value="Бестселер"><option value="Новинка"></datalist></label>
  <label class="full">Фото: шлях або посилання<input name="img" value="${esc(i.img&&i.img.startsWith('data:')?'':i.img)}" placeholder="images/care/назва.webp  або  https://…">
    <span class="hint">Найкраще — покласти файл у папку images/ репозиторію й вказати шлях тут.</span></label>
  <label class="full">Або завантажте фото тут (воно стиснеться й вбудується в products.js)<input type="file" name="file" accept="image/*"></label>
  <div class="full imgrow"><img id="pvimg" alt="" src="${esc(i.img||ph(DT[i.cat],i.name||'Фото'))}" data-t="${DT[i.cat]}" data-l="${esc(i.name)}"><span class="hint">Попередній перегляд фото</span></div>
  <label class="full">Опис<textarea name="desc" required>${esc(i.desc)}</textarea></label>
  <div class="full"><button class="btn" type="submit">Зберегти</button></div></form>`);
  const pf=$('#pf'),pv=$('#pvimg');
  pf.img.addEventListener('input',()=>{pv.dataset.f='';pv.src=pf.img.value.trim()||ph(DT[pf.cat.value],pf.name.value||'Фото')});
  pf.file.addEventListener('change',async()=>{const f=pf.file.files[0];if(f){pv.src=await shrink(f)}});
}
/* Стискає завантажене фото до ~700px, щоб products.js не розростався */
function shrink(file){
  return new Promise((ok,no)=>{
    const r=new FileReader();
    r.onerror=no;
    r.onload=()=>{const im=new Image();im.onerror=no;im.onload=()=>{
      const k=Math.min(1,700/Math.max(im.width,im.height)),c=document.createElement('canvas');
      c.width=Math.round(im.width*k);c.height=Math.round(im.height*k);
      const x=c.getContext('2d');x.fillStyle='#fff';x.fillRect(0,0,c.width,c.height);x.drawImage(im,0,0,c.width,c.height);
      ok(c.toDataURL('image/jpeg',.82))};im.src=r.result};
    r.readAsDataURL(file);
  });
}
document.addEventListener('submit',async e=>{
  if(e.target.id!=='pf')return;e.preventDefault();
  const f=e.target,v=n=>f[n].value.trim(),id=+f.dataset.id||0;
  const price=parseFloat(f.price.value);
  if(!(price>=0)){alert('Вкажіть коректну ціну.');return}
  let img=v('img');
  const file=f.file.files[0];
  if(file){try{img=await shrink(file)}catch{alert('Не вдалося прочитати фото.');return}}
  const o={cat:f.cat.value,name:v('name'),brand:v('brand'),purpose:v('purpose'),volume:v('volume'),country:v('country'),price,desc:v('desc')};
  const tag=v('tag');
  if(id){
    const it=items.find(x=>x.id===id);Object.assign(it,o);
    if(tag)it.tag=tag;else delete it.tag;
    if(img)it.img=img;
    delete it.type; /* тип заглушки визначається з категорії */
  }else{
    const n={id:items.reduce((m,x)=>Math.max(m,x.id),0)+1,...o,img:img||ph(DT[o.cat],o.name)};
    if(tag)n.tag=tag;items.push(n);
  }
  closeM();persist();
});

/* ---------- Експорт / імпорт / скидання ---------- */
function download(name,text,type='text/javascript'){
  const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([text],{type:type+';charset=utf-8'}));
  a.download=name;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(a.href),1000);
}
$('#dl').onclick=()=>download('products.js',
`/* Дані товарів сайту. Цей файл генерується адмін-панеллю (admin.html → «Завантажити products.js»).
   Замініть його в репозиторії — і зміни з'являться на сайті. */
window.PRODUCTS = ${JSON.stringify(items,null,2)};
`);
$('#imp').addEventListener('change',async e=>{
  const f=e.target.files[0];e.target.value='';if(!f)return;
  try{
    const t=await f.text(),a=JSON.parse(t.slice(t.indexOf('['),t.lastIndexOf(']')+1));
    if(!Array.isArray(a)||a.some(x=>!x||typeof x!=='object'||!x.name||x.id==null||!CATS[x.cat]))throw 0;
    if(confirm(`Замінити поточний список (${items.length}) імпортованим (${a.length})?`)){items=a;persist()}
  }catch{alert('Файл не схожий на products.js, створений цією панеллю.')}
});
$('#discard').onclick=()=>{
  if(same()){alert('Немає неопублікованих змін.');return}
  if(confirm('Скасувати всі зміни й повернутись до списку, що зараз на сайті?')){items=clone(published);persist()}
};

/* ---------- Зміна пароля ---------- */
$('#chpw').onclick=()=>{
  open(`<h3 class="mt">Змінити пароль</h3>
  <p class="hint" style="margin-bottom:12px">Сайт статичний, тому пароль зберігається у файлі <code>config.js</code> (лише хеш). Введіть новий пароль — і замініть цей файл у репозиторії.</p>
  <form id="pwf" style="grid-template-columns:1fr"><label>Новий пароль (мінімум 8 символів)<input name="p" type="password" minlength="8" required autocomplete="new-password"></label>
  <div><button class="btn" type="submit">Створити config.js</button></div></form>`);
};
document.addEventListener('submit',async e=>{
  if(e.target.id!=='pwf')return;e.preventDefault();
  const p=e.target.p.value;
  const salt=[...crypto.getRandomValues(new Uint8Array(8))].map(x=>x.toString(16).padStart(2,'0')).join('');
  const hash=await sha256(salt+p);
  const txt=`/* Налаштування адмін-панелі. Тут зберігається лише хеш пароля. */\nwindow.ADMIN_CONFIG = { salt: "${salt}", hash: "${hash}" };\n`;
  download('config.js',txt);
  open(`<h3 class="mt">config.js завантажено</h3><p class="hint" style="margin-bottom:12px">Замініть ним <code>config.js</code> у репозиторії та зробіть commit. Новий пароль запрацює після оновлення сайту. Вміст файлу:</p><textarea class="pwout" readonly>${esc(txt)}</textarea>`);
});

/* ---------- Старт: якщо вже входили в цій вкладці ---------- */
let authed=false;try{authed=sessionStorage.getItem(AUTH)==='1'}catch{}
if(authed)enter();
