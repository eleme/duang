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
        fetch(this.scheme.api + '/' + this.id, { method: 'DELETE', credentials: 'include' }).then(response => {
          if (response.status >= 400) return response.json().then(result => { throw result; });
          return response.json();
        }).then(result => {
          // TODO: 根据 result 来选择行为
          init();
        }, error => {
          alert(error.message);
        });
        break;
      case 'custom':
        fetch(this.api, { method: 'POST', credentials: 'include' }).then(response => {
          if (response.status >= 400) return response.json().then(result => { throw result; });
          return response.json();
        }).then(result => {
          console.log(result);
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
