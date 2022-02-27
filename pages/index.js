import Head from 'next/head'
import Image from "next/image"
import Login from '../components/Login'
import Header from '../components/Header'
import toast, { Toaster } from 'react-hot-toast'
import { providers, getSession } from 'next-auth/client'
import Icon from "@material-tailwind/react/Icon";
import Button from "@material-tailwind/react/Button";
import { collection, query, where, orderBy } from "firebase/firestore";
import { useEffect, useState} from 'react';
import { useRouter } from 'next/router';
import { db } from '../firebase/initFirebase'
import {useCollectionOnce} from 'react-firebase-hooks/firestore'

Home.getInitialProps = async (context) => {
  return {
    providers: await providers(context),
    session: await getSession(context),
  }
}


export default function Home({ providers, session }) {

  if (!session) return <Login />
  const museEntriesRef = collection(db, "MuseEntries")
  const q = query(museEntriesRef, where("email", "==", session.user["email"]), orderBy("created"))
  const [snapshot, loading, error] = useCollectionOnce(q);
  const router = useRouter()
  useEffect(() => {welcomeUser(session.user['name'])}, [session])
  const image_src = session.user['image']
  const welcomeUser = (userName, toastHandler = toast) => {
    toastHandler.success(`Welcome Back, ${userName} `, {
      style: {
        background: '#2196F3',
        color: 'white',
      },
    })
  } 

  const email = session.user['email']
  return (
    <div>
      <Head>
        <title>Muse Docs</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Toaster position="bottom-left" reverseOrder={false} />
      <Header profile_pic={image_src} />


      {/* Create Document Section */}
      <section className="bg-[#F8F9FA] px-10 pb-10 shadow-sm ">
        <div className="mx-auto max-w-3xl">
          <div className="flex items-center justify-between py-6">
            <h2 className="text-lg text-gray-700">Start A New Muse Document</h2>

            <Button
              color="gray"
              buttonType="outline"
              iconOnly={true}
              ripple="dark"
              className="border-0"
            >
              <Icon name="more_vert" size="3xl" />
            </Button>
          </div>

          <div className="flex items-center justify-between px-4">
            <div className="mx-5">
              <div className="relative h-52 w-40 cursor-pointer rounded-xl border-2 hover:border-blue-700">
                <Image
                  src="https://images.unsplash.com/photo-1598268641072-2f1a869b43d3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=743&q=80"
                  layout="fill"
                  className="rounded-xl"
                  onClick={() => router.push('/scratchpad')}
                />
              </div>
              <p className="ml-2 mt-2 text-sm font-semibold text-gray-700">
                Scratchpad
              </p>
            </div>

            <div className="mx-5">
              <div className="relative h-52 w-40 cursor-pointer rounded-xl border-2 hover:border-blue-700">
                <Image
                  src="https://images.unsplash.com/photo-1513666639414-f795d25747a8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=736&q=80"
                  layout="fill"
                  className="rounded-xl"
                />
              </div>
              <p className="ml-2 mt-2 text-sm font-semibold text-gray-700">
                Journal
              </p>
            </div>

            <div className="mx-5">
              <div className="relative h-52 w-40 cursor-pointer rounded-xl border-2 hover:border-blue-700">
                <Image
                  src="https://images.unsplash.com/photo-1586380951230-e6703d9f6833?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
                  layout="fill"
                  className="rounded-xl"
                />
              </div>
              <p className="ml-2 mt-2 text-sm font-semibold text-gray-700">
                Diary
              </p>
            </div>
          </div>
        </div>
      </section>

      {/*List Document Section */}
      <section className="bg-white px-10 md:px-0">
        <div className="mx-auto max-w-3xl">
          <div className="my-5 text-center px-5 py-5  bg-white-400 shadow-md rounded-xl hover:shadow-2xl">
            <p className='text-black text-xl '>List of Documents</p>
          </div>
          </div>
        <div className="mx-auto max-w-3xl shadow-xl hover:shadow-2xl rounded-2xl my-12">
          <table className="min-w-max w-full table-auto">
            <thead>
              <tr className ="bg-[#2196F3] text-white uppercase text-sm leading-normal">
                 <th className ="py-3 px-6 text-left">Doc Name</th>
                 <th className ="py-3 px-6 text-left">Last Updated</th>
                 <th className ="py-3 px-6 text-center">Status</th>
                 <th className ="py-3 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
            {snapshot?.docs.map((doc) => (
              <tr className ="border-b border-gray-200 hover:bg-gray-100">
                 <td className ="py-3 px-6 text-left whitespace-nowrap">
                   <div className ="flex items-center">
                     <span className ="font-medium">{doc.data().name}</span>
                   </div>
                 </td>
                 <td className ="py-3 px-6 text-left">
                   <div className ="flex items-center">
                      <span>{doc.data().updated?.toDate().toLocaleDateString()}</span>
                   </div>
                 </td>
                   <td className="py-3 px-6 text-center">
                    {doc.data().privacy ? <span className="bg-blue-200 text-blue-600 py-1 px-3 rounded-full text-xs">Private</span> : 
                     <span class="bg-cyan-200 text-cyan-600 py-1 px-3 rounded-full text-xs">Public</span>}
                      </td>
                   <td className ="py-3 px-6 text-center">
                                    <div className ="flex item-center justify-center">
                                        <div className ="w-4 mr-2 transform hover:text-blue-500 hover:scale-110">
                                            <svg onClick = {() => router.push({pathname: '/documents/[docID]', query : {docID : doc.id}}) } xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                        </div>
                                          <div className ="w-4 mr-2 transform hover:text-blue-500 hover:scale-110">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                            </svg>
                                        </div>
                                    </div>
                                </td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>

      </section>
    </div>
  )
}
