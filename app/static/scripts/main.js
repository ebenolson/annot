$( document ).ready(function() {
    $('#dirlist').load($SCRIPT_ROOT + '/dirlist', function() {
        $('.imagelink a').click( function() {
          loadImage(this.target);
        });
    });
});

function loadImage(target) {
    $('#imagebox').empty().append('<img src="'+$SCRIPT_ROOT+'/image/'+target+'"></img>');

    var tmpImg = new Image() ;
    tmpImg.src = $('#imagebox img').attr('src') ;
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