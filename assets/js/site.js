(function(){
  var body=document.body;
  var application=document.querySelector('[data-application]');
  var form=document.querySelector('.application-panel form');
  var formView=document.querySelector('.application-form');
  var success=document.querySelector('.application-success');

  function openApplication(){formView.style.display='block';success.classList.remove('is-visible');application.classList.add('is-open');application.setAttribute('aria-hidden','false');body.classList.add('locked');setTimeout(function(){document.querySelector('.application-close').focus()},230)}
  function closeApplication(){application.classList.remove('is-open');application.setAttribute('aria-hidden','true');body.classList.remove('locked')}

  document.querySelectorAll('[data-apply]').forEach(function(button){button.addEventListener('click',openApplication)});
  document.querySelectorAll('[data-close]').forEach(function(button){button.addEventListener('click',closeApplication)});
  form.addEventListener('submit',function(event){event.preventDefault();formView.style.display='none';success.classList.add('is-visible')});
  document.addEventListener('keydown',function(event){if(event.key==='Escape')closeApplication()});

  var reduceMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Parallax on hero and office images */
  var parallaxEls=document.querySelectorAll('.hero-image,.office-image');
  if(parallaxEls.length&&!reduceMotion){
    var ticking=false;
    function updateParallax(){
      var scrollY=window.scrollY;
      parallaxEls.forEach(function(el){
        var rect=el.getBoundingClientRect();
        var speed=0.18;
        var within=rect.top<window.innerHeight&&rect.bottom>0;
        if(within){el.style.transform='translate3d(0,'+(scrollY*speed*0.3)+'px,0)'}
      });
      ticking=false;
    }
    window.addEventListener('scroll',function(){
      if(!ticking){window.requestAnimationFrame(updateParallax);ticking=true}
    },{passive:true});
    updateParallax();
  }

  /* Scroll-triggered section reveals */
  var revealEls=document.querySelectorAll('[data-reveal]');
  if(revealEls.length&&'IntersectionObserver' in window){
    var observer=new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },{threshold:0.15,rootMargin:'0px 0px -60px 0px'});
    revealEls.forEach(function(el){observer.observe(el)});
  }else{
    revealEls.forEach(function(el){el.classList.add('is-visible')});
  }

  /* Staggered delay for season cards */
  document.querySelectorAll('.season-card').forEach(function(card,i){
    card.style.transitionDelay=(i*90)+'ms';
  });

  /* Cursor-aware tilt on season cards */
  var tiltCards=document.querySelectorAll('.season-card');
  var supportsHover=window.matchMedia('(hover: hover)').matches;
  if(tiltCards.length&&supportsHover&&!reduceMotion){
    tiltCards.forEach(function(card){
      var image=card.querySelector('.season-image');
      card.addEventListener('mousemove',function(event){
        var rect=card.getBoundingClientRect();
        var x=(event.clientX-rect.left)/rect.width-0.5;
        var y=(event.clientY-rect.top)/rect.height-0.5;
        var tiltX=(y*-6).toFixed(2);
        var tiltY=(x*8).toFixed(2);
        image.style.transform='rotateX('+tiltX+'deg) rotateY('+tiltY+'deg) scale(1.03)';
      });
      card.addEventListener('mouseleave',function(){
        image.style.transform='rotateX(0deg) rotateY(0deg) scale(1)';
      });
    });
  }
}());
