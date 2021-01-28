declare const window: any
import { withPrefix } from "gatsby";
import * as d3 from 'd3'

/**
 * Creates and returns a D3 SVG DOM Elemet from the params
 * @param domRef
 * @param width
 * @param height
 * @param heightRatio
 */
export const createD3SVG = (domRef: any, width: string, height: string, heightRatio: string) => {
  var d3Container = d3.select(domRef)
  var chartWidth, chartHeight
  // If width is not specified in the CSV, then use full available width and then use height as a ratio
  if (!width) {
    const floatHeightRatio = parseFloat(heightRatio)
    chartWidth = domRef.offsetWidth
    chartHeight = domRef.offsetWidth * floatHeightRatio
  } else {
    chartWidth = width
    chartHeight = height
  }
  var svg = d3Container.append('svg').attr('width', chartWidth).attr('height', chartHeight).classed("aleph-chart", true)
  return svg
}

const navigateToTechnologyDetailPage = (techName: string) => {
  window.open(withPrefix(`/technology/${techName}`), '_blank')
}
/**
 * Identifies a function that is already in the DOM with renderFunction then executes it with
 * * d3
 * * svg
 * * technologies
 *
 * Scripts are added to the page from the useEffect func
 * @param svg
 * @param renderFunction
 * @param technologies
 */
export const renderVisualisationFunc = (svg: any, domRef: any, renderFunction: string, technologies: any, prefixedPath: string) => {
  if (svg && domRef) {
    //TODO: Remove or comment out
    console.log('renderVisualisation() calling ' + renderFunction)
    let renderFunctionObject = window[renderFunction]
    if (renderFunctionObject) {
      renderFunctionObject(technologies, prefixedPath, navigateToTechnologyDetailPage)
    } else {
      //TODO: Remove or comment out
      console.log("Couldn't find render function")
    }
  } else {
    //TODO: Remove or comment out
    console.log("Couldn't find svg")
  }
}
