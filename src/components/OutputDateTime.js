def(() => class extends Jinkela {
  init() {
    let { value, format = '$Y-$M-$D', offset } = this;
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
});
