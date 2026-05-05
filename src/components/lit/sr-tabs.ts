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
            align-items: center;
            gap: 28px;
            padding-bottom: 12px;
            border-bottom: 1px solid rgba(243, 194, 123, 0.1);
        }

        button {
            appearance: none;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            min-height: 32px;
            padding: 0;
            border: 0;
            background: transparent;
            color: #f0d4ad;
            font: inherit;
            font-size: 1rem;
            font-weight: 400;
            letter-spacing: 0;
            cursor: pointer;
            position: relative;
            transition: color 0.18s ease;
        }

        button::after {
            content: '';
            position: absolute;
            left: 0;
            right: 0;
            bottom: -13px;
            height: 1px;
            pointer-events: none;
            background: linear-gradient(90deg, transparent, rgba(243, 194, 123, 0.95), transparent);
            opacity: 0;
            transform: scaleX(0.4);
            transition: 0.18s ease;
        }

        button:hover {
            color: var(--text, #f4e0bd);
        }

        button:focus-visible {
            outline: 1px solid rgba(243, 194, 123, 0.58);
            outline-offset: 7px;
        }

        button[data-active='true'] {
            color: var(--text, #f4e0bd);
            font-weight: 600;
        }

        button:hover::after,
        button[data-active='true']::after {
            opacity: 1;
            transform: scaleX(1);
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
            <div class="tabs" role="tablist" aria-label="Dashboard sections">
                ${tabs.map(
                    (tab) =>
                        html`<button
                            type="button"
                            role="tab"
                            aria-selected=${String(tab.key === this.active)}
                            data-active=${String(tab.key === this.active)}
                            tabindex=${tab.key === this.active ? '0' : '-1'}
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
