import { FileNode } from "gatsby-plugin-image/dist/src/components/hooks";

export interface Dictionary {
  [key: string]: string
}
export interface SideBarItem {
  associatedTech: string[]
}
export interface SideBarItemDictionary {
  [id: string]: SideBarItem
}

export enum ScriptType {
  css = 'css',
  js = 'js',
  svg = 'svg',
}

export interface ChallengeTechnologyLinkage {
  Individual_Cognitive_Challenge_Short_Name: string
  Technology_Name: string
  Linked_0_1: string
}
export interface Technology {
  id: string
  title: string
  slug: string
  icon: {
    publicURL: string
  }
  summary: string
  timetoeffect_optimistic: string
  timetoeffect_likely: string
  timetoeffect_pessimistic: string
  disruptiveness: string
  example_applications: string
  references: string
  implicationsDefenceSecurity: string
  softwareAndAiRequirements: string
  legalEthicalImplications: string
  strategicImpactAssessment: string
  typeOfTechnology: string
  prominentDevelopers: string
  sensory: string
  environment: string
  overview: string
  image: {
    publicURL: string
  }
}

export interface Challenge {
  id: string
  challenge: string
  ref: string
  family: string
  definition: string
  scenario: string
  domain: string
  horizon: string
  impact: string
  valence: string
  activity: string
  cognition: string
  challenges: string
  associatedTech: string[]
}

export interface ChallengeDictionary {
  [id: string]: Challenge
}

export interface ChallengeFamilyDictionary {
  [id: string]: ChallengeFamily
}

export interface ChallengeFamily {
  family: string
  familyName: string
  challenges: string[]
}

export interface ChallengesLibraryTitles {
  [header: string]: string
}

export interface TechnologyDictionary {
  [id: string]: Technology
}

export interface VisualisationSettings {
  groups: VisSettingsGroup[]
}

export interface VisSettingsGroup {
  title: string
  settings: {
    toggle: {
      maxToggled: string
      minToggled: string
      orderImportant: boolean
      positionLabels: boolean
    }
    submitButton?: VisualisationSettingsButton
    clearButton?: VisualisationSettingsButton
  }
  id: string
  buttons: VisualisationSettingsButton[]
}

export interface VisualisationSettingsButton {
  id: string
  type: string
  label: string
  action: string
  isToggled: boolean
  isDisabled: boolean
  labelOn?: string
  labelOff?: string
}

export interface ToggleState {
  [id: string]: {
    isToggledOn: boolean
    isDisabled: boolean
    type: string
    positionLabels: boolean
  }
}

export interface ToggledOrderStates {
  [id: string]: string[]
}

export interface ToggleConstraints {
  [id: string]: {
    type: string
    numberOfButtons: number
    minToggled: string
    maxToggled: string
    enabledIds: string[]
    orderImportant: boolean
  }
}

export interface SideBarMenuComponents {
  groupsAndButtons: JSX.Element[][]
  toggledStates: ToggleState
}

export interface ScriptFile {
  file: string
  remote?:boolean
}

export interface CSSFile {
  file: string
  remote?: boolean
}

// GRAPHQL's
export interface TechnologyQueryData {
  edges: {
    node: Technology
  }
}

export interface ChallengeFamilyQueryData {
  edges: {
    node: {
      family: string
      challenges: string
    }
  }
}

export interface ChallengeQueryData {
  edges: {
    node: {
      id: string
      challenge: string
      category: string
      ref: string
      domain: string
      horizon: string
      impact: string
      impactPn: string
      service: string
      scenario: string
      activity: string
      sosa: string
      areas: string
      blip1: string
      blip2: string
      blip3: string
      blip4: string
      blip5: string
      blip6: string
      blip7: string
      blip8: string
      blip9: string
      blip10: string
      blip11: string
      blip12: string
      blip13: string
      blip14: string
      conditions: string
    }
  }
}

export interface TechnologyMetaData {
  summary: TabSummary
  tabs: TabContent[]
}
export interface TabContent {
  id: string
  title: string
  content: string
}

export interface TabSummary {
  title: string
  text: string
  timetoeffect_optimistic: string
  timetoeffect_likely: string
  timetoeffect_pessimistic: string
  exampleApplications: string
  references: string
}

export interface LandingPageItem {
  id: string
  imageAltTxt: string
  name: string
  title: string
  subtitle: string
  imageName: string
}

export interface AllLandingPageCsvData {
  allLandingPageCsv: {
    edges: [
      {
        node: LandingPageItem
      }
    ]
  }
  landingImagesSmall: {
    edges: [
      {
        node: FileNode
      }
    ]
  }
  landingImagesMain: {
    edges: [
      {
        node: FileNode
      }
    ]
  }
}

export interface MarkdownQueryData {
  markdownRemark: {
    html: string
    frontmatter: {
      slug: string
      title: string
      style: string
      image: {
        publicURL: string
      }
    }
  }
  scenarioImage: FileNode
}

export interface ScenarioTitles {
  xTitleCenter: string
  xTitleLeft: string
  xTitleRight: string
  yTitleBottom: string
  ySubtitleBottom: string
  yTitleMiddle: string
  ySubtitleMiddle: string
  yTitleTop: string
  ySubtitleTop: string
}

export interface ScenarioData {
  edges: [
    {
      node: {
        id: string
        imageTitle: string
        className: string
        slug: string
        imageName: string
      }
    }
  ]
}
