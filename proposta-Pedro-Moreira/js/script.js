document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.getElementById('navToggle');
  var nav = document.getElementById('main-nav');

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var isOpen = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  var bookingForm = document.getElementById('bookingForm');
  if (bookingForm) {
    var bookingError = document.getElementById('bookingError');

    bookingForm.addEventListener('submit', function (event) {
      event.preventDefault();

      var nome = document.getElementById('bkNome').value.trim();
      var servico = document.getElementById('bkServico').value;
      var formato = document.getElementById('bkFormato').value;
      var periodo = document.getElementById('bkPeriodo').value;
      var data = document.getElementById('bkData').value;
      var telefone = document.getElementById('bkTelefone').value.trim();

      if (!nome || !servico) {
        bookingError.hidden = false;
        if (!nome) {
          document.getElementById('bkNome').focus();
        } else {
          document.getElementById('bkServico').focus();
        }
        return;
      }
      bookingError.hidden = true;

      var linhas = [
        'Olá, Pedro! Quero agendar uma consulta pelo site.',
        'Nome: ' + nome,
        'Serviço: ' + servico,
        'Formato: ' + formato
      ];
      if (data) {
        var partes = data.split('-');
        linhas.push('Data preferida: ' + partes[2] + '/' + partes[1] + '/' + partes[0]);
      }
      if (periodo) {
        linhas.push('Período preferido: ' + periodo);
      }
      if (telefone) {
        linhas.push('Meu WhatsApp: ' + telefone);
      }

      var texto = encodeURIComponent(linhas.join('\n'));
      window.open('https://wa.me/message/NDPGJF53XRGQE1?text=' + texto, '_blank', 'noopener');
    });
  }

  var reveals = document.querySelectorAll('.reveal');
  if (window.location.hash) {
    var target = document.querySelector(window.location.hash);
    if (target) {
      target.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('is-visible'); });
      if (target.classList.contains('reveal')) { target.classList.add('is-visible'); }
    }
  }
  if ('IntersectionObserver' in window && reveals.length) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    reveals.forEach(function (el) { observer.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('is-visible'); });
  }
});
