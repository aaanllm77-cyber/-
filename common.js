/* Спільний код для сайту (shop.js) та адмін-панелі (admin.js) */
const CATS={care:'Доглядова косметика',decor:'Декоративна косметика',perfume:'Парфумерія'};
const DT={perfume:'perfume',care:'jar',decor:'lipstick'};
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
/* Заглушка-картинка, якщо фото відсутнє або не завантажилось */
const ph=(t,n)=>'data:image/svg+xml;utf8,'+encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="400" height="460"><rect width="400" height="460" fill="#1c1c1c"/><g fill="none" stroke="#e8cf9a" stroke-width="3">${SV[t]||SV.perfume}</g><text x="200" y="410" fill="#8d877d" font-size="16" text-anchor="middle" font-family="sans-serif">${String(n).replace(/[&<>]/g,'').slice(0,28)}</text></svg>`);
const tp=i=>i.type||DT[i.cat];
const $=s=>document.querySelector(s);
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const money=n=>Number(n).toLocaleString('uk-UA')+' грн';
/* Якщо фото не завантажилось — показуємо заглушку */
document.addEventListener('error',e=>{const t=e.target;if(t.tagName==='IMG'&&t.dataset.t&&!t.dataset.f){t.dataset.f=1;t.src=ph(t.dataset.t,t.dataset.l)}},true);
