let lenisInstance = null;

document.addEventListener('DOMContentLoaded', () => {
  // Lenis Smooth Scroll Engine
  initLenisScroll();

  // Theme Management
  initTheme();

  // Mobile Navigation Menu
  initMobileMenu();

  // Scroll Spy & Scroll Reveal Animations
  initScrollAnimations();

  // WebGL Shader Background
  initWebGLShader();

  // HTML5 Canvas Interactive Particles
  initCanvasParticles();

  // Contact Form AJAX Handler
  initContactForm();
});

/* =========================================================================
   0. Lenis Smooth Scroll Setup
   ========================================================================= */
function initLenisScroll() {
  if (typeof Lenis === 'undefined') {
    console.warn('Lenis library not loaded.');
    return;
  }

  // Telha & Clarke style signature heavy floaty inertia physics
  lenisInstance = new Lenis({
    duration: 1.5,
    easing: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)), // Exponential luxury dampening curve
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 0.9,
    touchMultiplier: 1.6,
    infinite: false,
  });

  function raf(time) {
    lenisInstance.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);

  // Initialize Telha & Clarke style image & card parallax engine
  initParallaxEngine();

  // Smooth scroll to anchor links using Lenis
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId && targetId !== '#') {
        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          e.preventDefault();
          lenisInstance.scrollTo(targetEl, {
            offset: -70, // Height of fixed header
            duration: 1.5
          });
        }
      }
    });
  });
}

/* =========================================================================
   Parallax Motion Engine (Telha & Clarke Inspired)
   ========================================================================= */
function initParallaxEngine() {
  const parallaxElements = document.querySelectorAll('[data-parallax]');
  if (!parallaxElements.length || !lenisInstance) return;

  function updateParallax() {
    const windowHeight = window.innerHeight;

    parallaxElements.forEach(el => {
      const speed = parseFloat(el.getAttribute('data-parallax')) || 0.15;
      const rect = el.getBoundingClientRect();

      // Only calculate if element is anywhere near the viewport
      if (rect.bottom >= -100 && rect.top <= windowHeight + 100) {
        const centerY = rect.top + rect.height / 2 - windowHeight / 2;
        const translateY = centerY * speed * -1;
        
        // Handle images inside overflow container vs standalone cards
        if (el.dataset.parallaxType === 'image') {
          el.style.transform = `scale(1.18) translateY(${translateY}px)`;
        } else {
          el.style.transform = `translateY(${translateY}px)`;
        }
      }
    });
  }

  // Hook into Lenis smooth scroll ticker
  lenisInstance.on('scroll', updateParallax);
  updateParallax(); // Initial positioning
}

/* =========================================================================
   1. Theme Management (Dark / Light Mode)
   ========================================================================= */
function initTheme() {
  const themeToggleBtn = document.getElementById('theme-toggle');
  if (!themeToggleBtn) return;

  const currentTheme = localStorage.getItem('theme') || 'dark';
  document.documentElement.className = currentTheme;
  updateThemeIcon(currentTheme);

  themeToggleBtn.addEventListener('click', () => {
    const isDark = document.documentElement.classList.contains('dark');
    const newTheme = isDark ? 'light' : 'dark';
    document.documentElement.className = newTheme;
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
  });
}

function updateThemeIcon(theme) {
  const themeIcon = document.querySelector('#theme-toggle span');
  if (!themeIcon) return;
  
  if (theme === 'light') {
    themeIcon.textContent = 'dark_mode';
    themeIcon.setAttribute('title', 'Switch to Dark Mode');
  } else {
    themeIcon.textContent = 'light_mode';
    themeIcon.setAttribute('title', 'Switch to Light Mode');
  }
}

/* =========================================================================
   2. Mobile Navigation Menu
   ========================================================================= */
function initMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobile-nav');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  if (!hamburger || !mobileNav) return;

  function toggleMenu() {
    mobileNav.classList.toggle('open');
    hamburger.classList.toggle('active');
    
    // Animate hamburger to an X
    const spans = hamburger.querySelectorAll('span');
    if (hamburger.classList.contains('active')) {
      spans[0].style.transform = 'translateY(8px) rotate(45deg)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'translateY(-8px) rotate(-45deg)';
    } else {
      spans[0].style.transform = 'none';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'none';
    }
  }

  hamburger.addEventListener('click', toggleMenu);

  // Close menu when a link is clicked
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (mobileNav.classList.contains('open')) {
        toggleMenu();
      }
    });
  });

  // Close menu when clicking outside of it
  document.addEventListener('click', (e) => {
    if (mobileNav.classList.contains('open') && 
        !mobileNav.contains(e.target) && 
        !hamburger.contains(e.target)) {
      toggleMenu();
    }
  });
}

/* =========================================================================
   3. Scroll Spy and Scroll Reveal Animations
   ========================================================================= */
function initScrollAnimations() {
  // Reveal animations
  const revealElements = document.querySelectorAll('.reveal');
  
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target); // Animates only once
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // Scroll Spy (highlight active menu link)
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  function updateActiveLink() {
    let currentSectionId = '';
    const scrollPos = window.scrollY || window.pageYOffset;

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    if (currentSectionId) {
      updateActiveClasses(navLinks, currentSectionId);
      updateActiveClasses(mobileLinks, currentSectionId);
    }
  }

  function updateActiveClasses(linksList, activeId) {
    linksList.forEach(link => {
      const href = link.getAttribute('href');
      if (href && href.includes(activeId)) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  window.addEventListener('scroll', updateActiveLink);
  if (lenisInstance) {
    lenisInstance.on('scroll', updateActiveLink);
  }
  updateActiveLink(); // Trigger initially
}

/* =========================================================================
   4. WebGL Shader Background (Smooth fluid ripples)
   ========================================================================= */
function initWebGLShader() {
  const canvas = document.getElementById('shader-canvas-ANIMATION_3');
  if (!canvas) return;

  function syncSize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const parent = canvas.parentElement || document.body;
    const w = parent.clientWidth || window.innerWidth;
    const h = parent.clientHeight || window.innerHeight;
    if (canvas.width !== Math.floor(w * dpr) || canvas.height !== Math.floor(h * dpr)) {
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
    }
  }

  if (typeof ResizeObserver !== 'undefined') {
    new ResizeObserver(syncSize).observe(canvas);
  } else {
    window.addEventListener('resize', syncSize);
  }
  syncSize();

  const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
  if (!gl) {
    console.warn('WebGL is not supported in this browser.');
    return;
  }

  const vsSource = `
    attribute vec2 a_position;
    varying vec2 v_texCoord;
    void main() {
      v_texCoord = a_position * 0.5 + 0.5;
      gl_Position = vec4(a_position, 0.0, 1.0);
    }
  `;

  // Fragment shader creates slow-moving energy waves that adapt to the dark theme colors.
  const fsSource = `
    precision highp float;
    uniform float u_time;
    uniform vec2 u_resolution;
    uniform vec2 u_mouse;
    varying vec2 v_texCoord;

    void main() {
      vec2 uv = gl_FragCoord.xy / u_resolution.xy;
      vec2 p = (gl_FragCoord.xy * 2.0 - u_resolution.xy) / min(u_resolution.x, u_resolution.y);
      
      // Calculate mouse influence
      vec2 m = (u_mouse.xy * 2.0 - u_resolution.xy) / min(u_resolution.x, u_resolution.y);
      float mDist = length(p - m);
      
      float wave = 0.0;
      for(float i = 1.0; i < 4.0; i++) {
        p.x += 0.15 / i * sin(i * 2.5 * p.y + u_time * 0.4 + i * 0.5) + 0.2;
        p.y += 0.15 / i * sin(i * 2.5 * p.x + u_time * 0.3 + i * 0.2) + 0.2;
        wave += 0.005 / abs(sin(u_time * 0.05 + p.y + p.x));
      }
      
      // Add subtle mouse glow reaction
      float glow = 0.04 / (mDist + 0.15);
      
      // Fluid blending colors
      vec3 spaceDark = vec3(0.020, 0.078, 0.141); // Deep Slate Blue
      vec3 primaryGlow = vec3(0.678, 0.776, 1.000); // #adc6ff
      vec3 secondaryGlow = vec3(0.290, 0.882, 0.463); // #4ae176

      vec3 waveColor = mix(spaceDark, primaryGlow, wave);
      vec3 finalColor = mix(waveColor, secondaryGlow, glow * 0.3);
      
      gl_FragColor = vec4(finalColor, 1.0);
    }
  `;

  function createShader(gl, type, source) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error('Shader compile error:', gl.getShaderInfoLog(shader));
      gl.deleteShader(shader);
      return null;
    }
    return shader;
  }

  const vs = createShader(gl, gl.VERTEX_SHADER, vsSource);
  const fs = createShader(gl, gl.FRAGMENT_SHADER, fsSource);
  if (!vs || !fs) return;

  const program = gl.createProgram();
  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error('Program link error:', gl.getProgramInfoLog(program));
    return;
  }

  gl.useProgram(program);

  // Set up geometry (fullscreen quad)
  const positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
    -1, -1,
     1, -1,
    -1,  1,
    -1,  1,
     1, -1,
     1,  1
  ]), gl.STATIC_DRAW);

  const positionLocation = gl.getAttribLocation(program, 'a_position');
  gl.enableVertexAttribArray(positionLocation);
  gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

  // Get uniform locations
  const uTimeLoc = gl.getUniformLocation(program, 'u_time');
  const uResLoc = gl.getUniformLocation(program, 'u_resolution');
  const uMouseLoc = gl.getUniformLocation(program, 'u_mouse');

  // Mouse tracking
  let mouse = { x: canvas.width / 2, y: canvas.height / 2, targetX: canvas.width / 2, targetY: canvas.height / 2 };
  
  window.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    if (rect.width && rect.height) {
      // Scale coordinates to fit high DPI resolutions
      const dpr = window.devicePixelRatio || 1;
      mouse.targetX = (e.clientX - rect.left) * dpr;
      mouse.targetY = (rect.height - (e.clientY - rect.top)) * dpr; // WebGL Y is inverted
    }
  });

  // Render loop
  function render(now) {
    // Smooth mouse coordinates interpolation
    mouse.x += (mouse.targetX - mouse.x) * 0.1;
    mouse.y += (mouse.targetY - mouse.y) * 0.1;

    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.useProgram(program);
    
    if (uTimeLoc) gl.uniform1f(uTimeLoc, now * 0.001);
    if (uResLoc) gl.uniform2f(uResLoc, canvas.width, canvas.height);
    if (uMouseLoc) gl.uniform2f(uMouseLoc, mouse.x, mouse.y);

    gl.drawArrays(gl.TRIANGLES, 0, 6);
    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);
}

