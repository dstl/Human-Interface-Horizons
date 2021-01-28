import React from 'react'
import ReactMarkdown from 'react-markdown'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import { TechnologyMetaData } from '../../../types/Global'
import '../../styles/tabs.scss'
import '../../styles/react-markdown-styles.scss'

interface Props {
  techMetaData: TechnologyMetaData
}

const SummaryPanel = (props: Props) => {
  const { techMetaData } = props
  if (!techMetaData || !techMetaData.summary) {
    return null
  }
  return (
    <div>
      <ReactMarkdown className="mdown__p__no-margin-top-bottom" source={techMetaData.summary.text} />
      <p />
      <b>Example applications</b>
      <ReactMarkdown className="mdown__p__no-margin-top-bottom" source={techMetaData.summary.exampleApplications} />
      <p />
      <ReactMarkdown
        className="mdown__p__no-margin-top-bottom"
        source={'**Time to Effect (most optimistic) :** ' + techMetaData.summary.timetoeffect_optimistic}
      />
      <ReactMarkdown
        className="mdown__p__no-margin-top-bottom"
        source={'**Time to Effect (most likely) :** ' + techMetaData.summary.timetoeffect_likely}
      />
      <ReactMarkdown
        className="mdown__p__no-margin-top-bottom"
        source={'**Time to Effect (most pessimistic) :** ' + techMetaData.summary.timetoeffect_pessimistic}
      />
      <p />
      <b>References</b>
      <ReactMarkdown source={techMetaData.summary.references} />
      <p />
    </div>
  )
}

export const MetaTabs = (props: Props) => {
  const { techMetaData } = props

  return (
    <div className="tech-details-meta-grid">
      <Tabs>
        <TabList>
          <Tab>{techMetaData.summary.title}</Tab>
          {techMetaData.tabs &&
            techMetaData.tabs.map((tab) => (
              <Tab className={`react-tabs__tab react-tabs__${tab.id}-tab`} key={tab.id}>
                {tab.title}
              </Tab>
            ))}
        </TabList>
        <TabPanel>
          <SummaryPanel techMetaData={techMetaData} />
        </TabPanel>
        {techMetaData.tabs &&
          techMetaData.tabs.map((tab) => (
            <TabPanel key={tab.id}>
              <div id={`${tab.id}-panel`}>
                <ReactMarkdown className="mdown__p__no-margin-top-bottom" source={tab.content} />
              </div>
            </TabPanel>
          ))}
      </Tabs>
    </div>
  )
}
