// 设置 base 标签（TODO：太恶心了，副作用太大，应该想办法不修改 base）
{
  let [ , path ] = document.currentScript.src.match(/^(.*\/)duang\.js$/);
  let base = document.createElement('base');
  base.setAttribute('href', path);
  document.head.appendChild(base);
}

// loading 效果（TODO：太丑，应该重新设计一下）
{
  let element = document.createElement('div');
  element.style.position = 'absolute';
  element.style.top = element.style.left = '50%';
  element.style.transform = 'translate(-50%, -50%)';
  let ready = document.body ? Promise.resolve() : new Promise(resolve => addEventListener('DOMContentLoaded', resolve));
  ready.then(() => document.body.appendChild(element));
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
  let w = (...args) => {
    let src = String.raw(...args);
    return new Promise((resolve, reject) => {
      let loader;
      loader = document.createElement('script');
      loader.setAttribute('src', src);
      loader.addEventListener('load', resolve);
      loader.addEventListener('error', reject);
      document.head.appendChild(loader);
    }).then(() => {
      let detail = '正在加载依赖 ···';
      dispatchEvent(new CustomEvent('duang::notify', { detail }));
    });
  };

  // 加载 CSS（TODO：收到具体控件中懒加载）
  let link = document.createElement('link');
  link.setAttribute('rel', 'stylesheet');
  link.setAttribute('href', `https://shadow.elemecdn.com/bundle/${[
    'gh/codemirror/CodeMirror@5.19.0/lib/codemirror.css',
    'gh/codemirror/CodeMirror@5.19.0/theme/neo.css',
    'gh/sindresorhus/github-markdown-css@gh-pages/github-markdown.css'
  ].join(',')}`);
  document.head.appendChild(link);

  // 加载 JS
  Promise.all([
    w`https://shadow.elemecdn.com/bundle/${[
      'npm/excavator@0.2.1/bundle.min.js',
      'npm/jinkela@1.3.5/umd.min.js',
      'npm/stale-while-revalidate@0.1.0/bundle.min.js',
      'npm/fast-resolve@0.2.0/umd.min.js',
      'npm/jinkela-dialog@0.1.6/dialog.min.js',
      'npm/UParams@1.4.0/UParams.min.js',
      'gh/s3u/JSONPath@v0.15.0/lib/jsonpath.min.js',
      'gh/YanagiEiichi/requirejs@caae34b/require.min.js',
      'placeholder/bundle.js'
    ].join(',')}`,

    w`utils/api.js`,
    w`utils/doAction.js`,
    w`utils/refactor.js`,
    w`utils/debounce.js`,
    w`utils/condition.js`,
    w`utils/amdx.js`,
    w`utils/depot.js`
  ]).then(() => {
    duang();
    dispatchEvent(new CustomEvent('duang::notify', { detail: '依赖加载完毕' }));
  }, error => {
    let { src } = error.target;
    dispatchEvent(new CustomEvent('duang::fatal', { detail: `依赖（${src}）加载失败` }));
    setTimeout(() => { throw error; });
  });

}
