import { FirebaseProvider } from '../context/FirebaseContext'
import { SocketProvider } from '../context/SocketContext'
import '../styles/globals.css'
import { MediaStreamProvider } from '../context/MediaStream'
import { MediaScreenStreamProvider } from '../context/ScreenStream'


export default function App({ Component, pageProps }) {
  return (
    <FirebaseProvider>
      <SocketProvider>
        <MediaStreamProvider>
          <MediaScreenStreamProvider>
            <Component {...pageProps} />
          </MediaScreenStreamProvider>
        </MediaStreamProvider>
      </SocketProvider>
    </FirebaseProvider>
  )
}
