module.exports = {
  welcome: {
    component: 'HTML',
    args: { html: '<h4>饿了么营销系统</h4>' }
  },
  logo: {
    component: 'HTML',
    args: {
      html: '<img src="//static11.elemecdn.com/eleme/activities/dist/baida/eleme.d3f894.svg" style="vertical-align: middle; margin-right: .5em;" /><span style="vertical-align: middle;">饿了么 — 营销系统</span>'
    }
  },
  session: {
    authorize: '//sakura.test.elenet.me/sakura/token_validation',
    method: 'POST',
    signin: "${location.origin.replace(/sakura|tsubaki/, 'sso') + '/sso/login?from=' + encodeURIComponent(location.href)}",
  },
  schemes: [
    {
      key: 'list1',
      title: '测试列表 1',
      caption: [
        { component: 'HTML', args: 'caption' }
      ],
      fields: [
        { key: 'id', 'title': 'ID' },
        { key: 'name', 'title': 'Name' },
        { key: 'opts', 'title': 'Opts' },
        { key: 'level', 'title': 'Level' },
        { key: 'radio', 'title': 'Radio' }
      ],
      operations: [
        { method: 'create', title: '创建' },
        { method: 'open', href: 'download', title: '下载' },
        { api: 'hx-all', title: '和谐全部' }
      ],
      actions: [
        { method: 'edit', title: '编辑' },
        {
          method: 'delete', title: '删除', confirm: {
            title: '确认删除？',
            text: '确定要删除这条记录么？',
            yes: { text: '(╬▔皿▔) 是的！' },
            cancel: { text: '(っ °Д °;)っ 再考虑考虑！', color: '#ccc' }
          }
        },
        { method: 'post', api: 'hx', title: '和谐' }
      ],
      filters: [
        { key: 'opts', title: 'Opts', component: 'Checkbox', args: { '@options': 'opts' } },
        { key: 'name', title: 'Name', component: 'String' },
        { key: 'level', title: 'Level', component: 'Select', args: { '@options': 'opts' } },
        { key: 'radio', title: 'Radio', component: 'Radio', args: { options: { A: 'A', B: 'B', C: 'C', D: 'D' } } }
      ],
      inputs: [
        { key: 'name', title: 'Name', component: 'String' },
        { key: 'desc', title: 'Desc', component: 'Text' },
        { key: 'opts', title: 'Opts', component: 'Checkbox', args: { '@options': 'opts' } },
        {
          key: 'type',
          title: 'Type',
          component: 'GroupingSelect',
          squash: 'direct',
          args: {
            options: { A: 'A', B: 'B', C: 'C', D: 'D' },
            subGroupMap: {
              'A': [
                { key: 'a1', title: 'Name', component: 'String' },
                { key: 'a2', title: 'Desc', component: 'String' },
              ],
              'B': [
                { key: 'b1', title: 'Name', component: 'String' },
                { key: 'b2', title: 'Desc', component: 'String' },
              ]
            }
          }
        },
        { key: 'level', title: 'Level', component: 'Select', args: { options: { A: 'A', B: 'B', C: 'C', D: 'D' } } },
        { key: 'radio', title: 'Radio', component: 'Radio', args: { options: { A: 'A', B: 'B', C: 'C', D: 'D' } } }
      ]
    },
    {
      key: 'list2',
      title: '测试列表 2',
      pageSize: 15,
      require: [ 'LIST2' ],
      fields: [
        { key: 'id', 'title': 'ID' },
        { key: 'name', 'title': 'Name' },
        { key: 'opts', 'title': 'Opts' },
      ],
      actions: [
        { method: 'edit', title: '编辑' },
        { method: 'delete', title: '删除' },
        { api: 'hx', title: '和谐' }
      ],
      inputs: [
        { key: 'name', title: 'Text', component: 'String' },
        { key: 'opts', title: 'Opts', component: 'Checkbox', args: { options: { A: 'A', B: 'B', C: 'C', D: 'D' } } },
        { key: 'level', title: 'Level', component: 'Select', args: { options: { A: 'A', B: 'B', C: 'C', D: 'D' } } }
      ]
    }
  ]
};
