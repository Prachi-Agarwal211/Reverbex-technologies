# 🎨 PROJECT IMPLEMENTATION PROMPT
## Diagonal/Circular 3D Poster Scrolling Showcase

---

## 📋 PROJECT OVERVIEW

Create a **next-level diagonal/circular 3D scrolling showcase** for Reverbex portfolio projects with stunning visual effects, poster-style cards, and immersive user experience.

---

## 🎯 CORE REQUIREMENTS

### **1. Layout Structure**

```
┌─────────────────────────────────────────────────────────┐
│              HERO SECTION (Current)                      │
│         [Fluid Background Animation]                     │
│        "Reverbex Technologies"                           │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│         DIAGONAL/CIRCULAR 3D PROJECT SHOWCASE            │
│                  (NEW - Main Focus)                      │
│                                                          │
│     ╔═══════════╗                    ╔═══════════╗      │
│    ╱ PROJECT 1  ╲                  ╱ PROJECT 2   ╲     │
│   ╱  JECRC      ╲────────────────╱  GEOPIXEL    ╲    │
│  ╱   [Image]     ╲              ╱    [Image]     ╲   │
│ ╱                 ╲            ╱                  ╲  │
│ ╲    Diagonal     ╱            ╲   Circular       ╱  │
│  ╲   Flow        ╱              ╲  3D Path       ╱   │
│   ╲             ╱                ╲              ╱    │
│    ╲___________╱                  ╲____________╱     │
│                                                          │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│         MISSION SECTION (Current - Keep As Is)           │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│         TECH STREAM (Current - Keep As Is)               │
│         Horizontal 3-Lane Technology Scroll              │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│         CONTACT SECTION (Current - Keep As Is)           │
└─────────────────────────────────────────────────────────┘
```

---

## 🎬 DIAGONAL/CIRCULAR 3D SCROLLING CONCEPT

### **Visual Description:**

Imagine projects arranged in a **spiral/circular path** that moves diagonally across the screen as you scroll. Each project card is a **3D poster** that:

1. **Floats in 3D space** with depth and perspective
2. **Rotates and tilts** as you scroll past it
3. **Follows a circular/spiral path** (not just straight diagonal)
4. **Appears from one side, curves through center, exits other side**
5. **Has parallax layers** (background image, content, effects)

### **Motion Pattern:**

```
                    Enter →
                      ↗
    ┌────────────────●─────────────────┐
    │              ╱   ╲                │
    │            ╱       ╲              │
    │          ╱           ╲            │
    │        ╱               ╲          │
    │      ●                   ●        │
    │    ╱                       ╲      │
    │  ╱           CENTER          ╲    │
    │ ●             (Focus)          ●  │
    │  ╲                           ╱    │
    │    ╲                       ╱      │
    │      ●                   ●        │
    │        ╲               ╱          │
    │          ╲           ╱            │
    │            ╲       ╱              │
    │              ╲   ╱                │
    └────────────────●─────────────────┘
                      ↘
                    ← Exit

Projects flow in a circular/spiral path:
- Enter from top-left (small, rotated)
- Grow and rotate as approaching center
- Maximum size/prominence at center
- Shrink and rotate as leaving center
- Exit bottom-right (small, rotated)
```

---

## 📦 PROJECT DATA STRUCTURE

### **15 Projects to Display:**

