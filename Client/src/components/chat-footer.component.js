import React, { Component } from 'react'
import { send_message } from "../actions/chat-message-action";
import SocketService from '../services/socket.service';
import AuthService from "../services/auth.service";
import { connect } from "react-redux";

class ChatFooter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputMessage: '',
        }
    }

    handleTextChange = event => {
        // this.updateCurrentUserStatus('typing')
        this.props.updateCurrentUserStatus('typing');
        this.setState({
            inputMessage: event.target.value
        });
        const messageBody = {
            sender: AuthService.getCurrentUser(),
            receiver: this.state.selectedUser,
            text: 'typinggg',
            type: 'TYPING',
            seen: false,
            status: 'typing...',
            ts: new Date()
        }

        SocketService.sendMessage(messageBody)
    };
    handleTextSubmit = event => {
        this.props.updateCurrentUserStatus('submit');
        console.log('selected User:', this.props.selectedUser)
        const messageBody = {
            from: AuthService.getCurrentUser().id,
            to: this.props.selectedUser._id,
            sender: AuthService.getCurrentUser(),
            receiver: this.props.selectedUser,
            type: 'CHAT',
            newMessage: {
                text: this.state.inputMessage,
                seen: false,
                ts: ''
            }
        }
        this.sendMessage(messageBody)
    }
    sendMessage = (messageBody) => {
        const { dispatch } = this.props;
        dispatch(send_message(messageBody))
        this.clearInput()
    }
    clearInput = () => {
        this.setState({
            inputMessage: ''
        });
    }
    render() {
        return (
            <div class="flex-grow-0 py-3 px-4 border-top">
                <div class="input-group">
                    <input type="text" class="form-control" onChange={this.handleTextChange} value={this.state.inputMessage} placeholder="Type your message" />
                    <button class="btn btn-primary" onClick={this.handleTextSubmit}><i class="fa fa-paper-plane" ></i></button>  
                </div>
            </div>
        );
    }
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

export default connect(mapStateToProps)(ChatFooter);