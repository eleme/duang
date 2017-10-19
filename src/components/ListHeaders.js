def((Output, Caption) => {

  class ListCaption extends Caption {
    get styleSheet() {
      return `
        :scope {
          line-height: 25px;
          margin-bottom: 1em;
        }
      `;
    }
  }

  return class extends Jinkela {
    init() {
      let { depot } = this;
      let { scheme } = depot;
      let { headers, caption, captionType } = scheme;
      if (!headers) {
        headers = [];
        if ('title' in scheme) headers.push({ component: 'Breadcrumbs' });
      }
      [].concat(headers).forEach(raw => Output.createAny(raw, { depot }).to(this));
      if (captionType === 'control' && caption) new ListCaption({ depot }).to(this); // 历史遗留，建议废弃
    }
    get styleSheet() {
      return `
        :scope {
          flex-direction: column;
          display: flex;
          line-height: 32px;
          > * {
            margin-bottom: 1em;
          }
        }
      `;
    }
  };

});
