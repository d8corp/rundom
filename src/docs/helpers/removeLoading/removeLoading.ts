import { startViewTransition } from '../../../utils'

export function removeLoading () {
  const loading = document.getElementById('main-loader')

  if (loading) {
    startViewTransition(() => {
      loading.remove()
    })
  }
}