```typescript
export const projects = [
  // 1. JECRC NO-DUES SYSTEM ⭐ (LIVE)
  {
    id: 1,
    slug: 'jecrc-no-dues',
    title: 'JECRC No-Dues System',
    subtitle: 'Digital Clearance Management',
    client: 'JECRC University',
    category: 'Enterprise',
    featured: true,
    liveUrl: 'https://your-url.com',
    images: ['/pictures/no_dues_system/dashboard.png'],
    thumbnail: '/pictures/no_dues_system/dashboard.png',
    impact: [
      '5,000+ students managed',
      '80% time reduction',
      '12 departments integrated'
    ],
    tags: ['Next.js', 'Supabase', 'PostgreSQL', 'Real-time'],
    gradient: 'from-green-500 via-emerald-600 to-teal-700',
    icon: '🏫',
    position: { x: 0, y: 0, rotation: -2 } // Starting position
  },

  // 2. GEOPIXEL
  {
    id: 2,
    slug: 'geopixel',
    title: 'GEOPIXEL',
    subtitle: 'Real-Time Satellite Monitoring & 3D Visualization',
    client: 'ISRO-NRSC',
    category: 'ISRO',
    featured: true,
    video: '/pictures/GEOpixel/Geopixel.mp4',
    images: [
      '/pictures/GEOpixel/placeholder_globe_ndvi.png',
      '/pictures/GEOpixel/Screenshot from 2025-06-23 15-21-42.png'
    ],
    thumbnail: '/pictures/GEOpixel/placeholder_globe_ndvi.png',
    impact: [
      '500GB+ daily processing',
      '3D map visualization',
      '99.5% uptime'
    ],
    tags: ['Django', 'PostgreSQL', 'CesiumJS', 'Python'],
    gradient: 'from-cyan-500 via-blue-600 to-indigo-700',
    icon: '🛰️',
    position: { x: 1, y: 1, rotation: 2 }
  },

  // 3. GIST
  {
    id: 3,
    slug: 'gist',
    title: 'GIST',
    subtitle: 'Geophysical Information System Portal',
    client: 'ISRO-NRSC',
    category: 'ISRO',
    featured: true,
    images: ['/pictures/GEOpixel/Screenshot from 2025-06-23 15-21-42.png'],
    thumbnail: '/pictures/GEOpixel/Screenshot from 2025-06-23 15-21-42.png',
    impact: [
      'Data validation portal',
      'Missing data detection',
      'Quality monitoring'
    ],
    tags: ['Django', 'PostgreSQL', 'Data Validation'],
    gradient: 'from-indigo-500 via-purple-600 to-pink-700',
    icon: '🛰️',
    position: { x: -1, y: 2, rotation: -1.5 }
  },

  // 4. NADIR
  {
    id: 4,
    slug: 'nadir',
    title: 'NADIR',
    subtitle: 'Atmospheric Instrument Data Pipeline',
    client: 'ISRO-NRSC',
    category: 'ISRO',
    featured: true,
    images: [
      '/pictures/nadir/nadir.jpg',
      '/pictures/nadir/nadir 2.jpg'
    ],
    thumbnail: '/pictures/nadir/nadir.jpg',
    impact: [
      'Ozonometer processing',
      'Spectraradiometer analysis',
      'Sun photometer monitoring'
    ],
    tags: ['Django', 'Python', 'Scientific Computing'],
    gradient: 'from-blue-500 via-cyan-600 to-teal-700',
    icon: '🛰️',
    position: { x: 1, y: 3, rotation: 1.8 }
  },

  // 5. REVERBEX ATLAS
  {
    id: 5,
    slug: 'reverbex-atlas',
    title: 'Reverbex Atlas',
    subtitle: 'AI-Powered Satellite Image Alignment',
    client: 'Reverbex Product',
    category: 'Geospatial',
    featured: true,
    images: ['/pictures/GEOpixel/placeholder_globe_ndvi.png'],
    thumbnail: '/pictures/GEOpixel/placeholder_globe_ndvi.png',
    impact: [
      'Sub-pixel precision',
      '100x more accurate',
      'Minutes vs hours'
    ],
    tags: ['React 19', 'Python', 'AI/ML', 'Leaflet'],
    gradient: 'from-emerald-500 via-green-600 to-teal-700',
    icon: '🌍',
    position: { x: -1, y: 4, rotation: -2.2 }
  },

  // 6. REAL-TIME STREAMING GAME
  {
    id: 6,
    slug: 'streaming-game',
    title: 'Real-Time Web Streaming Game',
    subtitle: 'Live Streaming with Virtual Coin System',
    client: 'Private Enterprise',
    category: 'Gaming',
    featured: true,
    images: [],
    thumbnail: null,
    impact: [
      '10k+ concurrent players',
      '<50ms latency',
      'Virtual coin economy'
    ],
    tags: ['Node.js', 'Socket.IO', 'PostgreSQL', 'OvenMedia'],
    gradient: 'from-red-500 via-orange-600 to-amber-700',
    icon: '🎮',
    position: { x: 1, y: 5, rotation: 1.5 }
  },

  // 7. REVERBEX NEORA
  {
    id: 7,
    slug: 'reverbex-neora',
    title: 'Reverbex Neora',
    subtitle: 'Stock Market Companion Platform',
    client: 'Reverbex Product',
    category: 'FinTech',
    featured: true,
    images: [],
    thumbnail: null,
    impact: [
      'Real-time stock data',
      'Advanced charting',
      'n8n automation'
    ],
    tags: ['Flutter', 'React', 'FastAPI', 'n8n'],
    gradient: 'from-green-500 via-emerald-600 to-teal-700',
    icon: '📈',
    position: { x: -1, y: 6, rotation: -1.8 }
  },

  // 8. TRADING BOT SYSTEM
  {
    id: 8,
    slug: 'trading-bot',
    title: 'Trading Bot System',
    subtitle: 'Automated Trading Strategy Engine',
    client: 'Reverbex Product',
    category: 'FinTech',
    featured: true,
    images: [],
    thumbnail: null,
    impact: [
      '₹10Cr+ daily volume',
      '<50ms execution',
      'Multi-strategy'
    ],
    tags: ['Python', 'FastAPI', 'Trading APIs', 'ML'],
    gradient: 'from-purple-500 via-fuchsia-600 to-pink-700',
    icon: '🤖',
    position: { x: 1, y: 7, rotation: 2.1 }
  },

  // 9. REVERBEX CHRONICLE
  {
    id: 9,
    slug: 'reverbex-chronicle',
    title: 'Reverbex Chronicle',
    subtitle: 'High-Performance Market Data Engine',
    client: 'Reverbex Product',
    category: 'FinTech',
    featured: true,
    images: [],
    thumbnail: null,
    impact: [
      '500M+ data points',
      '<100ms queries',
      '90% compression'
    ],
    tags: ['TimescaleDB', 'PostgreSQL', 'FastAPI'],
    gradient: 'from-yellow-500 via-orange-600 to-red-700',
    icon: '💾',
    position: { x: -1, y: 8, rotation: -1.6 }
  },

  // 10. PERRY AI
  {
    id: 10,
    slug: 'perry-ai',
    title: 'Perry AI',
    subtitle: '4K AI Image Enhancement Platform',
    client: 'Reverbex Product',
    category: 'AI',
    featured: true,
    images: [],
    thumbnail: null,
    impact: [
      '4K/8K upscaling',
      'Multi-model AI',
      'Privacy-first local'
    ],
    tags: ['React 19', 'ONNX', 'WebGPU', 'AI/ML'],
    gradient: 'from-violet-500 via-purple-600 to-fuchsia-700',
    icon: '🖼️',
    position: { x: 1, y: 9, rotation: 1.9 }
  },

  // 11. MEME CONTENT FARM
  {
    id: 11,
    slug: 'meme-content-farm',
    title: 'Meme Content Farm',
    subtitle: 'Automated Social Media Pipeline',
    client: 'Internal',
    category: 'Automation',
    featured: true,
    images: [
      '/pictures/nether ai/Frontpage.png',
      '/pictures/nether ai/idea.png'
    ],
    thumbnail: '/pictures/nether ai/Frontpage.png',
    impact: [
      '100+ posts/month',
      '40hrs saved',
      '3x engagement'
    ],
    tags: ['Python', 'Gemini AI', 'Instagram API'],
    gradient: 'from-pink-500 via-rose-600 to-red-700',
    icon: '📱',
    position: { x: -1, y: 10, rotation: -2.0 }
  },

  // 12. CORPORATE WEB DESIGN
  {
    id: 12,
    slug: 'corporate-web',
    title: 'Corporate Tech Web Design',
    subtitle: 'Modern Enterprise Solutions',
    client: 'Enterprise',
    category: 'Web Design',
    featured: false,
    images: [
      '/pictures/template modern web solution/lading page.png'
    ],
    thumbnail: '/pictures/template modern web solution/lading page.png',
    impact: [
      'Modern responsive',
      'SEO optimized',
      'High conversion'
    ],
    tags: ['React', 'Tailwind CSS', 'Next.js'],
    gradient: 'from-sky-500 via-blue-600 to-indigo-700',
    icon: '🌐',
    position: { x: 1, y: 11, rotation: 1.7 }
  },

  // 13. REVERBEX WORDARA
  {
    id: 13,
    slug: 'reverbex-wordara',
    title: 'Reverbex Wordara',
    subtitle: 'AI-Powered Writing Assistant',
    client: 'Reverbex Product',
    category: 'AI',
    featured: false,
    images: [],
    thumbnail: null,
    impact: [
      'AI content generation',
      'Multi-language',
      'Real-time collab'
    ],
    tags: ['Next.js', 'AI/ML', 'Tailwind CSS'],
    gradient: 'from-indigo-500 via-violet-600 to-purple-700',
    icon: '📝',
    position: { x: -1, y: 12, rotation: -1.5 }
  },

  // 14. REVERBEX NETHER AI
  {
    id: 14,
    slug: 'reverbex-nether-ai',
    title: 'Reverbex Nether AI',
    subtitle: 'Multi-LLM Orchestration Gateway',
    client: 'Reverbex Product',
    category: 'AI',
    featured: false,
    images: [],
    thumbnail: null,
    impact: [
      'Multi-provider routing',
      'Local + Cloud hybrid',
      'Smart response fusion'
    ],
    tags: ['Node.js', 'Ollama', 'OpenAI', 'Gemini'],
    gradient: 'from-fuchsia-500 via-pink-600 to-rose-700',
    icon: '🧠',
    position: { x: 1, y: 13, rotation: 1.8 }
  },

  // 15. REVERBEX PLUGINS
  {
    id: 15,
    slug: 'reverbex-plugins',
    title: 'Reverbex Plugins',
    subtitle: 'Custom Development Tools',
    client: 'Reverbex Product',
    category: 'Development',
    featured: false,
    images: [],
    thumbnail: null,
    impact: [
      'Native performance',
      'Cross-platform',
      'Extensible'
    ],
    tags: ['C++', 'Python', 'TypeScript'],
    gradient: 'from-gray-500 via-slate-600 to-zinc-700',
    icon: '🔌',
    position: { x: -1, y: 14, rotation: -1.7 }
  }
];
```

