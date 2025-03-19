import { useIsThreadActive } from '@liveblocks/react-lexical'
import { Composer, Thread } from '@liveblocks/react-ui'
import { useThreads } from '@liveblocks/react/suspense'
import React from 'react'
import { cn } from '@/lib/utils';


const ThreadWrapper = ({thread}: ThreadWrapperProps) => {
    const isActive = useIsThreadActive(thread.id)

    return (
        <Thread
        thread= {thread}
        data-state = {isActive ? 'active' : null}
        className={cn('border w-full max-w-[800px]  border-dark-300 bg-dark-200 shadow-sm lg:w-[350px] transition-all' ,
            isActive && '!border-blue-500 shadow-md',
            thread.resolved && 'opacity-45'
        )}
        />
    )
}

const Comments = () => {
    const {threads} = useThreads()
  return (
    <div className='mb-10 space-y-4 lg:w-fit flex w-full flex-col items-center justify-center'>
        <Composer className='w-full max-w-[800px] border border-dark-300 bg-dark-200 shadow-sm lg:w-[350px'/>
        {threads.map((thread) => (
            <ThreadWrapper key={thread.id} thread={thread} /> 
        ))}
    </div>
  )
}

export default Comments