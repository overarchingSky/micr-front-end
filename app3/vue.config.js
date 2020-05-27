module.exports = {
    chainWebpack: config => {
      config.output.filename((page) => {
        if(process.env.NODE_ENV === 'production'){
          return page.chunk.name === 'mirc-app' ? 'js/[name].js' : 'js/[name].[chunkhash:8].js'
        }
        return '[name].js'
      })
    },
    //filenameHashing:false,
    pages:{
      app:{
        entry:'./src/main.ts',
        filename:'index.html'
      },
      'mirc-app':'./src/mirc-app/routes.ts'
    },
    devServer: {
      proxy: {
          '/doc':{
            target:'http://localhost:3000'
          }
      }
    }
  }