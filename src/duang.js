{
  let [ , path ] = document.currentScript.src.match(/^(.*\/)duang\.js$/);
  let base = document.createElement('base');
  base.setAttribute('href', path);
  document.head.appendChild(base);
  let style = document.createElement('style');
  let loading = '拼命加载中';
  style.innerHTML = `
    @keyFrames body-busy {
      0% { content: '${loading} ·'; }
      25% { content: '${loading} ··'; }
      50% { content: '${loading} ···'; }
      75% { content: '${loading} ····'; }
      100% { content: '${loading} ·'; }
    }
    body:empty::before {
      position: fixed;
      font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
      font-size: 32px;
      height: 200px;
      line-height: 200px;
      width: 250px;
      whilte-space: nowrap;
      color: #20a0ff;
      opacity: .5;
      margin: auto;
      left: 0;
      right: 0;
      bottom: 0;
      top: 0;
      content: '';
      animation: body-busy 1s linear infinite;
    }
  `;
  document.head.appendChild(style);
  let styleSheets = [
    'https://github.elemecdn.com/codemirror/CodeMirror/5.19.0/lib/codemirror.css',
    'https://github.elemecdn.com/codemirror/CodeMirror/5.19.0/theme/neo.css'
  ];
  styleSheets.forEach(href => {
    let link = document.createElement('link');
    link.setAttribute('href', href);
    link.setAttribute('rel', 'stylesheet');
    document.head.appendChild(link);
  });
  let dependencies = [
    [
      window.fetch ? null : 'https://github.elemecdn.com/uglifyjs!github/fetch/v0.11.0/fetch.js'
    ].filter(Boolean),
    [ // Basic
      'https://npm.elemecdn.com/uglifyjs!jinkela@1.2.19/umd.js',
      'https://github.elemecdn.com/YanagiEiichi/uparams/1.3.0/uparams.min.js',
      'https://github.elemecdn.com/uglifyjs!s3u/JSONPath/v0.15.0/lib/jsonpath.js',
      `https://github.elemecdn.com/YanagiEiichi/fceptor/0.2.11/fceptor.js`,
      `https://github.elemecdn.com/ElemeFE/pocket-noodles/1.0.2/index.js`,
      `utils/api.js`,
      `utils/doAction.js`,
      `utils/refactor.js`,
      'utils/debounce.js',
      'utils/condition.js',
      `utils/amdx.js`,
      'https://github.elemecdn.com/uglifyjs!codemirror/CodeMirror/5.19.0/lib/codemirror.js'
    ],
    [
      'https://github.elemecdn.com/uglifyjs!codemirror/CodeMirror/5.19.0/mode/yaml/yaml.js'
    ],
    [ // Plugins
      'https://github.elemecdn.com/uglifyjs!requirejs/requirejs/2.2.0/require.js'
    ],
    [ // Components
      'https://github.elemecdn.com/YanagiEiichi/jinkela-datepicker/1.2.3/datepicker.js',
      'https://github.elemecdn.com/YanagiEiichi/jinkela-timepicker/1.0.0/timepicker.js',
      'https://github.elemecdn.com/YanagiEiichi/jinkela-dialog/0.1.6/dialog.js'
    ],
    [ // Entry
      `utils/depot.js`
    ]
  ];
  const loadScript = src => new Promise(resolve => {
    let script = document.createElement('script');
    script.setAttribute('src', src);
    script.addEventListener('load', resolve);
    document.head.appendChild(script);
  });
  let task = dependencies.reduce((task, group) => {
    return task.then(() => Promise.all(group.map(loadScript)));
  }, Promise.resolve());
}
