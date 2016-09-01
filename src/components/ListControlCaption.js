def((Caption) => class extends Caption {
  get styleSheet() {
    return `
      :scope {
        line-height: 25px;
        margin-bottom: 1em;
      }
    `;
  }
});
