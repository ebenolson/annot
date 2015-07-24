var drawing = false;

function startPen() {
  if (drawing) return;
  drawing = true;

  path = $('#svg').data('path');
  if (path == null) {
    path = [];
    $('#svg').data('path', path);
  }

  point = d3.mouse(this);
  path.push(point);

  svg = d3.select('#svg');
  svg
  .on("mousemove", updateBrush)
  .on("mouseup", finishBrush);
}

function updateBrush() { 
  path = $('#svg').data('path');
  point = d3.mouse(this);
  path.push(point);

  if (path.length < 3) return;
  $('svg #pen').remove();

  svg = d3.select('#svg');
    
  var res = [];
  for (var i=0; i<path.length; i++) {
    res.push(path[i].join(','));
  }

  points = res.join(' ');
  var cls = $('#classmapbox').data('selected');
  var color = $('#classmapbox button[target="'+cls+'"]').css('color');

  svg.append("polyline")
  .attr('id', "pen")
  .attr('fill', "none")
  .attr("points", points)
  .attr("stroke", "white")
  .attr("stroke-width", 2)
  .attr("class", cls);

}

function finishBrush() {
  if (!drawing) return;
  drawing = false;

  $('svg #pen').remove();

  svg = d3.select('#svg');
    
  var res = [];
  for (var i=0; i<path.length; i++) {
    res.push(path[i].join(','));
  }

  points = res.join(' ');
  var cls = $('#classmapbox').data('selected');
  var color = $('#classmapbox button[target="'+cls+'"]').css('color');

  svg.append("polygon")
  .attr("points", points)
  .attr("fill", color)
  .style("fill-opacity", 0.5)
  .attr("stroke", "white")
  .attr("stroke-width", 2)
  .attr("class", cls);

  svg
  .on("mousemove", null)
  .on("mouseup", null);

  $('#svg').data('path', []);
}

function drawDot() {
  svg = d3.select('#svg');
  point = d3.mouse(this);

  var cls = $('#classmapbox').data('selected');
  var color = $('#classmapbox button[target="'+cls+'"]').css('color');
  console.log(color);
  svg.append("circle")
  .attr("cx", point[0])
  .attr("cy", point[1])
  .attr("r", 10)
  .attr("fill", color)
  .style("fill-opacity", 0.5)
  .attr("stroke", "white")
  .attr("stroke-width", 2)
  .attr("class", cls);
}

function drawRect() {
  if (drawing) return;
  drawing = true;
  console.log('drawing');
  svg = d3.select('#svg');
  point = d3.mouse(this); 
  var cls = $('#classmapbox').data('selected');
  var color = $('#classmapbox button[target="'+cls+'"]').css('color');

  svg.append("rect")
  .attr("x", point[0])
  .attr("y", point[1])
  .attr("width", 0)
  .attr("height", 0)
  .attr("fill", color)
  .style("fill-opacity", 0.5)
  .attr("stroke", "white")
  .attr("stroke-width", 2)
  .attr("class", "drawing");

  svg
  .on("mousemove", updateRect)
  .on("mouseup", finishRect);
}

function updateRect() {
  if (!drawing) return;

  point = d3.mouse(this);     

  rect = d3.select('#svg rect.drawing');
  rect
  .attr('width', point[0] - rect.attr('x'))
  .attr('height', point[1] - rect.attr('y'))
}

function finishRect() {
  if (!drawing) return;
  drawing = false;

  var cls = $('#classmapbox').data('selected');
  d3.select('#svg rect.drawing').attr("class", cls)

  svg = d3.select('#svg');
  svg
  .on("mousemove", null)
  .on("mouseup", null);
}