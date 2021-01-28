/*
  Project: HMI Technology Convergence visualisation
  Filename: aleph-hmi_technologyconvergence.js
  Date built: September 2020 to XYZ 2020
  Written By: James Bayliss (Data Vis Developer)
  Tech Stack: HTML5, CSS3, JS ES5/6, D3 (v5), JQuery 
*/

/* 

USEFUL LINKS:
// https://bl.ocks.org/d3noob/06e72deea99e7b4859841f305f63ba85
// https://blockbuilder.org/JoePlant/d0f0c5345478505b343d9f1d08513295 (deprecated)
// https://blockbuilder.org/SpaceActuary/2a46e03eb7b7e05f48e6251054501244 (deprecated)

*/

// Initialisation of global 'aleph' object construct. Stores all main dynamic variables for UI design and response
var aleph = {
  linkCounter: -1,
  lastBUILD_SPECIFIC_UID: -1,
  xCoords: [],
  url: 'http://HMI-technologySelector.co.uk?',
  margin: { top: 125, right: 100, bottom: 100, left: 100, axis: -25 },
  numberOfTechnologiesAllowed: 5,
  techConvergenceData: [],
  sourceTechnologyArray: [],
  reverseSourceTechnologyArray: [],
  targetTechnologyArray: [],
  selectedTechnologyArray: [],
  layerHistory: {},
  timeLineAxisMinYear: 9999,
  timeLineAxisMaxYear: -9999,
  dataMinYear: 9999,
  dataMaxYear: -9999,
  timeLineAxisPadding: 0,
  transitionDuration: 1250,
  lateralPositionType: 'xTime',
  lateralPositionTypeLookUp: { 'toggle-off': 'xTime', 'toggle-on': 'x' },
  toolTipDimensions: {
    /* dimension and positioning attributes for tooltip */ width: 500,
    height: 300,
    verticalLabelSpacing: 35 /* vertical spacing between text lines */,
    margin: { top: 100, right: 50, bottom: 5, left: 20 },
    informationArray: [] /* blank array to contain information estracted from ingested data file to display on tooltip */,
  },
  submitted: false,
  transitionType: /* 1 */ /* "byEquallySpaced" */ 'byTime',
  techIconImageSize: 35,
  chartHeight: 1750,
}

var technologies_new = {}
var technologies = {}

var link // global setting up of link var
var path // global setting up of path var
var parseDate = d3.timeParse('%Y') // time format parser - currently set up to read in integer years (e.g. 2020, 2017). No month or date/day definition
var formatDate = d3.timeFormat('%Y') // time format parser - currently set up to read in integer years (e.g. 2020, 2017). No month or date/day definition

var sankey // global setting up of sankey var

// defintion onf D3 tooltip
aleph.tooltip = d3
  //  .select("body")
  //  .append("div")
  .selectAll('.aleph-hmiToolTip-Div')
  .style('filter', 'url(#drop-shadow)')
  .attr('class', 'aleph-hmiToolTip-Div aleph-hide')
  .style('position', 'absolute')
  .style('left', 50 + 'px')
  .style('padding', '15px')
  .style('top', 50 + 'px')
  .style('width', aleph.toolTipDimensions.width + 'px')

// append tooltip title label
d3.selectAll('.aleph-hmiToolTip-Div')
  .append('label')
  .attr('class', 'aleph-hmiToolTipTitle-label')
  .style('position', 'relative')
  .style('display', 'block')
  .style('text-anchor', 'middle')
  .text('Test Title Text')

d3.selectAll('.aleph-hmiToolTip-Div')
  .append('label')
  .attr('class', 'aleph-tooltip-label aleph-hmiToolTipSubTitle-label')
  .style('position', 'relative')
  .style('left', 10 + 'px')
  .style('display', 'block')
  .text('Test Sub-title Text')

d3.selectAll('.aleph-hmiToolTip-Div')
  .append('label')
  .attr('class', 'aleph-tooltip-label aleph-hmiToolNewTechnologyInformation-label')
  .style('position', 'relative')
  .style('left', 10 + 'px')
  .style('display', 'block')
  .text('hmiToolNewTechnologyInformation')

d3.selectAll('.aleph-hmiToolTip-Div')
  .append('label')
  .attr('class', 'aleph-tooltip-label aleph-hmiToolTipParents-label')
  .style('position', 'relative')
  .style('left', 10 + 'px')
  .style('display', 'block')
  .text('Test Number Text')

d3.selectAll('.aleph-hmiToolTip-Div')
  .append('label')
  .attr('class', 'aleph-tooltip-label aleph-hmiToolTipParentsList-label')
  .style('position', 'relative')
  .style('left', 10 + 'px')
  .style('font-weight', 'normal')
  .style('display', 'block')
  .text('Test Title Text')

d3.selectAll('.aleph-hmiToolTip-Div')
  .append('label')
  .attr('class', 'aleph-tooltip-label aleph-hmiToolTipChildren-label')
  .style('position', 'relative')
  .style('left', 10 + 'px')
  .style('display', 'block')
  .text('Test Number Text')

d3.selectAll('.aleph-hmiToolTip-Div')
  .append('label')
  .attr('class', 'aleph-tooltip-label aleph-hmiToolTipChildrenListTitle-label')
  .style('position', 'relative')
  .style('left', 10 + 'px')
  .style('font-weight', 'bold')
  .style('display', 'block')
  .text('Test Title Text')

// filters go in defs element
var defs = d3.selectAll('.aleph-chart').append('defs')

// create filter with id #drop-shadow
// height=130% so that the shadow is not clipped
var filter = defs.append('filter').attr('id', 'drop-shadow').attr('height', '130%')

// SourceAlpha refers to opacity of graphic that this filter will be applied to
// convolve that with a Gaussian with standard deviation 3 and store result
// in blur
filter.append('feGaussianBlur').attr('in', 'SourceAlpha').attr('stdDeviation', 2.5).attr('result', 'blur')

// translate output of Gaussian blur to the right and downwards with 2px
// store result in offsetBlur
filter.append('feOffset').attr('in', 'blur').attr('dx', 5).attr('dy', 5).attr('result', 'offsetBlur')

// overlay original SourceGraphic over translated blurred opacity by using
// feMerge filter. Order of specifying inputs is important!
var feMerge = filter.append('feMerge')
feMerge.append('feMergeNode').attr('in', 'offsetBlur')
feMerge.append('feMergeNode').attr('in', 'SourceGraphic')

// function handling for onclocik event on control dialog
d3.selectAll('.aleph-controls').on('click', function () {
  // if users wants dialog displayed.
  if (d3.selectAll('.aleph-controls').classed('aleph-closeControls')) {
    d3.selectAll('.aleph-controls').classed('aleph-closeControls', false).classed('aleph-openControls', true)
  } else {
    // if users wants dialog hidden.
    d3.selectAll('.aleph-controls').classed('aleph-closeControls', true).classed('aleph-openControls', false)
  }

  // move dialog to front
  var sel = d3.selectAll('.aleph-controls')
  sel.moveToFront()

  return
})

// function call based on browser window resize.
window.onresize = windowResize

