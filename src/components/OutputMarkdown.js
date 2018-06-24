def(() => {

  return new Promise(resolve => {

    require([ 'marked' ], marked => {

      class OutputMarkdown extends Jinkela {
        get value() { return this.$value; }
        set value(value = this.defaultValue) {
          if (this.$value === value) return;
          this.$value = value;
          this.render();
        }
        init() {
          this.element.classList.add('markdown-body');
          this.value = this.value;
        }
        render() {
          this.element.innerHTML = marked(this.value || '');
        }
        get styleSheet() {
          return `
            :scope {
              font-size: inherit;
              color: inherit;
              &::before { display: none; }
              table {
                font-size: inherit;
              }
            }
          `;
        }
      }

      resolve(OutputMarkdown);

    });

  });

});
