import { useState } from 'react'
import demoVideo from '../assets/Demo.mp4'

/** 16:9 frame with a capped height (roughly 2× the minimal strip) so it stays balanced on the page. */
const demoFrameLayout =
  'relative mx-auto aspect-video w-full max-w-[853px] sm:max-w-[924px] md:max-w-[996px]'

export default function DemoVideo() {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return (
      <div
        className={`flex flex-col items-center justify-center gap-3 bg-neutral-950 px-6 text-center ${demoFrameLayout}`}
      >
        <p className="text-sm text-neutral-500">No demo video found.</p>
        <p className="max-w-md text-xs text-neutral-600">
          Make sure <span className="font-mono text-neutral-400">src/assets/Demo.mp4</span> exists.
        </p>
      </div>
    )
  }

  return (
    <div className={`${demoFrameLayout} bg-black`}>
      <video
        className="h-full w-full object-contain"
        controls
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        src={demoVideo}
        onError={() => setFailed(true)}
      >
        Your browser does not support embedded video.
      </video>
    </div>
  )
}
