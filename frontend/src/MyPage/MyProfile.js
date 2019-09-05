import './MyProfile.css';
import LinesEllipsis from 'react-lines-ellipsis';
import MyProfileGrade from './MyProfileGrade';
import React, { Component } from 'react';

class MyProfile extends Component { // 보유 필름을 내가 추가해봤음.
    state = {
            photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpcD70ii8eGYvUp53zPMZk3eziEr1iC16nEZLEtyXOE7kdOO7y",
            name: "",
            id: "",
            about: "",
            following: 0,
            follower: 0,
            grade: "일반",
            // 마이프로필인지 다른사람프로필인지 확인하는 boolean
            checkProfile: true
    }
    
    // 처음 실행하기 전 Props를 State로 설정.
    componentWillMount(){
        this._dataSet(this.props.profile);
    }
    // Props가 바뀔때마다 state를 업데이트 해준다.
    componentWillReceiveProps(nextProps){
        this._dataSet(nextProps.profile);
    }

    // 프로파일의 정보를 최신화 시키는 함수
    _dataSet = (data) => {
        const {photo, name, id, about, following, follower, grade, checkProfile} = data;
        this.setState({
            photo: photo,
            name: name,
            id: id,
            about: about,
            following: following,
            follower: follower,
            grade: grade,
            checkProfile: checkProfile // 출력되는 프로파일이 MyProfile이면 true, 다른사람 Profile이면 false로 등급 확인
        })
    }

    render() {
        const { photo, name, id, about, following, follower, grade, checkProfile } = this.state;
        return (
                <Profile 
                    photo={photo}
                    name={name}
                    id={id}
                    about={about}
                    following={following}
                    follower={follower}
                    grade={grade}
                    // film={this.state.film}
                    // onClickFollowing={this.props.onClickFollowing}
                    // onClickFollower={this.props.onClickFollower}'
                    checkProfile={checkProfile}
                    />
        );
    }
}

const Profile = ({photo, name, id, about, following, follower, grade, checkProfile}) => {
    return(
        <div className="MyProfile">
            <div className="MyProfile-Status">
                <ProfilePhoto photo = {photo}/>
                <MyProfileGrade name = {name} grade = {grade} checkProfile={checkProfile}/>
            </div>
            <div className="MyProfile-Columns">
                <div className="MyProfile-Private">
                    <strong className="MyProfile-Name">{name}</strong>
                    <span className="MyProfile-Id">@{id}</span>
                </div>
                <div className="MyProfile-About">
                    <LinesEllipsis
                        text={about}
                        maxLine='5'
                        ellipsis=' ...'
                        trimRight
                        basedOn='letters'
                        />
                </div>
                <div className="MyProfile-Service">
                    {/* 팔로잉 페이지와 팔로워 페이지를 따로 놓아서 홈페이지를 푸쉬하는 방법으로 만들 것임 props로 onClick을 받았음
                    onClick={onClickFollowing}  onClick={onClickFollower}*/}
                    <button className="MyProfile-Following">{following} 팔로잉 </button>
                    <button className="MyProfile-Follower">{follower} 팔로워 </button>
                </div>
            </div>
        </div>
    )
}
 
const ProfilePhoto = ({photo}) => {
    return(
        <img className="MyProfile-Photo" src={photo} alt="Profile"/>
    )
}

export default MyProfile;