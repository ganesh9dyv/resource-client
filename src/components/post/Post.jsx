import { MoreVert } from "@mui/icons-material"
import "./post.css"
// import {Users} from "../../dummyData"
import { useEffect, useState, useContext } from "react"
import axios from "axios"
import {format} from "timeago.js"
import {Link} from "react-router-dom"
import { AuthContext } from "../../context/AuthContext";    

export default function Post({post}) {
    // const user = Users.filter(u=>u.id===1)
    const [like,setLike]= useState(post.likes.length)
    const [isLiked,setisLiked]= useState(false)
    const [user,setUser]=useState({});
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const { user: currentUser } = useContext(AuthContext);

    useEffect(() => {
        setisLiked(post.likes.includes(currentUser._id));
      }, [currentUser._id, post.likes]);
    useEffect(()=>{
        const fetchUser = async () =>{
          const res = await axios.get(`/users?userId=${post.userId}`);
          setUser(res.data);
        };fetchUser();
      },[post.userId]);
      const likeHandler = () => {
        try {
          axios.put("/posts/" + post._id + "/like", { userId: currentUser._id });
        } catch (err) {}
        setLike(isLiked ? like - 1 : like + 1);
        setisLiked(!isLiked);
      };
  return (
    <div className="post">
    <div className="postWrapper">
        <div className="postTop">
            <div className="postTopLeft">
               <Link to={`profile/${user.username}`}> 
               <img src={  user.profilePicture ? PF + user.profilePicture : PF + "person/avtar.jpeg" } alt="" className="postProfileImg" /></Link>
                <span className="postUsername">{user.username} </span>
                <span className="postDate">{format(post.createdAt)} </span>
            </div>
            <div className="postTopRight">
            <MoreVert/>
            </div>

        </div>
        <div className="postCenter">
            <span className="postText">
                {post?.desc}
            </span>
            <img src={PF+post.img} alt="aajayegi rukho" className="postImg" />
        </div>
        <div className="postBottom">

            <div className="postBottomLeft">
            <img src={`${PF}like.png`}    alt="" onClick={likeHandler} className="likeIcon" />
            <img src={`${PF}heart.png`}   alt="" onClick={likeHandler} className="likeIcon" />
            <span className="postlikeCounter">{like} people like it</span>
            </div>
            <div className="postBottomRight">
                <span className="postCommentText">{post.comment } Comments</span>
            </div>
        </div>
    </div>

    </div>
  )
}
