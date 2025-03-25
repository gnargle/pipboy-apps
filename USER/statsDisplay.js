//SECTION: consts
const entryListDisplayMax = 6;
const titleOffsetY = 22;
const perkImageXMaxSize = 167;
const perkImageYMaxSize = 153;
const colourBlack = 0;
const colourGray1 = 1;
const colourGray2 = 2;
const colourWhite = 3;
const maxScreen = 2; 
const perkScreen = 2;
const statScreen = 1;
const SPECIALScreen=0;
const perkSelectionScreen = 3;

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

//SECTION: Screen drawing
function draw(){
  if (drawing) return;
  drawing = true;
  bC.clear(); 
  if (screenSelected == perkScreen){
    buildScreen("USER/PERKS/ENABLED");
  } else if (screenSelected == statScreen){
    buildScreen("USER/SKILLS");
  } else if (screenSelected == SPECIALScreen){
    buildScreen("USER/SPECIAL");
  } else if (screenSelected == perkSelectionScreen){
    buildPerkSelectionScreen();
  }
  bH.flip();
  bF.flip();
  bC.flip();  
  drawing = false;
}

function buildScreen(directory){
    let files = require("fs").readdirSync(directory);
    loadedListMax = files.length;
    let entryListMax = Math.min(entryListDisplayMax, loadedListMax);
    let a = 0;
    while (entrySelected >= entryListMax){
      a++;
      //We're beyond the number of entries we can see on one page.
      //We need to get the next set of files and display them
      entryListMax = Math.min(entryListDisplayMax * (a + 1), loadedListMax);
    }
    for(i = a * entryListDisplayMax; i < entryListMax; i++){
      let file = files[i];
      let fileString = require("fs").readFileSync( directory + "/" + file);
      let fileObj = JSON.parse(fileString);
      if (i == entrySelected){
        drawEntry(fileObj);
        drawSelectedEntryOutline(i%entryListDisplayMax);
        if (!configMode && screenSelected != perkScreen){
          //only update pointsOfSelected when not actively configuring.
          pointsOfSelected = fileObj.points;
        }
      }
      drawEntryTitle(fileObj.title, i%entryListDisplayMax, i==entrySelected);
      if (screenSelected != perkScreen){
        drawEntryPoints(fileObj.points, i%entryListDisplayMax, i==entrySelected); 
      }
    }
}

function buildPerkSelectionScreen(){

}

//SECTION: Element Drawing
function drawEntry(perkObj){  
    drawEntryImage(perkObj.img, perkObj.xSize, perkObj.ySize);
    drawEntryDesc(perkObj.description);
}

