import * as d3 from "d3";

/**
 * 
 * Method to Draw the D3 inner-donut line chart
 * 
 * @param {Object} config with properties to draw the line
 * 
 * 
 */
function innerDonutLineChart(config) {
    const { size, radius, colors, animationDuration, container } = config

    const width = size - 45,
        height = size + 50,
        points = 25

    const lineX = d3.scaleLinear()
        .domain([0, points - 1]) 
        .range([0, width])

    const lineY = d3.scaleLinear()
        .domain([0, 15]) 
        .range([height, 0])

    const lineChart = d3.line()
        .x(function (d, i) { return lineX(i) })
        .y(function (d) { return lineY(d.y) })
        .curve(d3.curveMonotoneX)

    const lineChartData = d3.range(points).map((n, index) => {
        return { "y": d3.randomUniform(0.1 * index)() }
    })

    const lineChartSvg = d3.select(`.${container}__donut`).append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", `translate(${radius / 3 + 10},${-radius})`)

    const lineChartPath = lineChartSvg.append("path")
        .style("stroke", colors[0])
        .style("fill", "none")
        .style("stroke-width", 2.5)
        .style("opacity", 0.3)
        .datum(lineChartData) 
        .attr("class", "linechart") 
        .attr("d", lineChart)

    const lineChartLength = lineChartPath.node().getTotalLength()

    lineChartPath
        .attr("stroke-dasharray", lineChartLength + " " + lineChartLength)
        .attr("stroke-dashoffset", lineChartLength)
        .transition()
        .duration(animationDuration) 
        .ease(d3.easeLinear)
        .attr("stroke-dashoffset", 0)

}

export default innerDonutLineChart