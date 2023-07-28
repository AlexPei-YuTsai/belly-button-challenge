// The data accessed contains microbe information for 153 individuals where the bacteria a person may have is already sorted beforehand by phylotype prevalence in descending order.

url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";
let data = {};

// Upon successfully reading the data, do the following things
d3.json(url).then(function(jsonData){
  // Read json data into a globally accessible variable
  data = jsonData;

  // There are 153 of them, so this block here programmatically creates dropdown options so I don't have to hardcode it by hand
  // Iterate through the list of recorded names to create options
  for (let i=0; i<data.names.length; i++){
    // Adds a new option and assigns it display text and a value
    // The value doesn't seem necessary, but it's there for safe measure
    d3.select("#selDataset").append("option").text(data.names[i]).attr("value", data.names[i]);
  };

  // Creates a Plotly horizontal bar chart. Default set to the first item of imported dataset
  // Default Chart upon loading in data
  let defaultDisplay = data.samples[0];
  let defaultMetadata = data.metadata[0];
  // Slice used to get the first 10 results, Map used to convert integer ID values to string labels
  let plotData = [{
    type:"bar",
    orientation:"h",
    x:defaultDisplay.sample_values.slice(0, 10),
    y:defaultDisplay.otu_ids.slice(0, 10).map(x => "OTU "+String(x)),
    text:defaultDisplay.otu_labels.slice(0, 10)
  }];
  // Autorange used to reverse the default ordering of the horizontal bar chart
  let plotLayout = {
    title:`Most Prevalent Bacteria for Subject ${defaultDisplay.id}`,
    xaxis:{title:"Phylotype Frequency"},
    yaxis:{
      title:"Operational Taxonomic Unit (OTU) ID",
      autorange:"reversed"
    }
  };

  Plotly.newPlot("bar", plotData, plotLayout);

  // Creates a Plotly bubble chart. Similarly, sets the default to the first item of imported dataset
  let bubbleData = [{
    mode:"markers",
    marker:{
      size:defaultDisplay.sample_values,
      color:defaultDisplay.otu_ids
    },
    x:defaultDisplay.otu_ids,
    y:defaultDisplay.sample_values,
    text:defaultDisplay.otu_labels
  }];
  let bubbleLayout = {
    title:`Most Prevalent Bacteria for Subject ${defaultDisplay.id}`,
    xaxis:{title:"Operational Taxonomic Unit (OTU) ID"},
    yaxis:{title:"Phylotype Frequency (Size)"}
  };

  Plotly.newPlot("bubble", bubbleData, bubbleLayout);

  // Iteratively assigns values based on metadata dictionary
  for (const [key, value] of Object.entries(defaultMetadata)) {
    d3.select("#sample-metadata").append("p").text(`${key}: ${value}`);
  };

  // Creates a Plotly gauge chart. Similarly, sets the default to the first item of imported dataset
  let gaugeData = [{
    domain: { x: [0, 1], y: [0, 1] },
		value: defaultMetadata.wfreq,
		title: { text: "Scrubs per Week" },
		type: "indicator",
		mode: "gauge+number",
    gauge: {
      axis: { range: [null, 9], dtick:1 },
      // Javascript's closest equivalent to Python's range(n) function
      steps: [...Array(9).keys()].map(x=>({range:[x, x+1], thickness:0.3, color:"#d3d3d3", line:{color:"#ffffff", width:2}})),
      bar:{color:"lightblue"}
    }
  }];
  let gaugeLayout = {
    title:`Belly Button Scrubbing Frequency for Subject ${defaultDisplay.id}`
  };

  Plotly.newPlot("gauge", gaugeData, gaugeLayout);
});

// Dropdown menu changes should be reflected on screen
function optionChanged(value){
  // Get new value from json data
  let updateValue = data.samples[data.names.indexOf(value)];
  let updateMetadata = data.metadata[data.names.indexOf(value)];

  // Update bar chart
  // Update plotData content
  let updatePlotData = {
    x:[updateValue.sample_values.slice(0, 10)],
    y:[updateValue.otu_ids.slice(0, 10).map(x => "OTU "+String(x))],
    text:[updateValue.otu_labels.slice(0, 10)]
  };
  // Update chart title
  let updatePlotLayout = {
    title:`Most Prevalent Bacteria for Subject ${updateValue.id}`
  };

  // Update Plotly plot
  Plotly.update("bar", updatePlotData, updatePlotLayout, [0]);

  // Update bubble chart data and layout
  let updateBData = {
    x:[updateValue.otu_ids],
    y:[updateValue.sample_values],
    text:[updateValue.otu_labels]
  };
  let updateBLayout = {
    title:`Most Prevalent Bacteria for Subject ${updateValue.id}`
  };

  // Update Plotly Bubble
  Plotly.update("bubble", updateBData, updateBLayout, [0]);

  // Update Demographic Info table
  // Clear table
  d3.selectAll("#sample-metadata>p").remove()
  // Re-add elements
  for (const [key, value] of Object.entries(updateMetadata)) {
    d3.select("#sample-metadata").append("p").text(`${key}: ${value}`);
  };

  // Update gauge chart data and layout
  let updateGData = {
    value:updateMetadata.wfreq
  };
  let updateGLayout = {
    title:`Belly Button Scrubbing Frequency for Subject ${updateValue.id}`
  };

  // Update Plotly Gauge
  Plotly.update("gauge", updateGData, updateGLayout, [0]);
};