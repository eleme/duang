// 设置 base 标签
{
  let [ , path ] = document.currentScript.src.match(/^(.*\/)duang\.js$/);
  let base = document.createElement('base');
  base.setAttribute('href', path);
  document.head.appendChild(base);
}

// 设置 loading 效果
{
  let style = document.createElement('style');
  style.innerHTML = `
    @keyFrames body-busy {
      0% { content: var(--global-message) ' ·'; }
      25% { content: var(--global-message) ' ··'; }
      50% { content: var(--global-message) ' ···'; }
      75% { content: var(--global-message) ' ····'; }
      100% { content: var(--global-message) ' ·'; }
    }
    body::before {
      content: var(--global-message);
      animation: var(--global-message-animation) 1s linear infinite;
      position: fixed;
      font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
      font-size: 32px;
      height: 200px;
      line-height: 200px;
      white-space: nowrap;
      text-align: center;
      color: #20a0ff;
      opacity: .5;
      margin: auto;
      left: 0;
      right: 0;
      bottom: 0;
      top: 0;
    }
    body:empty::before {
      --global-message: '正在加载静态资源';
      --global-message-animation: body-busy;
    }
  `;
  document.head.appendChild(style);
}

// 加载样式库
{
  let link = document.createElement('link');
  link.setAttribute('href', 'https://shadow.elemecdn.com/gh/codemirror/CodeMirror@5.19.0/lib/codemirror.css,/gh/codemirror/CodeMirror@5.19.0/theme/neo.css,/gh/sindresorhus/github-markdown-css@gh-pages/github-markdown.css');
  link.setAttribute('rel', 'stylesheet');
  document.head.appendChild(link);
}

// 加载 js（根据依赖考虑先后顺序）
{
  let dependencies = [
    [
      window.fetch ? null : 'https://github.elemecdn.com/uglifyjs!github/fetch/v0.11.0/fetch.js',
      'https://shadow.elemecdn.com/npm/excavator@0.2.1/bundle.min.js,/npm/jinkela@1.2.21/umd.min.js,/npm/vanilla.js@1.0.0/index.js,/gh/jinkelajs/jinkela-datepicker@1.2.3/datepicker.js,/gh/jinkelajs/jinkela-timepicker@1.0.0/timepicker.js,/gh/jinkelajs/jinkela-dialog@0.1.6/dialog.js,/gh/jinkelajs/jinkela-cascader@1.0.0/index.js,/gh/jinkelajs/jinkela-forest@1.0.2/index.js,/gh/jinkelajs/jinkela-checkbox@1.0.0/index.js,/gh/jinkelajs/jinkela-radio@1.0.0/index.js,/gh/jinkelajs/jinkela-clicktip@1.0.0/index.js,/gh/YanagiEiichi/fceptor@0.2.11/fceptor.min.js,/gh/chjj/marked@v0.3.6/marked.min.js,/gh/s3u/JSONPath@v0.15.0/lib/jsonpath.min.js,/gh/YanagiEiichi/uparams@1.4.0/UParams.min.min.js',
      'utils/api.js',
      'utils/doAction.js',
      'utils/refactor.js',
      'utils/debounce.js',
      'utils/condition.js',
      'utils/amdx.js',
      'https://shadow.elemecdn.com/gh/codemirror/CodeMirror@5.19.0/lib/codemirror.min.js'
    ],
    [ 'https://shadow.elemecdn.com/gh/codemirror/CodeMirror@5.19.0/mode/yaml/yaml.min.js,/gh/codemirror/CodeMirror@5.19.0/mode/markdown/markdown.min.js' ],
    [ 'https://shadow.elemecdn.com/gh/requirejs/requirejs@2.2.0/require.min.js' ],
    [ 'utils/depot.js' ]
  ];
  const loadScript = src => new Promise(resolve => {
    if (!src) return resolve();
    let script = document.createElement('script');
    script.setAttribute('src', src);
    script.addEventListener('load', resolve);
    document.head.appendChild(script);
  });
  dependencies.reduce((task, group) => {
    return task.then(() => Promise.all(group.map(loadScript)));
  }, Promise.resolve());
}
