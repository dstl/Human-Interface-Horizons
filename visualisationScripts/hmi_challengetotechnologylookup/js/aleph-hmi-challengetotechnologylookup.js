/*
  Project: HMI Challenge to Technology lookup visualisation
  Filename: aleph-challengetotechnologylookup.js
  Date built: October 2020 to January 2021
  Written By: James Bayliss (Data Vis Developer)
  Tech Stack: HTML5, CSS3, JS ES5/6, D3 (v5), JQuery 
*/

/* 

USEFUL LINKS:
https://bl.ocks.org/d3noob/06e72deea99e7b4859841f305f63ba85
http://bl.ocks.org/tomshanley/11097618
https://bl.ocks.org/wvengen/cab9b01816490edb7083

*/

var technologies_new = {}
var technologies = {}

var challenges = {
  '1_1': {
    family: '1. Collaboration with varied actors (state/nonstate/corporate/NGOs)',
    challenge:
      'Provide mission planning and logistical/engineering aid to Non-Governmental Organisations (NGOs) and states.',
  },
  '1_2': {
    family: '1. Collaboration with varied actors (state/nonstate/corporate/NGOs)',
    challenge: 'Provide security support to Non-Governmental Organisations (NGOs) and states.',
  },
  '1_3': {
    family: '1. Collaboration with varied actors (state/nonstate/corporate/NGOs)',
    challenge: 'Provide lift/heavy lift to Non-Governmental Organisations (NGOs) and states.',
  },
  '1_4': {
    family: '1. Collaboration with varied actors (state/nonstate/corporate/NGOs)',
    challenge:
      'Cooperation with city authorities will be an increasing part of urban operations, potentially spanning policing, combat and humanitarian response.',
  },
  '1_5': {
    family: '1. Collaboration with varied actors (state/nonstate/corporate/NGOs)',
    challenge:
      'Countering weaponised disease/genetic/pathogen weapons will present as a biological challenge, but will probably find expression as a social challenge requiring extensive collaboration with civilian authorities.',
  },
  '1_6': {
    family: '1. Collaboration with varied actors (state/nonstate/corporate/NGOs)',
    challenge:
      'Interoperability and collaboration with other militaries (recognised state, non-state and possibly even corporate/private).',
  },
  '1_7': {
    family: '1. Collaboration with varied actors (state/nonstate/corporate/NGOs)',
    challenge:
      'Need for "Expansive Sharing". It will be important to be open to sourcing information outside traditional sources and from novel collaborations outside the norm as part of collaborative action. This may challenge the normative understanding of information security.',
  },
  '1_8': {
    family: '1. Collaboration with varied actors (state/nonstate/corporate/NGOs)',
    challenge: '"Mass operations" - both mass evacuation and guiding deployment of mass manpower.',
  },
  '1_9': {
    family: '1. Collaboration with varied actors (state/nonstate/corporate/NGOs)',
    challenge:
      'Space as a domain of operation will require significant collaboration and interaction with both states and corporations.',
  },
  '2_1': {
    family: '2. Interacting with automation and autonomy',
    challenge: 'Creating mass effect through control of large numbers of automated/autonomous vehicles.',
  },
  '2_2': {
    family: '2. Interacting with automation and autonomy',
    challenge: 'Integration of sensor to shooter systems for high-tempo operations.',
  },
  '2_3': {
    family: '2. Interacting with automation and autonomy',
    challenge:
      'Understanding and operating within complex evolving Rules of Engagement (ROE)/legal/social/political context surrounding use of automated and autonomous systems.',
  },
  '2_4': {
    family: '2. Interacting with automation and autonomy',
    challenge: 'Operation of long range or super-long range weapons systems or smart/dwell munitions.',
  },
  '2_5': {
    family: '2. Interacting with automation and autonomy',
    challenge:
      'Countering proliferation of Chemical/Biological/Radiological/Nuclear (CBRN) threats (this implicates greater use of robotics/unmanned vehicles etc).',
  },
  '2_6': {
    family: '2. Interacting with automation and autonomy',
    challenge: 'Replacement of humans in platforms that have previous been human operated.',
  },
  '3_1': {
    family: '3. Operate in complex, cluttered and contested environments',
    challenge: 'Increasing general complexity of land environment (complex/cluttered/contested).',
  },
  '3_2': {
    family: '3. Operate in complex, cluttered and contested environments',
    challenge: 'Operations in complex future cities (unplanned development considerations).',
  },
  '3_3': {
    family: '3. Operate in complex, cluttered and contested environments',
    challenge: 'Operations in complex future cities ("megacity" considerations).',
  },
  '3_4': {
    family: '3. Operate in complex, cluttered and contested environments',
    challenge: 'Littoral operations carried out in complex contested spaces.',
  },
  '3_5': {
    family: '3. Operate in complex, cluttered and contested environments',
    challenge:
      'Foreseeable need for future space operations (includes both deconfliction and also management of orbital capacity/bandwidth).',
  },
  '4_1': {
    family: '4. Operation of novel equipment',
    challenge:
      'Additive manufacture is seen as a key enabler allowing the military to provide local and adaptable (even personalised) manufacture in-theatre reducing pressure on lines of supply.',
  },
  '4_2': {
    family: '4. Operation of novel equipment',
    challenge: 'Local, portable and sovereign power generation and power storage technologies deployable in-theatre.',
  },
  '4_3': {
    family: '4. Operation of novel equipment',
    challenge:
      'Operating of human augmentation: Physical (e.g., exo-skeletons), Cognitive (e.g., brain interfaces), Sensory (e.g., sensory prosthesis), Drugs.',
  },
  '4_4': {
    family: '4. Operation of novel equipment',
    challenge: 'Operation of single or limited number of drones (e.g., to offer surveillance for infantry units).',
  },
  '4_5': {
    family: '4. Operation of novel equipment',
    challenge: 'Interfaces for cyber operations (deterrence and/or attack).',
  },
  '4_6': {
    family: '4. Operation of novel equipment',
    challenge: 'Operation of direct energy weapons.',
  },
  '4_7': {
    family: '4. Operation of novel equipment',
    challenge: 'Operation of electromagnetic rail guns.',
  },
  '4_8': {
    family: '4. Operation of novel equipment',
    challenge: 'Operation of novel Radio Frequency/Microwave (RF/MW) emitters (non-lethal anti-personnel suppression).',
  },
  '4_9': {
    family: '4. Operation of novel equipment',
    challenge: 'Consequences of advanced materials (lower weight, stealth and/or self repairing).',
  },
  '5_1': {
    family: '5. Processing significant streams of surveillance/intelligence/data and understanding complex systems',
    challenge: 'Analysis and predictive modelling of social behaviour for operations.',
  },
  '5_2': {
    family: '5. Processing significant streams of surveillance/intelligence/data and understanding complex systems',
    challenge:
      'Working with the outputs of automated anomaly detection (this could vary from computer processing of reconnaissance data through to real-time processing of video data).',
  },
  '5_3': {
    family: '5. Processing significant streams of surveillance/intelligence/data and understanding complex systems',
    challenge: 'Dealing with the actionable outputs of big data analytics techniques in general.',
  },
  '5_4': {
    family: '5. Processing significant streams of surveillance/intelligence/data and understanding complex systems',
    challenge:
      'Integrating large amounts of intelligence generated from digital systems (e.g., Internet, internet-of-things, telemetry, etc).',
  },
  '5_5': {
    family: '5. Processing significant streams of surveillance/intelligence/data and understanding complex systems',
    challenge: 'Making use of ubiquitous surveillance data (e.g., from space).',
  },
  '5_6': {
    family: '5. Processing significant streams of surveillance/intelligence/data and understanding complex systems',
    challenge: 'Maintaining cyber situation awareness.',
  },
  '5_7': {
    family: '5. Processing significant streams of surveillance/intelligence/data and understanding complex systems',
    challenge: 'Monitoring and understanding the consequences of biological/pathogen/genetic weapons.',
  },
  '5_8': {
    family: '5. Processing significant streams of surveillance/intelligence/data and understanding complex systems',
    challenge: 'Counter exploitation of social media and fake news in the operational context.',
  },
  '5_9': {
    family: '5. Processing significant streams of surveillance/intelligence/data and understanding complex systems',
    challenge:
      'Understanding how to operate in areas of legal dispute, constant surveillance, complex Rules of Engagement (ROE) and "lawfare".',
  },
  '5_10': {
    family: '5. Processing significant streams of surveillance/intelligence/data and understanding complex systems',
    challenge:
      'Understanding the consequences of networks (conceptual; we live in what is fundamentally a more complex networked world - the link between actions and effects is no longer simple, proportional or tightly coupled).',
  },
  '6_1': {
    family: '6. Knowledge management and provision of high quality training and education',
    challenge: 'Acquisition of technical skills for cyber operations.',
  },
  '6_2': {
    family: '6. Knowledge management and provision of high quality training and education',
    challenge:
      'Acquisition of technical skills beyond "consumer" grade (e.g., programming, "deep dive" knowledge of adaptable technical systems).',
  },
  '6_3': {
    family: '6. Knowledge management and provision of high quality training and education',
    challenge: 'Acquisition of cultural and language skills for challenging and complex overseas environments.',
  },
  '6_4': {
    family: '6. Knowledge management and provision of high quality training and education',
    challenge: 'Rapid and high volume military education in a reconstitution scenario.',
  },
  '6_5': {
    family: '6. Knowledge management and provision of high quality training and education',
    challenge: 'Training (cyber - user level/insider threat prevention).',
  },
  '6_6': {
    family: '6. Knowledge management and provision of high quality training and education',
    challenge:
      'Need for reconstitution of capability places a premium on methods for knowledge management and preservation. This includes both technical, doctrinal but also potentially cultural knowledge. This confers both capability for reconstitution but also therefore contributes to institutional resilience.',
  },
  '6_7': {
    family: '6. Knowledge management and provision of high quality training and education',
    challenge: 'Skill-fade owing to lack of opportunity to use skills',
  },
  '6_8': {
    family: '6. Knowledge management and provision of high quality training and education',
    challenge:
      'Need to improvise with existing equipment for humanitarian tasks or unforeseen circumstances (training for flexibility and innovation).',
  },
  '7_1': {
    family: "7. Active challenges from 'red'",
    challenge: 'Countering the "killbot" scenario - can this be done without matching?',
  },
  '7_2': {
    family: "7. Active challenges from 'red'",
    challenge: 'More contested electronic and electromagnetic warfare space (passive and active).',
  },
  '7_3': {
    family: "7. Active challenges from 'red'",
    challenge: 'Countering increasingly ambiguous means used by red actors where attribution remains elusive.',
  },
  '7_4': {
    family: "7. Active challenges from 'red'",
    challenge: 'Countering cyberattack (hacking) and attacks on cyber infrastructure.',
  },
  '7_5': {
    family: "7. Active challenges from 'red'",
    challenge:
      'Consumer-Off-The-Shelf (COTS) - Red actors, particularly those outside nation state level, will have access to increasingly sophisticated COTS equipment that will deliver capability that we have not traditionally credited such actors with (e.g., command and control, surveillance, drones etc). They are likely to be able to integrate new equipment more rapidly than ourselves owing to lack of process, bureaucracy and ethical/legal concerns.',
  },
  '7_6': {
    family: "7. Active challenges from 'red'",
    challenge:
      'Technological progress (and industrial espionage/hacking) lower the bar to weapons development for red in general. A technological edge can be assumed on the basis of past investment - the "power gap" may well erode.',
  },
}

