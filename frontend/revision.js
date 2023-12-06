useEffect(() => {
    // Connect to the server using Socket.io
    const socket = io("http://localhost:4000");
    const name = localStorage.getItem("userName");
    setUser(name);

    // Emit the "new-user-joined" event only if the user is not already in the list
    if (!users.includes(name)) {
      socket.emit("new-user-joined", name);
    }

    socket.on("user-joined", (newUser) => {
      // Update the list of users only if the user is not already in the list
      if (!users.includes(newUser)) {
        setUsers((prevUsers) => [...prevUsers, newUser]);
        console.log(`${newUser} joined chat`);
      }
    });

    // Clean up the socket connection when the component unmounts
    return () => {
      socket.disconnect();
    };
  }, [users]); // Run this effect whenever the list of users changes