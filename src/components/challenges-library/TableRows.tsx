import React from 'react'
import { Dictionary, ChallengeFamilyDictionary } from '../../../types/Global'

interface Props {
  challenges: { [key: string]: Dictionary }
  families: ChallengeFamilyDictionary
  selectedTab: string
}

export const TableRows = (props: Props) => {
  const { challenges, families, selectedTab } = props

  const familyChallenges = families[selectedTab].challenges

  return (
    <tbody>
      {familyChallenges.map((challengeId) => (
        <tr key={challengeId}>
          {Object.keys(challenges[challengeId]).map((header, i) => {
            if (header === 'id' || header === 'family') return null
            else
              return (
                <td
                  key={header}
                  className={`ccl__${header}__content ccl__all_table_data`}
                  scope={i === 0 ? 'col' : 'row'}
                >
                  {challenges[challengeId][header]}
                </td>
              )
          })}
        </tr>
      ))}
    </tbody>
  )
}