// Initialisation of global 'aleph' object construct. Stores all main dynamic variables for UI design and response
var aleph = {
  url: 'http://HMI-technologySelector.co.uk?',
  margin: {
    top: 25,
    right: 250,
    bottom: 100,
    left: 275,
    axis: -25,
    arrow: 100,
    arrowLeft: 0,
    arrowRight: 0,
  },
  numberOfLevels: 1,
  challengeToTechnologyData: [],
  sourceTechnologyArray: [],
  filteredData: [],
  sourceNodes: [],
  targetNodes: [],
  leftNodeOrder: [],
  rightNodeOrder: [],
  nodeClicked: '',
  layerHistory: {},
  timeLineAxisMinYear: 9999,
  timeLineAxisMaxYear: -9999,
  dataMinYear: 9999,
  dataMaxYear: -9999,
  timeLineAxisPadding: 0,
  transitionDuration: 1250,
  toggleValue: 'source',
  sortToggleValue: 'count',
  onload: true,
  dataWeighting: 'binary',
  toolTipDimensions: {
    /* dimension and positioning attributes for tooltip */ width: 450,
    height: 300,
    verticalLabelSpacing: 50 /* vertical spacing between text lines */,
    margin: { top: 100, right: 10, bottom: 10, left: 25 },
    informationArray: [] /* blank array to contain information extracted from ingested data file to display on tooltip */,
  },
  submitted: false,
  transitionType: 1,
  techIconImageSize: 50,
  thresholdHigh: 8,
  thresholdLow: 1,
  challengeNodeCount: 0,
  technologyNodeCount: 0,
  persistentLinks: false,
}

var link // global variable for D3 link
var node
var svg // global variable for svg base DOM element
var sankey // global variable for D3 Snkey structure
var path // global variable for D3 path component
var parseDate = d3.timeParse('%Y') // time format parser - currently set up to read in integer years (e.g. 2020, 2017). No month or date/day definition
var isScrolling

// define colour ramp for sankey nodes
var color = [
  '#14022e' /* midnight purple */,
  '#7b67a8',
  '#36bcee',
  '#2eb5b2',
  '#62bf95' /* ADDED TO MAKE NECESSARY NUMBER */,
  '#96c978',
  '#c9d35b' /* ADDED TO MAKE NECESSARY NUMBER */,
  '#fddd3e',
  '#ef7835',
  '#ce2256' /* rose red */,
]

alertSize() // function call to get current browser window dimensions

// store window dimensions as aleph object varaiables
aleph.windowWidth = vis.width
aleph.windowHeight = vis.height

// defintion onf D3 tooltip
aleph.tooltip = d3
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
  .attr('class', 'aleph-hmiToolTipSubTitle-label')
  .style('position', 'relative')
  .style('left', 10 + 'px')
  .style('display', 'block')
  .text('Test Sub-title Text')

