# Rumiva

Interior design studio, rendered in the browser — [rumiva.in](https://rumiva.in)

Built for the **3D Websites Hackathon**, where the brief was aesthetics rather
than problem-solving: make something that stops the scroll. Rumiva takes that at
face value. Instead of a hero image of a room, the landing page *is* the room —
a real-time kitchen interior you look around while the copy sits on top of it.

## The hero scene

The centrepiece is a GLTF kitchen (adapted from the pmndrs `shopping` example)
running in React Three Fiber. Two decisions carry it:

- **Budget.** The source model is ~134MB. Run through `gltfjsx` with Draco
  compression it ships at **2.1MB** — small enough to be a background element,
  not a loading screen.
- **No blocking CDN.** The HDR environment map is self-hosted
  (`/hdri/potsdamer_platz_1k.hdr`) rather than pulled from `raw.githack.com` on
  every visit, and it is applied only to the pieces that need it — chairs, sink,
  glass — instead of the whole scene.

Hovering a furniture group glows its outline and surfaces the product label, so
the scene doubles as a catalogue rather than being pure decoration. The
post-processing chain — `N8AO`, `Outline`, `TiltShift2`, `BrightnessContrast`,
`HueSaturation`, `Vignette`, `ToneMapping` — is what pulls it away from "WebGL
demo" and towards the soft, printed look the studio brand wanted.

WebGL cannot render on the server, so every scene is a `next/dynamic` import
with `ssr: false` and a text fallback. A machine without hardware acceleration
gets the full page and a prompt, never a blank canvas.

## A viewer for every project

The hero knows its model's mesh names. Case studies can't — designers upload
whatever they have. `ModelViewer` is the generalized counterpart: hand it any
`.glb`, and it renders whatever scene graph ships inside, fits it to view with
`Bounds` + `Center`, and hands over orbit and zoom.

Scroll-to-zoom is **off by default** — a viewer embedded mid-article that eats
the page scroll is worse than one you have to click into first.

## Structure

Routes are organized by audience, using route groups so the section never leaks
into the URL:

- `(marketing)` — the landing page: 3D hero, stats band, services, process,
  gallery, FAQ, CTA
- `(platform)` — the public studio: designer profiles (`designers/[slug]`),
  individual project case studies (`designers/[slug]/[project]`), the projects
  gallery, service detail pages, about, contact
- `(studio)` — the signed-in dashboard, behind a session check
- `(auth)` — login and register

Components used by one route stay colocated in that group's `_components/`;
anything shared — `ui/`, `providers/`, `three/` — lives in `src/components/`.

## Stack

- **Next.js 16** · React 19 · TypeScript
- **React Three Fiber** + **drei** + **postprocessing** — the 3D layer
- **Three.js** / WebGL, Draco-compressed GLTF
- **GSAP** and **Motion** for sequencing, **Lenis** for smooth scroll
- **Tailwind CSS v4** + **shadcn/ui** on Base UI / Radix primitives

## Running it

```bash
npm install
npm run dev
```

The dev server binds to port **3001** — [http://localhost:3001](http://localhost:3001).
