/**
 * Portfolio Website - Main JavaScript
 * Features: Framer Motion animations, scroll interactions, mouse tracking, performance optimized
 */

// Wait for DOM to be ready
document.addEventListener("DOMContentLoaded", () => {
  // Initialize Lucide icons
  if (typeof lucide !== "undefined") {
    lucide.createIcons();
  }

  // Initialize Lenis Smooth Scroll (Framer-style)
  const lenis = initLenisScroll();

  // Check if Framer Motion is loaded
  const motionAvailable =
    typeof window.Motion !== "undefined" && window.Motion.animate;

  // Initialize all modules
  if (motionAvailable) {
    initFramerMotion();
  } else {
    // Fallback to CSS animations
    initCSSAnimations();
  }

  initHeroAnimations(lenis);
  initMouseTracking();
  initScrollInteractions();
  initTimelineAnimation(lenis);
  initMobileMenu();
  initSmoothScroll(lenis);
  initNavbarScroll(lenis);
  initAboutTextAnimation(lenis);
  initProjectCards();
  initLazyLoading();
});

/**
 * Initialize Lenis Smooth Scroll (Framer-style)
 */
function initLenisScroll() {
  if (typeof Lenis === 'undefined') {
    console.warn('Lenis not loaded, using native scroll');
    return null;
  }

  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easeOutExpo
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
  });

  // Animation frame loop
  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);

  // Expose lenis globally for debugging
  window.lenis = lenis;

  return lenis;
}

/**
 * CSS Fallback Animations (when Framer Motion is not available)
 */
function initCSSAnimations() {
  // Add visible class to elements for CSS transitions
  const animatedElements = document.querySelectorAll(
    ".hero-title, .hero-subtitle, .about-title, .about-description, .experience-title, .experience-item, .work-title, .project-card",
  );

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-in");
        }
      });
    },
    { threshold: 0.1, rootMargin: "-50px" },
  );

  animatedElements.forEach((el) => observer.observe(el));

  // Immediate animation for hero
  setTimeout(() => {
    document.querySelector(".hero-title")?.classList.add("animate-in");
    setTimeout(() => {
      document.querySelector(".hero-subtitle")?.classList.add("animate-in");
    }, 300);
  }, 200);
}

/**
 * Framer Motion Animations
 */
