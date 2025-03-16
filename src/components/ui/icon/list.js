import { html } from "lit";

export const iconList = {
  user: (width = "24", height = "24") => html`<svg
    xmlns="http://www.w3.org/2000/svg"
    width=${width}
    height=${height}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    class="lucide lucide-user"
  >
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>`,
  plus: (width = "24", height = "24") => html`<svg
    xmlns="http://www.w3.org/2000/svg"
    width=${width}
    height=${height}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    class="lucide lucide-plus"
  >
    <path d="M5 12h14" />
    <path d="M12 5v14" />
  </svg>`,
  menu: (width = "24", height = "24") => html`<svg
    xmlns="http://www.w3.org/2000/svg"
    width=${width}
    height=${height}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    class="lucide lucide-menu"
  >
    <line x1="4" x2="20" y1="12" y2="12" />
    <line x1="4" x2="20" y1="6" y2="6" />
    <line x1="4" x2="20" y1="18" y2="18" />
  </svg>`,
  x: (width = "24", height = "24") => html`<svg
    xmlns="http://www.w3.org/2000/svg"
    width=${width}
    height=${height}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    class="lucide lucide-x"
  >
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>`,
  grid: (width = "24", height = "24") => html`<svg
    xmlns="http://www.w3.org/2000/svg"
    width=${width}
    height=${height}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    class="lucide lucide-grid-2x2"
  >
    <path d="M12 3v18" />
    <path d="M3 12h18" />
    <rect x="3" y="3" width="18" height="18" rx="2" />
  </svg>`,
  edit: (width = "24", height = "24") => html`<svg
    xmlns="http://www.w3.org/2000/svg"
    width=${width}
    height=${height}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    class="lucide lucide-user-round-pen"
  >
    <path d="M2 21a8 8 0 0 1 10.821-7.487" />
    <path
      d="M21.378 16.626a1 1 0 0 0-3.004-3.004l-4.01 4.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z"
    />
    <circle cx="10" cy="8" r="5" />
  </svg>`,

  trash: (width = "24", height = "24") => html`<svg
    xmlns="http://www.w3.org/2000/svg"
    width=${width}
    height=${height}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    class="lucide lucide-trash"
  >
    <path d="M3 6h18" />
    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
  </svg>`,
  chevronRight: (width = "24", height = "24") => html`<svg
    xmlns="http://www.w3.org/2000/svg"
    width=${width}
    height=${height}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    class="lucide lucide-chevron-right"
  >
    <path d="m9 18 6-6-6-6" />
  </svg>`,
  chevronLeft: (width = "24", height = "24") => html`<svg
    xmlns="http://www.w3.org/2000/svg"
    width=${width}
    height=${height}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    class="lucide lucide-chevron-left"
  >
    <path d="m15 18-6-6 6-6" />
  </svg>`,
};
