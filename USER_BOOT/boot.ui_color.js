function readThemeFile(){
    const themeSettingsFolder = "USER/ThemePicker"
    const themeSettingsFile = "USER/ThemePicker/theme.json"
    //try to read directory first, if we error, make the directory and return, nothing to read. 
    try{
        require("fs").readdirSync(themeSettingsFolder);
    } catch{
        require("fs").mkdir(themeSettingsFolder); 
        return null;
    }
    try{
        let fileString = require("fs").readFileSync(themeSettingsFile);
        log("read " + fileString + "from " + themeSettingsFile);
        let fileObj = JSON.parse(fileString);
        return fileObj;
    } catch{
        //folder created but no theme file yet, ignore
        return null;
    }
}

let theme = readThemeFile();
if (theme != null){
    for(var pal=[new Uint16Array(16),new Uint16Array(16),new Uint16Array(16),new Uint16Array(16),],i=0;i<16;i++)
        pal[0][i]=g.toColor(theme[0] * i/16,theme[1] * i/16,theme[2] * i/16),
        pal[1][i]=g.toColor(theme[0] * i/16 - (i*.2)/16,theme[1] * i/16- (i*.2)/16,theme[2] * i/16- (i*.2)/16),
        pal[2][i]=g.toColor(theme[0] * i/16 + (i*.2)/16,theme[1] * i/16 + (i*.2)/16,theme[2] * i/16 + (i*.2)/16),
        pal[3][i]=g.toColor(theme[0] * i/16- (i*.4)/16,theme[1] * i/16- (i*.4)/16,theme[2] * i/16- (i*.4)/16);
    Pip.setPalette(pal);
}
delete theme;
