const ManifestPlugin = require('webpack-manifest-plugin');
//console.log(ManifestPlugin)
module.exports = {
    chainWebpack: config => {
      config.output.filename((page) => {
        if(process.env.NODE_ENV === 'production'){
          return page.chunk.name === 'mirc-app' ? 'js/[name].js' : 'js/[name].[chunkhash:8].js'
        }
        return '[name].js'
      })
      config.plugin('manifest').use(ManifestPlugin)
    },
    //filenameHashing:false,
    pages:{
      app:{
        entry:'./src/main.ts',
        filename:'index.html'
      },
      'mirc-app':'./src/mirc-app/routes.ts'
    },
    // plugins:[
    //   new ManifestPlugin()
    // ],
    devServer: {
      proxy: {
          '/doc':{
            target:'http://localhost:3000'
          }
      }
    }
  }