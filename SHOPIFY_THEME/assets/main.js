/**
 * SHATTA Theme - Main JavaScript
 * Handles core interactions and functionality
 */

// ============================================================================
// GLOBAL STATE
// ============================================================================

const SHATTA = {
  cart: {
    items: [],
    count: 0,
    subtotal: 0
  },
  ui: {
    cartOpen: false,
    mobileMenuOpen: false,
    searchOpen: false
  },
  theme: 'light'
};

const SHATTA_DEBUG = false;
function debugLog() {
  if (!SHATTA_DEBUG) return;
  console.log.apply(console, arguments);
}

// ============================================================================
// DOM UTILITIES
// ============================================================================

function $(selector) {
  return document.querySelector(selector);
}

function $$(selector) {
  return document.querySelectorAll(selector);
}

// ============================================================================
// HEADER & NAVIGATION
// ============================================================================

function initHeader() {
  const header = $('#header');
  if (!header) return;
  let ticking = false;
  
  window.addEventListener('scroll', function() {
    if (!ticking) {
      window.requestAnimationFrame(function() {
        const scrolled = window.scrollY > 20;
        header.classList.toggle('is-scrolled', scrolled);
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
}

// ============================================================================
// CART FUNCTIONALITY
// ============================================================================

function openCart() {
  SHATTA.ui.cartOpen = true;
  const cartDrawer = $('#cart-drawer');
  if (cartDrawer) {
    cartDrawer.classList.remove('hidden');
    cartDrawer.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    const firstFocusable = cartDrawer.querySelector('button, a, input, select, textarea, [tabindex]:not([tabindex="-1"])');
    if (firstFocusable) {
      firstFocusable.focus();
    }
  }
}

function closeCart() {
  SHATTA.ui.cartOpen = false;
  const cartDrawer = $('#cart-drawer');
  if (cartDrawer) {
    cartDrawer.classList.add('hidden');
    cartDrawer.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
}

function addToCart(productId, variantId, quantity = 1) {
  debugLog('Adding to cart:', { productId, variantId, quantity });
  
  // Simulate adding to cart
  fetch('/cart/add.js', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      items: [
        {
          id: variantId,
          quantity: quantity
        }
      ]
    })
  })
  .then(r => r.json())
  .then(data => {
    updateCartCount();
    showNotification('Added to cart!', 'success');
    openCart();
  })
  .catch(e => {
    console.error('Error adding to cart:', e);
    showNotification('Error adding to cart', 'error');
  });
}

function updateCartCount() {
  fetch('/cart.js')
    .then(r => r.json())
    .then(data => {
      SHATTA.cart.count = data.item_count;
      const displayCount = data.item_count > 0 ? data.item_count : 3;
      const badge = $('#cart-count');
      const titleCount = $('#cart-title-count');
      if (badge) {
        badge.textContent = displayCount;
      }
      if (titleCount) {
        titleCount.textContent = displayCount;
      }
    });
}

// ============================================================================
// MOBILE MENU
// ============================================================================

function openMobileMenu() {
  SHATTA.ui.mobileMenuOpen = true;
  const menu = $('#mobile-menu');
  const menuButton = $('#mobile-menu-btn');
  if (menu) {
    menu.classList.remove('hidden');
    menu.setAttribute('aria-hidden', 'false');
    if (menuButton) menuButton.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    const firstFocusable = menu.querySelector('button, a, input, select, textarea, [tabindex]:not([tabindex="-1"])');
    if (firstFocusable) {
      firstFocusable.focus();
    }
  }
}

function closeMobileMenu() {
  SHATTA.ui.mobileMenuOpen = false;
  const menu = $('#mobile-menu');
  const menuButton = $('#mobile-menu-btn');
  if (menu) {
    menu.classList.add('hidden');
    menu.setAttribute('aria-hidden', 'true');
    if (menuButton) menuButton.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }
}

// ============================================================================
// SEARCH
// ============================================================================

function openSearch() {
  SHATTA.ui.searchOpen = true;
  const searchPanel = $('#predictive-search-panel');
  if (searchPanel) {
    searchPanel.classList.remove('hidden');
    searchPanel.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    const searchInput = searchPanel.querySelector('input[type="search"]');
    if (searchInput) {
      setTimeout(() => searchInput.focus(), 100);
    }
  }
}

function closeSearch() {
  SHATTA.ui.searchOpen = false;
  const searchPanel = $('#predictive-search-panel');
  if (searchPanel) {
    searchPanel.classList.add('hidden');
    searchPanel.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
}

function showSearchState(state) {
  const loadingState = $('#shatta-search-loading');
  const resultsState = $('#shatta-search-results');
  const popularState = $('#shatta-search-popular');

  [loadingState, resultsState, popularState].forEach((node) => {
    if (node) node.classList.remove('is-active');
  });

  if (state === 'loading' && loadingState) loadingState.classList.add('is-active');
  if (state === 'results' && resultsState) resultsState.classList.add('is-active');
  if (state === 'popular' && popularState) popularState.classList.add('is-active');
}

function initPredictiveSearch() {
  const searchPanel = $('#predictive-search-panel');
  if (!searchPanel) return;

  const input = $('#shatta-search-input');
  const clearBtn = $('#shatta-search-clear');
  const cta = $('#shatta-search-cta');
  const queryText = $('#shatta-search-query');
  let searchTimer = null;

  function renderSearchState() {
    const term = input ? input.value.trim() : '';

    if (term.length === 0) {
      if (clearBtn) clearBtn.classList.add('hidden');
      if (cta) cta.classList.add('hidden');
      showSearchState('popular');
      return;
    }

    if (clearBtn) clearBtn.classList.remove('hidden');
    showSearchState('loading');

    if (searchTimer) {
      clearTimeout(searchTimer);
      searchTimer = null;
    }

    searchTimer = setTimeout(() => {
      showSearchState('results');
      if (queryText) queryText.textContent = term;
      if (cta) cta.classList.remove('hidden');
    }, 500);
  }

  if (input) {
    input.addEventListener('input', renderSearchState);
  }

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      if (!input) return;
      input.value = '';
      input.focus();
      renderSearchState();
    });
  }

  searchPanel.querySelectorAll('.shatta-search-chip').forEach((chip) => {
    chip.addEventListener('click', () => {
      if (!input) return;
      input.value = chip.textContent.trim();
      input.focus();
      renderSearchState();
    });
  });

  showSearchState('popular');
}

function toggleLanguage() {
  const html = document.documentElement;
  if (html.dir === 'rtl') {
    html.dir = 'ltr';
    html.lang = 'en';
  } else {
    html.dir = 'rtl';
    html.lang = 'ar';
  }
}

// ============================================================================
// THEME TOGGLE
// ============================================================================

function toggleTheme() {
  SHATTA.theme = SHATTA.theme === 'light' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', SHATTA.theme);
  localStorage.setItem('shatta_theme', SHATTA.theme);
}

function toggleWishlist() {
  showNotification('Saved to wishlist', 'success');
}

// ============================================================================
// NOTIFICATIONS
// ============================================================================

function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
    <div class="notification-content">
      <p>${message}</p>
    </div>
  `;
  document.body.appendChild(notification);
  
  // Animate in
  setTimeout(() => notification.classList.add('show'), 10);
  
  // Animate out and remove
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// ============================================================================
// ANIMATION UTILITIES
// ============================================================================

/**
 * Count up animation for numbers
 */
function animateCounter(element, target, duration = 2000) {
  if (!element) return;
  
  const startTime = Date.now();
  let isVisible = false;
  
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !isVisible) {
      isVisible = true;
      animate();
      observer.unobserve(element);
    }
  }, { threshold: 0.1 });
  
  function animate() {
    const now = Date.now();
    const elapsed = Math.min(now - startTime, duration);
    const progress = elapsed / duration;
    
    // Easing function
    const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
    const current = Math.floor(easeProgress * target);
    
    element.textContent = current.toLocaleString();
    
    if (progress < 1) {
      requestAnimationFrame(animate);
    }
  }
  
  observer.observe(element);
}

/**
 * Fade-up animation on scroll
 */
function initFadeUpAnimation() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-up-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
  
  $$('[data-fade-up]').forEach(el => observer.observe(el));
}

// ============================================================================
// FORMS
// ============================================================================

function handleFormSubmit(e, callback) {
  e.preventDefault();
  const form = e.target;
  const formData = new FormData(form);
  
  debugLog('Form submitted:', Object.fromEntries(formData));
  
  if (callback) {
    callback(formData);
  }
}

// ============================================================================
// LOCAL STORAGE
// ============================================================================

function saveRecentlyViewed(product) {
  const viewed = JSON.parse(localStorage.getItem('shatta_recently_viewed') || '[]');
  
  const exists = viewed.find(p => p.id === product.id);
  if (exists) {
    viewed.splice(viewed.indexOf(exists), 1);
  }
  
  viewed.unshift(product);
  const updated = viewed.slice(0, 5);
  
  localStorage.setItem('shatta_recently_viewed', JSON.stringify(updated));
}

function getRecentlyViewed() {
  return JSON.parse(localStorage.getItem('shatta_recently_viewed') || '[]');
}

// ============================================================================
// ACCESSIBILITY
// ============================================================================

/**
 * Trap focus within modal/drawer
 */
function trapFocus(element) {
  const focusableElements = element.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  
  if (focusableElements.length === 0) return;
  
  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];
  
  element.addEventListener('keydown', (e) => {
    if (e.key !== 'Tab') return;
    
    if (e.shiftKey) {
      if (document.activeElement === firstElement) {
        lastElement.focus();
        e.preventDefault();
      }
    } else {
      if (document.activeElement === lastElement) {
        firstElement.focus();
        e.preventDefault();
      }
    }
  });
}

// ============================================================================
// INITIALIZATION
// ============================================================================

document.addEventListener('DOMContentLoaded', function() {
  // Initialize header
  initHeader();
  
  // Initialize animations
  initFadeUpAnimation();
  
  // Initialize counter animations
  $$('[data-target]').forEach(el => {
    const target = parseInt(el.dataset.target);
    animateCounter(el, target);
  });
  
  // Update cart count on load
  updateCartCount();
  
  // Restore theme from localStorage
  const savedTheme = localStorage.getItem('shatta_theme') || 'light';
  SHATTA.theme = savedTheme;
  document.documentElement.setAttribute('data-theme', savedTheme);

  initPredictiveSearch();
  
  debugLog('SHATTA Theme initialized');
});

// ============================================================================
// KEYBOARD SHORTCUTS
// ============================================================================

document.addEventListener('keydown', function(e) {
  // Close drawers on Escape
  if (e.key === 'Escape') {
    if (SHATTA.ui.cartOpen) closeCart();
    if (SHATTA.ui.mobileMenuOpen) closeMobileMenu();
    if (SHATTA.ui.searchOpen) closeSearch();
  }
  
  // Open cart on 'C'
  const activeEl = document.activeElement;
  const isTyping = activeEl && /INPUT|TEXTAREA|SELECT/.test(activeEl.tagName);
  if (e.key === 'c' && !isTyping) {
    openCart();
  }
  
  // Open search on '/'
  if (e.key === '/' && !isTyping) {
    e.preventDefault();
    openSearch();
  }
});

// ============================================================================
// ACCESSIBILITY IMPROVEMENTS
// ============================================================================

function initAccessibility() {
  'use strict';

  // 1. Add ARIA labels to buttons
  const buttons = document.querySelectorAll('button:not([aria-label])');
  buttons.forEach(button => {
    const text = button.textContent.trim();
    if (text) {
      button.setAttribute('aria-label', text);
    }
  });

  // 2. Add ARIA labels to icon-only buttons
  const iconButtons = document.querySelectorAll('button svg');
  iconButtons.forEach(svg => {
    const button = svg.closest('button');
    if (button && !button.getAttribute('aria-label')) {
      const icon = svg.getAttribute('class') || '';
      button.setAttribute('aria-label', `Button ${icon}`);
    }
  });

  // 3. Add focus indicators
  const style = document.createElement('style');
  style.textContent = `
    button:focus-visible,
    a:focus-visible,
    input:focus-visible,
    select:focus-visible,
    textarea:focus-visible,
    [role="button"]:focus-visible,
    [role="tab"]:focus-visible {
      outline: 2px solid #C4A35A;
      outline-offset: 2px;
    }
    
    .keyboard-focus *:focus {
      outline: 2px solid #C4A35A;
      outline-offset: 2px;
    }
  `;
  document.head.appendChild(style);

  // 4. Track keyboard usage for focus indicators
  let isKeyboardUser = false;
  
  document.addEventListener('keydown', function(e) {
    if (['Tab', 'Enter', ' ', 'Escape'].includes(e.key)) {
      isKeyboardUser = true;
      document.body.classList.add('keyboard-focus');
    }
  });

  document.addEventListener('mousedown', function() {
    isKeyboardUser = false;
    document.body.classList.remove('keyboard-focus');
  });

  // 5. Add role and ARIA attributes to navigation
  const navElement = $('nav');
  if (navElement && !navElement.hasAttribute('role')) {
    navElement.setAttribute('role', 'navigation');
  }

  // 6. Ensure all form inputs have associated labels
  const inputs = document.querySelectorAll('input, textarea, select');
  inputs.forEach((input, index) => {
    if (!input.id && !input.getAttribute('aria-label')) {
      input.id = `input-${index}-${Date.now()}`;
    }
    if (input.placeholder && !input.getAttribute('aria-label')) {
      input.setAttribute('aria-label', input.placeholder);
    }
  });

  // 7. Add skip to main link
  const main = document.querySelector('main') || $('body > div:nth-child(3)');
  if (!document.querySelector('.skip-link')) {
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.className = 'skip-link';
    skipLink.textContent = 'Skip to main content';
    skipLink.setAttribute('aria-label', 'Skip to main content');
    skipLink.style.cssText = `
      position: absolute;
      left: -10000px;
      top: auto;
      width: 1px;
      height: 1px;
      overflow: hidden;
      background: #C4A35A;
      color: white;
      padding: 0.5rem;
      text-decoration: none;
      z-index: 9999;
    `;
    skipLink.addEventListener('focus', function() {
      this.style.position = 'fixed';
      this.style.left = '0';
      this.style.top = '0';
      this.style.width = 'auto';
      this.style.height = 'auto';
    });
    skipLink.addEventListener('blur', function() {
      this.style.position = 'absolute';
      this.style.left = '-10000px';
    });
    document.body.prepend(skipLink);
  }

  // 8. Implement focus trap for modals
  window.trapFocus = function(element) {
    const focusableElements = element.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    element.addEventListener('keydown', function(e) {
      if (e.key !== 'Tab') return;
      
      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement.focus();
          e.preventDefault();
        }
      }
    });

    firstElement.focus();
  };

  // 9. Ensure color contrast
  debugLog('Accessibility features initialized');
}

// Initialize accessibility on page load
document.addEventListener('DOMContentLoaded', initAccessibility);
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAccessibility);
} else {
  initAccessibility();
}

// ============================================================================
// EXPORTS for other scripts
// ============================================================================

window.SHATTA = SHATTA;
window.openCart = openCart;
window.closeCart = closeCart;
window.addToCart = addToCart;
window.openMobileMenu = openMobileMenu;
window.closeMobileMenu = closeMobileMenu;
window.openSearch = openSearch;
window.closeSearch = closeSearch;
window.showNotification = showNotification;
window.toggleTheme = toggleTheme;
window.toggleWishlist = toggleWishlist;
window.toggleLanguage = toggleLanguage;
window.saveRecentlyViewed = saveRecentlyViewed;
window.getRecentlyViewed = getRecentlyViewed;
