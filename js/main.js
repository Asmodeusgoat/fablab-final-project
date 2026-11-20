/**
 * Fab Lab Final Project Documentation
 * Main JavaScript Controller
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- DOM Elements ---
  const timelineTrack = document.getElementById('timelineTrack');
  const timelineViewport = document.getElementById('timelineViewport');
  const timelinePrevBtn = document.getElementById('timelinePrev');
  const timelineNextBtn = document.getElementById('timelineNext');
  const scrollIndicator = document.getElementById('scrollIndicator');

  const modalBackdrop = document.getElementById('modalBackdrop');
  const modalPanel = document.getElementById('modalPanel');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalCategoryTag = document.getElementById('modalCategoryTag');
  const modalTitle = document.getElementById('modalTitle');
  const modalBody = document.getElementById('modalBody');
  const modalPrevBtn = document.getElementById('modalPrevBtn');
  const modalNextBtn = document.getElementById('modalNextBtn');
  const modalCounterIndicator = document.getElementById('modalCounterIndicator');

  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  // --- State Variables ---
  let currentEntryIndex = 0;
  let lastFocusedElement = null;
  let isDraggingTimeline = false;
  let startX = 0;
  let scrollLeftStart = 0;
  let dragThresholdPassed = false;

  // ==========================================================================
  // 1. Timeline Rendering
  // ==========================================================================
  function renderTimeline() {
    if (!timelineTrack || !Array.isArray(documentationEntries)) return;

    timelineTrack.innerHTML = '';

    documentationEntries.forEach((entry, index) => {
      const card = document.createElement('article');
      card.className = 'timeline-card';
      card.setAttribute('role', 'button');
      card.setAttribute('tabindex', '0');
      card.setAttribute('aria-haspopup', 'dialog');
      card.setAttribute('aria-label', `${entry.label}: ${entry.title}. Click to view documentation overlay.`);
      card.dataset.index = index;

      card.innerHTML = `
        <div class="card-media-wrapper">
          <img 
            src="${entry.thumbnail || 'assets/images/placeholder-thumb.svg'}" 
            alt="${entry.title} thumbnail" 
            loading="lazy"
            width="500" 
            height="320"
          >
        </div>
        <div class="card-content">
          <span class="card-entry-label">${escapeHtml(entry.label)}</span>
          <h3 class="card-title">${escapeHtml(entry.title)}</h3>
          <p class="card-description">${escapeHtml(entry.shortDescription)}</p>
          <span class="card-action-indicator">View documentation</span>
        </div>
      `;

      // Click to open overlay (guard against dragging)
      card.addEventListener('click', (e) => {
        if (!dragThresholdPassed) {
          openModal(index);
        }
      });

      // Accessible keyboard trigger
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openModal(index);
        }
      });

      timelineTrack.appendChild(card);
    });

    updateTimelineControls();
  }

  // ==========================================================================
  // 2. Horizontal Scrolling & Controls
  // ==========================================================================
  function updateTimelineControls() {
    if (!timelineViewport) return;

    const maxScroll = timelineViewport.scrollWidth - timelineViewport.clientWidth;
    const currentScroll = timelineViewport.scrollLeft;

    // In cases with rounding or sub-pixel differences
    const atStart = currentScroll <= 4;
    const atEnd = currentScroll >= maxScroll - 4;

    if (timelinePrevBtn) timelinePrevBtn.disabled = atStart;
    if (timelineNextBtn) timelineNextBtn.disabled = atEnd;

    if (scrollIndicator) {
      if (atEnd) {
        scrollIndicator.textContent = 'END OF ENTRIES';
      } else {
        scrollIndicator.textContent = 'SCROLL >';
      }
    }
  }

  function scrollTimelineBy(direction) {
    if (!timelineViewport) return;
    const card = timelineViewport.querySelector('.timeline-card');
    const scrollAmount = card ? card.offsetWidth + 24 : 340;
    timelineViewport.scrollBy({
      left: direction * scrollAmount,
      behavior: 'smooth'
    });
  }

  if (timelinePrevBtn) {
    timelinePrevBtn.addEventListener('click', () => scrollTimelineBy(-1));
  }

  if (timelineNextBtn) {
    timelineNextBtn.addEventListener('click', () => scrollTimelineBy(1));
  }

  if (timelineViewport) {
    timelineViewport.addEventListener('scroll', () => {
      updateTimelineControls();
    }, { passive: true });

    // Intuitive Mouse Wheel Horizontal Scrolling
    // Only intercepts when there is room to scroll horizontally in that direction
    timelineViewport.addEventListener('wheel', (e) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        const maxScroll = timelineViewport.scrollWidth - timelineViewport.clientWidth;
        const currentScroll = timelineViewport.scrollLeft;

        const canScrollRight = e.deltaY > 0 && currentScroll < maxScroll - 2;
        const canScrollLeft = e.deltaY < 0 && currentScroll > 2;

        if (canScrollRight || canScrollLeft) {
          e.preventDefault();
          timelineViewport.scrollLeft += e.deltaY;
        }
      }
    }, { passive: false });

    // Mouse Drag-to-Scroll support
    timelineViewport.addEventListener('mousedown', (e) => {
      isDraggingTimeline = true;
      dragThresholdPassed = false;
      startX = e.pageX - timelineViewport.offsetLeft;
      scrollLeftStart = timelineViewport.scrollLeft;
    });

    timelineViewport.addEventListener('mouseleave', () => {
      isDraggingTimeline = false;
    });

    timelineViewport.addEventListener('mouseup', () => {
      setTimeout(() => {
        isDraggingTimeline = false;
        dragThresholdPassed = false;
      }, 50);
    });

    timelineViewport.addEventListener('mousemove', (e) => {
      if (!isDraggingTimeline) return;
      const x = e.pageX - timelineViewport.offsetLeft;
      const walk = (x - startX);
      if (Math.abs(walk) > 6) {
        dragThresholdPassed = true;
      }
      timelineViewport.scrollLeft = scrollLeftStart - walk;
    });
  }

  // ==========================================================================
  // 3. Documentation Overlay (Modal)
  // ==========================================================================
  function openModal(index) {
    if (!documentationEntries[index]) return;

    currentEntryIndex = index;
    lastFocusedElement = document.activeElement;

    // Prevent body scrolling and compensate for scrollbar shift
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }
    document.body.classList.add('modal-open');

    renderModalContent(index);

    modalBackdrop.classList.add('is-open');
    modalBackdrop.setAttribute('aria-hidden', 'false');

    // Reset modal vertical scroll position
    if (modalBody) modalBody.scrollTop = 0;

    // Set initial focus to close button
    if (modalCloseBtn) {
      modalCloseBtn.focus();
    }
  }

  function renderModalContent(index) {
    const entry = documentationEntries[index];
    if (!entry) return;

    // Header metadata
    if (modalCategoryTag) {
      modalCategoryTag.textContent = entry.phaseTag || entry.label || `ENTRY ${index + 1}`;
    }
    if (modalTitle) {
      modalTitle.textContent = entry.title;
    }

    // Modal Body Content
    if (modalBody) {
      let bodyHtml = '';

      // Optional Featured Media
      if (entry.featuredMedia && entry.featuredMedia.src) {
        bodyHtml += `
          <div class="modal-featured-media">
            <img 
              src="${escapeHtml(entry.featuredMedia.src)}" 
              alt="${escapeHtml(entry.featuredMedia.alt || entry.title)}"
              width="1000" 
              height="500"
            >
          </div>
        `;
      }

      // Dynamic Subsections
      if (Array.isArray(entry.sections)) {
        entry.sections.forEach(section => {
          if (!section.title && !section.content) return; // avoid empty subsections

          bodyHtml += `
            <div class="modal-section">
              ${section.title ? `<h3 class="modal-section-title">${escapeHtml(section.title)}</h3>` : ''}
              ${section.content ? `<p class="modal-section-body">${escapeHtml(section.content)}</p>` : ''}
          `;

          // Process Images Grid
          if (Array.isArray(section.images) && section.images.length > 0) {
            bodyHtml += `<div class="modal-process-grid">`;
            section.images.forEach(img => {
              bodyHtml += `
                <div class="modal-process-item">
                  <img 
                    src="${escapeHtml(img.src)}" 
                    alt="${escapeHtml(img.alt || img.caption || 'Process photo')}"
                    width="600" 
                    height="380"
                    loading="lazy"
                  >
                </div>
              `;
            });
            bodyHtml += `</div>`;
          }

          // Resource / File Download Links
          if (Array.isArray(section.files) && section.files.length > 0) {
            bodyHtml += `<div class="modal-file-list">`;
            section.files.forEach(file => {
              bodyHtml += `
                <a href="${escapeHtml(file.url)}" download class="modal-file-item" title="Download ${escapeHtml(file.name)}">
                  <span>${escapeHtml(file.label || 'FILE LINK / ADDITIONAL RESOURCE')}</span>
                  <span style="font-weight: 500; color: var(--text-muted);">${escapeHtml(file.name)} &darr;</span>
                </a>
              `;
            });
            bodyHtml += `</div>`;
          }

          bodyHtml += `</div>`;
        });
      }

      modalBody.innerHTML = bodyHtml;
    }

    // Modal Footer Navigation state
    const total = documentationEntries.length;
    if (modalPrevBtn) modalPrevBtn.disabled = index <= 0;
    if (modalNextBtn) modalNextBtn.disabled = index >= total - 1;
    if (modalCounterIndicator) {
      modalCounterIndicator.textContent = `Entry ${index + 1} of ${total}`;
    }
  }

  function closeModal() {
    modalBackdrop.classList.remove('is-open');
    modalBackdrop.setAttribute('aria-hidden', 'true');

    document.body.classList.remove('modal-open');
    document.body.style.paddingRight = '';

    // Restore focus to triggering card
    if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
      lastFocusedElement.focus();
    }
  }

  function navigateModal(direction) {
    const newIndex = currentEntryIndex + direction;
    if (newIndex >= 0 && newIndex < documentationEntries.length) {
      currentEntryIndex = newIndex;
      renderModalContent(newIndex);
      if (modalBody) modalBody.scrollTop = 0;
    }
  }

  // Modal event listeners
  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
  }

  if (modalPrevBtn) {
    modalPrevBtn.addEventListener('click', () => navigateModal(-1));
  }

  if (modalNextBtn) {
    modalNextBtn.addEventListener('click', () => navigateModal(1));
  }

  // Click outside modal content to close
  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) {
        closeModal();
      }
    });
  }

  // Keyboard navigation & accessibility focus trapping
  document.addEventListener('keydown', (e) => {
    if (!modalBackdrop.classList.contains('is-open')) return;

    if (e.key === 'Escape') {
      e.preventDefault();
      closeModal();
      return;
    }

    if (e.key === 'ArrowLeft' && currentEntryIndex > 0) {
      e.preventDefault();
      navigateModal(-1);
      return;
    }

    if (e.key === 'ArrowRight' && currentEntryIndex < documentationEntries.length - 1) {
      e.preventDefault();
      navigateModal(1);
      return;
    }

    // Focus trapping within modal panel
    if (e.key === 'Tab') {
      const focusableElements = modalPanel.querySelectorAll(
        'button:not([disabled]), [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusableElements.length === 0) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    }
  });

  // ==========================================================================
  // 4. Navigation & Active Section Highlighting
  // ==========================================================================
  function updateActiveNavLink() {
    let currentActive = '';
    const scrollPos = window.scrollY + 140;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentActive = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      const targetId = link.getAttribute('href').substring(1);
      if (targetId === currentActive) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  window.addEventListener('scroll', updateActiveNavLink, { passive: true });
  window.addEventListener('resize', () => {
    updateTimelineControls();
    updateActiveNavLink();
  });

  // Helper function to safely escape HTML entities
  function escapeHtml(str) {
    if (typeof str !== 'string') return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  // --- Initial Execution ---
  renderTimeline();
  updateActiveNavLink();
});
