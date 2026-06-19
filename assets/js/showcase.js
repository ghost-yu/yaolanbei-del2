// Particle Background
(function() {
  var canvas = document.getElementById('heroParticles');
  if (!canvas) return;
  var ctx = canvas.getContext('2d');
  var particles = [];
  var mouseX = 0, mouseY = 0;
  function resize() {
    canvas.width = canvas.parentElement.offsetWidth;
    canvas.height = canvas.parentElement.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize);
  canvas.addEventListener('mousemove', function(e) {
    var rect = canvas.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
  });
  function Particle(x,y) {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2 + 0.5;
    this.speedX = (Math.random() - 0.5) * 0.5;
    this.speedY = (Math.random() - 0.5) * 0.5;
    this.opacity = Math.random() * 0.5 + 0.2;
  }
  Particle.prototype.update = function() {
    this.x += this.speedX; this.y += this.speedY;
    if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
    if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    var dx = mouseX - this.x, dy = mouseY - this.y;
    var dist = Math.sqrt(dx*dx + dy*dy);
    if (dist < 200) { this.x += dx * 0.002; this.y += dy * 0.002; }
  };
  Particle.prototype.draw = function() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(14,252,255,' + this.opacity + ')';
    ctx.fill();
  };
  var count = Math.min(80, Math.floor(canvas.width * canvas.height / 12000));
  for (var i = 0; i < count; i++) particles.push(new Particle());
  function drawConnections() {
    for (var i = 0; i < particles.length; i++) {
      for (var j = i+1; j < particles.length; j++) {
        var dx = particles[i].x - particles[j].x;
        var dy = particles[i].y - particles[j].y;
        var dist = Math.sqrt(dx*dx + dy*dy);
        if (dist < 150) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = 'rgba(14,252,255,' + (0.08 * (1 - dist/150)) + ')';
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
  }
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (var i = 0; i < particles.length; i++) { particles[i].update(); particles[i].draw(); }
    drawConnections();
    requestAnimationFrame(animate);
  }
  animate();
})();

// Scroll Animation
(function() {
  var els = document.querySelectorAll('.animate-on-scroll');
  if (!els.length) return;
  var obs = new IntersectionObserver(function(entries) {
    entries.forEach(function(e) { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
  }, {threshold:0.1});
  for (var i=0; i<els.length; i++) obs.observe(els[i]);
})();

// Navbar
(function() {
  var nav = document.querySelector('.nav-premium');
  if (!nav) return;
  window.addEventListener('scroll', function() { nav.classList.toggle('scrolled', window.scrollY > 50); });
})();

// Mobile nav
(function() {
  var tg = document.querySelector('.nav-toggle');
  var lk = document.querySelector('.nav-links');
  if (!tg || !lk) return;
  tg.addEventListener('click', function() { lk.classList.toggle('open'); });
  var a = lk.querySelectorAll('a');
  for (var i=0; i<a.length; i++) a[i].addEventListener('click', function() { lk.classList.remove('open'); });
})();

// Video
(function() {
  var frames = document.querySelectorAll('.video-frame');
  for (var f=0; f<frames.length; f++) {
    (function(frame) {
      var ov = frame.querySelector('.play-overlay');
      var img = frame.querySelector('img');
      if (!ov || !img) return;
      ov.addEventListener('click', function(e) {
        e.preventDefault();
        if (!this.classList.contains('playing')) {
          this.classList.add('playing');
          var cap = frame.querySelector('.video-caption p');
          if (cap) cap.textContent = '▶ 播放中...';
          var btn = this.querySelector('.play-btn');
          if (btn) { btn.innerHTML = '▌▌'; btn.style.animation = 'pulse-glow 1.5s ease-in-out infinite'; }
          var images = ['assets/img/yuguang/image45.png','assets/img/yuguang/image46.png','assets/img/yuguang/image47.png','assets/img/yuguang/image32.png','assets/img/yuguang/image42.png'];
          var idx = 0;
          var interval = setInterval(function() {
            idx = (idx+1)%images.length;
            img.style.opacity = '0';
            img.style.transition = 'opacity 0.4s';
            setTimeout(function() { img.src = images[idx]; img.style.opacity = '1'; }, 200);
          }, 2200);
          this.dataset.interval = interval;
        } else {
          this.classList.remove('playing');
          var btn = this.querySelector('.play-btn');
          if (btn) { btn.innerHTML = '▶'; btn.style.animation = ''; }
          var cap = frame.querySelector('.video-caption p');
          if (cap) cap.textContent = '点击播放';
          if (this.dataset.interval) { clearInterval(parseInt(this.dataset.interval)); delete this.dataset.interval; }
        }
      });
    })(frames[f]);
  }
})();

// Counter
(function() {
  var c = document.querySelectorAll('.count-up');
  if (!c.length) return;
  var obs = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        var el = entry.target;
        var target = parseFloat(el.getAttribute('data-target') || 0);
        var suffix = el.getAttribute('data-suffix') || '';
        var duration = 2000;
        var start = performance.now();
        function update(ct) {
          var elapsed = ct - start;
          var progress = Math.min(elapsed/duration, 1);
          var eased = 1 - Math.pow(1-progress, 3);
          var current = target * eased;
          el.textContent = (target<100 ? current.toFixed(1) : Math.round(current)) + suffix;
          if (progress<1) requestAnimationFrame(update);
        }
        requestAnimationFrame(update);
        obs.unobserve(el);
      }
    });
  }, {threshold:0.5});
  for (var i=0; i<c.length; i++) obs.observe(c[i]);
})();

