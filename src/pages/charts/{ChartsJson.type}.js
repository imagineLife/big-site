import React, { useReducer } from 'react';
import { graphql } from 'gatsby';
import './chart-by-type.scss';

// components
import Drawer from '@mui/material/Drawer';

function chartReducer(state, action) {
  const reducerObj = {
    TOGGLE_DRAWER: () => ({
      ...state,
      drawerOpen: action.payload,
    }),
  };
  if (!reducerObj[action.type])
    throw new Error(`Called reducer with bad type ${action.type}`);
  return reducerObj[action.type]();
}

const initialChartState = {
  drawerOpen: false,
};
export default function ChartName({ data: { chartData, chartsSummary } }) {
  const [{ drawerOpen }, dispatch] = useReducer(
    chartReducer,
    initialChartState,
  );
  console.log('drawerOpen')
  console.log(drawerOpen)
  
  if(!chartData) return <p>loading...</p>

  return (
    <main className="chart-wrapper">
      <Drawer
        anchor={'left'}
        open={drawerOpen}
        onClose={() => dispatch({ type: 'TOGGLE_DRAWER', payload: false })}
      >
        sauce
      </Drawer>

      <h1>{chartData.title || 'A Chart'}</h1>
      {chartData.excerpt && <p>{chartData.excerpt}</p>}
      {chartData.usefor && <p>{chartData.usefor}</p>}
    </main>
  );
}

export const chartQuery = graphql`
  query ChartBySlug($slug: String) {
    chartData: chartsJson(slug: { eq: $slug }) {
      slug
      title
      usefor
      excerpt
      data: chartdata {
        xdomain
        ydomain
        values {
          x
          y
        }
      }
    }
    chartsSummary: allChartsJson {
      chart: nodes {
        slug
        title
      }
    }
  }
`;
