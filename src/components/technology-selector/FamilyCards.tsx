import React from 'react'
import { ChallengeDictionary, ChallengeFamilyDictionary } from '../../../types/Global'
import { FamilyCardView } from './FamilyCardView'

interface FamilyCardsProps {
  activeFamilies: string[]
  cardHeaderHeight: number
  activeChallenges: string[]
  allChallenges: ChallengeDictionary
  challengeFamilies: ChallengeFamilyDictionary
  onChallengeFamilyPress: (familyId: string) => void
  onSetCardHeaderHeight: (height: HTMLHeadingElement) => void
  onChallengePress: (challengeId: string, familyId: string) => void
}

export default function FamilyCards(props: FamilyCardsProps) {
  const {
    allChallenges,
    activeFamilies,
    cardHeaderHeight,
    onChallengePress,
    activeChallenges,
    challengeFamilies,
    onSetCardHeaderHeight,
    onChallengeFamilyPress,
  } = props

  return (
    <div className="family-card-grid-wrapper">
      {Object.keys(challengeFamilies).map((id) => (
        <FamilyCardView
          key={id}
          familyId={id}
          allChallenges={allChallenges}
          family={challengeFamilies[id]}
          onChallengePress={onChallengePress}
          cardHeaderHeight={cardHeaderHeight}
          activeChallengeIds={activeChallenges}
          onFamilyPress={onChallengeFamilyPress}
          onSetCardHeaderHeight={onSetCardHeaderHeight}
          isFamilyActive={activeFamilies.includes(id) ? true : false}
        />
      ))}
    </div>
  )
}
