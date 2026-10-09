/* Shared nav + footer (+ the optional-image helper at the bottom). Use on any page:
   <site-header></site-header> ... <site-footer></site-footer> <script src="components.js"></script>
   For pages in a subfolder add base="../" to both tags. Active link is detected from the URL
   (override with active="services.html"). */
(function(){
const NAV=[['/', 'Home'], ['/services', 'Services'], ['/skills', 'Skills'], ['/about', 'About Us'], ['/projects', 'Projects'], ['/contact', 'Contact']];
const here=()=>location.pathname.replace(/\/$/,'')||'/';
class SiteHeader extends HTMLElement{connectedCallback(){
  const b=this.getAttribute('base')||'',act=this.getAttribute('active')||here();
  const links=NAV.map(([h,t])=>'<a href="'+h+'"'+(h===act?' class="on"':'')+'>'+t+'</a>').join('');
  this.innerHTML=`<header><div class="wrap"><a class="logo" href="/">Personnage</a>
<nav>${links}</nav>
<div class="hr"><span class="s" aria-label="Search">&#9906;</span><a class="btn" href="/contact">Let's talk</a></div></div></header>`;}}
class SiteFooter extends HTMLElement{connectedCallback(){
  const b=this.getAttribute('base')||'';
  this.innerHTML=`<footer><div class="wrap">
<div class="fg">
<div><a class="logo" href="/">Personnage</a><p class="ft-about">I’m an IT graduate who enjoys building websites, exploring modern UI design, and creating digital projects.</p><h4 class="ft-nl">Join our newsletter</h4>
<div class="nl"><input type="email" placeholder="Email address" aria-label="Email address"><button class="btn lg" type="button">Join</button></div></div>
<div><h4>Site Menu</h4><a href="/">Home</a><a href="/services">Services</a><a href="/skills">Skills</a><a href="/about">About Us</a><a href="/projects">Projects</a></div>
<div><h4>Information</h4><a href="#">FAQ</a><a href="#">Site Map</a><a href="#">Cookies Policy</a><a href="/contact">Contact Us</a></div>
<div><h4>Contact us</h4>Phone: (+63) 920-883-3382<br>Phone: (+63) 946-757-7265<br><br>Contact us at: itechdummvry@gmail.com<h4 class="ft-soc">Social Icons</h4>f &nbsp; X &nbsp; ig &nbsp; yt &nbsp; tt</div></div>
<div class="bot"><span>Copyright © 2026 – Personnage</span><span>Terms &amp; Conditions | Privacy Policy</span></div>
</div></footer>`;}}
customElements.define('site-header',SiteHeader);
customElements.define('site-footer',SiteFooter);
})();

/* Optional images: <img data-optional> is removed when its file is missing, so the card/box background shows through.
   (replaces the inline onerror="this.remove()" that used to be on every image). The sweep covers images that
   failed before this script ran, so there is no load-order race. */
(function(){
  document.addEventListener('error',e=>{const t=e.target;if(t instanceof HTMLImageElement&&t.hasAttribute('data-optional'))t.remove()},true);
  const sweep=()=>document.querySelectorAll('img[data-optional]').forEach(im=>{if(im.complete&&!im.naturalWidth)im.remove()});
  sweep();addEventListener('load',sweep);
})();
