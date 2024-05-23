<template>
  <div>
    <video-player class="video-js vjs-default-skin" :options="videoOptions" />
    <ClientOnly>
      <vue-plyr>
        <div
          data-plyr-provider="youtube"
          data-plyr-embed-id="bTqVqk7FSmY"
          data-plyr-origin="http://test-aldeon:3000"
          data-asdf=""
        ></div>
      </vue-plyr>
      <vue-plyr>
        <div class="plyr__video-embed">
          <iframe
            src="https://www.youtube.com/embed/bTqVqk7FSmY?origin=http://test-aldeon:3000&amp;iv_load_policy=3&amp;modestbranding=1&amp;playsinline=1&amp;showinfo=0&amp;rel=0&amp;enablejsapi=1"
            allowfullscreen
            allow="autoplay"
          ></iframe>
        </div>
      </vue-plyr>
    </ClientOnly>
  </div>
</template>

<script>
import VideoPlayer from '@/components/VideoPlayer';
import 'video.js/dist/video-js.css';

export default {
  name: 'VideoExample',
  components: {
    VideoPlayer,
  },
  data() {
    return {
      videoOptions: {
        width: '1000',
        autoplay: true,
        controls: true,
        techOrder: ['youtube'],
        sources: [
          {
            src: 'https://www.youtube.com/watch?v=LXb3EKWsInQ',
            type: 'video/youtube',
          },
        ],
      },
    };
  },
};
</script>