---

## 🎨 3D POSTER CARD DESIGN

### **Card Structure:**

```typescript
// Each poster card has multiple layers for depth
interface PosterCard {
  // Layer 1: Background Image (furthest back)
  backgroundImage: string;
  backgroundParallax: number; // Moves slower
  
  // Layer 2: Glassmorphic Overlay
  glassOverlay: {
    blur: '20px';
    opacity: 0.1;
    gradient: 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))';
  };
  
  // Layer 3: Content
  content: {
    icon: string; // Emoji icon
    title: string;
    subtitle: string;
    client: string;
    impact: string[];
    tags: string[];
  };
  
  // Layer 4: Glow/Effects (foremost)
  effects: {
    borderGlow: string; // Gradient border
    shadow: string; // 3D shadow
    particles: boolean; // Optional floating particles
  };
  
  // 3D Transform
  transform: {
    rotateX: number; // Tilt on X axis
    rotateY: number; // Tilt on Y axis
    rotateZ: number; // Rotation
    translateZ: number; // Depth in 3D space
    scale: number; // Size based on position
  };
}
```

### **Card Styling:**

```css
.project-poster {
  /* Base dimensions */
  width: 450px;
  height: 600px;
  aspect-ratio: 3 / 4; /* Poster ratio */
  
  /* 3D Transform */
  transform-style: preserve-3d;
  perspective: 1000px;
  
  /* Glassmorphism */
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.1),
    rgba(255, 255, 255, 0.05)
  );
  backdrop-filter: blur(20px) saturate(180%);
  
  /* Border with gradient */
  border: 1px solid;
  border-image: linear-gradient(
    135deg,
    rgba(34, 211, 238, 0.5),
    rgba(232, 121, 249, 0.5)
  ) 1;
  
  /* 3D Shadow */
  box-shadow: 
    0 30px 60px rgba(0, 0, 0, 0.3),
    0 0 80px rgba(34, 211, 238, 0.2),
    inset 0 0 40px rgba(34, 211, 238, 0.05);
  
  /* Smooth transitions */
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Hover effects */
.project-poster:hover {
  transform: 
    rotateX(0deg) 
    rotateY(0deg) 
    scale(1.05) 
    translateZ(100px);
  
  box-shadow: 
    0 50px 100px rgba(0, 0, 0, 0.4),
    0 0 120px rgba(34, 211, 238, 0.4);
}

/* Parallax layers */
.poster-background {
  transform: translateZ(-50px) scale(1.1);
}

.poster-content {
  transform: translateZ(50px);
}

.poster-effects {
  transform: translateZ(100px);
}
```

