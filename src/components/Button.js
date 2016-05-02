def((Item) => class extends Item {
  init() {
    this.element.style.backgroundColor = this.color || '#5bbd72';
  }
  get template() {
    return `<button text="{text}"></button>`;
  }
  get styleSheet() {
    return `
      :scope {
        border: 0;
        border-radius: 5px;
        padding: .4em .8em;
        font-size: 12px;
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
