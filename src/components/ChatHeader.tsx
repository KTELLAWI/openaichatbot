'use client'

import {FC} from 'react';
import { useEffect } from 'react';
import * as cheerio from 'cheerio';

interface ChatHeaderProps {
 
}

const ChatHeader : FC<ChatHeaderProps> = ({}) => {
  useEffect(() => {
    // Run the function here when the app is starting up

    console.log("App is starting up...");
    

const docs = cheerio.load(
  "https://news.ycombinator.com/item?id=34817881"
);
console.log(`App is starting up... ${docs}`);
// const docs = await loader.load();

  }, []);
  return (
    <div className=' flex gap-3  jutify-start itemes-center text-zinc-800' >
        {/* <div className='flex gap-1.5 items-start text-sm'> */}
        <p className=' w-3 h-3 rounded-full bg-green-500'></p>
            <p className ='text-xs'>
                Chat With Us
            </p>
            {/* <div className='flex gap-1.5 items-center'> */}
                
                {/* <p className='font-medium'>BookBuddy Support</p> */}
            {/* </div> */}

        {/* </div> */}
     
    </div>
  )
};

export default ChatHeader
