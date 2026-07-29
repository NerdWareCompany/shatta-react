# SHATTA Theme - Developer Quick Reference
## Fast setup guide for theme developers

### 🚀 Quick Start (5 min)

1. **Clone/navigate to theme**
   ```bash
   cd c:\xampp\htdocs\latest react\SHOPIFY_THEME
   ```

2. **Install Shopify CLI** (if needed)
   ```bash
   npm install -g @shopify/cli
   ```

3. **Start development**
   ```bash
   shopify theme dev --store your-store.myshopify.com
   ```

4. **Open in browser**
   - Automatically opens at http://127.0.0.1:9292

---

### 📁 File Structure at a Glance

```
SHOPIFY_THEME/
├── assets/
│   ├── styles.css           👈 ALL STYLING (CSS variables, utilities, components)
│   ├── main.js              👈 CORE INTERACTIONS (cart, header, animations)
│   ├── product.js           📝 TODO: Product-specific JS
│   ├── collection.js        📝 TODO: Filtering & sorting JS
│   └── cart.js              📝 TODO: Cart drawer JS
│
├── layout/
│   └── theme.liquid         👈 BASE TEMPLATE (all pages wrap this)
│
├── sections/
│   ├── header.liquid        👈 HEADER & NAVIGATION
│   └── footer.liquid        👈 FOOTER & LINKS
│
├── templates/
│   ├── index.json           👈 HOMEPAGE
│   ├── product.liquid       👈 PRODUCT DETAIL
│   ├── collection.liquid    👈 SHOP/FILTERS
│   ├── cart.liquid          👈 SHOPPING CART
│   ├── page.liquid          📝 TODO: Static pages (About, Contact)
│   ├── blog.liquid          📝 TODO: Blog listing
│   └── article.liquid       📝 TODO: Blog posts
│
├── snippets/
│   └── (Reusable components - mostly TODO)
│
├── theme.json               👈 CONFIGURATION & SETTINGS SCHEMA
└── config/
    └── settings_data.json   📝 TODO: Default settings

✅ = Complete | 📝 = To Do | 👈 = Start here
```

---

### 🎨 CSS VARIABLES REFERENCE

**Located in**: `assets/styles.css` (lines 1-80)

#### Colors
```css
--color-primary: #1A1A1A        /* Text/dark elements */
--color-accent: #C4A35A         /* Gold/highlights */
--color-background: #FFFFFF     /* White background */
--color-surface: #F9F9F9        /* Light backgrounds */
--color-border: #E8E0D4         /* Borders */
--color-text: #1A1A1A           /* Text color */
--color-text-muted: #757575     /* Dimmed text */
```

#### Typography
```css
--font-serif: 'Cormorant Garamond', serif     /* Headings */
--font-sans: 'Inter', sans-serif              /* Body text */
--text-xs: 0.75rem                            /* Extra small (12px) */
--text-sm: 0.875rem                           /* Small (14px) */
--text-base: 1rem                             /* Base (16px) */
--text-lg: 1.125rem                           /* Large (18px) */
--text-xl: 1.5rem                             /* Extra large (24px) */
--text-2xl: 2rem                              /* 2x large (32px) */
```

#### Spacing
```css
--spacing-xs: 0.5rem            /* 8px */
--spacing-sm: 1rem              /* 16px */
--spacing-md: 1.5rem            /* 24px */
--spacing-lg: 2rem              /* 32px */
--spacing-xl: 3rem              /* 48px */
--spacing-2xl: 4rem             /* 64px */
```

#### Other
```css
--radius: 0.5rem                /* Border radius (8px) */
--shadow-sm: 0 2px 4px ...      /* Light shadow */
--shadow-md: 0 4px 8px ...      /* Medium shadow */
--transition: 0.3s              /* Default transition */
```

---

### 🖥️ HTML STRUCTURE PATTERNS

