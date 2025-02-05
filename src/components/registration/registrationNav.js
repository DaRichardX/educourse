import React from "react";
import { Shuffle } from "@phosphor-icons/react";

export default function RegistrationNav({
  user,
  hasScrolledPastHero,
}) {
  const isMobile = window.innerWidth <= 900;

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
        {(hasScrolledPastHero || isMobile) && <SearchBar />}
        <img
          src="/assets/image-minimal-1.png"
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
      <button className="search-btn">
        <Shuffle size={24} weight="fill" />
      </button>
    </div>
  );
}
