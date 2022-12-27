import React, { useCallback, useContext, useState } from "react";
import ReactPlayer from "react-player";
import Grid from "@mui/material/Grid";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import { GiHamburgerMenu } from "react-icons/gi";
import Draggable from "react-draggable";
import { AiFillPushpin } from "react-icons/ai";
import FileTransfer, { AvailableFiles } from "./FileTransfer";
// import WhiteBoard from './Whiteboard'
import AudioVideoBar from "./AudioVideoBar";
import Chat from "./Chat";
import ScreenShare from "./ScreenShare";
import { MediaStreamContext, ProviderProps } from "../context/MediaStream";
import {
  MediaScreenStreamContext,
  ProviderScreenProps,
} from "../context/ScreenStream";

const Dashboard = (props) => {
  const {
    onFileTransfer,
    startAudioVideoStreams,
    startScreenShareStreams,
    stopScreenShareStreams,
    availableFiles,
    remoteSocketId,
    whiteboardID,
  } = props;

  const { userStream, remoteStreams } = useContext(MediaStreamContext);

  const { userScreenStream } = useContext(MediaScreenStreamContext);

  const [fileTransferOpen, setFileTransferOpen] = useState(false);
  const [pinVideo, setPinVideo] = useState(null);

  const handleHamMenuClick = useCallback(
    () => setFileTransferOpen((c) => !c),
    []
  );

  const handlePinVideo = useCallback(
    (id) => {
      const foundStream = remoteStreams.find((stream) => stream.id == id);
      if (foundStream) {
        setPinVideo(foundStream);
      } else if (userStream && userStream.id == id) {
        setPinVideo(userStream);
      } else if (userScreenStream && userScreenStream.id == id) {
        setPinVideo(userScreenStream);
      }
    },
    [userStream, remoteStreams, userScreenStream]
  );

  const handleUnPinVideo = useCallback(() => {
    setPinVideo(null);
  }, []);

  console.log("whiteBoard", whiteboardID);

  return (
    <div className="mt-5  text-white">
      <GiHamburgerMenu
        className="my-2 cursor-pointer"
        fontSize={20}
        onClick={handleHamMenuClick}
      />
      <Drawer
        open={fileTransferOpen}
        className="w-10px"
        onClose={() => setFileTransferOpen(false)}
      >
        <div className="min-h-[100vh]">
          <FileTransfer
            onFileTransfer={onFileTransfer}
            availableFiles={availableFiles}
          />
        </div>
      </Drawer>
      <Grid container spacing={2}>
        <Grid item lg={9} md={9} sm={12} xs={12}>
          {pinVideo ? (
            <div className="group relative">
              <ReactPlayer
                key={pinVideo.id}
                width="100%"
                height="100%"
                url={pinVideo}
                playing
                controls={false}
                pip
                muted={pinVideo.id === userStream?.id}
              />
              <button
                className="absolute top-[50%] left-0 right-0 hidden group-hover:block"
                onClick={handleUnPinVideo}
              >
                <AiFillPushpin
                  className="m-auto"
                  size={30}
                  title="UnPin video"
                />
              </button>
            </div>
          ) : (
            <iframe
              src={`https://witeboard.com/${whiteboardID}`}
              height="100%"
              width="100%"
            />
          )}
        </Grid>
        <Grid item lg={3} md={3} sm={12} xs={12}>
          <div className="mb-2 h-[74vh] overflow-auto">
            <AudioVideoBar
              pinVideoObj={pinVideo}
              onStartAudioVideo={startAudioVideoStreams}
              pinVideo={handlePinVideo}
              unPinVideo={handleUnPinVideo}
            />
          </div>
          <ScreenShare
            onStartScreenShare={startScreenShareStreams}
            onStopScreenShare={stopScreenShareStreams}
          />
        </Grid>
      </Grid>
      <div className="absolute bottom-5 right-5">
        {remoteSocketId && <Chat remoteSocketId={remoteSocketId} />}
      </div>
    </div>
  );
};

export default Dashboard;
