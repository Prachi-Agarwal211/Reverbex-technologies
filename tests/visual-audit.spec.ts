import { test, expect } from '@playwright/test';

/**
 * Reverbex Technologies - Visual & Performance Audit Tests
 * Tests for Awwwards-style animations, smooth scrolling, and responsive design
 */

test.describe('Reverbex Technologies - Visual Audit', () => {
  
  // Test desktop viewport (1920x1080)
  test('should render correctly on desktop (1920x1080)', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('http://localhost:3000');
    
    // Wait for page to load
    await expect(page.locator('#home')).toBeVisible();
    
    // Take screenshot
    await page.screenshot({ 
      path: 'test-results/desktop-home.png',
      fullPage: false 
    });
    
    // Verify hero section is visible
    const heroHeading = page.locator('h1');
    await expect(heroHeading).toBeVisible();
    await expect(heroHeading).toContainText('Architects of Intelligence');
    
    // Verify custom cursor is present (desktop only)
    const cursor = page.locator('[class*="cursor"]');
    await expect(cursor.first()).toBeVisible();
    
    // Scroll down and verify smooth scroll
    await page.evaluate(() => window.scrollTo(0, 1000));
    await page.waitForTimeout(500);
    
    // Verify services section
    const servicesSection = page.locator('#services');
    await expect(servicesSection).toBeVisible();
    
    // Take screenshot after scroll
    await page.screenshot({ 
      path: 'test-results/desktop-services.png',
      fullPage: false 
    });
  });

  // Test laptop viewport (1366x768)
  test('should render correctly on laptop (1366x768)', async ({ page }) => {
    await page.setViewportSize({ width: 1366, height: 768 });
    await page.goto('http://localhost:3000');
    
    await expect(page.locator('#home')).toBeVisible();
    
    // Take screenshot
    await page.screenshot({ 
      path: 'test-results/laptop-home.png',
      fullPage: false 
    });
    
    // Verify navigation is visible
    const nav = page.locator('nav');
    await expect(nav).toBeVisible();
    
    // Verify CTA buttons
    const ctaButton = page.locator('a[href="#services"]');
    await expect(ctaButton.first()).toBeVisible();
  });

  // Test mobile viewport (375x667 - iPhone SE)
  test('should render correctly on mobile (375x667)', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('http://localhost:3000');
    
    await expect(page.locator('#home')).toBeVisible();
    
    // Take screenshot
    await page.screenshot({ 
      path: 'test-results/mobile-home.png',
      fullPage: true 
    });
    
    // Verify custom cursor is NOT present on mobile
    const cursor = page.locator('[class*="cursor"]');
    await expect(cursor.first()).not.toBeVisible();
    
    // Verify hamburger menu is visible
    const hamburgerButton = page.locator('button[aria-label*="menu"]');
    await expect(hamburgerButton.first()).toBeVisible();
    
    // Verify hero heading is visible and properly sized
    const heroHeading = page.locator('h1');
    await expect(heroHeading).toBeVisible();
    
    // Scroll down on mobile
    await page.evaluate(() => window.scrollTo(0, 500));
    await page.waitForTimeout(500);
    
    // Take screenshot after scroll
    await page.screenshot({ 
      path: 'test-results/mobile-scroll.png',
      fullPage: false 
    });
  });

  // Test mobile viewport (414x896 - iPhone 11)
  test('should render correctly on large mobile (414x896)', async ({ page }) => {
    await page.setViewportSize({ width: 414, height: 896 });
    await page.goto('http://localhost:3000');
    
    await expect(page.locator('#home')).toBeVisible();
    
    // Take screenshot
    await page.screenshot({ 
      path: 'test-results/mobile-large-home.png',
      fullPage: false 
    });
  });

  // Test tablet viewport (768x1024)
  test('should render correctly on tablet (768x1024)', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('http://localhost:3000');
    
    await expect(page.locator('#home')).toBeVisible();
    
    // Take screenshot
    await page.screenshot({ 
      path: 'test-results/tablet-home.png',
      fullPage: false 
    });
  });

  // Test animations are working
  test('should have GSAP animations working', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('http://localhost:3000');
    
    // Wait for animations to initialize
    await page.waitForTimeout(1000);
    
    // Check if elements have transform styles (GSAP animation indicator)
    const heroContent = page.locator('#home').locator('div').first();
    const styles = await heroContent.getAttribute('style');
    
    // GSAP should add inline styles for animations
    expect(styles).toBeTruthy();
  });

  // Test Lenis smooth scrolling is initialized
  test('should have Lenis smooth scrolling initialized', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('http://localhost:3000');
    
    // Wait for Lenis to initialize
    await page.waitForTimeout(1000);
    
    // Check if Lenis is attached to window
    const hasLenis = await page.evaluate(() => {
      return typeof (window as any).lenis !== 'undefined';
    });
    
    expect(hasLenis).toBe(true);
    
    // Check if html element has lenis class
    const htmlClass = await page.locator('html').getAttribute('class');
    expect(htmlClass).toContain('lenis');
  });

  // Test all sections are present
  test('should have all required sections', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('http://localhost:3000');
    
    // Check all sections exist
    await expect(page.locator('#home')).toBeVisible();
    await expect(page.locator('#services')).toBeVisible();
    await expect(page.locator('#capabilities')).toBeVisible();
    await expect(page.locator('#founders')).toBeVisible();
    await expect(page.locator('#contact')).toBeVisible();
  });

  // Test navigation links work
  test('should navigate to sections on click', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('http://localhost:3000');
    
    // Click on Services nav link
    const servicesLink = page.locator('nav').getByText('Services').first();
    await servicesLink.click();
    
    // Wait for scroll animation
    await page.waitForTimeout(1000);
    
    // Verify we're at services section
    const servicesSection = page.locator('#services');
    await expect(servicesSection).toBeInViewport();
  });

  // Test performance - no layout shift
  test('should have minimal layout shift', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    
    // Measure CLS
    const cls = await page.evaluate(() => {
      return new Promise((resolve) => {
        let clsValue = 0;
        const observer = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (!(entry as any).hadRecentInput) {
              clsValue += (entry as any).value;
            }
          }
        });
        
        observer.observe({ type: 'layout-shift', buffered: true });
        
        // Give it 3 seconds to measure
        setTimeout(() => {
          observer.disconnect();
          resolve(clsValue);
        }, 3000);
      });
    });
    
    // CLS should be less than 0.1 (good threshold)
    expect(cls).toBeLessThan(0.1);
  });

  // Test images have proper dimensions (no CLS)
  test('should have images with explicit dimensions', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('http://localhost:3000');
    
    // Check logo has dimensions
    const logo = page.locator('img[alt="Reverbex"]').first();
    const logoWidth = await logo.getAttribute('width');
    const logoHeight = await logo.getAttribute('height');
    
    expect(logoWidth).toBeTruthy();
    expect(logoHeight).toBeTruthy();
  });

  // Test hover effects on desktop
  test('should have hover effects on interactive elements', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto('http://localhost:3000');
    
    // Hover over CTA button
    const ctaButton = page.locator('a[href="#services"]').first();
    await ctaButton.hover();
    
    // Wait for hover effect
    await page.waitForTimeout(300);
    
    // Take screenshot of hover state
    await page.screenshot({ 
      path: 'test-results/desktop-hover.png',
      fullPage: false 
    });
  });

  // Test mobile menu
  test('should open mobile menu on click', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('http://localhost:3000');
    
    // Click hamburger menu
    const hamburgerButton = page.locator('button[aria-label*="menu"]').first();
    await hamburgerButton.click();
    
    // Wait for animation
    await page.waitForTimeout(500);
    
    // Verify mobile menu is open
    const mobileMenu = page.locator('#mobile-menu');
    await expect(mobileMenu).toBeVisible();
    
    // Take screenshot
    await page.screenshot({ 
      path: 'test-results/mobile-menu-open.png',
      fullPage: false 
    });
  });
});
