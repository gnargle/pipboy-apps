const perkListMax = 10;
const fontSizeTitle = 16;
const fontSizeDesc = 14;
const titleOffsetY = 20;

function draw(selected){
  bC.clear(); 
  buildList("USER/PERKS", selected);
  bH.flip();
  bF.flip();
  bC.flip();  
}

function buildList(directory, selected){   
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
  bC.setFontVector(fontSizeTitle);
  bC.drawString(title, 10, (titleOffsetY * i) + 5);
}

function drawPerkDesc(desc){
  bC.setFontVector(fontSizeDesc);
  bC.drawString(desc, 10, 150);
}

function drawSelectedPerkOutline(i){
  bC.drawRect(5,(titleOffsetY * i),190,(titleOffsetY * i) + 23)
}

draw(0)
setTimeout(() => {
  draw(1);
  setTimeout(() => {
    showMainMenu();
  }, 10000)
}, 10000)