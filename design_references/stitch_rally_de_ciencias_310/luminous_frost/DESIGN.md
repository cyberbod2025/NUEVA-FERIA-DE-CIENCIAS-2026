# Design System Specification: Luminous Refraction

## 1. Overview & Creative North Star
The Creative North Star for this design system is **"The Radiant Prism."** 

We are moving away from the flat, sterile environments of traditional SaaS and into a space defined by light physics, internal luminosity, and editorial elegance. This system treats the interface as a physical lens—capturing, bending, and emitting light. By utilizing high-transparency surfaces and vivid, glowing accents, we create a UI that feels alive and atmospheric. 

To break the "template" look, designers must embrace intentional asymmetry and varied depth. Content should not simply sit on a grid; it should float within a luminous volume. We use overlapping glass layers and "impossible" light sources to guide the eye, ensuring the experience feels custom-crafted rather than assembled from a kit.

---

## 2. Colors & Light Physics
Our palette is rooted in high-vibrancy tech tones and soft, frosty neutrals.

### The Palette
- **Primary (Electric Lavender):** `primary` (#7B61FF). Use this for high-energy interaction points and brand-defining actions.
- **Secondary (Cyan Glow):** `secondary` (#00F5FF). Use for cool, secondary accents and fresh highlights.
- **Tertiary (Soft Pink):** `tertiary` (#FF79C6). Use for emotional resonance and warm highlights.
- **Background & Surfaces:** `neutral` (#F0F8FF).

### The "No-Line" Rule
Sectioning must never be achieved through 1px solid borders. Instead, define boundaries through:
1. **Background Color Shifts:** Transitioning from the neutral base to subtle transparency shifts.
2. **Refractive Boundaries:** Using a soft backdrop-blur (20px–40px) to imply a change in surface depth.
3. **Internal Glow:** Letting a background mesh gradient shine through a transparent card to define its limits.

### The "Glass & Gradient" Rule
Floating elements must utilize the Glassmorphism effect. Apply surfaces at 30%–60% opacity with a high `backdrop-filter: blur()`. 
**Signature Texture:** Main CTAs and Hero backgrounds should utilize a linear gradient from `primary` (#7B61FF) to `secondary` (#00F5FF) at a 45-degree angle to simulate natural light dispersion.

---

## 3. Typography
The typographic voice is a dialogue between futuristic precision and humanistic clarity.

- **Display & Headlines (Space Grotesk):** Used for all major headlines. This font carries the "tech-soul" of the brand with its geometric quirks. Use it to anchor the layout and provide architectural structure.
- **Body & Labels (Inter):** Used for all titles, body text, and labels. Inter provides the necessary weight and readability to balance the high-gloss aesthetic. 

**Editorial Note:** Use high-contrast scale jumps. A display headline should feel significantly more authoritative than the body text nearby to create a sense of hierarchy and prestige.

---

## 4. Elevation & Depth
Depth in this system is not about "height" from a flat plane, but "thickness" within a glass medium.

### The Layering Principle
Stack surfaces to create hierarchy:
1. **Base Layer:** Bright mesh gradients or orbs using secondary and tertiary tones.
2. **Section Layer:** Semi-transparent neutral surfaces at 40% opacity with blur.
3. **Active/Card Layer:** Surface layers at 70% opacity. This creates a natural, soft "lift" without heavy shadows.

### Ambient Shadows
For floating elements, use extra-diffused shadows. 
- **Blur:** 40px–60px.
- **Opacity:** 4%–8%.
- **Color:** Use a tinted shadow mixed with `primary` (#7B61FF) to simulate light passing through a colored lens.

---

## 5. Components

### Buttons (The 3D Gloss Variant)
- **Primary:** `primary` (#7B61FF) background with a subtle internal glow. Use a sharp highlight on the top-left corner to simulate a 3D glass bead.
- **Secondary:** Use `secondary` (#00F5FF) at 20% opacity for a lighter, refractive look.
- **Shape:** Maximum roundedness (Level 3) for a liquid, pill-like feel.

### Density & Spacing
The system utilizes **Compact Spacing (Level 2)**. While we maintain the "luminous" feel, elements are positioned with intentional efficiency. This creates a focused, high-performance interface where light and content are tightly integrated without excessive air.

### Input Fields
- **Container:** Semi-transparent surfaces with a 20px backdrop blur.
- **Active State:** Borders increase in opacity, and a subtle secondary outer glow is applied.
- **Shape:** Roundedness Level 3.

### Cards & Lists
- **Prohibition:** Divider lines are strictly forbidden. 
- **Separation:** Use the compact spacing grid (Level 2) and subtle tonal shifts to differentiate content blocks.
- **Frosting:** Every card should feature light-catching edges to simulate the illusion of light refraction.

---

## 6. Do's and Don'ts

### Do:
- **Over-index on light:** Ensure the background mesh gradients are bright and prominent enough to be seen through the glass cards.
- **Use Intentional Asymmetry:** Let cards overlap slightly or sit off-center to create a dynamic, editorial feel.
- **Leverage Pill Shapes:** Maintain the maximum roundedness (Level 3) across all interactive components to reinforce the liquid aesthetic.

### Don't:
- **Don't use flat grey shadows:** This kills the "luminous" feel. Shadows must always be low-opacity and slightly tinted.
- **Don't use 100% opaque borders:** Solid borders break the illusion of liquid glass.
- **Don't over-expand the layout:** Adhere to the compact spacing (Level 2) to keep the "The Radiant Prism" feeling focused and functional.
- **Don't use dividers:** If you feel the need for a line, try a background color shift or a change in typography scale first.