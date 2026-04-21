document.addEventListener('DOMContentLoaded', () => {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('[data-nav]').forEach(link => {
    const target = link.getAttribute('href');
    if (target === path) link.classList.add('active');
  });
});
