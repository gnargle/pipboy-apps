const perkListMax = 10;

function buildList(directory, selected){
  bC.clear();  
  let files = require("fs").readdirSync(directory)
  log("filelist: " + files);
  let max = files.length >= files ? perkListMax : files.length;
  for(i = 0; i < max; i++){
    let file = files[i];
    log("loading file:" + file);
    let fileString = require("fs").readFileSync( directory + "/" + file);
    let fileObj = JSON.parse(fileString);
    if (i == selected){
      drawPerk(fileObj);
      drawSelectedPerkOutline(i);
    }
    drawPerkTitle(fileObj.title, i);
  }
  bH.flip();
  bF.flip();
  bC.flip();  
}

function drawPerk(fileObj){  
    drawPerkImage(fileObj.img, fileObj.xSize, fileObj.ySize);
    drawPerkDesc(fileObj.description);
}

function drawPerkImage(imgStr, xSize, ySize){
  bC.drawImage({
    width : xSize, height : ySize, bpp : 1,
    buffer : require("heatshrink").decompress(atob(imgStr))
  }, 200,0);  
}

function drawPerkTitle(title, i){
  bC.setFontVector(16);
  bC.drawString(title, 10, (20 * i) + 5);
}

function drawPerkDesc(desc){
  bC.setFontVector(14);
  bC.drawString(desc, 10, 150);
}

function drawSelectedPerkOutline(i){
  bC.drawRect(5,0,190,23)
}

buildList("USER/PERKS", 0);