---

## 🎭 SCROLL ANIMATION SYSTEM

### **Circular/Spiral Path Animation:**

```typescript
// Calculate position on circular path based on scroll progress
function calculateCircularPosition(scrollProgress: number, index: number) {
  // Scroll progress: 0 to 1
  // Each project occupies portion of the circle
  
  const totalProjects = 15;
  const projectOffset = index / totalProjects;
  const progress = (scrollProgress + projectOffset) % 1;
  
  // Parametric circle equations
  const angle = progress * Math.PI * 2; // Full circle
  const radius = 400; // Distance from center
  
  // Calculate X and Y on circle
  const x = Math.cos(angle) * radius;
  const y = Math.sin(angle) * radius;
  
  // Add spiral effect (z-depth changes)
  const z = Math.sin(angle * 2) * 100;
  
  // Calculate rotation based on position
  const rotation = {
    x: Math.sin(angle) * 15,
    y: Math.cos(angle) * 15,
    z: progress * 360
  };
  
  // Calculate scale (bigger at center)
  const distanceFromCenter = Math.abs(0.5 - progress);
  const scale = 1 - distanceFromCenter; // 1 at center, 0.5 at edges
  
  return {
    x,
    y,
    z,
    rotation,
    scale,
    opacity: scale // Fade based on distance
  };
}
```

