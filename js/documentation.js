/**
 * Fab Lab Final Project Documentation Data
 * 
 * To add, remove, or edit entries:
 * - Each item in `documentationEntries` corresponds to one timeline card and its full overlay view.
 * - Subsections inside `sections` are optional; empty or omitted sections will not render.
 * - The `label` can easily be changed between "ENTRY 01", "WEEK 01", or "PHASE 01".
 */

const documentationEntries = [
  {
    id: "entry-01",
    label: "ENTRY 01",
    phaseTag: "DEVELOPMENT / ENTRY 01",
    title: "Concept Research & System Scoping",
    shortDescription: "Exploring initial architectural concepts, user requirements, and component feasibility studies.",
    thumbnail: "assets/images/placeholder-thumb.svg",
    featuredMedia: {
      src: "assets/images/placeholder-featured.svg",
      caption: "FEATURED IMAGE / VIDEO",
      alt: "Concept research and architectural sketches"
    },
    sections: [
      {
        title: "What was attempted",
        content: "A concise description of the objective, design decisions, tools and methods used during this entry. We analyzed constraints around power consumption, physical enclosure dimensions, and required digital fabrication processes."
      },
      {
        title: "Challenges, failures & iterations",
        content: "Initial component sizing was incompatible with compact desktop housing. We evaluated three distinct form factors, comparing 3D printing tolerances and laser-cut acrylic interlocking panels.",
        images: [
          {
            src: "assets/images/placeholder-process1.svg",
            caption: "PROCESS PHOTO 01",
            alt: "Early modular form factor exploration"
          },
          {
            src: "assets/images/placeholder-process2.svg",
            caption: "PROCESS PHOTO 02",
            alt: "Subsystem connection diagram draft"
          }
        ]
      },
      {
        title: "Technical notes / files",
        content: "Project specifications sheet compiled with preliminary bill of materials and mechanical clearance requirements.",
        files: [
          {
            label: "FILE LINK / ADDITIONAL RESOURCE",
            name: "Project_Requirements_v1.pdf",
            url: "assets/files/project-requirements-placeholder.txt"
          }
        ]
      }
    ]
  },
  {
    id: "entry-02",
    label: "ENTRY 02",
    phaseTag: "DEVELOPMENT / ENTRY 02",
    title: "CAD Modeling & Rapid 3D Prototyping",
    shortDescription: "Parametric chassis modeling in CAD, test slicing, and iterative additive manufacturing tests.",
    thumbnail: "assets/images/placeholder-thumb.svg",
    featuredMedia: {
      src: "assets/images/placeholder-featured.svg",
      caption: "FEATURED IMAGE / VIDEO",
      alt: "Parametric 3D chassis model render"
    },
    sections: [
      {
        title: "What was attempted",
        content: "Designed the primary enclosure shell using parametric equations to allow flexible internal component adjustments. Test prints were produced using standard PLA to inspect mating joints and snap-fit tolerances."
      },
      {
        title: "Challenges, failures & iterations",
        content: "The first test print experienced slight warping along the mounting flanges, causing a 0.8mm misalignment with the internal mounting bosses. Slicer bed temperature and infill orientation were revised.",
        images: [
          {
            src: "assets/images/placeholder-process1.svg",
            caption: "PROCESS PHOTO 01",
            alt: "Warped prototype print analysis"
          },
          {
            src: "assets/images/placeholder-process2.svg",
            caption: "PROCESS PHOTO 02",
            alt: "Revised snap-fit joint calibration"
          }
        ]
      },
      {
        title: "Technical notes / files",
        content: "Exported STEP files and Cura printing profiles optimized for 0.2mm layer height and 20% gyroid infill.",
        files: [
          {
            label: "FILE LINK / ADDITIONAL RESOURCE",
            name: "Enclosure_Model_v2.step",
            url: "assets/files/cad-model-placeholder.txt"
          }
        ]
      }
    ]
  },
  {
    id: "entry-03",
    label: "ENTRY 03",
    phaseTag: "DEVELOPMENT / ENTRY 03",
    title: "Prototype Development",
    shortDescription: "Breadboard circuit assembly, microcontroller selection, and sensor bus communication tests.",
    thumbnail: "assets/images/placeholder-thumb.svg",
    featuredMedia: {
      src: "assets/images/placeholder-featured.svg",
      caption: "FEATURED IMAGE / VIDEO",
      alt: "Breadboard prototyping bench setup"
    },
    sections: [
      {
        title: "What was attempted",
        content: "A concise description of the objective, design decisions, tools and methods used during this entry. Content can vary from one entry to another."
      },
      {
        title: "Challenges, failures & iterations",
        content: "Record unsuccessful attempts, technical issues, adjustments and what was learned. Include process media where it helps explain a decision.",
        images: [
          {
            src: "assets/images/placeholder-process1.svg",
            caption: "PROCESS PHOTO 01",
            alt: "Oscilloscope signal capture"
          },
          {
            src: "assets/images/placeholder-process2.svg",
            caption: "PROCESS PHOTO 02",
            alt: "Breadboard wiring test rig"
          }
        ]
      },
      {
        title: "Technical notes / files",
        content: "Optional settings, code snippets, fabrication files, references and downloadable resources. Do not require identical subsections in every entry.",
        files: [
          {
            label: "FILE LINK / ADDITIONAL RESOURCE",
            name: "Firmware_Test_Routine.ino",
            url: "assets/files/firmware-placeholder.txt"
          }
        ]
      }
    ]
  },
  {
    id: "entry-04",
    label: "ENTRY 04",
    phaseTag: "DEVELOPMENT / ENTRY 04",
    title: "PCB Milling & Surface-Mount Soldering",
    shortDescription: "Custom circuit board routing, precision CNC isolation routing, and component soldering.",
    thumbnail: "assets/images/placeholder-thumb.svg",
    featuredMedia: {
      src: "assets/images/placeholder-featured.svg",
      caption: "FEATURED IMAGE / VIDEO",
      alt: "Precision PCB milling in progress"
    },
    sections: [
      {
        title: "What was attempted",
        content: "Translated the breadboard prototype into a custom single-layer PCB routed for fabrication on the desktop CNC mill. Calibrated depth of cut for 0.05mm copper layer isolation."
      },
      {
        title: "Challenges, failures & iterations",
        content: "A worn 0.1mm V-bit caused slight burring on traces spaced 0.4mm apart. Replaced tooling with a fresh carbide bit and leveled the sacrificial bed with digital dial indicator.",
        images: [
          {
            src: "assets/images/placeholder-process1.svg",
            caption: "PROCESS PHOTO 01",
            alt: "Freshly milled PCB board traces"
          },
          {
            src: "assets/images/placeholder-process2.svg",
            caption: "PROCESS PHOTO 02",
            alt: "SMD component reflow inspection"
          }
        ]
      },
      {
        title: "Technical notes / files",
        content: "KiCad project files, schematic exports, and Gerber production files.",
        files: [
          {
            label: "FILE LINK / ADDITIONAL RESOURCE",
            name: "Mainboard_Gerbers_revB.zip",
            url: "assets/files/pcb-gerbers-placeholder.txt"
          }
        ]
      }
    ]
  },
  {
    id: "entry-05",
    label: "ENTRY 05",
    phaseTag: "DEVELOPMENT / ENTRY 05",
    title: "System Integration & Validation",
    shortDescription: "Full mechanical, electrical, and firmware assembly with continuous performance benchmarks.",
    thumbnail: "assets/images/placeholder-thumb.svg",
    featuredMedia: {
      src: "assets/images/placeholder-featured.svg",
      caption: "FEATURED IMAGE / VIDEO",
      alt: "Full system bench test and verification"
    },
    sections: [
      {
        title: "What was attempted",
        content: "Integrated the milled board into the 3D printed chassis, established cable harnesses, and performed stress tests across 24 hours of continuous operational cycles."
      },
      {
        title: "Challenges, failures & iterations",
        content: "Observed thermal buildup inside the sealed chamber during extended duty cycles. Integrated passive ventilation grilles along the bottom and rear spine.",
        images: [
          {
            src: "assets/images/placeholder-process1.svg",
            caption: "PROCESS PHOTO 01",
            alt: "Thermal inspection during continuous run"
          },
          {
            src: "assets/images/placeholder-process2.svg",
            caption: "PROCESS PHOTO 02",
            alt: "Final integrated cable harness assembly"
          }
        ]
      },
      {
        title: "Technical notes / files",
        content: "Complete system telemetry logs and final assembly checklist documentation.",
        files: [
          {
            label: "FILE LINK / ADDITIONAL RESOURCE",
            name: "Validation_Report_Final.pdf",
            url: "assets/files/validation-report-placeholder.txt"
          }
        ]
      }
    ]
  }
];
