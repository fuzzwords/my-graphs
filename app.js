d3.csv("demographics.csv", function(data) {
  // Define margins, width, and height
  var margin = {top: 20, right: 80, bottom: 30, left: 50},
      width = 960 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

  // Define the x and y scales
  var x = d3.scaleLinear().range([0, width]),
      y = d3.scaleLinear().range([height, 0]);

  // Define the axes
  var xAxis = d3.axisBottom(x),
      yAxis = d3.axisLeft(y);

  // Define the line function
  var line = d3.line()
      .x(function(d) { return x(d.Year); })
      .y(function(d) { return y(d['Birth Rate']); });

  // Add the SVG canvas
  var svg = d3.select("body").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  // Get the data and format it
  data.forEach(function(d) {
    d.Year = +d.Year;
    d['Birth Rate'] = +d['Birth Rate'];
  });

  // Set the domains of the x and y scales
  x.domain(d3.extent(data, function(d) { return d.Year; }));
  y.domain([0, d3.max(data, function(d) { return d['Birth Rate']; })]);

  // Add the x-axis
  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  // Add the y-axis
  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Birth Rate");

  // Add the birth rate line
  svg.append("path")
      .datum(data)
      .attr("class", "line birth")
      .attr("d", line);
});
