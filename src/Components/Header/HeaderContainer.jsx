import { connect } from "react-redux";
import Header from "./Header";
import {logOutAC,setCurrentInterestsAC, setLikesAC, setCurUserAC} from "../../redux/profile-reducer";

let mapStateToProps = (state, ownProps) => {
    return{
        userImg: state.profiles.loginedUser.way,
        userId: state.profiles.loginedUser.user_id,
        loginedUser: state.profiles.loginedUser,
        setLoginActive: ownProps.setLoginActive,
        loginActive: ownProps.loginActive
    }
}

let mapDispatchToProps = (dispatch) => {
    return{
        logOut: (id) => {
            dispatch(logOutAC(id));
        },
        setCurrentInterests: (interests) =>{
            dispatch(setCurrentInterestsAC(interests));
        },
        setLikes: (likes) => {
            dispatch(setLikesAC(likes))
        },
        setCurUser: (user) => {
            dispatch(setCurUserAC(user))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);