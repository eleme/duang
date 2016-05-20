def((Button) => class extends Jinkela {
  static popup(config) {
    if (typeof config === 'string') config = { text: config };
    return new Promise((resolve, reject) => {
      dialog.popup(new this(config, {
        onYes: () => {
          resolve();
          dialog.cancel();
        }
      }));
    });
  }
  init() {
    this.title = this.title || 'Confirm';
    this.text = this.text || 'Are you sure?';

    if (!this.yes) this.yes = 'Yes';
    this.yes = typeof this.yes === 'string' ? { text: this.yes } : this.yes;
    this.yesButton = new Button(this.yes, { onClick: () => this.onYes() });

    if (!this.cancel) this.cancel = { text: 'Cancel', color: '#ccc' };
    this.cancel = typeof this.cancel === 'string' ? { text: this.cancel } : this.cancel;
    this.cancelButton = new Button(this.cancel, { onClick: dialog.cancel });
  }
  get template() {
    return `
      <div>
        <h3>{text}</h3>
        <div>
          <meta ref="yesButton" />
          <meta ref="cancelButton" />
        </div>
      </div>
    `;
  }
  get styleSheet() {
    return `
      :scope {
        h3 {
          margin: 0 0 2em 0;
          font-size: 18px;
        }
        button {
          font-size: 16px;
          margin: 0 1em;
        }
        padding: 2em;
      }
    `;
  }
});
