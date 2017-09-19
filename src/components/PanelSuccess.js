def((PanelWithIcon) => class extends PanelWithIcon {
  get iconTemplate() {
    return `
      <svg width="100" height="100" fill="#a4dd86" viewBox="0 0 1024 1024">
        <path d="M513 19c-271 0-491 220-491 491s220 491 491 491 491-220 491-491S784 19 513 19zM513 933c-233 0-423-189-423-423s189-423 423-423 423 189 423 423S746 933 513 933z"></path>
        <path d="M729 348 451 626l-157-157c-13-13-34-13-48 0s-13 34 0 48l205 205L778 396c13-13 13-34 0-48S742 334 729 348z"></path>
      </svg>
    `;
  }
  get defaultTitle() { return '成功'; }
  get defaultText() { return '操作成功'; }
});
