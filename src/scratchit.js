/*
 * 
 * 
 *
 * Copyright (c) 2015 Michelle Anderson
 * Licensed under the MIT license.
 */
; (function ($, window, document, undefined) {
  var x, y;
  var defaults = {
    propertyName: "value"
  };

  /**
  * ScratchIt
  * @constructor
  * @param {Object} element
  * @param {Object} options (Optional)
  */
    function ScratchIt(element, options) {
        this.$element = $(element);

        this.options = $.extend({}, defaults, options);

        this._defaults = defaults;
        this._name = 'scratchIt';

        this.isScratching === undefined && this.init();

    }

    ScratchIt.prototype = {

        init: function () {
          
            this.canvas = this.$element.find('canvas');
            this.context = this.canvas[0].getContext('2d');
            
            var context = this.context; 
             
            this.topImage = this.$element.find('img').first();
            this.bottomImage = this.topImage.next();
            this.topImage = this.topImage[0];
            
            this.newImage = new Image();
            this.newImage.src = this.topImage.src;
            var newImage = this.newImage;
            newImage.onload = function(){
              context.drawImage(newImage, 0, 0);
              context.globalCompositeOperation = "destination-out";
            };
            
            console.log(this.newImage.src);
            

            this.context.strokeStyle = "#F00";
            this.context.lineJoin = "round";
            this.context.lineWidth = 20;
            
            this.offsetxy  = this.canvas.offset();
            
            this.canvas.on({
              'mousedown.scratchit' : $.proxy(this.onDown, this),
              'mousemove.scratchit' : $.proxy(this.onMove, this),
              'mouseup.scratchit' : $.proxy(this.onUp, this)
            });
        },
        
        onDown: function(e) {
          
          var context = this.context;
          context.beginPath();
          x = e.pageX;
          y = e.pageY - this.offsetxy.top;
          context.moveTo(x, y);
          this.isScratching = true;

        },
        onMove: function(e) {
          var context = this.context;
          if (!this.isScratching) {return;}
          x = e.pageX;
          y = e.pageY - this.offsetxy.top;
          context.lineTo(x, y);
          context.stroke();

        },
        onUp: function () {
          this.isScratching = false;

        }
    };

  $.fn.scratchIt = function (options) {
    return this.each(function () {
      if (!$.data(this, 'scratchIt')) {
        $.data(this, 'ScratchIt',
                    new ScratchIt(this, options));
      }

    });
  };
})(jQuery, window, document);
