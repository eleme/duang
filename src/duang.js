{
  let [ , path ] = document.currentScript.src.match(/^(.*)\/duang\.js$/);
  document.write(`
    <base href="${path}/" />
    <script src="//github.elemecdn.com/uglifyjs!YanagiEiichi/jinkela/1.2.3/jinkela.js"></script>
    <script src="//github.elemecdn.com/uglifyjs!YanagiEiichi/jinkela/1.2.3/directives/ref.js"></script>
    <script src="//github.elemecdn.com/uglifyjs!YanagiEiichi/jinkela/1.2.3/plugins/nesting.js"></script>
    <script src="//github.elemecdn.com/YanagiEiichi/uparams/1.3.0/uparams.min.js"></script>
    <script src="//github.elemecdn.com/YanagiEiichi/jinkela-datepicker/1.1.4/datepicker.js"></script>
    <script src="//github.elemecdn.com/uglifyjs!s3u/JSONPath/v0.15.0/lib/jsonpath.js"></script>
    <script src="//github.elemecdn.com/uglifyjs!requirejs/requirejs/2.2.0/require.js"></script>
    <script src="//github.com/josdejong/jsoneditor/blob/master/dist/jsoneditor.min.js"></script>
    <script src="//github.com/josdejong/jsoneditor/blob/master/dist/jsoneditor.min.css"><script>
    <script src="${path}/utils/amdx.js"></script>
    <script src="${path}/utils/api.js"></script>
    <script src="${path}/utils/depot.js"></script>
    <script src="${path}/utils/dialog.js"></script>
    <script src="${path}/utils/doAction.js"></script>
    <script src="${path}/utils/refactor.js"></script>
  `);
}