### **Framer Motion Implementation:**

```typescript
import { motion, useScroll, useTransform } from 'framer-motion';

const ProjectPoster = ({ project, index }) => {
  const { scrollYProgress } = useScroll();
  
  // Transform scroll progress to circular position
  const circularX = useTransform(
    scrollYProgress,
    [0, 1],
    (progress) => calculateCircularPosition(progress, index).x
  );
  
  const circularY = useTransform(
    scrollYProgress,
    [0, 1],
    (progress) => calculateCircularPosition(progress, index).y
  );
  
  const rotateX = useTransform(
    scrollYProgress,
    [0, 1],
    (progress) => calculateCircularPosition(progress, index).rotation.x
  );
  
  const rotateY = useTransform(
    scrollYProgress,
    [0, 1],
    (progress) => calculateCircularPosition(progress, index).rotation.y
  );
  
  const scale = useTransform(
    scrollYProgress,
    [0, 1],
    (progress) => calculateCircularPosition(progress, index).scale
  );
  
  const opacity = useTransform(
    scrollYProgress,
    [0, 1],
    (progress) => calculateCircularPosition(progress, index).opacity
  );
  
  return (
    <motion.div
      style={{
        x: circularX,
        y: circularY,
        rotateX,
        rotateY,
        scale,
        opacity,
        transformStyle: 'preserve-3d'
      }}
      className="project-poster absolute"
    >
      {/* Poster content */}
    </motion.div>
  );
};
```

---

## 🎯 INTERACTION FEATURES

### **1. Magnetic Hover Effect:**

```typescript
const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

const handleMouseMove = (e: MouseEvent) => {
  const rect = e.currentTarget.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  
  const deltaX = (e.clientX - centerX) * 0.1;
  const deltaY = (e.clientY - centerY) * 0.1;
  
  setMousePos({ x: deltaX, y: deltaY });
};

// Apply to poster
transform: `translate(${mousePos.x}px, ${mousePos.y}px)`
```

### **2. 3D Tilt on Hover:**

```typescript
const handle3DTilt = (e: MouseEvent) => {
  const rect = e.currentTarget.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  
  const centerX = rect.width / 2;
  const centerY = rect.height / 2;
  
  const rotateX = (y - centerY) / centerY * -10; // Max 10deg
  const rotateY = (x - centerX) / centerX * 10;
  
  return { rotateX, rotateY };
};
```

### **3. Click to Expand Modal:**

```typescript
const [selectedProject, setSelectedProject] = useState(null);

// When poster clicked
onClick={() => setSelectedProject(project)}

// Show modal with:
// - All images in gallery
// - Full project description
// - Tech stack details
// - Impact metrics
// - Live link (if available)
// - Case study button
```

---

## 🎨 COLOR & VISUAL EFFECTS

### **Gradient Borders (Per Project):**

```typescript
const gradients = {
  'JECRC': 'from-green-500 via-emerald-600 to-teal-700',
  'GEOPIXEL': 'from-cyan-500 via-blue-600 to-indigo-700',
  'GIST': 'from-indigo-500 via-purple-600 to-pink-700',
  'NADIR': 'from-blue-500 via-cyan-600 to-teal-700',
  'Atlas': 'from-emerald-500 via-green-600 to-teal-700',
  'Gaming': 'from-red-500 via-orange-600 to-amber-700',
  'Neora': 'from-green-500 via-emerald-600 to-teal-700',
  'Trading Bot': 'from-purple-500 via-fuchsia-600 to-pink-700',
  'Chronicle': 'from-yellow-500 via-orange-600 to-red-700',
  'Perry AI': 'from-violet-500 via-purple-600 to-fuchsia-700',
  'Meme Farm': 'from-pink-500 via-rose-600 to-red-700',
  'Web Design': 'from-sky-500 via-blue-600 to-indigo-700',
  'Wordara': 'from-indigo-500 via-violet-600 to-purple-700',
  'Nether AI': 'from-fuchsia-500 via-pink-600 to-rose-700',
  'Plugins': 'from-gray-500 via-slate-600 to-zinc-700'
};
```