/*
  NAME: onload 
  DESCRIPTION: function called when user loads window. Called on initial opening of visualsation.
                Calls functions necessary to set-up initial view
  ARGUMENTS TAKEN: none
  ARGUMENTS RETURNED: none
  CALLED FROM: body tag in index.html
  CALLS:    alertSize();
            loadData();
*/
function onload() {
  alertSize() // function call to get current browser window dimensions
  loadData() // function call to load initial CSV data file

  // store window dimensions as aleph object varaiables
  aleph.windowWidth = vis.width
  aleph.windowHeight = vis.height

  // update dimensions of base container DIV to size of browser window
  d3.selectAll('.aleph-container')
    .style('width', aleph.windowWidth + 'px')
    .style('height', aleph.windowHeight + 'px')

  // update dimensions of base container SVG panel to size of browser window
  d3.selectAll('.aleph-chart')
    .attr('width', aleph.windowWidth)
    .attr('height', aleph.chartHeight + 50)

  return
} // end function onload

/*
      NAME: windowResize 
      DESCRIPTION: function called when user resizes window. handles updating of content reliant on dimension of window
      ARGUMENTS TAKEN: none
      ARGUMENTS RETURNED: none
      CALLED FROM: none
      CALLS: submitSelection
  
      http://bl.ocks.org/johangithub/97a186c551e7f6587878
*/
function windowResize() {
  alertSize() // function call to get current browser window dimensions

  // store window dimensions as aleph object varaiables
  aleph.windowWidth = vis.width
  aleph.windowHeight = vis.height

  // update dimensions of base container DIV to size of browser window
  d3.selectAll('.aleph-container')
    .style('width', aleph.windowWidth + 'px')
    .style('height', aleph.chartHeight + 'px')

  // update dimensions of base container SVG panel to size of browser window
  d3.selectAll('.aleph-chart')
    .attr('width', aleph.windowWidth)
    .attr('height', aleph.chartHeight + 50)

  aleph.chartWidth = aleph.windowWidth - aleph.margin.left - aleph.margin.right

  aleph.lateralPositionType =
    aleph.lateralPositionTypeLookUp[document.getElementById('change-view-style').classList.value] // change-view-style
  aleph.x.range([0, aleph.chartWidth])

  // append g element to hold x time axis
  svg.selectAll('.axis.axis--x').call(
    d3
      .axisTop(aleph.x)
      .ticks(d3.timeYear.every(5))
      .tickFormat(function (d, i) {
        if (i == 0) {
          return 'Now'
        } else {
          return 'In ' + (parseInt(formatDate(d)) - 2020) + ' years'
        }
      })
  )

  // select and remove x axis tick grid lines
  d3.selectAll('.xAxisTicks').remove()
  var xticks = d3.selectAll('.axis.axis--x').selectAll('.tick')

  // append new x axis tick grid lines
  xticks
    .append('svg:line')
    .attr('class', 'xAxisTicks')
    .attr('y0', 0)
    .attr('y1', aleph.chartHeight + aleph.margin.top)
    .attr('x1', 0)
    .attr('x2', 0)

  svg.selectAll('.node').attr('transform', function (d) {
    if (aleph.xCoords.indexOf(d.x) == 0) {
      d.x2 = (aleph.chartWidth / (aleph.numVerticalHorizons - 1)) * aleph.xCoords.indexOf(d.x)
    } else if (aleph.xCoords.indexOf(d.x) == aleph.xCoords.length - 1) {
      d.x2 = (aleph.chartWidth / (aleph.numVerticalHorizons - 1)) * aleph.xCoords.indexOf(d.x) - sankey.nodeWidth()
    } else {
      d.x2 = (aleph.chartWidth / (aleph.numVerticalHorizons - 1)) * aleph.xCoords.indexOf(d.x) - sankey.nodeWidth() / 2
    }

    if (aleph.lateralPositionType == 'xTime') {
      return 'translate(' + aleph.x(parseDate(d['year'])) + ',' + d.y + ')'
    } else if (aleph.lateralPositionType == 'x') {
      return 'translate(' + d.x2 + ',' + d.y + ')'
    }
  })

  // update transition type value
  var path = sankey.link()

  // transition the links
  svg.selectAll('.link').attr('d', function (d, i) {
    if (d.level != 'level1' && d.source.sourceLinks.length != d.source.targetLinks.length) {
      d3.select(this).classed('aleph-areaLink', true)
      return VariableWidthSankeyLink(d, i)
    } else {
      return path(d)
    }
  })

  return
} // end function windowResize

/*
      NAME: loadData 
      DESCRIPTION: function called to load single CSV input data file.
      ARGUMENTS TAKEN: none
      ARGUMENTS RETURNED: none
      CALLED FROM: none
      CALLS:  none
  */
function loadData() {
  return new Promise((resolve, reject) => {
    // store relevant file papth as local variable
    var inputDataFile = `${rootPath}data/convergence.csv`
    var inputTechnologyCatalogueFile = `${rootPath}data/technologies.csv`

    // store all input files as a Promise
    Promise.all([d3.csv(inputDataFile), d3.csv(inputTechnologyCatalogueFile)]).then(function (data) {
      // locally store data
      techConvergence = data[0]
      technologiesFile = data[1]
      aleph.techConvergenceData = techConvergence

      technologiesFile.forEach(function (d, i) {
        var JSONelement = { technology: d.title }
        technologies_new[Number(i + 1)] = JSONelement
      })

      technologies = technologies_new

      // calculate time axis limit miniumum
      aleph.maxGlobalUID = d3.max(aleph.techConvergenceData, function (d) {
        return +d['GLOBAL_UID']
      })

      // calculate time axis limit miniumum
      aleph.timeLineAxisMinYear = Number(
        d3.min([
          Number(
            d3.min(aleph.techConvergenceData, function (d) {
              return d['SOURCE_YEAR']
            })
          ),
          Number(
            d3.min(aleph.techConvergenceData, function (d) {
              return d['TARGET_YEAR']
            })
          ),
        ])
      )

      // calculate time axis limit maximum
      aleph.timeLineAxisMaxYear = Number(
        d3.max([
          Number(
            d3.max(aleph.techConvergenceData, function (d) {
              return d['SOURCE_YEAR']
            })
          ),
          Number(
            d3.max(aleph.techConvergenceData, function (d) {
              return d['TARGET_YEAR']
            })
          ),
        ])
      )
      resolve(aleph.techConvergenceData)
    }) // end promsie data load
  })
}

