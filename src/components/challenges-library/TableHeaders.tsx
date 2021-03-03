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
          <th className={`ccl__all-headers ccl__all-headers__${i}`} scope={i === 0 ? 'col' : 'row'} key={key}>
            <p className={`ccl__all-para`}>{titles[key]}</p>
          </th>
        ))}
      </tr>
    </thead>
  )
}
