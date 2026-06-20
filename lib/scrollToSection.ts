export function scrollToSection(sectionId: string) {
  const element = document.getElementById(sectionId);
  if (element) {
    const offset = 80;
    const elementPosition = element.getBoundingClientRect().top + window.scrollY;
    const targetPosition = elementPosition - offset;

    if ((window as any).lenis) {
      (window as any).lenis.scrollTo(targetPosition, {
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    } else {
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  }
}
