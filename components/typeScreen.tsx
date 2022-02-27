import React, { useRef, useCallback } from 'react'
import { melodies } from '../melodies'
import { toNote } from './utilMIDI'
// @ts-ignore
import { debounce } from 'lodash'
// @ts-ignore
import { throttle } from 'lodash'
import * as Tone from 'tone'
import {
  persistKeys,
  dbSelectionEvent,
  dbKeyPress,
} from '../firebase/persistKeys'
//@ts-ignore
import Button from '@material-tailwind/react/Button'
//@ts-ignore
import Icon from '@material-tailwind/react/Icon'
//@ts-ignore
import Card from '@material-tailwind/react/Card'
//@ts-ignore
import CardRow from '@material-tailwind/react/CardRow'
//@ts-ignore
import CardHeader from '@material-tailwind/react/CardHeader'
//@ts-ignore
import CardStatus from '@material-tailwind/react/CardStatus'
//@ts-ignore
import CardStatusFooter from '@material-tailwind/react/CardStatusFooter'
//@ts-ignore
import Modal from '@material-tailwind/react/Modal'
//@ts-ignore
import ModalHeader from '@material-tailwind/react/ModalHeader'
//@ts-ignore
import ModalBody from '@material-tailwind/react/ModalBody'
//@ts-ignore
import ModalFooter from '@material-tailwind/react/ModalFooter'
import { useState } from 'react'
import { useRouter } from 'next/router'
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from 'react-share'
import { TwitterIcon, FacebookIcon } from 'react-share'
const allNotes = [
  'C',
  'C#',
  'D',
  'D#',
  'E',
  'F',
  'F#',
  'G',
  'G#',
  'A',
  'A#',
  'B',
]
const scale = ['C', 'D', 'E', 'F', 'G', 'A', 'B']

const silentKeys: Record<string, boolean> = {
  Shift: false,
  Escape: false,
  Enter: false,
  Meta: false,
  Control: false,
  Alt: false,
  Tab: false,
  ' ': false,
  ArrowUp: false,
  ArrowDown: false,
  ArrowLeft: false,
  ArrowRight: false,
}

/** Don't persist these keys, we don't use them: */
const ignoreKeysForPersist = new Set([
  'Shift',
  'ArrowLeft',
  'ArrowUp',
  'ArrowRight',
  'ArrowDown',
  'Meta',
  'Escape',
  'Control',
  'Alt',
  'Tab',
  'CapsLock',
  'Home',
  'End',
])

type chord = string[]
const chords: Record<string, chord> = {
  Am: ['A2', 'E3', 'C3'],
  Am7: ['A2', 'E3', 'C4', 'G4'],
  Amaj9: ['A2', 'E3', 'B3'],
  C: ['C2', 'E3', 'G3'],
  Cmaj7: ['C3', 'E3', 'G4', 'B4'],
  Cmaj9: ['C2', 'E3', 'B3', 'D4'],
  Cmaj7NoRoot: ['E3', 'G4', 'B4'],
}
const chordKeys: Record<string, Array<chord>> = {
  '.': [chords.C, chords.Am, chords.Cmaj7],
  '!': [chords.Cmaj9, chords.Am7],
  '?': [chords.Cmaj7NoRoot],
}

type Props = {
  readonly?: boolean
  sampler: Tone.Sampler
  documentName: string
  imageSrc: string
  email : string
}

const style = {
  mainSection: `flex flex-row my-10 mx-10 scroll-smooth`,
  textAreaWrapper: `w-1/2 min-h-screen p-4 mx-5 text-black`,
  textArea: `resize-none min-h-full min-w-full max-h-full max-w-full rounded-3xl px-10 py-10 text-2xl font-serif shadow-xl \
               focus-within:shadow-[0px_0px_56px_-16px_rgba(3,175,149,1)] focus-within:animate-pulse outline-none placeholder:sans-serif`,
  rSectionWrapper: `w-1/2 mx-5 min-h-screen`,
  rAboutBox: `mx-10 max-w-3xl h-32 mt-10 hover:shadow-xl`,
  rButtonBox: `mx-10 mt-10 flex flex-col items-center max-w-3xl h-96 bg-white shadow-xl rounded-3xl px-10 py-10 hover:shadow-2xl`,
  secButton: `mt-4 mb-4 mx-2.5 w-32 h-10 text-xl transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-blue-100 duration-300`,
  secButtonDis: `mt-4 mb-4 mx-2.5 w-32 h-10 text-xl transition ease-in-out delay-150 hover:-translate-y-1 disabled:opacity-10`,
}

