function bar_plot(id, Values, sync) {

    const margin = 80
    const bins_count = 10;
    const axis = d3.select(`#${id}`)    
    const height= parseInt(axis.attr("height"));
    const width= parseInt(axis.attr("width"))-margin;

    // make a linear scale for the X Axis
    // we will use this for making bins and placing them
    let xScale= d3.scaleLinear()
        .domain(d3.extent(Values))
        .range([margin,width]);


    // histogram function makes bins and the values for each bin
    // use xScale and number bins to calculate the bisn location and value
    let histogram = d3.histogram()
        .value((d) => d )
        .domain(xScale.domain())
        .thresholds(xScale.ticks(bins_count));

    let bins = histogram(Values);

    // y will represent number of elements inside each bin!
    let yScale= d3.scaleLinear()
        .domain([0,d3.max(bins, (d) => d.length)])
        .range([height,0]);

    // pass the bins and plot them
    axis.selectAll('.bars')
        .data(bins)  // array of arrays (each array inside it is the values inside one bin)
        .enter()
        .append("g")
        .attr("class","bars")
        .attr("transform", d => `translate(${xScale(d.x0)} ,${yScale(d.length)} )`)
        .append('rect')
        .attr("width", d => xScale(d.x1) - xScale(d.x0) - 1)
        .attr("height", d => height - yScale(d.length))
        .on("mouseenter", (m, d) => {
            if(sync) {
                sync.highlightX(d3.extent(d));
            }
        })
        .on("mouseout", () => {
            if(sync) {
                sync.reset();
            }
        })
}


function h_bar_plot(id, Values, sync) {

    const margin = 80
    const bins_count = 10;
    let axis = d3.select(`#${id}`);
    let height= parseInt(axis.attr("height"))-margin;
    let width= parseInt(axis.attr("width"));

    // in horizontal histogram chart, width is the number of elements in the bin
    // hight is the bin number
    // Step 1 make y scale to use it's ticks for the histogram
    let yScale= d3.scaleLinear()
        .domain(d3.extent(Values))
        .range([height,margin]);

    // step 2 get the histogram data
    let histogram = d3.histogram()
        .value((d) => d )
        .domain(yScale.domain())
        .thresholds(yScale.ticks(bins_count));

    // step 3 use the data to calculate histogram bin values
    let bins = histogram(Values);

    // step 4, now that we have the  bins and their numbers we can make the xscale
    let xScale = d3.scaleLinear()
        .domain([0,d3.max(bins, (d) => d.length)])
        .range([0,width]);

    // now that we have the scales let us add the bars to the svg
    axis.selectAll('.bars')
        .data(bins)  // array of arrays (each array inside it is the values inside one bin)
        .enter()
        .append("g")        // add one group per bar, shift it to position of bar
        .attr("class","bars")
        .attr("transform", (d,i) => `translate(${0} ,${yScale(d.x1)} )`)
        .append('rect') // width of the bar is equal to the length of elements in the bin
        .attr("width", d => xScale(d.length))
        .attr("height", d => yScale(d.x0) - yScale(d.x1) - 1)
        .on("mouseenter", (m, d) => {
            if(sync) {
                sync.highlightY(d3.extent(d));
            }
        })
        .on("mouseout", () => {
            if(sync) {
                sync.reset();
            }
        })
}