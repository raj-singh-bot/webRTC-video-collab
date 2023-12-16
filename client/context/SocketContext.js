import React, { createContext, useMemo } from "react";
import { io, Socket } from "socket.io-client";

export const SocketContext = createContext(null);

export const SocketProvider = (props) => {
  const socket = useMemo(
    () =>
      io(process.env.NEXT_PUBLIC_SERVER_API_URL, {
        transports: ["websocket"],
        upgrade: false,
        reconnection: true,
      }),
    []
  );
  return (
    <SocketContext.Provider value={socket}>
      {props.children}
    </SocketContext.Provider>
  );
};
