import dynamic from "next/dynamic";

const VideoFeed = dynamic(()=>import('../videoFeed'),{ssr:false})

export default VideoFeed