/* =========================================================================
   5. HTML5 Canvas Interactive Particles Background
   ========================================================================= */
function initCanvasParticles() {
  const container = document.getElementById('particle-container');
  if (!container) return;

  // Create canvas element
  const canvas = document.createElement('canvas');
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.display = 'block';
  container.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  let width = canvas.width = container.clientWidth;
  let height = canvas.height = container.clientHeight;

  const particles = [];
  const particleCount = Math.min(45, Math.floor((width * height) / 25000));
  let mouse = { x: null, y: null, radius: 120 };

  // Set particle color based on current theme
  function getParticleColor() {
    const isDark = document.documentElement.classList.contains('dark');
    return isDark ? 'rgba(173, 198, 255, 0.25)' : 'rgba(0, 90, 194, 0.15)';
  }

  function getLineColor(opacity) {
    const isDark = document.documentElement.classList.contains('dark');
    return isDark ? `rgba(173, 198, 255, ${opacity * 0.15})` : `rgba(0, 90, 194, ${opacity * 0.1})`;
  }

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.size = Math.random() * 2 + 1.5;
      this.baseX = this.x;
      this.baseY = this.y;
      this.density = (Math.random() * 15) + 10;
      this.vx = (Math.random() - 0.5) * 0.5;
      this.vy = (Math.random() - 0.5) * 0.5;
    }

    update() {
      // General ambient movement
      this.x += this.vx;
      this.y += this.vy;

      // Wrap around bounds
      if (this.x < 0) this.x = width;
      if (this.x > width) this.x = 0;
      if (this.y < 0) this.y = height;
      if (this.y > height) this.y = 0;

      // Mouse interactive push/pull
      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          const forceDirX = dx / dist;
          const forceDirY = dy / dist;
          
          // Repel from mouse cursor
          this.x -= forceDirX * force * 1.5;
          this.y -= forceDirY * force * 1.5;
        }
      }
    }

    draw() {
      ctx.fillStyle = getParticleColor();
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // Populate particles array
  function populate() {
    particles.length = 0;
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
  }
  populate();

  // Draw connections between nearby particles
  function connect() {
    for (let a = 0; a < particles.length; a++) {
      for (let b = a + 1; b < particles.length; b++) {
        const dx = particles[a].x - particles[b].x;
        const dy = particles[a].y - particles[b].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        const maxDist = 120;
        if (dist < maxDist) {
          const opacity = 1 - (dist / maxDist);
          ctx.strokeStyle = getLineColor(opacity);
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(particles[a].x, particles[a].y);
          ctx.lineTo(particles[b].x, particles[b].y);
          ctx.stroke();
        }
      }
    }
  }

  // Handle Resize
  window.addEventListener('resize', () => {
    width = canvas.width = container.clientWidth;
    height = canvas.height = container.clientHeight;
    populate();
  });

  // Track mouse in container
  window.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });

  window.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });

  // Animation Loop
  function animate() {
    ctx.clearRect(0, 0, width, height);
    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();
    }
    connect();
    requestAnimationFrame(animate);
  }
  animate();
}

