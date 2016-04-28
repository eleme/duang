def((ListItem) => class extends ListItem {
  init() {
    this.text = this.title;
  }
  onClick() {
    switch (this.type) {
      case 'edit':
        let { key } = new UParams();
        location.hash = new UParams({ module: 'editor', key, id: this.id });
        break;
      case 'delete':
        api(this.scheme.api + '/' + this.id, { method: 'DELETE' }).then(result => {
          init();
        }, error => {
          alert(error.message);
        });
        break;
      case 'custom':
        api([ this.scheme.api, this.id, this.api ].join('/'), { method: 'POST' }).then(result => {
          init();
        }, error => {
          alert(error.message);
        });
    }
  }
  get styleSheet() {
    return `
      :scope {
        margin-left: .5em;
        display: inline-block;
      }
    `;
  }
});