function drawEntryImage(imgStr, xSize, ySize){
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

function drawEntryTitle(title, i, selected){
  bC.setFontMonofonto18(); 
  if (selected){
    bC.setColor(colourBlack);      
  }
  else {
    bC.setColor(colourWhite);
  }
  bC.drawString(title, 10, (titleOffsetY * i) + 5);  
}

function drawEntryPoints(points, i, selected){
  bC.setFontMonofonto18(); 
  if (selected){
    bC.setColor(colourBlack);      
  }
  else {
    bC.setColor(colourWhite);
  }
  if (configMode && selected){
    bC.fillPoly([129,(titleOffsetY * i) + 12,140,(titleOffsetY * i) + 12,135,(titleOffsetY * i) + 5]);
    bC.fillPoly([141,(titleOffsetY * i) + 12,151,(titleOffsetY * i) + 12,146,(titleOffsetY * i) + 17]);
    bC.drawString(pointsOfSelected, 160, (titleOffsetY * i) + 5);  
  } else {
    bC.drawString(points, 160, (titleOffsetY * i) + 5);  
  }
}

function drawEntryDesc(desc){
  bC.setFontMonofonto14();
  bC.setColor(colourWhite);
  bC.drawString(desc, 10, 150);
}

function drawSelectedEntryOutline(i){
  bC.setColor(colourWhite);
  bC.fillRect(5,(titleOffsetY * i) + 1,190,(titleOffsetY * i) + 23)
}

//SECTION: config saving
function saveFile(directory){
  let files = require("fs").readdirSync(directory);  
  let fileToSave = directory + "/" + files[entrySelected];
  let fileString = require("fs").readFileSync(fileToSave);
  let fileObj = JSON.parse(fileString);
  fileObj.points = pointsOfSelected;
  fileString = JSON.stringify(fileObj);
  require("fs").writeFile(fileToSave, fileString);
}

function saveNewValue(){
  if (screenSelected == SPECIALScreen){
    saveFile("USER/SPECIAL");
  } else if (screenSelected == statScreen){
    saveFile("USER/SKILLS");
  }
}

function saveNewPerkSelection(){

}

function gracefulClose(){
  //shut down interval triggers first in case one fires while we're tearing down
  clearInterval(modeCheck);
  clearInterval(intervalId);
  Pip.removeListener("knob1",registeredKnob1Func);
  Pip.removeListener("knob2",handleKnob2); 
  Pip.removeListener("torch",handleTorch); 
  showMainMenu(); //this causes a brief flicker but if we don't do it the controls stop working.
}

//SECTION: Button handlers
function handleKnob1Config(dir){
  //first, play the click.
  Pip.knob1Click(dir);

  if (dir == 0){
    //pressed in, this is the config trigger.    
    //toggle configuration mode on special/skills screens
    configMode = !configMode;
    saveNewValue();
    Pip.removeListener("knob1",handleKnob1Config); 
    Pip.on("knob1",handleKnob1);   
    registeredKnob1Func = handleKnob1;
  } else {
    pointsOfSelected += dir; 
    if (pointsOfSelected < 0){
      pointsOfSelected = 100;
    } else if (pointsOfSelected > 100){
      entrySelected = 0;
    }
  }
  draw();
}

function handleKnob1(dir){
  //first, play the click.
  Pip.knob1Click(dir);

  if (dir == 0){
    //pressed in, this is the config trigger.
    if (screenSelected == perkScreen){
      //change screen to perk selection screen.
      screenSelected = perkSelectionScreen;
    } else {
      //toggle configuration mode on special/skills screens
      configMode = !configMode;
      Pip.removeListener("knob1",handleKnob1); 
      Pip.on("knob1",handleKnob1Config);
      registeredKnob1Func = handleKnob1Config;
    }
  } else {
    //then, we need to change our position in the list.
    entrySelected -= dir; //-1 is scroll down, but our list increases numerically. so we need to subtract
    if (entrySelected < 0){
      entrySelected = loadedListMax - 1;
    } else if (entrySelected >= loadedListMax){
      entrySelected = 0;
    }
  }

  draw();
}

function handleKnob2(dir){
  //first, play the click.
  Pip.knob2Click(dir);  
  //if switching screens we need to boot immediately out of config without saving.
  configMode = false; 
  //then switch stats screen.
  if (screenSelected == perkSelectionScreen){
    //if scrolling away from perk selection screen, save changes and reset to perk screen.
    saveNewPerkSelection();
    screenSelected = perkScreen;
  } else {
    screenSelected += dir;
  }
  entrySelected = 0; //reset to top of list
  if (screenSelected > maxScreen){
    screenSelected = 0;
  } else if (screenSelected < 0){
    screenSelected = maxScreen;
  }
  draw();
}

function handleTorch(){
  gracefulClose();
  torchButtonHandler();
}

function ourModeHandler(){
  checkMode();
  if (Pip.mode != 2){
    gracefulClose();
  }
}

function powerHandler(){
  gracefulClose();
}

//SECTION: main entry point

let loadedListMax = 0;
let entrySelected = 0;
let screenSelected = 0;
let pointsOfSelected = 0;
let drawing=false;
let configMode = false;

Pip.on("knob1",handleKnob1);
let registeredKnob1Func = handleKnob1;
Pip.on("knob2",handleKnob2);
Pip.on("torch",handleTorch);
setWatch(powerHandler,BTN_POWER,{repeat:false})
draw();
let modeCheck = setInterval(ourModeHandler,100);
let intervalId = setInterval(() => {  
  if (Pip.mode == 2){
    draw(); 
  } else {
    gracefulClose();
  }
}, 1000);