import Image from 'next/image'
import styles from './page.module.css'
import Chat from '@/components/Chat'

export default function Home() {


  return (
    <main className='absolute inset-0  flex   justify-center items-center bg-gradient-to-r from-blue-500 to-black '>
     
     {/* <Chat/> */}
      {/* <div className={styles.description}>
        <p>
          Get started by editing&nbsp;
          <code className={styles.code}>src/app/page.tsx</code>
        </p>
        <div>
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{' '}
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              className={styles.vercelLogo}
              width={100}
              height={24}
              priority
            />
          </a>
        </div>
      </div> */}

      <div  className='flex flex-col items-center justify-center' >
        <Image
         
          src="/next1.png"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
        <h1 className='text-white text-[30px] font-serif'>تشات بوت مبني على الذكاء الاصطناعي </h1>
        <p className='text-white  font-serif line-clamp-3 text-center truncat'> يمكن تدريب هذا البوت على اي بيانات خاصة ليتم الاجابة عليها من قبل العملاء لموقعكم أو شركتكم </p>
        <p className='text-white  font-serif line-clamp-3 text-center truncat'> تواصلو معنا للحصول على نسخة مخصصة لأعمالكم</p>

      
      </div>

      {/* <div className={styles.grid}>
        <a
          href="https://beta.nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Docs <span>-&gt;</span>
          </h2>
          <p>Find in-depth information about Next.js features and API.</p>
        </a>

        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Learn <span>-&gt;</span>
          </h2>
          <p>Learn about Next.js in an interactive course with&nbsp;quizzes!</p>
        </a>

        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Templates <span>-&gt;</span>
          </h2>
          <p>Explore the Next.js 13 playground.</p>
        </a>

        <a
          href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Deploy <span>-&gt;</span>
          </h2>
          <p>
            Instantly deploy your Next.js site to a shareable URL with Vercel.
          </p>
        </a>
      </div> */}
    </main>
  )
}
