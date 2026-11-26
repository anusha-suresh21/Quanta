(function(){
  // One-roof expanding panels
  var rx=[].slice.call(document.querySelectorAll('.roofx .rx'));
  rx.forEach(function(p){
    function on(){rx.forEach(function(o){o.classList.toggle('is-active',o===p);});}
    p.addEventListener('mouseenter',on);p.addEventListener('focusin',on);p.addEventListener('click',on);
  });
  // Hero picture slider
  var box=document.getElementById('hero-slides');
  if(box){
    var slides=[].slice.call(box.querySelectorAll('.slide')),dots=[].slice.call(document.querySelectorAll('.s-dot')),cur=0,timer=null;
    var reduce=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    function show(n){cur=(n+slides.length)%slides.length;slides.forEach(function(s,i){s.classList.toggle('is-active',i===cur);});dots.forEach(function(d,i){d.classList.toggle('is-active',i===cur);});}
    function play(){if(reduce||slides.length<2)return;stop();timer=setInterval(function(){show(cur+1);},5500);}
    function stop(){if(timer){clearInterval(timer);timer=null;}}
    var hero=box.parentNode;
    var prev=hero.querySelector('.s-prev'),next=hero.querySelector('.s-next');
    if(prev)prev.addEventListener('click',function(){show(cur-1);play();});
    if(next)next.addEventListener('click',function(){show(cur+1);play();});
    dots.forEach(function(d,i){d.addEventListener('click',function(){show(i);play();});});
    hero.addEventListener('mouseenter',stop);hero.addEventListener('mouseleave',play);
    hero.addEventListener('focusin',stop);hero.addEventListener('focusout',play);
    play();
  }
  var btn=document.querySelector('.menu-btn'),links=document.querySelector('.nav-links');
  if(btn&&links){btn.addEventListener('click',function(){
    var o=links.classList.toggle('open');btn.setAttribute('aria-expanded',o?'true':'false');
  });}
  var form=document.getElementById('contact-form');
  if(form){
    var to=form.getAttribute('data-to');
    // Pre-select service from ?service= query
    var q=new URLSearchParams(location.search).get('service');
    if(q){var s=form.elements['service'];if(s){for(var i=0;i<s.options.length;i++){if(s.options[i].value===q){s.selectedIndex=i;}}}}
    form.addEventListener('submit',function(e){
      e.preventDefault();
      var d=new FormData(form);
      var body=['Name: '+d.get('name'),'Business email: '+d.get('email'),'Phone: '+(d.get('phone')||'-'),
        'Company: '+(d.get('company')||'-'),'Service of interest: '+d.get('service'),'','Requirement:',d.get('message')].join('\n');
      var subject='Website enquiry: '+d.get('service');
      location.href='mailto:'+to+'?subject='+encodeURIComponent(subject)+'&body='+encodeURIComponent(body);
      var m=document.getElementById('form-msg');
      if(m){m.textContent='Your email app should open with the enquiry ready to send. If it does not, email us directly at '+to+'.';}
    });
  }
})();
