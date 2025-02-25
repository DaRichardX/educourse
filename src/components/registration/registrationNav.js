import React, {useEffect, useState} from "react";
import { Shuffle } from "@phosphor-icons/react";

export default function RegistrationNav({
  user,
  hasScrolledPastHero, randomizeRoom
}) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 900);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className={`nav ${hasScrolledPastHero ? "nav-full" : ""}`}>
      <div className="nav-left">
        <img
          src={`/assets/${hasScrolledPastHero ? "logo--dark" : "logo"}.svg`}
          alt="logo"
          className="nav-logo"
        />
      </div>

      <div className="nav-right">
        {(hasScrolledPastHero || isMobile) && <SearchBar/>}
        {(hasScrolledPastHero || isMobile) && <button onClick={randomizeRoom}
                className="random-btn">
          <Shuffle className="w-4 h-4 text-gray-500"/>
          <span>Random Room</span>
        </button>}
        <img
          src="/assets/uhill.png"
          alt="user"
          className="user-photo"
        />
      </div>
    </div>
  );
}

function SearchBar() {
  return (
    <div className="search-bar-container">
      <input
        type="text"
        placeholder="Filter by presenter or room"
        className="search-input"
      />

    </div>
  );
}
