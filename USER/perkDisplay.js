function showPerkImage(file){
  let imgStr = require("fs").readFileSync(file);
  bC.clear();
  bC.drawImage({
    width : 167, height : 167, bpp : 1,
    buffer : require("heatshrink").decompress(atob(imgStr))
  }, 50,50);
  bC.flip();
}

showPerkImage("USER/IMG/cherchez.b64");
setTimeout(() => {
  showPerkImage("USER/IMG/actiongirl.b64");
}, 3000);