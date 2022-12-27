import React, { createContext, useState } from 'react'

// export interface ProviderProps {
//   remoteStreams: MediaStream[]
//   userStream: MediaStream | null
//   setUserMediaStream?: (stream: MediaStream) => void
//   setRemoteMediaStream?: (stream: MediaStream[]) => void
// }

export const MediaStreamContext = createContext(null)

export const MediaStreamProvider = (props) => {
  const [remoteMediastreams, setRemoteMediaStream] = useState([])
  const [userMediaStream, setUserMediaStream] = useState(null)

  return (
    <MediaStreamContext.Provider
      value={{
        remoteStreams: remoteMediastreams,
        userStream: userMediaStream,
        setRemoteMediaStream,
        setUserMediaStream,
      }}
    >
      {props.children}
    </MediaStreamContext.Provider>
  )
}
