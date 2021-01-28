import React from 'react'
import { FamilyChallengeView } from './FamilyChallengeView'
import { ChallengeFamily, ChallengeDictionary } from '../../../types/Global'
export interface FamilyCardViewProps {
  familyId: string
  isFamilyActive: boolean
  family: ChallengeFamily
  cardHeaderHeight: number
  activeChallengeIds: string[]
  allChallenges: ChallengeDictionary
  onFamilyPress?: (familyId: string) => void
  onSetCardHeaderHeight: (height: HTMLHeadingElement) => void
  onChallengePress: (challengeId: string, familyId: string) => void
}

export function FamilyCardView(props: FamilyCardViewProps) {
  const {
    family,
    familyId,
    allChallenges,
    onFamilyPress,
    isFamilyActive,
    cardHeaderHeight,
    onChallengePress,
    activeChallengeIds,
    onSetCardHeaderHeight,
  } = props

  const cardView = (
    <div className={isFamilyActive ? 'family-card active' : 'family-card'}>
      <h4
        id={familyId}
        className={isFamilyActive ? 'active' : ''}
        ref={(ref) => (ref ? onSetCardHeaderHeight(ref) : null)}
        onClick={() => onFamilyPress?.(familyId)}
        style={{ height: cardHeaderHeight || 'fit-content' }}
      >
        {family.familyName}
      </h4>
      {family.challenges.map((challenge) => {
        const active = activeChallengeIds.some((id) => id === challenge)
        return (
          <FamilyChallengeView
            key={challenge}
            active={active}
            name={allChallenges[challenge].challenge}
            onPress={() => onChallengePress(challenge, familyId)}
          />
        )
      })}
    </div>
  )

  return cardView
}
