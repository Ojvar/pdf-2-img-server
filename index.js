const express = require("express");
const { fromPath } = require("pdf2pic");

const App = new express();
const options = {
  quality: 100,
  density: 200,
  format: "jpg",
  width: 1600,
  height: 2000,
};

App.get("/:page/:fileName?", async (req, res) => {
  const fileName = `./pdfs/${req.params.fileName ?? "p1"}.pdf`;
  const storeAsImage = fromPath(fileName, options);
  const page = +(req.params.page ?? 1);

  storeAsImage(page, true).then((data) => {
    console.log(`Page ${page} is now converted as image`);
    const img = Buffer.from(data.base64, "base64");

    res.writeHead(200, {
      "Content-Type": "image/jpeg",
      "Content-Length": img.length,
    });

    res.end(img);
  });
});
App.listen(8585, "0.0.0.0", console.log("Server is ready at PORT 8585"));
