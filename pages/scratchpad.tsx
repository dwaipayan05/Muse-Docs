import Header from '../components/Header'
import Login from '../components/Login'
import dynamic from 'next/dynamic';
//@ts-ignore
import Button from "@material-tailwind/react/Button";
import { providers, getSession } from 'next-auth/client'
import {useEffect, useRef, useState} from 'react'
import {useRouter} from 'next/router'
import * as Tone from 'tone';
import '../firebase/initFirebase';
import { generateEntry } from '../firebase/createEntry';
//@ts-ignore
import Modal from "@material-tailwind/react/Modal";
//@ts-ignore
import ModalHeader from "@material-tailwind/react/ModalHeader";
//@ts-ignore
import ModalFooter from "@material-tailwind/react/ModalFooter";
//@ts-ignore
import ModalBody from "@material-tailwind/react/ModalBody";
//@ts-ignore
import Input from "@material-tailwind/react/Input";
//@ts-ignore
import Checkbox from "@material-tailwind/react/Checkbox";
//@ts-ignore
Scratchpad.getInitialProps = async (context) => {
  return {
    //@ts-ignore
    providers: await providers(context),
    session: await getSession(context),
  }
}
const style = {
    startButton : `rounded px-3 py-2 m-1 border-b-4 border-l-2 bg-[#2196f3]-500 text-white`,
    startText : `text-3xl	text-gray-400 hover:text-gray-600`,   
    wrapper: `relative`,
    container: `before:content-[''] before:bg-red-500 before:absolute before:top-0 before:left-0 before:right-0 before:bottom-0 before:bg-[url('https://images.unsplash.com/photo-1528353518104-dbd48bee7bc4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1332&q=80')] before:bg-cover before:bg-center before:opacity-40 before:blur`,
    contentWrapper: `flex h-screen relative justify-center flex-wrap items-center`,
    copyContainer: `w-1/2`,
    title: `relative text-white text-[46px] font-bold`,
    description: `text-black container-[400px]  font-medium text-2xl mt-[0.8rem] mb-[2.5rem]`,
    ctaContainer: `flex`,
    accentedButton: ` relative text-lg font-semibold px-12 py-4 bg-[#2181e2] rounded-lg mr-5 text-white hover:bg-[#42a0ff] cursor-pointer`,
    button: ` relative text-lg font-semibold px-12 py-4 bg-[#363840] rounded-lg mr-5 text-[#e4e8ea] hover:bg-[#4c505c] cursor-pointer`,
    cardContainer: `rounded-[3rem]`,
    infoContainer: `h-20 bg-[#313338] p-4 rounded-b-lg flex items-center text-white`,
    author: `flex flex-col justify-center ml-4`,
    name: ``,
    infoIcon: `flex justify-end items-center flex-1 text-[#8a939b] text-3xl font-bold`,
}

