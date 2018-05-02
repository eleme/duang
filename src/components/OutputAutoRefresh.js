def(() => {

  return class extends Jinkela {

    get template() {
      let icon = (k, i = 1) => `https://httpizza.ele.me/common/icon.svg?keyword=${k}&index=${i}&fill=%2320a0ff`;
      return `
        <div>
          <span if="{timer}">
            每 <span>{intervalText}</span>s 自动刷新，
            <a href="javascript:" on-click="{pause}"><img src="${icon('暂停', 10)}" /></a>
            <a href="javascript:" on-click="{manualRefresh}"><img src="${icon('refresh', 4)}" /></a>
          </span>
          <span if-not="{timer}">
            已暂停，
            <a href="javascript:" on-click="{play}"><img src="${icon('播放', 1)}" /></a>
            <a href="javascript:" on-click="{manualRefresh}"><img src="${icon('refresh', 4)}" /></a>
          </span>
        </div>
      `;
    }

    updateAutoRefreshPaused(autoRefreshPaused) {
      let params = JSON.stringify(Object.assign({}, this.depot.params, { autoRefreshPaused }));
      this.depot.update({ params });
    }

    get pause() {
      let value = () => this.updateAutoRefreshPaused(true);
      Object.defineProperty(this, 'pause', { value, configurable: true });
      return value;
    }

    get play() {
      let value = () => this.updateAutoRefreshPaused(false);
      Object.defineProperty(this, 'pause', { value, configurable: true });
      return value;
    }

    init() {
      this.interval = Number(this.interval) || 10000;
      this.intervalText = +(this.interval / 1000).toFixed(2);
      if (!this.depot.params.autoRefreshPaused) this.setTimer();
    }

    get manualRefresh() {
      let value = () => this.depot.refresh();
      Object.defineProperty(this, 'manualRefresh', { value, configurable: true });
      return value;
    }

    setTimer() {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        // 只有当自己依然在 DOM 上时才刷新
        if (document.body.contains(this.element)) this.depot.refresh();
      }, this.interval);
    }

    get styleSheet() {
      return `
        :scope {
          * {
            display: inline-block;
            vertical-align: middle;
          }
          a { color: #20a0ff; }
          img {
            width: 16px;
          }
        }
      `;
    }

  };

});
