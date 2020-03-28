export const providers = new Map()

export enum Providers {
  YT = 'https://www.youtube.com',
  IMGUR = 'https://imgur.com'
}

providers.set(Providers.YT, function getYoutubeIFrame(embedUrl) {
  return {
    type: 'iframe',
    props: {
      width: 360,
      height: 200,
      src: embedUrl,
      frameBorder: 0,
      allow: 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture',
      allowFullScreen: false
    }
  }
})

providers.set(Providers.IMGUR, function getImgurEmbed(postId) {
  const html = `
    <blockquote class="imgur-embed-pub" lang="en" data-id="a/${postId}">
      <a href="//imgur.com/a/${postId}">n-ice</a>
    </blockquote>
    <script async src="//s.imgur.com/min/embed.js" charset="utf-8"></script>
  `

  // return {
  //   type: 'div',
  //   props: {
  //     dangerouslySetInnerHTML: { __html: html }
  //   }
  // }

  return {
    type: 'iframe',
    props: {
      width: 360,
      height: 200,
      src: 'https://imgur.com/gallery/Vc5tSI1',
      frameBorder: 0,
      allow: 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture',
      allowFullScreen: false
    }
  }
})
