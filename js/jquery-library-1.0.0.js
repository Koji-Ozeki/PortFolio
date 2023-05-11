$(function() {
  $('.Toggle').click(function() {
    $(this).toggleClass('active');

  if ($(this).hasClass('active')) {
    $('.NavMenu').addClass('active');　 //クラスを付与
  } else {
    $('.NavMenu').removeClass('active'); //クラスを外す
  }
  });
});

// アコーディオン
// .s_01 .accordion_one
$(function(){
  //.accordion_oneの中の.accordion_headerがクリックされたら
  $('.s_01 .accordion_one .accordion_header').click(function(){
    //クリックされた.accordion_oneの中の.accordion_headerに隣接する.accordion_innerが開いたり閉じたりする。
    $(this).next('.accordion_inner').slideToggle();
    $(this).toggleClass("open");
  });
});


// Slick サムネイル付き
$(function () {
    $('.slider_thumb').slick({
      arrows: false,
      asNavFor: '.thumb',
    });
    $('.thumb').slick({
      asNavFor: '.slider_thumb',
      focusOnSelect: true,
      slidesToShow: 4,
      slidesToScroll: 1
    });
  });

  



  $(function(){
    $('#loopslider').each(function(){
        var loopsliderWidth = $(this).width();
        var loopsliderHeight = $(this).height();
        $(this).children('ul').wrapAll('<div id="loopslider_wrap"></div>');
 
        var listWidth = $('#loopslider_wrap').children('ul').children('li').width();
        var listCount = $('#loopslider_wrap').children('ul').children('li').length;
 
        var loopWidth = (listWidth)*(listCount);
 
        $('#loopslider_wrap').css({
            top: '0',
            left: '0',
            width: ((loopWidth) * 2),
            height: (loopsliderHeight),
            overflow: 'hidden',
            position: 'absolute'
        });
 
        $('#loopslider_wrap ul').css({
            width: (loopWidth)
        });
        loopsliderPosition();
 
        function loopsliderPosition(){
            $('#loopslider_wrap').css({left:'0'});
            $('#loopslider_wrap').stop().animate({left:'-' + (loopWidth) + 'px'},25000,'linear');
            setTimeout(function(){
                loopsliderPosition();
            },25000);
        };
 
        $('#loopslider_wrap ul').clone().appendTo('#loopslider_wrap');
    });
});


