const Exceed = require('exceed');

// Exceed文档 - http://web.npm.alibaba-inc.com/package/exceed
const exceed = new Exceed({
  ENV: 'local',
  // csrf: {
  //   token: '_tb_token_'
  // }
});

exceed.use([{
  name: '侧边菜单',
  id: 'Layout.sidemenu',
  method: 'get',
  urls: {
    local: '/data/sidemenu.json',
  },
}]);

module.exports = exceed;
