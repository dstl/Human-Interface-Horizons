import React, { useState, useEffect } from 'react'
import {
  Challenge,
  ChallengeDictionary,
  ChallengeFamilyDictionary,
  ChallengeFamilyQueryData,
  ChallengeTechnologyLinkage,
  ChallengeQueryData,
  SideBarItemDictionary,
  Technology,
  TechnologyQueryData,
} from '../../types/Global'
import {
  addTechToChallenge,
  getChallengeFamiliesDictionary,
  getChallengesDictionary,
  mapEdgesToNodes,
} from '../lib/helpers'
import _ from 'lodash'
import { graphql, navigate, withPrefix } from 'gatsby'
import SEO from '../components/core/seo'
import Layout from '../components/core/layout'
import Sidebar from '../components/technology-selector/Sidebar'
import FamilyCards from '../components/technology-selector/FamilyCards'
import SubmitButton from '../components/technology-selector/SubmitButton'
import ResetButton from '../components/technology-selector/ResetButton'
import TechnologyCards from '../components/technology-selector/TechnologyCards'
import '../styles/tech-selector-page.scss'
import {
  addSideBarItemTitleToArray,
  filterTechnologies,
  removeSideBarItemTitleFromArray,
} from '../components/technology-selector/filter-tech'
import { FileNode } from 'gatsby-plugin-image/dist/src/components/hooks'

