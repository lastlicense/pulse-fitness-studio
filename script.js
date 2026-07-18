
const loader=document.querySelector('.loader');
const loaderPercent=document.querySelector('.loader-percent');
const loaderBar=document.querySelector('.loader-track span');
let loadValue=0;

document.documentElement.style.overflow='hidden';

const fakeLoad=setInterval(()=>{
  loadValue += Math.floor(Math.random()*9)+4;
  if(loadValue>=100){
    loadValue=100;
    clearInterval(fakeLoad);
    loaderPercent.textContent='100%';
    loaderBar.style.width='100%';

    setTimeout(()=>{
      loader.classList.add('done');
      document.body.classList.add('is-ready');
      document.documentElement.style.overflow='';
    },280);
  }else{
    loaderPercent.textContent=loadValue+'%';
    loaderBar.style.width=loadValue+'%';
  }
},55);

const progress=document.querySelector('.progress');
window.addEventListener('scroll',()=>{const m=document.documentElement.scrollHeight-innerHeight;progress.style.width=(scrollY/m*100)+'%'});
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('show');if(e.target.classList.contains('stat'))count(e.target);io.unobserve(e.target)}}),{threshold:.15});
document.querySelectorAll('.reveal,.stat').forEach(el=>io.observe(el));
function count(el){const n=el.querySelector('strong'),t=+n.dataset.count,s=performance.now();function f(now){const p=Math.min((now-s)/1200,1);n.textContent=Math.floor(t*(1-Math.pow(1-p,3))).toLocaleString('de-DE')+'+';if(p<1)requestAnimationFrame(f)}requestAnimationFrame(f)}
const menu=document.querySelector('.menu'),mobile=document.querySelector('.mobile-nav');
menu.onclick=()=>mobile.classList.toggle('open');document.querySelectorAll('.mobile-nav a').forEach(a=>a.onclick=()=>mobile.classList.remove('open'));
document.querySelectorAll('.tilt').forEach(card=>{card.addEventListener('pointermove',e=>{if(innerWidth<900)return;const r=card.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;card.style.transform=`perspective(900px) rotateX(${-y*6}deg) rotateY(${x*7}deg)`});card.addEventListener('pointerleave',()=>card.style.transform='')});
document.querySelectorAll('.toggle button').forEach(b=>b.onclick=()=>{document.querySelectorAll('.toggle button').forEach(x=>x.classList.remove('active'));b.classList.add('active');document.querySelectorAll('.price').forEach(p=>p.textContent=p.dataset[b.dataset.period])});
document.querySelector('form').addEventListener('submit',e=>{e.preventDefault();const f=e.currentTarget,m=f.querySelector('.msg');if(!f.checkValidity()){m.textContent='Bitte fülle alle Felder aus.';return}m.textContent='Danke! Deine Demo-Anfrage wurde gespeichert.';f.reset()});

const gymBg=document.querySelector('.floating-gym-bg');
window.addEventListener('pointermove',e=>{
  if(!gymBg || innerWidth<800) return;
  const x=(e.clientX/innerWidth-.5)*18;
  const y=(e.clientY/innerHeight-.5)*18;
  gymBg.style.transform=`translate(${x}px,${y}px)`;
},{passive:true});

const siteHeader=document.querySelector('.site-header');
window.addEventListener('scroll',()=>{
  siteHeader?.classList.toggle('scrolled',scrollY>40);
},{passive:true});


// Safety fallback for iOS Safari, Telegram and other in-app browsers.
document.addEventListener('DOMContentLoaded',()=>{
  window.setTimeout(()=>{
    document.body.classList.add('force-visible','is-ready');
    document.documentElement.style.overflow='';
  },1200);
});
window.addEventListener('pageshow',()=>{
  document.body.classList.add('force-visible','is-ready');
  document.documentElement.style.overflow='';
});
