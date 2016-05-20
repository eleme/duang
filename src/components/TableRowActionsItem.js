def((ListItem, Confirm) => class extends ListItem {
  init() {
    this.text = this.title;
  }
  onClick() {
    this.confirm ? Confirm.popup(this.confirm).then(() => this.exec()) : this.exec();
  }
  exec() {
    switch (this.method) {
      case 'edit':
        let { key } = new UParams();
        location.hash = new UParams({ module: 'editor', key, id: this.id });
        break;
      default:
        let path = [ this.scheme.key, this.id ];
        if ('api' in this) path.push(this.api);
        api(path.join('/'), { method: this.method }).then(result => {
          init();
        }, error => {
          alert(error.message);
        });
        break;
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