d3.selectAll('.aleph-hmiToolTip-Div')
  .append('label')
  .attr('class', 'aleph-hmiToolTipNumber-label')
  .style('position', 'relative')
  .style('left', 10 + 'px')
  .style('display', 'block')
  .text('Test Number Text')

d3.selectAll('.aleph-hmiToolTip-Div')
  .append('label')
  .attr('class', 'aleph-hmiToolTipListTitle-label')
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
filter.append('feGaussianBlur').attr('in', 'SourceAlpha').attr('stdDeviation', 5).attr('result', 'blur')

// translate output of Gaussian blur to the right and downwards with 2px
// store result in offsetBlur
filter.append('feOffset').attr('in', 'blur').attr('dx', 5).attr('dy', 5).attr('result', 'offsetBlur')

// overlay original SourceGraphic over translated blurred opacity by using
// feMerge filter. Order of specifying inputs is important!
var feMerge = filter.append('feMerge')
feMerge.append('feMergeNode').attr('in', 'offsetBlur')
feMerge.append('feMergeNode').attr('in', 'SourceGraphic')

// call to functions to handle onclick user action on control open/close icon/bakcground
d3.selectAll('.aleph-controls').on('click', function () {
  // if user opens controls ...
  if (d3.selectAll('.aleph-controls').classed('aleph-closeControls')) {
    d3.selectAll('.aleph-controls').classed('aleph-closeControls', false).classed('aleph-openControls', true)

    // else if user closes controls ...
  } else {
    d3.selectAll('.aleph-controls').classed('aleph-closeControls', true).classed('aleph-openControls', false)
  }

  // bring control panel to front
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
  d3.selectAll('.aleph-container').style(
    'width',
    aleph.windowWidth + 'px'
  ) /* 
    .style("height", aleph.windowHeight + "px") */

  // update dimensions of base container SVG panel to size of browser window
  d3.selectAll('.aleph-chart').attr('width', aleph.windowWidth).attr('height', aleph.windowHeight)

  d3.selectAll('.aleph-container')
    .append('div')
    .attr('class', 'aleph-bannerBase aleph-hide')
    .style('width', aleph.windowWidth + 'px')
    // .style("top", 0 + "px")
    .style('height', 200 + 'px')
    .style('background-color', 'none')
    .style('position', 'fixed')

  d3.selectAll('.aleph-bannerBase')
    .append('svg')
    .attr('class', 'aleph-bannerSVGBase')
    .attr('width', aleph.windowWidth)
    .attr('height', 200)
    .attr('y', -50)
    .style('background-color', 'none')

  d3.selectAll('.aleph-bannerSVGBase')
    .append('rect')
    .attr('class', 'aleph-bannerSVGBase-rect')
    .attr('width', aleph.windowWidth)
    .attr('height', 200)

  return
} // end function onload

/*
      NAME: windowResize 
      DESCRIPTION: function called when user resizes window. handles updating of content reliant on dimension of window
      ARGUMENTS TAKEN: none
      ARGUMENTS RETURNED: none
      CALLED FROM: none
      CALLS:  none
  
      http://bl.ocks.org/johangithub/97a186c551e7f6587878
  */
function windowResize() {
  if (aleph.sourceTechnologyArray[0] === undefined) {
    return
  }

  alertSize() // function call to get current browser window dimensions

  // store window dimensions as aleph object varaiables
  aleph.windowWidth = vis.width
  aleph.windowHeight = vis.height

  // update dimensions of base container DIV to size of browser window
  d3.selectAll('.aleph-container')
    .style('width', aleph.windowWidth + 'px')
    .style('height', aleph.windowHeight + 'px')

  // update dimensions of base container SVG panel to size of browser window
  d3.selectAll('.aleph-chart').attr('width', aleph.windowWidth).attr('height', aleph.windowHeight)

  // recalculate width of chart timelines based on browser window width and defined margins.
  d3.selectAll('.aleph-bannerBase').style('width', aleph.windowWidth + 'px')
  d3.selectAll('.aleph-bannerSVGBase').attr('width', aleph.windowWidth)
  d3.selectAll('.aleph-bannerSVGBase-rect').attr('width', aleph.windowWidth)

  d3.select('#binary').attr('x', aleph.windowWidth / 2 - 350)
  d3.select('#weighted').attr('x', aleph.windowWidth / 2 - 0)

  d3.selectAll('.aleph-mainTitle').attr('x', aleph.windowWidth / 2)
  d3.selectAll('.aleph-sortButton-group-base').attr(
    'transform',
    'translate(' + aleph.windowWidth / 2 + ',' + aleph.margin.top / 2 + ')'
  )

  d3.selectAll('.aleph-arrow-group.aleph-arrow-group-left.source').attr(
    'transform',
    'translate(' + aleph.margin.left + ',' + aleph.margin.arrow + ')'
  )

  d3.selectAll('.aleph-arrow-group.aleph-arrow-group-right.target').attr(
    'transform',
    'translate(' + (aleph.windowWidth - aleph.margin.right) + ',' + aleph.margin.arrow + ')'
  )

  setSliderTicks('#slider-range')

  // remove chart group element to allow redraw
  d3.selectAll('.aleph-chart-g').remove()

  // call function to submit form selections to create visual
  submitSelection()

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
    var inputDataFile = `${rootPath}data/challenge-to-technology.csv`
    var inputTechnologyCatalogueFile = `${rootPath}data/technologies.csv`

    // store all input files as a Promise
    Promise.all([d3.csv(inputDataFile), d3.csv(inputTechnologyCatalogueFile)]).then(function (data) {
      // locally store data
      challengeToTechnology = data[0]
      technologiesFile = data[1]
      aleph.challengeToTechnologyData = challengeToTechnology

      technologiesFile.forEach(function (d, i) {
        var JSONelement = { technology: d.title, slug: d.slug }
        technologies_new[Number(i + 1)] = JSONelement
      })
      console.log('technologiesFile:', technologiesFile)
      console.log('technologies_new:', technologies_new)
      technologies = technologies_new

      resolve(aleph.challengeToTechnologyData)
    }) // end promsie data load
  })
}

/*ion
      NAME: submitSelection 
      DESCRIPTION: function called to initially draw chart
      ARGUMENTS TAKEN: techTaxonomy
      ARGUMENTS RETURNED: none
      CALLED FROM: none
      CALLS:  none
  */
