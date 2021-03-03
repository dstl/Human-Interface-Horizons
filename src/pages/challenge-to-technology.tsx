import React from 'react'
import {
  ChallengeFamilyDictionary,
  ChallengeDictionary,
  ChallengeFamilyQueryData,
  ChallengeQueryData,
} from '../../types/Global'
import { getChallengeFamiliesDictionary, getChallengesDictionary } from '../lib/helpers'
import { graphql, Link, navigate } from 'gatsby'
import SEO from '../components/core/seo'
import Layout from '../components/core/layout'
import '../styles/challenge-to-tech.scss'
import { FixedHeaderOffset } from '../components/core/fixed-header-offset'

interface Props {
  data: {
    allCognitiveChallengeFamiliesCsv: ChallengeFamilyQueryData[]
    allCognitiveChallengesCsv: ChallengeQueryData[]
  }
}

export default function ChallengeToTech(props: Props) {
  const { data } = props

  const challengeFamilies: ChallengeFamilyDictionary = getChallengeFamiliesDictionary(
    data.allCognitiveChallengeFamiliesCsv,
    data.allCognitiveChallengesCsv
  )

  const challenges: ChallengeDictionary = getChallengesDictionary(data.allCognitiveChallengesCsv)

  const onChallengeFamilyPress = (familyId: string) => {
    navigate(`/challenge-to-technology-visualisation?family=FAMILY${familyId}`)
  }

  return (
    <Layout pageHeader="Technology to Future Challenge Mapping">
      <SEO title="Challenge to Technology" />
      <FixedHeaderOffset hasNavbar={true} />
      <div className="c-to-t__grid">
        <div className="c-to-t__grid-text">
          This page shows a series of defence-specific challenges which were extracted from a detailed analysis of a
          number of future vision documents. They represent challenges that could emerge from the future operating
          environment and are grouped into thematic families. Selecting a family of challenges will allow you to see the
          links between those challenges and any relevant HMI technologies. For further details of just the challenges
          themselves, click <Link to="/cognitive-challenge-library">here</Link>
        </div>
        <div className="c-to-t__families">
          {Object.keys(challengeFamilies).map((famId) => (
            <div key={famId} className="c-to-t__family-group" onClick={() => onChallengeFamilyPress(famId)}>
              <div className="c-to-t__family-grid-title">{challengeFamilies[famId].familyName}</div>
              <div className="c-to-t__challenge-grid">
                {challengeFamilies[famId].challenges.map((chalId) => (
                  <div key={chalId} className="c-to-t__challenge">
                    {challenges[chalId].challenge}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
}

export const challengesAndFamilys = graphql`
  {
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
  }
`
