const express = require('express');
const controller = require("./controller")
const app = express();

app.get('/read/:search/:pages', async function(req) {
    var data = []
    for (page = 1; page <= req.params.pages; page++) {
        data.push(await controller.getDataSiteContent(req.params.search,page))
    }
  
    await controller.saveDataSiteContent(data);
})

app.listen(5000)