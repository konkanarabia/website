import React from "react";

export function FacebookIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Facebook">
      <circle cx="12" cy="12" r="12" fill="#1877F2" />
      <path
        d="M15.14 12.35l.48-3.13h-3v-2.03c0-.86.42-1.7 1.77-1.7h1.37V2.82c-.8-.11-1.61-.17-2.43-.17-2.48 0-4.1 1.5-4.1 4.23v2.34H6.5v3.13h2.73V20.5a12.06 12.06 0 003.5 0V12.35h2.41z"
        fill="white"
      />
    </svg>
  );
}

export function InstagramIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Instagram">
      <defs>
        <linearGradient id="igIconGradient" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#f09433" />
          <stop offset="25%" stopColor="#e6683c" />
          <stop offset="50%" stopColor="#dc2743" />
          <stop offset="75%" stopColor="#cc2366" />
          <stop offset="100%" stopColor="#bc1888" />
        </linearGradient>
      </defs>
      <rect width="24" height="24" rx="6.5" fill="url(#igIconGradient)" />
      <rect x="5.25" y="5.25" width="13.5" height="13.5" rx="3.8" stroke="white" strokeWidth="1.6" fill="none" />
      <circle cx="12" cy="12" r="3.4" stroke="white" strokeWidth="1.6" fill="none" />
      <circle cx="15.8" cy="8.2" r="1" fill="white" />
    </svg>
  );
}

export function YoutubeIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="YouTube">
      <path
        d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814z"
        fill="#FF0000"
      />
      <path d="M9.545 15.568V8.432L15.818 12l-6.273 3.568z" fill="white" />
    </svg>
  );
}

export function WhatsAppIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="WhatsApp">
      <circle cx="12" cy="12" r="12" fill="#25D366" />
      <path
        d="M17.507 14.362c-.286-.144-1.696-.837-1.958-.933-.263-.096-.455-.144-.647.144-.191.287-.743.933-.911 1.124-.168.192-.336.216-.623.072-.287-.144-1.21-.446-2.306-1.423-.853-.76-1.428-1.7-1.596-1.987-.168-.287-.018-.442.126-.585.13-.13.287-.336.431-.504.144-.168.192-.287.288-.479.096-.192.048-.36-.024-.504-.072-.144-.647-1.558-.887-2.133-.233-.56-.47-.484-.647-.493-.167-.008-.36-.01-.552-.01s-.503.072-.766.36c-.263.287-1.006.983-1.006 2.398 0 1.414 1.03 2.78 1.174 2.972.144.192 2.027 3.096 4.91 4.343.686.296 1.222.473 1.639.606.689.219 1.317.188 1.812.114.553-.083 1.696-.693 1.936-1.362.24-.67.24-1.244.168-1.363-.072-.119-.264-.191-.55-.335z"
        fill="white"
      />
    </svg>
  );
}
