import React from 'react'
import { SidebarButton } from './SideBarButton'
import { SideBarItemDictionary } from '../../../types/Global'

interface Props {
  sideBarItemTitles: { titles: string[] }
  disruptiveDictionary: SideBarItemDictionary
  sensoryDictionary: SideBarItemDictionary
  environmentDictionary: SideBarItemDictionary
  onClickSideBarItem(sideBarTitle: { title: string }, isActive: boolean): void
}

export default function Sidebar(props: Props) {
  const { sideBarItemTitles, disruptiveDictionary, sensoryDictionary, environmentDictionary, onClickSideBarItem } = props

  return (
    <div>
      <div className="sidebar-container">
        <div className="sidebar-section">
          <div className="sidebar-header">Disruptiveness</div>
          {Object.keys(disruptiveDictionary).map((title, i) => {
            const isActive = sideBarItemTitles.titles.includes(title)
            return (
              <SidebarButton
                index={i}
                key={`${title}${i}`}
                isActive={isActive}
                title={title}
                groupTitle={'disruptiveness'}
                onClickSideBarItem={onClickSideBarItem}
              />
            )
          })}
        </div>
        <div className="sidebar-section">
          <div className="sidebar-header">Sensory</div>
          {Object.keys(sensoryDictionary).map((title, i) => {
            const isActive = sideBarItemTitles.titles.includes(title)
            return (
              <SidebarButton
                index={i}
                key={`${title}${i}`}
                isActive={isActive}
                title={title}
                groupTitle={'sensory'}
                onClickSideBarItem={onClickSideBarItem}
              />
            )
          })}
        </div>
        <div className="sidebar-section">
          <div className="sidebar-header">Environment</div>
          {Object.keys(environmentDictionary).map((title, i) => {
            const isActive = sideBarItemTitles.titles.includes(title)
            return (
              <SidebarButton
                index={i}
                key={`${title}${i}`}
                isActive={isActive}
                title={title}
                groupTitle={'environment'}
                onClickSideBarItem={onClickSideBarItem}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}
