import { LitElement, css, html } from 'lit';

class SrUploadBox extends LitElement {
    static properties = {
        heading: { type: String },
        note: { type: String },
    };

    heading = 'Upload Intake';
    note = 'Drop your client archive and brand assets here when backend wiring is available.';

    static styles = css`
        :host {
            display: block;
        }

        .dropzone {
            border: 1px dashed rgba(243, 194, 123, 0.35);
            padding: 1.25rem;
            background: rgba(18, 10, 6, 0.62);
            color: var(--text, #f4e0bd);
        }

        p {
            margin: 0.5rem 0 0;
            color: var(--muted, #d8b88f);
        }
    `;

    render() {
        return html`
            <div class="dropzone">
                <strong>${this.heading}</strong>
                <p>${this.note}</p>
                <slot></slot>
            </div>
        `;
    }
}

customElements.define('sr-upload-box', SrUploadBox);
