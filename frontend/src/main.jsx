/**
 * Website Author: Henri-Dunant CHIK
 * Email: hdchikuru7@gmail.com
 * GitHub: https://github.com/Henridunantchik
 * Phone: +256773840148
 * 
 * Development: Kuna Creatives Africa
 * Website: https://www.kunacreatives.africa/
 */

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Toaster } from "@/components/ui/sonner"
import { Provider } from 'react-redux'
import store from './redux/Store'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import ThemeProvider from './components/ThemeProvider'

const persistor = persistStore(store)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor} >
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </PersistGate>
    </Provider>
    <Toaster />
  </StrictMode>,
)