/*
      NAME: submitSelection 
      DESCRIPTION: function called to initially draw chart
      ARGUMENTS TAKEN: techTaxonomy
      ARGUMENTS RETURNED: none
      CALLED FROM: submitURL, index.html
      CALLS: recurse, cursorCoords
*/
function submitSelection() {
  if (aleph.sourceTechnologyArray.length == 0) {
    return
  }

  // show legend
  d3.selectAll('.aleph-legendBase').classed('aleph-hide', false).moveToFront()

  // modify class name defintions of DOM elements
  d3.selectAll('.aleph-exampleTechSelector').classed('aleph-hide', true)
  d3.selectAll('.aleph-chart').classed('aleph-hide', false)
  d3.selectAll('.aleph-controls').classed('aleph-hide', false)
  d3.selectAll('.aleph-convergenceMap').remove()
  d3.selectAll('.axis.axis--x').remove()
  $('#viewStyle').prop('disabled', false).removeClass('aleph-disabled')

  var linkLevel = 1
  recurse()
  aleph.firstPass = true
  /*
        NAME: recurse 
        DESCRIPTION: function to dynamically recurse through ingested data and contruct multi level JSON object to generarte sankey chart.
        ARGUMENTS TAKEN: none
        ARGUMENTS RETURNED: none
        CALLED FROM: submitSelection
        CALLS: none
  */
  function recurse() {
    if (aleph.sourceTechnologyArray.length != 0) {
      var sourceTechnologyArray = aleph.sourceTechnologyArray
      var layerArray = []

      var selectedTechnologyArray = []
      var targetTechnology = []

      sourceTechnologyArray.forEach(function (d) {
        var techID = d.replace('FID', '')
        var source = ''

        if (!technologies[techID]) {
          source = d
          layerArray.push(source)
        } else {
          source = technologies[techID].technology
          layerArray.push(source)
        }

        selectedTechnologyArray = aleph.techConvergenceData.filter(function (d) {
          var sourceTechnology = d['SOURCE_TECHNOLOGY']
          return sourceTechnology == source
        })
        if (selectedTechnologyArray) {
          selectedTechnologyArray.forEach(function (d) {
            var target = d['TARGET_TECHNOLOGY']

            if (targetTechnology.indexOf(target) == -1) {
              targetTechnology.push(target)
            }

            var selectedTargetArray = []
            selectedTargetArray = aleph.techConvergenceData.filter(function (d) {
              return d['TARGET_TECHNOLOGY'] == target
            })

            aleph.selectedTechnologyArray = aleph.selectedTechnologyArray.concat(selectedTargetArray)
          })
        }
      })

      aleph.layerHistory[linkLevel] = layerArray
      aleph.sourceTechnologyArray = []
      layerArray = []
      aleph.sourceTechnologyArray = targetTechnology
      linkLevel = linkLevel + 1
      recurse()

      //...
    } else {
      // stop calling itself
    }
  } // end function recurse

  // loop through each technology selected
  aleph.selectedTechnologyArray.forEach(function (d) {
    if (d['GLOBAL_UID'] == '') {
      aleph.maxGlobalUID = +(aleph.maxGlobalUID + 1)
      d['GLOBAL_UID'] = +aleph.maxGlobalUID
    }
    // locally store node and value added information
    var node = d
    var nodeTechnology = d.SOURCE_TECHNOLOGY

    // initialise lintpye and level at
    node['LINKTYPE'] = 'secondary'
    node['LEVEL'] = 'level1'

    for (var layer in aleph.layerHistory) {
      if (aleph.layerHistory[layer].indexOf(nodeTechnology) != -1) {
        node['LINKTYPE'] = 'primary'
        node['LEVEL'] = 'level' + layer
      }
    } // end for loop
  }) // end forEach loop

  // calculate time axis limit maximum
  aleph.timeLineAxisMinTechYear = Number(
    d3.min([
      Number(
        d3.min(aleph.selectedTechnologyArray, function (d) {
          return d['SOURCE_YEAR']
        })
      ),
      Number(
        d3.min(aleph.selectedTechnologyArray, function (d) {
          return d['TARGET_YEAR']
        })
      ),
    ])
  )

  // calculate time axis limit maximum
  aleph.timeLineAxisMaxTechYear = Number(
    d3.max([
      Number(
        d3.max(aleph.selectedTechnologyArray, function (d) {
          return d['SOURCE_YEAR']
        })
      ),
      Number(
        d3.max(aleph.selectedTechnologyArray, function (d) {
          return d['TARGET_YEAR']
        })
      ),
    ])
  )

  // REMOVING DULICATE ELEMENTS IN AN ARRAY
  // https://stackoverflow.com/questions/9229645/remove-duplicate-values-from-js-array
  var uniqueTechnologies = []
  $.each(aleph.selectedTechnologyArray, function (i, el) {
    if ($.inArray(el, uniqueTechnologies) === -1) uniqueTechnologies.push(el)
  })

  // append the svg object to the body of the page
  // appends a 'group' element to 'svg'
  // moves the 'group' element to the top left margin
  svg = d3
    .select('.aleph-chart')
    .attr('width', aleph.windowWidth)
    .attr('height', aleph.chartHeight + 50)
    .append('g')
    .attr('class', 'aleph-convergenceMap')
    .attr('id', 'aleph-convergenceMap')
    .attr('transform', 'translate(' + aleph.margin.left + ',' + aleph.margin.top + ')')

  // updae chart width and height variables.
  aleph.chartWidth = aleph.windowWidth - aleph.margin.left - aleph.margin.right

  aleph.chartHeight = 1750

  // initialise D3 axes for x and y domains
  aleph.x = d3.scaleTime().range([0, aleph.chartWidth])
  aleph.x.domain([
    parseDate(aleph.timeLineAxisMinYear - Number(aleph.timeLineAxisPadding)),
    parseDate(aleph.timeLineAxisMaxYear + Number(aleph.timeLineAxisPadding)),
  ])

  if (aleph.timeLineAxisMinTechYear == 2020 && aleph.timeLineAxisMaxTechYear == 2040) {
    $('.aleph-expandTimeAxis').prop('disabled', true).addClass('aleph-disabled')
  } else {
    $('.aleph-expandTimeAxis').prop('disabled', false).removeClass('aleph-disabled')
  }

  // append g element to hold x time axis
  svg
    .append('g')
    .attr('class', 'axis axis--x')
    .attr('transform', 'translate(' + 0 + ',' + aleph.margin.axis + ')')
    .call(
      d3
        .axisTop(aleph.x)
        .ticks(d3.timeYear.every(5))
        .tickFormat(function (d, i) {
          if (i == 0) {
            return 'Now'
          } else {
            return 'In ' + (parseInt(formatDate(d)) - 2020) + ' years'
          }
        })
    )

  // select all x-axis ticks on currently interacted focus chart and add to DOM/display
  var xticks = d3.selectAll('.axis.axis--x').selectAll('.tick')

  // append new tick grid line
  xticks
    .append('svg:line')
    .attr('class', 'xAxisTicks')
    .attr('y0', 0)
    .attr('y1', aleph.chartHeight + aleph.margin.top)
    .attr('x1', 0)
    .attr('x2', 0)

  // Set the sankey diagram properties
  sankey = d3
    .sankey()
    .nodeWidth(36)
    .nodePadding(40)
    .size([aleph.chartWidth, aleph.chartHeight - 150])

  // update path and data vars
  path = sankey.link()
  data = uniqueTechnologies

  //set up graph in same style as original example but empty
  graph = { nodes: [], links: [] }

  var BUILD_SPECIFIC_UID = -1

  // loop through data and generate new graphy nodeslinks object elements.
  data.forEach(function (d) {
    BUILD_SPECIFIC_UID = BUILD_SPECIFIC_UID + 1

    graph.nodes.push({
      GLOBAL_UID: d.GLOBAL_UID,
      BUILD_SPECIFIC_UID: BUILD_SPECIFIC_UID,
      name: d.SOURCE_TECHNOLOGY,
      YEAR: +d.SOURCE_YEAR,
      linkType: d.LINKTYPE,
      level: d.LEVEL,
    })

    graph.links.push({
      BUILD_SPECIFIC_UID: BUILD_SPECIFIC_UID,
      source: d.SOURCE_TECHNOLOGY,
      target: d.TARGET_TECHNOLOGY,
      value: +d.METRIC_VALUE,
      linkType: d.LINKTYPE,
      level: d.LEVEL,
    })

    BUILD_SPECIFIC_UID = BUILD_SPECIFIC_UID + 1

    graph.nodes.push({
      GLOBAL_UID: d.GLOBAL_UID,
      BUILD_SPECIFIC_UID: BUILD_SPECIFIC_UID,
      name: d.TARGET_TECHNOLOGY,
      YEAR: +d.TARGET_YEAR,
      newTechnologyInformation: d.newTechnologyInformation,
    })
  })

  // return only the distinct / unique nodes
  graph.nodes = d3
    .nest()
    .key(function (d) {
      return d.name
    })
    .rollup(function (d) {
      var linkType = 'secondary'
      var level = 'destination'
      d.forEach(function (d) {
        if (d.linkType == 'primary') {
          linkType = 'primary'
        }
        if (d.level) {
          level = d.level
        }
      })

      return {
        GLOBAL_UID: d[0].GLOBAL_UID,
        BUILD_SPECIFIC_UID: d[0].BUILD_SPECIFIC_UID,
        name: d[0].name,
        x2: null,
        xTime: aleph.x(parseDate(d[0].YEAR)),
        year: d[0].YEAR,
        nodeType: linkType,
        level: level,
        newTechnologyInformation: d[0].newTechnologyInformation,
      }
    })
    .entries(graph.nodes)

  graph.nodekeys = graph.nodes.map(function (d) {
    return d.key
  })

  // loop through each link replacing the text with its index from node
  graph.links.forEach(function (d, i) {
    graph.links[i].source = graph.nodekeys.indexOf(graph.links[i].source)
    graph.links[i].target = graph.nodekeys.indexOf(graph.links[i].target)
  })

  //now loop through each nodes to make nodes an array of objects
  // rather than an array of strings
  graph.nodes.forEach(function (d, i) {
    graph.nodes[i] = d.value
  })

  // generate new updated saneky object.
  sankey.nodes(graph.nodes).links(graph.links).layout(32)

  graph.nodes.forEach(function (d) {
    if (aleph.xCoords.indexOf(d.x) == -1) {
      aleph.xCoords.push(d.x)
    }
  })
  aleph.numVerticalHorizons = aleph.xCoords.length

  // add in the links
  link = svg
    .append('g')
    .attr('class', 'aleph-links-g')
    .selectAll('.link')
    .data(graph.links)
    .enter()
    .append('path')
    .attr('class', function (d) {
      return (
        'link FID-' +
        d.BUILD_SPECIFIC_UID +
        ' ' +
        d.level +
        ' ' +
        d.linkType +
        ' ' +
        CharacterToCharacter(d.source.name, ' ', '-') +
        ' ' +
        CharacterToCharacter(d.target.name, ' ', '-')
      )
    })
    .attr('d', function (d, i) {
      if (d.level != 'level1' && d.source.sourceLinks.length != d.source.targetLinks.length) {
        d3.select(this).classed('aleph-areaLink', true)
        return VariableWidthSankeyLink(d, i)
      } else {
        return path(d)
      }
    })
    .style('stroke-width', function (d) {
      return Math.max(2, d.dy)
    })
    .sort(function (a, b) {
      return b.dy - a.dy
    })

  // add in the nodes
  var node = svg
    .append('g')
    .attr('class', 'aleph-nodes-g')
    .selectAll('.node')
    .data(graph.nodes)
    .enter()
    .append('g')
    .attr('class', function (d) {
      return 'node FID-' + d.BUILD_SPECIFIC_UID
    })
    .attr('transform', function (d) {
      aleph.dataMinYear = d3.min([aleph.dataMinYear, d.year])
      aleph.dataMaxYear = d3.max([aleph.dataMaxYear, d.year])
      return 'translate(' + d[aleph.lateralPositionType] + ',' + d.y + ')'
    })
    .call(
      d3
        .drag()
        .subject(function (d) {
          return d
        })
        .on('start', function () {
          this.parentNode.appendChild(this)
          d3.selectAll('.node').style('pointer-events', 'none')
          d3.select(this).style('pointer-events', 'auto')
          var sel = d3.select(this)
          sel.moveToFront()
        })
        .on('drag', dragmove)
        .on('end', function () {
          d3.selectAll('.node').style('pointer-events', 'auto')
        })
    )

  // add the rectangles for the nodes
  node
    .append('rect')
    .attr('class', function (d) {
      var level
      if (d.sourceLinks.length == 0) {
      }
      return (
        'aleph-nodeBlock' +
        ' FID-' +
        d.BUILD_SPECIFIC_UID +
        ' ' +
        d.level +
        ' ' +
        d.nodeType +
        ' ' +
        CharacterToCharacter(d.name, ' ', '-')
      )
    })
    .attr('height', function (d) {
      if (d.dy < 0) {
        return 1
      } else {
        return d.dy
      }
    })
    .attr('width', sankey.nodeWidth())
    .on('mouseover', function (d) {
      d3.selectAll('.aleph-hmiToolTip-g').classed('aleph-hide', false).moveToFront()

      // D3 v4
      var x = d3.event.pageX
      var y = d3.event.pageY

      cursorCoords(d, x, y)
      return
    })
    .on('mousemove', function (d) {
      // call function to update coordinates and position of tooltip

      // D3 v4
      var x = d3.event.pageX
      var y = d3.event.pageY

      cursorCoords(d, x, y)

      return
    })
    .on('mouseout', function () {
      d3.selectAll('.aleph-hmiToolTip-Div').classed('aleph-hide', true)
      return
    })

  node
    .append('svg:image')
    .attr('class', function (d) {
      return 'aleph-techIcon FID-' + d.BUILD_SPECIFIC_UID + ' ' + CharacterToCharacter(d.name, ' ', '-')
    })
    .attr('id', function (d) {
      return 'aleph-techIcon-' + d.BUILD_SPECIFIC_UID
    })
    .attr('xlink:href', function (d, i) {
      var counter = 1
      for (var tech in technologies) {
        if (technologies[tech].technology == d.name) {
          return `${rootPath}image/svg/black/bFID${parseInt(counter)}.svg`
        }
        counter++
      }
    })
    .attr('x', -6 - aleph.techIconImageSize)
    .attr('y', function (d) {
      return d.dy / 2 - aleph.techIconImageSize / 2
    })
    .attr('width', aleph.techIconImageSize)
    .attr('height', aleph.techIconImageSize)
    .filter(function (d) {
      return d.xTime < aleph.chartWidth / 2
    })
    .attr('x', sankey.nodeWidth() + 5)
    .on('mousedown', function (d) {
      d3.event.stopPropagation()

      var name = d.GLOBAL_UID
      var slug = ''
      technologiesFile.forEach(function (d) {
        var tech = d
        if (tech.id == name) {
          slug = d.slug
        }
      })
      navFunc(slug)
      return
    })
    .on('mouseup', function (d) {
      d3.event.stopPropagation()
      return
    })
    .on('mouseover', function (d) {
      d3.selectAll('.aleph-hmiToolTip-g').classed('aleph-hide', false).moveToFront()

      // D3 v4
      var x = d3.event.pageX
      var y = d3.event.pageY

      cursorCoords(d, x, y)
      return
    })
    .on('mousemove', function (d) {
      // call function to update coordinates and position of tooltip

      // D3 v4
      var x = d3.event.pageX
      var y = d3.event.pageY

      cursorCoords(d, x, y)

      return
    })
    .on('mouseout', function () {
      d3.selectAll('.aleph-hmiToolTip-Div').classed('aleph-hide', true)
      return
    })

  // add in the title for the nodes
  node
    .append('text')
    .attr('class', 'aleph-nodeLabel')
    .attr('x', function (d) {
      for (var tech in technologies) {
        if (technologies[tech].technology == d.name) {
          return -10 - aleph.techIconImageSize
        }
      }
      return -10
    })
    .attr('y', function (d) {
      return d.dy / 2
    })
    .attr('dy', '.35em')
    .attr('text-anchor', 'end')
    .attr('transform', null)
    .text(function (d) {
      return d.name
    })
    .filter(function (d) {
      return d.xTime < aleph.chartWidth / 2
    })
    .attr('x', function (d) {
      for (var tech in technologies) {
        if (technologies[tech].technology == d.name) {
          return sankey.nodeWidth() + 10 + aleph.techIconImageSize
        }
      }
      return sankey.nodeWidth() + 10
    })
    .attr('text-anchor', 'start')

  // add in the title for the nodes
  node
    .append('text')
    .attr('class', 'aleph-nodeYearLabel')
    .attr('x', sankey.nodeWidth() / 2)
    .attr('y', function (d) {
      return d.dy - 5.0
    })
    .attr('dy', '0.0em')
    .attr('text-anchor', 'middle')
    .attr('transform', null)
    .text(function (d) {
      return d.year
    })

  return
} // end function submitSelection

