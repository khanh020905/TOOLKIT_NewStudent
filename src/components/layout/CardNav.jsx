import React, { useLayoutEffect, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { GoArrowUpRight } from "react-icons/go";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const CardNav = ({
  logo,
  logoAlt = "Logo",
  items,
  className = "",
  ease = "power3.out",
  baseColor = "#fff",
  menuColor,
  buttonBgColor,
  buttonTextColor,
}) => {
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";
  const { user } = useAuth();

  // On non-home pages, always use dark text; on home, switch at 60% scroll
  const isDark = !isHome || scrolled;

  const isExpandedRef = useRef(isExpanded);
  useEffect(() => {
    isExpandedRef.current = isExpanded;
  }, [isExpanded]);

  // Smoothly close menu on route change
  useEffect(() => {
    const handleClose = () => {
      setIsExpanded(false);
      setIsHamburgerOpen(false);
      // Recreate timeline fresh after close to avoid GSAP getting stuck
      if (tlRef.current) {
        tlRef.current.kill();
      }
      tlRef.current = createTimeline();
    };

    if (tlRef.current && isExpandedRef.current) {
      // Reverse the animation smoothly
      setIsHamburgerOpen(false);
      tlRef.current.eventCallback("onReverseComplete", handleClose);
      tlRef.current.reverse();
    } else {
      handleClose();
    }
  }, [location.pathname]);

  // Detect scroll past hero
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > window.innerHeight * 0.6);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const navRef = useRef(null);
  const cardsRef = useRef([]);
  const tlRef = useRef(null);

  const calculateHeight = () => {
    const navEl = navRef.current;
    if (!navEl) return 260; // Fallback only if ref is missing

    const contentEl = navEl.querySelector(".card-nav-content");
    if (!contentEl) return 260;

    // Temporarily make content visible and absolute to measure its true scroll height
    const wasVisible = contentEl.style.visibility;
    const wasPointerEvents = contentEl.style.pointerEvents;
    const wasPosition = contentEl.style.position;
    const wasHeight = contentEl.style.height;

    contentEl.style.visibility = "visible";
    contentEl.style.pointerEvents = "auto";
    contentEl.style.position = "static";
    contentEl.style.height = "auto";

    // Force reflow
    contentEl.offsetHeight;

    const topBar = 60;
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    // On desktop, we want to accommodate the maximum height of the flex children
    // padding for desktop is 12px (p-3) at bottom
    // padding for mobile is 12px (p-3) at bottom
    const bottomPadding = 12;
    const contentHeight = contentEl.scrollHeight;

    // Restore original styles
    contentEl.style.visibility = wasVisible;
    contentEl.style.pointerEvents = wasPointerEvents;
    contentEl.style.position = wasPosition;
    contentEl.style.height = wasHeight;

    return topBar + contentHeight + bottomPadding;
  };

  const createTimeline = () => {
    const navEl = navRef.current;
    if (!navEl) return null;

    gsap.set(navEl, { height: 60, overflow: "hidden" });
    gsap.set(cardsRef.current, { y: 50, opacity: 0 });

    const tl = gsap.timeline({ paused: true });

    tl.to(navEl, {
      height: calculateHeight,
      duration: 0.4,
      ease,
    });

    tl.to(
      cardsRef.current,
      { y: 0, opacity: 1, duration: 0.4, ease, stagger: 0.08 },
      "-=0.1",
    );

    return tl;
  };

  useLayoutEffect(() => {
    const tl = createTimeline();
    tlRef.current = tl;

    return () => {
      tl?.kill();
      tlRef.current = null;
    };
  }, [ease, items]);

  useLayoutEffect(() => {
    const handleResize = () => {
      if (!tlRef.current) return;

      if (isExpanded) {
        const newHeight = calculateHeight();
        gsap.set(navRef.current, { height: newHeight });

        tlRef.current.kill();
        const newTl = createTimeline();
        if (newTl) {
          newTl.progress(1);
          tlRef.current = newTl;
        }
      } else {
        tlRef.current.kill();
        const newTl = createTimeline();
        if (newTl) {
          tlRef.current = newTl;
        }
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isExpanded]);

  const toggleMenu = () => {
    const tl = tlRef.current;
    if (!tl) return;
    if (!isExpanded) {
      setIsHamburgerOpen(true);
      setIsExpanded(true);
      tl.play(0);
    } else {
      setIsHamburgerOpen(false);
      tl.eventCallback("onReverseComplete", () => {
        setIsExpanded(false);
        // Recreate timeline so subsequent clicks work properly
        if (tlRef.current) tlRef.current.kill();
        tlRef.current = createTimeline();
      });
      tl.reverse();
    }
  };

  const setCardRef = (i) => (el) => {
    if (el) cardsRef.current[i] = el;
  };

  return (
    <div
      className={`card-nav-container fixed left-1/2 -translate-x-1/2 w-[90%] max-w-[1000px] z-[99] top-4 md:top-6 ${className}`}
    >
      <nav
        ref={navRef}
        className={`card-nav ${isExpanded ? "open" : ""} block h-[60px] p-0 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] backdrop-blur-xl relative overflow-hidden will-change-[height] transition-all duration-500 ${isDark ? "border border-surface-200" : "border border-white/30"}`}
        style={{
          backgroundColor: isDark
            ? "rgba(255, 255, 255, 0.92)"
            : "rgba(255, 255, 255, 0.15)",
        }}
      >
        <div className="card-nav-top absolute inset-x-0 top-0 h-[60px] flex items-center justify-between px-4 sm:px-6 z-[2]">
          {/* HAMBURGER (Left) */}
          <div className="flex-1 flex justify-start">
            <div
              className={`hamburger-menu group h-[30px] w-[30px] relative flex flex-col items-center justify-center cursor-pointer`}
              onClick={toggleMenu}
              role="button"
              aria-label={isExpanded ? "Đóng menu" : "Mở menu"}
              tabIndex={0}
              style={{
                color: isDark ? "#0f1647" : "#fff",
                transition: "color 0.5s",
              }}
            >
              <div
                className={`absolute w-[24px] h-[2px] bg-current rounded-full transition-all duration-300 ease-in-out ${
                  isHamburgerOpen ? "rotate-45" : "-translate-y-[4px]"
                }`}
              />
              <div
                className={`absolute w-[24px] h-[2px] bg-current rounded-full transition-all duration-300 ease-in-out ${
                  isHamburgerOpen ? "-rotate-45" : "translate-y-[4px]"
                }`}
              />
            </div>
          </div>

          {/* LOGO (Center) */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none">
            <Link
              to="/"
              className="flex items-center gap-2 no-underline cursor-pointer pointer-events-auto"
            >
              {typeof logo === "string" ? (
                <img
                  src={logo}
                  alt={logoAlt}
                  className="h-6 sm:h-7 w-auto object-contain"
                />
              ) : (
                logo
              )}
              <span
                className={`font-(family-name:--font-heading) font-bold text-lg sm:text-xl tracking-tight transition-colors duration-500 ${isDark ? "text-primary-950" : "text-white"}`}
              >
                AIToolkit
              </span>
            </Link>
          </div>

          {/* CTA (Right) */}
          <div className="flex-1 flex justify-end">
            {user ? (
              <Link
                to="/dashboard"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-primary-600 flex items-center justify-center text-white font-bold text-sm hover:bg-primary-700 transition-colors hover:scale-105 active:scale-95"
                title={user.name}
              >
                {user.name.charAt(0).toUpperCase()}
              </Link>
            ) : (
              <Link
                to="/register"
                className="inline-flex items-center justify-center h-9 sm:h-10 px-4 sm:px-6 rounded-xl font-semibold text-sm transition-all duration-300 hover:scale-105 active:scale-95 hover:shadow-[0_0_20px_rgba(37,69,234,0.3)] bg-primary-600 text-white"
              >
                Đăng ký ngay
              </Link>
            )}
          </div>
        </div>

        {/* EXPANDED CONTENT (THE CARDS) */}
        <div
          className={`card-nav-content absolute left-0 right-0 top-[60px] bottom-0 p-3 pt-0 flex flex-col items-stretch gap-3 justify-start z-[1] ${
            isExpanded
              ? "visible pointer-events-auto"
              : "invisible pointer-events-none"
          } md:flex-row md:items-stretch`}
          aria-hidden={!isExpanded}
        >
          {(items || []).slice(0, 4).map((item, idx) => (
            <div
              key={`${item.label}-${idx}`}
              className="nav-card select-none relative flex flex-col gap-4 p-5 rounded-xl flex-1 group"
              ref={setCardRef(idx)}
              style={{ backgroundColor: item.bgColor, color: item.textColor }}
            >
              <div className="nav-card-label font-semibold tracking-tight text-xl md:text-2xl opacity-90 group-hover:opacity-100 transition-opacity">
                {item.label}
              </div>
              <div className="nav-card-links mt-auto flex flex-col gap-3">
                {item.links?.map((lnk, i) => (
                  <Link
                    key={`${lnk.label}-${i}`}
                    className="nav-card-link inline-flex items-center justify-between gap-2 no-underline cursor-pointer group/link hover:bg-white/10 p-2 rounded-lg -mx-2 transition-colors duration-200"
                    to={lnk.href}
                    aria-label={lnk.ariaLabel}
                    onClick={() => {
                      // Close menu when a link is clicked
                      if (isExpanded) toggleMenu();
                    }}
                  >
                    <span className="text-sm md:text-base font-medium opacity-80 group-hover/link:opacity-100 transition-opacity">
                      {lnk.label}
                    </span>
                    <GoArrowUpRight
                      className="opacity-0 -translate-x-2 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all duration-300"
                      aria-hidden="true"
                    />
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default CardNav;
