/*
  Project: HMI Technology Comparisons visualisation
  Filename: aleph-himTechnologyComparison.js
  Date built: July 2020 to January 2020
  Written By: James Bayliss (Data Vis Developer)
  Tech Stack: HTML5, CSS3, JS ES5/6, D3 (v5), JQuery 
*/

var navFunc

/*

USEFUL LINKS:
Brush & Zoom:
https://bl.ocks.org/tristanwietsma/f4997974b5602a5b48ec8eba104335d4

Categorical/Ordinal Scatterplot:
https://bl.ocks.org/hydrosquall/fffbaaf171bfc100dc10effbf8242128

Drop-shadows:
http://bl.ocks.org/wimdows/1502762
https://observablehq.com/@bumbeishvili/svg-drop-shadows
https://gist.github.com/cpbotha/5200394
*/

// initialise and setup global variables.
var parseDate = d3.timeParse('%Y') // time format parser - currently set up to read in integer years (e.g. 2020, 2017). No month or date/day definition
var x, y, x2, y2, x3, y3, xAxis, xAxis2, yAxis // x- and y- defintion initialsiations for both focus and context charts
var context // context chart variable initialisation
var focus // focus chart variable initialisation
var brush //brush variable initialisation
/* var zoom; */
var t
var drag = d3.drag() // https://github.com/d3/d3-drag
var lineDynamics = {} // dynamic variable to store information relating to linkline dynamics/defintion. Stores information on parent event (selected by user) and child event(s) of selected parent event.
var lineFunction // line path function definition of focus chart paths
var context_lineFunction // line path function definition of context chart paths
var tooltip // focus chart tooltip variable initialisation
var impact_Axis = ['Low Impact', 'Medium Impact', 'High Impact'] // y-axis domain definiton for 'Impact' categorical ordering
var likelihood_Axis = ['Low Likelihood', 'Medium Likelihood', 'High Likelihood'] // y-axis domain definiton for 'Likelihood' categorical ordering

var technologies_new = {}
var technologies = {}

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
filter
  .append('feOffset')
  .attr('in', 'blur')
  .attr('rx', 5)
  .attr('ry', 5)
  .attr('dx', 5)
  .attr('dy', 5)
  .attr('result', 'offsetBlur')

// overlay original SourceGraphic over translated blurred opacity by using
// feMerge filter. Order of specifying inputs is important!
var feMerge = filter.append('feMerge')

feMerge.append('feMergeNode').attr('in', 'offsetBlur')
feMerge.append('feMergeNode').attr('in', 'SourceGraphic')

/*
  NAME: started 
  DESCRIPTION: function called when user starts a mouse drag process on a tech timeline. 
              Only relvant and accessed when two or more timeline charts are displayed by user 
              Determine y-coordinate of selected chart/ Dragging only allowed in vertical plane.
  ARGUMENTS TAKEN: none
  ARGUMENTS RETURNED: none
  CALLED FROM: d3.drag implementation
  CALLS: none
*/
function started() {
  // initialise JSON object for containing dynamics/info on drag requirements (e.g. tech selected, current y cordiantes of tiemline 'g', timeline counter)
  aleph.dragDynamics = {}

  // determine technology that relates to timelines selected or dragging.
  var tech = this.id.replace('timeline-g-', '')

  //store locally selected 'g' element and modify class name declaration
  aleph.timeline = d3.select(this).classed('dragging', true)
  d3.selectAll('#' + this.id)
    .selectAll('.aleph-falsePanelBackground')
    .classed('aleph-timelineClicked', true)

  // determine y-coordinate of selected chart/ Dragging only allowed in vertical plane.
  var groupY = d3.select(this).attr('transform').replace('translate(0,', '').replace(')', '')

  aleph.groupY = groupY
  aleph.timeline.raise().attr('transform', 'translate(0,' + aleph.groupY + ')')

  // update relevant elements of dragDynamics JSON object.
  aleph.dragDynamics.tech = tech // selected technology
  aleph.dragDynamics.counter = +aleph.selectedTechnologies[tech].counter // current selected technology counter
  aleph.dragDynamics.groupY = +groupY // y-plane coordiante; allows dragging on vertical plane. Horizonstal drag not needed/allowed
  aleph.dragDynamics.this = this // entire 'g' group

  return
} // end function started

/*
  NAME: dragged 
  DESCRIPTION: function called when user continues dragging tiemline on vertical plane using mouse
  ARGUMENTS TAKEN: none
  ARGUMENTS RETURNED: none
  CALLED FROM: d3.drag implementation
  CALLS: none
  */
function dragged() {
  // grab transform attribute of selected timeline 'g' element
  aleph.timeline
    .raise() /* .transition().duration(250).ease(d3.easeLinear) */
    .attr('transform', 'translate(0,' + d3.event.y + ')')

  //dynamcially update y-coordinate of currently selected and dragged/ing timeline
  var mouseY = d3.event.y

  // update value stored in JSON object
  aleph.dragDynamics.mouseY = +mouseY

  // check to determine if new vertical position of selected timeline 'g' element is above or below or between adjacent timelines above and below.
  // resorts order of relevant timelines if needed.
  //
  // if new position is lower (on screen, ie.. higher y) ... chart has been moved down ...
  if (aleph.dragDynamics.mouseY > aleph.dragDynamics.groupY + aleph.timeLineHeight) {
    $('[value=' + Number(aleph.dragDynamics.counter + 1) + ']').addClass('aleph-draggedFarEnoughLow')
  } /* END IF ... */
  // if new position is higher (on screen, ie.. lower y) ... chart has been moved up ...
  else if (aleph.dragDynamics.mouseY < aleph.dragDynamics.groupY - aleph.timeLineHeight) {
    $('[value=' + Number(aleph.dragDynamics.counter - 1) + ']').addClass('aleph-draggedFarEnoughHigh')
  } /* END ELSE IF ... */
  // otherwise selected chart has not been dragged far enough so it needs to be snapped back to original position.
  else {
    d3.selectAll('.timeline-g').classed('aleph-draggedFarEnoughHigh', false).classed('aleph-draggedFarEnoughLow', false)
  } /* END ELSE ... */

  return
} // end function dragged

