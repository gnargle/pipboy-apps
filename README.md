# BACKUP YOUR PIP-BOY SD CARD BEFORE USING THIS.

Repo containing my custom applications for the PipBoy 3000 MkVI prop from The Wand Company.
This project would not have been possible without [RobCo](https://log.robco-industries.org/documentation/pipboy-3000/#main-menu) paving the way and documenting a lot of the Pip-Boy's firmware.

## Install

For a one-click install, connect your pip-boy on [Pip-Boy.com](https://pip-boy.com) and install from the apps section. If you wish to customise the points or enabled perks, you can do that with a manual install as detailed below.

# Usage

There are three screens: SPECIAL, Skills and Perks. You can scroll between them with the right scroll control, and scroll on the screen you're on with the left scroll wheel.

You can customise the points in a skill or SPECIAL stat for yourself by clicking in the left wheel and adjusting there. When done, click the wheel again, and the new value will be saved.

## Manual Install

To use, download the repository and move the USER and APPINFO folders into your PipBoy SD Card.
For more information on how to access the SD card, see my [blog on the subject](https://athene.gay/projects/pipboy.html) and [RobCo's blogposts](https://log.robco-industries.org/documentation/pipboy-3000/#main-menu).

No perks are enabled by default - to enable the ones you like, just drag them from the DISABLED folder to the ENABLED folder.

Adding your own Skills, Perks or Skills is easy - just copy one of the existing files in the relevant folder, edit it to your liking, and update the 'img', xSize and ySize values with an image generated by [this tool](https://www.espruino.com/Image+Converter). Make sure to select the "Use Compression?", "Transparency?" and "Crop?" options, then select "Output As: Image Object" and copy the value in the quotes inside the 'atob' function over to the 'img' attribute in your new file. Set xSize to the 'width' and ySize to the 'height' from the image object. Please make sure your images when cropped fit in a 167x153 rectangle - if they don't, you'll have to resize them down before running them through the converter.
