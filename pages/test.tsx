import Header from '../components/Header'
//@ts-ignore
import Button from "@material-tailwind/react/Button";
//@ts-ignore
import Icon from "@material-tailwind/react/Icon";
import { providers, getSession } from 'next-auth/client'
//@ts-ignore
import Card from "@material-tailwind/react/Card";
//@ts-ignore
import CardRow from "@material-tailwind/react/CardRow";
//@ts-ignore
import CardHeader from "@material-tailwind/react/CardHeader";
//@ts-ignore
import CardStatus from "@material-tailwind/react/CardStatus";
//@ts-ignore
import CardStatusFooter from "@material-tailwind/react/CardStatusFooter";
//@ts-ignore
import Modal from "@material-tailwind/react/Modal";
//@ts-ignore
import ModalHeader from "@material-tailwind/react/ModalHeader";
//@ts-ignore
import ModalBody from "@material-tailwind/react/ModalBody";
//@ts-ignore
import ModalFooter from "@material-tailwind/react/ModalFooter";

import { FacebookShareButton, TwitterShareButton } from 'react-share';
import { TwitterIcon, FacebookIcon } from 'react-share';

import {useState} from 'react';
//@ts-ignore
test.getInitialProps = async (context) => {
  return {
    //@ts-ignore
    providers: await providers(context),
    session: await getSession(context),
  }
}

const style = {
    mainSection : `flex flex-row my-10 mx-10 scroll-smooth`,
    textAreaWrapper : `w-1/2 min-h-screen p-4 mx-5 text-black`,
    textArea : `resize-none min-h-full min-w-full max-h-full max-w-full rounded-3xl px-10 py-10 text-2xl font-serif shadow-xl \
               focus-within:shadow-[0px_0px_56px_-16px_rgba(3,175,149,1)] focus-within:animate-pulse outline-none placeholder:sans-serif`,
    rSectionWrapper : `w-1/2 mx-5 min-h-screen`,
    rAboutBox : `mx-10 max-w-3xl h-32 mt-10 hover:shadow-xl`,
    rButtonBox : `mx-10 mt-10 flex flex-col items-center max-w-3xl h-96 bg-white shadow-xl rounded-3xl px-10 py-10 hover:shadow-2xl`,
    secButton : `mt-4 mb-4 mx-2.5 w-32 h-10 text-xl transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-blue-100 duration-300`,

}
//@ts-ignore
export default function test({ providers, session }) { 

    const image_src = session.user['image']
    const name = session.user['name']
    const [showAboutModal, setShowAboutModal] = useState(false);
    const [showShareModal, setShowShareModal] = useState(false);    
    return(
        <>
        <Header profile_pic={image_src}/>
        <div className= {style.mainSection}>
            <div className= {style.textAreaWrapper}>
                <textarea placeholder='Let it all Out.....' className={style.textArea}></textarea>
            </div>
            <div className = {style.rSectionWrapper}>
                <div className={style.rAboutBox}>
                    <Card>
                    <CardRow>
                        <CardHeader color="white" size="sm" iconOnly>
                                <img
                                loading="lazy"
                                className="cursor-pointer h-12 w-16 rounded-xl"
                                src= {image_src}
                                alt="Profile Picture"
                                />     
                        </CardHeader>
                        <CardStatus title="Scratchpad Author" amount={name} />
                    </CardRow>
                    <CardStatusFooter color="green" amount="Created At : " date="27-01-32 23:00:12">
                        <Icon color="green" name="access_time" />
                    </CardStatusFooter>
        </Card>
                </div>
                <div className = {style.rButtonBox}>
                        <Button className={style.secButton} rounded={false} buttonType="filled" color="lightBlue" ripple="light" onClick={(e : any) => setShowAboutModal(true)}>
                          About <Icon name="info" size="2xl" />
                        </Button>
                         <Button className={style.secButton}rounded={false} buttonType="filled" color="lightBlue" ripple="light">
                          New<Icon name="add_box" size="xl" />
                        </Button>
                        <Button className={style.secButton}rounded={false} buttonType="filled" color="lightBlue" ripple="light">
                          Replay <Icon name="replay" size="2xl" />
                        </Button>
                        <Button className={style.secButton}rounded={false} buttonType="filled" color="lightBlue" ripple="light" onClick={(e : any) => setShowShareModal(true)}>
                          Share <Icon name="share" size="2xl" />
                        </Button>
                        
                    </div>
            </div>
        </div>

        <Modal size="sm" active={showAboutModal} toggler={() => setShowAboutModal(false)}>
                <ModalHeader toggler={() => setShowAboutModal(false)}>
                   Muse Docs - Scratchpad
                </ModalHeader>
                <ModalBody>
                    <p className="text-base leading-relaxed text-justify text-gray-600 font-normal">
                      Sometimes you just have to take a deep breath, relax and let things go. Focus
                      on the things that matter most to you and let the rest go. The rest will work
                      itself out. Just take one step at a time. This place is for you to let all your
                      thoughts down with a pinch of peaceful chords to get you vibing.
                    </p>
                </ModalBody>
                <ModalFooter>
                    <Button 
                        color="red"
                        buttonType="link"
                        onClick={(e : any) => setShowAboutModal(false)}
                        ripple="dark"
                    >
                        View Code <Icon name="code" size="2xl" />
                    </Button>

                    <Button
                        color="green"
                        onClick={(e : any) => setShowAboutModal(false)}
                        ripple="light"
                    >
                        Close
                    </Button>
                </ModalFooter>
            </Modal>

             <Modal size="sm" active={showShareModal} toggler={() => setShowShareModal(false)}>
                <ModalHeader toggler={() => setShowShareModal(false)}>
                    Modal Title
                </ModalHeader>
                <ModalBody>
                    <p className="text-base leading-relaxed text-gray-600 font-normal">
                        I always felt like I could do anything. That’s the main thing people
                        are controlled by! Thoughts- their perception of themselves! They're
                        slowed down by their perception of themselves. If you're taught you
                        can’t do anything, you won’t do anything. I was taught I could do
                        everything.
                    </p>
                </ModalBody>
                <div className="flex items-center justify-center">
                <ModalFooter> 
                    
                        <TwitterShareButton url="www.google.com">
                            <TwitterIcon size = {45} round={true}/>
                        </TwitterShareButton>
                        <FacebookShareButton url="www.google.com">  
                            <FacebookIcon size = {45} round={true}/>
                        </FacebookShareButton>
                </ModalFooter>
                </div>
            </Modal>
        </>
    )
}