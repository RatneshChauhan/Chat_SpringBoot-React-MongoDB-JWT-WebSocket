import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import { Subject } from "rxjs";

let stompClient = null;
const subject = new Subject();
const localCurrentUser = JSON.parse(localStorage.getItem('user'))

class SocketService {

    connect = () => {
        var sock = new SockJS('http://localhost:8081/ws');
        stompClient = Stomp.over(sock);
        stompClient.connect({}, this.onConnected, this.onError);
    }
    onError = (error) => {
        console.log('Socket Error ... ', error)
    }
    onConnected = (frame) => {
        this.subscribe(JSON.parse(localStorage.getItem('user')))
    }
    subscribe = (currentUser) => {
        console.log('Current User Subscription: ', currentUser)
        stompClient.subscribe('/topic/pubic', this.onMessageReceived);
        if (currentUser) {
            stompClient.subscribe('/user/' + currentUser.username + '/private', this.onMessageReceived);
            const messageBody = {
                sender: currentUser,
                receiver: null,
                text: 'signing innn',
                type: 'JOIN',
                seen: false,
                status: 'online'
            }
            this.sendPublicNotifications(messageBody)
        }
        else {
            const messageBody = {
                sender: localCurrentUser,
                receiver: null,
                text: 'signing outt',
                type: 'LEAVE',
                seen: false,
                status: 'offline'
            }
            this.sendPublicNotifications(messageBody)
        }
    }
    onMessageReceived = (msg, topic) => {
        console.log('onMessageReceive :::', msg)
        subject.next({ newConversation: JSON.parse(msg.body) })
    }
    sendMessage = (messageBody) => {
        stompClient.send("/app/privateEvent", {}, JSON.stringify(messageBody));
    }
    sendPublicNotifications = (messageBody) => {
        stompClient.send("/app/publicEvent", {}, JSON.stringify(messageBody))
    }
    getMessage = () => subject.asObservable()
}
export default new SocketService();