/*
      NAME: buildTechnologySelectionArray 
      DESCRIPTION: function called to initially draw chart
      ARGUMENTS TAKEN: 
      ARGUMENTS RETURNED: none
      CALLED FROM: none
      CALLS:  none
*/
function buildTechnologySelectionArray(button) {
  event.stopPropagation()

  // localise HTML content of [de]selected technology
  var buttonPressed = d3.select(button)

  // if user has DESELECTED a field ...
  if (
    buttonPressed.classed('aleph-btn-unselected') &&
    aleph.sourceTechnologyArray.length < aleph.numberOfTechnologiesAllowed
  ) {
    // dynamically modify CSS class declarations attached to all technology selection buttons
    buttonPressed.classed('aleph-btn-unselected', !buttonPressed.classed('aleph-btn-unselected'))

    // dynamically modify CSS class declarations attached to user-selected technology selection buttons
    buttonPressed.classed('aleph-btn-selected', !buttonPressed.classed('aleph-btn-selected'))

    aleph.sourceTechnologyArray.push(CharacterToCharacter(button.id, '_', ' '))
    const filterIndex = aleph.sourceTechnologyArray.indexOf(CharacterToCharacter(button.id, '_', ' '))
  }
  // else if user has SELECTED a field
  else if (buttonPressed.classed('aleph-btn-selected')) {
    // dynamically modify CSS class declarations attached to all technology selection buttons
    buttonPressed.classed('aleph-btn-unselected', !buttonPressed.classed('aleph-btn-unselected'))

    // dynamically modify CSS class declarations attached to user-selected technology selection buttons
    buttonPressed.classed('aleph-btn-selected', !buttonPressed.classed('aleph-btn-selected'))

    const filterIndex = aleph.sourceTechnologyArray.indexOf(CharacterToCharacter(button.id, '_', ' '))
    if (filterIndex > -1) {
      aleph.sourceTechnologyArray.splice(filterIndex, 1)
    }
  } // end else if ...
  else if (aleph.sourceTechnologyArray.length == aleph.numberOfTechnologiesAllowed) {
    console.log('selections have reached maximum amount')
  }

  // if array of selected technologies is same as max. number of level allowed, modify class name attribution and styling
  if (aleph.sourceTechnologyArray.length == aleph.numberOfTechnologiesAllowed) {
    $('.aleph-technology-icon.aleph-btn-unselected').prop('disabled', true).addClass('aleph-disabled')
  } else {
    $('.aleph-technology-icon.aleph-btn-unselected').prop('disabled', false).removeClass('aleph-disabled')
  }

  // if array of selected technologies is same as max. number of level allowed, modofy class name attribution and styling
  if (aleph.sourceTechnologyArray.length == 0) {
    $('#aleph-submit')
      .prop('disabled', true)
      .addClass('aleph-disabled')
      .addClass('btn-danger')
      .removeClass('btn-success')
    $('#clear').prop('disabled', true).addClass('aleph-disabled')
  } else {
    $('#aleph-submit')
      .prop('disabled', false)
      .removeClass('aleph-disabled')
      .removeClass('btn-danger')
      .addClass('btn-success')
    $('#clear').prop('disabled', false).removeClass('aleph-disabled')
  }

  return
} // end function buildTechnologySelectionArray