/*
NAME: ended 
DESCRIPTION: function called when user ENDS dragging timeline on vertical plane using mouse
ARGUMENTS TAKEN: dD - dragDynamics object
ARGUMENTS RETURNED: none
CALLED FROM: d3.drag implementation
CALLS: none
*/
function ended(dD) {
  // update class declarations of selected timeline 'g' element, and related background rect (helps modofy edge stroke styling)
  aleph.timeline.classed('dragging', false)
  d3.selectAll('.aleph-falsePanelBackground').classed('aleph-timelineClicked', false)

  d3.selectAll('.timeline-g').classed('aleph-draggedFarEnoughHigh', false).classed('aleph-draggedFarEnoughLow', false)

  // check to determine if new vertical position of selected timeline 'g' element is above or below or between adjacent timelines above and below.
  // resorts order of relevant timelines if needed.
  //
  // if new position is lower (on screen, ie.. higher y) ... chart has been moved down ...
  if (dD.mouseY > dD.groupY + aleph.timeLineHeight) {
    // for [each] timeline panel that is below selected timeline chart ...
    for (var panel in aleph.selectedTechnologies) {
      // if considered chart counter is one more than selected chart being dragged ...
      if (aleph.selectedTechnologies[panel].counter == Number(dD.counter + 1)) {
        // reduce chart counter of chart panel by 1.
        aleph.selectedTechnologies[panel].counter = aleph.selectedTechnologies[panel].counter - 1

        // move lower chart(s) to OLD position of selected chart, i.e. move it up
        d3.select('#timeline-g-' + panel)
          .attr('transform', 'translate(0,' + dD.groupY + ')')
          .attr('value', aleph.selectedTechnologies[panel].counter)
      } // end if loop ...
    } // end for loop ..

    // increase chart counter of selected chart panel by 1.
    aleph.selectedTechnologies[dD.tech].counter = aleph.selectedTechnologies[dD.tech].counter + 1

    // update transform attribute of selected chart 'g' group (increase it to mvoe it down page/screen)
    d3.select(dD.this)
      .attr('transform', 'translate(0,' + (dD.groupY + aleph.timeLineHeight) + ')')
      .attr('value', aleph.selectedTechnologies[dD.tech].counter)
  } /* END IF ... */
  //
  // if new position is higher (on screen, ie.. lower y) ... chart has been moved up ...
  else if (dD.mouseY < dD.groupY - aleph.timeLineHeight) {
    // for [each] timeline panel that is above selected timeline chart ...
    for (var panel in aleph.selectedTechnologies) {
      // if considered chart counter is one less than selected chart being dragged ...
      if (aleph.selectedTechnologies[panel].counter == Number(dD.counter - 1)) {
        // incrase chart counter of selected chart panel by 1.

        aleph.selectedTechnologies[panel].counter = aleph.selectedTechnologies[panel].counter + 1

        // move upper chart(s) to OLD position of selected chart, i.e. move it down
        d3.select('#timeline-g-' + panel)
          .attr('transform', 'translate(0,' + dD.groupY + ')')
          .attr('value', aleph.selectedTechnologies[panel].counter)
      } // end if loop ...
    } // end for loop ..

    // decrease chart counter of selected chart panel by 1.
    aleph.selectedTechnologies[dD.tech].counter = aleph.selectedTechnologies[dD.tech].counter - 1

    // update transform attribute of selected chart 'g' group (decrease it to move it up page/screen)
    d3.select(dD.this)
      .attr('transform', 'translate(0,' + (dD.groupY - aleph.timeLineHeight) + ')')
      .attr('value', aleph.selectedTechnologies[dD.tech].counter)
  } /* END ELSE IF ... */

  // otherwise selected chart has not been dragged far enough so it needs to be snapped back to original position.
  else {
    d3.select(dD.this).attr('transform', 'translate(0,' + dD.groupY + ')')
  } /* END ELSE IF ... */

  // update classname declarations
  d3.selectAll('.aleph-falsePanelBackground').classed('aleph-timelineClicked', false)

  return
} // end function ended