### **Glow Effects:**

```css
/* Animated glow */
@keyframes glow-pulse {
  0%, 100% {
    box-shadow: 
      0 0 40px rgba(34, 211, 238, 0.3),
      0 0 80px rgba(34, 211, 238, 0.2);
  }
  50% {
    box-shadow: 
      0 0 60px rgba(34, 211, 238, 0.5),
      0 0 120px rgba(34, 211, 238, 0.3);
  }
}

.poster-glow {
  animation: glow-pulse 3s ease-in-out infinite;
}
```

---

## 📱 RESPONSIVE BEHAVIOR

```typescript
const responsive = {
  mobile: {
    // Vertical scroll only, no circular path
    layout: 'vertical-stack',
    posterWidth: '90vw',
    posterHeight: 'auto',
    rotation: 0,
    spacing: '2rem'
  },
  
  tablet: {
    // Gentle diagonal
    layout: 'diagonal-flow',
    posterWidth: '60vw',
    rotation: '±5deg',
    circular: false
  },
  
  desktop: {
    // Full circular 3D experience
    layout: 'circular-3d',
    posterWidth: '450px',
    rotation: 'full-3d',
    circular: true
  }
};
```

---

## 🎬 IMPLEMENTATION CHECKLIST

### **Phase 1: Setup**
- [ ] Create `ProjectsShowcase.tsx` component
- [ ] Create `DiagonalPosterCard.tsx` component
- [ ] Set up Framer Motion for scroll animations
- [ ] Import project data from portfolio document

### **Phase 2: Circular Path System**
- [ ] Implement `calculateCircularPosition()` function
- [ ] Set up scroll progress tracking
- [ ] Create 3D transform calculations
- [ ] Test circular motion smoothness

### **Phase 3: 3D Poster Cards**
- [ ] Design poster card layout with layers
- [ ] Implement glassmorphism effects
- [ ] Add gradient borders per project
- [ ] Set up parallax layers (background, content, effects)

### **Phase 4: Interactions**
- [ ] Magnetic hover effect
- [ ] 3D tilt on mouse move
- [ ] Click to expand modal
- [ ] Smooth transitions

### **Phase 5: Visual Polish**
- [ ] Glow effects and animations
- [ ] Loading states for images
- [ ] Fallback for missing images
- [ ] Optimize performance

### **Phase 6: Responsive**
- [ ] Mobile layout (vertical stack)
- [ ] Tablet layout (gentle diagonal)
- [ ] Desktop layout (full circular 3D)

### **Phase 7: Integration**
- [ ] Insert into main page between Hero and Mission
- [ ] Test with existing fluid background
- [ ] Ensure smooth scroll flow
- [ ] Performance optimization

---

## 🚀 EXPECTED USER EXPERIENCE

1. **Scroll starts** → First project (JECRC) enters from top-left corner (small, rotated)
2. **Continues scrolling** → Project grows, rotates, moves toward center
3. **Reaches center** → Project at maximum size, straight-on view, most prominent
4. **Keeps scrolling** → Project shrinks, rotates, moves toward bottom-right
5. **Exits view** → Project disappears, next project entering from top-left
6. **Circular pattern** → All 15 projects flow in continuous circular path
7. **Hover interaction** → Magnetic pull, 3D tilt, glow intensifies
8. **Click** → Modal with full project details

---

## 🎯 TECHNICAL SPECIFICATIONS

- **Framework:** Next.js 14, React 18, TypeScript
- **Animation:** Framer Motion (scroll-based animations)
- **3D:** CSS 3D transforms + perspective
- **Styling:** Tailwind CSS + custom CSS
- **Images:** Next.js Image component with optimization
- **Performance:** Virtual scrolling for smooth 60fps
- **Accessibility:** Keyboard navigation, ARIA labels

---

## 📊 PERFORMANCE TARGETS

- **60 FPS** scroll animation
- **< 100ms** interaction response time
- **Lazy load** images as they approach viewport
- **GPU acceleration** for 3D transforms
- **Optimized** re-renders with React.memo

---

This prompt contains everything needed to implement the diagonal/circular 3D poster scrolling showcase with all project data, technical specifications, and visual design requirements!