import _ from 'lodash'
import { ChallengeDictionary, Technology } from '../../../types/Global'

export const isTechInEnabledArray = (id: string, enabledTechIds: string[]) => enabledTechIds.includes(id)

export const addSideBarItemTitleToArray = (sideBarTitles: string[], title: string) => {
  let editedTitles = [...sideBarTitles] || []
  sideBarTitles.includes(title) ? null : editedTitles.push(title)
  return editedTitles
}

export const addChallengeToArray = (id: string, activeChallenges: string[]) => {
  let editedIds = [...activeChallenges] || []
  activeChallenges.includes(id) ? null : editedIds.push(id)
  return editedIds
}

export const removeSideBarItemTitleFromArray = (sideBarTitles: string[], title: string): string[] => {
  const titles = sideBarTitles.filter((t) => t !== title)
  return titles
}

export const addTech = (id: string, enabledTechIds: string[]) => (enabledTechIds.includes(id) ? false : true)

export const editEnabledIds = (techId: string, enabledTechIds: string[]): string[] => {
  let editedIds = [...enabledTechIds]

  if (!isTechInEnabledArray(techId, enabledTechIds)) {
    // Adds
    editedIds.push(techId)
    return editedIds
  } else {
    // Removes
    editedIds = editedIds.filter((item) => item !== techId)
    return editedIds
  }
}

export const simpleFilterTechnologies = (technologies: Technology[], explicitlyEnabledIds: string[]): string[] => {
  const filteredTech = technologies.filter((tech) => {
    return explicitlyEnabledIds.includes(tech.id)
  })
  return _.uniqBy(filteredTech, 'id').map((obj) => obj.id)
}

const shouldFilterTechBasedOnSidebar = (sideBarTitles: string[], techValues: string, selectedTitles: string[]) => {
  // If nothing selected in this section, show everything
  if (selectedTitles.length === 0) return true;
  // Otherwise only show it if a title is selected that appears in the list for that tech
  let techValuesArray: string[] | null = techValues.match(/[^:]+/g)
  return (sideBarTitles.filter( sideBarTitle => techValuesArray?.includes(sideBarTitle)).length > 0)
}

export const filterTechnologies = (
  sideBarTitles: string[],
  activeChallenges: string[],
  challenges: ChallengeDictionary,
  disTitles: string[],
  senTitles: string[],
  envTitles: string[],
  technologies: Technology[],
  explicitlyDisabledIds: string[],
  explicitlyEnabledIds: string[]
): string[] => {
  let challengesArray: string[] = []

  activeChallenges.forEach((id) => {
    if (challenges[id].associatedTech?.length) {
      challenges[id].associatedTech!.map((techId) => {
        if (!challengesArray.includes(techId)) {
          challengesArray = challengesArray.concat(techId)
        }
      })
    }
  })

  const selectedDisruptiveTitles = disTitles.filter((title) => {
    return sideBarTitles.includes(title)
  })

  const selectedEnvironmentTitles = envTitles.filter((title) => {
    return sideBarTitles.includes(title)
  })

  const selectedSensoryTitles = senTitles.filter((title) => {
    return sideBarTitles.includes(title)
  })

  const filteredTech = technologies.filter((tech) => {
    // Special case - if no challenges and no sidebar filters selected - select NOTHING rather than EVERYTHING
    if (challengesArray.length === 0 && sideBarTitles.length === 0) {
      return explicitlyEnabledIds.includes(tech.id);
    }
    return (
      ((challengesArray.includes(tech.id) || challengesArray.length === 0) &&
        shouldFilterTechBasedOnSidebar(sideBarTitles, tech.disruptiveness, selectedDisruptiveTitles) &&
        shouldFilterTechBasedOnSidebar(sideBarTitles, tech.environment, selectedEnvironmentTitles) &&
        shouldFilterTechBasedOnSidebar(sideBarTitles, tech.sensory, selectedSensoryTitles) &&
        !explicitlyDisabledIds.includes(tech.id)) ||
      explicitlyEnabledIds.includes(tech.id)
    )
  })

  return _.uniqBy(filteredTech, 'id').map((obj) => obj.id)
}
