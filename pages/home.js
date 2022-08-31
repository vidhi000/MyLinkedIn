import Headerpart from "./Headerpart"
import Image from "next/image"
import Head from "next/head"
import React from "react"
import Sidebar from "../components/Siderbar"
import { useSession,getSession } from "next-auth/react"
import { useRouter } from "next/router";
import Feed from "../components/Feed";
import { useRecoilState } from "recoil";
import {modalState, modalTypeState} from "../atoms/modalAtom"
import { AnimatePresence } from "framer-motion"
import {connectToDatabase} from "../util/mongodb"
import { handlePostState } from "../atoms/postAtom";

import Form from "../components/Form"
// import Widgets from "../components"
 import Modal from "../components/Modal"


const Homemain = ({posts}) =>{
  console.log(posts)
  const [modalOpen, setModalOpen] = useRecoilState(modalState);
  const [modalType,setModalType] = useRecoilState(modalTypeState)


  const router = useRouter();
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      // The user is not authenticated, handle it here.
      router.push("/index");
    },
  });
// const {data:session} = useSession();
// console.log(session)

  return(<>
  <div className="bg-[#F3F2EF] dark:bg-black dark:text-white h-screen overflow-y-scroll md:space-y-6">
  <Headerpart/>
      <div className="grid grid-cols-3 ">
        
        <div>
       
      <Sidebar/>
          
        </div>
        <div className="mx-auto">
        <Feed  />
        </div>
           
 
      </div>
      
      {/* <Sidebar/>
      <Feed  /> */}
      {/* <Form/> */}
      {/* <Modal/> */}

      
      <Head>
        <title>LinkedIn-Dashboard</title>
      </Head>

      <main className="flex mx-auto justify-center gap-x-5 px-4 sm:px-12">
        <div className="flex flex-col md:flex-row gap-5">
            {/*sidebar*/ }
        {/*feed*/ }
        
        </div>
        {/*widgetsq*/ }

        {/* <Widgets articles={articles} /> */}
        <AnimatePresence>
          {modalOpen && (
            <Modal handleClose={() => setModalOpen(false)} type={modalType} />
          )}
        </AnimatePresence>
      
      </main>
      </div>
    </>);
}

export default Homemain

export async function getServerSideProps(context){
//if the user is authenticated on the server..//
const session = await getSession(context);

if(!session){
  return {
    redirect :{
      permanent :false,
      destination : "/index"

    },
  };
}
// const {db} = await connectToDatabase()
// const posts = await db.collection("posts").find().sort({timestamp : -1}).toArray();





// get google news api


return {
   props:{
     session ,
   }
  }
}
