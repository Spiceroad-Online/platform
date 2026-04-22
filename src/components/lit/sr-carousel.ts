import { LitElement, css, html } from 'lit';

class SrCarousel extends LitElement {
    static properties = {
        autoplay: { type: Number },
        label: { type: String },
        activeIndex: { state: true },
        slideCount: { state: true },
    };

    autoplay = 0;
    label = 'Media carousel';
    activeIndex = 0;
    slideCount = 0;

    private autoplayId: number | null = null;

    static styles = css`
        :host {
            display: block;
            position: relative;
            height: 100%;
        }

        .frame {
            position: relative;
            height: 100%;
            overflow: hidden;
            border: 1px solid rgba(243, 194, 123, 0.12);
            background: #120a05;
        }

        .viewport {
            position: relative;
            height: 100%;
            overflow: hidden;
            background: #120a05;
        }

        slot {
            display: block;
            height: 100%;
        }

        .track {
            position: relative;
            height: 100%;
        }

        ::slotted(.carousel-slide) {
            display: block;
            position: relative;
            height: 100%;
            aspect-ratio: 16 / 10;
            margin: 0;
            overflow: hidden;
            background: #120a05;
            transition:
                opacity 0.28s ease,
                transform 0.28s ease;
        }

        .controls {
            position: absolute;
            left: 16px;
            right: 16px;
            bottom: 16px;
            z-index: 2;
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 16px;
        }

        .dots {
            display: flex;
            gap: 10px;
            align-items: center;
            flex-wrap: wrap;
        }

        .dot {
            width: 9px;
            height: 9px;
            padding: 0;
            border-radius: 50%;
            border: 1px solid rgba(243, 194, 123, 0.5);
            background: transparent;
            cursor: pointer;
        }

        .dot[data-active='true'] {
            background: var(--gold, #f3c27b);
            box-shadow: 0 0 12px rgba(243, 194, 123, 0.28);
        }

        .nav {
            display: flex;
            gap: 10px;
        }

        .nav-button {
            min-height: 36px;
            padding: 0 14px;
            border-radius: 999px;
            border: 1px solid rgba(243, 194, 123, 0.22);
            background: rgba(8, 5, 3, 0.72);
            color: var(--text, #f4e0bd);
            cursor: pointer;
            font: inherit;
            font-weight: 600;
        }

        .nav-button:hover {
            border-color: rgba(243, 194, 123, 0.48);
        }

        .nav-button:focus-visible,
        .dot:focus-visible {
            outline: 2px solid rgba(243, 194, 123, 0.8);
            outline-offset: 2px;
        }
    `;

    disconnectedCallback() {
        this.stopAutoplay();
        super.disconnectedCallback();
    }

    firstUpdated() {
        this.handleSlotChange();
    }

    updated(changedProperties: Map<string, unknown>) {
        if (changedProperties.has('activeIndex')) {
            this.syncSlides();
        }

        if (changedProperties.has('autoplay') || changedProperties.has('slideCount')) {
            this.resetAutoplay();
        }
    }

    private getSlides() {
        const slot = this.renderRoot.querySelector('slot');
        if (!(slot instanceof HTMLSlotElement)) return [];

        return slot
            .assignedElements({ flatten: true })
            .filter((element): element is HTMLElement => element instanceof HTMLElement);
    }

    private handleSlotChange = () => {
        const slides = this.getSlides();
        this.slideCount = slides.length;

        if (slides.length === 0) {
            this.activeIndex = 0;
            return;
        }

        if (this.activeIndex >= slides.length) {
            this.activeIndex = 0;
        }

        this.syncSlides();
        this.resetAutoplay();
    };

    private syncSlides() {
        const slides = this.getSlides();
        slides.forEach((slide, index) => {
            const isActive = index === this.activeIndex;
            slide.hidden = !isActive;
            slide.setAttribute('aria-hidden', String(!isActive));
            slide.style.opacity = isActive ? '1' : '0';
            slide.style.transform = isActive ? 'translateX(0)' : 'translateX(12px)';
        });
    }

    private goTo(index: number) {
        if (this.slideCount < 1) return;
        this.activeIndex = (index + this.slideCount) % this.slideCount;
    }

    private stopAutoplay = () => {
        if (this.autoplayId !== null) {
            window.clearInterval(this.autoplayId);
            this.autoplayId = null;
        }
    };

    private startAutoplay = () => {
        if (
            this.autoplay <= 0 ||
            this.slideCount < 2 ||
            window.matchMedia('(prefers-reduced-motion: reduce)').matches
        ) {
            return;
        }

        this.autoplayId = window.setInterval(() => {
            this.goTo(this.activeIndex + 1);
        }, this.autoplay);
    };

    private resetAutoplay() {
        this.stopAutoplay();
        this.startAutoplay();
    }

    render() {
        return html`
            <section
                class="frame"
                role="group"
                aria-roledescription="carousel"
                aria-label=${this.label}
                @mouseenter=${this.stopAutoplay}
                @mouseleave=${this.startAutoplay}
                @focusin=${this.stopAutoplay}
                @focusout=${this.startAutoplay}
            >
                <div class="viewport">
                    <div class="track">
                        <slot @slotchange=${this.handleSlotChange}></slot>
                    </div>
                </div>

                ${this.slideCount > 1
                    ? html`
                          <div class="controls">
                              <div class="dots">
                                  ${Array.from(
                                      { length: this.slideCount },
                                      (_, index) =>
                                          html`<button
                                              class="dot"
                                              type="button"
                                              data-active=${String(index === this.activeIndex)}
                                              aria-label=${`Go to slide ${index + 1}`}
                                              @click=${() => this.goTo(index)}
                                          ></button>`,
                                  )}
                              </div>
                              <div class="nav">
                                  <button
                                      class="nav-button"
                                      type="button"
                                      aria-label="Previous slide"
                                      @click=${() => this.goTo(this.activeIndex - 1)}
                                  >
                                      Prev
                                  </button>
                                  <button
                                      class="nav-button"
                                      type="button"
                                      aria-label="Next slide"
                                      @click=${() => this.goTo(this.activeIndex + 1)}
                                  >
                                      Next
                                  </button>
                              </div>
                          </div>
                      `
                    : null}
            </section>
        `;
    }
}

customElements.define('sr-carousel', SrCarousel);