/*
      NAME: changeViewStyle 
      DESCRIPTION: function to change chart style once drawn. Modifies node horizontal position and x axis display between being 
                    mapped to time axis and being mapped at equal-interval spacing across screen
      ARGUMENTS TAKEN: button - information on selected button 
      ARGUMENTS RETURNED: none
      CALLED FROM: index.html
      CALLS:  transitionChart
*/
function changeViewStyle(button) {
  // if user is chacing from x axis time view to stylised display
  if (button.value == 'x') {
    aleph.transitionType = 'byEquallySpaced'

    // hide x axis
    d3.selectAll('.axis.axis--x')
      .transition()
      .duration(aleph.transitionDuration)
      .ease(d3.easeLinear)
      .style('opacity', 0.0)

    // display display node year labels
    d3.selectAll('.aleph-nodeYearLabel')
      .transition()
      .duration(aleph.transitionDuration)
      .ease(d3.easeLinear)
      .style('opacity', 1.0)
  } else if (button.value == 'xTime') {
    aleph.transitionType = 'byTime'

    // display x axis
    d3.selectAll('.axis.axis--x')
      .transition()
      .duration(aleph.transitionDuration)
      .ease(d3.easeLinear)
      .style('opacity', 1.0)

    // hide display node year labels
    d3.selectAll('.aleph-nodeYearLabel')
      .transition()
      .duration(aleph.transitionDuration)
      .ease(d3.easeLinear)
      .style('opacity', 0.0)
  }
  // call function to update chart display
  transitionChart(button)

  return
} // end function changeViewStyle

