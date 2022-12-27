import React, { createContext, useState } from 'react'


export const MediaScreenStreamContext = createContext(null)

export const MediaScreenStreamProvider = (props) => {
  const [ScreenRemoteMediastream, setScreenRemoteMediaStream] = useState(null)
  const [userMediaScreenStream, setUserMediaScreenStream] = useState(null)

  return (
    <MediaScreenStreamContext.Provider
      value={{
        remoteScreenStream: ScreenRemoteMediastream,
        userScreenStream: userMediaScreenStream,
        setScreenRemoteMediaStream,
        setUserMediaScreenStream,
      }}
    >
      {props.children}
    </MediaScreenStreamContext.Provider>
  )
}