d3.selectAll('.aleph-container').on('mouseup', function () {
  d3.select(this).classed('aleph-grabbing', false).classed('aleph-grab', false).style('cursor', 'default')
  return
})
/*
    NAME: buildTimeLineChart 
    DESCRIPTION: function called when to build a new timeline chart for each new technology selected
    ARGUMENTS TAKEN:  panel:
                      heightDownPage: 
    ARGUMENTS RETURNED: none
    CALLED FROM: add_removeTimeLinePanel
    CALLS: snapXAxes
            clicked
*/
function buildTimeLineChart(panel, heightDownPage) {
  // select base SVG panel, append a new goup 'g' element. This will hold all DOM SVG content for individual technology timeline.
  d3.selectAll('.aleph-chart')
    .append('g')
    .attr('class', 'timeline-g timeline-g-' + panel.technology + ' FID' + panel.technology)
    .attr('id', 'timeline-g-' + panel.technology)
    .attr('value', panel.counter)
    .attr('transform', 'translate(0,' + Number(heightDownPage - aleph.timeLineHeight) + ')')
    .on('mousedown', function () {
      d3.event.stopPropagation()
      d3.select(this).style('point-events', 'none')
    })
    .call(
      d3
        .drag()
        .on('start', function () {
          if (aleph.technologyCounter > 1) {
            started()
          }
        })
        .on('drag', function () {
          if (aleph.technologyCounter > 1) {
            dragged()
          }
        })
        .on('end', function () {
          if (aleph.technologyCounter > 1) {
            ended(aleph.dragDynamics)
          }
          return
        })
    )
    .on('mousedown', function () {
      d3.event.stopPropagation()
      if (aleph.technologyCounter > 1) {
        clicked(this)
      }
      return
    })

  // defintion onf D3 tooltip
  //d3.selectAll(".aleph-hmiToolTip-Div").remove();

  tooltip = d3
    .selectAll('.aleph-hmiToolTip-Div')
    .style('filter', 'url(#drop-shadow)')
    .attr('class', 'aleph-hmiToolTip-Div aleph-hide')
    .style('position', 'absolute')
    .style('left', 50 + 'px')
    .style('padding', '15px')
    .style('top', 50 + 'px')
    .style('width', aleph.toolTipDimensions.width + 'px')

  function buildToolTipContent() {
    d3.selectAll('.aleph-tooltip-content').remove()

    // append tooltip title label
    d3.selectAll('.aleph-hmiToolTip-Div')
      .append('label')
      .attr('class', 'aleph-hmiToolTipTitle-label aleph-tooltip-content')
      .style('position', 'relative')
      .style('display', 'block')
      .style('text-anchor', 'middle')
      .text('Test Title Text')

    d3.selectAll('.aleph-hmiToolTip-Div')
      .append('label')
      .attr('class', 'aleph-hmiToolTipSubTitle-label aleph-tooltip-content')
      .style('position', 'relative')
      .style('left', 10 + 'px')
      .style('display', 'block')
      .text('Test Sub-title Text')

    d3.selectAll('.aleph-hmiToolTip-Div')
      .append('label')
      .attr('class', 'aleph-hmiToolTipEventType-label aleph-tooltip-content')
      .style('position', 'relative')
      .style('left', 10 + 'px')
      .style('font-weight', 'normal')
      .style('display', 'block')
      .text('Test Title Text')

    d3.selectAll('.aleph-hmiToolTip-Div')
      .append('label')
      .attr('class', 'aleph-hmiToolTipDates-label aleph-tooltip-content')
      .style('position', 'relative')
      .style('left', 10 + 'px')
      .style('font-weight', 'normal')
      .style('display', 'block')
      .text('Test Title Text')

    d3.selectAll('.aleph-hmiToolTip-Div')
      .append('label')
      .attr('class', 'aleph-hmiToolTipImpact-label aleph-tooltip-content')
      .style('position', 'relative')
      .style('left', 10 + 'px')
      .style('display', 'block')
      .text('Test Number Text')

    d3.selectAll('.aleph-hmiToolTip-Div')
      .append('label')
      .attr('class', 'aleph-hmiToolTipLikelihood-label aleph-tooltip-content')
      .style('position', 'relative')
      .style('left', 10 + 'px')
      .style('font-weight', 'normal')
      .style('display', 'block')
      .text('Test Title Text')

    d3.selectAll('.aleph-hmiToolTip-Div')
      .append('label')
      .attr('class', 'aleph-hmiToolTipComment-label aleph-tooltip-content')
      .style('position', 'relative')
      .style('left', 10 + 'px')
      .style('font-weight', 'normal')
      .style('display', 'block')
      .text('Test Title Text')

    return
  }

  /*
    NAME: clicked 
    DESCRIPTION: function called when user clicks on timeline chart 'g' element
    ARGUMENTS TAKEN:  fid: information on click interaction with timeline 'g' element
    ARGUMENTS RETURNED: none
    CALLED FROM: mouse click 
    CALLS: n/a
  */
  function clicked(fid) {
    d3.event.stopPropagation()
    d3.selectAll(fid).classed('timelineClicked', true)
    if (d3.event.defaultPrevented) return // dragged

    return
  } // end function clicked

  // locally store group 'g' element to attach new DOM SVG content onto.
  var appendTo = d3.selectAll('.timeline-g-' + panel.technology)

  // append false background to timeline 'g' element.
  appendTo
    .append('rect')
    .attr('class', 'aleph-falseFullPanelBackground FID' + panel.technology)
    .attr('x', 0)
    .attr('y', 0)
    .attr('width', aleph.windowWidth)
    .attr('height', aleph.timeLineHeight)

  appendTo
    .append('rect')
    .attr('class', 'aleph-falsePanelBackground FID' + panel.technology)
    .attr('id', panel.technology)
    .attr('x', 0)
    .attr('y', 0)
    .attr('width', aleph.windowWidth)
    .attr('height', 32.5)
    .on('mouseover', function () {
      d3.select(this).classed('aleph-grab', true).classed('aleph-grabbing', false)
      return
    })
    .on('mousedown', function () {
      d3.select(this).classed('aleph-grab', false).classed('aleph-grabbing', true)
      return
    })
    .on('mouseout', function () {
      d3.select(this).classed('aleph-grabbing', false).classed('aleph-grab', false)
      return
    })
  // .call(d3.drag().on("start", started))
  // .on("mousedown", function () {
  //   d3.event.stopPropagation();
  //   clicked(this);
  //   return;
  // });

  /*
    NAME: cursorCoords 
    DESCRIPTION: function called determine dynamically the current positioning of the cursor, and thus where to display toolip on event rectangle interaction.
    ARGUMENTS TAKEN:  fid: information on selected event rectangle
    ARGUMENTS RETURNED: none
    CALLED FROM: mouse move interaction 
    CALLS: wrapTooltipText
          update_lineCoordinatesArray
    USEFULL: // https://stackoverflow.com/questions/16770763/mouse-position-in-d3
  */
  function cursorCoords(d, x, y) {
    d3.selectAll('.aleph-hmiToolTipChild-label').remove()

    var toolTipHeight = d3.selectAll('.aleph-hmiToolTip-Div#tooltipDiv').style('height').replace('px', '')

    // modify class definiton of tooltip 'g' element and current offset position based on mouse cursor position
    d3.selectAll('.aleph-hmiToolTip-Div')
      .classed('aleph-hide', false)
      .style('left', function () {
        if (x < aleph.windowWidth / 2) {
          return x + 15 + 'px'
        } else {
          return x - 45 - aleph.toolTipDimensions.width + 'px'
        }
      })
      .style('top', function () {
        if (y < aleph.windowHeight / 2) {
          return y + 15 + 'px'
        } else {
          return y - toolTipHeight - 30 + 'px'
        }
      })

    d3.selectAll('.aleph-hmiToolTipTitle-label').text(d.techName)
    d3.selectAll('.aleph-hmiToolTipSubTitle-label').text(d.Event)
    d3.selectAll('.aleph-hmiToolTipEventType-label').html('<span>' + 'Event Type: ' + '</span>' + d.eventType)
    d3.selectAll('.aleph-hmiToolTipDates-label').html(
      '<span>' + 'Projected Time Span: ' + '</span>' + d.eventStartDate + '<span>' + ' to ' + '</span>' + d.eventEndDate
    )
    d3.selectAll('.aleph-hmiToolTipImpact-label').html('<span>' + 'Impact: ' + '</span>' + d.Impact)
    d3.selectAll('.aleph-hmiToolTipLikelihood-label').html('<span>' + 'Likelihood: ' + '</span>' + d.Likelihood)
    d3.selectAll('.aleph-hmiToolTipComment-label').html('<span>' + 'Comment: ' + '</span>' + d.comment)

    return
  } // end function cursorCoords

  // calculate timeline width and heights for focus and context
  width = aleph.windowWidth - aleph.margin.left - aleph.margin.right
  height = aleph.timeLineHeight - aleph.margin.top - aleph.margin.bottom
  height2 = aleph.timeLineHeight - aleph.margin2.top - aleph.margin2.bottom

  // append new main title to group element
  appendTo
    .append('text')
    .attr('class', 'aleph-panelTechTitle' + ' ' + panel.technology)
    .attr('x', aleph.margin.left + 50)
    .attr('y', 25)
    .text(panel.technologyName)

  appendTo
    .append('svg:image')
    .attr('class', 'showHideIcon icon-hide FID' + panel.technology)
    .attr('id', 'showHideIcon-' + panel.technology)
    .attr('xlink:href', `${rootPath}image/hide.svg`)
    .attr('x', aleph.windowWidth - aleph.margin.right)
    .attr('y', -5)
    .attr('width', 40)
    .attr('height', 40)
    .style('display', function () {
      if (aleph.technologyCounter == 1) {
        return 'none'
      } else {
        return 'inline'
      }
    })
    .on('mousedown', function () {
      d3.event.stopPropagation()
      event.stopPropagation()

      if (d3.select(this).classed('icon-hide')) {
        d3.select('#' + this.id)
          .classed('icon-hide', false)
          .classed('icon-show', true)
          .attr('xlink:href', `${rootPath}image/show.svg`)
      } else {
        d3.select('#' + this.id)
          .classed('icon-hide', true)
          .classed('icon-show', false)
          .attr('xlink:href', `${rootPath}image/hide.svg`)
      }
      showHideTechnologyTimeLine(this)
      return
    })

  appendTo
    .append('svg:image')
    .attr('class', 'aleph-techIcon FID' + panel.technology)
    .attr('id', 'aleph-techIcon-' + panel.technology)
    .attr('xlink:href', function () {
      if (aleph.iconPlacement == 'top') {
        return `${rootPath}image/svg/white/wFID${panel.technology}.svg`
      } else if (aleph.iconPlacement == 'bottom') {
        return `${rootPath}image/svg/black/bFID${panel.technology}.svg`
      }
    })
    .attr('x', function () {
      if (aleph.iconPlacement == 'top') {
        return aleph.margin.left
      } else if (aleph.iconPlacement == 'bottom') {
        return 65
      }
    })
    .attr('y', function () {
      if (aleph.iconPlacement == 'top') {
        return -0.5
      } else if (aleph.iconPlacement == 'bottom') {
        return aleph.timeLineHeight - (aleph.timeLineHeight - aleph.margin2.top) - 5
      }
    })
    .attr('width', function () {
      if (aleph.iconPlacement == 'top') {
        return 32.5
      } else if (aleph.iconPlacement == 'bottom') {
        return 75
      }
    })
    .attr('height', function () {
      if (aleph.iconPlacement == 'top') {
        return 32.5
      } else if (aleph.iconPlacement == 'bottom') {
        return 75
      }
    })
    .on('mouseover', function () {
      if (aleph.technologyCounter == 1) {
        d3.select(this)
          .classed('aleph-handles-no-pointer-events', true)
          .classed('aleph-grabbing', false)
          .classed('aleph-grab', false)
      } else {
        d3.select(this)
          .classed('aleph-handles-no-pointer-events', false)
          .classed('aleph-grabbing', false)
          .classed('aleph-grab', false)
      }
    })
    .on('mousedown', function () {
      d3.event.stopPropagation()

      if (aleph.technologyCounter > 1) {
        navFunc(CharacterToCharacter(technologies[panel.technology].slug))
      } else {
        d3.select(this).style('pointer-events', 'none')
      }
      return
    })

  appendTo
    .append('svg:image')
    .attr('class', 'checkBoxRect canClick FID' + panel.technology)
    .attr('id', 'checkBoxRect-' + panel.technology)
    .attr('xlink:href', `${rootPath}image/tick-off.svg`)
    .attr('x', 150)
    .attr('y', aleph.timeLineHeight - (aleph.timeLineHeight - aleph.margin2.top) + 5)
    .attr('width', 50)
    .attr('height', 50)
    .style('display', function () {
      if (aleph.technologyCounter == 1) {
        return 'none'
      } else {
        return 'inline'
      }
    })
    .on('mouseover', function () {
      d3.selectAll('title').remove()

      d3.selectAll('.checkBoxRect.FID' + panel.technology)
        .append('title')
        .text(function () {
          if (d3.selectAll('.checkBoxRect.FID' + panel.technology).classed('canClick')) {
            return 'Click here to SNAP all timelines to this selected interval.'
          } else if (d3.selectAll('.checkBoxRect.FID' + panel.technology).classed('clicked')) {
            return 'Click here to REVERT all other timelines to their original state.'
          } else {
            return 'You cannot currently click here.'
          }
        })
    })
    .on('mousedown', function () {
      d3.event.stopPropagation()
      event.stopPropagation()

      if (d3.select(this).classed('clicked')) {
        // modify CSS classname definitions of all checkboxes
        d3.selectAll('.checkBoxRect')
          .classed('canClick', true)
          .classed('cannotClick', false)
          .classed('clicked', false)
          .attr('xlink:href', `${rootPath}image/tick-off.svg`)

        // call function to snap all brushes to technolgoy distinct time interval.
        aleph.brushExtentType = 'revertTo'
        snapXAxes(panel, aleph.brushExtentType)
      } else {
        // modify CSS classname defintions of all checkboxes
        d3.selectAll('.checkBoxRect')
          .classed('canClick', false)
          .classed('cannotClick', true)
          .attr('xlink:href', `${rootPath}image/cross.svg`)

        // modify CSS classname definitions of selected checkbox
        d3.select(this)
          .classed('cannotClick', false)
          .classed('canClick', false)
          .classed('clicked', true)
          .attr('xlink:href', `${rootPath}image/tick-on.svg`)

        // call function to snap all brushes to same time interval.
        aleph.brushExtentType = 'snapTo'
        snapXAxes(panel, aleph.brushExtentType)
      }
      return
    })

  // initialise start and end date key variables for time interval information
  aleph.selectedTechnologies[panel.technology].currentInterval.start = null
  aleph.selectedTechnologies[panel.technology].currentInterval.end = null
  aleph.selectedTechnologies[panel.technology].sourceInterval.start = null
  aleph.selectedTechnologies[panel.technology].sourceInterval.end = null
  aleph.selectedTechnologies[panel.technology].baseInterval.start = null
  aleph.selectedTechnologies[panel.technology].baseInterval.end = null

  if (aleph.technologyCounter == 1) {
    d3.selectAll('.checkBoxRect').style('display', 'none')
    d3.selectAll('.aleph-container').style('height', '450px')
    d3.select('#aleph-outerContainer').style('overflow-y', 'auto').style('overflow-x', 'hidden')
    aleph.allowDrag = false
  } else {
    d3.selectAll('.checkBoxRect').style('display', 'inline')
    aleph.allowDrag = true
  }

  // https://github.com/d3/d3-time-format
  // var parseDate = d3.timeParse("%b %Y");
  // 01/01/2000 // Aug-09
  // var parseDate = d3.timeParse("%b-%y");
  // initialise D3 axes for x and y domains
  x = d3.scaleTime().range([0, width])
  x2 = d3.scaleTime().range([0, width])
  y = d3.scaleBand().rangeRound([height, 0]).padding(0.0)
  y2 = d3.scaleBand().rangeRound([height2, 0]).padding(0.0)
  xAxis = d3.axisBottom(x)
  xAxis2 = d3.axisBottom(x2)
  yAxis = d3.axisLeft(y)

  // construct context chart brush
  brush = d3
    .brushX()
    .extent([
      [0, 0],
      [width, height2],
    ])
    .on('brush', brushed) // while brushing on context menu
    .on('end', brushed) // Each time the brush selection changes, trigger the 'brushed' function

  // append 'clip path' to truncate view of SVG DOM to charting space
  appendTo
    .append('defs')
    .append('clipPath')
    .attr('class', 'clip FID' + panel.technology)
    .attr('id', 'clip')
    .append('rect')
    .attr('width', aleph.windowWidth + aleph.margin.right)
    .attr('height', height)

  // append upper focus chart specific to base SVG panel
  focus = appendTo
    .append('g')
    .attr('class', 'focus FID' + panel.technology)
    .attr('transform', 'translate(' + aleph.margin.left + ',' + aleph.margin.top + ')')

  // append lower context chart specific to base SVG panel
  context = appendTo
    .append('g')
    .attr('class', 'context FID' + panel.technology)
    .attr('transform', 'translate(' + aleph.margin2.left + ',' + aleph.margin2.top + ')')

  // locally store panel data as data.
  data = panel.values
  aleph.data = sort_by_key(data, 'eventType')

  function sort_by_key(array, key) {
    return array.sort(function (a, b) {
      var x = a[key]
      var y = b[key]
      return x < y ? -1 : x > y ? 1 : 0
    })
  }

  // detemine start value for timeline extent as each new technology is added.
  // Allows all timeline x axes to be updated so that all data can be assured to be shown.
  aleph.timeLineAxisMinYear = d3.min([
    aleph.timeLineAxisMinYear,
    Number(
      d3.min(aleph.data, function (d) {
        return d.eventStartDate
      })
    ),
  ])

  // detemine end value for timeline extent as each new technology is added.
  // Allows all timeline x axes to be updated so that all data can be assured to be shown.
  aleph.timeLineAxisMaxYear = d3.max([
    aleph.timeLineAxisMaxYear,
    Number(
      d3.max(aleph.data, function (d) {
        return d.eventEndDate
      })
    ),
  ])

  // updates values for sourceInterval start/end based on event information for selected technology
  aleph.selectedTechnologies[panel.technology].sourceInterval.start = parseDate(
    Number(
      d3.min(aleph.data, function (d) {
        return d.eventStartDate
      })
    )
  )
  aleph.selectedTechnologies[panel.technology].sourceInterval.end = parseDate(
    Number(
      d3.max(aleph.data, function (d) {
        return d.eventEndDate
      })
    )
  )

  // updates x axis domain based on technology start and end dates and preset padding to add additional time padding to ends of axes
  x.domain([
    parseDate(aleph.timeLineAxisMinYear - Number(aleph.timeLineAxisPadding)),
    parseDate(aleph.timeLineAxisMaxYear + Number(aleph.timeLineAxisPadding)),
  ])

  aleph.selectedTechnologies[panel.technology].baseInterval.start = parseDate(
    aleph.timeLineAxisMinYear - Number(aleph.timeLineAxisPadding)
  )
  aleph.selectedTechnologies[panel.technology].baseInterval.end = parseDate(
    aleph.timeLineAxisMaxYear + Number(aleph.timeLineAxisPadding)
  )

  // extract out what the current selcted sorting mechanism is nased on hich HTML button has a class of 'aleph-sortOption'
  // allow suser to have sorted on different field between adding additional timelines
  var currentSelectedSortOrder = 'eventType'

  // construct y-axis domain.
  y.domain(
    aleph.data
      .map(function (d) {
        return d[currentSelectedSortOrder]
      })
      .sort(d3.ascending)
  )

  // constructs x and y axese of context charts based on state of focus axes.
  x2.domain(x.domain())
  y2.domain(y.domain())

  // append x axis 'g' element to timeline focus chart.
  focus
    .append('g')
    .attr('class', 'axis axis--x FID' + panel.technology)
    .attr('transform', 'translate(0,' + height + ')')
    .call(xAxis)

  // add full-height x-axis ticks at major tick intervals.
  var xticks = d3
    .selectAll('.focus.FID' + panel.technology)
    .selectAll('.axis.axis--x.FID' + panel.technology)
    .selectAll('.tick')

  xticks
    .append('svg:line')
    .attr('class', 'xAxisTicks' + ' FID' + panel.technology)
    .attr('y0', 0)
    .attr('y1', -height)
    .attr('x1', 0)
    .attr('x2', 0)

  // append y axis 'g' element to timeline focus chart.
  focus
    .append('g')
    .attr('class', 'axis axis--y FID' + panel.technology)
    .call(yAxis)

  // add full-width y-axis ticks at offsets to category tick intervals.
  var yticks = d3
    .selectAll('.focus')
    .selectAll('.axis.axis--y.FID' + panel.technology)
    .selectAll('.tick')

  yticks
    .append('svg:line')
    .attr('class', 'yAxisTicks' + ' FID' + panel.technology)
    .attr('y1', y.bandwidth() / 2)
    .attr('y2', y.bandwidth() / 2)
    .attr('x1', x(x.domain()[0]))
    .attr('x2', x(x.domain()[1]))

  // call x axis defintion on focus chart
  d3.selectAll('.focus.FID' + panel.technology)
    .selectAll('.axis.axis--x')
    .call(xAxis)

  // call x axis defintion on context chart
  d3.selectAll('.context.FID' + panel.technology)
    .selectAll('.axis.axis--x')
    .call(xAxis2)

  var ticks = d3.selectAll('.axis.axis--x').selectAll('.tick text').style('display', 'inline')

  ticks.each(function (_, i) {
    if (i % 2 !== 0 && aleph.windowWidth < 992) {
      d3.select(this).style('display', 'none')
    }
  })

  aleph.eventRectHeight = y.bandwidth() / 3
  aleph.counter = 0

  // append aleph.data rectangles to upper focus chart, based on technology selected
  focus
    .selectAll('.focusBar')
    .data(aleph.data)
    .enter()
    .append('rect')
    .attr('class', function (d) {
      return (
        'focusBar event FID' +
        panel.technology +
        ' ' +
        SpaceToCharacter(d.eventType, '-') +
        ' ' +
        'GLOBAL_UID-' +
        d['GLOBAL_UID']
      )
    })
    .attr('id', function (d) {
      return 'event-' + d['GLOBAL_UID']
    })
    .attr('x', function (d) {
      return x(parseDate(d.eventStartDate))
    })
    .attr('y', function (d) {
      if (d.eventType == aleph.previousEventType) {
        aleph.counter++
      } else {
        aleph.counter = 0
      }

      aleph.previousEventType = d.eventType

      if (aleph.counter % 3 == 0) {
        return y(d[currentSelectedSortOrder]) + y.bandwidth() / 2 - 0.5 * aleph.eventRectHeight
      } else if (aleph.counter % 2 == 0) {
        return y(d[currentSelectedSortOrder]) + y.bandwidth() / 2 - 1.5 * aleph.eventRectHeight
      } else {
        return y(d[currentSelectedSortOrder]) + y.bandwidth() / 2 + 0.5 * aleph.eventRectHeight
      }
    })
    .attr('width', function (d) {
      return x(parseDate(d.eventEndDate)) - x(parseDate(d.eventStartDate))
    })
    .attr('height', aleph.eventRectHeight)
    .on('mouseout', function (d) {
      d3.selectAll('.aleph-hmiToolTip-Div').classed('aleph-hide', true)

      if (displayLabelsValue) {
        d3.selectAll('.eventLabel').classed('aleph-hide', false)
      } else {
        d3.select('#eventLabel-' + d['GLOBAL_UID']).classed('aleph-hide', true)
      }

      return
    })
    .on('mousedown', function (d) {
      d3.event.stopPropagation()

      return
    })
    .on('mousemove', function (d, i) {
      buildToolTipContent()

      //  aleph-tooltip-content
      // call function to update coordinates and position of tooltip

      // D3 v4
      var x = d3.event.pageX
      var y = d3.event.pageY

      // call function to update coordinates and position of tooltip
      cursorCoords(d, x, y)

      return
    })
    .on('mouseover', function (d) {
      if (displayLabelsValue) {
        d3.select('#' + this.id).moveToFront()
        d3.selectAll('.eventLabel').classed('aleph-hide', true).moveToFront()

        d3.select('#eventLabel-' + d['GLOBAL_UID']).classed('aleph-hide', false)
      } else {
        d3.select('#' + this.id).moveToFront()
        d3.select('#eventLabel-' + d['GLOBAL_UID'])
          .classed('aleph-hide', false)
          .moveToFront()
      }

      return
    })

  // append aleph.data rectangle text labels to upper focus chart, based on technology selected
  focus
    .selectAll('.focusBarText')
    .data(aleph.data)
    .enter()
    .append('text')
    .attr('class', function (d) {
      return (
        'aleph-hide focus focusBar eventLabel FID' +
        panel.technology +
        ' ' +
        SpaceToCharacter(d.eventType, '-') +
        ' ' +
        'GLOBAL_UID-' +
        d['GLOBAL_UID']
      )
    })
    .attr('id', function (d) {
      return 'eventLabel-' + d['GLOBAL_UID']
    })
    .attr('x', function (d) {
      return x(parseDate(d.eventStartDate))
    })
    .attr('dx', 5)
    .attr('dy', '0.75rem')
    // JITTER
    .attr('y', function (d) {
      // https://stackoverflow.com/questions/14320053/how-does-this-line-of-code-work-d3-js-opacity-function
      // Basically, if j is not equal to i, return 0.2, else return 1.
      //  return j != i ? 0.2 : 1;

      // even counter positioned above y-axis horzizon
      // odd counter positioned below y-axis horzizon;

      if (d.eventType == aleph.previousEventType) {
        aleph.counter++
      } else {
        aleph.counter = 0
      }

      aleph.previousEventType = d.eventType

      if (aleph.counter % 3 == 0) {
        return y(d[currentSelectedSortOrder]) + y.bandwidth() / 2 - 0.5 * aleph.eventRectHeight
      } else if (aleph.counter % 2 == 0) {
        return y(d[currentSelectedSortOrder]) + y.bandwidth() / 2 - 1.5 * aleph.eventRectHeight
      } else {
        return y(d[currentSelectedSortOrder]) + y.bandwidth() / 2 + 0.5 * aleph.eventRectHeight
      }
    })
    .text(function (d) {
      return d.Event
    })

  // boolean check to show or not show event rectangle labels
  if (displayLabelsValue) {
    d3.selectAll('.eventLabel').classed('aleph-hide', false)
  } else {
  }

  // append x axis to lower context chart.
  context
    .append('g')
    .attr('class', 'axis axis--x FID' + panel.technology)
    .attr('transform', 'translate(0,' + height2 + ')')
    .call(xAxis2)

  // append data rectangles to lower context chart, based on technology selected
  context
    .selectAll('.contextBar')
    .data(aleph.data)
    .enter()
    .append('rect')
    .attr('class', function (d) {
      return (
        'context contextBar event FID' +
        panel.technology +
        ' ' +
        SpaceToCharacter(d.eventType, '-') +
        ' ' +
        'GLOBAL_UID-' +
        d['GLOBAL_UID']
      )
    })
    .attr('id', function (d) {
      return 'contextEvent-' + d['GLOBAL_UID']
    })
    .attr('x', function (d) {
      return x2(parseDate(d.eventStartDate))
    })
    .attr('y', function (d) {
      if (d.eventType == aleph.previousEventType) {
        aleph.counter++
      } else {
        aleph.counter = 0
      }

      aleph.previousEventType = d.eventType

      if (aleph.counter % 3 == 0) {
        return y2(d[currentSelectedSortOrder]) + y2.bandwidth() / 2 - 1.5
      } else if (aleph.counter % 2 == 0) {
        return y2(d[currentSelectedSortOrder]) + y2.bandwidth() / 2 - 3.0
      } else {
        return y2(d[currentSelectedSortOrder]) + y2.bandwidth() / 2 + 1.5
      }
    })
    .attr('width', function (d) {
      return x2(parseDate(d.eventEndDate)) - x2(parseDate(d.eventStartDate))
    })
    .attr('height', 3)

  // append D3 brushes to lower context chart
  context
    .append('g')
    .attr('class', 'brush FID' + panel.technology)
    .call(brush)
    .call(brush.move, x.range())

  /*
      NAME: brushed 
      DESCRIPTION: function called to handle user context brush interactions
      ARGUMENTS TAKEN: none
      ARGUMENTS RETURNED: none
      CALLED FROM: initial brush declaration and setup
      CALLS: none
  */
  function brushed() {
    var s
    s = d3.event.selection || x2.range()
    x.domain(s.map(x2.invert, x2))

    if (aleph.brushExtentType == 'revertTo') {
      // update values for .currentInterval start/end
      aleph.selectedTechnologies[panel.technology].currentInterval.start = x.domain()[0]
      aleph.selectedTechnologies[panel.technology].currentInterval.end = x.domain()[1]

      // after user has released the context brush, transition SVG event rectangles upper focus chart to new positions
      d3.selectAll('.focus.FID' + panel.technology)
        .selectAll('.event.FID' + panel.technology)
        .attr('x', function (d) {
          return x(parseDate(d.eventStartDate))
        })
        .attr('width', function (d) {
          return x(parseDate(d.eventEndDate)) - x(parseDate(d.eventStartDate))
        })

      // after user has released the context brush, transition SVG event labels upper focus chart to new positions
      d3.selectAll('.eventLabel.FID' + panel.technology).attr('x', function (d) {
        return x(parseDate(d.eventStartDate))
      })

      // after user has released the context brush, transition SVG x axis
      d3.selectAll('.focus.FID' + panel.technology)
        .selectAll('.axis.axis--x.FID' + panel.technology)
        .call(xAxis)

      // select all x-axis 'xAxisTicks' on currently interacted focus chart and remove from DOM/display
      d3.selectAll('.focus.FID' + panel.technology)
        .selectAll('.xAxisTicks')
        .remove()

      // select all x-axis ticks on currently interacted focus chart and add to DOM/display
      var xticks = d3
        .selectAll('.focus.FID' + panel.technology)
        .selectAll('.axis.axis--x.FID' + panel.technology)
        .selectAll('.tick')

      xticks
        .append('svg:line')
        .attr('class', 'xAxisTicks' + ' FID' + panel.technology)
        .attr('y0', 0)
        .attr('y1', -height)
        .attr('x1', 0)
        .attr('x2', 0)
    } // end if
    else {
      // after user has released the context brush, transition SVG event rectangles upper focus chart to new positions
      d3.selectAll('.focus')
        .selectAll('.event')
        .attr('x', function (d) {
          return x(parseDate(d.eventStartDate))
        })
        .attr('width', function (d) {
          return x(parseDate(d.eventEndDate)) - x(parseDate(d.eventStartDate))
        })

      // after user has released the context brush, transition SVG event labels upper focus chart to new positions
      d3.selectAll('.eventLabel').attr('x', function (d) {
        return x(parseDate(d.eventStartDate))
      })

      d3.selectAll('.selection')
        .attr('x', x2(x.domain()[0]))
        .attr('width', x2(x.domain()[1]) - x2(x.domain()[0]))
      d3.selectAll('.handle.handle--w').attr('x', x2(x.domain()[0]))
      d3.selectAll('.handle.handle--e').attr('x', x2(x.domain()[1]))

      // after user has released the context brush, transition SVG x axis
      d3.selectAll('.focus').selectAll('.axis.axis--x').call(xAxis)

      // select all x-axis 'xAxisTicks' on currently interacted focus chart and remove from DOM/display
      d3.selectAll('.focus').selectAll('.xAxisTicks').remove()

      // select all x-axis ticks on currently interacted focus chart and add to DOM/display
      var xticks = d3.selectAll('.focus').selectAll('.axis.axis--x').selectAll('.tick')

      xticks
        .append('svg:line')
        .attr('class', 'xAxisTicks')
        .attr('y0', 0)
        .attr('y1', -height)
        .attr('x1', 0)
        .attr('x2', 0)
    }

    return
  } // end function brushed

  // update classname definition for brush on selected focus chart.
  d3.selectAll('.brush.FID' + panel.technology)
    .selectAll('.selection')
    .classed('FID' + panel.technology, true)

  d3.selectAll('.brush.FID' + panel.technology)
    .selectAll('.handle')
    .attr('rx', 0)
    .attr('ry', 0)

  // select all technology icons and move the to the front
  var selection = d3.selectAll('.aleph-techIcon')
  selection.moveToFront()

  return
} // end function buildTimeLineChart