function submitSelection() {
  if (aleph.sourceTechnologyArray[0] === undefined) {
    return
  }

  d3.selectAll('.aleph-slideRangeContainer').classed('aleph-hide', false)
  // d3.selectAll(".aleph-nodeCount").remove();

  // modify classnames of relevant DOM components
  // remove chart group element to allow redraw
  d3.selectAll('.aleph-exampleTechSelector').classed('aleph-hide', true)
  d3.selectAll('.aleph-chart').classed('aleph-hide', false)
  d3.selectAll('.aleph-controls').classed('aleph-hide', false)
  d3.selectAll('.aleph-bannerBase').classed('aleph-hide', false)

  // recalculate chat width and height
  aleph.chartWidth = aleph.windowWidth - aleph.margin.left - aleph.margin.right
  aleph.chartHeight = aleph.windowHeight - aleph.margin.top - aleph.margin.bottom

  // Set the sankey diagram properties
  sankey = d3.sankey().nodeWidth(36).nodePadding(40).size([aleph.chartWidth, 1750])

  path = sankey.link()

  aleph.filteredData = aleph.challengeToTechnologyData.filter(function (d) {
    if (
      aleph.sourceNodes.indexOf(d.COGNITIVE_CHALLENGE_NUMBER.replace('.', '_')) == -1 &&
      d['COGNITIVE_CHALLENGE_FAMILY_NUMBER'] == aleph.sourceTechnologyArray[0]
    ) {
      aleph.sourceNodes.push(d.COGNITIVE_CHALLENGE_NUMBER.replace('.', '_'))
    }
    return d['COGNITIVE_CHALLENGE_FAMILY_NUMBER'] == aleph.sourceTechnologyArray[0]
  })

  // locally store data
  var dataTopCheckContentOf = aleph.filteredData.filter(function (d) {
    return d[aleph.dataWeighting] != 0 && d['weighted'] >= aleph.thresholdLow && d['weighted'] <= aleph.thresholdHigh
  })

  // check to see if there is any data to plot a chart from; if so, continue, if not, modify display momentarily to alert user this si so, and reset to previous version
  if (dataTopCheckContentOf.length > 0) {
    data = dataTopCheckContentOf
    d3.selectAll('.aleph-nodeCount.noDataToChart').classed('aleph-hide', true)
  } else {
    d3.selectAll('.aleph-nodeCount.noDataToChart').classed('aleph-hide', false)
    d3.selectAll('.hideShow')
      .transition()
      .duration(500)
      .ease(d3.easeLinear)
      .style('opacity', 0.05)
      .transition()
      .delay(2500)
      .duration(2500)
      .ease(d3.easeLinear)
      .style('opacity', 1.0)

    // use set timeout to reset slider range handles to previous values
    setTimeout(function () {
      // Setter
      $('#slider-range').slider('option', 'values', aleph.previousSliderRange)
      d3.selectAll('.aleph-nodeCount.noDataToChart').classed('aleph-hide', true)
    }, 3500)

    return
  }

  // if newest requested chart is polttable, update previous slsider range value to current slider range value.
  aleph.previousSliderRange = aleph.currentSliderRange

  d3.selectAll('.aleph-chart-g').remove()
  d3.selectAll('.aleph-nodeCount').remove()
  // append the svg object to the body of the page
  // appends a 'group' element to 'svg'
  // moves the 'group' element to the top left margin
  svg = d3.select('#aleph-chart').attr('width', aleph.windowWidth).attr('height', /* aleph.windowHeight */ 2000)

  // append the svg object to the body of the page
  svg = d3
    .selectAll('.aleph-chart')
    .append('g')
    .attr('class', 'aleph-chart-g hideShow')
    .attr('transform', 'translate(' + aleph.margin.left + ',' + aleph.margin.top * 2 + ')')
  //set up graph in same style as original example but empty
  graph = { nodes: [], links: [] }

  aleph.challengeNodeCount = 0
  aleph.technologyNodeCount = 0

  // loop trhough data JSON object, constructing grahph.nodes and links components
  data.forEach(function (d, i) {
    graph.nodes.push({
      GLOBAL_UID: d.GLOBAL_UID,
      CCF_UID: d.CCF_UID,
      name: d.COGNITIVE_CHALLENGE,
      number: d.COGNITIVE_CHALLENGE_NUMBER,
      index: i,
      family: d.COGNITIVE_CHALLENGE_FAMILY,
      familyNumber: d.COGNITIVE_CHALLENGE_FAMILY_NUMBER,
    })
    graph.nodes.push({
      GLOBAL_UID: d.GLOBAL_UID,
      CCF_UID: d.CCF_UID,
      name: d.TECHNOLOGY,
      number: d.TECHNOLOGY_NUMBER,
      index: i,
      family: d.COGNITIVE_CHALLENGE_FAMILY,
      familyNumber: d.COGNITIVE_CHALLENGE_FAMILY_NUMBER,
    })
    graph.links.push({
      GLOBAL_UID: d.GLOBAL_UID,
      CCF_UID: d.CCF_UID,
      source: d.COGNITIVE_CHALLENGE_NUMBER,
      target: d.TECHNOLOGY_NUMBER,
      binary: +d.binary,
      weighted: +d.weighted,
      family: d.COGNITIVE_CHALLENGE_FAMILY,
      familyNumber: d.COGNITIVE_CHALLENGE_FAMILY_NUMBER,
      challenge: d.COGNITIVE_CHALLENGE,
      number: d.COGNITIVE_CHALLENGE_NUMBER,
    })
    graph.links[i].value = graph.links[i][aleph.dataWeighting]
  }) // end forEach

  // return only the distinct / unique nodes
  graph.nodes = d3.keys(
    d3
      .nest()
      .key(function (d) {
        return d.number
      })
      .object(graph.nodes)
  )

  // loop through each link replacing the text with its index from node
  graph.links.forEach(function (d, i) {
    graph.links[i].source = graph.nodes.indexOf(graph.links[i].source)
    graph.links[i].target = graph.nodes.indexOf(graph.links[i].target)
  })

  // now loop through each nodes to make nodes an array of objects
  // rather than an array of strings
  graph.nodes.forEach(function (d, i) {
    graph.nodes[i] = { name: d.replace('.', '_'), index: i }
  })

  // generate Saney object
  sankey.nodes(graph.nodes).links(graph.links).layout(32)

  // add in the links
  link = svg
    .append('g')
    .attr('class', 'aleph-link-group')
    .selectAll('.link')
    .data(graph.links)
    .enter()
    .append('path')
    .attr('class', function (d) {
      return (
        'link aleph-link link-source-' +
        CharacterToCharacter(d.source.name, '.', '_') +
        ' link-target-' +
        CharacterToCharacter(d.target.name, '.', '_') +
        ' link-family-' +
        CharacterToCharacter(d.family, ' ', '_')
      )
    })
    .attr('d', path)
    .style('stroke', function (d) {
      if (aleph.sourceNodes.indexOf(d.number.replace('.', '_')) != -1) {
        return color[aleph.leftNodeOrder.indexOf(d.number.replace('.', '_'))]
      } else {
        return color[aleph.leftNodeOrder.indexOf(d.number.replace('.', '_'))]
      }
    })
    .style('stroke-width', function (d) {
      return Math.max(1, d.dy)
    })
    .on('mouseover', function (d) {
      // hide all links and nodes ...
      d3.selectAll('.link').classed('aleph-hide', true)
      d3.selectAll('.node').classed('aleph-hide', true)

      // if user is basing link selction on having SOURCE nodes as the parent/starting point ,
      if (aleph.toggleValue == 'source') {
        d3.selectAll('.link.link-source-' + d.source.name).classed('aleph-hide', false)
        d3.selectAll('.node.source-' + d.source.name).classed('aleph-hide', false)
        d3.selectAll('.node.target-' + d.target.name).classed('aleph-hide', false)

        // if user is basing link selction on having TARGET nodes as the parent/starting point ,
      } else if (aleph.toggleValue == 'target') {
        d3.selectAll('.link.link-target-' + d.target.name).classed('aleph-hide', false)
        d3.selectAll('.node.target-' + d.target.name).classed('aleph-hide', false)
        d3.selectAll('.node.source-' + d.source.name).classed('aleph-hide', false)
      }

      return
    })
    .on('mouseout', function (d, i) {
      // redisplay all links and nodes
      d3.selectAll('.link').classed('aleph-hide', false)
      d3.selectAll('.node').classed('aleph-hide', false)
      return
    })

  //add the link titles
  link.append('title').text(function (d) {
    return challenges[d.source.name].challenge + ' → ' + technologies[d.target.name].technology
  })

  // add in the nodes
  node = svg
    .append('g')
    .attr('class', 'aleph-node-group')
    .selectAll('.node')
    .data(graph.nodes)
    .enter()
    .append('g')
    .attr('id', function (d) {
      return 'node-' + d.name
    })
    .attr('class', function (d) {
      // initialise str variable to construct classname construct
      var str = ''

      if (aleph.sourceNodes.indexOf(d.name) != -1) {
        aleph.challengeNodeCount++
        aleph.margin.arrowLeft = d.x
        str = 'node SOURCE source-' + d.name
      } else {
        aleph.technologyNodeCount++
        aleph.margin.arrowRight = d.x
        str = 'node TARGET target-' + d.name
      }

      if (aleph.sourceNodes.indexOf(d.name) == -1) {
        d.targetLinks.forEach(function (d) {
          var input = d
          str = str + ' source-' + input.source.name
        })
      } // end if ...
      else if (aleph.targetNodes.indexOf(d.name) == -1) {
        d.sourceLinks.forEach(function (d) {
          var input = d
          str = str + ' target-' + input.target.name
        })
      }
      return str
    })
    .attr('transform', function (d) {
      return 'translate(' + d.x + ',' + d.y + ')'
    })
    .on('mouseover', function (d) {
      d3.selectAll('.aleph-hmiToolTip-Div').classed('aleph-hide', false)

      var sel = d3.selectAll('.aleph-hmiToolTip-Div')
      sel.moveToFront()

      // D3 v4
      var x = d3.event.pageX
      var y = d3.event.pageY

      cursorCoords(d, x, y)

      if (aleph.nodeClicked != '' && aleph.nodeClicked != d.name) {
        aleph.nodeClicked = ''
      } else {
        d3.selectAll('.link').classed('aleph-transparent', true).classed('aleph-no-pointer-events', true)
        d3.selectAll('.node').classed('aleph-transparent', true).classed('aleph-no-pointer-events', true)

        d3.select(this).classed('aleph-transparent', false).classed('aleph-no-pointer-events', false)

        d3.selectAll('.link.link-source-' + d.name)
          .classed('aleph-transparent', false)
          .classed('aleph-no-pointer-events', false)

        d3.selectAll('.link.link-target-' + d.name)
          .classed('aleph-transparent', false)
          .classed('aleph-no-pointer-events', false)

        if (d.sourceLinks.length > 0) {
          d3.selectAll('.node.source-' + d.name).classed('aleph-transparent', false)
        } else if (d.targetLinks.length > 0) {
          d3.selectAll('.node.target-' + d.name).classed('aleph-transparent', false)
        }
      }

      return
    })
    .on('mousemove', function (d) {
      // D3 v4
      var x = d3.event.pageX
      var y = d3.event.pageY

      // call function to update coordinates and position of tooltip
      cursorCoords(d, x, y)

      return
    })
    .on('mouseout', function (d) {
      d3.selectAll('.aleph-hmiToolTip-Div').classed('aleph-hide', true)

      if (aleph.nodeClicked == '') {
        d3.selectAll('.link').classed('aleph-transparent', false)
        d3.selectAll('.node').classed('aleph-transparent', false).classed('aleph-no-pointer-events', false)
        aleph.nodeClicked = ''
      } else {
      }
      return
    })
    .on('click', function (d) {
      if (aleph.nodeClicked == d.name) {
        aleph.nodeClicked = ''
        d3.selectAll('.node').classed('aleph-no-pointer-events', false)
      } else {
        aleph.nodeClicked = d.name

        if (d3.select('#node-' + d.name).classed('SOURCE') || d3.select('#node-' + d.name).classed('TARGET')) {
          if (technologies[d.name].technology) {
            var techToUse = CharacterToCharacter(technologies[d.name].technology, ' ', '_')
            techToUse = CharacterToCharacter(techToUse, '-', '_')
            techToUse = CharacterToCharacter(techToUse, '/', '_')

            var name = d.name
            var slug = ''
            technologiesFile.forEach(function (d, i) {
              var tech = d
              if (tech.id == name) {
                slug = d.slug
              }
            })
            navFunc(slug)
          } else {
            console.log('you have clicked a cognitive challenge')
          }
          d3.selectAll('.node.SOURCE').classed('aleph-no-pointer-events', true)
          d3.selectAll('.node.TARGET').classed('aleph-no-pointer-events', true)
          d3.select(this).classed('aleph-no-pointer-events', false)
          d3.selectAll('.node.TARGET.source-' + d.name).classed('aleph-no-pointer-events ', false)
        } else {
          aleph.nodeClicked = d.name
        }
      }
      return
    })

  d3.selectAll('.aleph-chart')
    .append('text')
    .attr('class', 'aleph-nodeCount counters challenges selected-side hideShow')
    .attr('id', 'arrow-left')
    .attr('x', aleph.margin.left)
    .attr('y', aleph.margin.top)
    .text(aleph.challengeNodeCount + ' Challenges')

  d3.selectAll('.aleph-container')
    .append('label')
    .attr('class', 'aleph-nodeCount noDataToChart aleph-hide')
    .style('top', '200px')
    .style('position', 'absolute')
    .style('width', '100%')
    .text('Latest selection has no data to map. Chart display has returned to the previous chartable data selection')

  d3.selectAll('.aleph-chart')
    .append('text')
    .attr('class', 'aleph-nodeCount counters technologies hideShow')
    .attr('id', 'arrow-right')
    .attr('x', aleph.windowWidth - aleph.margin.right)
    .attr('y', aleph.margin.top)
    .text(aleph.technologyNodeCount + ' Technologies')

  // add the rectangles for the nodes
  node
    .append('svg:image')
    .attr('class', function (d) {
      if (aleph.sourceNodes.indexOf(d.name) == -1) {
        return 'aleph-techIcon FID' + d.name
      }
    })
    .attr('id', function (d) {
      return 'aleph-techIcon-' + d.name
    })
    .attr('xlink:href', function (d) {
      if (aleph.sourceNodes.indexOf(d.name) == -1) {
        return `${rootPath}image/svg/black/bFID${d.name}.svg`
      }
    })
    .attr('x', sankey.nodeWidth() + 35)
    .attr('y', 0)
    .attr('width', aleph.techIconImageSize)
    .attr('height', aleph.techIconImageSize)

  // add the rectangles for the nodes
  node
    .append('rect')
    .attr('class', function (d) {
      return 'aleph-nodeRect' + ' SOURCE-' + CharacterToCharacter(d.name, ' ', '_')
    })
    .attr('height', function (d) {
      return d.dy
    })
    .attr('width', sankey.nodeWidth())
    .style('fill', function (d) {
      if (aleph.sourceNodes.indexOf(d.name) != -1) {
        return color[aleph.leftNodeOrder.indexOf(d.name)]
      } else {
        return '#FFF'
      }
    })
    .style('stroke', function (d) {
      if (aleph.sourceNodes.indexOf(d.name) != -1) {
        return color[aleph.leftNodeOrder.indexOf(d.name)]
      } else {
        return '#000'
      }
    })
    .style('stroke-width', function (d) {
      return 1
    })

  // add in the title for the nodes
  node
    .append('text')
    .attr('class', 'aleph-nodeCountTitle')
    .attr('x', sankey.nodeWidth() + 5 + aleph.techIconImageSize)
    .attr('y', 12.5)
    .attr('dy', '.5em')
    .attr('text-anchor', 'start')
    .attr('transform', null)
    .text(function (d) {
      if (d.sourceLinks.length != 0) {
        return d.sourceLinks[0].challenge
      } else if (d.targetLinks.length != 0) {
        return technologies[d.name].technology
      }

      return d.name
    })
    .filter(function (d) {
      return d.x < aleph.chartWidth / 2
    })
    .attr('x', -15)
    .attr('y', 10)
    .attr('text-anchor', 'end')

  // the function for moving the nodes
  function dragmove(d) {
    d3.select(this).attr(
      'transform',
      'translate(' + d.x + ',' + (d.y = Math.max(0, Math.min(aleph.chartHeight - d.dy, d3.event.y))) + ')'
    )
    sankey.relayout()
    link.attr('d', path)
  }

  // add in the title for the nodes
  node
    .append('text')
    .attr('class', function (d) {
      var str = 'aleph-nodeCountNumber'
      if (d.x < aleph.chartWidth / 2) {
        str = str + ' source'
      } else {
        str = str + ' target'
      }
      return str
    })
    .attr('x', sankey.nodeWidth() * 1.5)
    .attr('y', 10)
    .attr('dy', '.5em')
    .attr('text-anchor', 'start')
    .attr('transform', null)
    .text(function (d) {
      return d.value
    })
    .filter(function (d) {
      return d.x < aleph.chartWidth / 2
    })
    .attr('x', -sankey.nodeWidth())
    .attr('y', 10)
    .attr('text-anchor', 'end')

  // the function for moving the nodes
  function dragmove(d) {
    d3.select(this).attr(
      'transform',
      'translate(' + d.x + ',' + (d.y = Math.max(0, Math.min(aleph.chartHeight - d.dy, d3.event.y))) + ')'
    )
    sankey.relayout()
    link.attr('d', path)
  }

  d3.selectAll('.node.SOURCE').selectAll('.aleph-nodeCountTitle').call(wrapText, 175, -60)

  d3.selectAll('.node.TARGET')
    .selectAll('.aleph-nodeCountTitle')
    .call(
      wrapText,
      aleph.windowWidth - (aleph.windowWidth - aleph.margin.right) - (sankey.nodeWidth() + aleph.techIconImageSize),
      sankey.nodeWidth() + aleph.techIconImageSize + 45
    )

  var sel = d3.selectAll('.aleph-chart')
  sel.moveToFront()

  if (aleph.onload == true) {
    aleph.onload = false
    attachSVGControls()
  }

  var challengeFamily = challenges[aleph.sourceTechnologyArray[0].replace('FAMILY', '') + '_1'].family
  challengeFamily = challengeFamily.substring(3)

  d3.selectAll('.aleph-mainTitle').text(challengeFamily)
  setSliderTicks('#slider-range')

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
  var buttonPressedLabel = buttonPressed._groups[0][0].innerText

  // dynamically modify CSS class declarations attached to all technology selection buttons
  buttonPressed.classed('aleph-btn-unselected', !buttonPressed.classed('aleph-btn-unselected'))

  // dynamically modify CSS class declarations attached to user-selected technology selection buttons
  buttonPressed.classed('aleph-btn-selected', !buttonPressed.classed('aleph-btn-selected'))

  // if user has DESELECTED a field ...
  if (buttonPressed.classed('aleph-btn-unselected')) {
    const filterIndex = aleph.sourceTechnologyArray.indexOf(button.value)
    if (filterIndex > -1) {
      aleph.sourceTechnologyArray.splice(filterIndex, 1)
    }
  }
  // else if user has SELECTED a field
  else {
    aleph.sourceTechnologyArray.push(button.value)
    const filterIndex = aleph.sourceTechnologyArray.indexOf(button.value)
  } // end else ...

  // if selection array length is equal tot max number of selections allows on example homepage
  if (aleph.sourceTechnologyArray.length == aleph.numberOfLevels) {
    $('.btn.aleph-btn-unselected').prop('disabled', true).addClass('aleph-disabled')
  } else {
    $('.btn.aleph-btn-unselected').prop('disabled', false).removeClass('aleph-disabled')
  }

  // if selection array is of no length...
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
    NAME: cursorCoords 
    DESCRIPTION: function called determine dynamically the current positioning of the cursor, and thus where to display toolip on event rectangle mouseover
    ARGUMENTS TAKEN:  fid: information on selected event rectangle
    ARGUMENTS RETURNED: none
    CALLED FROM: mouse move interaction 
    CALLS: wrapText
          update_lineCoordinatesArray
    USEFULL: // https://stackoverflow.com/questions/16770763/mouse-position-in-d3
*/
function cursorCoords(d, x, y) {
  d3.selectAll('.aleph-toolTipLabel').remove()
  d3.selectAll('.aleph-hmiToolTipChild-label').remove()

  var sel = d3.selectAll('.aleph-hmiToolTip-Div')
  sel.moveToFront()

  // modify class definiton of tooltip 'g' element and current offset position based on mouse cursor position
  d3.selectAll('.aleph-hmiToolTip-Div')
    .classed('aleph-hide', false)
    .style('left', function () {
      if (x < aleph.chartWidth / 2) {
        return x + 15 + 'px' // left half
      } else {
        return x - aleph.toolTipDimensions.width - 15 + 'px' // right half
      }
    })
    .style('top', function () {
      if (y < aleph.chartHeight / 2) {
        return y /*  - 15  */ + 'px' // top half
      } else {
        return y - aleph.toolTipDimensions.height + 'px' // bottom half
      }
    })

  var number = 0
  var string = ''
  var fullString = ''
  var title = ''
  var listTitle = ''

  if (d.sourceLinks.length > 0) {
    title = challenges[d.name].family
    string = '<span>' + 'Challenge : ' + '</span>' + d.sourceLinks[0].challenge

    number = '<span>' + 'Number of related technologies: ' + '</span>' + d.sourceLinks.length
    listTitle = 'Technologies: '
  } else if (d.targetLinks.length > 0) {
    title = technologies[d.name].technology
    string = ''
    number = '<span>' + 'Number of related challenges: ' + '</span>' + d.targetLinks.length
    listTitle = 'Challenges: '
  }

  d3.selectAll('.aleph-hmiToolTipTitle-label').html(title)
  d3.selectAll('.aleph-hmiToolTipSubTitle-label').html(string)
  d3.selectAll('.aleph-hmiToolTipNumber-label').html(number)
  d3.selectAll('.aleph-hmiToolTipListTitle-label').html(listTitle)

  if (d.sourceLinks.length > 0) {
    d.sourceLinks.forEach(function (d, i) {
      d3.selectAll('.aleph-hmiToolTip-Div')
        .append('p')
        .attr('class', 'aleph-hmiToolTipChild-label')
        .text(i + 1 + '. ' + technologies[d.target.name].technology)
    })
  } else if (d.targetLinks.length > 0) {
    d.targetLinks.forEach(function (d, i) {
      d3.selectAll('.aleph-hmiToolTip-Div')
        .append('p')
        .attr('class', 'aleph-hmiToolTipChild-label')
        .text(i + 1 + '. ' + d.challenge)
    })
  } // end forEach loop.

  var sel = d3.selectAll('.aleph-hmiToolTip-Div')
  sel.moveToFront()

  return
} // end function cursorCoords

/*
    NAME: wrapText 
    DESCRIPTION: function to wrap long lines to defined width. can be used for labels, strings, axis titles etc.
    ARGUMENTS TAKEN:  text
                      content_width
                      ttmargin
    ARGUMENTS RETURNED: none
    CALLED FROM: removeLinklines
    CALLS: none
*/
function wrapText(text, content_width, ttmargin) {
  text.each(function () {
    var text = d3.select(this),
      words = text.text().split(/\s+/).reverse(),
      word,
      line = [],
      lineNumber = 0,
      lineHeight = 20, // ems
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
} // end function wrapText()

/*
    NAME: returnToTechSelector 
    DESCRIPTION: function to wrap long lines to defined width. can be used for labels, strings, axis titles etc.
    ARGUMENTS TAKEN:  none
    ARGUMENTS RETURNED: none
    CALLED FROM: index.hmtl
    CALLS: loadData
*/
function returnToTechSelector() {
  d3.selectAll('.slidecontainer').classed('aleph-hide', true)

  d3.selectAll('.aleph-legendBase').classed('aleph-hide', false)
  aleph.url = 'http://HMI-technologySelector.co.uk?'
  $('.btn.aleph-copyUrl').prop('disabled', false).removeClass('aleph-disabled')

  $('.btn.aleph-submitUrl').prop('disabled', false).removeClass('aleph-disabled')

  // modify display of relevant DOM elements
  d3.selectAll('.aleph-exampleTechSelector').classed('aleph-hide', false)
  d3.selectAll('.aleph-chart').classed('aleph-hide', true)
  d3.selectAll('.aleph-controls').classed('aleph-hide', true)
  d3.selectAll('.aleph-bannerBase').classed('aleph-hide', true)

  aleph.sourceTechnologyArray = []

  // grab all buttons on example home page.
  var buttons = d3.selectAll('.btn.aleph-technologyButton')._groups[0]

  // loop through all buttons midifying their text labelling back to oroginal format
  buttons.forEach(function (d, i) {
    if (d.innerText.indexOf('(') != -1) {
      var index = d.innerText.indexOf('(')
      d.innerText = d.innerText.slice(0, index)
    }
  })

  // modify class names defintions of tech buttons on proxy screen
  d3.selectAll('.btn.aleph-technologyButton')
    .classed('aleph-btn-selected', false)
    .classed('aleph-btn-unselected', true)
    .classed('aleph-disabled', false)

  // acitivate all buttons
  $('.btn.aleph-technologyButton').prop('disabled', false).removeClass('aleph-disabled')

  // document.getElementById("aleph-url").value = "";
  // document.getElementById("aleph-url").placeholder = "Copy your URL here ...";

  // call function to reload data as if a new start on visual.
  loadData()

  return
} // end function returnToTechSelector

/*
    NAME: copyURL 
    DESCRIPTION: function called when user presses proxy button to 'copy' URL string made for selections made
    ARGUMENTS TAKEN:  none
    ARGUMENTS RETURNED: none
    CALLED FROM: index.hmtl
    CALLS: none
*/
function copyURL() {
  document.getElementById('aleph-url').value = aleph.url.slice(0, -1)
  $('.btn.aleph-technologyButton').prop('disabled', true).addClass('aleph-disabled').addClass('btn-danger')
  return
} // enf function copyURL

/*
    NAME: submitURL 
    DESCRIPTION: function called when user presses proxy button to 'submit' URL string made for selections made
    ARGUMENTS TAKEN:  none
    ARGUMENTS RETURNED: none
    CALLED FROM: index.hmtl
    CALLS: submitSelection
*/
function submitURL() {
  // https://support.clickmeter.com/hc/en-us/articles/211032666-URL-parameters-How-to-pass-it-to-the-destination-URL#:~:text=Any%20word%20after%20the%20question,about%20passing%20parameter%20through%20URL.

  // modify classnames of DOM elements to hide/show
  d3.selectAll('.aleph-exampleTechSelector').classed('aleph-hide', true)
  d3.selectAll('.aleph-chart').classed('aleph-hide', false)
  d3.selectAll('.aleph-controls').classed('aleph-hide', false)

  // cosntruct URL value string
  var url = document.getElementById('aleph-url').value
  url = url.replace('http://HMI-technologySelector.co.uk?', '').replace(':true', '')
  url = CharacterToCharacter(url, '=true', '')
  url = url.split('&')

  aleph.sourceTechnologyArray = url

  // call function to mimic submtting URL string of selections instead of selcting manually crtieria.
  submitSelection()

  return
} // end function submitURL

/*
    NAME: darkMode 
    DESCRIPTION: function called to flip display to a dark mode styling
    ARGUMENTS TAKEN:  none
    ARGUMENTS RETURNED: none
    CALLED FROM: index.hmtl
    CALLS: none
*/
function darkMode(button) {
  if (button.value == 'true') {
    button.value = 'false'
  } else if (button.value == 'false') {
    button.value = 'true'
  } else {
  }
  return
} // end function darkMode

/*
    NAME: changeLinkBase 
    DESCRIPTION: function called flip the logical direction of source-target direction for highlighting sankey links and nodes
    ARGUMENTS TAKEN: button ; valued added information for button pressed
    ARGUMENTS RETURNED: none
    CALLED FROM: index.hmtl
    CALLS: none
*/
function changeLinkBase(button) {
  if (button.id == 'arrow-left') {
    aleph.toggleValue = 'source'
  } else {
    aleph.toggleValue = 'target'
  }

  return
} // end function changeLinkBase

/*
    NAME: switchWeightingType 
    DESCRIPTION: function called to switch Weighting Type of data displayed
    ARGUMENTS TAKEN: button -
    ARGUMENTS RETURNED: none
    CALLED FROM: index.html
    CALLS: none
*/
function switchWeightingType(button) {
  d3.selectAll('.aleph-sortButton').classed('aleph-selected-sort', false)

  if (button.id == 'weighted') {
    aleph.dataWeighting = 'weighted'
    d3.select('#weighted').classed('aleph-selected-sort', true)
  } else {
    aleph.dataWeighting = 'binary'
    d3.select('#binary').classed('aleph-selected-sort', true)
  }

  transitionChart()
  return
} // end function switchWeightingType

function transitionChart() {
  graph.links.forEach(function (d, i) {
    graph.links[i].value = graph.links[i][aleph.dataWeighting]
  }) // end forEach

  // generate Sankey object
  sankey.nodes(graph.nodes).links(graph.links).layout(32)

  d3.selectAll('.link.aleph-link')
    .transition()
    .duration(1250)
    .ease(d3.easeLinear)
    .attr('d', path)
    .style('stroke-width', function (d) {
      return Math.max(1, d.dy)
    })

  d3.selectAll('.node')
    .transition()
    .duration(1250)
    .ease(d3.easeLinear)
    .attr('transform', function (d) {
      return 'translate(' + d.x + ',' + d.y + ')'
    })

  // add the rectangles for the nodes
  d3.selectAll('.aleph-nodeRect')
    .transition()
    .duration(1250)
    .ease(d3.easeLinear)
    .attr('height', function (d) {
      return d.dy
    })
    .attr('width', sankey.nodeWidth())

  d3.selectAll('.node')
    .selectAll('.aleph-nodeCountNumber')
    .transition()
    .duration(625)
    .ease(d3.easeLinear)
    .style('opacity', 0.0)
    .transition()
    .duration(625)
    .ease(d3.easeLinear)
    .style('opacity', 1.0)
    .text(function (d) {
      return d.value
    })

  return
} // end function transitionChart

function attachSVGControls() {
  d3.selectAll('.aleph-bannerSVGBase')
    .append('text')
    .attr('x', aleph.windowWidth / 2)
    .attr('y', 40)
    .attr('class', 'aleph-mainTitle')

  d3.selectAll('.aleph-nodeCount.counters').on('click', function () {
    d3.selectAll('.aleph-nodeCount.counters').classed('selected-side', false)
    d3.select(this).classed('selected-side', true)
    changeLinkBase(this)
  })

  d3.selectAll('.aleph-bannerSVGBase')
    .append('g')
    .attr('class', 'aleph-sortButton-group-base')
    .attr('transform', 'translate(' + aleph.windowWidth / 2 + ',' + aleph.margin.top / 2 + ')')

  d3.selectAll('.aleph-bannerSVGBase')
    .append('svg:image')
    .attr('class', 'aleph-sortButton aleph-selected-sort')
    .attr('id', 'binary')
    .attr('xlink:href', `${rootPath}image/binary.svg`)
    .attr('x', aleph.windowWidth / 2 - 350)
    .attr('y', 65)
    .attr('width', 350)
    .attr('height', 50)
    .on('click', function () {
      switchWeightingType(this)
    })
    .append('title')
    .text('All Links, Equally Weighted')
  /* .text("View BINARY data"); */

  /* d3.selectAll(".aleph-sortButton-group-base") */
  d3.selectAll('.aleph-bannerSVGBase')
    .append('svg:image')
    .attr('class', 'aleph-sortButton')
    .attr('id', 'weighted')
    .attr('xlink:href', `${rootPath}image/weighted.svg`)
    .attr('x', aleph.windowWidth / 2 - 0)
    .attr('y', 65)
    /*     .attr("width", 50)
        .attr("height", 50) */
    .attr('width', 350)
    .attr('height', 50)
    .on('click', function () {
      switchWeightingType(this)
    })
    .append('title')
    .text('All Links, Weighted by Relevance')
  /*  .text("View WEIGHTED data"); */

  return
} // end function attachSVGControls

// Listen for scroll events
window.addEventListener(
  'scroll',
  function (event) {
    d3.selectAll('.scroll').classed('stopped', false).classed('moving', true)

    // Clear our timeout throughout the scroll
    window.clearTimeout(isScrolling)

    // Set a timeout to run after scrolling ends
    isScrolling = setTimeout(function () {
      // Run the callback
      d3.selectAll('.scroll').classed('stopped', true).classed('moving', false)
    }, 50)
  },
  false
)

/*
    NAME: onscroll 
    DESCRIPTION: anonymous function to handle vertical user scrolling
    ARGUMENTS TAKEN:    ev: scorll event
    ARGUMENTS RETURNED: none
    CALLED FROM: on scrolling
    CALLS:  none

    http://bl.ocks.org/johangithub/97a186c551e7f6587878
*/
window.onscroll = function (ev) {
  if (window.scrollY == 0) {
    // you're at the TOP of the page
    // console.log("you're at the TOP of the page");
    d3.selectAll('.aleph-bannerSVGBase-rect').classed('aleph-isScrolling', false)
  } else if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
    // you're at the BOTTOM of the page
    // console.log("you're at the BOTTOM of the page");
    d3.selectAll('.aleph-bannerSVGBase-rect').classed('aleph-isScrolling', true)
  } else {
    // you're in the MIDDLE of the page
    // console.log("you're at the MIDDLE of the page");
    d3.selectAll('.aleph-bannerSVGBase-rect').classed('aleph-isScrolling', true)
  }

  return
} // end function onscroll

d3.select('#slider-range').append('label').attr('id', 'lowRelevance').text('Low')
d3.select('#slider-range')
  .append('label')
  .attr('id', 'amount')
  .text('Strength of Relationship Between Cognitive Challenge and Technology')
d3.select('#slider-range').append('label').attr('id', 'highRelevance').text('High')

$(function () {
  $('#slider-range').slider({
    range: true,
    min: 1,
    max: 8,
    values: [1, 8],
    slide: function (event, ui) {
      aleph.thresholdLow = ui.values[0]
      aleph.thresholdHigh = ui.values[1]
      aleph.currentSliderRange = [aleph.thresholdLow, aleph.thresholdHigh]
      submitSelection()
    },
  })
  $('#amount').html('Strength of Relationship Between Cognitive Challenge and Technology')
})

// http://stackoverflow.com/questions/14167863/how-can-i-bring-a-circle-to-the-front-with-d3
d3.selection.prototype.moveToFront = function () {
  return this.each(function () {
    this.parentNode.appendChild(this)
  })
}
d3.selection.prototype.moveToBack = function () {
  return this.each(function () {
    var firstChild = this.parentNode.firstChild
    if (firstChild) {
      this.parentNode.insertBefore(this, firstChild)
    }
  })
}

// https://www.sitepoint.com/community/t/custom-range-slider-with-ticks/319324
function setSliderTicks(el) {
  var $slider = $(el)
  var max = $slider.slider('option', 'max')
  var min = $slider.slider('option', 'min')
  var step = $slider.slider('option', 'step')
  var spacing = 100 / ((max - min) / step)

  $slider.find('.ui-slider-tick-mark').remove()
  $slider.find('.ui-slider-tick-label').remove()

  for (var i = 0; i <= (max - min) / step; i++) {
    $('<span class="ui-slider-tick-mark"></span>')
      .css('left', spacing * i + '%')
      .appendTo($slider)

    $('<span class="ui-slider-tick-label"></span>')
      .text(Number(i + 1))
      .css('left', spacing * i + '%')
      .appendTo($slider)
  }
}
