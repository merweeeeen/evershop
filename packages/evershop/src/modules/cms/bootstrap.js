const config = require('config');

module.exports = () => {
  const themeConfig = {
    logo: {
      alt: undefined,
      src: "https://testbucketcme.s3.ap-southeast-1.amazonaws.com/logo.png",
      width: "50px",
      height: "50px"
    },
    headTags: {
      links: [],
      metas: [],
      scripts: [],
      bases: []
    },
    copyRight: `© 2023 RetroBeats. All Rights Reserved.`
  };
  config.util.setModuleDefaults('themeConfig', themeConfig);
  config.util.setModuleDefaults('system', {
    file_storage: 'local'
  });
};