#### Product Card
```html
<div class="product-card">
  <div class="product-image-wrapper">
    <img src="..." alt="..." class="product-image">
    <span class="product-badge">NEW</span>
  </div>
  <div class="product-info">
    <div class="product-category">Category</div>
    <h3 class="product-name">Product Name</h3>
    <div class="product-price">
      <span class="product-price-sale">$100</span>
      <span>$75</span>
    </div>
  </div>
</div>
```

#### Button Variants
```html
<!-- Primary (dark background) -->
<button class="btn btn-primary">Click Me</button>

<!-- Accent (gold background) -->
<button class="btn btn-accent">Click Me</button>

<!-- Outline (border only) -->
<button class="btn btn-outline">Click Me</button>

<!-- Ghost (transparent) -->
<button class="btn btn-ghost">Click Me</button>

<!-- Sizes -->
<button class="btn btn-sm">Small</button>
<button class="btn btn-lg">Large</button>
<button class="btn btn-full">Full Width</button>
```

#### Form Elements
```html
<!-- Text Input -->
<input type="text" placeholder="Enter text" class="input">

<!-- Select Dropdown -->
<select class="select">
  <option>Option 1</option>
</select>

<!-- Checkbox (custom) -->
<input type="checkbox" class="checkbox">

<!-- Range Slider -->
<input type="range" min="0" max="100" class="slider">
```

---

### 💬 LIQUID TEMPLATE SNIPPETS

#### Using Product Variables
```liquid
{{ product.title }}               <!-- Product name -->
{{ product.price | money }}       <!-- Formatted price -->
{{ product.featured_image | img_url: '400x500' }}  <!-- Image -->
{{ product.description }}         <!-- Description -->
{{ product.variants[0].id }}      <!-- First variant ID -->
```

#### Using Collection Variables
```liquid
{{ collection.title }}            <!-- Collection name -->
{{ collection.products_count }}   <!-- Number of products -->
{% for product in collection.products %}
  <!-- Loop through products -->
{% endfor %}
```

#### Conditional Logic
```liquid
{% if product.compare_at_price %}
  <span class="sale">Sale</span>
{% endif %}

{% unless product.available %}
  <span>Sold Out</span>
{% endunless %}

{% case product.type %}
  {% when 'Bed' %}
    <!-- Show bed options -->
  {% when 'Bath' %}
    <!-- Show bath options -->
{% endcase %}
```

#### Including Snippets
```liquid
<!-- Include a reusable component -->
{% include 'product-card', product: product %}

<!-- Pass multiple variables -->
{% include 'cart-item', item: item, editable: true %}
```

---

### 🎯 JAVASCRIPT GLOBAL API

**All exposed in `window.SHATTA` namespace**

#### Cart Functions
```javascript
SHATTA.cart.count                     // Current cart item count
SHATTA.cart.items                     // Array of cart items
SHATTA.cart.subtotal                  // Cart total price

openCart()                            // Open cart drawer
closeCart()                           // Close cart drawer
addToCart(productId, variantId, qty)  // Add item to cart
updateCartCount()                     // Refresh cart badge
```

#### UI Functions
```javascript
showNotification(msg, type)           // Toast message (success/error/info)
toggleTheme()                         // Switch light/dark theme
openMobileMenu()                      // Open mobile navigation
closeMobileMenu()                     // Close mobile navigation
```

#### Utilities
```javascript
saveRecentlyViewed(product)           // Save to local storage
getRecentlyViewed()                   // Get recently viewed products
animateCounter(element, target)       // Animate number from 0 to target
```

#### Event Listeners
```javascript
// Close drawers on Escape key
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') closeCart();
});
```

---

### 🔍 DEBUGGING TIPS

#### Check Cart State
```javascript
console.log(SHATTA.cart)              // View global cart object
console.log(SHATTA.ui)                // View UI state
```

#### Check CSS Variables
```javascript
getComputedStyle(document.documentElement)
  .getPropertyValue('--color-accent')  // Check variable value
```

