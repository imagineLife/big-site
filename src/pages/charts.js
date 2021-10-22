import React from 'react';
import getCharts from './../hooks/get-charts';
import BlogSectionPreview from './../components/BlogSectionPreview';
import './charts.scss';

export default function Charts() {
  const chartsArr = getCharts();

  return (
    <main id="chart-page">
      <h1>Charts</h1>
      <p>There are a bunch of chart types out there.</p>

      <h2>Consider The Goals</h2>
      <p>
        Charts might be the first place to look when considering visualizing
        information, but thinking of a chart before identifying the goal(s) of a
        chart can lead to misunderstanding of data, missed opportunity for clear
        communication, distrust in a process... a whole can of worms.
      </p>
      <p>
        Are there immediate questions being asked by end-users (
        <i>Stakeholders, End-Users,</i>)? These questions should be articulated
        among those developing hte content.
      </p>
      <h2>Consider The Effectivity of A Chosen Visualization</h2>
      <p>
        Some questions allude to other questions & follow-up questions can be
        worth considering. When a bar chart is showing the number of deliveries
        that several trucks make with the goal of showing the most & least
        active trucks, a slew of follow-up questions might follow: What are the
        attributes that are different between trucks with many deliveries and
        few deliveries, in order to remove any impediments from poor-delivery
        performance? What are the commonalities between all trucks that have few
        deliveries, in order to increase the number of deliveries per truck?
      </p>
      <h2>Consider The Audience</h2>
      <p>
        How will the consumer reception of a visualization be? Sometimes, charts
        can produce articulate results but require an undesirably high level of
        focus and cognitive load. Do the users of these visualizations{' '}
        <i>want to look at</i> a multi-sized bubble chart? Do the consumers{' '}
        <i>understand</i> small multiples or a scatterplot matrix? Is sufficient
        training going to be provided for those who are not literate in
        understanding these visualization?
      </p>

      <h2>Chart Types</h2>
      <ul className="alternating">
        {chartsArr?.map((ch, idx) => (
          <li key={`charts-${idx}`}>
            <BlogSectionPreview {...ch} />
          </li>
        ))}
      </ul>
    </main>
  );
}