/*
    NAME: snapXAxes 
    DESCRIPTION: function called when user selects one specific checkbox associated to technology timeline,
                and snaps the time interval displayed on all other timelines to interval of selected technology
    ARGUMENTS TAKEN: info :
    ARGUMENTS RETURNED: none
    CALLED FROM: none
    CALLS: none
*/
function snapXAxes(info, snapType) {
  // console.log(info);

  // if user has selected a checkbox associated to a specific technology and associated timeline
  // UI will snap all timelines to same time inteval of teh slected technologies
  if (snapType == 'snapTo') {
    // localise storage of values for start and end time for timeframe of selected technology
    var start = info.currentInterval.start
    var end = info.currentInterval.end

    // update all x-axis domains to start and end time of selected technology
    x.domain([start, end])
    d3.selectAll('.focus').selectAll('.axis.axis--x').call(xAxis)

    // select all SVG event retangles and modify dimensions based on user interaction and selection of time interval to snap/revert to
    d3.selectAll('.focus')
      .selectAll('.focusBar.event')
      .attr('x', function (d) {
        return x(parseDate(d.eventStartDate))
      })
      .attr('width', function (d) {
        return x(parseDate(d.eventEndDate)) - x(parseDate(d.eventStartDate))
      })

    // select all SVG evetn retangles and modify positioning based on user interaction and selection of time interval to snap/revert to
    d3.selectAll('.focus')
      .selectAll('.focusBar.eventLabel')
      .attr('x', function (d) {
        return x(parseDate(d.eventStartDate))
      })

    // udpate positioning of d3 brush selection and handles
    // NEEDS IMPROVEMENT - NEXT USER INTERACTION RESETS/SNAPS BRUSH SELECTION POSITION BACK TO ORIGINAL LOCATION
    d3.selectAll('.selection')
      .attr('x', x2(x.domain()[0]))
      .attr('width', x2(x.domain()[1]) - x2(x.domain()[0]))

    d3.selectAll('.handle.handle--w').attr('x', x2(x.domain()[0])).classed('aleph-handles-no-pointer-events', true)
    d3.selectAll('.handle.handle--e').attr('x', x2(x.domain()[1])).classed('aleph-handles-no-pointer-events', true)

    d3.selectAll('.brush').classed('aleph-handles-no-pointer-events', true)
    d3.selectAll('.selection').classed('aleph-handles-no-pointer-events', true)
    d3.selectAll('.overlay').classed('aleph-handles-no-pointer-events', true)

    d3.selectAll('.brush.FID' + info.technology).classed('aleph-handles-no-pointer-events', false)
    d3.selectAll('.brush.FID' + info.technology)
      .selectAll('.handle')
      .classed('aleph-handles-no-pointer-events', false)
    d3.selectAll('.brush.FID' + info.technology)
      .selectAll('.overlay')
      .classed('aleph-handles-no-pointer-events', false)
    d3.selectAll('.selection.FID' + info.technology).classed('aleph-handles-no-pointer-events', false)
  } // end if ...

  // if user has de-selected a checkbox associated to a specific technology and associated timeline,
  // UI will revert all timelines back to their previous own state
  if (snapType == 'revertTo') {
    for (var item in aleph.selectedTechnologies) {
      // locally store selected technology name
      var technology = aleph.selectedTechnologies[item].technology

      // locally store start and end date values for teh current time interval
      var start = aleph.selectedTechnologies[item].currentInterval.start
      var end = aleph.selectedTechnologies[item].currentInterval.end

      // update positioing and dimension of SVG x axis  rectangle on focus chart
      x.domain([start, end])
      d3.selectAll('.focus.FID' + technology)
        .selectAll('.axis.axis--x.FID' + technology)
        .call(xAxis)

      // update positioing and dimension of all SVG event rectangle on focus chart
      d3.selectAll('.focus.FID' + technology)
        .selectAll('.focusBar.event')
        .attr('x', function (d) {
          return x(parseDate(d.eventStartDate))
        })
        .attr('width', function (d) {
          return x(parseDate(d.eventEndDate)) - x(parseDate(d.eventStartDate))
        })

      // update positioning of all all SVG event rectangle labels
      d3.selectAll('.focus.FID' + technology)
        .selectAll('.focusBar.eventLabel')
        .attr('x', function (d) {
          return x(parseDate(d.eventStartDate))
        })

      // update positioning and dimension of all '.selection' rectanlge on context chart
      d3.selectAll('.selection.FID' + technology)
        .attr('x', x2(start))
        .attr('width', x2(end) - x2(start))

      d3.selectAll('.brush.FID' + technology)
        .selectAll('.handle.handle--w')
        .attr('x', x2(start))
      d3.selectAll('.brush.FID' + technology)
        .selectAll('.handle.handle--e')
        .attr('x', x2(end))
    }

    d3.selectAll('.brush').classed('aleph-handles-no-pointer-events', false)
    d3.selectAll('.brush').selectAll('.handle').classed('aleph-handles-no-pointer-events', false)
    d3.selectAll('.brush').selectAll('.overlay').classed('aleph-handles-no-pointer-events', false)
    d3.selectAll('.selection').classed('aleph-handles-no-pointer-events', false)
  } else {
  }

  return
} // end snapXAxes

