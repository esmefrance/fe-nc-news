import Lottie from "lottie-react"
import newsLoading from "../../public/news-loading.json"

function Loading() {
  return (
    <Lottie
      animationData={newsLoading}  
      loop
      autoplay
      style={{ height: 200, width: 200 }}
    />
  );
}

export default Loading