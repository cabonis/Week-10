function scatter_plot(x, y, markers, colors, colorScale, id, title="", xLabel="", yLabel="", margin = 100) {

    function data_axis_pad(data,pad=.05){
        return [data[0]-pad*data[0], data[1]+pad*data[1] ]
    }

    let xScale= d3.scaleLinear().domain(data_axis_pad(d3.extent(x))).range([0+margin,1000-margin]);
    let yScale= d3.scaleLinear().domain(data_axis_pad(d3.extent(y))).range([1000-margin,0 + margin]);
    let markerScale = d3.scaleLinear().domain(d3.extent(markers)).range([2, 20]);    
    let axis = d3.select(`#${id}`);

    axis.selectAll('.markers')
        .data(x)
        .enter()
        .append('g')
        .attr('transform', (d,i) => `translate(${xScale(x[i])}, ${yScale(y[i])})`)
        .append('circle').attr("r", (d,i) => markerScale(markers[i]))
        .style("fill", (d,i) => colorScale(colors[i]));
    
    let x_axis = d3.axisBottom(xScale).ticks(4);
    let y_axis = d3.axisLeft(yScale).ticks(4);
    
    axis.append("g").attr("class","axis")
        .attr("transform", `translate(${0},${1000-margin})`)
        .call(x_axis);
    
    axis.append("g").attr("class","axis")
        .attr("transform", `translate(${margin},${0})`)
        .call(y_axis);
    
    axis.append("g").attr("class","label")
        .attr("transform", `translate(${500},${1000-10})`)
        .append("text")
        .attr("class","label")
        .attr("text-anchor","middle")
        .text(xLabel);

    axis.append("g")
        .attr("transform", `translate(${35},${500}) rotate(270)`)
        .append("text")
        .attr("class","label")
        .attr("text-anchor","middle")
        .text(yLabel);

    axis.append('text')
        .attr('x',500)
        .attr('y',80)
        .attr("text-anchor","middle")
        .text(title)
        .attr("class","plotTitle");

}