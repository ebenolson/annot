$( document ).ready(function() {
    $('#dirlist').load($SCRIPT_ROOT + '/dirlist', function() {
        $('.imagelink a').click( function() {
          loadImage(this.target);
        });
    });
    $('#classmapbox').load($SCRIPT_ROOT + '/classmap', function() {
        $('.classbutton a').click( function() {
          setClass(this.target);
        });
    });    
});

function setClass(target) {
  console.log(target);
  $('.classbutton .glyphicon').removeClass('selected');
  $('.classbutton a[target="'+target+'"] .glyphicon').addClass('selected')
}

function loadImage(path) {
    $('#imagebox').empty()
    .append('<img src="'+$SCRIPT_ROOT+'/image/'+path+'"></img>')
    .data('path', path)

    var tmpImg = new Image() ;
    tmpImg.src = $('#imagebox img').attr('src')
    tmpImg.onload = function() {
var svg = d3.select("#imagebox").append("svg")
    .attr("width", $('#imagebox img').width())
    .attr("height", $('#imagebox img').height())
    .attr("id", "svg")

svg.append("g");
    //.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

svg
  .on("mousedown", dropmarker);
        
    }    

}

function saveLabel(path) {
  var svg = d3.select('#svg')[0];
  var svg_xml = (new XMLSerializer).serializeToString(svg[0]);
  $.ajax({
        url: $SCRIPT_ROOT+'/label/'+path,
        type: 'PUT',
        data: svg_xml
    });
}