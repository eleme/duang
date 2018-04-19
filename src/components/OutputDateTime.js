def(() => class extends Jinkela {

  update() {
    let { value, format = '$Y-$M-$D', offset, mode } = this;
    if (mode === 'UNIX_TIMESTAMP') {
      value = typeof value === 'number' ? value * 1000 : value;
      offset = typeof offset === 'number' ? offset * 1000 : offset;
    }
    value = new Date(value);
    if (offset) value = new Date(value.getTime() + offset);
    const lz = date => (date + '').replace(/\b\d\b/g, '0$&');
    this.element.innerHTML = format.replace(/\$(.)/g, ($0, char) => {
      switch (char) {
        case 'Y': return lz(value.getFullYear());
        case 'M': return lz(value.getMonth() + 1);
        case 'D': return lz(value.getDate());
        case 'H': return lz(value.getHours());
        case 'I': return lz(value.getMinutes());
        case 'S': return lz(value.getSeconds());
        default: return '';
      }
    });
  }

  get format() { return this.$format; }
  set format(value) {
    Object.defineProperty(this, '$format', { configurable: true, value });
    this.update();
  }

  get format() { return this.$format; }
  set format(value) {
    Object.defineProperty(this, '$format', { configurable: true, value });
    this.update();
  }

  get value() { return this.$value; }
  set value(value) {
    Object.defineProperty(this, '$value', { configurable: true, value });
    this.update();
  }

});
