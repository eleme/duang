define(() => {

  return class extends Jinkela {
    init() {
      this.element.setAttribute('viewBox', this.viewBox || '0 0 1000 1000');
      let path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('d', this.data);
      this.element.appendChild(path);
    }
    set class(value) { this.element.setAttribute('class', value); }
    get class() { return this.element.getAttribute('class'); }
    get template() {
      return `
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"></svg>
      `;
    }
  };

});