/*
    NAME: changeSortOrder 
    DESCRIPTION: function called when user changes sort order of y-axes on timeline charts. can be either categorical (event type) or ranking (H, M , L) 
    ARGUMENTS RECEIVED: fid - button information for sort order button selected by user
    ARGUMENTS RETURNED: none
    CALLED FROM: none
    CALLS: update_lineCoordinatesArray

    http://bl.ocks.org/johangithub/97a186c551e7f6587878
*/
function changeSortOrder(fid) {
  event.stopPropagation()

  // localise object to define 'style' of y-axis construct (either alphabetical for eventType or numeric ranking for Impact and Relevance)
  var fields = {
    eventType: 'alpha',
    Impact: 'rank',
    Likelihood: 'rank',
  }

  aleph.counter = 0

  // for each technology selected and displayed in list ...
  for (var technology in aleph.selectedTechnologies) {
    var data = aleph.selectedTechnologies[technology].values

    // modify CSS Classname declarations on sort order buttons.
    d3.selectAll('.aleph-sortOrder').classed('aleph-sortOption', false)
    d3.select('#' + fid.id).classed('aleph-sortOption', true)

    // SORT Y-AXIS BY EVENT TYPE, sort default ascending, alphabetic
    if (fid.id == 'eventType') {
      d3.selectAll('.aleph-legendBase').transition().duration(1250).ease(d3.easeLinear).style('opacity', 0.0)
      var sel = d3.selectAll('.aleph-legendBase')
      sel.moveToFront()

      y.domain(
        data
          .map(function (d) {
            return d[fid.id]
          })
          .sort(d3.ascending)
      )

      // copy y axis domain for Focus chart yo y axis domain of context chart
      y2.domain(y.domain())

      // transition y axis against new constraints
      d3.selectAll('.focus.FID' + technology)
        .selectAll('.axis.axis--y.FID' + technology)
        .transition()
        .duration(1250)
        .ease(d3.easeLinear)
        .call(yAxis)

      // select all y-axis ticks to update horizontal tick marks on
      var yticks = d3
        .selectAll('.focus.FID' + technology)
        .selectAll('.axis.axis--y.FID' + technology)
        .selectAll('.tick')

      // add new feint horizontal grid lines, offset by half category bandwidth
      yticks
        .append('svg:line')
        .attr('class', 'yAxisTicks' + ' FID' + technology)
        .attr('y1', y.bandwidth() / 2)
        .attr('y2', y.bandwidth() / 2)
        .attr('x1', x(x.domain()[0]))
        .attr('x2', x(x.domain()[1]))

      // transition all focus event rectangles against new constraints
      d3.selectAll('.focus')
        .selectAll('.focusBar.event.FID' + technology)
        .transition()
        .duration(1250)
        .ease(d3.easeLinear)
        .attr('y', function (d) {
          if (d.eventType == aleph.previousEventType) {
            aleph.counter++
          } else {
            aleph.counter = 0
          }

          aleph.previousEventType = d.eventType

          if (aleph.counter % 3 == 0) {
            return y(d[fid.id]) + y.bandwidth() / 2 - 0.5 * aleph.eventRectHeight
          } else if (aleph.counter % 2 == 0) {
            return y(d[fid.id]) + y.bandwidth() / 2 - 1.5 * aleph.eventRectHeight
          } else {
            return y(d[fid.id]) + y.bandwidth() / 2 + 0.5 * aleph.eventRectHeight
          }
        })

      // transition all focus event labels against new constraints
      d3.selectAll('.focus')
        .selectAll('.eventLabel.FID' + technology)
        .transition()
        .duration(1250)
        .ease(d3.easeLinear)
        .attr('y', function (d) {
          // JITTER
          // https://stackoverflow.com/questions/14320053/how-does-this-line-of-code-work-d3-js-opacity-function
          // Basically, if j is not equal to i, return 0.2, else return 1.
          //  return j != i ? 0.2 : 1;

          if (d.eventType == aleph.previousEventType) {
            aleph.counter++
          } else {
            aleph.counter = 0
          }

          aleph.previousEventType = d.eventType

          if (aleph.counter % 3 == 0) {
            return y(d[fid.id]) + y.bandwidth() / 2 - 0.5 * aleph.eventRectHeight
          } else if (aleph.counter % 2 == 0) {
            return y(d[fid.id]) + y.bandwidth() / 2 - 1.5 * aleph.eventRectHeight
          } else {
            return y(d[fid.id]) + y.bandwidth() / 2 + 0.5 * aleph.eventRectHeight
          }
        })

      // transition all rectangles event against new constraints
      d3.selectAll('.context')
        .selectAll('.contextBar.event.FID' + technology)
        .transition()
        .duration(1250)
        .ease(d3.easeLinear)
        .attr('y', function (d) {
          if (d.eventType == aleph.previousEventType) {
            aleph.counter++
          } else {
            aleph.counter = 0
          }

          aleph.previousEventType = d.eventType

          if (aleph.counter % 3 == 0) {
            return y2(d[fid.id]) + y2.bandwidth() / 2 - 1.5
          } else if (aleph.counter % 2 == 0) {
            return y2(d[fid.id]) + y2.bandwidth() / 2 - 3.0
          } else {
            return y2(d[fid.id]) + y2.bandwidth() / 2 + 1.5
          }
        })
    }

    // SORT Y-AXIS BY IMPACT   // SORT Y-AXIS BY RELEVANCE// SORT Y-AXIS BY IMPACT   // SORT Y-AXIS BY RELEVANCE// SORT Y-AXIS BY IMPACT   // SORT Y-AXIS BY RELEVANCE// SORT Y-AXIS BY IMPACT   // SORT Y-AXIS BY RELEVANCE// SORT Y-AXIS BY IMPACT   // SORT Y-AXIS BY RELEVANCE
    if (fid.id == 'Impact' || fid.id == 'Likelihood') {
      d3.selectAll('.aleph-legendBase').transition().duration(1250).ease(d3.easeLinear).style('opacity', 1.0)
      var sel = d3.selectAll('.aleph-legendBase')
      sel.moveToFront()

      // check to see if previous y axis sort type is same as newly selected sort type (e.g. both rank or both alpha)
      if (fid.id == 'Impact') {
        // update both y-axes
        y.domain(impact_Axis)
        y2.domain(y.domain())
        aleph.axisExtension = ' Impact'
      } // end if check...
      else if (fid.id == 'Likelihood') {
        // update both y-axes
        y.domain(likelihood_Axis)
        y2.domain(y.domain())
        aleph.axisExtension = ' Likelihood'
      } // end if check...
      else {
      }
      d3.selectAll('.focus')
        .selectAll('.axis.axis--y.FID' + technology)
        .transition()
        .duration(1250)
        .ease(d3.easeLinear)
        .call(yAxis)

      // transition y axis against new constraints
      d3.selectAll('.focus.FID' + technology)
        .selectAll('.axis.axis--y.FID' + technology)
        .transition()
        .duration(1250)
        .ease(d3.easeLinear)
        .call(yAxis)

      // select all y axis tick marks of all focus charts for updating
      var yticks = d3
        .selectAll('.focus.FID' + technology)
        .selectAll('.axis.axis--y.FID' + technology)
        .selectAll('.tick')

      // update positioning of horizontal y axis grid lines across each chart.
      yticks
        .append('svg:line')
        .attr('class', 'yAxisTicks' + ' FID' + technology)
        .attr('y1', y.bandwidth() / 2)
        .attr('y2', y.bandwidth() / 2)
        .attr('x1', x(x.domain()[0]))
        .attr('x2', x(x.domain()[1]))

      //Comparer Function
      function GetSortOrder(prop) {
        return function (a, b) {
          if (a[prop] > b[prop]) {
            return 1
          } else if (a[prop] < b[prop]) {
            return -1
          } else if (a['eventStartDate'] > b['eventStartDate']) {
            return 1
          } else if (a['eventStartDate'] > b['eventStartDate']) {
            return -1
          } else {
            return 0
          }
        }
      } // end function GetSortOrder

      var sortedData = data.sort(GetSortOrder(fid.id)) //Pass the attribute/data to be sorted on category value/rank (H, M, L)
      var eventGrade = data[0][fid.id] // extract out the y-axis category of the first event Type rectangle.
      var eventCounter = -1 // locally initialise event counter. Increments by 1 for each event type rect considered. Helps define if rect is above or below the y axis category horizon horizon.

      // for each eleement in sorted array
      sortedData.forEach(function (d, i) {
        // locally store element
        var sortedDataElement = d

        // if eventGrade of last element is same as this new event rect being considered, increment counter by 1, to position rect alternating above/below axis horizon
        if (eventGrade == sortedDataElement[fid.id]) {
          eventCounter++
        }
        // otherwise reset to zero and determine new y axis category value
        else {
          eventCounter = 0
          eventGrade = sortedDataElement[fid.id]
        }

        // select All event rectangles on all focus chart.
        d3.selectAll('.focus')
          .selectAll('.focusBar.event.FID' + technology + '.GLOBAL_UID-' + d['GLOBAL_UID'])
          .transition()
          .duration(1250)
          .ease(d3.easeLinear)
          .attr('y', function (d) {
            var element = d

            aleph.Type = element[fid.id]

            if (eventCounter % 3 == 0) {
              return y(element[fid.id] + aleph.axisExtension) + y.bandwidth() / 2 - 0.5 * aleph.eventRectHeight
            } else if (eventCounter % 2 == 0) {
              return y(element[fid.id] + aleph.axisExtension) + y.bandwidth() / 2 - 1.5 * aleph.eventRectHeight
            } else {
              return y(element[fid.id] + aleph.axisExtension) + y.bandwidth() / 2 + 0.5 * aleph.eventRectHeight
            }
          })

        // transition update all event SVG text labels on all upper focus charts againt new y-axis sort order.
        d3.selectAll('.focus')
          .selectAll('.eventLabel.FID' + technology + '.GLOBAL_UID-' + d['GLOBAL_UID'])
          .transition()
          .duration(1250)
          .ease(d3.easeLinear)
          .attr('y', function (d) {
            var element = d

            aleph.Type = element[fid.id]

            if (eventCounter % 3 == 0) {
              return y(d[fid.id] + aleph.axisExtension) + y.bandwidth() / 2 - 0.5 * aleph.eventRectHeight
            } else if (eventCounter % 2 == 0) {
              return y(d[fid.id] + aleph.axisExtension) + y.bandwidth() / 2 - 1.5 * aleph.eventRectHeight
            } else {
              return y(d[fid.id] + aleph.axisExtension) + y.bandwidth() / 2 + 0.5 * aleph.eventRectHeight
            }
          })

        // do the same for context chart rectangles.
        d3.selectAll('.context')
          .selectAll('.contextBar.event.FID' + technology + '.GLOBAL_UID-' + d['GLOBAL_UID'])
          .transition()
          .duration(1250)
          .ease(d3.easeLinear)
          .attr('y', function (d) {
            var element = d

            aleph.Type = element[fid.id]

            if (eventCounter % 3 == 0) {
              return y2(d[fid.id] + aleph.axisExtension) + y2.bandwidth() / 2 - 1.5
            } else if (eventCounter % 2 == 0) {
              return y2(d[fid.id] + aleph.axisExtension) + y2.bandwidth() / 2 - 3.0
            } else {
              return y2(d[fid.id] + aleph.axisExtension) + y2.bandwidth() / 2 + 1.5
            }
          })
      })
    }
  } // end for loop ...

  return
} // end function changeSortOrder

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
} // end function wrap()

