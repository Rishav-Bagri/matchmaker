# Luxury Matrimonial Design System & Color Palette

This document defines the luxury fashion-inspired design system created for the matrimonial profile pages.

## Design Aesthetic
- **Minimalist & High-End**: Clean grid lines, ample whitespace, and thin geometric borders.
- **Strictly No Shadows/Glows**: Absolutely no drop shadows, box shadows, focus rings, or glows. All containers are flat and sharp.
- **Editorial Typography**: Pairing of Cormorant Garamond (refined serif) and Montserrat (tracked-out sans-serif) to simulate a luxury print/editorial catalog (like Vogue, Cartier, or Hermès).
- **Sharp Geometry**: Non-rounded corners (`rounded-none`) on all cards, badges, and images.

---

## Color Palette

| Name | Hex Code | Usage | Tailwind/CSS Equivalents |
| :--- | :--- | :--- | :--- |
| **Alabaster / Off-White** | `#F7F5F0` | Main application background & inner input/badge panels | `bg-[#F7F5F0]` |
| **Warm White** | `#FFFFFF` | Core container card backgrounds | `bg-white` |
| **Thin Stone Border** | `#E5E2DA` | Clean, low-contrast container dividing borders | `border-[#E5E2DA]` |
| **Dark Slate/Charcoal** | `#18181B` | Primary headings, body copy, and tag borders | `text-zinc-900` / `bg-zinc-900` |
| **Muted Platinum** | `#71717A` | Metadata label subtitles | `text-zinc-400` / `text-zinc-500` |

---

## Typography

### 1. Serif Typeface
* **Family**: `'Cormorant Garamond', Georgia, serif`
* **Purpose**: Primary name headers, blockquotes, key education/employment values.
* **Feel**: Sophisticated, editorial, classic luxury.

### 2. Sans-Serif Typeface
* **Family**: `'Montserrat', Inter, sans-serif`
* **Purpose**: Card headers, subheadings, labels, utility badges.
* **Feel**: Clean, modern, high-fashion branding (often styled uppercase with tracking).

---

## Component Guidelines
- **Containers**: Always use standard thin borders (`border border-[#E5E2DA] rounded-none shadow-none outline-none ring-0`).
- **Paddings**: Generous padding (minimum `p-6` or `p-8`) to maintain the airy, editorial look.
- **Tag lists**: Muted gray backgrounds with thin borders, or solid dark slate tags for high-contrast highlights.