/* =========================================================================
   6. Contact Form AJAX Handler & Validation
   ========================================================================= */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const feedback = document.getElementById('form-feedback');

  if (!form || !feedback) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Reset feedback
    feedback.className = 'form-feedback';
    feedback.style.display = 'none';

    // Retrieve input values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();
    const submitBtn = form.querySelector('button[type="submit"]');

    // Validation checks
    if (!name || !email || !subject || !message) {
      showFeedback('Please fill out all fields in the form.', 'error');
      return;
    }

    if (!validateEmail(email)) {
      showFeedback('Please enter a valid email address.', 'error');
      return;
    }

    // Interactive submitting state
    const originalText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending Message...';
    submitBtn.style.opacity = '0.7';

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: '2bc023fe-50c0-4f73-b74d-4d5fd7beceb6',
          name: name,
          email: email,
          subject: subject,
          message: message
        })
      });

      const result = await response.json();

      if (response.status === 200 && result.success) {
        showFeedback(`Thank you, ${name}! Your message has been sent successfully. I'll get back to you shortly.`, 'success');
        form.reset();
      } else {
        showFeedback(result.message || 'Something went wrong. Please try again later.', 'error');
      }
    } catch (err) {
      showFeedback('Unable to send message. Please check your internet connection and try again.', 'error');
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
      submitBtn.style.opacity = '1';
    }
  });

  function showFeedback(msg, type) {
    feedback.textContent = msg;
    feedback.className = `form-feedback ${type}`;
    feedback.style.display = 'block';
    
    // Smooth scroll to feedback message
    feedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }
}