/*
    NAME: displayLabels 
    DESCRIPTION: function to show/hide event rectangles.
    ARGUMENTS TAKEN:  fid
    ARGUMENTS RETURNED: none
    CALLED FROM: removeLinklines
    CALLS: none
*/
function displayLabels(fid) {
  event.stopPropagation()

  // modofy classname declaration based on previous classname modification
  if (fid) {
    d3.selectAll('.eventLabel').classed('aleph-hide', false)
  } else {
    d3.selectAll('.eventLabel').classed('aleph-hide', true)
    d3
  }

  // select all event rectangle labels and bring them to the front of the display; avoids overlap/masking by other elements
  var selection = d3.selectAll('.eventLabel')
  selection.moveToFront()

  return
} // end function displayLabels

/*
    NAME: resetAllTimelines 
    DESCRIPTION: function to snap reset all adjusted timelines back to full extent.
    ARGUMENTS TAKEN:  button
    ARGUMENTS RETURNED: none
    CALLED FROM: index.html
    CALLS: none
*/
function resetAllTimelines(button) {
  aleph.timeLineAxisMinYear = 3000 /* starting value to reduce from to determine and store minimum ingested event start year */
  aleph.timeLineAxisMaxYear = -3000 /* starting value to reduce from to determine and store maximum ingested event end year */

  for (var technology in aleph.selectedTechnologies) {
    // locally store start and end date values for teh current time interval
    var start = aleph.selectedTechnologies[technology].baseInterval.start
    var end = aleph.selectedTechnologies[technology].baseInterval.end

    // update positioing and dimension of SVG x axis  rectangle on focus chart
    x.domain([start, end])
    d3.selectAll('.focus.FID' + technology)
      .selectAll('.axis.axis--x.FID' + technology)
      .call(xAxis)

    // update positioing and dimension of all SVG event rectangle on focus chart
    d3.selectAll('.focus.FID' + technology)
      .selectAll('.focusBar.event')
      .attr('x', function (d) {
        return x(parseDate(d.eventStartDate))
      })
      .attr('width', function (d) {
        return x(parseDate(d.eventEndDate)) - x(parseDate(d.eventStartDate))
      })

    // update positioning of all all SVG event rectangle labels
    d3.selectAll('.focus.FID' + technology)
      .selectAll('.focusBar.eventLabel')
      .attr('x', function (d) {
        return x(parseDate(d.eventStartDate))
      })

    // update positioning and dimension of all '.selection' rectanlge on context chart
    d3.selectAll('.selection.FID' + technology)
      .attr('x', x2(start))
      .attr('width', x2(end) - x2(start))

    d3.selectAll('.brush.FID' + technology)
      .selectAll('.handle.handle--w')
      .attr('x', x2(start))
    d3.selectAll('.brush.FID' + technology)
      .selectAll('.handle.handle--e')
      .attr('x', x2(end))

    // append D3 brushes to lower context chart
    // append lower context chart specific to base SVG panel
    var context = d3.selectAll('.timeline-g-' + technology)

    context.call(brush).call(brush.move, x2.range())

    aleph.justResetTimelines = true
  }

  return
} // end function resetAllTimelines
