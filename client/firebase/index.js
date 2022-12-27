import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getAuth } from 'firebase/auth'


const firebaseConfig = {
  apiKey: "AIzaSyC3bmU9Q6N7qhP9nk0xve48GnZWaROv5WM",
  authDomain: "video-collab-c3ffd.firebaseapp.com",
  projectId: "video-collab-c3ffd",
  storageBucket: "video-collab-c3ffd.appspot.com",
  messagingSenderId: "531908098211",
  appId: "1:531908098211:web:279511636196ba55216716",
  measurementId: "G-FW1MRY7VH2"
}

export const app = initializeApp(firebaseConfig)
// export const analytics = getAnalytics(app)
export const auth = getAuth(app)
