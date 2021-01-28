declare const window: any
import { ScriptFile, CSSFile, VisualisationSettings } from '../../../types/Global'
import React, { useRef, useEffect } from 'react'
import { useScript } from '../../lib/useScript'
import Helmet from 'react-helmet'
import ScriptJS from 'scriptjs'
import { navigate, withPrefix } from 'gatsby'
import { SliderMenuLeft } from '../slider-menu-left/SliderMenuLeft'
import { createD3SVG, renderVisualisationFunc } from '../visualisations/visualisation-functions'

interface Props {
  route: string
  title: string
  width: string
  height: string
  heightRatio: string
  rootPath: string
  renderFunction: string
  scripts: ScriptFile[]
  css: CSSFile[]
  params: any
  settings: VisualisationSettings
  isTechDetails?: boolean
}

export const Visualisation = (props: Props) => {
  let svg: any
  const {
    route,
    title,
    width,
    height,
    heightRatio,
    rootPath,
    renderFunction,
    scripts,
    css,
    params,
    settings,
    isTechDetails,
  } = props

  console.log('isTechDetails', isTechDetails)

  const domRef = useRef() as React.MutableRefObject<HTMLInputElement>

  let scriptStatuses: string[] = []
  useEffect(() => {
    if (typeof window !== `undefined`) {
      if (scriptStatuses.length > 0) {
        if (scriptStatuses.every((status) => status === 'ready')) {
          console.log('All scripts loaded, about to render')
          if (!svg) svg = createD3SVG(domRef.current, width, height, heightRatio)
          renderVisualisationFunc(svg, domRef.current, renderFunction, props.params, withPrefix(rootPath))
        }
      }

      return function cleanup() {
        if (svg) {
          svg.remove()
          svg = null
        }
      }
    }
  }, [route, height, width, scriptStatuses])

  const onClickNav = (navigateLink: string, groupId?: string): Promise<void> => {
    //TODO: Remove or comment out
    console.log(`\nToggle Clicked \n   navigateLink: ${navigateLink} \n   GroupID: ${groupId}\n\n`)
    return navigate(navigateLink)
  }

  const onClickFunc = (functionName: string, groupId?: string): void => {
    //TODO: Remove or comment out
    console.log(`\nFunction Button Clicked \n   functionName: ${functionName} \n   GroupID: ${groupId}\n\n`)
    if (window[functionName]) {
      window[functionName](groupId)
    } else {
      //TODO: Remove or comment out
      console.log("Couldn't find " + functionName)
    }
  }

  const onClickToggle = (id: string, groupId?: string, state?: boolean): void => {
    //TODO: Remove or comment out
    console.log(`\nToggle Clicked \n   ID: ${id} \n   GroupID: ${groupId} \n   State: ${state}\n\n`)
    if (window['onClickToggle']) {
      window['onClickToggle'](id, groupId, state)
    } else {
      //TODO: Remove or comment out
      console.log("Couldn't find onClickToggle")
    }
  }

  const onClickSubmit = (groupId: string, toggledStates: object[], orderedIds: string[]): void => {
    //TODO: Remove or comment out
    console.log(`\nSubmit Clicked \n   GroupID: ${groupId} \n   OrderedIds: [ ${orderedIds} ]\n\n`)
    if (window['onClickSubmit']) {
      window['onClickSubmit'](groupId, toggledStates, orderedIds)
    } else {
      //TODO: Remove or comment out

      console.log("Couldn't find onClickSubmit")
    }
  }

  const onClickClear = (groupId: string): void => {
    //TODO: Remove or comment out
    console.log(`\nClear Clicked \n   GroupID: ${groupId}\n\n`)
    if (window['onClickClear']) {
      window['onClickClear'](groupId)
    } else {
      //TODO: Remove or comment out
      console.log("Couldn't find onClickClear")
    }
  }

  if (typeof window !== `undefined`) {
    scripts.forEach((script) => {
      let file = script.remote ? script.file : withPrefix(script.file)
      let status = useScript(file)
      scriptStatuses.push(status)
    })
  }

  return (
    <div id="aleph-outerContainer">
      {settings && (
        <SliderMenuLeft
          sideBarToggleCallback={onClickToggle}
          sideBarNavCallback={onClickNav}
          sideBarFuncCallback={onClickFunc}
          onClickSubmit={onClickSubmit}
          onClickClear={onClickClear}
          settings={settings}
          toggleButtonTitle="Settings"
          whenOpenWidth="250px"
          isTechDetails={isTechDetails ? isTechDetails : false}
        ></SliderMenuLeft>
      )}
      <Helmet>
        {css.map((css, i) => {
          if (css.remote) {
            return <link key={i} rel="stylesheet" type="text/css" href={css.file} />
          }
          return <link key={i} rel="stylesheet" type="text/css" href={withPrefix(css.file)} />
        })}
      </Helmet>
      <div id="slider" className="aleph-slideRangeContainer">
        <div id="slider-range"></div>
      </div>
      <div id="chartDiv" className="aleph-container" ref={domRef}></div>
      <div id="tooltipDiv" className="aleph-hmiToolTip-Div aleph-hide" />
    </div>
  )
}
