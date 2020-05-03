function designPlot(id){
    d3.json("data/samples.json").then((data)=> {
        console.log(data);
//Pull "Sample info form the dataset
    let samples = data.samples.filter(samples => samples.id.toString() === id)[0];
        console.log(`samles: ${samples}`);
    let wfreq = data.metadata.map(metadata => metadata.wfreq);
        console.log(`Washing Freq: ${wfreq}`);        
// Use "Slice" to pull the top 10 sample value
    let sampleValue = samples.sample_values.slice(0, 10).reverse();
        console.log(`Top 10 sample values: ${sampleValue}`);
//Use "Slice" to pull the top 10 sample id
    let otu_top = (samples.otu_ids.slice(0, 10)).reverse();
        console.log(`Top 10 otu_ids: ${otu_top}`);    
//create otu_ids lables for bar plot
    let otu_id = otu_top.map(id => "OTU " + id);
        console.log(`otu_ids: ${otu_id}`);
//catch the top 10 otu labels for each bar
    let labels = samples.otu_labels.slice(0, 10);
        console.log(`otu_labels: ${labels}`);
 
// create trace variable for the plot
    let bar = {
        x: sampleValue,
        y: otu_id,
        text: labels,
        marker:{
            color: 'lightgreen'
        },
        type: "bar",
        orientation: 'h'
        };

// create data variable
    let barData = [bar];

// create layout variable to set plots layout
        var layout = {
            title: "Top 10 OTUs",
            yaxis:{
                tickmode:"linear",
            },
            margin: {
                l: 100,
                r: 100,
                t: 100,
                b: 30
            }
        };

// create the bar plot
        Plotly.newPlot("bar", barData, layout);

        // Bubble chart
        var bubble = {
            x: samples.otu_ids,
            y: samples.sample_values,
            mode: "markers",
            marker:{
                size: samples.sample_values,
                color: samples.otu_ids
            },
            text: samples.otu_labels
        };

        var layout_b = {
            xaxis:{title: "OTU ID"},
            height: 600,
            width: 1000
        };
  
        // creating data variable 
        let bubbleData= [bubble];
  
        // create the bubble plot
        Plotly.newPlot("bubble", bubbleData, layout_b); 



// create the 
let gaugeData = [
	{
		domain: { x: [0, 10], y: [0, 10] },
		value: 10,
		title: { text: "Belly Button Washing Frequency" },
		type: "indicator",
        mode: "gauge+number",
        gauge: {
            axis: { range: [null, 10] },
    }
}
];

var layout = { width: 650, height: 500, margin: { t: 0, b: 0 } };

    Plotly.newPlot('gauge', gaugeData, layout);

    });
}

//Create function to pull the individual's demographic information
function getIdNo(id){
    d3.json("data/samples.json").then((data)=> {
        let DemInfo=data.metadata;
        console.log(DemInfo)

// filter demographic information data info by id
        let result = DemInfo.filter(data => data.id.toString() === id)[0];
// select demographic panel to put data
        let Infodemographic = d3.select("#sample-metadata");    
        Infodemographic.html("");
        Object.entries(result).forEach((key) => {   
            Infodemographic.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");    
        });   
    
    })
}
//Create function to change the event
function optionChanged(id) {
    designPlot(id);
    getIdNo(id);
}

// create the function for the initial data rendering
function getInfo() {
// select dropdown menu 
    let dropdown = d3.select("#selDataset");

// read the data 
    d3.json("data/samples.json").then((data)=> {
        //console.log(data)

// get the id data to the dropdwown menu
    data.names.forEach(function(name) {
        dropdown.append("option").text(name).property("value");
    });

// call the functions to display the data and the plots to the page
    designPlot(data.names[0]);
    getIdNo(data.names[0]);
});
}

getInfo();
