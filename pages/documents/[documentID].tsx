import * as Tone from 'tone'
import dynamic from 'next/dynamic'
import styled from '@emotion/styled'
import { useRouter } from 'next/router'
import Header from '../../components/Header'
import Login from '../../components/Login'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../../firebase/initFirebase'
import { Entry } from '../../firebase/createEntry'
import { providers, getSession } from 'next-auth/client'
import React, { useEffect, useState, useRef } from 'react'
import accessDenied from '../../components/accessDenied'

//@ts-ignore
import Icon from '@material-tailwind/react/Icon'
import {
  persistEventIsSelection,
  persistEventIsKey,
} from '../../firebase/persistKeys'


const style = {
  divStyle : `w-screen h-screen bg-white-200 z-40 opacity-95 flex items-center justify-center`,

}
const PlayButton = styled.button({
  outline: 'none',
  background: 'transparent',
  opacity: '0',
  cursor: 'pointer',
  padding: '30px',
  border: 0,
  transition: 'transform 1s ease-out, opacity 1s ease-out',
  '&:hover': {
    transform: 'scale(1.07)',
  },
  '&:active': {
    transform: 'scale(1.03)',
  },
})

//@ts-ignore
const documentPlayback = ({ providers, session }) => {
  const router = useRouter()
  const { documentID } = router.query

  const [entryData, setEntryData] = useState<Entry | null>(null)
  const [samplerIsReady, setSamplerIsReady] = useState(false)
  const [ambienceIsReady, setAmbienceIsReady] = useState(false)
  const [buttonReady, setButtonReady] = useState(false)
  const [documentName, setDocumentName] = useState(false)
  const [authorPic, setAuthorPic] = useState("https://i.stack.imgur.com/ZQT8Z.png")
  const [privacy, setPrivacy] = useState(false)
  const [authorMail, setAuthorMail] = useState("default@email.com")
  const sampler = useRef<Tone.Sampler>()
  const ambiencePlayer = useRef<Tone.Player>()
  const loadingCoverRef = useRef<HTMLDivElement>(null)

  
  useEffect(() => {
    if (documentID && typeof documentID === 'string') {
      getDoc(doc(db, 'MuseEntries', documentID)).then((entry) => {
        const entryData = entry.data() as Entry
        if (entryData) {
          setEntryData(entryData)
          //@ts-ignore
          setDocumentName(entryData.name)
          //@ts-ignore
          setAuthorPic(entryData.image)
          //@ts-ignore
          setPrivacy(entryData.privacy)
          //@ts-ignore
          setAuthorMail(entryData.email)
        }
      })
    }
  }, [documentID])

  const ready = samplerIsReady && ambienceIsReady
  if (!session) return <Login providers={providers} session={session} />
  const image_src = session.user['image']

  if(privacy && authorMail != session.user.email)
    return accessDenied()
  return (
    <>
      {!entryData && (
        <div
          style={{
            position: 'fixed',
            zIndex: 10,
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: '#fff',
          }}
        ></div>
      )}

      {privacy && authorMail != session.user.email &&(
        router.push('/accessDenied')
      )}

      <div
        onClick={() => ready && handlePlayClick()}
        ref={loadingCoverRef}
        className = {style.divStyle}
      >
        <Icon onClick={() => setButtonReady(true)} 
        className = "hover:cursor-loading" name="play_circle_filled" color="lightBlue" size="8xl"/>
        <p className='animate-pulse px-4 text-cyan-500 text-xl'>Sound On</p>
      </div>
     
      {//@ts-ignore 
       buttonReady && ready && <> <Header profile_pic={image_src} /> <JournalScreen readonly={true} sampler={sampler.current!} documentName={documentName} imageSr={authorPic} email={authorMail}/> </>}
    </> 
  );
};
export default documentPlayback;

//@ts-ignore
documentPlayback.getInitialProps = async (context) => {
  return {
    //@ts-ignore
    providers: await providers(context),
    session: await getSession(context),
  }
}
