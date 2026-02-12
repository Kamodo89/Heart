/* ============================================
   Valentine's Day — Otter & Ankylosaurus
   Interactive Floating Hearts & Sparkles
   ============================================ */

(function () {
  'use strict';

  const heartsContainer = document.getElementById('hearts-container');
  const sparklesContainer = document.getElementById('sparkles');

  // ---- Heart SVG templates ----
  const heartColors = [
    '#e74c6f', '#ff6b9d', '#c44569', '#ff8fbf',
    '#ff4d6d', '#d4a5ff', '#f08080', '#ff69b4'
  ];

  function createHeartSVG(color, size) {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('width', size);
    svg.setAttribute('height', size);
    svg.style.fill = color;

    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', 'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z');
    svg.appendChild(path);

    return svg;
  }

  // ---- Spawn continuous floating hearts ----
  function spawnFloatingHeart() {
    const heart = document.createElement('div');
    heart.classList.add('floating-heart');

    const size = Math.random() * 20 + 10;
    const color = heartColors[Math.floor(Math.random() * heartColors.length)];
    const svg = createHeartSVG(color, size);
    heart.appendChild(svg);

    const left = Math.random() * 100;
    const duration = Math.random() * 6 + 6;
    const delay = Math.random() * 2;
    const sway = (Math.random() - 0.5) * 120;
    const rotation = (Math.random() - 0.5) * 360;
    const maxOpacity = Math.random() * 0.5 + 0.3;
    const scale = Math.random() * 0.6 + 0.7;

    heart.style.left = left + '%';
    heart.style.setProperty('--duration', duration + 's');
    heart.style.setProperty('--delay', delay + 's');
    heart.style.setProperty('--sway', sway + 'px');
    heart.style.setProperty('--rotation', rotation + 'deg');
    heart.style.setProperty('--max-opacity', maxOpacity);
    heart.style.setProperty('--scale', scale);

    heartsContainer.appendChild(heart);

    // Clean up after animation
    setTimeout(function() {
      if (heart.parentNode) heart.parentNode.removeChild(heart);
    }, (duration + delay) * 1000 + 500);
  }

  // Spawn hearts at intervals
  function startHeartFlow() {
    // Initial burst
    for (var i = 0; i < 8; i++) {
      setTimeout(spawnFloatingHeart, i * 300);
    }
    // Continuous flow
    setInterval(spawnFloatingHeart, 1200);
  }

  // ---- Click Burst ----
  document.addEventListener('click', function (e) {
    var count = Math.floor(Math.random() * 6) + 8;
    for (var i = 0; i < count; i++) {
      createBurstHeart(e.clientX, e.clientY);
    }
  });

  function createBurstHeart(x, y) {
    var heart = document.createElement('div');
    heart.classList.add('burst-heart');

    var size = Math.random() * 18 + 8;
    var color = heartColors[Math.floor(Math.random() * heartColors.length)];
    var svg = createHeartSVG(color, size);
    heart.appendChild(svg);

    var angle = Math.random() * Math.PI * 2;
    var distance = Math.random() * 120 + 40;
    var burstX = Math.cos(angle) * distance;
    var burstY = Math.sin(angle) * distance - 30;
    var burstDuration = Math.random() * 0.6 + 0.5;
    var burstRot = (Math.random() - 0.5) * 360;

    heart.style.left = x + 'px';
    heart.style.top = y + 'px';
    heart.style.setProperty('--burst-x', burstX + 'px');
    heart.style.setProperty('--burst-y', burstY + 'px');
    heart.style.setProperty('--burst-duration', burstDuration + 's');
    heart.style.setProperty('--burst-rot', burstRot + 'deg');

    document.body.appendChild(heart);

    setTimeout(function() {
      if (heart.parentNode) heart.parentNode.removeChild(heart);
    }, burstDuration * 1000 + 100);
  }

  // ---- Sparkles ----
  function createSparkles() {
    var count = 40;
    for (var i = 0; i < count; i++) {
      var sparkle = document.createElement('div');
      sparkle.classList.add('sparkle');

      sparkle.style.left = Math.random() * 100 + '%';
      sparkle.style.top = Math.random() * 100 + '%';
      sparkle.style.setProperty('--sparkle-dur', (Math.random() * 3 + 2) + 's');
      sparkle.style.setProperty('--sparkle-delay', (Math.random() * 5) + 's');
      sparkle.style.width = (Math.random() * 3 + 2) + 'px';
      sparkle.style.height = sparkle.style.width;
      sparkle.style.background = Math.random() > 0.5 ? 'white' : '#ff8fbf';

      sparklesContainer.appendChild(sparkle);
    }
  }

  // ---- Parallax-like mouse movement ----
  document.addEventListener('mousemove', function (e) {
    var mx = (e.clientX / window.innerWidth - 0.5) * 2;
    var my = (e.clientY / window.innerHeight - 0.5) * 2;

    var otter = document.getElementById('otter-character');
    var anky = document.getElementById('ankylosaurus-character');
    var pulse = document.getElementById('love-pulse');

    if (otter) otter.style.transform = 'translateX(' + (mx * -6) + 'px) translateY(' + (my * -4) + 'px)';
    if (anky) anky.style.transform = 'translateX(' + (mx * 6) + 'px) translateY(' + (my * -4) + 'px)';
    if (pulse) pulse.style.transform = 'translateX(' + (mx * 3) + 'px) translateY(' + (my * 3) + 'px) scale(' + (1 + Math.abs(mx) * 0.05) + ')';
  });

  // ---- Initialize ----
  startHeartFlow();
  createSparkles();
})();
