import analyticsApi from './services/analytics-api'

import DevicesChart from './components/devices-chart'

import './index.sass'

(async () => {
    const [revenue, impresions, visits] = await analyticsApi.retrieveData()
    debugger
    DevicesChart({
        size: 250,
        colors: ["#3F5B28", "#8EBC55"],
        animationDuration: 1000,
        units: revenue.units,
        title: revenue.title,
        data: revenue.data,
        container: 'chart-revenue'
    })

    DevicesChart({
        size: 250,
        colors: ["#344A58", "#85BECE"],
        animationDuration: 1000,
        units: impresions.units,
        title: impresions.title,
        data: impresions.data,
        container: 'chart-impressions'
    })

    DevicesChart({
        size: 250,
        colors: ["#A65934", "#E6D764"],
        animationDuration: 1000,
        units: visits.units,
        title: visits.title,
        data: visits.data,
        container: 'chart-visits'
    })

})()
