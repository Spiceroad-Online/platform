import { LitElement, css, html } from 'lit';

class SrCard extends LitElement {
    static styles = css`
        :host {
            display: block;
            border: 1px solid rgba(243, 194, 123, 0.16);
            background: linear-gradient(180deg, rgba(27, 15, 8, 0.92), rgba(11, 6, 4, 0.96));
            box-shadow: 0 18px 46px rgba(0, 0, 0, 0.28);
        }

        .frame {
            padding: 1.25rem;
        }
    `;

    render() {
        return html`<div class="frame"><slot></slot></div>`;
    }
}

customElements.define('sr-card', SrCard);
