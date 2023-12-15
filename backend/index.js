import http from "http";
import express from "express";
import { Server as SocketServer } from "socket.io";
import { v4 as uuidV4 } from "uuid";
import cors from "cors";

const PORT = process.env.PORT || 8000;
const app = express();

const server = http.createServer(app);
app.use(
  cors({
    origin: "https://p2pshare-rho.vercel.app",
    methods: ["POST", "GET"],
    credentials: true,
  })
);
const io = new SocketServer({
  cors: { origin: "https://p2pshare-rho.vercel.app" },
});
io.attach(server);

app.use(express.json());

/* State Variables */
const users = new Map();
const roomUsers = new Map();

io.on("connection", (socket) => {
  console.log(`New Socket Connection: ${socket.id}`);

  socket.on("room:join", (data) => {
    const { username, displayPicture, platform } = data;
    users.set(socket.id, {
      socketId: socket.id,
      username,
      displayPicture,
      platform,
      joinedAt: new Date(),
      isConnected: false,
    });
    io.emit("refresh:user-list");
  });

  socket.on("peer:call", (data) => {
    const { to, offer } = data;
    socket.to(to).emit("peer:incomming-call", {
      from: socket.id,
      user: users.get(socket.id),
      offer,
    });
  });

  socket.on("peer:call:accepted", (data) => {
    const { to, offer } = data;
    if (users.has(to)) {
      users.get(to).isConnected = true;
    }
    if (users.has(socket.id)) {
      users.get(socket.id).isConnected = true;
    }
    console.log("sss", socket.id, users.get(socket.id), offer);
    socket.to(to).emit("peer:call:accepted", {
      from: socket.id,
      user: users.get(socket.id),
      offer,
    });

    const whiteboardID = uuidV4();
    io.to([to, socket.id]).emit("whiteboard:id", { whiteboardID });

    io.emit("refresh:user-list");
  });

  socket.on("peer:negotiate", (data) => {
    const { to, offer } = data;

    socket.to(to).emit("peer:negotiate", { from: socket.id, offer });
  });

  socket.on("peer:negosiate:result", (data) => {
    const { to, offer } = data;

    socket.to(to).emit("peer:negosiate:result", { from: socket.id, offer });
  });

  socket.on("whiteboard:drawing", (data) => {
    const { to } = data;

    socket.to(to).emit("whiteboard:data", { from: socket.id, data: data });
  });

  socket.on("chat:message", (data) => {
    const { to, message } = data;
    socket.emit("chat:message", {
      from: socket.id,
      message,
      self: true,
      user: users.get(socket.id),
    });
    socket.to(to).emit("chat:message", {
      from: socket.id,
      message,
      user: users.get(socket.id),
    });
  });

  socket.on("disconnect", () => {
    users.delete(socket.id);
    io.emit("user-disconnected", { socketId: socket.id });
    io.emit("refresh:user-list");
  });
});

app.get("/users", (req, res) => {
  const idleUsers = Array.from(users.values())
    .map((e) => ({
      ...e,
    }))
    .filter((e) => !e.isConnected);
  return res.json({ users: idleUsers });
});

server.listen(PORT, () => console.log(`Server Started at PORT:${PORT}`));
