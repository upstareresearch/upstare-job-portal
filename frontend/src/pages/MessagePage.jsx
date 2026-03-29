import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import { useParams } from "react-router";


const MessagePage = ({ selectedUser }) => {
  const [allMessage, setAllMessage] = useState([]);
  const [socket_id, setSocket_id] = useState(null);
  const [message, setMessage] = useState("")
  const { user } = useSelector((state) => state.user);
  const { id } = useParams();
  const socket = useMemo(() => io("http://localhost:3000"), [id]);

   if (!user?._id) {
    return <div>Loading...</div>;
  }

  const chatUser = {
    roomId: [user._id, id].sort().join("_"),
    sender_id: user._id,
    receiver_id: id,
    socket_id
  }

  useEffect(() => {
    const handleCount = () => {
      console.log("socked is connected");

    }
    const handleTakeSID = (SID) => {
      setSocket_id(SID)
    }

    socket.on("connect", handleCount);
    socket.on("take_SID", handleTakeSID);

    return () => {
      socket.off("connect", handleCount);
      socket.off("take_SID", handleTakeSID);
    }
  });

  useEffect(() => {
    if (!socket_id) return;

    socket.emit("join-room", chatUser);

  }, [socket_id, socket]);

  const handleSendMesg = () => {

    const newMesg = {
      sender_id: user._id,
      receiver_id: id,
      text: message,
      roomId: chatUser.roomId
    };

    socket.emit("send-msg", newMesg);
    setMessage("");
  };

  useEffect(() => {

    const handleReceiveMsg = (msg) => {
      setAllMessage((prev) => [...prev, msg]);
    };

    const handleLoadOldMessage = (message) => {
      setAllMessage(message);
    };

    socket.on("receive-msg", handleReceiveMsg);
    socket.on("load-old-msg", handleLoadOldMessage);

    return () => {
      socket.off("receive-msg", handleReceiveMsg);
      socket.off("load-old-msg", handleLoadOldMessage);
    };
  });

  return (
    <>
      <div className="min-h-full w-full flex bg-gray-100 broder ">
        <div className=" h-screen w-full flex flex-col">

          {/* If No User Selected */}
          {!selectedUser ? (
            <div className="flex items-center justify-center h-full border-b text-gray-600 text-xl">
              Select a user to start chat
            </div>
          ) : (
            <>
              {/* CHAT HEADER */}
              <div className="p-4 border-b bg-white flex items-center gap-4">
                <img
                  src={selectedUser?.profilePhoto || ""}
                  className="w-10 h-10 rounded-full"
                />
                <h2 className="text-xl font-semibold">{selectedUser?.fullName}</h2>
              </div>

              {/* if no message */}
              <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-gray-100" >
                {allMessage.length === 0 ? (
                  <p className="text-gray-400 text-center mt-20">No messages yet 💬</p>
                ) : (
                  allMessage.map((msg) => {
                    const isSender = msg.sender_id === user._id;

                    return (
                      <div
                        key={msg._id}
                        className={`flex w-full ${isSender ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-xs md:max-w-sm px-4 py-2 rounded-lg shadow 
            ${isSender ? "bg-[#0A3D4C] text-white rounded-br-none" : "bg-white text-gray-900 rounded-bl-none"}`}
                        >
                          {/* Sender Name */}
                          {!isSender && (
                            <div className="text-xs font-semibold text-gray-500 mb-1">
                              {selectedUser.fullName}
                            </div>
                          )}

                          {/* Message Text */}
                          <div className="text-sm leading-relaxed">{msg.content}</div>

                          {/* Time (optional) */}
                          {msg.createdAt && (
                            <div className="text-[10px] text-gray-400 mt-1 text-right">
                              {new Date(msg.createdAt).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* CHAT INPUT */}
              <div className="p-4 border-t bg-white flex gap-3">
                <input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  type="text"
                  placeholder="Type a message..."
                  className="flex-1 px-4 py-2 border rounded-lg"
                />
                <button
                  onClick={handleSendMesg}
                  className="bg-[#0A3D4C] text-white px-4 py-2 rounded-lg">
                  Send
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default MessagePage;
