import React from "react";

interface IconProps {
  className?: string;
  size?: number;
}

export function FacebookIcon({ className = "w-5 h-5", size }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={`shrink-0 inline-block ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Facebook"
    >
      <rect width="24" height="24" rx="5.5" fill="#1877F2" />
      <path
        d="M15.5 12.5l.42-2.75h-2.64v-1.78c0-.75.37-1.49 1.55-1.49h1.2V4.14c-.7-.1-1.41-.15-2.13-.15-2.17 0-3.59 1.32-3.59 3.7v2.06H7.88v2.75h2.43V20h3.01v-7.5h2.18z"
        fill="white"
      />
    </svg>
  );
}

export function InstagramIcon({ className = "w-5 h-5", size }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={`shrink-0 inline-block ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Instagram"
    >
      <defs>
        <linearGradient id="igIconGradient" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#f09433" />
          <stop offset="25%" stopColor="#e6683c" />
          <stop offset="50%" stopColor="#dc2743" />
          <stop offset="75%" stopColor="#cc2366" />
          <stop offset="100%" stopColor="#bc1888" />
        </linearGradient>
      </defs>
      <rect width="24" height="24" rx="5.5" fill="url(#igIconGradient)" />
      <rect x="5.25" y="5.25" width="13.5" height="13.5" rx="3.8" stroke="white" strokeWidth="1.6" fill="none" />
      <circle cx="12" cy="12" r="3.4" stroke="white" strokeWidth="1.6" fill="none" />
      <circle cx="15.8" cy="8.2" r="1" fill="white" />
    </svg>
  );
}

export function YoutubeIcon({ className = "w-5 h-5", size }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={`shrink-0 inline-block ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="YouTube"
    >
      <rect width="24" height="24" rx="5.5" fill="#FF0000" />
      <path d="M9.75 7.5l6.5 4.5-6.5 4.5z" fill="white" />
    </svg>
  );
}

export function WhatsAppIcon({ className = "w-5 h-5", size }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={`shrink-0 inline-block ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="WhatsApp"
    >
      <rect width="24" height="24" rx="5.5" fill="#25D366" />
      <path
        d="M17.507 14.362c-.286-.144-1.696-.837-1.958-.933-.263-.096-.455-.144-.647.144-.191.287-.743.933-.911 1.124-.168.192-.336.216-.623.072-.287-.144-1.21-.446-2.306-1.423-.853-.76-1.428-1.7-1.596-1.987-.168-.287-.018-.442.126-.585.13-.13.287-.336.431-.504.144-.168.192-.287.288-.479.096-.192.048-.36-.024-.504-.072-.144-.647-1.558-.887-2.133-.233-.56-.47-.484-.647-.493-.167-.008-.36-.01-.552-.01s-.503.072-.766.36c-.263.287-1.006.983-1.006 2.398 0 1.414 1.03 2.78 1.174 2.972.144.192 2.027 3.096 4.91 4.343.686.296 1.222.473 1.639.606.689.219 1.317.188 1.812.114.553-.083 1.696-.693 1.936-1.362.24-.67.24-1.244.168-1.363-.072-.119-.264-.191-.55-.335z"
        fill="white"
      />
    </svg>
  );
}
