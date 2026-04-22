import { LitElement, css, html } from 'lit';

type Tab = {
    key: string;
    label: string;
};

class SrTabs extends LitElement {
    static properties = {
        tabs: { attribute: false },
        active: { type: String },
    };

    tabs: Tab[] = [];
    active = '';

    static styles = css`
        :host {
            display: block;
        }

        .tabs {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
        }

        button {
            border: 1px solid rgba(243, 194, 123, 0.22);
            background: rgba(18, 10, 6, 0.8);
            color: var(--text, #f4e0bd);
            padding: 0.65rem 0.9rem;
            cursor: pointer;
        }

        button[data-active='true'] {
            border-color: rgba(243, 194, 123, 0.65);
            background: rgba(58, 33, 14, 0.92);
        }
    `;

    private onSelect(key: string) {
        this.active = key;
        this.dispatchEvent(new CustomEvent('tab-change', { detail: { key } }));
    }

    render() {
        const tabs = this.tabs.length
            ? this.tabs
            : [
                  { key: 'overview', label: 'Overview' },
                  { key: 'downloads', label: 'Downloads' },
                  { key: 'uploads', label: 'Uploads' },
              ];

        if (!this.active) {
            this.active = tabs[0]?.key ?? '';
        }

        return html`
            <div class="tabs">
                ${tabs.map(
                    (tab) =>
                        html`<button
                            type="button"
                            data-active=${String(tab.key === this.active)}
                            @click=${() => this.onSelect(tab.key)}
                        >
                            ${tab.label}
                        </button>`,
                )}
            </div>
        `;
    }
}

customElements.define('sr-tabs', SrTabs);
