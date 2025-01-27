import User from '../classes/model/user.class.js';
import { getGameSession } from './game.session.js';
import { userSessions } from './session.js';

export const addUser = (socket, uuid, playerId, latency) => {
  const user = new User(uuid, socket, playerId, latency);
  userSessions.push(user);
  const gameSession = getGameSession();
  gameSession.addUser(user)
  return user;
};

export const removeUser = (socket) => {
  const index = userSessions.findIndex((user) => user.socket === socket);
  if (index !== -1) {
    return userSessions.splice(index, 1)[0];
  }
};

export const getUserById = (id) => {
  return userSessions.find((user) => user.id === id);
};
