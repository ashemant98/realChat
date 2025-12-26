import jwt from "jsonwebtoken";

const socketAuthMiddleware = async (socket, next) => {
  try {
    const token = socket.handshake.headers.authorization;
    console.log(token);
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    (socket.userId = decoded.id), (socket.username = decoded.username);
    next();
  } catch (err) {
    console.log(err);
  }
};
export default socketAuthMiddleware;
