import { useEffect } from 'react'


export default function Seo({ title, description, jsonLd, noindex = false }) {
  useEffect(() => {
    if (title) {
      document.title = title
    }

    if (description) {
      let meta = document.querySelector('meta[name="description"]')
      if (!meta) {
        meta = document.createElement('meta')
        meta.setAttribute('name', 'description')
        document.head.appendChild(meta)
      }
      meta.setAttribute('content', description)
    }

    if (noindex) {
      let robotsMeta = document.querySelector('meta[name="robots"]')
      if (!robotsMeta) {
        robotsMeta = document.createElement('meta')
        robotsMeta.setAttribute('name', 'robots')
        document.head.appendChild(robotsMeta)
      }
      robotsMeta.setAttribute('content', 'noindex, nofollow')
    }

    let scriptTag
    if (jsonLd) {
      scriptTag = document.createElement('script')
      scriptTag.type = 'application/ld+json'
      scriptTag.text = JSON.stringify(jsonLd)
      document.head.appendChild(scriptTag)
    }


    return () => {
      if (scriptTag) document.head.removeChild(scriptTag)
      if (noindex) {
        const robotsMeta = document.querySelector('meta[name="robots"]')
        if (robotsMeta) robotsMeta.setAttribute('content', 'index, follow')
      }
    }
  }, [title, description, jsonLd, noindex])

  return null
}
