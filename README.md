# Fab Lab Final Project Documentation Website

A responsive, single-page website for documenting a Fab Lab final project throughout its design, prototyping, digital fabrication, and testing phases.

Built with clean semantic **HTML5**, **CSS3**, and **Vanilla JavaScript (ES6+)**. Fully static with zero dependencies or build tools, and directly compatible with GitHub Pages.

---

## 📁 File Structure

```text
fablab-project/
├── index.html               # Main single-page document and layout structure
├── css/
│   └── style.css            # Editorial typography, layout grid, timeline & modal styles
├── js/
│   ├── documentation.js     # Structured dataset for all development entries
│   └── main.js              # Timeline rendering, horizontal navigation & modal controller
├── assets/
│   ├── images/              # SVG placeholders and final project photographs
│   ├── videos/              # Demo video clips or screen recordings
│   └── files/               # Downloadable project files (CAD, Gerbers, code, BOM)
└── README.md                # Documentation and maintenance guide
```

---

## 🚀 How to Preview Locally

Because this project is built entirely with standard web technologies and relative paths, you can preview it locally in several convenient ways:

### Option 1: Built-in Python HTTP Server (Recommended)
Open a terminal in the `fablab-project` folder and run:
```bash
python -m http.server 8000
```
Then open your web browser to:
```
http://localhost:8000
```

### Option 2: Node.js / npx
```bash
npx serve .
```

### Option 3: VS Code Live Server
Right-click `index.html` in VS Code and select **Open with Live Server**.

### Option 4: Direct Browser Opening
You can also directly double-click or drag-and-drop `index.html` into modern web browsers (Chrome, Firefox, Safari, Edge).

---

## ✏️ How to Edit Content & Documentation

### 1. Updating Development Entries (`js/documentation.js`)
All development timeline cards and their detailed overlay views are populated from `js/documentation.js`. 

To edit, add, or reorder an entry, open `js/documentation.js`:
```javascript
{
  id: "entry-01",
  label: "WEEK 01",                      // Change to "ENTRY 01", "WEEK 01", or "PHASE 01"
  phaseTag: "DEVELOPMENT / WEEK 01",      // Label shown at top of the modal overlay
  title: "Concept Research & System Scoping",
  shortDescription: "Short summary shown on the horizontal timeline card...",
  thumbnail: "assets/images/placeholder-thumb.svg",
  featuredMedia: {
    src: "assets/images/placeholder-featured.svg",
    alt: "Description of featured media",
    caption: "FEATURED IMAGE / VIDEO"
  },
  sections: [
    {
      title: "What was attempted",
      content: "Detailed notes on objectives, tools, and methods..."
    },
    {
      title: "Challenges, failures & iterations",
      content: "Notes on issues encountered and adjustments made...",
      images: [
        { src: "assets/images/process-01.jpg", caption: "PROCESS PHOTO 01" },
        { src: "assets/images/process-02.jpg", caption: "PROCESS PHOTO 02" }
      ]
    },
    {
      title: "Technical notes / files",
      content: "Settings, code snippets, or fabrication parameters...",
      files: [
        {
          label: "DOWNLOAD SCHEMATIC",
          name: "Schematic_v1.pdf",
          url: "assets/files/schematic.pdf"
        }
      ]
    }
  ]
}
```
*Note: Any section or property omitted or left empty will automatically not be displayed. You do not need to create placeholder text for unused subsections.*

### 2. Updating General Project Information (`index.html`)
Open `index.html` to update:
- **Project Title & Navigation**: Edit `<a class="brand-title">` and `<h1 class="hero-title">`.
- **Hero Introduction**: Update the lead paragraph and hero media source.
- **Section 01 (Concept & Inspiration)**: Update the idea description and reference details.
- **Section 03 (Final Outcome)**: Update the summary of the finished project, key features list, concluding reflections, and final archive download link.
- **Footer**: Update author, lab details, and date.

### 3. Adding Images & Project Files
- Save images and diagrams in `assets/images/`.
- Save video files or embeds in `assets/videos/`.
- Save CAD models (.STEP, .STL), schematics, firmware, and zipped archives in `assets/files/`.

---

## ♿ Accessibility & Interaction Features
- Keyboard accessible: `Tab`, `Shift+Tab`, `Enter`, `Space`, `Escape`, and `ArrowLeft` / `ArrowRight`.
- Background scroll lock with scrollbar compensation when overlays are open.
- Trapped focus inside active overlays with return of focus to triggering card upon closing.
- Respects `prefers-reduced-motion` for accessibility.
- Smooth horizontal wheel and drag-scrolling for development entries.
