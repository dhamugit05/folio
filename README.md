# Dhamotharan Samy — 3D Portfolio Web Application

A production-ready, interactive 3D developer portfolio engineered with **Vite, React 18, TypeScript (Strict), Three.js, Tailwind CSS, and Framer Motion**.

Built specifically for **Dhamotharan Samy**, Entry-Level Software Developer (Full Stack / Frontend) based in Chennai, India.

---

## ⚡ Quick Start

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Run Local Development Server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

3. **Run Unit Tests**:
   ```bash
   npx --yes tsx --test src/lib/portfolioUtils.test.ts
   ```

4. **Compile / Production Build**:
   ```bash
   npm run build
   ```

---

## 📂 Architecture & Directory Structure

```text
├── public/
│   ├── _redirects             # Netlify SPA router fallback
│   ├── favicon.svg            # Custom branded SVG favicon
│   ├── images/
│   │   ├── profile.svg        # Default high-res avatar vector
│   │   └── profile.jpg        # [Candidate portrait drop-in]
│   └── resume.pdf             # Candidate resume PDF download
├── src/
│   ├── components/
│   │   ├── canvas/
│   │   │   ├── HeroVisual3D.tsx     # Low-poly wireframe icosahedron & orbital rings
│   │   │   └── SceneBackground.tsx  # Dynamic interactive Three.js particle starfield
│   │   ├── sections/
│   │   │   ├── AIWorkflowSection.tsx    # Concrete, honest AI engineering integration
│   │   │   ├── EducationExperience.tsx  # BCA degree & engineering discipline cards
│   │   │   ├── SkillsConstellation.tsx  # Interactive skill cluster inspector
│   │   │   └── SkillsMarquee.tsx        # Right-to-left seamless marquee track
│   │   └── ui/
│   │       ├── CustomCursor.tsx     # Spring-interpolated custom cursor with interaction states
│   │       ├── CustomizerModal.tsx  # Live profile customizer drawer (Screenshot 2)
│   │       ├── Footer.tsx           # Accessible footer with copyright & back-to-top
│   │       ├── Navbar.tsx           # Sticky blurred header with theme toggle & customizer
│   │       ├── ProjectModal.tsx     # Deep-dive case study modal with architecture breakdown
│   │       └── Toast.tsx            # Animated notifications for copy/actions
│   ├── data/
│   │   └── portfolioData.ts         # Central typed source of truth for candidate info & projects
│   ├── hooks/
│   │   ├── useIsMobile.ts           # Responsive screen breakpoint detector
│   │   ├── useMouseParallax.ts      # Hardware-accelerated mouse tilt
│   │   ├── useReducedMotion.ts      # Accessibility prefers-reduced-motion hook
│   │   └── useTypewriter.ts         # Dynamic rotating specialization headline
│   ├── lib/
│   │   ├── portfolioUtils.ts        # Pure helpers: filtering, link sanity, form validation
│   │   └── portfolioUtils.test.ts   # Node built-in unit tests (ultra-mode compliant)
│   ├── pages/
│   │   ├── About.tsx                # Skills, education, and AI workflow
│   │   ├── Contact.tsx              # Validated contact form with mailto fallback
│   │   ├── Home.tsx                 # Split hero landing page with 3D canvas
│   │   └── Projects.tsx             # Slides carousel and List views
│   ├── store/
│   │   └── usePortfolioStore.ts     # Global state: theme, customizer, modals, cursor
│   ├── types/
│   │   └── index.ts                 # Strict TypeScript schemas
│   ├── App.tsx                      # Root shell with routes & lazy suspense
│   ├── index.css                    # Tailwind CSS v4 & custom scrollbars
│   └── main.tsx                     # React 18 DOM mount point with BrowserRouter
├── vercel.json                      # Vercel SPA route rewrite configuration
└── README.md
```

---

## 🎛️ Live Portfolio Customizer

Recruiters and visitors can click **"Customize"** in the top navigation bar to live-edit candidate information (name, title, bio, email, location, GitHub, LinkedIn, and resume/photo paths) with instant real-time reactivity across all pages.

---

## 📬 Contact Form Delivery & Email Setup

The contact page includes multiple guaranteed communication methods:

1. **Direct Formspree / EmailJS Integration**:
   - Create a free form at [formspree.io](https://formspree.io).
   - Add your endpoint URL to `.env`:
     ```env
     VITE_FORMSPREE_ENDPOINT=https://formspree.io/f/your_form_id
     ```
2. **Guaranteed Fail-Safe Mailto Fallback**:
   - If no API endpoint is provided or the network call fails, the app automatically triggers a prefilled mailto link directed to `dhamotharanpers@gmail.com` with the visitor's subject, name, and message body.
3. **One-Click Email Copy & Direct Mail Button**:
   - The "Copy Email" button copies `dhamotharanpers@gmail.com` to clipboard and triggers a toast notification with fallback support.

---

## 🌐 Deployment to Netlify & Vercel

The portfolio includes zero-config single page app rewrite rules:
- **Netlify**: `public/_redirects` contains `/* /index.html 200` to prevent 404s on browser reloads.
- **Vercel**: `vercel.json` contains route rewrites.

---

## 🛠️ Customization Checklist

- [x] **Photo**: Add your portrait photo to `/public/images/profile.jpg` (or use the built-in styled SVG avatar in `/public/images/profile.svg`).
- [x] **Resume**: Place your updated PDF in `/public/resume.pdf`.
- [x] **Horolo Live Demo**: Live at `https://horolo.netlify.app/`.
- [x] **Volt Storefront Live Demo**: Live at `https://voltecom.netlify.app/`.
- [x] **Task Manager**: Django REST + React project documented; live button hidden automatically until deployment.
- [x] **LinkedIn & GitHub**: Linked directly to `dhamotharansamy-` and `dhamugit05`.
