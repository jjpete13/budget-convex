import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { ConvexProvider, ConvexReactClient } from 'convex/react'
import store from './redux/store'
import { Provider } from 'react-redux'

const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ConvexProvider client={convex}>
      <Provider store={store}>
        <App />
      </Provider>
    </ConvexProvider>
  </StrictMode>,
)
