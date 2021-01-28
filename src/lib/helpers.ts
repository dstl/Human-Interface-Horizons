import {
  TechnologyDictionary,
  Challenge,
  ChallengeDictionary,
  ChallengeFamilyDictionary,
  Technology,
} from '../../types/Global'

export function cn(...args: any) {
  return args.filter(Boolean).join(' ')
}

export function mapEdgesToNodes(data: any) {
  if (!data.edges) return data ? data : []
  return data.edges.map((edge: any) => edge.node)
}

export function getChallengesDictionary(data: any) {
  let challenges: ChallengeDictionary = {}
  if (!data.edges) return data ? data : {}

  // challenges
  if (data.edges[0].node.challenge) {
    for (let i = 0; i < data.edges.length; i++) {
      challenges[data.edges[i].node.id] = data.edges[i].node
    }
    return challenges
  }
}

export function getChallengeFamiliesDictionary(familyData: any, challengeData: any) {
  let challengeFamilies: ChallengeFamilyDictionary = {}

  if (familyData.edges && challengeData.edges) {
    let familyNodes = mapEdgesToNodes(familyData)
    let challengeNodes = mapEdgesToNodes(challengeData)

    // challengeFamilies
    for (var familyNode of familyNodes) {
      let familyChallenges = challengeNodes
        .filter((challenge: Challenge) => challenge.family === familyNode.family)
        .map((challenge: Challenge) => {
          return challenge.id
        })

      challengeFamilies[familyNode.family] = {
        family: familyNode.family,
        familyName: familyNode.familyName,
        challenges: familyChallenges || [],
      }
    }
  }

  return challengeFamilies
}

export function getTechnologyDictionary(data: any) {
  let technologyDictionary: TechnologyDictionary = {}
  if (!data.edges) return data ? data : []

  if (data.edges[0].node.disruptiveness) {
    for (let i = 0; i < data.edges.length; i++) {
      technologyDictionary[data.edges[i].node.id] = data.edges[i].node
    }
    return technologyDictionary
  }
}

/**
 * ### Adds the techID to the challenge's associatedTech[]
 * @param challengeId ID of the challenge
 * @param techId Tech instance ID
 */
export function addTechToChallenge(challenges: ChallengeDictionary, challengeId: string, techId: string): void {
  // Creates empty associatedTech
  if (!challenges[challengeId].associatedTech) {
    challenges[challengeId].associatedTech = []
  }

  // Only adds if the id is not present
  if (!challenges[challengeId].associatedTech!.includes(techId)) {
    challenges[challengeId].associatedTech!.push(techId)
  }

  return
}

/**
 * ### Returns an array of techIds used to filter by Challenge
 * If challenge has no associated tech then [ ] is returned
 */
export const filterByChallenge = (challengeIds: string[], allTechIds: string[]): string[] => {
  let enabledTechIds: string[] = []

  allTechIds.map((id) => (challengeIds!.includes(id) ? enabledTechIds.push(id) : null))

  return enabledTechIds
}

export const createTabContent = (tech: Technology) => ({
  summary: {
    title: 'Summary',
    text: tech.summary,
    timetoeffect_optimistic: tech.timetoeffect_optimistic,
    timetoeffect_likely: tech.timetoeffect_likely,
    timetoeffect_pessimistic: tech.timetoeffect_pessimistic,
    exampleApplications: tech.example_applications,
    references: tech.references,
  },
  tabs: [
    {
      id: 'overview',
      title: 'Overview',
      content: tech.overview,
    },
    {
      id: 'implicationsDefenceSecurity',
      title: 'Implications for Defence & Security',
      content: tech.implicationsDefenceSecurity,
    },
    {
      id: 'softwareAndAiRequirements',
      title: 'Software / AI Requirements',
      content: tech.softwareAndAiRequirements,
    },
    {
      id: 'legalEthicalImplications',
      title: 'Legal/Ethical Implications',
      content: tech.legalEthicalImplications,
    },
    {
      id: 'strategicImpactAssessment',
      title: 'Strategic DLOD Impact Assessment',
      content: tech.strategicImpactAssessment,
    },
    {
      id: 'typeOfTechnology',
      title: 'Type of Technology',
      content: tech.typeOfTechnology,
    },
    {
      id: 'prominentDevelopers',
      title: 'Prominent Developers',
      content: tech.prominentDevelopers,
    },
  ],
})
