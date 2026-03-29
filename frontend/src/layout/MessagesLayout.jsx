import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router';
import { getAllChatUserApi } from "../apis/messageApi";
import { useEffect } from 'react';
import MessagePage from '../pages/MessagePage';


const MessagesLayout = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  const navigate = useNavigate()


  useEffect(() => {
    fetchChatUsers();
  }, []);

  const fetchChatUsers = async () => {
    try {
      const res = await getAllChatUserApi();
      setUsers(res.users);
    } catch (err) {
      console.log("Error fetching users:", err);
    }
  };


  return (
    <section className='h-screen w-full flex' >
      <div className="w-1/3 bg-white border-r border-b overflow-y-auto">
        <h2 className="text-xl font-bold p-4 border-b">Messages</h2>

        {users.map((user) => (
          <div
            key={user._id}
            onClick={() => navigate(`/home/messages/chat/${user._id}`)}
            className={`flex items-center gap-4 p-4 cursor-pointer hover:bg-gray-200
              ${selectedUser?._id === user._id ? "bg-gray-200" : ""}`}
          >
            <img
              src={user.profilePhoto || "https://via.placeholder.com/50"}
              alt="user"
              className="w-12 h-12 rounded-full object-cover"
            />
            <div 
            onClick={()=>setSelectedUser(user)}
            className='h-[50px] w-full'
            >
              <h3 className="font-semibold">{user.fullName}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className='h-full w-full'>
        {/* <Outlet selectedUser={selectedUser} /> */}
        <MessagePage selectedUser={selectedUser} />
      </div>
    </section>
  )
}

export default MessagesLayout;

