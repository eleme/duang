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
  let styleSheets = [
    'https://github.elemecdn.com/codemirror/CodeMirror/5.19.0/lib/codemirror.css',
    'https://github.elemecdn.com/codemirror/CodeMirror/5.19.0/theme/neo.css',
    'https://github.elemecdn.com/sindresorhus/github-markdown-css/gh-pages/github-markdown.css'
  ];
  styleSheets.forEach(href => {
    let link = document.createElement('link');
    link.setAttribute('href', href);
    link.setAttribute('rel', 'stylesheet');
    document.head.appendChild(link);
  });
}

// 加载 js（根据依赖考虑先后顺序）
{
  let dependencies = [
    [
      window.fetch ? null : 'https://github.elemecdn.com/uglifyjs!github/fetch/v0.11.0/fetch.js'
    ].filter(Boolean),
    [ // Basic
      'https://npm.elemecdn.com/uglifyjs!jinkela@1.2.19/umd.js',
      'https://npm.elemecdn.com/excavator@0.2.1/bundle.js',
      'https://github.elemecdn.com/YanagiEiichi/uparams/1.4.0/UParams.min.js',
      'https://github.elemecdn.com/uglifyjs!s3u/JSONPath/v0.15.0/lib/jsonpath.js',
      'https://github.elemecdn.com/YanagiEiichi/fceptor/0.2.11/fceptor.js',
      'https://github.elemecdn.com/ElemeFE/pocket-noodles/1.0.2/index.js',
      'utils/api.js',
      'utils/doAction.js',
      'utils/refactor.js',
      'utils/debounce.js',
      'utils/condition.js',
      'utils/amdx.js',
      'https://github.elemecdn.com/uglifyjs!codemirror/CodeMirror/5.19.0/lib/codemirror.js'
    ],
    [
      'https://github.elemecdn.com/uglifyjs!codemirror/CodeMirror/5.19.0/mode/yaml/yaml.js',
      'https://github.elemecdn.com/uglifyjs!codemirror/CodeMirror/5.19.0/mode/markdown/markdown.js',
      'https://github.elemecdn.com/chjj/marked/v0.3.6/marked.min.js'
    ],
    [ // Plugins
      'https://github.elemecdn.com/uglifyjs!requirejs/requirejs/2.2.0/require.js'
    ],
    [ // Components
      'https://github.elemecdn.com/jinkelajs/jinkela-datepicker/1.2.3/datepicker.js',
      'https://github.elemecdn.com/jinkelajs/jinkela-timepicker/1.0.0/timepicker.js',
      'https://github.elemecdn.com/jinkelajs/jinkela-dialog/0.1.6/dialog.js',
      'https://github.elemecdn.com/jinkelajs/jinkela-cascader/1.0.0/index.js',
      'https://github.elemecdn.com/jinkelajs/jinkela-forest/1.0.1/index.js'
    ],
    [ // Entry
      'utils/depot.js'
    ]
  ];
  const loadScript = src => new Promise(resolve => {
    let script = document.createElement('script');
    script.setAttribute('src', src);
    script.addEventListener('load', resolve);
    document.head.appendChild(script);
  });
  dependencies.reduce((task, group) => {
    return task.then(() => Promise.all(group.map(loadScript)));
  }, Promise.resolve());
}
