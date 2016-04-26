def((Scheme) => class extends Scheme {
  init() {
    console.log(this.scheme);
  }
  get styleSheet() {
    return `
      :scope {
        margin: 1em;
        font-size: 64px;
      }
    `;
  }
});