/*
      NAME: transitionChart 
      DESCRIPTION: function called to action rrequired chart change and transition.
      ARGUMENTS TAKEN: none
      ARGUMENTS RETURNED: none
      CALLED FROM: changeViewStyle
      CALLS: none
*/
function transitionChart(button) {
  aleph.lateralPositionType = button.value

  // get curent value of x axis type
  aleph.chartWidth = aleph.windowWidth - aleph.margin.left - aleph.margin.right

  // transition all chart nodes to new horizontal position
  svg
    .selectAll('.node')
    .transition()
    .duration(aleph.transitionDuration)
    .ease(d3.easeLinear)
    .attr('transform', function (d) {
      if (aleph.xCoords.indexOf(d.x) == 0) {
        d.x2 = (aleph.chartWidth / (aleph.numVerticalHorizons - 1)) * aleph.xCoords.indexOf(d.x)
      } else if (aleph.xCoords.indexOf(d.x) == aleph.xCoords.length - 1) {
        d.x2 = (aleph.chartWidth / (aleph.numVerticalHorizons - 1)) * aleph.xCoords.indexOf(d.x) - sankey.nodeWidth()
      } else {
        d.x2 =
          (aleph.chartWidth / (aleph.numVerticalHorizons - 1)) * aleph.xCoords.indexOf(d.x) - sankey.nodeWidth() / 2
      }

      if (aleph.lateralPositionType == 'xTime') {
        return 'translate(' + aleph.x(parseDate(d['year'])) + ',' + d.y + ')'
      } else {
        return 'translate(' + d.x2 + ',' + d.y + ')'
      }
    })

  svg
    .selectAll('.aleph-nodeLabel')
    .attr('x', function (d) {
      for (var tech in technologies) {
        if (technologies[tech].technology == d.name) {
          return -10 - aleph.techIconImageSize
        }
      }
      return -10
    })
    .attr('text-anchor', 'end')
    .attr('transform', null)
    .text(function (d) {
      return d.name
    })
    .filter(function (d) {
      return d[aleph.lateralPositionType] < aleph.chartWidth / 2
    })
    .attr('x', function (d) {
      for (var tech in technologies) {
        if (technologies[tech].technology == d.name) {
          return sankey.nodeWidth() + 10 + aleph.techIconImageSize
        }
      }
      return sankey.nodeWidth() + 10
    })
    .attr('text-anchor', function (d, i) {
      return 'start'
    })

  // define transition type.
  aleph.transitionType = 'byEquallySpaced'
  var path = sankey.link()

  // add in the links
  svg
    .selectAll('.link')
    .transition()
    .duration(aleph.transitionDuration)
    .ease(d3.easeLinear)
    .attr('d', function (d, i) {
      if (d.level != 'level1' && d.source.sourceLinks.length != d.source.targetLinks.length) {
        d3.select(this).classed('aleph-areaLink', true)
        return VariableWidthSankeyLink(d, i)
      } else {
        return path(d)
      }
    })

  return
} // end function transitionChart

/*
    NAME: cursorCoords 
    DESCRIPTION: function called determine dynamically the current positioning of the cursor, and thus where to display toolip on event rectangle interaction
    ARGUMENTS TAKEN:  fid: information on selected event rectangle
    ARGUMENTS RETURNED: none
    CALLED FROM: mouse move interaction in submitSelection
    CALLS: wrapTooltipText
    USEFULL: // https://stackoverflow.com/questions/16770763/mouse-position-in-d3
*/
function cursorCoords(d, x, y) {

  var toolTipHeight = d3.selectAll('.aleph-hmiToolTip-Div#tooltipDiv').style('height').replace('px', '')

  // modify class definiton of tooltip 'g' element and current offset position based on mouse cursor position
  d3.selectAll('.aleph-hmiToolTip-Div')
    .classed('aleph-hide', false)
    .style('left', function () {
      if (x < aleph.chartWidth / 2) {
        return x + 15 + 'px' // left half
      } else {
        return x - aleph.toolTipDimensions.width - 45 + 'px' // right half
      }
    })
    .style('top', function () {
      if (y < aleph.windowHeight / 2) {
        return y + 15 + 'px'
      } else {
        return y - toolTipHeight - 30 + 'px'
      }
    })

  var techName = d.name
  var techYear = d.year
  var numChildren = d.sourceLinks.length
  var numParents = d.targetLinks.length
  var parents = ''
  var newTechnologyDetail = d.newTechnologyInformation

  d.targetLinks.forEach(function (d) {
    parents = parents + d.source.name + ', '
  })

  // get node children.
  var children = ''
  d.sourceLinks.forEach(function (d) {
    children = children + d.target.name + ', '
  })

  d3.selectAll('.aleph-hmiToolTipTitle-label').html(techName)
  d3.selectAll('.aleph-hmiToolTipSubTitle-label').html('<span>' + 'Year: ' + '</span>' + techYear)

  if (newTechnologyDetail == undefined) {
    d3.selectAll('.aleph-hmiToolNewTechnologyInformation-label').html(
      '<span></span>')
  } else {
    d3.selectAll('.aleph-hmiToolNewTechnologyInformation-label').html(
      '<span>' + 'New Technology Detail: ' + '</span>' + newTechnologyDetail
    ).classed("aleph-hide", false)
  }

  d3.selectAll('.aleph-hmiToolTipParents-label').html(
    '<span>' + 'Number of Parent Technologies: ' + '</span>' + numParents
  )
  d3.selectAll('.aleph-hmiToolTipParentsList-label').html(parents.substring(0, parents.length - 2))
  d3.selectAll('.aleph-hmiToolTipChildren-label').html('<span>' + 'Number of Children: ' + '</span>' + numChildren)
  d3.selectAll('.aleph-hmiToolTipChildrenListTitle-label').text(children.substring(0, children.length - 2))

  return
} // end function cursorCoords

/*
    NAME: wrapTooltipText 
    DESCRIPTION: function to wrap long lines to defined width. can be used for labels, strings, axis titles etc.
    ARGUMENTS TAKEN:  text
                      content_width
                      ttmargin
    ARGUMENTS RETURNED: none
    CALLED FROM: removeLinklines
    CALLS: none
*/
function wrapTooltipText(text, content_width, ttmargin) {
  text.each(function () {
    var text = d3.select(this),
      words = text.text().split(/\s+/).reverse(),
      word,
      line = [],
      lineNumber = 0,
      lineHeight = 15, // ems
      y = text.attr('y'),
      dy = 1,
      tspan = text.text(null).append('tspan').attr('x', ttmargin).attr('y', y).attr('dy', dy)

    while ((word = words.pop())) {
      line.push(word)

      tspan.text(line.join(' '))
      if (tspan.node().getComputedTextLength() > content_width) {
        line.pop()
        tspan.text(line.join(' '))
        line = [word]
        tspan = text
          .append('tspan')
          .attr('x', ttmargin)
          .attr('y', y)
          .attr('dy', ++lineNumber * lineHeight + dy)
          .text(word)

        vis.lineCount++
      }
    }
  })

  return
} // end function wrapTooltipText()

