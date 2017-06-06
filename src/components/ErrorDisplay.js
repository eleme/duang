def(() => class extends Jinkela {
  set error(error) {
    if (typeof error === 'object') {
      let p = document.createElement('p');
      p.innerHTML = error.message || error.name || JSON.stringify(error);
      this.element.appendChild(p);
    } else if (typeof error === 'string') {
      this.element.innerHTML = '';
      let iframe = document.createElement('iframe');
      let url = URL.createObjectURL(new Blob([ error ], { type: 'text/html' }));
      iframe.frameBorder = '0';
      iframe.src = url;
      iframe.style.display = 'none';
      iframe.addEventListener('load', () => {
        iframe.style.display = 'block';
        iframe.style.height = iframe.contentDocument.documentElement.scrollHeight + 'px';
      });
      this.element.appendChild(iframe);
    }
  }
  get styleSheet() {
    return `
      :scope {
        width: 100%;
        opacity: .65;
        > p {
          text-align: center;
          font-size: 16px;
          padding: 3em;
          color: #ff4949;
          white-space: pre;
          margin: 0 1em;
          border-radius: 4px;
        }
        > iframe {
          width: 100%;
          display: none;
        }
      }
    `;
  }
});
