import{r,j as e}from"./index-DITdoxcM.js";import{H as N,C as k,a as C}from"./Header-CjN2fg74.js";import{F as E}from"./Footer-Bq0OqnqI.js";import{QuickBuyModal as S}from"./QuickBuyModal-BwDwbbe9.js";import{C as w}from"./chevron-right-D2ozxm_q.js";import{m as p}from"./proxy-CwTZ1lGK.js";import{c as D}from"./createLucideIcon-D2R0d7Kn.js";import{X as x}from"./x-D2E2fWFS.js";import{C as P}from"./check-Bl4sUao6.js";import{A as F}from"./index-DYrvooE5.js";import"./CartDrawer-fxyrI0Ze.js";import"./plus-CpPZz92I.js";import"./PredictiveSearch-DWn-E2m0.js";/**
 * @license lucide-react v0.545.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const B=[["path",{d:"M10 5H3",key:"1qgfaw"}],["path",{d:"M12 19H3",key:"yhmn1j"}],["path",{d:"M14 3v4",key:"1sua03"}],["path",{d:"M16 17v4",key:"1q0r14"}],["path",{d:"M21 12h-9",key:"1o4lsq"}],["path",{d:"M21 19h-5",key:"1rlt1p"}],["path",{d:"M21 5h-7",key:"1oszz2"}],["path",{d:"M8 10v4",key:"tgpxqk"}],["path",{d:"M8 12H3",key:"a7s4jb"}]],L=D("sliders-horizontal",B);function J(){const[H,j]=r.useState(!1),[h,g]=r.useState(null),[l,u]=r.useState(["Duvets & Covers","Bedsheets"]),[i,c]=r.useState("#F5F5DC"),[a,d]=r.useState(4500),[n,y]=r.useState("Newest"),[m,b]=r.useState(!1);r.useEffect(()=>{const t=()=>{j(window.scrollY>20)};return window.addEventListener("scroll",t,{passive:!0}),()=>window.removeEventListener("scroll",t)},[]);const v={hidden:{opacity:0},visible:{opacity:1,transition:{staggerChildren:.1}}},f=[{name:"Signature Sateen Duvet Cover",category:"BEDDING",price:3450,img:"https://api.shatta.com/storage/3273/pouf-60_L.jpg",badge:"NEW"},{name:"Linen Blend Throw Blanket",category:"THROWS",price:1250,originalPrice:1800,img:"https://api.shatta.com/storage/3282/pouf-15.jpg",badge:"SALE"},{name:"Plush Egyptian Towel Set",category:"BATH",price:1800,img:"https://api.shatta.com/storage/3235/pouf-157_L.jpg"},{name:"Ceramic Table Lamp",category:"DECOR",price:2100,img:"https://api.shatta.com/storage/4448/lehaf_098.jpg"},{name:"Velvet Accent Cushion",category:"DECOR",price:850,img:"https://api.shatta.com/storage/3235/pouf-157_L.jpg"},{name:"Hotel Collection Sheets",category:"BEDDING",price:4200,originalPrice:5e3,img:"https://api.shatta.com/storage/3265/pouf-91.jpg",badge:"SALE"},{name:"Marble Bathroom Set",category:"BATH",price:1450,img:"https://api.shatta.com/storage/3253/pouf-108.jpg",badge:"NEW"},{name:"Handwoven Jute Rug",category:"RUGS",price:5600,img:"https://api.shatta.com/storage/3208/pouf-216_L.jpg"},{name:"Embroidered Linen Pillowcase",category:"PILLOWS",price:450,img:"https://api.shatta.com/storage/292/CUSH1_480.jpg"},{name:"Silk Sleep Mask",category:"ACCESSORIES",price:600,originalPrice:850,img:"https://api.shatta.com/storage/3245/pouf-146.jpg",badge:"SALE"},{name:"Quilted Comforter Set",category:"BEDDING",price:5200,img:"https://api.shatta.com/storage/3274/pouf-60-(1).jpg"},{name:"Waffle Knit Robe",category:"BATH",price:1950,img:"https://api.shatta.com/storage/3236/pouf-157.jpg",badge:"NEW"}].filter(t=>t.price<=a).sort((t,s)=>n==="Price: Low to High"?t.price-s.price:n==="Price: High to Low"?s.price-t.price:0),A=t=>{u(s=>s.includes(t)?s.filter(o=>o!==t):[...s,t])};return e.jsxs("div",{className:"min-h-screen bg-[#FFFFFF] font-sans text-[#1A1A1A] overflow-x-hidden selection:bg-[#C4A35A] selection:text-white scroll-smooth",children:[e.jsx("style",{children:`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400&family=Inter:wght@300;400;500;600&display=swap');
        .font-serif { font-family: 'Cormorant Garamond', serif; }
        .font-sans { font-family: 'Inter', sans-serif; }
        
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        
        input[type="checkbox"] {
          appearance: none;
          background-color: transparent;
          margin: 0;
          font: inherit;
          color: currentColor;
          width: 1.15em;
          height: 1.15em;
          border: 1px solid #1A1A1A;
          border-eadius: 0.25em;
          display: grid;
          place-content: center;
          cursor: pointer;
        }

        input[type="checkbox"]::before {
          content: "";
          width: 0.65em;
          height: 0.65em;
          transform: scale(0);
          transition: 120ms transform ease-in-out;
          box-shadow: inset 1em 1em white;
          background-color: transform;
          transform-origin: center;
          clip-path: polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%);
        }

        input[type="checkbox"]:checked {
          background-color: #1A1A1A;
        }

        input[type="checkbox"]:checked::before {
          transform: scale(1);
        }
        
        /* Custom range slider styling */
        input[type=range] {
          -webkit-appearance: none;
          width: 100%;
          background: transparent;
        }

        input[type=range]::-webkit-slider-thumb {
          -webkit-appearance: none;
          height: 16px;
          width: 16px;
          border-eadius: 50%;
          background: #C4A35A;
          cursor: pointer;
          margin-top: -6px;
          border: 2px solid white;
          box-shadow: 0 1px 3px rgba(0,0,0,0.2);
        }

        input[type=range]::-webkit-slider-runnable-track {
          width: 100%;
          height: 4px;
          cursor: pointer;
          background: #E8E0D4;
          border-eadius: 2px;
        }
      `}),e.jsx(N,{}),e.jsxs("main",{className:"max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8 py-6",children:[e.jsxs("div",{className:"flex items-center text-xs font-light tracking-wide text-[#1A1A1A]/50 mb-6",children:[e.jsx("span",{className:"hover:text-[#1A1A1A] cursor-pointer transition-colors",children:"Home"}),e.jsx(w,{className:"w-3 h-3 mx-2"}),e.jsx("span",{className:"hover:text-[#1A1A1A] cursor-pointer transition-colors",children:"Bed & Bath"}),e.jsx(w,{className:"w-3 h-3 mx-2"}),e.jsx("span",{className:"text-[#C4A35A] font-medium",children:"Bedding"})]}),e.jsxs(p.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.8,ease:"easeOut"},className:"relative w-full h-[250px] md:h-[350px] rounded-[2.5rem] overflow-hidden mb-10 shadow-lg shadow-black/5",children:[e.jsx("img",{src:"https://api.shatta.com/storage/3248/pouf-139_L.jpg",alt:"Bedding & Bed Linen",className:"absolute inset-0 w-full h-full object-cover"}),e.jsx("div",{className:"absolute inset-0 bg-gradient-to-r from-black/60 to-black/20"}),e.jsxs("div",{className:"absolute inset-0 flex flex-col justify-center px-8 md:px-16",children:[e.jsx("h1",{className:"font-serif text-4xl md:text-6xl text-white mb-4 drop-shadow-md",children:"Bedding & Bed Linen"}),e.jsx("p",{className:"text-white/90 text-sm md:text-base font-light max-w-md leading-relaxed drop-shadow-sm",children:"Transform your sanctuary with our premium collection of Egyptian cotton sheets, luxurious duvet covers, and perfectly crafted pillowcases."})]})]}),e.jsxs("div",{className:"flex flex-col sm:flex-row justify-between items-center mb-8 gap-4 pb-4 border-b border-[#E8E0D4]",children:[e.jsxs("div",{className:"text-sm font-medium tracking-wide text-[#1A1A1A]/70",children:[e.jsx("span",{className:"text-[#1A1A1A]",children:f.length})," Products"]}),e.jsxs("div",{className:"flex items-center gap-3 w-full sm:w-auto",children:[e.jsxs("button",{className:"flex-1 sm:flex-none md:hidden flex items-center justify-center gap-2 px-6 py-2.5 bg-white border border-[#E8E0D4] rounded-full text-sm font-medium hover:border-[#C4A35A] transition-colors shadow-sm",children:[e.jsx(L,{className:"w-4 h-4"}),"Filter"]}),e.jsxs("div",{className:"flex-1 sm:flex-none relative group z-10",children:[e.jsxs("button",{onClick:()=>b(!m),className:"w-full flex items-center justify-between gap-3 px-6 py-2.5 bg-white border border-[#E8E0D4] rounded-full text-sm font-medium hover:border-[#C4A35A] transition-colors shadow-sm min-w-[180px]",children:[e.jsxs("span",{children:["Sort by: ",e.jsx("span",{className:"font-light",children:n})]}),e.jsx(k,{className:`w-4 h-4 text-[#1A1A1A]/50 transition-transform ${m?"rotate-180":""}`})]}),m&&e.jsx("div",{className:"absolute top-full right-0 mt-2 w-full bg-white border border-[#E8E0D4] rounded-xl shadow-lg py-2",children:["Newest","Price: Low to High","Price: High to Low"].map(t=>e.jsx("button",{onClick:()=>{y(t),b(!1)},className:`w-full text-left px-6 py-2 text-sm hover:bg-gray-50 ${n===t?"text-[#C4A35A] font-medium":"text-gray-600"}`,children:t},t))})]})]})]}),e.jsxs("div",{className:"flex flex-col lg:flex-row gap-10",children:[e.jsx("div",{className:"hidden lg:block w-[250px] flex-shrink-0",children:e.jsxs("div",{className:"sticky top-32 space-y-8",children:[(l.length>0||i||a<1e4)&&e.jsxs("div",{className:"pb-6 border-b border-[#E8E0D4]",children:[e.jsxs("div",{className:"flex items-center justify-between mb-4",children:[e.jsx("h3",{className:"text-sm font-medium tracking-widest text-gray-500 uppercase",children:"Active Filters"}),e.jsx("button",{onClick:()=>{u([]),c(null),d(1e4)},className:"text-xs text-gray-400 hover:text-[#1A1A1A] underline transition-colors",children:"Clear All"})]}),e.jsxs("div",{className:"flex flex-wrap gap-2",children:[l.map(t=>e.jsxs("button",{onClick:()=>A(t),className:"flex items-center gap-1 bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-full text-xs text-[#1A1A1A] hover:bg-gray-100 transition-colors group",children:[t," ",e.jsx(x,{className:"w-3 h-3 text-gray-400 group-hover:text-[#1A1A1A]"})]},t)),i&&e.jsxs("button",{onClick:()=>c(null),className:"flex items-center gap-1 bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-full text-xs text-[#1A1A1A] hover:bg-gray-100 transition-colors group",children:["Color ",e.jsx(x,{className:"w-3 h-3 text-gray-400 group-hover:text-[#1A1A1A]"})]}),a<1e4&&e.jsxs("button",{onClick:()=>d(1e4),className:"flex items-center gap-1 bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-full text-xs text-[#1A1A1A] hover:bg-gray-100 transition-colors group",children:["Up to EGP ",a," ",e.jsx(x,{className:"w-3 h-3 text-gray-400 group-hover:text-[#1A1A1A]"})]})]})]}),e.jsxs("div",{children:[e.jsx("h3",{className:"font-serif text-xl text-[#1A1A1A] mb-4",children:"Category"}),e.jsx("div",{className:"space-y-3",children:["Duvets & Covers","Bedsheets","Pillowcases","Comforters","Throws & Blankets"].map((t,s)=>e.jsxs("label",{className:"flex items-center gap-3 cursor-pointer group",children:[e.jsx("input",{type:"checkbox",checked:l.includes(t),onChange:()=>A(t),className:"form-checkbox"}),e.jsx("span",{className:"text-sm text-[#1A1A1A]/80 group-hover:text-[#C4A35A] transition-colors",children:t})]},s))})]}),e.jsxs("div",{className:"pt-6 border-t border-[#E8E0D4]",children:[e.jsx("h3",{className:"font-serif text-xl text-[#1A1A1A] mb-4",children:"Price"}),e.jsx("div",{className:"px-2 mb-6",children:e.jsx("input",{type:"range",min:"0",max:"10000",step:"500",value:a,onChange:t=>d(parseInt(t.target.value)),className:"w-full"})}),e.jsxs("div",{className:"flex items-center justify-between gap-4",children:[e.jsx("div",{className:"bg-white border border-[#E8E0D4] rounded-xl px-4 py-2 text-sm text-[#1A1A1A]/70 w-full text-center",children:"EGP 0"}),e.jsx("span",{className:"text-[#1A1A1A]/30",children:"-"}),e.jsxs("div",{className:"bg-white border border-[#E8E0D4] rounded-xl px-4 py-2 text-sm text-[#1A1A1A]/70 w-full text-center",children:["EGP ",a]})]})]}),e.jsxs("div",{className:"pt-6 border-t border-[#E8E0D4]",children:[e.jsx("h3",{className:"font-serif text-xl text-[#1A1A1A] mb-4",children:"Color"}),e.jsx("div",{className:"flex flex-wrap gap-3",children:[{bg:"#FFFFFF",border:"border-[#E8E0D4]"},{bg:"#F5F5DC",border:"border-transparent"},{bg:"#D2B48C",border:"border-transparent"},{bg:"#808080",border:"border-transparent"},{bg:"#1A1A1A",border:"border-transparent"},{bg:"#4682B4",border:"border-transparent"},{bg:"#556B2F",border:"border-transparent"},{bg:"#800000",border:"border-transparent"}].map((t,s)=>e.jsx("button",{onClick:()=>c(t.bg===i?null:t.bg),className:`w-8 h-8 rounded-full border ${t.border} shadow-sm hover:scale-110 transition-transform flex items-center justify-center`,style:{backgroundColor:t.bg},children:i===t.bg&&e.jsx(P,{className:`w-4 h-4 ${t.bg==="#1A1A1A"||t.bg==="#800000"||t.bg==="#4682B4"||t.bg==="#556B2F"?"text-white":"text-[#1A1A1A]/50"}`})},s))})]})]})}),e.jsxs("div",{className:"flex-1",children:[e.jsx(p.div,{initial:"hidden",animate:"visible",variants:v,className:"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12",children:e.jsx(F,{children:f.map((t,s)=>e.jsxs(p.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},exit:{opacity:0,scale:.95},transition:{duration:.4,delay:s*.05},className:"group cursor-pointer flex flex-col h-full",onClick:()=>{window.location.href="/preview/shatta-homepage/ProductDetail"},children:[e.jsx("div",{className:"relative aspect-[4/5] overflow-hidden bg-[#FFFFFF] rounded-3xl mb-5 shadow-sm shadow-black/5 group-hover:shadow-2xl group-hover:shadow-black/10 transition-shadow duration-500 p-2",children:e.jsxs("div",{className:"w-full h-full rounded-2xl overflow-hidden relative",children:[t.badge&&e.jsx("div",{className:"absolute top-3 start-3 bg-white/90 backdrop-blur-md text-[#1A1A1A] text-[9px] font-bold tracking-widest px-3 py-1.5 rounded-full z-10 shadow-sm",children:t.badge}),e.jsx("div",{className:"absolute top-3 end-3 z-20",children:e.jsx("button",{onClick:o=>{o.stopPropagation()},className:"bg-white/80 hover:bg-white backdrop-blur-md text-[#1A1A1A] hover:text-red-500 p-2 rounded-full shadow-sm transition-colors","aria-label":"Add to wishlist",children:e.jsx(C,{className:"w-4 h-4"})})}),e.jsx("img",{src:t.img,alt:t.name,className:"w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-[0.16,1,0.3,1]"}),e.jsx("div",{className:"absolute bottom-3 start-3 end-3 translate-y-0 opacity-100 focus-within:translate-y-0 focus-within:opacity-100 transition-all duration-500 ease-out z-10",children:e.jsx("button",{onClick:o=>{o.stopPropagation(),g(t)},className:"w-full bg-[#1A1A1A]/80 backdrop-blur-md hover:bg-[#C4A35A] text-white py-3 text-xs font-medium tracking-widest rounded-xl transition-colors shadow-lg",children:"QUICK ADD"})})]})}),e.jsxs("div",{className:"px-2",children:[e.jsx("div",{className:"text-[#C4A35A] text-[10px] font-medium tracking-widest mb-2",children:t.category}),e.jsx("h3",{className:"font-serif text-xl text-[#1A1A1A] leading-snug mb-2 group-hover:text-[#C4A35A] transition-colors",children:t.name}),e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsxs("div",{className:"text-sm text-[#1A1A1A]/70 font-medium",children:["EGP ",t.price.toLocaleString()]}),t.originalPrice&&e.jsxs("s",{className:"text-xs text-[#1A1A1A]/40",children:["EGP ",t.originalPrice.toLocaleString()]})]})]})]},t.name))})}),e.jsx("div",{className:"mt-16 flex justify-center",children:e.jsx("button",{className:"px-8 py-3.5 bg-white border border-[#E8E0D4] rounded-full text-sm font-medium text-[#1A1A1A] hover:border-[#C4A35A] hover:text-[#C4A35A] shadow-sm hover:shadow-md transition-all duration-300",children:"LOAD MORE PRODUCTS"})})]})]})]}),e.jsx(E,{}),e.jsx(S,{isOpen:!!h,onClose:()=>g(null),product:h})]})}export{J as Shop,J as default};
