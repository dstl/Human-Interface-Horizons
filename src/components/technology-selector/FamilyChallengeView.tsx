import React from 'react'

interface FamilyChallengeViewProps {
  name: string
  active?: boolean
  onPress: () => void
}

export function FamilyChallengeView(props: FamilyChallengeViewProps) {
  const { name, active, onPress } = props

  const className = active ? 'family-card-button active' : 'family-card-button'
  return (
    <p className={className} onClick={onPress}>
      {name}
    </p>
  )
}
