$( document ).ready(function() {
  loadDirectory();
    $('#classmapbox .btn-group').load($SCRIPT_ROOT + '/classmap', function() {
        setClass('1');
        setTool('dottool');
        $('#classmapbox button').click( function() {
          setClass($(this).attr('target'));
        });
        $('#toolbox button').click( function() {
          setTool($(this).attr('target'));
        });
    });    
});

function loadDirectory() {
  $('#dirlist').empty().load($SCRIPT_ROOT + '/dirlist', function() {
      $('.imagelink a').click( function(e) {
        loadImage(this.target);
      });
  });  
}

function setTool(target) {
  $('#toolbox').data('selected', target);
  $('#toolbox button').removeClass('selected');
  $('#toolbox button[target="'+target+'"]').addClass('selected')
  setupDrawing();
}

function setClass(target) {
  $('#classmapbox').data('selected', target);
  $('#classmapbox button').removeClass('selected');
  $('#classmapbox button[target="'+target+'"]').addClass('selected')
}

function setupDrawing() {
  $("#svgbox svg").children().off("mousedown");
  d3.select("#svgbox").on("mousedown", null);

  tool = $('#toolbox').data('selected');
  if (tool == 'boxtool') d3.select("#svgbox").on("mousedown", drawRect);
  else if (tool == 'dottool') d3.select("#svgbox").on("mousedown", drawDot);
  else if (tool == 'erasertool') {
    $("#svgbox svg").children().on("mousedown", function() {$(this).remove()});
  }
}

function loadImage(path) {
  saveLabel();
  $('.imagelink a').removeClass('selected');
  $('.imagelink a[target="'+path+'"]').addClass('selected');

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
    
    setupDrawing();    
  }
}

function saveLabel(path) {
  var path = $('#imagebox').data('path');
  if (path == null) return;

  var svg = d3.select('#svg')[0][0];
  if (svg.children.length == 0) return;

  var svg_xml = (new XMLSerializer).serializeToString(svg);
  $.ajax({
        url: $SCRIPT_ROOT+'/label/'+path,
        type: 'PUT',
        data: {'svg': svg_xml}
    });

  loadDirectory();
}