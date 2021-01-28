import React from 'react'
import { navigate } from 'gatsby'

export const ButtonHomeBottomRight = () => (
  <div className="button-group">
    <button className="button" onClick={() => navigate('/')}>
      Home
    </button>
  </div>
)
