function legend(id, colors, colorScale, title) {
    
    let margin = 20;
    let legendSize = 10 

    let axis = d3.select(`#${id}`);
    let height= parseInt(axis.attr("height"));
    let width= parseInt(axis.attr("width"))-margin;

    let g = axis.append("g")
        .attr("transform", `translate(${0}, ${height - margin * 2})`);

    axis.append('text')
        .attr('x', 0)
        .attr('y', height - 50)
        .attr("text-anchor","left")
        .text(title)
        .attr("class", "legendTitle");

    g.selectAll("legendDots")
        .data(colors)
        .enter()
        .append("rect")
            .attr("y", (d,i) => i * (legendSize+5))
            .attr("width", legendSize)
            .attr("height", legendSize)
            .style("fill", (d, i) => colorScale(i));

    g.selectAll("legendLabels")
        .data(colors)
        .enter()
        .append("text")
            .attr("x", legendSize*1.2)
            .attr("y", (d,i) => i * (legendSize+5) + (legendSize/2))
            .text((d) => d)
            .attr("text-anchor", "left")
            .style("alignment-baseline", "middle");

}