(function(){
      var body=document.body;
      var nav=document.querySelector('[data-nav]');
      var menuButton=document.querySelector('[data-menu-open]');
      var application=document.querySelector('[data-application]');
      var form=document.querySelector('.application-panel form');
      var formView=document.querySelector('.application-form');
      var success=document.querySelector('.application-success');
      function openNav(){nav.classList.add('is-open');nav.setAttribute('aria-hidden','false');menuButton.setAttribute('aria-expanded','true');body.classList.add('locked')}
      function closeNav(){nav.classList.remove('is-open');nav.setAttribute('aria-hidden','true');menuButton.setAttribute('aria-expanded','false');if(!application.classList.contains('is-open'))body.classList.remove('locked')}
      function openApplication(){closeNav();formView.style.display='block';success.classList.remove('is-visible');application.classList.add('is-open');application.setAttribute('aria-hidden','false');body.classList.add('locked');setTimeout(function(){document.querySelector('.application-close').focus()},230)}
      function closeApplication(){application.classList.remove('is-open');application.setAttribute('aria-hidden','true');body.classList.remove('locked')}
      menuButton.addEventListener('click',openNav);
      document.querySelector('[data-menu-close]').addEventListener('click',closeNav);
      document.querySelectorAll('.nav-links a').forEach(function(link){link.addEventListener('click',closeNav)});
      document.querySelectorAll('[data-apply]').forEach(function(button){button.addEventListener('click',openApplication)});
      document.querySelectorAll('[data-close]').forEach(function(button){button.addEventListener('click',closeApplication)});
      form.addEventListener('submit',function(event){event.preventDefault();formView.style.display='none';success.classList.add('is-visible')});
      document.addEventListener('keydown',function(event){if(event.key==='Escape'){closeNav();closeApplication()}});
    }());
