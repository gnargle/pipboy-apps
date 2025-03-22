const perkListDisplayMax = 10;
const fontSizeTitle = 16;
const fontSizeDesc = 14;
const titleOffsetY = 22;
const perkImageXMaxSize = 167;
const perkImageYMaxSize = 153;
const colourBlack = 0;
const colourGray1 = 1;
const colourGray2 = 2;
const colourWhite = 3;
const knob1Down = -1;
const knob1Up = 1;
const knob1Press = 0;

Graphics.prototype.setFontMonofonto14 = function() {
  // Actual height 14 (13 - 0)
  // 1 BPP
  return this.setFontCustom(
    E.toString(require('heatshrink').decompress(atob('AB0D/uP/0/7AICh+AnwNC8AGBAoMBwFnw4UB/H/8f/h4ZDgHxw/nn/e+/55/DEIV88P/w/4g/4v/j7+MvwNBu4iBx/2FIPz8EfwEyKAwjB/BZGgH/5///kPLQcD///n/whgIBAQMzgARB+E/wE/gHMMwUAgkAiEBJgPgAwQyFgPgg+AjAIDsCCBg0ABINgCwoKBnAKDgahBFYN+h/gnkA4BTCUAkBXgX4n4OCgEcgCSBRYP+HQUjweOn0zDYNj+ODG4INB4YNBt0zzDKCwZYCIIN+XQLYEMwkD/cP90/zHO8c/ZQZxBj+DJgOY/1jz+IBoXAkcHxhhDgfgWwUAmODLQU7zHusZhEnED/GP805/Hn8f+g/wWwuYg9wjOABQkZ8F3wOYWIakB+EHsAUB4cDH4UJgEkgGQgVAAwgNBmHAWwIwB8EPEQTUCsEDwOO9033H8kfggY+Cj5xB+f95v7m3s/+x/zVBgPgN4U/+H/AwOAjyuDBof4UAKEEv/DAwUwjHg8eDwUIBoLRCBoM4nDmD/ANGmOY41jSggNFwHGgbyCh5KBBoOOg0z/Hv8e/DYLfCBoOAsAGFFIXALQYNBAwMBBoQtBsEBxkODYZtCIowNB/fjgZTIEQhFGOwJFIDYfwh4NFN4yZEG5E54H/gKlCDYsHnE+//7cIIbHnY3C+YpDvHD+eP80z7Hn8efBoMwTIL7FAwIZCn43DwEGPoJTEng3BwYGBDYQGB4AbBnxFDwf+Po0ghHxAwOH/iZDwZFD/BFBDYINB/jCDmEY4fjn5TCzH4dogADh//AAJXCiEAnApBgH8AIV+QoLhBIoIfBg4ZCLoQMBh+AN4PwgPgGIkEFIVAgIGFBoMCgEMG4QtBDIcwhvgm6SBgfYcIM/ehEDjANF8EH4AGB8wNBh3gmINBgPwCgfGUAauCDYvWgdYCgM9BoLqBhj0F5j0DDYMPY4Ow43D/4GC8BTIWQJhFhljn+O/0zWgJ+BAAMDgcMh8//3/+f/aIY+C/4iC90CjAlDgBoGgf4G4Y+BAwgmDBohMGoCgF3ANBj53DN4Xw//DXgquGSwIUDG43AG4MOeAIpDh1AWoJTCfYMXSQiiBwf+h/4hlgcwUDXgIpCg0AIosDwEPMIU+PoXAnCuCKYUfRYs8BoMChEMEQV+BocgFInENAMfegQpDKYVgm4pEKYYADhB4Bn////+PwqOC/+/BYIVDCYP//h/BkAKBOQUAsEBPIYGBBoI'))),
    32,
    atob("BwYHCAgICAYHBggIBgcGCAgGCAgICAgICAgGBggICAgICAgICAcICAgICAgICAgICAgICAgICAgICAgICAUICAcICAgICAgICAcHCAYICAgICAgICAgICAgICAgGBwg="),
    14|65536
  );
}

function draw(selected){
  bC.clear(); 
  buildList("USER/PERKS", selected);
  bH.flip();
  bF.flip();
  bC.flip();  
}

function buildList(directory, selected){   
  let files = require("fs").readdirSync(directory)
  totalFileListLength = files.length;
  loadedListMax = totalFileListLength; //change later when we have multiple page loading down.
  perkListMax = Math.min(perkListDisplayMax, totalFileListLength);
  for(i = 0; i < perkListMax; i++){
    let file = files[i];
    let fileString = require("fs").readFileSync( directory + "/" + file);
    let fileObj = JSON.parse(fileString);
    if (i == selected){
      drawPerk(fileObj);
      drawSelectedPerkOutline(i);
    }  
    drawPerkTitle(fileObj.title, i, i==selected);     
  }  
}

function drawPerk(fileObj){  
    drawPerkImage(fileObj.img, fileObj.xSize, fileObj.ySize);
    drawPerkDesc(fileObj.description);
}

function drawPerkImage(imgStr, xSize, ySize){
  //so we want to try and draw as central as possible.
  //our 'window' for how big the perk can be is 167x153 (y truncated for the desc at the bottom)
  //to figure out how to centre the image we need to get the difference
  //between the size of the image and our window, halve it, and add it on
  //to the location.
  let xOffset = Math.floor((perkImageXMaxSize - xSize)/2);
  let yOffset = Math.floor((perkImageYMaxSize - ySize)/2);
  bC.setColor(colourGray2);
  bC.drawImage({
    width : xSize, height : ySize, bpp : 1,
    buffer : require("heatshrink").decompress(atob(imgStr))
  }, 200 + xOffset,0 + yOffset);  
}

function drawPerkTitle(title, i, selected){
  bC.setFontMonofonto18(); 
  if (selected){
    bC.setColor(colourBlack);      
  }
  else {
    bC.setColor(colourWhite);
  }
  bC.drawString(title, 10, (titleOffsetY * i) + 5);  
}

function drawPerkDesc(desc){
  bC.setFontMonofonto14();
  bC.setColor(colourWhite);
  bC.drawString(desc, 10, 150);
}

function drawSelectedPerkOutline(i){
  bC.setColor(colourWhite);
  bC.fillRect(5,(titleOffsetY * i) + 1,190,(titleOffsetY * i) + 23)
}

function handleKnob1(dir){
  //first, play the click.
  Pip.knob1Click(dir);
  if (dir == 0){
    //clicked in, bail to top level.
    gracefulClose();
  }
  //then, we need to change our position in the list.
  currSelected -= dir; //-1 is scroll down, but our list increases numerically. so we need to subtract
  if (currSelected < 0){
    currSelected = perkListMax - 1;
  } else if (currSelected >= perkListMax){
    currSelected = 0;
  }
  draw(currSelected);
}

function gracefulClose(){
  Pip.removeListener("knob1",handleKnob1); 
  showMainMenu();
}

let totalFileListLength = 0;
let loadedListMax = 0;
let perkListMax = 0;
let currSelected = 0;

Pip.on("knob1",handleKnob1);
draw(currSelected)