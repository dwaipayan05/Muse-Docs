import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/client'



export default async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getSession({req});
    if(!session)
        return res.status(401).json({error: 'not logged in'});
    //@ts-ignore
    res.status(200).json({"email": session.user["email"]}); 
}
    