interface Props {
  data: {
    allTechnologiesCsv: TechnologyQueryData[]
    allCognitiveChallengeFamiliesCsv: ChallengeFamilyQueryData[]
    allCognitiveChallengesCsv: ChallengeQueryData[]
    technologyImages: FileNode[]
    allChallengeTechnologyLinkagesCsv: ChallengeTechnologyLinkage[]
  }
}
interface CardHeaders {
  [refId: string]: { height: number }
}
export default function TechSelectorPage(props: Props) {
  const { data } = props

  // Page State
  const [cardHeaders, setCardHeaders] = useState<CardHeaders>({})
  const [activeFamilies, setActiveFamilies] = useState<string[]>([])
  const [cardHeaderHeight, setCardHeaderHeight] = useState<number>(0)
  const [activeChallenges, setActiveChallenges] = useState<string[]>([])
  const [explicitlyEnabledIds, setExplicitlyEnabled] = useState<string[]>([])
  const [disabledTechnologyIds, setDisabledTechnologyIds] = useState<string[]>([])
  const [sideBarTitles, setSideBarTitles] = useState<{ titles: string[] }>({ titles: [] })

  const height = typeof window != 'undefined' ? window.innerHeight : 1920
  const width = typeof window != 'undefined' ? window.innerWidth : 1080

  const [dimensions, setDimensions] = React.useState({
    height: height,
    width: width,
  })

  const handleResize = (fn: Function, ms: number) => {
    let timer: any
    return () => {
      clearTimeout(timer)
      timer = setTimeout((x) => {
        timer = null
        fn.apply(x, arguments)
        window.location.reload()
      }, ms)
    }
  }

  useEffect(() => {
    const resizeListener = handleResize(() => {
      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth,
      })
    }, 200)
    window.addEventListener('resize', resizeListener)
    return () => {
      window.removeEventListener('resize', resizeListener)
    }
  }, [dimensions])

  // This is the max and min number of tech to compare
  const techCompareMax = 5
  const techCompareMin = 2

  // Get data from CSV files
  const technologies: Technology[] = mapEdgesToNodes(data.allTechnologiesCsv)
  const challengeFamilies: ChallengeFamilyDictionary = getChallengeFamiliesDictionary(
    data.allCognitiveChallengeFamiliesCsv,
    data.allCognitiveChallengesCsv
  )
  const challenges: ChallengeDictionary = getChallengesDictionary(data.allCognitiveChallengesCsv)

  // Get tech images
  const technologyImages = mapEdgesToNodes(props.data.technologyImages)

  // Create 3 sub-sections for the sidebar
  const disruptiveDictionary: SideBarItemDictionary = {}
  const sensoryDictionary: SideBarItemDictionary = {}
  const environmentDictionary: SideBarItemDictionary = {}

  const challengeToTechnologyLinkages: ChallengeTechnologyLinkage[] = mapEdgesToNodes(
    props.data.allChallengeTechnologyLinkagesCsv
  )

  technologies.map((tech) => {
    let techChallenges = challengeToTechnologyLinkages
      .filter(
        // Get all rows that match this Technology and have a Linkage flag of 1
        (linkage: ChallengeTechnologyLinkage) => linkage.Technology_Name === tech.title && linkage.Linked_0_1 === '1'
      )
      .map(
        // Convert that row to a single Challenge ID by...
        (linkage: ChallengeTechnologyLinkage) => {
          // ...finding the Challenge object whose name matches the Short Name in the row
          let challengeObject = Object.values(challenges).find(
            (challengeObject: Challenge) =>
              challengeObject.challenge === linkage.Individual_Cognitive_Challenge_Short_Name
          )
          // And returning its ID
          return challengeObject?.id
        }
      )

    if (techChallenges) {
      techChallenges.forEach((challengeId?: string) => {
        if (challengeId) {
          addTechToChallenge(challenges, challengeId, tech.id)
        }
      })
    }

    let techDisruptiveness: string[] | null = tech.disruptiveness.match(/[^:]+/g)
    if (techDisruptiveness) {
      techDisruptiveness.forEach((disruptiveness: string) => {
        if (!disruptiveDictionary[disruptiveness]) {
          disruptiveDictionary[disruptiveness] = { associatedTech: [] }
        }
        disruptiveDictionary[disruptiveness].associatedTech.push(tech.id)
      })
    }

    let techSensory: string[] | null = tech.sensory.match(/[^:]+/g)
    if (techSensory) {
      techSensory.forEach((sensory: string) => {
        if (!sensoryDictionary[sensory]) {
          sensoryDictionary[sensory] = { associatedTech: [] }
        }
        sensoryDictionary[sensory].associatedTech.push(tech.id)
      })
    }

    let techEnvironment: string[] | null = tech.environment.match(/[^:]+/g)
    if (techEnvironment) {
      techEnvironment.forEach((environment: string) => {
        if (!environmentDictionary[environment]) {
          environmentDictionary[environment] = { associatedTech: [] }
        }
        environmentDictionary[environment].associatedTech.push(tech.id)
      })
    }
  })

  // Calculate the current available techs
  const enabledTechnologies = filterTechnologies(
    sideBarTitles.titles,
    activeChallenges,
    challenges,
    Object.keys(disruptiveDictionary),
    Object.keys(sensoryDictionary),
    Object.keys(environmentDictionary),
    technologies,
    disabledTechnologyIds,
    explicitlyEnabledIds
  )

  const submitEnabled = enabledTechnologies.length >= techCompareMin && enabledTechnologies.length <= techCompareMax
  const resetEnabled = (activeChallenges.length > 0 || sideBarTitles.titles.length > 0 || enabledTechnologies.length > 0);

  // Event handlers

  /**
   * When a specific challenge from within a family is pressed; add or remove where appropriate
   * @param challengeId
   */
  const onChallengePress = (challengeId: string, familyId: string) => {
    const challengesInFamily = challengeFamilies[familyId].challenges
    const isChallengeActive = activeChallenges.includes(challengeId)

    let counter = 0

    let editedChallenges: string[] = []

    if (isChallengeActive) {
      editedChallenges = activeChallenges.filter((c) => c !== challengeId)
      setActiveChallenges(editedChallenges)
    } else {
      editedChallenges = [...activeChallenges, challengeId]
      setActiveChallenges(editedChallenges)
    }

    editedChallenges.map((id) => (challengesInFamily.includes(id) ? counter++ : counter))

    const wholeFamilySelected = counter === challengesInFamily.length

    const familyAlreadyActive = activeFamilies.includes(familyId)

    if (wholeFamilySelected) !familyAlreadyActive ? setActiveFamilies([...activeFamilies, familyId]) : activeFamilies
    else familyAlreadyActive ? setActiveFamilies(activeFamilies.filter((e) => e !== familyId)) : activeFamilies
  }

  /**
   * When a whole family of challenges is pressed; add any remaining inactive challenges, or remove all if all are active.
   * @param familyId
   */
  const onChallengeFamilyPress = (familyId: string) => {
    if (activeFamilies.some((id) => id === familyId)) setActiveFamilies(activeFamilies.filter((e) => e !== familyId))
    else setActiveFamilies([...activeFamilies, familyId])

    const familyChallengeIds = challengeFamilies[familyId].challenges

    const inactiveChallengesFromFamily = familyChallengeIds.filter(
      (familyChallengeId) => !activeChallenges.some((ac) => ac === familyChallengeId)
    )
    if (inactiveChallengesFromFamily.length > 0) {
      setActiveChallenges((activeChallenges) => [...activeChallenges, ...inactiveChallengesFromFamily])
    } else {
      setActiveChallenges((activeChallenges) =>
        activeChallenges.filter((ac) => !familyChallengeIds.some((familyChallengeId) => ac === familyChallengeId))
      )
    }
  }

  /**
   * When a specific item from within a side-bar category is pressed; add or remove where appropriate
   * @param button
   */
  const onClickSideBarItem = (button: { title: string }): void => {
    const isActive = sideBarTitles.titles.some((t) => t === button.title)
    const editedTitles = isActive
      ? removeSideBarItemTitleFromArray(sideBarTitles.titles, button.title)
      : addSideBarItemTitleToArray(sideBarTitles.titles, button.title)
    setSideBarTitles({ titles: editedTitles })
  }

  /**
   * When a specific technology is selected - remove it from view
   * @param techId
   */
  const onClickTechItem = (techId: string): void => {
    const isActive = enabledTechnologies.includes(techId)
    const isDisabled = disabledTechnologyIds.includes(techId)
    const isExplicityEnabled = explicitlyEnabledIds.includes(techId)

    if (sideBarTitles.titles.length > 0 || activeChallenges.length > 0) {
      if (!isDisabled && !isExplicityEnabled && isActive) setDisabledTechnologyIds([...disabledTechnologyIds, techId])
      else if (isDisabled && !isExplicityEnabled)
        setDisabledTechnologyIds(disabledTechnologyIds.filter((c) => c !== techId))
      else if (isActive) setExplicitlyEnabled(explicitlyEnabledIds.filter((c) => c !== techId))
      else setExplicitlyEnabled([...explicitlyEnabledIds, techId])
    } else {
      if (isExplicityEnabled) setExplicitlyEnabled(explicitlyEnabledIds.filter((c) => c !== techId))
      else {
        setExplicitlyEnabled([...explicitlyEnabledIds, techId])
      }
        // setDisabledTechnologyIds((disabledTechnologyIds) =>
        //   isDisabled ? disabledTechnologyIds.filter((c) => c !== techId) : [...disabledTechnologyIds, techId]
        // )
    }
  }

  /**
   * Send user to the tech details page when they click on "To Library Page"
   * @param navToTechPage Tech name to link to page
   */
  const onClickTechLink = (navToTechPage: string) => window.open(withPrefix(`/technology/${navToTechPage}`), '_blank')

  const onClickReset = () => {
    setExplicitlyEnabled([]);
    setDisabledTechnologyIds([]);
    setSideBarTitles({titles: []});
    setActiveChallenges([]);
  }

  const onClickSubmit = () => {
    let params: string = ''

    enabledTechnologies.forEach((id) => {
      params = params.concat(`${id},`)
    })
    params = params.replace(/\,$/, '')
    navigate(`/technology-comparison-visualisation?technologies=${params}`)
  }

  const onSetCardHeaderHeight = (ref: HTMLHeadingElement) => {
    if (!ref.id || !ref.clientHeight) return
    if (cardHeaders[ref.id]) return

    setCardHeaders({
      ...cardHeaders,
      [ref.id]: {
        height: ref.clientHeight,
      },
    })
  }

  if (!cardHeaderHeight && cardHeaders['1']) {
    let highest = 0

    Object.keys(cardHeaders).map((refId) => {
      if (cardHeaders[refId].height > highest) highest = cardHeaders[refId].height
    })
    setCardHeaderHeight(highest)
  }

  return (
    <Layout title-="Aleph HMI" pageHeader="Technology Events Timeline">
      <SEO title="Tech Selector" />
      <div className="tech-selector-guidance">
        Use the filters below to select technologies that are relevant to different defence-specific challenges, or that
        are associated with different levels of disruptiveness, sensory modalities or operational environments. Once you
        have five or fewer technologies selected, submit to generate a series of comparative technology timeline
        visualisations.
      </div>
      <div className="tech-selector-container">
        <div className="tech-selector-main">
          <FamilyCards
            allChallenges={challenges}
            activeFamilies={activeFamilies}
            cardHeaderHeight={cardHeaderHeight}
            activeChallenges={activeChallenges}
            onChallengePress={onChallengePress}
            challengeFamilies={challengeFamilies}
            onSetCardHeaderHeight={onSetCardHeaderHeight}
            onChallengeFamilyPress={onChallengeFamilyPress}
          />
          <TechnologyCards
            technologies={technologies}
            onClickTechItem={onClickTechItem}
            onClickTechLink={onClickTechLink}
            technologyImages={technologyImages}
            enabledTechIds={enabledTechnologies}
            explicitlyEnabledIds={explicitlyEnabledIds}
            explicitlyDisabledIds={disabledTechnologyIds}
          />
        </div>
        <Sidebar
          sideBarItemTitles={sideBarTitles}
          sensoryDictionary={sensoryDictionary}
          onClickSideBarItem={onClickSideBarItem}
          disruptiveDictionary={disruptiveDictionary}
          environmentDictionary={environmentDictionary}
        />
      </div>
      <div className="tech-page-buttons">
        <SubmitButton onClickSubmit={onClickSubmit} isSubmitDisabled={!submitEnabled} buttonText="Submit" />
        <ResetButton onClickReset={onClickReset} isResetDisabled={!resetEnabled} buttonText="Reset" />
      </div>
    </Layout>
  )
}

export const TechnologyQuery = graphql`
  {
    allTechnologiesCsv {
      edges {
        node {
          id
          title
          slug
          disruptiveness
          sensory
          environment
          icon
        }
      }
    }
    technologyImages: allFile(filter: { relativePath: { regex: "/tech-images/icons/black/" } }) {
      edges {
        node {
          name
          childImageSharp {
            gatsbyImageData(layout: CONSTRAINED, placeholder: TRACED_SVG)
          }
        }
      }
    }
    allCognitiveChallengeFamiliesCsv {
      edges {
        node {
          family
          familyName
        }
      }
    }
    allCognitiveChallengesCsv {
      edges {
        node {
          id
          family
          challenge
        }
      }
    }
    allChallengeTechnologyLinkagesCsv {
      edges {
        node {
          Individual_Cognitive_Challenge_Short_Name
          Technology_Name
          Linked_0_1
        }
      }
    }
  }
`
