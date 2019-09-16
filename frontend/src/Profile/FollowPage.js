import './FollowPage.css';
import React, { Component } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import FollowProfile from './FollowProfile';
import { getMyID, getFollowingSome, getFollowerSome, isFollowInfo } from './ProfileFunction'

class FollowPage extends Component {
    state={
        id: "", // 현재 로그인 된 아이디
        targetID: "", // 대상의 아이디
        // true : following, false : follower
        isFollow: true,
        // 여기까진 id(자신)의 follower와 following 사람들의 리스트
        countID: [], // 출력을 해야하는 id 목록들, 30개씩 붙인다.
        count: 30, // 한 번의 스크롤에 불러올 id의 갯수
        start: 0,
        isMore : true
    }

    //현재 로그인 된 아이디와 props를 state값 넣어준다.
    componentWillMount(){
        const id = getMyID();
        const {targetID, isFollow} = this.props;
        this.setState({
            id: id,
            targetID: targetID,
            isFollow: isFollow
        });
    }
    // 현재 state값에 들어있는 값들로 팔로워 혹은 팔로잉을 찾는다.
    componentDidMount() {
        const { targetID, isFollow, count, start } = this.state;
        if(isFollow){
            getFollowingSome(targetID, start, count).then(res => {
                this.setState({
                    countID: this.state.countID.concat(res.data)
                })
            });
        }
        else{
            getFollowerSome(targetID, start, count).then(res => {
                this.setState({
                    countID: this.state.countID.concat(res.data)
                })
            });
        }
    }

    fetchIDs = () => {
        const count = this.state.count;
        const start = count + this.state.start;
        this.setState({ start: start });
    }

    setDatas = () => {
        
    }

    _renderFollow = () => {
        
    }

    render() {
        const { id, isFollow } = this.state;
        return (
            <div className="FollowPage">
                <div className="FollowPage-Top">
                    {isFollow===true ? "Following" : "Follower"}
                </div>
                <InfiniteScroll
                    dataLength = {this.state.countID.length}
                    next = {this.fetchIDs}
                    hasMore = {this.state.isMore}
                    >
                    {this.state.countID.map((list, index) => {
                        const printID = isFollow===true ? list.followerID : list.followID;
                        const isMe = printID === id;
                        return <li key = {index} >
                                <FollowProfile 
                                    id={printID}
                                    isMe={isMe}
                                    isFollow={isMe ? false : isFollowInfo(id, printID)}
                                    />
                            </li>
                    })}
                </InfiniteScroll>
            </div>
        );
    }
}

export default FollowPage;