def((Tip) => {

  const QUESTION = 'data:image/svg+xml;base64,' + btoa(`
    <!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
    <svg viewBox="0 0 1025 1024" version="1" xmlns="http://www.w3.org/2000/svg">
      <path d="M952 516c0-241-196-437-437-437-241 0-437 196-437 437 0 241 196 437 437 437 241 0 437-196 437-437v0zM582 738c-19 7-35 13-46 17-11 4-25 6-40 6-23 0-42-5-55-17-13-11-19-26-19-44 0-6 0-14 1-21 1-7 2-15 4-24l24-86c2-8 4-16 5-23 1-7 2-14 2-20 0-11-2-18-6-23-4-4-13-6-26-6-6 0-12 0-19 2-6 2-12 3-17 5l6-26c16-6 31-12 46-16 14-4 28-7 41-7 23 0 41 5 54 17 12 11 19 26 19 44 0 3-0 10-1 19-0 9-2 18-4 26l-24 86c-1 6-3 14-5 23-1 8-2 15-2 20 0 11 2 19 7 23 5 4 14 6 26 6 5 0 12-1 20-3 7-2 12-3 16-5l-6 26zM578 387c-11 10-25 15-41 15-15 0-29-5-41-15-11-10-17-23-17-38 0-15 5-27 17-38 11-10 25-16 41-16 16 0 29 5 41 16 11 10 17 23 17 38 0 14-5 27-17 38v0zM578 387z" fill="#5f6d81"></path>
    </svg>
  `);

  return class extends Tip {
    init() {
      if (!('$value' in this)) this.value = void 0;
    }
    get value() { return this.$value; }
    set value(value = this.defaultValue) {
      if (!value) value = this;
      this.$value = value;
      super.value = { data: `<img src="${value.icon || QUESTION}" />`, tip: value.tip };
    }
    get styleSheet() {
      return `
        :scope {
          box-sizing: border-box;
          padding: 3px;
          height: 28px;
          align-items: center;
          justify-content: center;
          display: flex;
          img {
            width: 16px;
            height: 16px;
          }
        }
      `;
    }
  };

});
