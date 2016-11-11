def((PanelWithIcon) => class extends PanelWithIcon {
  get iconTemplate() {
    return `
      <svg width="100" height="100" viewBox="0 0 1000 1000" fill="#e55c5c">
        <path d="M500 0C223 0 0 223 0 500c0 276 223 500 500 500 276 0 500-223 500-500C1000 223 776 0 500 0zM500 937c-241 0-437-196-437-437 0-241 196-437 437-437s437 196 437 437C937 741 741 937 500 937zM654 301 500 455 345 301 301 345 455 500 301 654 345 698 500 544 654 698 698 654 544 500 698 345Z"></path>
      </svg>
    `;
  }
  get defaultTitle() { return '错误'; }
  get defaultText() { return '一个神奇的错误'; }
});
