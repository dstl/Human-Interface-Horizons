import React, { useRef, useState } from 'react'
import Layout from '../components/core/layout'
import SEO from '../components/core/seo'
import { graphql } from 'gatsby'
import { TableHeaders } from '../components/challenges-library/TableHeaders'
import { TableRows } from '../components/challenges-library/TableRows'
import { FamilySideTabs } from '../components/challenges-library/FamilySideTabs'
import { getChallengeFamiliesDictionary, getChallengesDictionary } from '../lib/helpers'
import {
  ChallengeQueryData,
  ChallengeFamilyDictionary,
  ChallengeFamilyQueryData,
  ChallengesLibraryTitles,
} from '../../types/Global'
import '../styles/challenge-lib.scss'

interface Props {
  data: {
    dataJson: {
      challengesLibraryTitles: ChallengesLibraryTitles
    }
    allCognitiveChallengesCsv: ChallengeQueryData
    allCognitiveChallengeFamiliesCsv: ChallengeFamilyQueryData
  }
}
export default function CognitiveChallengeLibrary(props: Props) {
  const onLoadTab = '1'

  const [currentTab, setCurrentTab] = useState<string>(onLoadTab)

  const tableTitles = props.data.dataJson.challengesLibraryTitles

  const families: ChallengeFamilyDictionary = getChallengeFamiliesDictionary(
    props.data.allCognitiveChallengeFamiliesCsv,
    props.data.allCognitiveChallengesCsv
  )

  const challenges: any = getChallengesDictionary(props.data.allCognitiveChallengesCsv)

  const onClickFamilyTab = (familyId: string) => {
    if (currentTab !== familyId) {
      setCurrentTab(familyId)
      if (scrollDivRef && scrollDivRef.current) {
        scrollDivRef.current.scrollTop = 0
        scrollDivRef.current.scrollLeft = 0
      }
    }
  }

  const scrollDivRef = useRef<HTMLDivElement>(null)
  return (
    <Layout title-="Aleph HMI" pageHeader={'Future Cognitive Challenges Table'}>
      <SEO title="Future Cognitive Challenges Table" />
      <div className="ccl__container">
        <div className="ccl__grid">
          <p className="ccl__para">
            Select a family of defence-specific challenges on the left to display the corresponding information about
            its individual constituent future challenges.
          </p>
          <FamilySideTabs families={families} onClickFamilyTab={onClickFamilyTab} selectedTab={currentTab} />
          <div className="ccl__tech-grid">
            <div className="ccl__table" ref={scrollDivRef}>
            <table className="fixed-header fixed-column-one">
                <TableHeaders titles={tableTitles} />
                <TableRows challenges={challenges} families={families} selectedTab={currentTab} />
              </table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export const challenges = graphql`
  {
    dataJson {
      challengesLibraryTitles {
        challenge
        definition
        scenario
        domain
        horizon
        impact
        valence
        activity
        cognition
        challenges
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
          challenge
          definition
          scenario
          domain
          horizon
          impact
          valence
          activity
          cognition
          challenges
          id
          family
        }
      }
    }
  }
`