function initFramerMotion() {
  const { animate, inView } = window.Motion;

  // Hero entrance animations
  const heroTitle = document.querySelector(".hero-title");
  const heroSubtitle = document.querySelector(".hero-subtitle");

  if (heroTitle) {
    animate(
      heroTitle,
      { y: [100, 0], opacity: [0, 1] },
      { duration: 1, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.2 },
    );
  }

  if (heroSubtitle) {
    animate(
      heroSubtitle,
      { y: [50, 0], opacity: [0, 1] },
      { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.5 },
    );
  }

  // About section title animation
  const aboutTitle = document.querySelector(".about-title");
  if (aboutTitle) {
    inView(
      aboutTitle,
      (element) => {
        animate(
          element,
          { y: [60, 0], opacity: [0, 1] },
          { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
        );
      },
      { margin: "-100px" },
    );
  }

  // About content stagger
  const aboutDescriptions = document.querySelectorAll(".about-description");
  aboutDescriptions.forEach((desc, index) => {
    inView(
      desc,
      (element) => {
        animate(
          element,
          { y: [40, 0], opacity: [0, 1] },
          { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94], delay: index * 0.1 },
        );
      },
      { margin: "-50px" },
    );
  });

  // Experience title animation
  const experienceTitle = document.querySelector(".experience-title");
  if (experienceTitle) {
    inView(
      experienceTitle,
      (element) => {
        animate(
          element,
          { y: [60, 0], opacity: [0, 1] },
          { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
        );
      },
      { margin: "-100px" },
    );
  }

  // Work title animation
  const workTitle = document.querySelector(".work-title");
  if (workTitle) {
    inView(
      workTitle,
      (element) => {
        animate(
          element,
          { y: [60, 0], opacity: [0, 1] },
          { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
        );
      },
      { margin: "-100px" },
    );
  }

  // Project cards stagger animation
  const projectCards = document.querySelectorAll(".project-card");
  projectCards.forEach((card, index) => {
    inView(
      card,
      (element) => {
        animate(
          element,
          { y: [80, 0], opacity: [0, 1], scale: [0.95, 1] },
          {
            duration: 0.8,
            ease: [0.25, 0.46, 0.45, 0.94],
            delay: index * 0.15,
          },
        );
      },
      { margin: "-50px", once: true },
    );
  });

  // Experience items stagger
  const experienceItems = document.querySelectorAll(".experience-item");
  experienceItems.forEach((item, index) => {
    inView(
      item,
      (element) => {
        animate(
          element,
          { x: [40, 0], opacity: [0, 1] },
          {
            duration: 0.6,
            ease: [0.25, 0.46, 0.45, 0.94],
            delay: index * 0.1,
          },
        );
      },
      { margin: "-50px" },
    );
  });

  // Footer fade in
  const footer = document.querySelector("footer");
  if (footer) {
    inView(
      footer,
      (element) => {
        animate(
          element,
          { y: [40, 0], opacity: [0, 1] },
          { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
        );
      },
      { margin: "-100px" },
    );
  }
}

/**
 * Hero Section Animations
 */
function initHeroAnimations(lenis) {
  const hero = document.getElementById("hero");
  const heroContent = document.getElementById("hero-content");
  const scrollIndicator = document.getElementById("scroll-indicator");

  if (!hero || !heroContent) return;

  // Handle scroll for blur and fade effects
  const updateHero = () => {
    const scrollY = lenis ? lenis.scroll : window.scrollY;
    const heroHeight = hero.offsetHeight;
    const blurStart = heroHeight * 0.3;
    const blurEnd = heroHeight * 0.8;

    // Calculate progress for content fade (starts immediately)
    const fadeProgress = Math.min(scrollY / (heroHeight * 0.5), 1);

    // Fade and scale hero content
    heroContent.style.opacity = 1 - fadeProgress;
    heroContent.style.transform = `scale(${1 - fadeProgress * 0.1}) translateY(${fadeProgress * 30}px)`;

    // Hide scroll indicator
    if (scrollIndicator) {
      scrollIndicator.style.opacity = Math.max(0, 0.6 - fadeProgress);
    }

    // Add blur effect when about section starts to cover hero
    if (scrollY > blurStart) {
      const blurProgress = Math.min(
        (scrollY - blurStart) / (blurEnd - blurStart),
        1,
      );
      hero.classList.add("hero-blur");
      // Adjust blur intensity based on scroll
      hero.style.filter = `blur(${blurProgress * 15}px) brightness(${1 - blurProgress * 0.5})`;
    } else {
      hero.classList.remove("hero-blur");
      hero.style.filter = "none";
    }
  };

  if (lenis) {
    lenis.on('scroll', updateHero);
  } else {
    window.addEventListener('scroll', updateHero, { passive: true });
  }
}

/**
 * Mouse Tracking for Project Preview
 */
function initMouseTracking() {
  const hero = document.getElementById("hero");
  const previewImages = document.querySelectorAll(".project-preview-image");

  if (!hero || previewImages.length === 0) return;

  let currentIndex = 0;
  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let targetX = mouseX;
  let targetY = mouseY;
  let lastImageChange = 0;
  let rafId = null;
  let isActive = true;

  // Throttled mouse move handler
  hero.addEventListener(
    "mousemove",
    (e) => {
      if (!isActive) return;

      const rect = hero.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;

      // Change image based on horizontal position (throttled)
      const now = Date.now();
      if (now - lastImageChange > 800) {
        const section = Math.floor(
          (mouseX / rect.width) * previewImages.length,
        );
        const newIndex = Math.max(
          0,
          Math.min(section, previewImages.length - 1),
        );

        if (newIndex !== currentIndex) {
          // Fade out current
          previewImages[currentIndex].classList.remove("active");

          // Fade in new
          setTimeout(() => {
            previewImages[newIndex].classList.add("active");
          }, 100);

          currentIndex = newIndex;
          lastImageChange = now;
        }
      }
    },
    { passive: true },
  );

  // Smooth parallax animation loop
  function animateParallax() {
    if (!isActive) return;

    // Smooth lerp
    targetX += (mouseX - targetX) * 0.08;
    targetY += (mouseY - targetY) * 0.08;

    // Apply parallax to active image
    const activeImage = previewImages[currentIndex];
    if (activeImage && activeImage.classList.contains("active")) {
      const offsetX = (targetX - window.innerWidth / 2) * 0.03;
      const offsetY = (targetY - window.innerHeight / 2) * 0.03;
      activeImage.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(1)`;
    }

    rafId = requestAnimationFrame(animateParallax);
  }

  // Start animation loop
  animateParallax();

  // Activate first image after a delay
  setTimeout(() => {
    previewImages[0].classList.add("active");
  }, 1000);

  // Cleanup on visibility change
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      isActive = false;
      if (rafId) cancelAnimationFrame(rafId);
    } else {
      isActive = true;
      animateParallax();
    }
  });
}

/**
 * Scroll Interactions
 */
function initScrollInteractions() {
  // Intersection Observer for section animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "-50px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
      }
    });
  }, observerOptions);

  // Observe all sections
  document.querySelectorAll("section").forEach((section) => {
    observer.observe(section);
  });
}

/**
 * Timeline Animation
 */
function initTimelineAnimation(lenis) {
  const timelineLine = document.getElementById("timeline-line");
  const experienceItems = document.querySelectorAll(".experience-item");
  const experienceSection = document.getElementById("experience");

  if (!timelineLine || !experienceSection) return;

  function updateTimeline() {
    const rect = experienceSection.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    // Calculate progress based on section position
    const sectionTop = rect.top;
    const sectionHeight = rect.height;

    // Start animation when section enters viewport
    const startOffset = windowHeight * 0.3;
    const progress = Math.max(
      0,
      Math.min(1, (startOffset - sectionTop) / (sectionHeight * 0.7)),
    );

    // Update timeline line height
    timelineLine.style.height = `${progress * 100}%`;

    // Activate dots based on progress
    experienceItems.forEach((item, index) => {
      const dot = item.querySelector(".experience-dot");
      const itemThreshold = (index + 1) / experienceItems.length;

      if (progress >= itemThreshold * 0.7) {
        dot?.classList.add("active");
      } else {
        dot?.classList.remove("active");
      }
    });
  }

  if (lenis) {
    lenis.on('scroll', updateTimeline);
  } else {
    window.addEventListener('scroll', updateTimeline, { passive: true });
  }

  // Initial call
  updateTimeline();
}

/**
 * Mobile Menu
 */
function initMobileMenu() {
  const menuBtn = document.getElementById("mobile-menu-btn");
  const menuClose = document.getElementById("mobile-menu-close");
  const mobileMenu = document.getElementById("mobile-menu");
  const mobileLinks = document.querySelectorAll(".mobile-nav-link");

  if (!menuBtn || !mobileMenu) return;

  function openMenu() {
    mobileMenu.classList.remove("hidden");
    document.body.style.overflow = "hidden";
    menuBtn.setAttribute("aria-expanded", "true");
  }

  function closeMenu() {
    mobileMenu.classList.add("hidden");
    document.body.style.overflow = "";
    menuBtn.setAttribute("aria-expanded", "false");
  }

  menuBtn.addEventListener("click", openMenu);
  menuClose?.addEventListener("click", closeMenu);

  mobileLinks.forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  // Close on escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !mobileMenu.classList.contains("hidden")) {
      closeMenu();
    }
  });
}

/**
 * Smooth Scroll for Anchor Links
 */
function initSmoothScroll(lenis) {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));

      if (target) {
        const offsetTop = target.offsetTop - 80; // Account for fixed nav
        
        if (lenis) {
          lenis.scrollTo(offsetTop, {
            duration: 1.5,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
          });
        } else {
          window.scrollTo({
            top: offsetTop,
            behavior: "smooth",
          });
        }
      }
    });
  });
}

/**
 * Navbar Scroll Effect
 */
function initNavbarScroll(lenis) {
  const navbar = document.getElementById("navbar");
  if (!navbar) return;

  const updateNavbar = () => {
    const currentScroll = lenis ? lenis.scroll : window.scrollY;

    // Add background blur after scrolling
    if (currentScroll > 50) {
      navbar.style.backgroundColor = "rgba(15, 15, 15, 0.8)";
      navbar.style.backdropFilter = "blur(12px)";
      navbar.style.borderBottom = "1px solid rgba(255, 255, 255, 0.1)";
    } else {
      navbar.style.backgroundColor = "transparent";
      navbar.style.backdropFilter = "none";
      navbar.style.borderBottom = "none";
    }
  };

  if (lenis) {
    lenis.on('scroll', updateNavbar);
  } else {
    window.addEventListener('scroll', updateNavbar, { passive: true });
  }
}

/**
 * About Text Color Animation on Scroll
 */
function initAboutTextAnimation(lenis) {
  const aboutText = document.getElementById("about-text");
  const aboutSection = document.getElementById("about");

  if (!aboutText || !aboutSection) return;

  function updateTextColor() {
    const rect = aboutSection.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    // Calculate progress through the section
    const progress = Math.max(0, Math.min(1, 1 - rect.top / windowHeight));

    // Interpolate between white/70 and white/90
    const opacity = 0.7 + progress * 0.2;
    aboutText.style.color = `rgba(255, 255, 255, ${opacity})`;
  }

  if (lenis) {
    lenis.on('scroll', updateTextColor);
  } else {
    window.addEventListener('scroll', updateTextColor, { passive: true });
  }
}

/**
 * Project Cards Enhancement
 */
function initProjectCards() {
  const cards = document.querySelectorAll(".project-card");

  cards.forEach((card) => {
    // 3D tilt effect on hover (subtle)
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  });
}

/**
 * Performance: Lazy load images that are not critical
 */
function initLazyLoading() {
  if ("IntersectionObserver" in window) {
    const imageObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
              img.src = img.dataset.src;
            }
            img.classList.add("loaded");
            observer.unobserve(img);
          }
        });
      },
      {
        rootMargin: "50px",
      },
    );

    document.querySelectorAll('img[loading="lazy"]').forEach((img) => {
      imageObserver.observe(img);
    });
  }
}

/**
 * Prefers reduced motion check
 */
const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
);

if (prefersReducedMotion.matches) {
  // Disable complex animations
  document.documentElement.style.setProperty("--animation-duration", "0s");
  document.documentElement.classList.add("reduce-motion");
}

// Listen for changes
prefersReducedMotion.addEventListener("change", (e) => {
  if (e.matches) {
    document.documentElement.style.setProperty("--animation-duration", "0s");
    document.documentElement.classList.add("reduce-motion");
  } else {
    document.documentElement.style.removeProperty("--animation-duration");
    document.documentElement.classList.remove("reduce-motion");
  }
});
