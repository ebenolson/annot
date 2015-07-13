$( document ).ready(function() {
  loadDirectory();
    $('#classmapbox').load($SCRIPT_ROOT + '/classmap', function() {
        setClass('1');
        $('.classbutton a').click( function() {
          setClass(this.target);
        });
    });    
});

function loadDirectory() {
  $('#dirlist').empty().load($SCRIPT_ROOT + '/dirlist', function() {
      $('.imagelink a').click( function() {
        loadImage(this.target);
      });
  });  
}

function setClass(target) {
  $('#classmapbox').data('selected', target);
  $('.classbutton .glyphicon').removeClass('selected');
  $('.classbutton a[target="'+target+'"] .glyphicon').addClass('selected')
}

function loadImage(path) {
  saveLabel();

  $('#imagebox').empty()
  .append('<img src="'+$SCRIPT_ROOT+'/image/'+path+'"></img>')
  .data('path', path)

  var tmpImg = new Image() ;
  tmpImg.src = $('#imagebox img').attr('src')
  tmpImg.onload = function() {
    $('#svgbox').empty().load($SCRIPT_ROOT+'/label/'+path, function( response, status, xhr ) {
      console.log(status);
      if ( status == "error" ) {
        var svg = d3.select("#svgbox").append("svg")
            .attr("width", $('#imagebox img').width())
            .attr("height", $('#imagebox img').height())
            .attr("id", "svg")

      }
    });
    d3.select("#svgbox").on("mousedown", drawRect);
  }
}

function saveLabel(path) {
  var path = $('#imagebox').data('path');
  if (path == null) return;

  var svg = d3.select('#svg')[0];
  var svg_xml = (new XMLSerializer).serializeToString(svg[0]);
  $.ajax({
        url: $SCRIPT_ROOT+'/label/'+path,
        type: 'PUT',
        data: {'svg': svg_xml}
    });

  loadDirectory();
}