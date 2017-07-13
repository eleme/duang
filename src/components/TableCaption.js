def((Caption) => class extends Caption {
  get tagName() { return 'caption'; }
  get styleSheet() {
    return `
      :scope {
        background: #eff2f7;
        border-bottom: 1px solid #e0e6ed;
        padding: 0 18px;
      }
    `;
  }
});