/*
    NAME: returnToTechSelector 
    DESCRIPTION: function called to return user back to intial onload view of proxy tech selector.
    ARGUMENTS TAKEN:  none
    ARGUMENTS RETURNED: none
    CALLED FROM: index.html
    CALLS: loadData
*/
function returnToTechSelector() {
  // display legend base. initialised url string.
  d3.selectAll('.aleph-legendBase').classed('aleph-hide', true)

  aleph.url = 'http://HMI-technologySelector.co.uk?'

  // construct url string
  aleph.sourceTechnologyArray.forEach(function (d) {
    aleph.url = aleph.url + d + '=true&'
  })

  // modify copyURL button styling and classes
  $('.btn.aleph-copyUrl').prop('disabled', false).removeClass('aleph-disabled')

  // modify submitUrl button styling and classes
  $('.btn.aleph-submitUrl').prop('disabled', false).removeClass('aleph-disabled')

  // modify DOM components button styling and classes
  d3.selectAll('.aleph-exampleTechSelector').classed('aleph-hide', false)
  d3.selectAll('.aleph-chart').classed('aleph-hide', true)
  d3.selectAll('.aleph-controls').classed('aleph-hide', true)

  // clear and reintiialsie selction arrays
  aleph.techConvergenceData = []
  aleph.sourceTechnologyArray = []
  aleph.targetTechnologyArray = []
  aleph.selectedTechnologyArray = []
  aleph.layerHistory = {}
  aleph.lateralPositionType = 'xTime'

  // grab references to all butttons.
  var buttons = d3.selectAll('.btn.aleph-technologyButton')._groups[0]

  // loop through all buttons modofiying label text for each one to initial styling and content.
  buttons.forEach(function (d) {
    if (d.innerText.indexOf('(') != -1) {
      var index = d.innerText.indexOf('(')
      d.innerText = d.innerText.slice(0, index)
    }
  })

  // modify styling and assigned classed of all tech buttons
  d3.selectAll('.aleph-technology-icon')
    .classed('aleph-btn-selected', false)
    .classed('aleph-btn-unselected', true)
    .classed('aleph-disabled', false)

  // remove base group eleement.
  d3.selectAll('.aleph-convergenceMap').remove()

  // reset view of URL text box.
  document.getElementById('aleph-url').value = ''
  document.getElementById('aleph-url').placeholder = 'Copy your URL here ...'

  // call function to load data (mimicing restarting of visual)
  loadData()

  return
} // end function returnToTechSelector

/*
    NAME: copyURL 
    DESCRIPTION: function called to copy built URL string to text box area
    ARGUMENTS TAKEN:  none
    ARGUMENTS RETURNED: none
    CALLED FROM: index.html
    CALLS: none
*/
function copyURL() {
  document.getElementById('aleph-url').value = aleph.url.slice(0, -1)
  $('.btn.aleph-technologyButton').prop('disabled', true).addClass('aleph-disabled').addClass('btn-danger')
  return
} // enf function copyURL

/*
    NAME: submitURL 
    DESCRIPTION: function called to submit built URL string to text box area
    ARGUMENTS TAKEN: none
    ARGUMENTS RETURNED: none
    CALLED FROM: index.html
    CALLS: submitSelection
*/
function submitURL() {
  // https://support.clickmeter.com/hc/en-us/articles/211032666-URL-parameters-How-to-pass-it-to-the-destination-URL#:~:text=Any%20word%20after%20the%20question,about%20passing%20parameter%20through%20URL.

  d3.selectAll('.aleph-exampleTechSelector').classed('aleph-hide', true)
  d3.selectAll('.aleph-chart').classed('aleph-hide', false)
  d3.selectAll('.aleph-controls').classed('aleph-hide', false)

  var url = document.getElementById('aleph-url').value
  url = url.replace('http://HMI-technologySelector.co.uk?', '').replace(':true', '')
  url = CharacterToCharacter(url, '=true', '')
  url = url.split('&')

  aleph.sourceTechnologyArray = url

  submitSelection()

  return
} // end function submitURL

/*
    NAME: darkMode 
    DESCRIPTION: function called to handle user drag moing of individual sankey node
    ARGUMENTS TAKEN: d
    ARGUMENTS RETURNED: none
    CALLED FROM: submitSelection
    CALLS: none
*/
function dragmove(d) {
  d3.selectAll('.aleph-hmiToolTip-g').classed('aleph-hide', true)

  if (aleph.xCoords.indexOf(d.x) == 0) {
    d.x2 = (aleph.chartWidth / (aleph.numVerticalHorizons - 1)) * aleph.xCoords.indexOf(d.x)
  } else if (aleph.xCoords.indexOf(d.x) == aleph.xCoords.length - 1) {
    d.x2 = (aleph.chartWidth / (aleph.numVerticalHorizons - 1)) * aleph.xCoords.indexOf(d.x) - sankey.nodeWidth()
  } else {
    d.x2 = (aleph.chartWidth / (aleph.numVerticalHorizons - 1)) * aleph.xCoords.indexOf(d.x) - sankey.nodeWidth() / 2
  }

  d3.select(this).attr('transform', function () {
    if (aleph.lateralPositionType == 'xTime') {
      return (
        'translate(' +
        aleph.x(parseDate(d['year'])) +
        ',' +
        (d.y = Math.max(0, Math.min(aleph.chartHeight - d.dy, d3.event.y))) +
        ')'
      )
    } else {
      return 'translate(' + d.x2 + ',' + (d.y = Math.max(0, Math.min(aleph.chartHeight - d.dy, d3.event.y))) + ')'
    }
  })

  sankey.relayout()
  link.attr('d', function (d, i) {
    if (d.level != 'level1' && d.source.sourceLinks.length != d.source.targetLinks.length) {
      d3.select(this).classed('aleph-areaLink', true)
      return VariableWidthSankeyLink(d, i)
    } else {
      return path(d)
    }
  })
}

/*
    NAME: expandTimeAxis 
    DESCRIPTION: function called to handling transitioning of x axis when time extend of all selected nodes is less than time extent of catalogue
    ARGUMENTS TAKEN: button
    ARGUMENTS RETURNED: none
    CALLED FROM: index.html
    CALLS: none
*/
function expandTimeAxis(button) {
  // if user has currently selected data extent to view chart by
  if (button.value == 'time') {
    button.value = 'data'
    d3.select('#aleph-expandTimeAxis').text('Expand Time Axis')

    // modify x axis limits
    aleph.x.domain([
      parseDate(aleph.dataMinYear - Number(aleph.timeLineAxisPadding)),
      parseDate(aleph.dataMaxYear + Number(aleph.timeLineAxisPadding)),
    ])

    // if user has currently selected time extent to view chart by
  } else {
    button.value = 'time'
    d3.select('#aleph-expandTimeAxis').text('Contract Time Axis')

    // modify x axis limits
    aleph.x.domain([
      parseDate(aleph.timeLineAxisMinYear - Number(aleph.timeLineAxisPadding)),
      parseDate(aleph.timeLineAxisMaxYear + Number(aleph.timeLineAxisPadding)),
    ])
  }

  aleph.lateralPositionType = 'xTime'

  // append g element to hold x time axis
  svg
    .selectAll('.axis.axis--x')
    .transition()
    .duration(aleph.transitionDuration)
    .ease(d3.easeLinear)
    .call(
      d3
        .axisTop(aleph.x)
        .ticks(d3.timeYear.every(5))
        .tickFormat(function (d, i) {
          if (i == 0) {
            return 'Now'
          } else {
            return 'In ' + (parseInt(formatDate(d)) - 2020) + ' years'
          }
        })
    )

  // select and remove x axis tick grid lines
  d3.selectAll('.xAxisTicks').remove()
  var xticks = d3.selectAll('.axis.axis--x').selectAll('.tick')

  // append new x axis tick grid lines
  xticks
    .append('svg:line')
    .attr('class', 'xAxisTicks')
    .attr('y0', 0)
    .attr('y1', aleph.chartHeight + aleph.margin.top)
    .attr('x1', 0)
    .attr('x2', 0)

  svg
    .selectAll('.node')
    .transition()
    .duration(aleph.transitionDuration)
    .ease(d3.easeLinear)
    .attr('transform', function (d) {
      return 'translate(' + aleph.x(parseDate(d['year'])) + ',' + d.y + ')'
    })

  // update transition type value
  aleph.transitionType = 'byTime'
  var path = sankey.link()

  // transition the links
  svg
    .selectAll('.link')
    .transition()
    .duration(aleph.transitionDuration)
    .ease(d3.easeLinear)
    .attr('d', function (d, i) {
      if (d.level != 'level1' && d.source.sourceLinks.length != d.source.targetLinks.length) {
        d3.select(this).classed('aleph-areaLink', true)
        return VariableWidthSankeyLink(d, i)
      } else {
        return path(d)
      }
    })
  /* .attr("d", path) */

  // transition the axis
  d3.selectAll('.axis.axis--x')
    .transition()
    .duration(aleph.transitionDuration)
    .ease(d3.easeLinear)
    .style('opacity', 1.0)

  // transition the nodeYearLabels
  d3.selectAll('.aleph-nodeYearLabel')
    .transition()
    .duration(aleph.transitionDuration)
    .ease(d3.easeLinear)
    .style('opacity', 0.0)

  return
} // end function expandTimeAxis

