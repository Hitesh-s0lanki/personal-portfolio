/**
 * Editorial summaries that give context even when a README is unavailable.
 * Facts come from the corresponding entries in data.ts and repository sources,
 * not inferred outcomes. Sources checked on 2026-11-15:
 * SystemArch's service boundaries also follow its repository README:
 * https://github.com/Hitesh-s0lanki/system-arch/blob/HEAD/README.md
 * https://github.com/Hitesh-s0lanki/research-assistant-chrome/blob/HEAD/Readme.md
 * https://github.com/Hitesh-s0lanki/Chess-Project/blob/HEAD/index.html
 * https://github.com/Hitesh-s0lanki/Chess-Project/blob/HEAD/chessScript.js
 * https://github.com/Hitesh-s0lanki/DSALeetcode
 */
export const projectOverviews: Record<string, { heading: string; body: string }[]> = {
  "system-arch": [
    {
      heading: "A workbench for system design",
      body: "SystemArch puts rate limiting, load testing, and video streaming in one project. A Next.js frontend provides the interface for exploring the services, while Go handles the rate limiter and load-testing backend.",
    },
    {
      heading: "Rate limits and load tests",
      body: "The rate limiter can use process memory or Redis. The load tester runs k6 in Docker containers against a target endpoint, making the repository a place to examine request limits alongside load-test results.",
    },
    {
      heading: "Video delivery",
      body: "A separate Spring Boot service uses FFmpeg to turn uploaded MP4 files into HLS renditions. The repository includes the service code and setup instructions for running each part locally.",
    },
  ],
  "research-assistant-chrome-extension": [
    {
      heading: "From selected text to research notes",
      body: "Highlight text on a webpage, open the extension sidebar, and choose Summarize to get a Gemini-generated summary. Notes can be written alongside the summary and saved for later use, so the reading and note-taking stay in one place.",
    },
    {
      heading: "Java backend and Gemini",
      body: "The Manifest V3 extension uses HTML, CSS, and JavaScript. A Java and Spring Boot backend exposes REST endpoints for Gemini summarization. The repository contains the extension files, backend service, and setup instructions.",
    },
  ],
  "chess-web": [
    {
      heading: "Chess with browser fundamentals",
      body: "Chess Web builds an eight-by-eight board in JavaScript and uses CSS and piece images to display it. The interface has separate player panels with scores and move counts. The live demo and source are linked above.",
    },
    {
      heading: "Board state and player turns",
      body: "JavaScript maintains the board array, places the starting pieces, highlights available moves, and checks attacks on the king. The player panels change appearance as turns switch. The implementation is in chessScript.js, alongside the HTML page and stylesheet.",
    },
  ],
  "26ideas": [
    {
      heading: "A company website",
      body: "This portfolio entry covers the 26ideas company website, a static web project built with Next.js. The company site is linked above as the live demo.",
    },
    {
      heading: "Website and CRM work",
      body: "The company website is a separate entry from the AI-CRM Platform for 26ideas. The CRM project covers contacts, jobs, candidates, companies, and ideas; this entry covers the company website.",
    },
  ],
  "data-structures": [
    {
      heading: "Implementations and practice problems",
      body: "This collection pairs data structure implementations with LeetCode solutions. It brings the implementation work and problem-solving practice together in the DSALeetcode repository.",
    },
    {
      heading: "Topics in the collection",
      body: "The repository includes C++ implementations of bubble, insertion, merge, quick, selection, and heap sort. Java array exercises cover majority elements, maximum product subarrays, and Pascal's triangle. Binary search tree and backtracking folders include further solutions, such as N-Queens and a Sudoku solver.",
    },
  ],
};
