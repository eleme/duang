def((Item) => {

  class MainWithDefaultItem extends Item {
    get template() {
      return `
        <dl>
          <dt><a href="JavaScript:">{text}</a></dt>
          <dd>{subText}</dd>
        </dl>
      `;
    }
    init() {
      if (this.currentKey === this.key) this.element.classList.add('active');
      this.text = this.title || this.key.replace(/([^/]{2})[^/]{3,}\//g, '$1../');
      this.subText = this.key || this.href;
      if (this.icon && this.icon !== 'about:blank') {
        this.element.style.setProperty('--icon', `url("${this.icon}")`);
        this.element.dataset.char = '';
      } else {
        this.element.dataset.char = this.text ? this.text.match(/[^-]*$/g)[0].trimLeft()[0] : 'X';
      }
    }
    onClick() {
      let { href, target, module = 'list', key, where = {}, params = {} } = this;
      let tasks = [];
      if (this['@where']) tasks.push(api([ this.key, this['@where'] ]).then(result => (where = result)));
      if (this['@params']) tasks.push(api([ this.key, this['@params'] ]).then(result => (params = result)));
      return Promise.all(tasks).then(() => {
        where = JSON.stringify(where);
        params = JSON.stringify(params);
        if (href) return open(href, target);
        return this.depot.go({ args: { module, key, params, where }, target });
      });
    }
    get styleSheet() {
      let radius = 40;
      let padding = 12;
      return `
        :scope {
          position: relative;
          border: 1px solid #e6e6e6;
          min-width: 300px;
          flex: auto;
          border-radius: 6px;
          display: inline-block;
          box-sizing: border-box;
          margin: 1em;
          line-height: 20px;
          font-size: 14px;
          list-style: none;
          white-space: nowrap;
          padding: ${padding}px;
          padding-left: ${radius + padding * 2}px;
          transition: all 200ms ease;
          color: #324057;
          overflow: hidden;
          cursor: pointer;
          box-shadow: 0 1px 3px rgba(0,37,55,.05);
          background: #fff;
          &:hover {
            transform: translateY(-4px);
            border-color: transparent;
            box-shadow: 0 9px 18px 0 rgba(0,0,0,.24);
          }
          &::before {
            position: absolute;
            content: attr(data-char);
            border-radius: 100%;
            background-color: #58B7FF;
            width: ${radius}px;
            height: ${radius}px;
            line-height: ${radius}px;
            font-size: 16px;
            color: #fff;
            text-align: center;
            top: ${padding}px;
            left: ${padding}px;
          }
          &::after {
            position: absolute;
            content: '';
            filter: brightness(2);
            background-image: var(--icon);
            background-position: center;
            background-repeat: no-repeat;
            background-size: 24px 24px;
            width: ${radius}px;
            height: ${radius}px;
            color: #fff;
            text-align: center;
            top: ${padding}px;
            left: ${padding}px;
          }
          dd {
            margin: 0;
            color: #c0ccda;
            transform: scale(.8);
            transform-origin: left;
          }
          a {
            font-weight: 500;
            color: #1F2D3D;
            display: inline-block;
            vertical-align: middle;
            text-overflow: ellipsis;
            overflow: hidden;
          }
        }
        @media (max-width: 600px) {
          :scope {
            margin: 0 0 1em 0;
            display: block;
            width: auto;
          }
        }
      `;
    }
  }

  return class extends Jinkela {
    init() {
      Object.defineProperty(this.depot, 'main', { configurable: true, value: this });
      while (this.element.firstChild) this.element.firstChild.remove();
      let { key, session, schemes } = this.depot;
      let { permissions = [] } = session;
      schemes = schemes.filter(scheme => {
        if (/(?:^|\/):/.test(scheme.key)) return false;
        if (scheme.hidden) return false;
        if (!scheme.title) return;
        if (!scheme.require) return true;
        return scheme.require.some((dep => ~permissions.indexOf(dep)));
      });
      MainWithDefaultItem.cast(schemes, { currentKey: key, depot: this.depot }).to(this);
    }
    get styleSheet() {
      return `
        :scope {
          background: #f9f9f9;
          list-style: none;
          padding: 1em;
          height: 100%;
          display: flex;
          flex-flow: wrap;
          box-sizing: border-box;
        }
      `;
    }
  };

});
