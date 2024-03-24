import React, { memo } from "react"
import Tab from "react-bootstrap/Tab"
import Tabs from "react-bootstrap/Tabs"
import Table from "./../../../Table"
import Labeling from "./../../routes/Labeling"
import BrowserAnalytics from "../BrowserAnalytics"
const MemoTablePreview = memo(function InnerTable({ data }) {
  return <Table data={data} className="nlp" firstFive />
})

export default function DataActionTabs({ data }) {
  return (
    <Tabs
      defaultActiveKey="preview"
      id="uncontrolled-tab-example"
      className="mb-3"
    >
      <Tab eventKey="preview" title="Preview">
        <h2>Data Preview</h2>
        <sub>
          <i>Below are the header & first 5 rows of the data.</i>
        </sub>
        <MemoTablePreview data={data} />
      </Tab>
      <Tab eventKey="labeling" title="Labeling">
        <Labeling data={data} />
      </Tab>
      <Tab eventKey="analysis" title="Analysis">
        <BrowserAnalytics data={data} />
      </Tab>
    </Tabs>
  )
}
