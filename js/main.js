// var Isotope = window.Isotope = require('../../js/isotope');
// var eventie = require('eventie');
// var matchesSelector = require('desandro-matches-selector');

// // require('isotope-fit-columns');
// // require('isotope-cells-by-column');
// // require('isotope-horizontal');
// // require('isotope-masonry-horizontal');

// function getText( elem ) {
//   return elem.textContent || elem.innerText;
// }

// var iso = window.iso = new Isotope( '#container', {
//   layoutMode: 'fitRows',
//   transitionDuration: '0.8s',
//   cellsByRow: {
//     columnWidth: 130,
//     rowHeight: 140,
//   },
//   getSortData: {
//     number: '.number parseInt',
//     symbol: '.symbol',
//     name: '.name',
//     category: '[data-category]',
//     weight: function( itemElem ) {
//       // remove parenthesis
//       var weight = itemElem.querySelector('.weight').textContent;
//       return parseFloat( weight.replace( /[()]/g, '' ) );
//     },
//   },
// } );

// var options = document.querySelector('#options');

// eventie.bind( options, 'click', function( event ) {
//   if ( !matchesSelector( event.target, 'button' ) ) {
//     return;
//   }

//   var key = event.target.parentNode.getAttribute('data-isotope-key');
//   var value = event.target.getAttribute('data-isotope-value');

//   if ( key === 'filter' && value === 'number-greater-than-50' ) {
//     value = function( elem ) {
//       var numberText = getText( elem.querySelector('.number') );
//       return parseInt( numberText, 10 ) > 40;
//     };
//   }
//   console.log( key, value );
//   iso.options[ key ] = value;
//   iso.arrange();
// } );

$(document).ready(function(){

  var $grid = $('.popular-active').isotope({
  itemSelector: '.grid-item',
  percentPosition: true,
  masonry: {
    // use outer width of grid-sizer for columnWidth
    columnWidth: 1
  }
})
  // filter items on button click
$('.protfliyo-manu').on( 'click', 'button', function() {
  var filterValue = $(this).attr('data-filter');
  $grid.isotope({ filter: filterValue });
});

(function ($) {
  $.fn.countTo = function (options) {
    options = options || {};
    
    return $(this).each(function () {
      // set options for current element
      var settings = $.extend({}, $.fn.countTo.defaults, {
        from:            $(this).data('from'),
        to:              $(this).data('to'),
        speed:           $(this).data('speed'),
        refreshInterval: $(this).data('refresh-interval'),
        decimals:        $(this).data('decimals')
      }, options);
      
      // how many times to update the value, and how much to increment the value on each update
      var loops = Math.ceil(settings.speed / settings.refreshInterval),
        increment = (settings.to - settings.from) / loops;
      
      // references & variables that will change with each update
      var self = this,
        $self = $(this),
        loopCount = 0,
        value = settings.from,
        data = $self.data('countTo') || {};
      
      $self.data('countTo', data);
      
      // if an existing interval can be found, clear it first
      if (data.interval) {
        clearInterval(data.interval);
      }
      data.interval = setInterval(updateTimer, settings.refreshInterval);
      
      // initialize the element with the starting value
      render(value);
      
      function updateTimer() {
        value += increment;
        loopCount++;
        
        render(value);
        
        if (typeof(settings.onUpdate) == 'function') {
          settings.onUpdate.call(self, value);
        }
        
        if (loopCount >= loops) {
          // remove the interval
          $self.removeData('countTo');
          clearInterval(data.interval);
          value = settings.to;
          
          if (typeof(settings.onComplete) == 'function') {
            settings.onComplete.call(self, value);
          }
        }
      }
      
      function render(value) {
        var formattedValue = settings.formatter.call(self, value, settings);
        $self.html(formattedValue);
      }
    });
  };
  
  $.fn.countTo.defaults = {
    from: 0,               // the number the element should start at
    to: 0,                 // the number the element should end at
    speed: 1000,           // how long it should take to count between the target numbers
    refreshInterval: 100,  // how often the element should be updated
    decimals: 0,           // the number of decimal places to show
    formatter: formatter,  // handler for formatting the value before rendering
    onUpdate: null,        // callback method for every time the element is updated
    onComplete: null       // callback method for when the element finishes updating
  };
  
  function formatter(value, settings) {
    return value.toFixed(settings.decimals);
  }
}(jQuery));

jQuery(function ($) {
  // custom formatting example
  $('.count-number').data('countToOptions', {
  formatter: function (value, options) {
    return value.toFixed(options.decimals).replace(/\B(?=(?:\d{3})+(?!\d))/g, ',');
  }
  });
  
  // start all the timers
  $('.timer').each(count);  
  
  function count(options) {
  var $this = $(this);
  options = $.extend({}, options || {}, $this.data('countToOptions') || {});
  $this.countTo(options);
  }
});

});



