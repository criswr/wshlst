export const LoadingCardPlaceholder = () => (
    <div className='p-4 w-80'>
        <div className='animate-pulse flex items-center flex-col gap-2'>
            <div className=' rounded bg-muted h-72 w-72'></div>
            <div className=' rounded-full bg-muted h-8 w-72'></div>
        </div>
    </div>
)

export const LoadingTitle = () => (
    <div className='p-2 mt-2 w-4/5'>
        <div className='animate-pulse'>
            <div className='rounded-full bg-muted h-10 w-full'></div>
        </div>
    </div>
)

export const LoadingPrice = () => (
    <div className='p-2 mt-2 w-2/4'>
        <div className='animate-pulse'>
            <div className='rounded-full bg-muted h-9 w-full'></div>
        </div>
    </div>
)

export const LoadingWishlistCard = () => (
    <div className='bg-white p-2 flex gap-5 w-full'>
        <div className='gap-5 grow animate-pulse'>
            <div className='w-40 h-40 aspect-square rounded bg-muted'></div>
        </div>
        <div className='flex flex-col gap-2 grow animate-pulse w-full'>
            <div className='w-full h-5 rounded-full bg-muted w-full'></div>
            <div className='w-1/2 h-5 rounded-full bg-muted w-full'></div>
        </div>
    </div>
)

export const LoadingUser = () => (
    <div className='p-2 md:flex md:gap-5 md:pt-5 w-full'>
        <div className='md:w-1/3'>
            <div className='flex flex-col items-center justify-center animate-pulse gap-5'>
                <div className='w-24 h-24 rounded-full bg-muted'></div>
                <div className='w-4/5 h-6 rounded-full bg-muted'></div>
            </div>
        </div>
    </div> 
)