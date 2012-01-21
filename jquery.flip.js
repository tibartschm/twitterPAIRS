(function( $ ){

  var buildHtmlContainer = function(frontPicture, backPicture){
    var html = [];
    html.push('<div class="card-container">');
      html.push('<div class="card">');
        html.push('<div class="face">');
          html.push('<img src="' + frontPicture + '"/>');
        html.push('</div>');
        html.push('<div class="back face">');
          html.push('<img src="' + backPicture + '"/>');
        html.push('</div>');
      html.push('</div>');
    html.push('</div>');
    return html.join("");
  };

  var methods = {
    init : function( options ) { 
      if(!(options.backPicture && options.frontPicture)){
        return this;
      }
      var html = buildHtmlContainer(options.frontPicture, options.backPicture);
      return this.append(html);
    },
    flip : function( ) {
      if(!this.hasClass("card")){
        return this;
      }
      var $card = this;
      if($card.hasClass("flipped")){
        $card.removeClass("flipped");
      }else{
        $card.addClass("flipped");
      }
      return this;
    }
  };

  $.fn.flip = function( method ) {
    
    // Method calling logic
    if ( methods[method] ) {
      return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof method === 'object') {
      return methods.init.apply( this, arguments );
    } else if ( ! method) {
      return methods.flip.apply( this, arguments );
    } else {
      $.error( 'Method ' +  method + ' does not exist on jQuery.tooltip' );
    }    
  
  };

})( jQuery );