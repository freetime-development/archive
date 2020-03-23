export const providers = new Map()

export enum Providers {
  YT = 'https://www.youtube.com'
}

providers.set(Providers.YT, function getYoutubeIFrame(embedUrl) {
  return {
    type: 'iframe',
    props: {
      width: 560,
      height: 315,
      src: embedUrl,
      frameBorder: 0,
      allow: 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture',
      allowFullScreen: false
    }
  }
})