//@ts-ignore
export default function Scratchpad({ providers, session }) { 

    const router = useRouter()
    const JournalScreen = dynamic(() => import('../components/typeScreen'), {ssr: false,});
    const startMessages = [
    `Take a moment.`,
    `Be your own beautiful self.`,
    `Lift the lighting to see the stars.`,
    `Take a breath.`,
    `Time will keep flowing.`,
    `Worried about the future ?`,
    `Missing someone from your past ?`,
    `Let it all out.`,
    `Begin !`,
     ];
    
    const sampler = useRef<Tone.Sampler>();
    const ambiencePlayer = useRef<Tone.Player>();
    const headlineRef = useRef<HTMLHeadingElement>(null);
    const loadingCoverRef = useRef<HTMLDivElement>(null);
    const [samplerIsReady, setSamplerIsReady] = useState(false);
    const [ambienceIsReady, setAmbienceIsReady] = useState(false);
    const [buttonClicked, setButtonClicked] = useState(false);
    const [docName, setDocumentName] = useState('Untitled');
    const [privacy, setPrivacy] = useState(false);
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
        }).toDestination();

      ambiencePlayer.current = new Tone.Player('/samples/ambient-sound.mp3', () => setAmbienceIsReady(true)).toDestination();
      ambiencePlayer.current.volume.value = -33;
      ambiencePlayer.current.loop = true;
      }}, []);

    useEffect(() => {
      let messageCounter = 1;
      clearInterval((window as any).buttonInterval);
      (window as any).buttonInterval = setInterval(() => {
        const newMessage = startMessages[messageCounter];
        headlineRef.current!.innerText = newMessage;
        messageCounter = messageCounter + 1;
        if (messageCounter > startMessages.length - 1) {
          messageCounter = 0;
        }
      }, 2600);
      return () => {
        clearInterval((window as any).buttonInterval);
      };}, []);
    
      function handleStartClick() {
          Tone.start().then(() => {
         // Play the ambience:
          if (ambiencePlayer.current?.state !== 'started') {
              ambiencePlayer.current?.start();
          }

      loadingCoverRef.current!.style.transition = 'opacity 500ms ease-out';
      loadingCoverRef.current!.style.opacity = '0';

      // Stop the button text from changing
      clearInterval((window as any).buttonInterval);

      setTimeout(() => {
        loadingCoverRef.current!.style.display = 'none';
        document.querySelector('textarea')?.focus();
      }, 550);
      
      generateEntry({docName}, {privacy}, {image_src}).then((newId) => {
        history.replaceState({ entryId: newId }, 'New entry', `documents/${newId}`);
      });
      setButtonClicked(true);
    });
  }
  
  const skipSplash = typeof router.query.write !== 'undefined';
  if (skipSplash) {
    //@ts-ignore
    function startAfterLoaded() {
      const ready = samplerIsReady && ambienceIsReady;
      if (ready) {
        handleStartClick();
      } else {
        requestAnimationFrame(startAfterLoaded);
      }
    }
    requestAnimationFrame(startAfterLoaded);
  }

  const ready = samplerIsReady && ambienceIsReady;
  const [showModal, setShowModal] = useState(false);
  
    if (!session) return <Login providers={providers} session={session} />
    const image_src = session.user['image']
    return(
        <>
        <Header profile_pic={image_src}/>
        {ready && buttonClicked && <JournalScreen documentName={docName} sampler={sampler.current!} imageSrc = {image_src} email={session.user.email}/>}
      <div ref={loadingCoverRef} className={style.wrapper}>
      <div className={style.container}>
        <div className={style.contentWrapper}>
          <div className={style.copyContainer}>
            <div className={style.title} ref={headlineRef}>
              {startMessages[0]}
            </div>
            <div className={style.description}>
              Scratchpad is a place to record your thoughts in a musical journal.
            </div>
            <div className={style.ctaContainer}>
              <button className={style.button}>Explore</button>
              <button className={style.accentedButton}
                        onClick={() => setShowModal(true)}
                        disabled={!ready}
              >{ready ? 'Create' : 'Loading'}</button>
            </div>
          </div>
          <div className={style.cardContainer}>
            <img
              className="rounded-t-lg"
              src="https://lh3.googleusercontent.com/tUmThHik6uGhvOHorfVdt49aNC4us7m-8gdYG6UsWJYf-VHtdRHcPSVnw-rX7cmCJOJUsoMO39ZpgRse1bgce4oea2yBNKJ-hye7yA=s550"
              alt=""
            />
            <div className={style.infoContainer}>
              <div className={style.author}>
                <div className={style.name}>Things will Work Out</div>
                <a
                  className="text-[#1868b7]"
                  href="https://opensea5cb7b5e/2324922113504035910649522729980423429926362207300810036887725141691069366277"
                >
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
        {/* }
        <section ref={loadingCoverRef}  className="bg-[#F8F9FA] px-10 pb-10 ">
            <div className="mx-auto max-w-3xl ">
                <div className="flex items-center justify-center mb-5 py-6">
                  <h1 className={style.startText} ref={headlineRef}>{startMessages[0]}</h1>
                </div>
                <div className="flex items-center justify-center py-6">
                  <Button className={style.startButton} 
                          ripple = "dark"
                          onClick={() => setShowModal(true)}
                          disabled={!ready}>
                          {ready ? 'Start Writing' : 'Loading'} </Button>
                </div>
                </div>
        </section> */}
        <Modal size="sm" active={showModal} toggler={() => setShowModal(false)}>
                <ModalHeader toggler={() => setShowModal(false)}>
                    Set Document Title
                </ModalHeader>
                <ModalBody>
                    <Input
                        className="mb-10"
                        type="text"
                        color="lightBlue"
                        size="regular"
                        outline={true}
                        placeholder="Muse Doc Title"
                        onChange={(e : any) => setDocumentName(e.target.value)}
                    />
                     <div className='mt-6 ml-1'>
                     <Checkbox
                        value={privacy}
                        color="green"
                        text={privacy ? "Private" : "Public"}
                        id="checkbox"
                        onChange={(e : any) => {{console.log(privacy); setPrivacy(e.target.checked)}}}
                    />
                    </div>
                </ModalBody>
                <ModalFooter>
                    
                    <Button 
                        color="red"
                        buttonType="link"
                        onClick={(e : any) => {setShowModal(false)}}
                        ripple="dark"
                    >
                        Close
                    </Button>

                    <Button
                        color="green"
                        onClick={() => {{handleStartClick(); setShowModal(false)}}}
                        ripple="light"
                    >
                        Create Document
                    </Button>
                </ModalFooter>
            </Modal>
        </>
    )
}