function drawChart() {
  var chart = d3.select('#chart');
  chart
    .attr('width', '900px')
    .attr('height', '1900px')
    .style('border', '2px solid red');

  
  // append one petal
  // const petal1 = 'M0,0 C50,40 50,70 20,100 L0,85 L-20,100 C-50,70 -50,40 0,0';
  // chart.append('path')
  //   .attr('d', petal1)
  //   .attr('fill', 'none')
  //   .attr('stroke', '#000')
  //   .attr('stroke-width', 2)
  //   .attr('transform', 'translate(100, 100)');

  d3.json('data/movies.json')
    .then(parseData)
    .catch(function (err) {
      console.log('Failed with', err)
    });

  // all the petal paths
  petalFormula = {
    "G": "M0 0 C50 50 50 100 0 100 C-50 100 -50 50 0 0",
    "PG": "M-35 0 C-25 25 25 25 35 0 C50 25 25 75 0 100 C-25 75 -50 25 -35 0",
    "PG-13": "M0,0 C50,40 50,70 20,100 L0,85 L-20,100 C-50,70 -50,40 0,0",
    "R": "M0 0 C50 25 50 75 0 100 C-50 75 -50 25 0 0"
  }

  // color the petals here
  petalColor = {
    "Action": "#ffc8f0",
    "Comedy": "#cbf2bd",
    "Animation": "#afe9ff",
    "Drama": "#ffb09e",
    "Other": "#FFF2B4",
  }

  function parseData(datapoints) {
    // define votes scale for num petals
    const rangeVotes = d3.extent(datapoints.map(d => d.votes));
    const scaleVotes = d3.scaleLinear()
      .domain(rangeVotes)
      .range([5, 10]);

    // define ratings scales for size
    // const rangeRatings = d3.extent(datapoints.map(d => d.rating));
    const scaleRatings = d3.scaleLinear()
      .domain([0, 10])
      .range([0, 1]);

    var flowers = datapoints.map(d => ({
      title: d.title,
      path: petalFormula[d.rated],
      color: petalColor[petalColor.hasOwnProperty(d.genres[0]) ? d.genres[0] : 'Other'],
      numPetals: Math.round(scaleVotes(d.votes)),
      scale: scaleRatings(d.rating)
    }));

    function drawFlowers(datapoints) {
      chart.selectAll('g.flowers')
        .data(datapoints).enter()
        .append('g')
        .classed('flowers', )
      chart.selectAll('path')
        .data(datapoints).enter()
        .append('path')
        .attr('d', d => d.path)
        .attr('fill', d => d.color)
        .attr('fill-opacity', 0.5)
        .attr('stroke', d => d.color)
        .attr('stroke-width', 2)
        .attr('transform', (d, i) => `translate(${i % 10 * 100 - 50}, ${Math.floor(i / 10) * 120}) scale(${d.scale})`)
    }
    
    drawPetals(flowers);
  }

  function drawPetals(datapoints) {
    chart.selectAll('path')
      .data(datapoints).enter()
      .append('path')
      .attr('d', d => petalFormula[d.rated])
      .attr('fill', d => petalColor[petalColor.hasOwnProperty(d.genres[0]) ? d.genres[0] : 'Other'])
      .attr('fill-opacity', 0.5)
      .attr('stroke', d => petalColor[petalColor.hasOwnProperty(d.genres[0]) ? d.genres[0] : 'Other'])
      .attr('stroke-width', 2)
      .attr('transform', (d, i) => `translate(${i % 10 * 100 - 50}, ${Math.floor(i / 10) * 120})`);  
  }

};

drawChart();


// function drawPetals(datapoints) {
//   chart.selectAll('path')
//     .data(datapoints).enter()
//     .append('path')
//     .attr('d', d => petalFormula[d.rated])
//     .attr('fill', d => petalColor[petalColor.hasOwnProperty(d.genres[0]) ? d.genres[0] : 'Other'])
//     .attr('fill-opacity', 0.5)
//     .attr('stroke', d => petalColor[petalColor.hasOwnProperty(d.genres[0]) ? d.genres[0] : 'Other'])
//     .attr('stroke-width', 2)
//     .attr('transform', (d, i) => `translate(${i % 10 * 100 - 50}, ${Math.floor(i / 10) * 120})`);  
// }