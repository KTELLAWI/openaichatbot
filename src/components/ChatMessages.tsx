'use client'

import { MessagesContext } from '@/context/messages'
import { cn } from '@/lib/utils'
import { FC, HTMLAttributes, useContext } from 'react'
 import MarkdownLite from './MarkdownLite'

interface ChatMessagesProps extends HTMLAttributes<HTMLDivElement> {}

const ChatMessages: FC<ChatMessagesProps> = ({ className, ...props }) => {

const {messages} = useContext(MessagesContext);
const inverseMessges = [...messages].reverse();


    return(
       <div { ...props} className={cn('flex flex-col-reverse gap-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch',className)} >
            <div className='flex-1 flex-grow'/>
            {inverseMessges.map((message)=>(
                <div 
                key={message.id}
                className='chat-message'>
                    <div className={cn('flex items-center',{
                        'justify-end':message.isUserMessage,
                    })}>
                        <div className={cn('flex dlex-col space-y-2 text-sm max-w-xs overflow-x-hidden',{
                            'bg-blue-500 text-white':message.isUserMessage,
                            'bg-grey-200 text-grey-900':!message.isUserMessage,
                        })}>
                               <p
                                    className={cn('px-4 py-2 rounded-lg', {
                                        'bg-blue-600 text-white': message.isUserMessage,
                                        'bg-gray-200 text-gray-900': !message.isUserMessage,
                                    })}>
                                    <MarkdownLite text={message.text} />
                                    
                                </p>
                        </div>

                    </div>

                </div>
            ))}
       </div> 
    )



}

export default ChatMessages