// Simulator
(function() {
  function g(id) { var e=document.getElementById(id); return e?e.value:null; }
  function s(id, html) { var e=document.getElementById(id); if(e) e.innerHTML=html; }

  function classify(w) { if(w<380) return 'UV'; if(w<=780) return 'VIS'; return 'NIR'; }
  function tier(w,l,sc) { if(sc==='research') return 'R&D Service L4'; if(w>1500||l>=12) return 'Exclusive L3'; if(sc==='pv'||sc==='agri'||l>=6) return 'Scenario Custom L2'; return 'Basic Standard L1'; }
  function estimate(w,l,sc) { if(sc==='research') return null; if(w>1500||l>=12) return 13.8; if(sc==='pv'||sc==='agri'||l>=6) return 7.8; return 5.0; }

  function run() {
    var w=Number(g('sim-wave')||850), l=Number(g('sim-life')||8), p=Number(g('sim-price')||620), sc=g('sim-scene')||'pv', est=estimate(w,l,sc);
    s('sim-out-band', classify(w));
    s('sim-out-tier', tier(w,l,sc));
    s('sim-out-quote', est===null ? '<span style=font-family:Orbitron,sans-serif;color:#0efcff;font-size:18px;>\u56fa\u5b9a\u7814\u53d1\u8d39 + \u91cf\u4ea7\u4ef7</span>' : '<span style=font-family:Orbitron,sans-serif;color:#0efcff;font-size:20px;>\u00a5'+est.toFixed(1)+'</span><span style=color:#9ec0d9;font-size:12px;> /m\u00b2</span>');
    var r=est===null ? 1 : p/est;
    var st='Sufficient', cls='ok';
    if(r<0.75){st='Insufficient';cls='bad';}else if(r<0.92){st='Tight';cls='warn';}
    s('sim-out-match', '<span class=chip '+cls+'>'+st+'</span>');
    var plans={pv:'Run encapsulation test before scale-up.',agri:'Test per crop cycle.',research:'Accelerated aging validation first.',industry:'Pilot batch then expand.'};
    s('sim-out-plan', r<0.75?'Phased implementation recommended.':(plans[sc]||plans.pv));
    var vals={pv:'Improve spectral matching efficiency, reduce R&D cost by 65%+.',agri:'Enhance crop spectral precision and rotation efficiency.',research:'Shorten experiment iteration cycles significantly.',industry:'Balance durability and maintenance cost.'};
    s('sim-out-value', vals[sc]||vals.pv);
  }

  ['sim-wave','sim-life','sim-price','sim-scene'].forEach(function(id) {
    var el=document.getElementById(id);
    if(el){el.addEventListener('input',run);el.addEventListener('change',run);}
  });
  var btn=document.getElementById('sim-submit');
  if(btn){btn.addEventListener('click',function(e){e.preventDefault();run();this.textContent='\u2713 Generated';var me=this;setTimeout(function(){me.textContent='Generate Solution';},2000);});}
  run();
})();

// Floating tech chars
(function() {
  var c=document.querySelector('.hero-particles');
  if(!c)return;
  var chars=['AI','ML','PINN','ROI','E=hv','\u03bb','\u03b7','%'];
  for(var i=0;i<12;i++) {
    var sp=document.createElement('span');
    sp.textContent=chars[Math.floor(Math.random()*chars.length)];
    sp.style.cssText='position:absolute;font-family:Orbitron,monospace;font-size:'+(Math.random()*10+7)+'px;color:rgba(14,252,255,'+(Math.random()*0.06+0.02)+');left:'+(Math.random()*100)+'%;top:'+(Math.random()*100)+'%;animation:particle-float '+(Math.random()*8+6)+'s ease-in-out infinite;animation-delay:'+(Math.random()*5)+'s;pointer-events:none;';
    c.appendChild(sp);
  }
})();

console.log('YGSF Showcase initialized');
