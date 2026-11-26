(function(){
  // Image slots: show a photo only when its file exists in assets/images/
  document.querySelectorAll('[data-img]').forEach(function(el){
    var src=el.getAttribute('data-img'),i=new Image();
    i.onload=function(){el.style.backgroundImage='url("'+src+'")';el.classList.add('has-img');};
    i.src=src;
  });
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
