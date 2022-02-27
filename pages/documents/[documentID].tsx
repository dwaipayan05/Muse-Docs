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

  const JournalScreen = dynamic(
    () => import('../../components/typeScreen'),
    {
      ssr: false,
    }
  )

  useEffect(() => {
    if (typeof window !== 'undefined') {
      sampler.current = new Tone.Sampler({
        urls: {
          C1: 'C1.mp3',
          'D#1': 'Ds1.mp3',
          'F#1': 'Fs1.mp3',
          A1: 'A1.mp3',
          C2: 'C2.mp3',
          'D#2': 'Ds2.mp3',
          'F#2': 'Fs2.mp3',
          A2: 'A2.mp3',
          C3: 'C3.mp3',
          'D#3': 'Ds3.mp3',
          'F#3': 'Fs3.mp3',
          A3: 'A3.mp3',
          C4: 'C4.mp3',
          'D#4': 'Ds4.mp3',
          'F#4': 'Fs4.mp3',
          A4: 'A4.mp3',
          C5: 'C5.mp3',
          C6: 'C6.mp3',
        },
        release: 1,

        baseUrl: '/samples/',
        onload: () => setSamplerIsReady(true),
      }).toDestination()

      ambiencePlayer.current = new Tone.Player('/samples/ambient-sound.mp3', () =>
        setAmbienceIsReady(true)
      ).toDestination()
      ambiencePlayer.current.volume.value = -33
      ambiencePlayer.current.loop = true
    }
  }, [])

  function handlePlayClick() {
    Tone.start().then(() => {
      // Play the ambience:
      if (ambiencePlayer.current?.state !== 'started') {
        ambiencePlayer.current?.start()
      }
      loadingCoverRef.current!.style.transition = 'opacity 500ms ease-out'
      loadingCoverRef.current!.style.opacity = '0'

      setTimeout(() => {
        loadingCoverRef.current!.style.display = 'none'

        setTimeout(() => {
          let lastKeyTime = 0
          let runningSquish = 0
          const textArea = document.querySelector('textarea')

          if (textArea && entryData!.events) {
            for (const [time, event] of Object.entries(entryData!.events)) {
              let playTime = parseInt(time) - runningSquish
              const timeGap = playTime - lastKeyTime
              if (timeGap > 1000) {
                const timeSkipped = timeGap - 1000
                runningSquish += timeSkipped 
                playTime = playTime - timeSkipped
              }
              lastKeyTime = playTime

              if (persistEventIsSelection(event)) {
                setTimeout(() => {
                  textArea.setSelectionRange(
                    event.selectionStart,
                    event.selectionEnd
                  )
                }, playTime)
              } else if (persistEventIsKey(event)) {
                const keychar = event.key

                setTimeout(() => {
                  if (keychar === 'Backspace') {
                    if (textArea.selectionStart === textArea.selectionEnd) {
                      textArea.setSelectionRange(
                        textArea.selectionStart - 1,
                        textArea.selectionEnd
                      )
                    }
                    textArea.setRangeText('')
                  } else if (keychar === 'Enter') {
                    textArea.setRangeText(`\r\n`)
                    textArea.setSelectionRange(
                      textArea.value.length,
                      textArea.value.length
                    )
                  } else {
                    textArea.setRangeText(keychar)
                    textArea.setSelectionRange(
                      textArea.value.length,
                      textArea.value.length
                    )
                  }

                  for (const note of event.notes) {
                    setTimeout(() => {
                      sampler.current!.triggerAttackRelease(
                        [note.note],
                        note.duration,
                        undefined,
                        note.velocity
                      )
                    }, note.delayFromKeyPress)
                  }
                  textArea.scrollTop = textArea.scrollHeight
                }, playTime)
              }
            }
          }
        }, 500)
      }, 550)
    })
  }
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
