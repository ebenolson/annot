function dropmarker() {
  svg = d3.select('#svg');
  console.log('test');
  point = d3.mouse(this);
  svg.append("circle")
  .attr("cx", point[0])
  .attr("cy", point[1])
  .attr("r", 10);
}