import { useEffect, useState } from 'react'
import LoginPage from '../pages/LoginPage';
import SignupPage from '../pages/SignupPage';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';

const UserLayout = () => {

    const navigate = useNavigate();

    const [toggle, setToggle] = useState(true);

    const { user, isLoggedin } = useSelector((state) => state.user);

    useEffect(() => {
        if (user !== null && isLoggedin) {
            navigate("/home")
        }
    }, [user, isLoggedin])

    return (
        <div>
            {toggle ? (
                <LoginPage setToggle={setToggle} />
            ) : (
                <SignupPage setToggle={setToggle} />
            )}
        </div>
    )
}

export default UserLayout
