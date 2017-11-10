// 设置 base 标签
{
  let [ , path ] = document.currentScript.src.match(/^(.*\/)duang\.js$/);
  let base = document.createElement('base');
  base.setAttribute('href', path);
  document.head.appendChild(base);
}

// loading 效果
{
  let element = document.createElement('div');
  element.style.position = 'absolute';
  element.style.top = element.style.left = '50%';
  element.style.transform = 'translate(-50%, -50%)';
  let domReady = document.body ? Promise.resolve() : new Promise(resolve => addEventListener('DOMContentLoaded', resolve));
  domReady.then(() => document.body.appendChild(element));
  let state = 'LOADING';
  addEventListener('duang::fatal', () => {
    if (state !== 'LOADING') return;
    element.innerHTML = event.detail;
    element.style.color = 'red';
    state = 'FATAL';
  });
  addEventListener('duang::notify', event => {
    if (state !== 'LOADING') return;
    element.innerHTML = event.detail;
  });
  addEventListener('duang::done', () => {
    if (state !== 'LOADING') return;
    state = 'DONE';
    element.remove();
  });
}

// 加载资源（考虑依赖关系）
{

  let resourceTotalCount = 0;
  let resourceLoadedCount = 0;

  let w = (...args) => {
    resourceTotalCount++;
    let src = String.raw(...args);
    return () => new Promise((resolve, reject) => {
      let loader;
      switch (/\.\w+$|$/.exec(src)[0]) {
        case '.js':
          loader = document.createElement('script');
          loader.setAttribute('src', src);
          break;
        case '.css':
          loader = document.createElement('link');
          loader.setAttribute('rel', 'stylesheet');
          loader.setAttribute('href', src);
          break;
      }
      loader.addEventListener('load', resolve);
      loader.addEventListener('error', reject);
      document.head.appendChild(loader);
    }).then(() => {
      resourceLoadedCount++;
      dispatchEvent(new CustomEvent('duang::notify', { detail: `正在静态资源加载 (${resourceLoadedCount}/${resourceTotalCount})` }));
    });
  };

  let group = (...args) => () => Promise.all(args.map(item => {
    if (item instanceof Array) {
      return item.reduce((task, next) => task.then(next), Promise.resolve());
    } else if (typeof item === 'function') {
      return item();
    }
  }));

  let load = group(
    w`https://shadow.elemecdn.com/gh/codemirror/CodeMirror@5.19.0/lib/codemirror.css,/gh/codemirror/CodeMirror@5.19.0/theme/neo.css,/gh/sindresorhus/github-markdown-css@gh-pages/github-markdown.css`,
    [
      group(
        window.fetch ? null : w`https://github.elemecdn.com/uglifyjs!github/fetch/v0.11.0/fetch.js`,
        w`https://shadow.elemecdn.com/npm/excavator@0.2.1/bundle.js,npm/jinkela@1.2.21/umd.min.js,gh/jinkelajs/jinkela-datepicker@1.2.3/datepicker.js,gh/jinkelajs/jinkela-timepicker@1.0.0/timepicker.js,gh/jinkelajs/jinkela-dialog@0.1.6/dialog.js,gh/jinkelajs/jinkela-cascader@1.0.0/index.js,gh/jinkelajs/jinkela-forest@1.0.2/index.js,gh/jinkelajs/jinkela-checkbox@1.0.0/index.js,gh/jinkelajs/jinkela-radio@1.0.0/index.js,gh/jinkelajs/jinkela-clicktip@1.0.0/index.js,gh/chjj/marked@v0.3.6/marked.min.js,gh/YanagiEiichi/uparams@1.4.0/UParams.min.js,npm/stale-while-revalidate@0.1.0/bundle.min.js,gh/s3u/JSONPath@v0.15.0/lib/jsonpath.min.js,npm/vanilla.js@1.0.0/index.js`,
        w`utils/api.js`,
        w`utils/doAction.js`,
        w`utils/refactor.js`,
        w`utils/debounce.js`,
        w`utils/condition.js`,
        w`utils/amdx.js`,
        w`https://shadow.elemecdn.com/gh/codemirror/CodeMirror@5.19.0/lib/codemirror.min.js`
      ),
      w`https://shadow.elemecdn.com/gh/codemirror/CodeMirror@5.19.0/mode/yaml/yaml.min.js,/gh/codemirror/CodeMirror@5.19.0/mode/markdown/markdown.min.js`,
      w`https://shadow.elemecdn.com/gh/requirejs/requirejs@2.2.0/require.min.js`,
      w`utils/depot.js`
    ]
  );

  load().then(() => {
    dispatchEvent(new CustomEvent('duang::notify', { detail: '静态资源加载完毕' }));
  }, error => {
    dispatchEvent(new CustomEvent('duang::fatal', { detail: '静态资源加载失败' }));
    setTimeout(() => { throw error; });
  });

}
