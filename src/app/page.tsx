import Image from "next/image";
import SciFiGreeting from "./components/Greeting";
import VideoMain from "./components/VideoMain";
export default function Home()
{
  return (

    <div className="bg-white dark:bg-black grid grid-rows-[auto_1fr_auto] items-center justify-items-center min-h-screen p-8 pb-20 gap-8 sm:p-20 font-[family-name:var(--font-geist-sans)]">

      {/* 创建一个专门的 header 区域 */}
      {/* <header className="w-full py-6 px-8 sm:px-20 flex justify-between items-center border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center">
          <ThemeToggle />
        </div>
        <Navbar />
      </header> */}
      <div className="w-full">
        <VideoMain />

        <div className="w-full lg:w-2/3 mt-4">
          <div className="h-[150px] w-full flex justify-center items-center">
            <SciFiGreeting glow_text="Hi! A Developer Here, Nice to Meet You!" />
          </div>
        </div>
      </div>

      <main className="flex gap-8 row-start-3 items-bottom sm:items-start w-full max-w-[900px] mt-4">
        <ol className="text-black dark:text-white list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
        </ol>

        <div className="flex gap-4 items-center flex-col sm:flex-row text-black dark:text-white">

          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            href="/CV.pdf"
            download="JF_CV.pdf"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            Download his CV!
          </a>
        </div>
      </main>
      <div className="row-start-4 flex justify-end w-full">
        <Image
          className="dark:invert"
          src="/next2.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
      </div>
      <footer className="row-start-5 flex gap-6 flex-wrap items-center justify-center text-black dark:text-white mt-auto">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://www.linkedin.com/in/jiafan-lou-205796227/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          LinkedIn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4 text-black dark:text-white"
          href="暂定"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Essential Note
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4 text-black dark:text-white"
          href="https://starazer.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to another secret site →
        </a>
      </footer>
    </div>
  );
}
