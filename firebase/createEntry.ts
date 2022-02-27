import { db } from './initFirebase';
import { collection, addDoc, serverTimestamp } from "firebase/firestore"; 
import { dbKeyPress, dbSelectionEvent } from './persistKeys';

export type Entry = {
  ip: string | null;
  latitude: string | null;
  longitude: string | null;
  email : string | null;
  image : string | null;
  name : string | null;
  privacy : boolean | null;
  events: Record<number, dbKeyPress | dbSelectionEvent>;
  created: number;
  updated: number;
};


export async function generateEntry({docName} : {docName:string}, {privacy} : {privacy : boolean}, {image_src} : {image_src : any}) {

  const locationData = await (await fetch('/api/getLocationByIp')).json();
  (window as any).ip = locationData.ip;

  const emailData = await (await fetch('/api/getEmail')).json();
  (window as any).email = emailData.email;

  const docRef =await addDoc(collection(db, "MuseEntries"), {
    name : docName || null,
    email: emailData?.email || null,
    ip: locationData?.ip || null,
    image : image_src || null,
    privacy : privacy || null,  
    latitude: locationData?.latitude || null,
    longitude: locationData?.longitude || null,
    keys: {},
    created: serverTimestamp(),
    updated: serverTimestamp(),
  });
  
  console.log(docRef)
  return docRef.id;
}
