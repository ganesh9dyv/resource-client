import axios from "axios"
import { useEffect, useState } from "react"
import Feed from "../../components/feed/Feed"
import Rightbar from "../../components/rightbar/Rightbar"
import Sidebar from "../../components/sidebar/Sidebar"
import Topbar from "../../components/topbar/Topbar"
import "./profile.css"
import { useParams } from "react-router-dom"

const Profile = () =>{
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [user,setUser]=useState({});
    const username=useParams().username;
    // const params=useParams();
    // console.log(params)
    useEffect(()=>{
        const fetchUser = async () =>{
          const res = await axios.get(`/users?username=${username}`);
          setUser(res.data);
        };fetchUser();
      },[username]);
    return(
        <> 
        <Topbar/>
        <div className="profile">
        <Sidebar /> 
        <div className="profileRight">
        <div className="profileRightTop">
            <div className="profileCover">

        <img src={user.coverPicture ? PF+user.coverPicture : PF+"person/noCover.jpeg"} alt="" className="profileCoverImg" />
        <img src={user.profilePicture ? PF+user.profilePicture : PF+"person/avtar.jpeg"} alt="" className="profileUserImg" />
        </div>
        <div className="profileInfo">
            <h4 className="profileInfoName">{user.username}</h4>
            <span className="profileInfoDesc">{user.desc}</span>
        </div>
        </div>
        <div className="profileRightBottom">
        <Feed username={username}/>
        <Rightbar user={user}/>
        </div>
        </div>
        </div>
    </>
    )
}
export default Profile;