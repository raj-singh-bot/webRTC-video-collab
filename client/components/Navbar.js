import React from 'react'
import Typography from '@mui/material/Typography'
import { SiAirplayaudio } from 'react-icons/si'
import { useFirebase } from '../context/FirebaseContext'
import UserAvatar from './UserAvatar'
import { BsArrowLeftRight } from 'react-icons/bs'


const Navbar= (props) => {
  const { remoteUser, remoteSocketId } = props
  const { currentUser } = useFirebase() 
  // console.log(currentUser)

  return (
    <nav className="flex items-center justify-between">
      <Typography
        variant="h5"
        className="flex items-center align-middle font-sans font-bold text-white antialiased"
      >
        {/* <SiAirplayaudio className="mr-2 inline" /> */}
        Collaborative<span className="text-sky-400/100">VideoApp</span>
      </Typography>
      {currentUser && remoteSocketId && (
        <div>
          <div className="mx-5 mt-4 flex items-center text-white">
            <UserAvatar
              username={
                currentUser?.displayName || currentUser.email || 'Someone'
              }
              src={currentUser?.photoURL || ''}
              height={40}
              width={40}
            />
            <BsArrowLeftRight fontSize={20} />
            {remoteUser ? (
              <UserAvatar
                username={remoteUser?.username || 'Someone'}
                src={remoteUser?.displayPicture}
                height={40}
                width={40}
              />
            ) : (
              <Typography sx={{ mx: 2 }}>Disconnected</Typography>
            )}
          </div>
        </div>
      )}
      {currentUser && (
        <div className="mx-5 mt-4">
          <UserAvatar
            username={
              currentUser?.displayName || currentUser.email || 'Someone'
            }
            src={currentUser?.photoURL || ''}
            height={40}
            width={40}
          />
        </div>
      )}
    </nav>
  )
}

export default Navbar
