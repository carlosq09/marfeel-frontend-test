import ChartTable from '../chart-table'
import LineChart from '../line-chart'
import * as d3 from "d3";

import './index.sass'

/**
 * 
 * Method to Draw a D3 Donut chart
 * 
 * @param {Object} config with properties to draw the Donut Chart
 * 
 * 
 */
function drawDonutChart(config) {
    const { size, colors, animationDuration, title, units, data, container } = config
    const radius = size / 2
    let total = 0
    debugger
    function tweenDonut(b) {
        b.innerRadius = 0
        const i = d3.interpolate({ startAngle: 0, endAngle: 0 }, b)
        return function (t) { return donutChartArc(i(t)) }
    }

    const color = d3.scaleOrdinal()
        .range(colors)

    const donutChartArc = d3.arc()
        .outerRadius(radius - 28)
        .innerRadius(radius - 20)

    const donut = d3.pie()
        .value(d => {
            total += d.count
            return d.count
        })
        .sort(null)

    const donutChartSvg = d3.select(`.${container}`)
        .append("svg")
        .attr("width", size)
        .attr("height", size)
        .attr("class", `${container}__donut`)
        .append("g")
        .attr("transform", "translate(" + size / 2 + "," + size / 2 + ")")

    const donutGradient = donutChartSvg.append("defs")
        .append("linearGradient")
        .attr("id", `grad__${title}`)
        .attr("x1", "0%")
        .attr("x2", "0%")
        .attr("y1", "100%")
        .attr("y2", "0%")

    donutGradient.append("stop")
        .attr("offset", "0%")
        .style("stop-color", colors[0])

    donutGradient.append("stop")
        .attr("offset", "28%")
        .style("stop-color", "white")

    donutChartSvg.append("circle")
        .attr("r", 90)
        .style("opacity", 0.25)
        .style("fill", `url(#grad__${title})`)

    const donutChartPath = donutChartSvg.selectAll(".arc")
        .data(donut(data))
        .enter().append("g")
        .attr("class", "arc");

    donutChartPath.append("path")
        .attr("d", donutChartArc)
        .style("fill", function (d) { return color(d.data.device) })
        .transition()
        .ease(d3.easeLinear)
        .duration(animationDuration)
        .attrTween("d", tweenDonut)

    donutChartPath.append("text")
        .text(title.toUpperCase())
        .attr("y", -25)
        .attr("class", "title")

    donutChartPath.append("text")
        .text(total.toLocaleString() + units)
        .attr("class", "total")

    donutChartSvg.selectAll("line")
        .data(d3.range(0, 360, 90))
        .enter().append("line")
        .attr("stroke", "black")
        .style("stroke-width", 2)
        .attr("y1", radius - 33)
        .attr("y2", radius - 30)
        .attr("transform", function (d) { return "rotate(" + d + ")" })

    ChartTable({ data, total, units, colors, container })

    LineChart({ data, size, radius, colors, animationDuration, container })

}

export default drawDonutChart


