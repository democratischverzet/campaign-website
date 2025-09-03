export const useTallyStore = defineStore('tally', () => {
  const fullscreen = ref(false)

  function init() {
    // @ts-ignore
    var d = document,
      w = 'https://tally.so/widgets/embed.js',
      v = function () {
        // @ts-ignore
        'undefined' != typeof Tally
          ? // @ts-ignore
            Tally.loadEmbeds()
          : d
              .querySelectorAll('iframe[data-tally-src]:not([src])')
              .forEach(function (e) {
                // @ts-ignore
                e.src = e.dataset.tallySrc
              })
      }
    // @ts-ignore
    if ('undefined' != typeof Tally) v()
    else if (d.querySelector('script[src="' + w + '"]') == null) {
      var s = d.createElement('script')
      ;(s.src = w), (s.onload = v), (s.onerror = v), d.body.appendChild(s)
    }

    // Listen for page view events
    // window.addEventListener('message', (e) => {
    //   nextTick(() => {
    //     let data
    //     try {
    //       data = JSON.parse(e.data)
    //       console.log('Tally event:', data)
    //     } catch (error) {
    //       // Do nothing
    //     }

    //     if (data?.event === 'Tally.FormPageView' && data?.payload?.page === 2) {
    //       console.log('Fullscreen!', data)
    //       fullscreen.value = true
    //     }
    //   })
    // })
  }

  return { init, fullscreen }
})