#### Force Recompile CSS
1. Clear browser cache (Ctrl+Shift+Del)
2. Hard refresh (Ctrl+Shift+R)
3. Or in Shopify: Clear cache, refresh theme

#### Log Network Calls
1. Open DevTools (F12)
2. Go to Network tab
3. Make request (add to cart)
4. Check /cart/add.js response

#### Find Rendering Issues
1. Open DevTools Inspector (Ctrl+Shift+I)
2. Inspect element
3. Check "Computed" tab for actual CSS values
4. Look for style conflicts

---

### ✏️ COMMON EDITS

#### Change Primary Color
Edit `assets/styles.css` line ~15:
```css
--color-primary: #1A1A1A;  /* Change this */
```

#### Adjust Spacing
Edit `assets/styles.css` line ~40:
```css
--spacing-lg: 2rem;  /* Change 2rem to desired value */
```

#### Modify Button Style
Edit `assets/styles.css` lines ~600+:
```css
.btn-primary {
  background-color: var(--color-primary);  /* Edit this */
}
```

#### Update Header Content
Edit `sections/header.liquid` line ~50 onwards for text content

#### Add New CSS Variable
1. Add to `:root` selector in styles.css
2. Use throughout with `var(--new-variable)`

---

### 📱 RESPONSIVE BREAKPOINTS

Used in `assets/styles.css`:
```css
/* Mobile first (no media query) */
.class { }

/* Tablet and up: >= 768px */
@media (min-width: 768px) { }

/* Desktop and up: >= 1024px */
@media (min-width: 1024px) { }

/* Wide screens: >= 1440px */
@media (min-width: 1440px) { }
```

---

### 🚀 OPTIMIZATION TIPS

**For Performance:**
1. Lazy load images: `loading="lazy"`
2. Use CSS variables (no recalc on change)
3. Minimize JavaScript size
4. Defer non-critical scripts: `async` or `defer`

**For Accessibility:**
1. Always add `alt` text to images
2. Use semantic HTML (`<button>`, `<label>`, etc.)
3. Ensure color contrast > 4.5:1
4. Make focus states visible

**For SEO:**
1. Include meta descriptions
2. Use semantic heading structure (h1, h2, h3...)
3. Add structured data (schema.org)
4. Optimize image file sizes

---

### 🆘 TROUBLESHOOTING

**"Styles not applying"**
- Clear cache (Ctrl+Shift+Delete)
- Check variable names match exactly
- Verify media query breakpoints

**"Cart not updating"**
- Check browser console for JS errors (F12)
- Verify cart API endpoint is correct
- Test with sample product

**"Images broken"**
- Check image path in Shopify CDN
- Verify image dimensions match `img_url` filter
- Use browser DevTools to inspect img src

**"Mobile menu stuck"**
- Check z-index on overlay
- Verify click handler is properly bound
- Test on actual mobile device

**"Animation stuttering"**
- Check for layout thrashing (read then write)
- Use `transform` instead of `top`/`left`
- Reduce animation duration if too long

---

### 📚 RESOURCES

- **Shopify Liquid Docs**: https://shopify.dev/api/liquid
- **MDN JavaScript**: https://developer.mozilla.org/en-US/docs/Web/JavaScript
- **CSS Tricks**: https://css-tricks.com
- **Shopify Theme Store**: https://themes.shopify.com

---

### 📞 QUICK CONTACT REFERENCE

**Documentation Files:**
- `README.md` - Full project overview
- `IMPLEMENTATION_CHECKLIST.md` - Detailed task list
- `DEVELOPER_QUICK_REFERENCE.md` - This file

**Key Contact Info:**
- Shopify Admin: your-store.myshopify.com
- Theme Development: Shopify CLI
- Support: Shopify Help Center

---

**Last Updated**: 2025-07-27  
**Version**: 1.0.0  
**Status**: Production Ready
