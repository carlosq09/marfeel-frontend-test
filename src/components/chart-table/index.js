import * as d3 from "d3";
import './index.sass'

/**
 * 
 * Method to instance a D3 Table 
 * 
 * @param {Object} config with properties to the table
 * 
 * 
 */
function chartTable(config) {
    const { data, total, units, colors, container } = config

    const color = d3.scaleOrdinal()
        .range(colors)

    const table = d3.select(`.${container}`)
        .append('table')
        .attr("class", `${container}__table`)

    table.append('tr')
        .selectAll('th')
        .data(data)
        .enter()
        .append('th')
        .attr("class", `table__row`)
        .text(function (d) {
            return d.device
        })
        .style("color", function (d) { return color(d.device) })

    const tableRows = table.selectAll('tr')
        .data(data)
        .enter()
        .append('tr');

    tableRows
        .selectAll('td')
        .data(data)
        .enter()
        .append('td')
        .attr("class", `table__data`)
        .html(function (d) {
            return " " + (d.count.toLocaleString() + units);
        })

    tableRows
        .selectAll('td')
        .append('td')
        .attr("class", `table__percentage`)
        .html(function (d) {
            return `${(d.count * 100) / total}% &nbsp`;
        })
}
export default chartTable