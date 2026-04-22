import { LitElement, css, html } from 'lit';

class SrButton extends LitElement {
    static properties = {
        href: { type: String },
        label: { type: String },
        variant: { type: String },
    };

    href = '';
    label = '';
    variant = 'primary';

    static styles = css`
        :host {
            display: inline-flex;
        }

        a {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            min-height: 44px;
            padding: 0 18px;
            border: 1px solid var(--line-2, rgba(243, 194, 123, 0.34));
            color: var(--text, #f4e0bd);
            text-decoration: none;
            background: linear-gradient(180deg, rgba(35, 20, 10, 0.44), rgba(12, 7, 4, 0.92));
            letter-spacing: 0.01em;
        }

        a[data-variant='ghost'] {
            background: transparent;
        }
    `;

    render() {
        return html`<a href=${this.href} data-variant=${this.variant}><slot>${this.label}</slot></a>`;
    }
}

customElements.define('sr-button', SrButton);
