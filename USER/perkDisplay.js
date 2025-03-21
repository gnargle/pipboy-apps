let imgStr = require("fs").readFileSync("USER/IMG/cherchez.b64");
log("img string contents: " + imgStr);
bC.clear();
bC.drawImage({
  width : 167, height : 167, bpp : 1,
  buffer : require("heatshrink").decompress(atob(imgStr))
}, 50,50);
bC.flip();