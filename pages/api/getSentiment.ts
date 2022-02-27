import { NextApiRequest, NextApiResponse } from 'next';
const vader = require('vader-sentiment');
export default (req: NextApiRequest, res: NextApiResponse) => {
  console.log(req.body)
  const data = JSON.parse(req.body);
  const { sample } = data;

  if (sample && typeof sample === 'string') {
    const sentiment = vader.SentimentIntensityAnalyzer.polarity_scores(sample).compound;
    console.log(sentiment);

    res.status(200).json({ sentiment });
  } else {
    res.status(500).end();
  }
};
