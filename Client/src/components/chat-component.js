import React, { Component } from 'react'
import PropTypes from 'prop-types'
import UserService from "../services/user.service";
import MessageService from "../services/message.service"
import AuthService from "../services/auth.service";
import SocketService from '../services/socket.service';
import EventBus from "../common-utils/EventBus";
import { Redirect } from "react-router-dom";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import Toast from 'react-bootstrap/Toast';

import { connect } from "react-redux";

import ChatFooter from './chat-footer.component'

import TimeSince from "./time-since.component"

class ChatComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            users: [],
            joinLeaveList: [],
            unreadMessagesForCurrentUser: [],
            searchedUsers: [],
            currentUser: undefined,
            clientConnected: false,
            selectedUser: '',
            inputMessage: '',
            conversation: [],
            status: '',
            redirect: null,
            timeSince: ''
        };
    }
    componentDidMount() {
        const currentUser = AuthService.getCurrentUser();
        if (!currentUser) this.setState({ redirect: "/home" });
        this.setState({ currentUser: currentUser })
        this.receiveMessage()
        this.getUsers()
    }
    componentWillMount() { }
    handleSearchChange = event => {
        this.searchUser(event.target.value);
    }
    setUnreads(otherUserIndex, messageCount) {
        this.state.users[otherUserIndex].unreadMessageCount = messageCount;
        this.setState({ users: this.state.users })
    }

    resetUnreads(otherUserIndex) {
        this.state.users[otherUserIndex].unreadMessageCount = 0;
        this.setState({ users: this.state.users })
    }

    receiveMessage() {
        // subscribe to socket messages
        SocketService.getMessage().subscribe(data => {
            console.log('Message recieved via socket: ', data.newConversation)
            const otherUserIndex = this.state.users.findIndex(usr => usr._id === data.newConversation.sender.id);
            const unread = data.newConversation.unreadMessage;
            const timeSince = data.newConversation.unformattedDate;
            const formattedDate = data.newConversation.formattedDate;
            const { currentUser } = this.state;
            const currentUserIndex = this.state.users.findIndex(usr => usr._id === currentUser.id);
            const currentUserUnreads = this.state.users[currentUserIndex].unreadMessages
            const otherUser = currentUserUnreads.find(o => o.sender.username === this.state.users[otherUserIndex].username)

            switch (data.newConversation.type) {
                case "JOIN":
                    if (otherUserIndex > -1) {
                        this.state.joinLeaveList.unshift(
                            {
                                name: this.state.users[otherUserIndex].username + ' joined the chat',
                                time: formattedDate,
                                type: 'join'
                            })
                        this.setState({
                            timeSince: timeSince
                        })
                        if (otherUser) {
                            const count = otherUser ? otherUser.numberOfMessages : 0
                            this.state.users[otherUserIndex].status = 'online';
                            this.setUnreads(otherUserIndex, count);
                        }
                        else { // when it is You, find the otherUserIndex from unread messages 
                            currentUserUnreads.map(rec => {
                                const otherUserIndex = this.state.users.findIndex(usr => usr.username === rec.sender.username);
                                this.setUnreads(otherUserIndex, rec.numberOfMessages);
                            })
                        }
                    }
                    UserService.updateUser(this.state.users[otherUserIndex]) // updates user status to online in database
                    break;
                case "TYPING":
                    if (otherUserIndex > -1) {
                        this.state.users[otherUserIndex].status = 'typing...';
                        this.setState({ users: this.state.users })
                    }
                    break;
                case "CHAT":
                    if (otherUserIndex > -1) {
                        this.state.users[otherUserIndex].status = 'online';
                        const newConversation = { from: data.newConversation.from, to: data.newConversation.to, messages: data.newConversation.messages }
                        if (this.state.conversation.length === 0) { // first time chatters
                            this.setState({
                                conversation: [...this.state.conversation, newConversation],
                                users: this.state.users,
                                unreadMessagesForCurrentUser: unread
                            });
                        }
                        else { // existing chatters
                            this.state.conversation.map(el => {
                                if (el.from === data.newConversation.from && el.to === data.newConversation.to) {
                                    el.messages.push(data.newConversation.newMessage)
                                    this.setState({
                                        conversation: this.state.conversation,
                                        users: this.state.users,
                                        unreadMessagesForCurrentUser: unread
                                    });
                                }
                                else {
                                    this.setState({
                                        conversation: [...this.state.conversation, newConversation],
                                        users: this.state.users,
                                        unreadMessagesForCurrentUser: unread
                                    });
                                }
                            })
                        }
                    }
                    break;
                case "LEAVE":
                    if (otherUserIndex > -1) {
                        this.state.joinLeaveList.unshift(
                            {
                                name: this.state.users[otherUserIndex].username + ' left the chat',
                                time: formattedDate,
                                type: 'leave'
                            }
                        );
                        this.setState({
                            timeSince: timeSince
                        })
                        this.state.users[otherUserIndex].status = 'offline';
                        this.setState({ users: this.state.users, unreadMessagesForCurrentUser: unread })
                        UserService.updateUser(this.state.users[otherUserIndex]) // updates user status to offline in database
                    }
                    break;
                default:
                // default code 
            }
        });
    }

    updateCurrentUserStatus(action) {
        const currentUser = AuthService.getCurrentUser();
        //  const user = this.state.users.find(o => o._id === currentUser.id)
        if (action === 'submit') {
            currentUser.status = 'online'
        }

        else if (action === 'typing') {
            currentUser.status = 'typing...'
        }

    }

    getUsers() {
        UserService.getChatRoomUsers()
            .then(response => {
                this.setState({
                    users: response.data,
                    searchedUsers: response.data
                });
                SocketService.connect() // connect to socket after the users are loaded in state
            }, error => {
                this.setState({
                    content:
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString()
                });
                console.log('Error: >', error)
                if (error.response && error.response.status === 401) {
                    EventBus.dispatch("logout");
                }
            });
    }

    searchUser(keyword) {
        if (keyword !== '') {
            const results = this.state.users.filter((user) => {
                return user.username ? user.username.toLowerCase().includes(keyword.toLowerCase()) : 'Nothing found!';
            });
            this.setState({ searchedUsers: results ? results : 'No user found' })
        } else {
            this.setState({ searchedUsers: this.state.users })
            // If the text field is empty, show all users
        }
    }
    getConversation(fromId, toId) {
        MessageService.getConversation(fromId, toId)
            .then(response => {
                console.log('loaded conversation: ', response.data)
                this.setState({
                    conversation: response.data
                })
            }, error => {
                this.setState({
                    content:
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString()
                });
                console.log('Error: >', error)
                if (error.response && error.response.status === 401) {
                    EventBus.dispatch("logout");
                }
            });
    }

    userClickHandler(record) {
        this.setState({
            selectedUser: record
        })
        this.getConversation(this.state.currentUser.id, record._id)
        const otherUserIndex = this.state.users.findIndex(usr => usr.username === record.username);
        this.resetUnreads(otherUserIndex);
    }

    renderSideBar() {
        const { currentUser } = this.state;
        let userList = []
        if (this.state && this.state.users)
            this.state.searchedUsers.map(record => {
                if (currentUser.id !== record._id) {
                    userList.push(
                        <a href="#" class="list-group-item list-group-item-action border-0">
                            <div class="d-flex align-items-start">
                                <img src="https://loremflickr.com/320/240"
                                    class="rounded-circle mr-1" alt="Jennifer Chang" width="40" height="40" />
                                <div class="flex-grow-1 ml-3 text-truncate" onClick={this.userClickHandler.bind(this, record)}>
                                    {record.username}
                                    {record.unreadMessageCount > 0 ?
                                        <small class="unread_message_count">
                                            {record.unreadMessageCount}
                                        </small> :
                                        ""}
                                    <div class="small">
                                        {/* {record.status} */}
                                        <span class={(record.status === 'online' || record.status === 'typing...') ?
                                            "fas fa-circle chat-online" : "fas fa-circle chat-offline"}>
                                        </span>
                                        {record.status === 'typing...' ?
                                            <span class="dots-cont">
                                                <span class="dot dot-1"></span>
                                                <span class="dot dot-2"></span>
                                                <span class="dot dot-3"></span>
                                            </span> :
                                            ""}
                                    </div>
                                </div>
                            </div>
                        </a>
                    )
                }

            })
        return userList;
    }

    renderTyping() {
        let typingHTML = []
        typingHTML.push(<div class="loadingContainer">
            <div class="ball1"></div>
            <div class="ball2"></div>
            <div class="ball3"></div>
            <div class="ball4"></div>
        </div>)
        return typingHTML;
    }
    renderSearch() {
        let searchBox = []
        searchBox.push(
            <div class="d-flex align-items-center">
                <div class="flex-grow-1">
                    <input type="text" class="form-control my-3" onChange={this.handleSearchChange} placeholder="Search..." />
                </div>
            </div>
        )
        return searchBox;
    }
    renderHeaderChat() {
        let chatHead = []
        chatHead.push(
            <div class="border-bottom d-none d-lg-block">
                <div class="d-flex align-items-center py-1">
                    <div class="position-relative">
                        <img src="https://loremflickr.com/320/240"
                            class="rounded-circle mr-1" alt="Sharon Lessman" width="40" height="40" />
                    </div>
                    <div class="flex-grow-1 pl-3 text-truncate" style={{ maxWidth: 33 + 'em' }}>
                        <strong>{this.state.selectedUser.username}</strong>
                        <div class="text-muted small"><em>{this.state.selectedUser.status}</em></div>
                    </div>
                    <div>
                        <i class="fa fa-phone-square  fa-2x fa-fw" style={{ color: 'blue' }}></i>
                        <i class="fa fa-video-camera  fa-2x fa-fw" style={{ color: 'blue' }}></i>
                        <i class="fa fa-align-justify  fa-2x fa-fw" style={{ color: 'blue' }}></i>
                    </div>
                </div>
            </div>
        )
        return chatHead;
    }
    renderPopOver() {
        let notificationList = []
        this.state.joinLeaveList.forEach(el => {
            notificationList.push(
                <ul style={{
                    listStyleType: 'none'
                }} >
                    <li >
                        <i class="fa fa-user"></i>
                        <strong>{el.name}</strong>
                        <small>{el.time}</small>
                    </li>
                </ul>)
        })
        return notificationList;
    }
    renderMessages() {
        const { currentUser } = this.state;
        const { newConversation } = this.props
        let msgList = []
        if (newConversation)
            this.addNewMessage(newConversation)

        if (this.state.conversation)
            this.state.conversation.forEach(el => {
                el.messages.filter(function (msg) {
                    if (!msg) {
                        return false; // skip
                    }
                    return true;
                }).map(rec => {
                    const record = rec
                    if (currentUser.id === el.from) { // YOU
                        msgList.push(
                            <div class="position-relative">
                                <div class="chat-messages ">
                                    <div class="chat-message-right pb-4">
                                        <div>
                                            <img src="https://loremflickr.com/320/240"
                                                class="rounded-circle mr-1" alt="Chris Wood" width="40" height="40" />
                                            <div class="text-muted small text-nowrap mt-2">
                                                {record.ts ? record.ts : <TimeSince dt={new Date}></TimeSince>}</div>
                                        </div>
                                        <div class="flex-shrink-1 bg-light rounded py-2 px-3 mr-3">
                                            <div class="font-weight-bold mb-1 text-truncate" style={{ maxWidth: 33 + 'em' }}> You</div>
                                            {record.text}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                    else {
                        msgList.push(<div class="chat-message-left pb-4">
                            <div>
                                <img src="https://loremflickr.com/320/240"
                                    class="rounded-circle mr-1" alt="Sharon Lessman" width="40"
                                    height="40" />
                                <div class="text-muted small text-nowrap mt-2">
                                    {record.ts} </div>
                            </div>
                            <div class="flex-shrink-1 bg-light rounded py-2 px-3 ml-3">
                                <div class="font-weight-bold mb-1 text-truncate" style={{ maxWidth: 33 + 'em' }}>{this.state.selectedUser.username}</div>
                                {record.text}
                            </div>
                        </div>
                        )
                    }
                })
            })
        return msgList;
    }

    addNewMessage(newConversation) {
        let newConversationObj = newConversation
        newConversationObj.newMessage.ts = <TimeSince dt={new Date}></TimeSince>;
        var foundIndex = this.state.conversation.findIndex(x => x.from === newConversationObj.from && x.to === newConversationObj.to);
        if (foundIndex > -1) {
            this.state.conversation[foundIndex].messages.push(newConversationObj.newMessage)
            console.log('conversation updated', this.state.conversation)
        }
        else {
            this.state.conversation = [
                {
                    from: newConversationObj.from,
                    to: newConversationObj.to,
                    messages: [newConversationObj.newMessage]
                }
            ]
            console.log('conversation added', this.state.conversation)
        }
    }

    render() {
        console.log(this.state.joinLeaveList)
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }
        const { currentUser } = this.state;
        console.log('::props:::', this.props)
        console.log('::state:::', this.state)
        return (
            <Container >
                <Row>
                    <Col xs={3}>
                        {this.renderSearch()}
                    </Col>
                    <Col xs={9}>
                        {this.renderHeaderChat()}
                    </Col>
                </Row>
                <Row>
                    <Col
                        xs={3}
                        style={{
                            height: '450px',
                            maxHeight: '360px',
                            overflowY: 'scroll'
                        }}>
                        {this.renderSideBar()}
                    </Col>
                    <Col
                        xs={9}
                        style={{
                            height: '450px',
                            maxHeight: '360px',
                            overflowY: 'scroll'
                        }}>
                        {this.renderMessages()}
                    </Col>
                </Row>
                <Row>
                    <Col xs={3} >
                        <OverlayTrigger
                            trigger="click"
                            key="99"
                            placement="top"
                            overlay={
                                <Popover id={`popover-positioned-top`}>
                                    <Popover.Header as="h3">
                                        <i className="fa fa-bell"> Users Activities</i>
                                    </Popover.Header>
                                    <Popover.Body style={{
                                        backgroundColor: "white",
                                        height: '28rem',
                                        maxHeight: '27rem',
                                        overflowY: 'scroll',
                                        disply: 'flex', justifyContent: 'left'
                                    }}>
                                        {
                                            this.renderPopOver()
                                        }
                                    </Popover.Body>
                                </Popover>
                            }
                        >
                            <Toast
                                className="d-inline-block m-1"
                                bg='primary'
                                key='1'
                                style={{
                                    width: "100%",
                                }}
                            >
                                <a href="#"> <Toast.Header closeButton={false}>
                                    <strong className="me-auto">Last updated</strong>
                                    <i class="fa fa-clock-o fa-fw" aria-hidden="true"></i>
                            
                                    <small><TimeSince dt={this.state.timeSince}></TimeSince></small>
                                   
                                </Toast.Header>
                                    <Toast.Body className='text-white'>
                                        <i className="fa fa-info-circle" aria-hidden="true">  Click to view user activities</i>
                                    </Toast.Body>
                                </a>
                            </Toast>
                        </OverlayTrigger>
                    </Col>
                    <Col style={{
                        backgroundColor: "#F8F8F8",
                    }}>
                        <ChatFooter
                            updateCurrentUserStatus={this.updateCurrentUserStatus}
                            selectedUser={this.state.selectedUser}
                        >
                        </ChatFooter>
                    </Col>
                </Row>
            </Container>
        )
    }
}
ChatComponent.propTypes = {
    messages: PropTypes.array,
    agentUser: PropTypes.any,
    timeFormatter: PropTypes.func,
    iconSend: PropTypes.node,
    onMessageSend: PropTypes.func,
    displayStop: PropTypes.bool,
    onMessageStop: PropTypes.func
}

ChatComponent.defaultProps = {
    onMessageSend: (text) => null,
    onMessageStop: () => null,
    displayStop: true,
    timeFormatter: (time) => time
}

function mapStateToProps(state) {
    console.log(state)
    const { isLoggedIn, user } = state.auth;
    const { message } = state.message;
    const { error } = state.error;
    const { newConversation } = state.newConversation;
    return {
        isLoggedIn,
        user,
        message,
        error,
        newConversation
    };
}

export default connect(mapStateToProps)(ChatComponent);