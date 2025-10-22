function pbkb(){
    this.alphabets = [
        ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","CAPS","END","DEL",],
        ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","NUM","END","DEL"],
        ["1","2","3","4","5","6","7","8","9","0",".",",","!","?","@","/","(",")","$","£","=","+","-","#","&","*","LOW","END","DEL"],
    ]
    this.selectedAlpha = 0;
    this.selectedLetter = 27;
    this.homeY = 100;
    this.homeX = 370;
    this.cursor = 0;
    this.assembledString = "";
    this.finished=false;
    this.intervalId = -1;
}

pbkb.prototype.drawLetter = function(index, x, y) {
    let offset = index;
    if (index < 0){
        offset = this.alphabets[this.selectedAlpha].length + index;        
    } else if (index > this.alphabets[this.selectedAlpha].length - 1){
        offset = index - this.alphabets[this.selectedAlpha].length;
    }
    let str = this.alphabets[this.selectedAlpha][offset];
    if (str.length > 1){
        //3 char special string. change the x offset a bit.
        bC.drawString(str, x-9,y);
    }
    else{
        bC.drawString(str, x, y)
    }
}

pbkb.prototype.input = function(d){
    Pip.knob1Click(d);
    if (d == 0) {
        //clicked in, add letter
    } else {
        this.selectedLetter -= d;
        console.log(this.alphabets + " " + this.selectedAlpha + " " + this.selectedLetter)
        if (this.selectedLetter > this.alphabets[this.selectedAlpha].length-1){
            this.selectedLetter = 0;
        } else if (this.selectedLetter < 0){
            this.selectedLetter = this.alphabets[this.selectedAlpha].length-1;
        }
    }
    this.drawTextEntry();
}

pbkb.prototype.drawSelectedLetter = function(){
    let str = this.alphabets[this.selectedAlpha][this.selectedLetter];
    if (str.length > 1){
        bC.setColor(3);
        bC.fillRect(this.homeX-10, this.homeY-1, this.homeX+19, this.homeY+18);
        bC.setColor(0);
        bC.drawString(str, this.homeX-9,this.homeY);
    } else{
        bC.setColor(3);
        bC.fillRect(this.homeX-1, this.homeY-1, this.homeX+9, this.homeY+18);
        bC.setColor(0);
        bC.drawString(str, this.homeX,this.homeY);
    }
}

pbkb.prototype.drawTextEntry = function(){
    bC.clear();
    bC.setFontMonofonto18();
    

    //to draw the circle, we need to draw the selected letter on the East point.
    //then the previous two letters at NE and N, and the following 5 at SE, S, SW, W, NW    
    
    this.drawSelectedLetter();

    bC.setColor(3);
    //do prev letters
    this.drawLetter(this.selectedLetter-1, this.homeX-25, this.homeY-25)
    this.drawLetter(this.selectedLetter-1, this.homeX-25, this.homeY-25)
    this.drawLetter(this.selectedLetter-2, this.homeX-50, this.homeY-50)
    //do next letters
    this.drawLetter(this.selectedLetter+1, this.homeX-25, this.homeY+25)
    this.drawLetter(this.selectedLetter+2, this.homeX-50, this.homeY+50)
    this.drawLetter(this.selectedLetter+3, this.homeX-75, this.homeY+25)
    this.drawLetter(this.selectedLetter+4, this.homeX-100, this.homeY)
    this.drawLetter(this.selectedLetter+5, this.homeX-75, this.homeY-25)

    bC.drawRect(10,5,260,200);

    bH.flip();
    bF.flip();
    bC.flip();
}

pbkb.prototype.textEntryLoop = function(){
    this.drawTextEntry();
    Pip.removeAllListeners("knob1");
    Pip.on('knob1', this.input);
    this.intervalId = setInterval(() => {
        if (!this.finished) {
            bH.flip();
            bF.flip();
            bC.flip();
        } else {
            clearInterval(this.intervalId);
        }
    }, 16);
}

exports.initKeyboard = function(){
    let o = new pbkb();    
    return o;
};