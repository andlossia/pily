const socketIO = require('socket.io');
const PillBox = require('./models/pillBoxModel'); // Adjust the path according to your project structure
const jwt = require('jsonwebtoken'); // Assuming you're using JWT for authentication

module.exports = function (server) {
  const io = socketIO(server);

  // Middleware to authenticate the token
  io.use((socket, next) => {
    const token = socket.handshake.auth.token;

    if (!token) {
      console.log('Authentication error: Token not provided');
      return next(new Error('Authentication error'));
    }
    
    if (!token) {
      console.log('Authentication error: Token not provided');
      return next(new Error('Authentication error'));
    }

    try {
      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      socket.user = decoded; // Store the decoded user info in the socket object
      next();
    } catch (err) {
      console.log('Authentication error: Invalid token');
      return next(new Error('Authentication error'));
    }
  });

  // Handle connection
  io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    // Listen for pillbox update requests
    socket.on('update-pillbox', async (data) => {
      const { weekNumber, day, timeSlot, medicineId } = data;

      try {
        // Use the authenticated user ID from the token
        const userId = socket.user.id;

        // Find and update the pillbox with the new medicine for the authenticated user
        const updatedPillBox = await PillBox.findOneAndUpdate(
          { user: userId, 'weeks.weekNumber': weekNumber, 'weeks.days.day': day },
          { $push: { [`weeks.$.days.$.time.${timeSlot}`]: medicineId } }, // Add medicine to the correct time slot
          { new: true, useFindAndModify: false }
        ).populate('weeks.days.time.morning weeks.days.time.afternoon weeks.days.time.evening'); // Populate medicine details

        if (!updatedPillBox) {
          console.log('No pillbox found for the given user/week/day');
          socket.emit('update-failure', { message: 'No pillbox found' });
        } else {
          // Emit the updated pillbox to the client that sent the update
          socket.emit('pillbox-updated', updatedPillBox);

          // Broadcast to all clients (except the one that triggered the event)
          socket.broadcast.emit('pillbox-updated', updatedPillBox);
        }
      } catch (err) {
        console.error('Error updating pillbox:', err);
        socket.emit('update-failure', { message: 'Error updating pillbox' });
      }
    });

    // Handle disconnect event
    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  });
};
