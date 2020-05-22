module.exports = {
    devServer: {
      proxy: {
          '/doc':{
            target:'http://localhost:3000'
          }
      }
    }
  }