import React from 'react'
import { ChallengesLibraryTitles } from '../../../types/Global'

interface Props {
  titles: ChallengesLibraryTitles
}

export const TableHeaders = (props: Props) => {
  const { titles } = props
  return (
    <thead>
      <tr>
        {Object.keys(titles).map((key, i) => (
          <th scope={i === 0 ? 'col' : 'row'} key={key}>
            <p className={`ccl__all-headers ccl__${key}__title `}>{titles[key]}</p>
          </th>
        ))}
      </tr>
    </thead>
  )
}
