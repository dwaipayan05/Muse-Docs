import { NextApiRequest, NextApiResponse } from 'next';
import { collection, query, where, getDocs } from "firebase/firestore";
//@ts-ignore
import {db} from '../../firebase/initfirebase';

const vader = require('vader-sentiment');

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const data = JSON.parse(req.body);
  const { email } = data;

  if (email && typeof email === 'string') {
    const q = query(collection(db, "MuseEntries"), where("email", "==", email));
    const querySnapshot = await getDocs(q);
    res.status(200).json({ querySnapshot });
  } else {
    res.status(500).end();
  }
};
