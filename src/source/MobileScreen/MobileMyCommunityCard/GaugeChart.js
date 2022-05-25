import * as d3 from 'd3'
import React, { useEffect } from 'react'

const Gauge = ({ id, backgroundColor, foregroundColor, textValue, caption, chartPercent }) => {
  useEffect(() => {
    draw()
  })

  let draw = () => {
    d3.select('#gaugeChart' + id)
      .select('svg')
      .remove()

    const margin = 5
    const width = 30
    const height = 30

    let radius = Math.min(width, height) / 2.1 - margin / 2

    let svg = d3
      .select('#gaugeChart' + id)
      .append('svg')
      .attr('width', '85%')
      .attr('height', '85%')
      .attr('viewBox', `0 0 ${width} ${height}`)
      .append('g')
      .attr('transform', `translate(${width / 2}, ${height / 2})`)
    let value = chartPercent

    // svg
    //   .append('circle')
    //   .attr('r', radius * 1.1)
    //   .style('fill', 'rgba(235, 87, 87, 0.6)')

    svg
      .append('path')
      .attr(
        'd',
        d3
          .arc()
          .innerRadius(radius * 0.65)
          .outerRadius(radius + 1.1)
          .startAngle(0)
          .endAngle(360)
          .cornerRadius(10)
      )
      .attr('fill', backgroundColor)
    svg
      .append('path')
      .attr(
        'd',
        d3
          .arc()
          .innerRadius(radius * 0.65)
          .outerRadius(radius + 1.1)
          .startAngle(0)
          .endAngle((value * Math.PI) / 180)
          .cornerRadius(10)
      )
      .attr('fill', foregroundColor)

    svg
      .append('text')
      .attr('x', 0)
      .attr('y', 0)
      .text(textValue)
      .style('font-size', '4px')
      .style('font-weight', '500')
      .style('font-family', 'Roboto')
      .style('fill', foregroundColor)
      .attr('text-anchor', 'middle')

    svg
      .append('text')
      .attr('x', 0)
      .attr('y', 3)
      .text(caption)
      .style('font-size', '2.5px')
      .style('font-family', 'Roboto')
      .style('fill', '#8c827a')
      .attr('class', 'members')
      .attr('text-anchor', 'middle')
  }

  return <div id={'gaugeChart' + id} className={'flexRowCenter'}></div>
}

const GaugeChart = ({ id, backgroundColor, foregroundColor, textValue, caption, chartPercent }) => {
  return (
    <div className={['w-100 h-100 flexRowCenter']}>
      <div className={['w-30 flexColAroundCenter']}>
        <Gauge
          backgroundColor={backgroundColor}
          foregroundColor={foregroundColor}
          textValue={textValue}
          caption={caption}
          id={id}
          chartPercent={chartPercent}
        />
      </div>
    </div>
  )
}

export default GaugeChart
