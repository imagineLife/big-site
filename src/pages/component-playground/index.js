import React from 'react'
import SentimentScoreLine from '../../components/sentimentScoreLine'
import './index.scss';

import mockSentimentScoreLineProps from './sentimentLineProps'

export default function ComponentPlayground() {
  return (
    <div id="component-playground">
      <SentimentScoreLine frameProps={mockSentimentScoreLineProps} />
    </div>
  )
}