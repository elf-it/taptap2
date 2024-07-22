
const tg = window.Telegram.WebApp;

export default function Data() {
    return(
        <div className='bg-[url("./images/bg-2.png")] bg-cover bg-fixed flex justify-center'>
      <div className='w-full text-white h-screen font-bold flex flex-col max-w-xl'>
        <div className='px-4 z-10'>
          <div className='flex items-center space-x-2 pt-4'>
            <div>
              <p className='text-sm'>{JSON.stringify(tg.initDataUnsafe?.user)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    );
}