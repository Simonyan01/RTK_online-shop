import { RouterProvider } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import { routes } from './router/router'
import { Provider } from 'react-redux'
import { store } from '@app/store'
import './index.css'

createRoot(document.getElementById('root'))
  .render(
    <Provider store={store}>
      <RouterProvider router={routes} />
    </Provider>
  )
