import React from 'react'
import { ChallengeFamilyDictionary } from '../../../types/Global'

interface Props {
  families: ChallengeFamilyDictionary
  onClickFamilyTab(familyId: string): void
  selectedTab: string
}

export const FamilySideTabs = (props: Props) => {
  const { families, onClickFamilyTab, selectedTab } = props

  return (
    <>
      {Object.keys(families).map((key) => (
        <div
          onClick={() => onClickFamilyTab(key)}
          key={key}
          className={`ccl__all-family-tabs ccl__family-${key} ${selectedTab === key ? 'ccl__family-selected' : ''}`}
        >
          {families[key].familyName}
        </div>
      ))}
    </>
  )
}
