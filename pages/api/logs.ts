import { NextApiRequest, NextApiResponse } from 'next';
import { getLogs } from './../../utils/logs/parseLogs'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const logs = await getLogs();
  res.status(200).json(logs);
}