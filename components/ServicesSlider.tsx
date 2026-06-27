"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import styles from "./ServicesSlider.module.css";

gsap.registerPlugin(ScrollTrigger);

const servicesData = [
  {
    id: 1,
    title: "OUR SERVICES",
    type: "ENTERPRISE ERP",
    description:
      "We build robust, scalable Enterprise Resource Planning (ERP) systems tailored to your business logic. Streamline operations, integrate workflows, and gain real-time data insights across your entire organization.",
    img: "/khemji wire.png",
  },
  {
    id: 2,
    title: "OUR SERVICES",
    type: "AI AUTOMATION",
    description:
      "Transform your operations with intelligent AI solutions. From customer service chatbots to automated data processing and predictive analytics, we bring the future of technology into your daily workflows.",
    img: "/shipbridge.png",
  },
  {
    id: 3,
    title: "OUR SERVICES",
    type: "WEB DEVELOPMENT",
    description:
      "Create stunning, high-performance websites and web applications. We specialize in modern frameworks to deliver fast, secure, and highly engaging digital experiences for your users.",
    img: "/aarya clothing.png",
  },
  {
    id: 4,
    title: "OUR SERVICES",
    type: "BRAND IDENTITY",
    description:
      "Stand out in a crowded market. We craft memorable brand identities, from logo design and typography to comprehensive brand guidelines that resonate with your target audience.",
    img: "/maac animation jaipur.png",
  },
];

export default function ServicesSlider() {
  const containerRef = useRef<HTMLElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const nextBtnRef = useRef<HTMLButtonElement>(null);
  const prevBtnRef = useRef<HTMLButtonElement>(null);

  useGSAP(() => {
    const slider = sliderRef.current;
    const nextBtn = nextBtnRef.current;
    const prevBtn = prevBtnRef.current;
    const container = containerRef.current;

    if (!slider || !nextBtn || !prevBtn || !container) return;

    const sliderList = slider.querySelector(`.${styles.list}`);
    const thumbnail = slider.querySelector(`.${styles.thumbnail}`);

    if (!sliderList || !thumbnail) return;

    // Initial setup: move first thumbnail to the end as per the vanilla JS
    const thumbnailItems = thumbnail.querySelectorAll(`.${styles.item}`);
    if (thumbnailItems.length > 0) {
      thumbnail.appendChild(thumbnailItems[0]);
    }

    const moveSlider = (direction: "next" | "prev", onComplete?: () => void) => {
      const sliderItems = sliderList.querySelectorAll(`.${styles.item}`);
      const currentThumbnailItems = thumbnail.querySelectorAll(`.${styles.item}`);

      if (direction === "next") {
        sliderList.appendChild(sliderItems[0]);
        thumbnail.appendChild(currentThumbnailItems[0]);
        slider.classList.add("slider-next");
      } else {
        sliderList.prepend(sliderItems[sliderItems.length - 1]);
        thumbnail.prepend(currentThumbnailItems[currentThumbnailItems.length - 1]);
        slider.classList.add("slider-prev");
      }

      slider.addEventListener(
        "animationend",
        () => {
          if (direction === "next") {
            slider.classList.remove("slider-next");
          } else {
            slider.classList.remove("slider-prev");
          }
          if (onComplete) onComplete();
        },
        { once: true }
      );
    };

    const handleNext = () => moveSlider("next");
    const handlePrev = () => moveSlider("prev");

    nextBtn.addEventListener("click", handleNext);
    prevBtn.addEventListener("click", handlePrev);

    // GSAP ScrollTrigger for automatic scroll-linked transitions
    let isAnimating = false;
    let scrollIndex = 0;
    const totalSegments = servicesData.length;

    const st = ScrollTrigger.create({
      trigger: container,
      start: "top top",
      end: () => `+=${window.innerHeight * totalSegments}`,
      pin: true,
      onUpdate: (self) => {
        if (isAnimating) return;
        const targetIndex = Math.floor(self.progress * totalSegments);
        const clampedTarget = Math.min(targetIndex, totalSegments - 1);
        
        if (clampedTarget > scrollIndex) {
          isAnimating = true;
          moveSlider("next", () => { isAnimating = false; });
          scrollIndex++;
        } else if (clampedTarget < scrollIndex) {
          isAnimating = true;
          moveSlider("prev", () => { isAnimating = false; });
          scrollIndex--;
        }
      }
    });

    return () => {
      nextBtn.removeEventListener("click", handleNext);
      prevBtn.removeEventListener("click", handlePrev);
      st.kill();
    };
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative w-full h-screen overflow-hidden">
      <div ref={sliderRef} className={styles.slider}>
      <div className={styles.list}>
        {servicesData.map((service) => (
          <div key={service.id} className={styles.item}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={service.img} alt={service.type} />
            <div className={styles.content}>
              <div className={styles.title}>{service.title}</div>
              <div className={styles.type}>{service.type}</div>
              <div className={styles.description}>{service.description}</div>
              <div className={styles.button}>
                <button>SEE MORE</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.thumbnail}>
        {servicesData.map((service) => (
          <div key={`thumb-${service.id}`} className={styles.item}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={service.img} alt={service.type} />
          </div>
        ))}
      </div>

      <div className={styles.arrowButtons}>
        <button ref={prevBtnRef} className={styles.prev}>
          {"<"}
        </button>
        <button ref={nextBtnRef} className={styles.next}>
          {">"}
        </button>
      </div>
      </div>
    </section>
  );
}
