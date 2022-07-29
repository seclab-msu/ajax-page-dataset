// Big red button
var redbutton = document.getElementById('share-button');
var sharebutton = document.getElementById('shareicon');
var xbutton = document.getElementById('xicon');

// Mini share buttons
var share1 = document.getElementById('share1');
var share2 = document.getElementById('share2');
var share3 = document.getElementById('share3');

function share_expand() {
    // Animation for the big red button with the share icon
    redbutton.className = 'share-button button-expand';
    sharebutton.className = 'icon-share share-expand';
    xbutton.style.display = 'block';
    xbutton.className = 'icon-x x-expand';

    // Opening the mini share buttons
    setTimeout(function(){
        share1.className = 'share viber opened';
        share2.className = 'share telegram opened';
        share3.className = 'share whatsapp opened';
    }, 400);

    // setTimeou for the big red button with the share icon
    setTimeout(function(){
        sharebutton.className = 'icon-share closed';
        xbutton.className = 'icon-x expanded';
        sharebutton.style.display = 'none';
    }, 1000);
}

function share_close() {
    // Animation for the big red button with the share icon
    redbutton.className = 'share-button button-close';
    xbutton.className = 'icon-x x-close';
    sharebutton.style.opacity = '0';
    sharebutton.style.display = 'block';
    sharebutton.className = 'icon-share share-close';

    // Closing the mini share buttons
    share1.className = 'share viber nodelay';
    share2.className = 'share telegram nodelay';
    share3.className = 'share whatsapp nodelay';


    // setTimeout for the big red button with the share icon
    setTimeout(function(){
        sharebutton.style.opacity = '1';
        sharebutton.className = 'icon-share';
        xbutton.className = 'icon-x';
        xbutton.style.display = 'none';

        // Closing the mini share buttons
        share1.className = 'share viber';
        share2.className = 'share telegram';
        share3.className = 'share whatsapp';
    }, 1000);
}

/*
This part of the animation is "under construction" :)

function icon_select(iconid) {
	var icon = document.getElementById(iconid);
	icon.className = icon.className + " " + "select";
}
*/