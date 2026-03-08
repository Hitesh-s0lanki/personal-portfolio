# Streamflow

**Building an OTT platform from curiosity, not just code.**

Streamflow is a full-stack OTT streaming platform built to understand how modern video platforms work — adaptive streaming, sprite sheet previews, cloud-based media handling, and secure delivery.

![Streamflow Home](images/home.png)

---

## It started with a simple question…

While scrolling Instagram one day, I saw a short reel explaining how **sprite sheets** work in OTT platforms. It showed how Netflix-style video previews appear instantly when you hover on the timeline. That one concept made me pause.

Then I asked myself:

- How does that actually work?
- How does the video automatically adjust quality?
- How do platforms stream smoothly even on slow internet?
- What happens behind the scenes after you upload a video?

Instead of just searching for answers… I built **Streamflow**.

---

## What is Streamflow?

Streamflow is a full-stack OTT streaming platform built to deeply understand how modern video platforms work. It's not just about playing videos. It's about:

- **Performance optimization**
- **Adaptive streaming**
- **Smart preview thumbnails (Sprite Sheets)**
- **Cloud-based media handling**
- **Secure content delivery**

![Content catalog and detail](images/content.png)

---

## Core features

### 1. Adaptive streaming (HLS)

Streamflow uses **HLS (HTTP Live Streaming)** with automatic quality adjustment. When you watch a video: if your internet is fast you get HD; if it slows down it switches to lower quality; when it improves, quality goes back up. All without you noticing.

- No buffering interruptions  
- Optimized bandwidth usage  
- Better mobile experience  
- Real-world OTT behavior  

![Watch page — HLS playback](images/watch.png)

### 2. Sprite sheets (the feature that started it all)

When you hover over a video timeline and see preview thumbnails instantly — that's sprite sheet technology. Instead of loading many small images, one large image is generated with multiple frames in a grid, and the player shows the correct frame instantly.

- Faster preview loading  
- Fewer server requests  
- Reduced bandwidth usage  
- Better user experience  

![Sprite sheet grid example](images/sprite.jpg)

---

## Behind the scenes

1. **Video upload** — Large videos are uploaded efficiently (chunked & optimized).
2. **Processing pipeline** — Once uploaded: multiple resolutions are generated (for adaptive streaming), HLS playlists are created, sprite sheets are generated, and metadata is stored.
3. **Smart playback** — When a user presses play: HLS automatically selects the best quality, sprite sheet previews activate, and streaming adjusts in real time.

![Upload flow](images/upload.png)

---

## Vision for Streamflow

This project is evolving toward:

- DRM-based content protection  
- AI-powered recommendations  
- Video analytics tracking  
- Cloud-native microservices  
- Production-level scalability  

*It's not just a side project. It's an engineering journey.*

---

## For non-technical readers

Imagine watching Netflix. Now imagine opening Netflix's engine room — seeing how videos change quality automatically, load instantly, show preview thumbnails, avoid buffering, and scale to millions of users. That's what Streamflow explores.

---

## Tech stack

| Layer      | Stack |
|-----------|--------|
| **Frontend** | Next.js 16, React 19, tRPC, TanStack Query, HLS.js, Framer Motion, Tailwind CSS, Clerk (auth) |
| **Streaming** | HLS (HTTP Live Streaming), adaptive bitrate |
| **Media** | Sprite sheets for timeline previews, multi-resolution encoding |

---

## Getting started

### Prerequisites

- Node.js 20+
- npm, yarn, pnpm, or bun

### Run the frontend

```bash
cd streamflow-fe
npm install
npm run dev
```

Open [http://localhost:3001](http://localhost:3001) in your browser.

### Project structure

```
streamflow/
├── streamflow-fe/     # Next.js frontend (catalog, watch, upload, about)
├── images/            # Screenshots and assets for docs
└── Readme.md
```

---

## Learn more

- **In-app About page** — Open the app and visit `/about` for the full story, sprite sheet demo, and inspiration.
- **YouTube** — [Sprite sheets & OTT concepts](https://www.youtube.com/watch?v=-JtjQ-OA7XE) — the video that inspired this project.

---

> *The best way to understand technology is to build it.*

One small Instagram reel led to: **Curiosity → Research → Architecture → Implementation → Optimization.** Streamflow exists because of that belief.

**Built with curiosity. Engineered for depth. Designed to explore the future of streaming.**
