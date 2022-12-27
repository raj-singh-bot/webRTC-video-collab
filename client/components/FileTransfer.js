import React, { useCallback, useMemo, useState } from 'react'
import { Typography } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'
import Snackbar from '@mui/material/Snackbar'

import { BsFillFileEarmarkBreakFill } from 'react-icons/bs'
import { AiOutlineCloudUpload, AiOutlineCloudDownload } from 'react-icons/ai'
import Tooltip from '@mui/material/Tooltip'
import { formatBytes } from '../utils/size'


const FileCard = (props) => {
  const { file } = props

  const handleFileDownload = useCallback((file) => {
      if (!file.blob) return
      const blob = file.blob
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = file.name
      a.click()
      window.URL.revokeObjectURL(url)
      a.remove()
    },
    [file]
  )

  const progress = useMemo(() => {
    if (file && file.recievedSize && file.size) {
      return (file.recievedSize / file.size) * 100
    }
    return 0
  }, [file])

  return (
    <div className="relative mt-3 flex cursor-pointer items-center justify-between rounded-md bg-slate-800  py-2 px-5 font-sans text-white shadow-md hover:animate-pulse">
      <div className="z-10 flex items-center">
        <BsFillFileEarmarkBreakFill fontSize={25} className="mr-3" />
        <div>
          <Typography variant="body1">
            {file.name} | {`${file.checksum?.substring(0, 6)}...`}
          </Typography>
          <Typography className="text-slate-50" variant="caption">
            {file.recievedSize && formatBytes(file.recievedSize)}
            {' / '}
            {formatBytes(file.size)}
          </Typography>
        </div>
      </div>
      <div style={{ zIndex: '1' }} onClick={() => handleFileDownload(file)}>
        {file.blob && <AiOutlineCloudDownload fontSize={25} />}
      </div>
      <div
        style={{ width: `${progress}%` }}
        className={`absolute ml-[-20px]	h-full rounded-md transition-all  ${
          progress >= 100 && file.checksumMatched
            ? 'bg-green-600'
            : 'bg-sky-500'
        }`}
      ></div>
    </div>
  )
}

const FileTransfer = (props) => {
  const { onFileTransfer, availableFiles } = props
  const [file, setFile] = useState()
  const [fileSnackbarOpen, setFileSnackbarOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const dropRef = React.createRef()

  const handleChooseFileClick = React.useCallback(() => {
    if (file) return
    const input = document.createElement('input')
    input.type = 'file'
    input.addEventListener('change', (e) => {
      e.preventDefault()
      if (input.files && input.files.length > 0) {
        const file = input.files[0]
        setFile(file)
      }
    })

    input.click()
  }, [file])

  const handleCloseSnackbar = useCallback(
    (event, reason) => {
      if (reason === 'clickaway') {
        return
      }

      setFileSnackbarOpen(false)
    },
    []
  )

  const handleOnFileDrop = useCallback((ev) => {
    ev.preventDefault()
    setFile(ev.dataTransfer?.files[0])
  }, [])

  const handleStopEventAndPropgation = useCallback((ev) => {
    ev.preventDefault()
    ev.stopPropagation()
  }, [])

  const handleFileTransfer = useCallback(async () => {
    if (onFileTransfer && file) {
      console.log('Sending File...', file)
      try {
        setLoading(true)
        await onFileTransfer(file)
      } catch (error) {
        setLoading(false)
        setFileSnackbarOpen(true)
      } finally {
        setFile(undefined)
        setLoading(false)
      }
    }
  }, [file, onFileTransfer])

  React.useEffect(() => {
    if (dropRef.current) {
      dropRef.current.addEventListener(
        'dragenter',
        handleStopEventAndPropgation
      )
      dropRef.current.addEventListener(
        'dragleave',
        handleStopEventAndPropgation
      )
      dropRef.current.addEventListener('dragover', handleStopEventAndPropgation)
      dropRef.current.addEventListener('drop', handleOnFileDrop)
    }

    return () => {
      if (dropRef.current) {
        dropRef.current.removeEventListener(
          'dragenter',
          handleStopEventAndPropgation
        )
        dropRef.current.removeEventListener(
          'dragleave',
          handleStopEventAndPropgation
        )
        dropRef.current.removeEventListener(
          'dragover',
          handleStopEventAndPropgation
        )
        dropRef.current.removeEventListener('drop', handleOnFileDrop)
      }
    }
  }, [])

  return (
    <div className="h-full w-full overflow-y-scroll rounded-lg  bg-[#374151] p-3">
      <div
        ref={dropRef}
        onClick={handleChooseFileClick}
        className="flex h-72 w-full cursor-pointer items-center justify-center rounded-lg border-2 border-dashed  border-sky-500 bg-transparent drop-shadow-sm"
      >
        {!file ? (
          <Typography className="text-slate-500" variant="h5">
            <BsFillFileEarmarkBreakFill className="animate-bounce text-8xl" />
            <Typography className="mt-3 font-sans">Drop files here</Typography>
          </Typography>
        ) : (
          <Typography className="text-slate-500" variant="h5">
            {!loading ? (
              <div>
                <Tooltip title="Click to send">
                  <div className="flex items-center justify-center">
                    <AiOutlineCloudUpload
                      onClick={handleFileTransfer}
                      className="animate-pulse text-8xl text-sky-500 hover:animate-ping"
                    />
                  </div>
                </Tooltip>
                <Typography className="mt-3 items-center justify-center text-center font-sans">
                  {file.name}
                </Typography>
              </div>
            ) : (
              <CircularProgress />
            )}
          </Typography>
        )}
      </div>
      <div>
        {availableFiles &&
          availableFiles.map((file, index) => (
            <FileCard key={`${file.name}-${index}`} file={file} />
          ))}
      </div>
      <Snackbar
        open={fileSnackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message="Some error in file transfer, Please turn on your video"
        // action={action}
      />
    </div>
  )
}

export default FileTransfer
