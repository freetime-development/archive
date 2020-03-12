chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    const url = new URL(tabs[0].url)
    const videoId =  url.searchParams.get("v")
    const embedUrl = `${url.origin}/embed/${videoId}`

    document.body.innerHTML = url.origin

    if (url.origin == "https://www.youtube.com") {
        document.body.innerHTML =
            `
                <iframe
                    width="560"
                    height="315"
                    src=${embedUrl}
                    frameborder="0"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen>
                </iframe>
            `

            fetch("http://localhost:3000/api/set", {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    origin: url.origin,
                    url,
                    embedUrl
                })
            })
    }
});