// フラワーナビ
(function($){
  $.fn.flowernav = function( options, callback ) { 
  
    var defaults = {
      'radius'			: 120,
      'direction'			: 'cw',
      'speed'				: 2,
      'radiusX'			: $(window).width() * 0.3,
      'radiusY'			: $(window).height() * 0.12,
      'rotate'			: true,
      'oSpeed'			: 500,
      'cSpeed'			: 400,
      'easingOpen'		: '', // jquery default swing
      'easingClose'		: '', // jquery default swing
      'hoverStop'			: true,
      'hoverOpacityIn'	: 1,
      'hoverOpacityOut'	: 0.5,
      'hoverSpeedIn'		: 600,
      'hoverSpeedOut'		: 600,
      'intv'				: 30,
      'offset'			: 0,
      'drag'				: false,
      'btnClass'			: '.btn',
      'onOpenStart'		: function(){},
      'onOpenEnd'			: function(){},
      'onCloseStart'		: function(){},
      'onCloseEnd'		: function(){}
      };
  
    return this.each( function() {        
      // If options exist, lets merge them with our default settings
      if ( $.isFunction( options ) ) {
        callback = options;
        options = {};
      }
      var settings = $.extend({}, defaults, options);
      
      var $this = $(this);
  
      if ( callback ) { callback.call($this); }
      var $button = $this.find(settings.btnClass);
  
          //alert($this.attr('id'));
      var childcount = $this.find('ul ul li').size();
      var $childs = $this.find('ul ul li');
      var spacing = 360 / childcount;
  
      var ai;
      var ite = 0;
      var istoggle = false;
          
      $button.data('isopen', 0);
      $button.data('canopen', 1);
      $button.css({zIndex:1001});
      $this.find('ul ul li').css({ opacity: 0, position:'absolute', zIndex: 999, display:'block', margin:0, padding:0, top:0, left:0 });
  
      // makes the menu draggable
      // if(settings.drag){
      //   if($.isFunction($().dragging)){
      //     $this.dragging({
      //       start: function(event, ui) {  $button.data('canopen', 0); }
      //     });
      //   }
      //   else{
      //     alert('Error: Missing jQuery UI Function "dragging" for dragging!');
      //   }
        
      // }
      
      // prevent default link behaviour and 
      $button.live('click', function(e){e.preventDefault();});
      
      // handle the open/close tasks
      $button.live('mouseup', function(e){
        e.preventDefault();
        s = $button.data('isopen');
        c = $button.data('canopen');
        if(s === 1 && c === 1){ $button.data('isopen', 0); close(); }
        if(s === 0 && c === 1){ $button.data('isopen', 1); open();}
        if(c === 0) {$button.data('canopen',1);}
        
      });
  
      function open() {
        
        // callback
        settings.onOpenStart.call($this);
        
        clearInterval(ai);
        istoggle = true;
        $childs.show();
        
        var it = ite/settings.speed;
        
        $childs.each(function(i) {
          nx = Math.floor((settings.radiusX) * (Math.cos((i * spacing + it + settings.offset) / 57 )));
          ny = Math.floor((settings.radiusY) * (Math.sin((i * spacing + it + settings.offset) / 57 )));
          $(this).stop().animate({
            opacity: settings.hoverOpacityOut,
            top: ny,
            left: nx
          },settings.oSpeed,settings.easingOpen, function(){
            if(i == childcount -1){
              if(settings.rotate){
                ai = setInterval(move_circle,settings.intv);
              }
              istoggle = false;
              // callback
              settings.onOpenEnd.call($this);
            }
          });
        });
      }
  
      function close() {
        
        // callback
            settings.onCloseStart.call($this);
        
        istoggle = true;
        clearInterval(ai);
              
        $childs.each(function(i) {
          $(this).stop().animate({
            opacity: 0,
             top: 0,
            left: 0
          }, settings.cSpeed,settings.easingClose, function(){
            istoggle = false;
            // callback
            if(i == childcount-1) {settings.onCloseEnd.call($this);}
          });
        });
      }
  
      $childs.hover(
        function(){
          if(!istoggle && $button.data('isopen') !== 0)
          {
            $(this).siblings('li').css({zIndex:999});
            $(this).css({zIndex:1000});
            
            $(this).stop().animate({
              opacity: settings.hoverOpacityIn
            }, settings.hoverSpeedIn);
            
            settings.hoverStop ? clearInterval(ai) : '' ;
          }
        },
        function(){
          if(!istoggle && $button.data('isopen') !== 0)
          {
            $(this).stop().animate({
              opacity: settings.hoverOpacityOut
            }, settings.hoverSpeedOut);
            
            if(settings.rotate){
              clearInterval(ai);
              settings.hoverStop ? ai = setInterval(move_circle,settings.intv) : '' ;
            }
          }
        }
      );
  
      function move_circle(){
        if(settings.direction == 'ccw'){
          ite--;
        }else{
          ite++;
        }
        
        var it = ite/settings.speed;
  
        $childs.each(function(i){
          nx = Math.floor((settings.radiusX) * (Math.cos((i * spacing + it + settings.offset) / 57 )));
          ny = Math.floor((settings.radiusY) * (Math.sin((i * spacing + it + settings.offset) / 57 )));
          $(this).css({top:ny,left:nx});
              });
          }
      });
  };
  })( jQuery );

  




  // タイプライター
  (function(factory) {
    if ( typeof define === 'function' && define.amd ) {
      define(['jquery'], factory);
    } else {
      factory(jQuery);
    }
  }(function($) {
    'use strict';
  
    $.fn.typistInit = function () {
      return this.each(function() {
        if ( !$(this).data('typist')) {
          new Typist(this);
        }
      });
    };
  
    $.fn.typist = function(opts) {
      return this.each(function() {
        new Typist(this, opts);
      });
    };
  
    $.fn.typistAdd = function(text, callback) {
      return this
        .typistInit()
        .each(function() {
          var self = $(this).data('typist');
          self.queue.push({ text: text, callback: callback });
          self.type();
        });
    };
  
    $.fn.typistRemove = function(length, callback) {
      length = parseInt(length) || 0;
  
      return this
        .typistInit()
        .each(function() {
          var self = $(this).data('typist');
          self.queue.push({ remove: length, callback: callback });
          self.type();
        });
    };
  
    $.fn.typistPause = function(delay, callback) {
      delay = parseInt(delay) || 0;
  
      return this
        .typistInit()
        .each(function() {
          var self = $(this).data('typist');
          self.queue.push({ delay: delay, callback: callback });
          self.type();
        });
    };
  
    $.fn.typistStop = function() {
      return this
        .typistInit()
        .each(function() {
          var self = $(this).data('typist');
          self.queue.push({ stop: true });
          self.type();
        });
    };
  
    /**
     * @class
     * @param {HTMLElement} element
     * @param {Object} [opts]
     * @param {String} [opts.text=''] Text for typing
     * @param {Number} [opts.speed=10] Typing speed (characters per second)
     * @param {Boolean} [opts.cursor=true] Shows blinking cursor
     * @param {Number} [opts.blinkSpeed=2] Blinking per second
     * @param {String} [opts.typeFrom='end'] Typing from start/end of element
     * @param {Object} [opts.cursorStyles] CSS properties for cursor element
     */
    function Typist(element, opts) {
      $.extend(this, {
        speed: 10, // characters per second
        text: '',
        cursor: true,
        blinkSpeed: 2, // blink per second
        typeFrom: 'end', // 'start', 'end'
  
        cursorStyles: {
          display: 'inline-block',
          fontStyle: 'normal',
          margin: '-2px 2px 0 2px'
        }
      }, opts || {});
  
      this._cursor = null;
      this._element = $(element);
      this._element.data('typist', this);
      this._container = null;
  
      this.queue = [];
      this.timer = null;
      this.delay = 1000 / this.speed;
  
      this.blinkTimer = null;
      this.blinkDelay = 1000 / this.blinkSpeed;
  
      if ( this.text ) {
        this.queue.push({ text: this.text });
        this.type();
      }
    }
  
    Typist.prototype =
    /** @lends Typist */
    {
      /**
       * Adds blinking cursor into element
       */
      addCursor: function() {
        if ( this._cursor ) {
          clearInterval(this.blinkTimer);
          this._cursor
            .stop()
            .remove();
        }
  
        this._cursor = $('<span>|</span>')
          .css(this.cursorStyles)
          .insertAfter(this._container);
  
        this.cursorVisible = true;
        this.blinkTimer = setInterval($.proxy(function() {
          this.cursorVisible = !this.cursorVisible;
          this._cursor.animate({ opacity: this.cursorVisible ? 1 : 0 }, 100);
        }, this), this.blinkDelay);
      },
  
      /**
       * Triggers event
       * @param {String} event
       * @return {Typist}
       */
      fire: function(event) {
        this._element.trigger(event, this);
        return this;
      },
  
      /**
       * New line to <br> tag
       * @param {String} text
       * @return {String}
       */
      nl2br: function(text) {
        return text.replace(/\n/g, '<br>');
      },
  
      /**
       * <br> tag to new line
       * @param {String} html
       * @return {String}
       */
      br2nl: function (html) {
        return html.replace(/<br.*?>/g, '\n');
      },
  
      /**
       * Removes given number of characters
       * @param {Number} length
       * @param {Function} [callback]
       */
      remove: function(length, callback) {
        if ( length <= 0 ) {
          callback();
          this.timer = null;
          return this
            .fire('end_remove.typist')
            .type();
        }
  
        var text = this._container.html();
  
        length--;
        text = this.br2nl(text);
        text = text.substr(0, text.length - 1);
        text = this.nl2br(text);
  
        this.timer = setTimeout($.proxy(function() {
          this._container.html(text);
          this.remove(length, callback);
        }, this), this.delay);
  
        this.fire('tick.typist');
      },
  
      /**
       * Adds given text character by character
       * @param {String|Array} text
       */
      step: function(text, callback) {
        if ( typeof text === 'string' ) {
          text = text.split('');
        }
  
        if ( !text.length ) {
          callback();
          this.timer = null;
          return this
            .fire('end_type.typist')
            .type();
        }
  
        var character = text.shift();
        character = $('<div>').text(character).html();
        character = this.nl2br(character);
  
        this.timer = setTimeout($.proxy(function() {
          this._container.html(this._container.html() + character);
          this.step(text, callback);
        }, this), this.delay);
  
        this.fire('tick.typist');
      },
  
      /**
       * Stops all animations and removes cursor
       * @return {[type]} [description]
       */
      stop: function() {
        clearInterval(this.blinkTimer);
        this.blinkTimer = null;
  
        if ( this._cursor ) {
          this._cursor.remove();
          this._cursor = null;
        }
  
        clearTimeout(this.timer);
        this.timer = null;
      },
  
      /**
       * Gets and invokes tasks from queue
       */
      type: function() {
        if ( this.timer ) {
          return;
        }
  
        if ( !this._container ) {
          this._container = $('<span>');
          if ( this.typeFrom === 'start' ) {
            this._element.prepend(this._container);
          } else {
            this._element.append(this._container);
          }
        }
  
        if ( this.cursor ) {
          this.addCursor();
        }
  
        var item = this.queue.shift() || {},
          callback = $.proxy(item.callback || $.noop, this);
  
        if ( item.delay ) {
          this
            .fire('start_pause.typist')
            .timer = setTimeout($.proxy(function() {
              callback();
              this.timer = null;
              this
                .fire('end_pause.typist')
                .type();
            }, this), item.delay);
          return;
  
        } else if ( item.remove ) {
          this
            .fire('start_remove.typist')
            .remove(item.remove, callback);
          return;
  
        } else if ( item.stop ) {
          this.stop();
          return;
        }
  
        if ( !item.text ) {
          return;
        }
  
        this
          .fire('start_type.typist')
          .step(item.text, callback);
      }
    };
  }));