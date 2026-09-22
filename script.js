(function(){
  // ---------- CONFIG: intervalos de fotos e vídeos ----------
  var CAROUSEL_1_RANGE = [1, 14];
  var GRID_RANGE       = [15, 29];
  var CAROUSEL_2_RANGE = [30, 40];
  
  var PHOTO_PATH = 'fotos/foto';   // -> fotos/foto1.jpg, fotos/foto2.jpg ...

  function buildCarousel(container, start, end){
    var track = container.querySelector('.carousel-track');
    var dotsWrap = container.parentElement.querySelector('.carousel-dots');
    var slides = [];
    for(var i = start; i <= end; i++){
      var slide = document.createElement('div');
      slide.className = 'carousel-slide';
      var img = document.createElement('img');
      img.src = PHOTO_PATH + i + '.jpg';
      img.alt = 'Foto ' + i;
      img.loading = 'lazy';
      img.onerror = function(){
        var s = this.closest('.carousel-slide');
        s.classList.add('missing');
        s.innerHTML = '<span>📷 ' + this.getAttribute('data-name') + '</span>';
      };
      img.setAttribute('data-name', 'foto' + i + '.jpg');
      slide.appendChild(img);
      track.appendChild(slide);
      slides.push(slide);

      var dot = document.createElement('span');
      dotsWrap.appendChild(dot);
    }
    var dots = dotsWrap.querySelectorAll('span');
    var index = 0;
    function render(){
      track.style.transform = 'translateX(' + (-index * 100) + '%)';
      dots.forEach(function(d, i){ d.classList.toggle('active', i === index); });
    }
    container.querySelector('.prev').addEventListener('click', function(){
      index = (index - 1 + slides.length) % slides.length; render();
    });
    container.querySelector('.next').addEventListener('click', function(){
      index = (index + 1) % slides.length; render();
    });
    render();
  }

  var carousels = document.querySelectorAll('[data-carousel]');
  buildCarousel(carousels[0], CAROUSEL_1_RANGE[0], CAROUSEL_1_RANGE[1]);
  buildCarousel(carousels[1], GRID_RANGE[0], GRID_RANGE[1]);
  buildCarousel(carousels[2], CAROUSEL_2_RANGE[0], CAROUSEL_2_RANGE[1]);

  // ---------- ABRIR CARTA + TOCAR MÚSICA ----------
  var hero = document.getElementById('hero');
  var sealBtn = document.getElementById('sealBtn');
  var opened = false;

  // ---------- ABRIR CARTA + TOCAR MÚSICA ----------
var hero = document.getElementById('hero');
var sealBtn = document.getElementById('sealBtn');
var opened = false;
var bgMusic = document.getElementById('bgMusic');

var musicBtn = document.createElement('button');
musicBtn.id = 'musicToggle';
musicBtn.textContent = '🔊';
musicBtn.setAttribute('aria-label', 'Pausar ou tocar música');
musicBtn.style.cssText = 'position:fixed;bottom:18px;right:18px;width:42px;height:42px;border-radius:50%;border:1px solid var(--kraft-dark);background:rgba(250,243,230,0.92);font-size:1.1rem;cursor:pointer;z-index:50;box-shadow:0 6px 14px rgba(59,51,44,0.25);display:none;align-items:center;justify-content:center;';
document.body.appendChild(musicBtn);
var musicPlaying = true;
musicBtn.addEventListener('click', function(){
  if(musicPlaying){ bgMusic.pause(); musicBtn.textContent = '🔈'; }
  else { bgMusic.play(); musicBtn.textContent = '🔊'; }
  musicPlaying = !musicPlaying;
});

sealBtn.addEventListener('click', function(){
  if(opened) return;
  opened = true;
  hero.classList.add('opened');

  bgMusic.play().catch(function(){
    var warn = document.createElement('div');
    warn.textContent = 'Não consegui tocar a música automaticamente — clique no botão 🔊 no canto da tela.';
    warn.style.cssText = 'position:fixed;bottom:70px;right:18px;max-width:240px;background:#fff3f0;color:#7E2E29;border:1px solid #9A3B34;padding:10px 12px;border-radius:8px;font-family:Lora,serif;font-size:.85rem;z-index:60;box-shadow:0 6px 14px rgba(0,0,0,0.2);';
    document.body.appendChild(warn);
  });
  musicBtn.style.display = 'flex';

  setTimeout(function(){
    document.querySelector('main').scrollIntoView({behavior:'smooth'});
  }, 1500);
});
})();