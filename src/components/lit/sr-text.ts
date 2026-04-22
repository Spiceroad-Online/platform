import { LitElement, css, html } from 'lit';

class SrText extends LitElement {
    static properties = {
        tone: { type: String, reflect: true },
    };

    tone = 'primary';

    static styles = css`
        :host {
            display: inline;
            font: inherit;
            line-height: inherit;
            letter-spacing: inherit;
        }

        .text {
            color: var(--title-gold-mid, #efc98e);
            font: inherit;
            line-height: inherit;
            letter-spacing: inherit;
            text-shadow:
                0 1.1px 0 rgba(255, 244, 220, 0.33),
                0 2.2px 0 rgba(145, 89, 34, 0.46),
                0 12px 24px rgba(0, 0, 0, 0.34),
                0 0 18px var(--title-gold-glow, rgba(243, 194, 123, 0.22));
        }

        .text[data-tone='secondary'] {
            color: var(--title-secondary-mid, #9f683d);
            text-shadow:
                0 1px 0 rgba(247, 219, 188, 0.26),
                0 2px 0 rgba(95, 53, 22, 0.32),
                0 8px 18px rgba(0, 0, 0, 0.24),
                0 0 12px var(--title-secondary-glow, rgba(201, 136, 74, 0.12));
        }

        @supports ((-webkit-background-clip: text) or (background-clip: text)) {
            .text[data-tone='primary'] {
                background: linear-gradient(
                    180deg,
                    var(--title-gold-light, #fff1cf) 0%,
                    #f6dba8 24%,
                    var(--title-gold-mid, #efc98e) 54%,
                    var(--title-gold-deep, #c67b2f) 78%,
                    #ffe7ba 100%
                );
                -webkit-background-clip: text;
                background-clip: text;
                -webkit-text-fill-color: transparent;
                color: transparent;
                -webkit-text-stroke: 0.0165em rgba(64, 30, 7, 0.26);
                filter: drop-shadow(0 2.2px 1.1px rgba(33, 13, 2, 0.37));
            }

            .text[data-tone='secondary'] {
                background: linear-gradient(
                    180deg,
                    #efc590 0%,
                    var(--title-secondary-light, #d8b38b) 14%,
                    var(--title-secondary-bright, #c8925e) 34%,
                    var(--title-secondary-mid, #9f683d) 58%,
                    #7b4722 82%,
                    var(--title-secondary-deep, #5f3516) 100%
                );
                -webkit-background-clip: text;
                background-clip: text;
                -webkit-text-fill-color: transparent;
                color: transparent;
                -webkit-text-stroke: 0.013em var(--title-secondary-shadow, rgba(45, 24, 10, 0.48));
                filter: drop-shadow(0 2px 1px rgba(20, 11, 6, 0.2));
            }
        }
    `;

    render() {
        return html`<span class="text" data-tone=${this.tone}><slot></slot></span>`;
    }
}

customElements.define('sr-text', SrText);
