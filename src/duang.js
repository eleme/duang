{
  let [ , path ] = document.currentScript.src.match(/^(.*\/)duang\.js$/);
  let base = document.createElement('base');
  base.setAttribute('href', path);
  document.head.appendChild(base);
  let style = document.createElement('style');
  style.innerHTML = `
    body:empty::before {
      position: fixed;
      font-size: 32px;
      height: 200px;
      line-height: 200px;
      width: 100%;
      text-align: center;
      color: #999;
      margin: auto;
      left: 0;
      right: 0;
      bottom: 0;
      top: 0;
      content: 'Loading ...';
    }
  `;
  document.head.appendChild(style);
  let dependencies = [
    [ // Basic
      'https://github.elemecdn.com/uglifyjs!YanagiEiichi/jinkela/1.2.9/jinkela.js',
      'https://github.elemecdn.com/YanagiEiichi/uparams/1.3.0/uparams.min.js',
      'https://github.elemecdn.com/uglifyjs!s3u/JSONPath/v0.15.0/lib/jsonpath.js',
      `utils/api.js`,
      `utils/doAction.js`,
      `utils/refactor.js`,
      `utils/amdx.js`,
    ],
    [ // Plugins
      'https://github.elemecdn.com/uglifyjs!requirejs/requirejs/2.2.0/require.js',
      'https://github.elemecdn.com/uglifyjs!YanagiEiichi/jinkela/1.2.9/directives/ref.js',
      'https://github.elemecdn.com/uglifyjs!YanagiEiichi/jinkela/1.2.9/directives/jkl.js',
      'https://github.elemecdn.com/uglifyjs!YanagiEiichi/jinkela/1.2.9/plugins/nesting.js',
    ],
    [ // Components
      'https://github.elemecdn.com/YanagiEiichi/jinkela-datepicker/1.1.4/datepicker.js',
      'https://github.elemecdn.com/YanagiEiichi/jinkela-dialog/0.1.5/dialog.js',
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
