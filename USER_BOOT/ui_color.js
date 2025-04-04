//this code overrides the colour palette of the pip-boy to become the New Vegas orange
for(var pal=[new Uint16Array(16),new Uint16Array(16),new Uint16Array(16),new Uint16Array(16),],i=0;i<16;i++)
    pal[0][i]=g.toColor(i/15,i/30,0),
    pal[1][i]=g.toColor(i/30,i/60,0),
    pal[2][i]=g.toColor(i/10,i/20,0),
    pal[3][i]=g.toColor(i/20,i/40,0);
Pip.setPalette(pal);