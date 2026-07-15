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
    }());
