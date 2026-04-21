document.addEventListener('DOMContentLoaded', () => {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('[data-nav]').forEach(link => {
    const target = link.getAttribute('href');
    if (target === path) link.classList.add('active');
  });

  const header = document.querySelector('.site-header');
  if (header) {
    const onScroll = () => {
      if (window.scrollY > 24) header.classList.add('is-scrolled');
      else header.classList.remove('is-scrolled');
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // Sand plumes — occasional mini dust-devils (index only)
  if (document.body.hasAttribute('data-particles') &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const canvas = document.querySelector('.bg-particles');
    if (canvas && canvas.getContext) {
      const ctx = canvas.getContext('2d');
      let w = 0;
      let h = 0;
      let dpr = Math.min(window.devicePixelRatio || 1, 2);
      let plumes = [];
      let ambientGrains = [];
      let frame = 0;
      let nextPlumeAt = 8;
      const minActivePlumes = 6;

      const COLORS = [
        'rgba(255, 226, 184, ',
        'rgba(243, 194, 123, ',
        'rgba(255, 208, 137, ',
        'rgba(214, 156, 86, '
      ];

      const sceneHeight = () => Math.min(h - 120, Math.max(window.innerHeight * 1.7, 1200));

      const resize = () => {
        w = window.innerWidth;
        h = Math.max(
          window.innerHeight,
          document.documentElement.scrollHeight,
          document.body.scrollHeight
        );
        canvas.width = Math.floor(w * dpr);
        canvas.height = Math.floor(h * dpr);
        canvas.style.width = `${w}px`;
        canvas.style.height = `${h}px`;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

        const ambientCount = Math.min(
          950,
          Math.max(320, Math.floor((w * Math.min(sceneHeight(), 1800)) / 3200))
        );
        ambientGrains = Array.from({ length: ambientCount }, createAmbientGrain);
      };

      const randomPlumeX = () => w * (0.05 + Math.random() * 0.9);

      const randomPlumeY = () => sceneHeight() * (0.34 + Math.random() * 0.58);

      const createAmbientGrain = () => ({
        x: Math.random() * w,
        y: Math.random() * sceneHeight(),
        size: 0.2 + Math.random() * 1.1,
        driftX: (Math.random() - 0.42) * (0.08 + Math.random() * 0.24),
        driftY: -0.008 + (Math.random() - 0.5) * 0.03,
        shimmer: Math.random() * Math.PI * 2,
        shimmerSpeed: 0.01 + Math.random() * 0.03,
        color: COLORS[(Math.random() * COLORS.length) | 0],
        life: 160 + Math.random() * 320,
        age: Math.random() * 220
      });

      const createParticle = (spin, messiness, plumeScale) => ({
        along: Math.random(),
        rise: 0.002 + Math.random() * 0.004,
        orbit: Math.random() * Math.PI * 2,
        orbitSpeed: spin * (0.6 + Math.random() * (1.2 + messiness * 0.45)),
        radiusScale: 0.35 + Math.random() * 0.8,
        size: (0.45 + Math.random() * 1.2) * (0.8 + plumeScale * 0.3),
        shimmer: Math.random() * Math.PI * 2,
        shimmerSpeed: 0.02 + Math.random() * 0.04,
        wobble: Math.random() * Math.PI * 2,
        wobbleSpeed: 0.035 + Math.random() * 0.055,
        wobbleAmount: 1.5 + Math.random() * (3.2 + messiness * 1.8),
        radialPulse: 0.75 + Math.random() * 1.6,
        color: COLORS[(Math.random() * COLORS.length) | 0]
      });

      const pickPlumeProfile = () => {
        const roll = Math.random();
        if (roll < 0.18) return { scale: 0.7, density: 0.85 };
        if (roll < 0.56) return { scale: 1.25, density: 1.1 };
        if (roll < 0.86) return { scale: 2.1, density: 1.65 };
        return { scale: 3.05, density: 2.25 };
      };

      const spawnPlume = (x = null) => {
        const profile = pickPlumeProfile();
        const plumeScale = profile.scale;
        const driftDir = Math.random() < 0.5 ? -1 : 1;
        const spin = (Math.random() < 0.5 ? -1 : 1) * (0.028 + Math.random() * 0.03);
        const height = (70 + Math.random() * 120) * plumeScale;
        const width = (8 + Math.random() * 18) * plumeScale;
        const count = Math.max(24, Math.floor((30 + Math.random() * 34) * profile.density));
        const messiness = 0.7 + Math.random() * 0.9;

        plumes.push({
          x: x ?? randomPlumeX(),
          y: randomPlumeY(),
          driftX: driftDir * (0.08 + Math.random() * 0.26) * (0.9 + plumeScale * 0.24),
          driftY: (-0.01 - Math.random() * 0.05) * (0.9 + plumeScale * 0.2),
          swayPhase: Math.random() * Math.PI * 2,
          swaySpeed: 0.012 + Math.random() * 0.022,
          swayAmount: (10 + Math.random() * (12 + messiness * 8)) * plumeScale,
          lean: driftDir * (0.06 + Math.random() * 0.14),
          messiness,
          plumeScale,
          height,
          width,
          life: (280 + Math.random() * 320) * (0.95 + plumeScale * 0.2),
          age: 0,
          particles: Array.from({ length: count }, () => createParticle(spin, messiness, plumeScale))
        });
      };

      const drawParticle = (plume, particle, intensity) => {
        particle.along += particle.rise;
        if (particle.along > 1) particle.along -= 1;

        particle.orbit += particle.orbitSpeed;
        particle.shimmer += particle.shimmerSpeed;
        particle.wobble += particle.wobbleSpeed;

        const heightOffset = plume.height * particle.along;
        const sway = Math.sin(plume.swayPhase + particle.along * plume.messiness * 2.4) * plume.swayAmount;
        const centerX = plume.x + sway + plume.lean * heightOffset;
        const centerY = plume.y - heightOffset + Math.cos(particle.wobble * 0.6) * plume.messiness * 1.2;
        const radiusPulse = 1 + Math.sin(particle.wobble * particle.radialPulse) * 0.12 * plume.messiness;
        const radius = plume.width * particle.radiusScale * (1 - particle.along * 0.72) * radiusPulse;
        const messyX = Math.sin(particle.wobble) * particle.wobbleAmount * (0.35 + particle.along * 0.65);
        const messyY = Math.cos(particle.wobble * 0.8) * particle.wobbleAmount * 0.22;

        const x = centerX + Math.sin(particle.orbit) * radius + messyX;
        const y = centerY + Math.cos(particle.orbit) * radius * 0.12 + messyY;

        const alpha = Math.max(
          0,
          intensity * (0.07 + 0.08 * (1 - particle.along) + Math.sin(particle.shimmer) * 0.06)
        );

        if (alpha <= 0) return;

        ctx.fillStyle = particle.color + alpha.toFixed(3) + ')';
        ctx.beginPath();
        ctx.arc(x, y, particle.size, 0, Math.PI * 2);
        ctx.fill();

        if (particle.size > 0.9) {
          ctx.fillStyle = 'rgba(255, 241, 212, ' + (alpha * 0.3).toFixed(3) + ')';
          ctx.beginPath();
          ctx.arc(x, y, particle.size * 0.45, 0, Math.PI * 2);
          ctx.fill();
        }
      };

      const drawAmbientGrains = () => {
        const maxY = sceneHeight();
        for (let i = 0; i < ambientGrains.length; i++) {
          const grain = ambientGrains[i];
          grain.x += grain.driftX;
          grain.y += grain.driftY;
          grain.shimmer += grain.shimmerSpeed;
          grain.age++;

          if (
            grain.age > grain.life ||
            grain.x < -20 || grain.x > w + 20 ||
            grain.y < -20 || grain.y > maxY + 20
          ) {
            ambientGrains[i] = createAmbientGrain();
            continue;
          }

          const alpha = 0.015 + Math.max(0, Math.sin(grain.shimmer)) * 0.09;
          ctx.fillStyle = grain.color + alpha.toFixed(3) + ')';
          ctx.beginPath();
          ctx.arc(grain.x, grain.y, grain.size, 0, Math.PI * 2);
          ctx.fill();
        }
      };

      const tick = () => {
        frame++;

        if (plumes.length < minActivePlumes && frame % 10 === 0) {
          spawnPlume(randomPlumeX());
        }

        if (frame >= nextPlumeAt) {
          spawnPlume(randomPlumeX());
          spawnPlume(randomPlumeX());
          if (Math.random() < 0.78) spawnPlume(randomPlumeX());
          if (Math.random() < 0.46) spawnPlume(randomPlumeX());
          nextPlumeAt = frame + 12 + Math.random() * 34;
        }

        ctx.clearRect(0, 0, w, h);
        ctx.globalCompositeOperation = 'lighter';
        drawAmbientGrains();

        for (let i = plumes.length - 1; i >= 0; i--) {
          const plume = plumes[i];
          plume.age++;
          plume.x += plume.driftX;
          plume.y += plume.driftY;
          plume.swayPhase += plume.swaySpeed;

          const fadeIn = Math.min(1, plume.age / 35);
          const fadeOut = Math.min(1, (plume.life - plume.age) / 70);
          const intensity = Math.max(0, Math.min(fadeIn, fadeOut));

          for (const particle of plume.particles) {
            drawParticle(plume, particle, intensity);
          }

          if (
            plume.age > plume.life ||
            plume.x < -140 || plume.x > w + 140 ||
            plume.y < -80 || plume.y > h + 120
          ) {
            plumes.splice(i, 1);
          }
        }

        ctx.globalCompositeOperation = 'source-over';
        requestAnimationFrame(tick);
      };

      resize();
      for (let i = 0; i < minActivePlumes; i++) {
        spawnPlume(randomPlumeX());
      }
      window.addEventListener('resize', resize);
      tick();
    }
  }
});
