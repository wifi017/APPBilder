document.addEventListener('deviceready', function() {
    // erst jetzt ist APP geladen und ready um was zu tun!
    console.log( 'DEVICE READY!' );
    $( document ).ready( function() {
      console.log( 'DOM READY!' );

      var bilder = [
      	'das-paradies-fuer-wintersportler.jpg',
      	'endlos-weite-schwuenge-ueber-perfekt-praeparierte-pisten-ziehen.jpg',
      	'erlebnishotel-fendels-familienhit.jpg',
      	'fruehlings-special-top-of-tyrol.jpg'
      ];

      var audio = $( '#swush' ).get(0);

      var aktuell = 0;
      var showImage = function( i ) {

        if ( i != 0 ) {
          audio.play();
        }

      	aktuell += i;
      	if ( aktuell < 0 ) aktuell = bilder.length - 1; // wieder ans ende
      	if ( aktuell > bilder.length - 1 ) aktuell = 0; // wieder zum anfang
      	$( '#bilder' ).css({'background-image':'url(tirolbilder/'+bilder[aktuell]+')'});
      }

      var showNext = function() {	showImage( 1 ); }
      var showPrev = function() { showImage( -1 ); }

      $( document ).on( 'click', '#bilder', function() {
        audio.play();
      });

      $( document ).on( 'click', '#next', showNext );
      $( document ).on( 'click', '#prev', showPrev );
      $( document ).ready( function() {
      	showImage(0);
      });

      var downX = 0;
      $( document ).on( 'touchstart', '#bilder', function( event ) {
          downX = event.originalEvent.touches[0].clientX;
      });
      $( document ).on( 'touchmove', '#bilder', function( event ) {
      	if ( downX == 0 ) return;
      	var diffX = downX - event.changedTouches[0].clientX;
      	if ( diffX < 0 ) $( '#bilder' ).css( { left: diffX });
      	if ( diffX > 0 ) $( '#bilder' ).css( { right: -diffX });
      });
      $( document ).on( 'touchend', '#bilder', function( event) {
      	var diffX = downX - event.changedTouches[0].clientX;
      	if ( diffX < -100 ) { showImage(1); }
      	if ( diffX > 100 ) { showImage(-1); }
      	downX = 0;
      	$( '#bilder' ).css( { left: 0, right: 0 });
      });


    });
});
