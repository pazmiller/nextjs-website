// app/components/VideoMain.tsx
"use client";

export default function VideoMain()
{
    return (
        <div className="flex flex-col md:flex-row gap-[320px]  ">
            {/* Video 1*/}
            <div className="w-full lg:w-2/4 ml-0 lg:ml-[15%]"> {/* 2+3并排放*/}
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-auto"
                >
                    <source src="/hi.mp4" type="video/mp4" />
                    你的浏览器不支持视频标签。
                </video>
                {/* Put欢迎字符在这里*/}
            </div>


            {/*Right 右侧*/}
            {/* Video 2*/}
            <div className="w-full lg:w-1/5 flex flex-row lg:flex-col gap-20"> {/* 2+3并排放*/}
                <div className="w-1/2 lg:w-full">
                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-auto"
                    >

                        <source src="/home_video.mp4" type="video/mp4" />
                        你的浏览器不支持视频标签。
                    </video>
                    <div className="text-black dark:text-white list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
                        <h1 className="font-bold">Frontend Developer</h1>
                        <h1 className="font-bold">Fullstack wannabe</h1>
                        <h1 className="font-bold"></h1>
                        <h1 className="font-bold">Fresh grduate of UCL (software)  && RHUL (computer science)</h1>
                        <p>Currently updating a Electron cross-platform App and writing
                            a Fullstack App using Java SpringBoot as backend</p>
                        {/* <p>Testing</p>
                        <p>Testing</p>
                        <p>Testing</p>
                        <p>Testing</p>
                        <p>Testing</p>
                        <p>Testing</p>
                        <p>Testing</p>
                        <p>Testing</p>
                        <p>Testing</p>
                        <p>Testing</p>
                        <p>Testing</p>
                        <p>Testing</p>
                        <p>Testing</p>
                        <p>Testing</p>
                        <p>Testing</p>
                        <p>Testing</p>
                        <p>Testing</p>
                        <p>Testing</p>
                        <p>Testing</p>
                        <p>Testing</p> */}
                    </div>

                </div>

                {/* Video 3*/}
                <div className="w-1/2 lg:w-full">
                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-auto"
                    >
                        <source src="/cyberpunk.mp4" type="video/mp4" />
                        你的浏览器不支持视频标签。
                    </video>
                    <div className="text-black dark:text-white list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
                        <p>React, JS, TS, NEXT.js, HTML5, Tailwind CSS ---》 The Frontend Bundle</p>
                        <p>Also knows Java and SpringBoot and relevant Testing tools</p>
                    </div>
                </div>
            </div>
        </div>
    )
}