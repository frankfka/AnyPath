import type { NextApiRequest, NextApiResponse } from 'next'
import appService from "../../../services/appService";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { recordId } = req.query;

  if (typeof recordId !== 'string') {
    throw Error("Invalid education record call params")
  }

  res.status(200).json(await appService.getEducationRecord(recordId))
}
