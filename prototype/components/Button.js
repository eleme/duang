def((Item) => class extends Item {
  get template() {
    return `<button text="{text}"></button>`;
  }
  get styleSheet() {
    return `
      :scope {
        border: 0;
        border-radius: 5px;
        background: #1e89e0;
        padding: .25em .5em;
        cursor: pointer;
        color: #fff;
        &:before {
          content: attr(text);
        }
        &:hover {
          opacity: 0.8;
        }
        &:focus {
          outline: none;
        }
      }
    `;
  }
});