const JournalScreen = ({
  readonly = false,
  sampler,
  documentName,
  imageSrc,
  email,
}: Props) => {
  const noteIndex = useRef(0)
  const lastNotePlayed = useRef('C3')
  const [showAboutModal, setShowAboutModal] = useState(false)
  const unsavedPersists = useRef<Array<dbKeyPress | dbSelectionEvent>>([])
  const lastSelectionWasAtLength = useRef(true)
  const firstKeyPressTime = useRef(0)
  const currentSentiment = useRef(0.5)
  const router = useRouter()
  const { documentID } = router.query
  const [showShareModal, setShowShareModal] = useState(false)
  const currURL = 'www.musedocs.ai/documents/' + documentID


  
  //@ts-ignore
  return (
    <>
      <div className={style.mainSection}>
        <div className={style.textAreaWrapper}>
          <textarea
          ></textarea>
        </div>
        <div className={style.rSectionWrapper}>
          <div className={style.rAboutBox}>
            <Card>
              <CardRow>
                <CardHeader color="blue" size="sm" iconOnly>
                   <Icon color="white" size="3xl" name="bookmark_border" />
                </CardHeader>
                <CardStatus title="Scratchpad Title" amount={documentName} />
              </CardRow>
              <CardStatusFooter
                color="green"
                amount="Created At : "
                date={email}
              >
                <Icon color="green" name="access_time" />
              </CardStatusFooter>
            </Card>
          </div>
          <div className={style.rButtonBox}>
            <Button
              className={style.secButton}
              rounded={false}
              buttonType="filled"
              color="lightBlue"
              ripple="light"
              onClick={(e: any) => setShowAboutModal(true)}
            >
              About <Icon name="info" size="2xl" />
            </Button>
            <Button
              className={style.secButton}
              rounded={false}
              buttonType="filled"
              color="lightBlue"
              ripple="light"
              onClick={() => (window.location.href = '/scratchpad')}
            >
              New
              <Icon name="add_box" size="xl" />
            </Button>
            <Button
              className={style.secButton}
              rounded={false}
              buttonType="filled"
              color="lightBlue"
              ripple="light"
              onClick={(e: any) => window.location.reload()}
            >
              Replay <Icon name="replay" size="2xl" />
            </Button>
            <Button
              className={readonly ? style.secButton : style.secButtonDis}
              rounded={false}
              buttonType="filled"
              color="lightBlue"
              ripple="light"
              onClick={(e: any) => setShowShareModal(true)}
              disabled={!readonly}
            >
              Share <Icon name="share" size="2xl" />
            </Button>
          </div>
        </div>
      </div>

      <Modal
        size="sm"
        active={showAboutModal}
        toggler={() => setShowAboutModal(false)}
      >
        <ModalHeader toggler={() => setShowAboutModal(false)}>
          Muse Docs - Scratchpad
        </ModalHeader>
        <ModalBody>
          <p className="text-justify text-base font-normal leading-relaxed text-gray-600">
            Sometimes you just have to take a deep breath, relax and let things
            go. Focus on the things that matter most to you and let the rest go.
            The rest will work itself out. Just take one step at a time. This
            place is for you to let all your thoughts down with a pinch of
            peaceful chords to get you vibing.
          </p>
        </ModalBody>
        <ModalFooter>
          <Button
            color="red"
            buttonType="link"
            onClick={(e: any) => setShowAboutModal(false)}
            ripple="dark"
          >
            View Code <Icon name="code" size="2xl" />
          </Button>

          <Button
            color="green"
            onClick={(e: any) => setShowAboutModal(false)}
            ripple="light"
          >
            Close
          </Button>
        </ModalFooter>
      </Modal>
      <Modal
        size="sm"
        active={showShareModal}
        toggler={() => setShowShareModal(false)}
      >
        <ModalHeader toggler={() => setShowShareModal(false)}>
          Share
        </ModalHeader>
        <ModalBody>
          <p className="text-base font-normal leading-relaxed text-gray-600">
            Share your Scratchpad with your friends. Just Click on the link to share it to any of 
            the social media platforms. Don't forget to add the hashtag <strong>#MuseDocs</strong> to your post.
          </p>
        </ModalBody>
        <div className="flex items-center justify-center">
          <ModalFooter>
            <TwitterShareButton
              url={currURL}
              title={'Check out this Amazing Muse Doc I found out recently'}
            >
              <TwitterIcon size={45} round={true} />
            </TwitterShareButton>
            <WhatsappShareButton
              url={currURL}
              title={'Check out this Amazing Muse Doc I found out recently'}
            >
              <WhatsappIcon size={45} round={true} />
            </WhatsappShareButton>
            <FacebookShareButton
              url={currURL}
              quote={'Check out this Amazing Muse Doc I found out recently'}
            >
              <FacebookIcon size={45} round={true} />
            </FacebookShareButton>
          </ModalFooter>
        </div>
      </Modal>
    </>
  )
}

export default JournalScreen