// D3 Sankey Link with Variable Width
//borrowed from sankey.js, draws one a line from top of source to top of target, top of target to bottom of target, bottom of target to bottom of source, bottom of source to top of source
//http://bl.ocks.org/chriswhong/dd794c5ca90769602066
function VariableWidthSankeyLink(d, i) {
  d3.select('#markerCircle').remove()

  var numberSourceLinks = d.source.sourceLinks.length
  if (numberSourceLinks > 1) {
    if (d.BUILD_SPECIFIC_UID != aleph.lastBUILD_SPECIFIC_UID) {
      aleph.linkCounter++
    } else {
      aleph.linkCounter = 0
    }

    linkUnitHeight = d.source.dy / numberSourceLinks
  } else {
    linkUnitHeight = d.source.dy
  }

  var curvature = 0.5
  d3.selectAll('.marker').remove()

  if (aleph.lateralPositionType == 'x') {
    if (aleph.xCoords.indexOf(d.source[aleph.lateralPositionType]) == 0) {
      d.source.x2 =
        (aleph.chartWidth / (aleph.numVerticalHorizons - 1)) *
        aleph.xCoords.indexOf(d.source[aleph.lateralPositionType])
    } else if (aleph.xCoords.indexOf(d.source[aleph.lateralPositionType]) == aleph.xCoords.length - 1) {
      d.source.x2 =
        (aleph.chartWidth / (aleph.numVerticalHorizons - 1)) *
          aleph.xCoords.indexOf(d.source[aleph.lateralPositionType]) -
        sankey.nodeWidth()
    } else {
      d.source.x2 =
        (aleph.chartWidth / (aleph.numVerticalHorizons - 1)) *
          aleph.xCoords.indexOf(d.source[aleph.lateralPositionType]) -
        sankey.nodeWidth() / 2
    }

    if (aleph.xCoords.indexOf(d.target[aleph.lateralPositionType]) == 0) {
      d.target.x2 =
        (aleph.chartWidth / (aleph.numVerticalHorizons - 1)) *
        aleph.xCoords.indexOf(d.target[aleph.lateralPositionType])
    } else if (aleph.xCoords.indexOf(d.target[aleph.lateralPositionType]) == aleph.xCoords.length - 1) {
      d.target.x2 =
        (aleph.chartWidth / (aleph.numVerticalHorizons - 1)) *
          aleph.xCoords.indexOf(d.target[aleph.lateralPositionType]) -
        sankey.nodeWidth()
    } else {
      d.target.x2 =
        (aleph.chartWidth / (aleph.numVerticalHorizons - 1)) *
          aleph.xCoords.indexOf(d.target[aleph.lateralPositionType]) -
        sankey.nodeWidth() / 2
    }

    var x0 = d.source.x2 + d.source.dx,
      x1 = d.target.x2,
      /* var */ xi = d3.interpolateNumber(x0, x1),
      x2 = xi(curvature),
      x3 = xi(1 - curvature),
      y0 = d.source.y + d.sy /*  + d.dy / 2 */,
      y1 = d.target.y + d.ty /*  + d.dy / 2 */

    return (
      'M' +
      x0 +
      ',' +
      y0 +
      'C' +
      x2 +
      ',' +
      y0 +
      ' ' +
      x3 +
      ',' +
      y1 +
      ' ' +
      x1 +
      ',' +
      y1 +
      'L' +
      x1 +
      ',' +
      (y1 + d.target.dy / d.target.targetLinks.length) +
      'C' +
      x3 +
      ',' +
      (y1 + d.target.dy / d.target.targetLinks.length) +
      ' ' +
      x2 +
      ',' +
      (y0 + /* (aleph.linkCounter*linkUnitHeight)+ */ /* d.source.dy */ linkUnitHeight) +
      ' ' +
      x0 +
      ',' +
      (y0 + /* (aleph.linkCounter*linkUnitHeight)+ */ /* d.source.dy */ linkUnitHeight) +
      'L' +
      x0 +
      ',' +
      y0
    )
  } else if (aleph.lateralPositionType == 'xTime') {
    var x0 = aleph.x(parseDate(d.source.year)) + d.source.dx,
      x1 = aleph.x(parseDate(d.target.year)),
      xi = d3.interpolateNumber(x0, x1),
      x2 = xi(curvature),
      x3 = xi(1 - curvature),
      y0 = d.source.y + d.sy /*  + d.dy / 2 */,
      y1 = d.target.y + d.ty /*  + d.dy / 2 */

    aleph.lastBUILD_SPECIFIC_UID = d.BUILD_SPECIFIC_UID
    aleph.LCTU = aleph.linkCounter
    aleph.linkCounter = 0

    return (
      'M' +
      x0 +
      ',' +
      (y0 + aleph.linkCounter * linkUnitHeight) +
      'C' +
      x2 +
      ',' +
      y0 +
      ' ' +
      x3 +
      ',' +
      y1 +
      ' ' +
      x1 +
      ',' +
      y1 +
      'L' +
      x1 +
      ',' +
      (y1 + d.target.dy / d.target.targetLinks.length) +
      'C' +
      x3 +
      ',' +
      (y1 + d.target.dy) +
      ' ' +
      x2 +
      ',' +
      (y0 + aleph.linkCounter * linkUnitHeight + /* d.source.dy */ linkUnitHeight) +
      ' ' +
      x0 +
      ',' +
      (y0 /*  + (aleph.linkCounter*linkUnitHeight) */ + /* d.source.dy */ linkUnitHeight) +
      'L' +
      x0 +
      ',' +
      y0
    )
  }
} // end function sankey.link

function reset(button) {
  aleph.sourceTechnologyArray = []

  d3.selectAll('.aleph-technology-icon').classed('aleph-btn-selected', false).classed('aleph-btn-unselected', true)

  return
} // end function reset
