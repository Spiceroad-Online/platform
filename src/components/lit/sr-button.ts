import { LitElement, css, html } from 'lit';

class SrButton extends LitElement {
    static properties = {
        href: { type: String },
        label: { type: String },
        variant: { type: String, reflect: true },
        block: { type: Boolean, reflect: true },
        type: { type: String },
    };

    href = '';
    label = '';
    variant = 'primary';
    block = false;
    type = 'button';

    static styles = css`
        :host {
            display: inline-flex;
            max-width: 100%;
        }

        :host([block]) {
            display: flex;
            width: 100%;
        }

        .control {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            min-height: 48px;
            width: 100%;
            padding: 0 20px;
            border-radius: 3px;
            border: 1px solid var(--line-2, rgba(243, 194, 123, 0.34));
            background: linear-gradient(180deg, rgba(35, 20, 10, 0.44), rgba(12, 7, 4, 0.92));
            color: var(--text, #f4e0bd);
            box-shadow:
                inset 0 0 0 1px rgba(255, 255, 255, 0.03),
                0 12px 30px rgba(0, 0, 0, 0.22);
            cursor: pointer;
            font: inherit;
            font-weight: 600;
            letter-spacing: 0.01em;
            text-decoration: none;
            transition:
                transform 0.18s ease,
                box-shadow 0.18s ease,
                border-color 0.18s ease,
                background 0.18s ease,
                color 0.18s ease;
            position: relative;
            overflow: hidden;
            box-sizing: border-box;
        }

        .control::before {
            content: '';
            position: absolute;
            inset: 0;
            pointer-events: none;
            background: linear-gradient(90deg, transparent, rgba(255, 226, 181, 0.16), transparent);
            transform: translateX(-120%);
        }

        .control:hover {
            transform: translateY(-1px);
            box-shadow:
                inset 0 0 0 1px rgba(255, 255, 255, 0.04),
                0 18px 34px rgba(0, 0, 0, 0.3),
                0 0 18px rgba(217, 139, 51, 0.12);
        }

        .control:hover::before {
            transform: translateX(120%);
            transition: transform 0.7s ease;
        }

        .control:focus-visible {
            outline: 2px solid rgba(243, 194, 123, 0.8);
            outline-offset: 2px;
        }

        .control[data-variant='secondary'] {
            background: rgba(255, 255, 255, 0.015);
            border-color: rgba(243, 194, 123, 0.32);
            color: #f7e1bc;
            box-shadow: none;
        }

        .control[data-variant='secondary']:hover {
            background: rgba(243, 194, 123, 0.08);
            border-color: rgba(243, 194, 123, 0.68);
            box-shadow: 0 0 18px rgba(243, 194, 123, 0.18);
        }
    `;

    private get normalizedVariant() {
        return this.variant === 'ghost' ? 'secondary' : this.variant;
    }

    render() {
        const content = html`<slot>${this.label}</slot>`;

        if (this.href) {
            return html`<a class="control" href=${this.href} data-variant=${this.normalizedVariant}>${content}</a>`;
        }

        return html`<button class="control" type=${this.type} data-variant=${this.normalizedVariant}>
            ${content}
        </button>`;
    }
}

customElements.define('sr-button', SrButton);
