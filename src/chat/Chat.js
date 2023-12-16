import React from 'react';
import { ChannelList } from './ChannelList';
import './chat.css';
import { MessagesPanel } from './MessagesPanel';
import io from "socket.io-client";
export class Chat extends React.Component {

    state = {
        channels: null,
        socket: null,
        channel: null
    }
    socket;
    componentDidMount() {
        this.loadChannels();
        this.configureSocket();
    }

    configureSocket = () => {
        var socket = io('http://localhost:8080', {transports: ["websocket", "polling"]});;
        socket.on('connection', () => {
            if (this.state.channel) {
                this.handleChannelSelect(this.state.channel.id);
            }
        });
        socket.on('message', message => {
            let channels = this.state.channels
            console.log(message);
            console.log(channels);
            channels.forEach(c => {
                if (c.id === message.channel_id) {
                    if (!c.messages) {
                        c.messages = [message];
                    } else {
                        c.messages.push(message);
                    }
                }
            });
            this.setState({ channels });
        });
        this.socket = socket;
    }

    loadChannels = async () => {
        const headers = {
            Authorization: localStorage.getItem('token'),
            'Content-Type': 'application/x-www-form-urlencoded'
        };
        fetch('http://localhost:8000/user/users', {headers: headers}).then(async response => {
            const data = await response.json();
            this.setState({ channels: data });
        })
    }

    handleChannelSelect = id => {
        let channel = this.state.channels.find(c => {
            return c.id === id;
        });
        this.setState({ channel });
        // this.socket.emit('channel-join', id, ack => {
        // });
    }

    handleSendMessage = (channel_id, text) => {
        this.socket.emit('send-message', { channel_id, text, senderName: this.socket.id, id: Date.now() });
    }

    render() {

        return (
            <div className='chat-app'>
                <ChannelList channels={this.state.channels} onSelectChannel={this.handleChannelSelect} />
                <MessagesPanel onSendMessage={this.handleSendMessage} channel={this.state.channel} />
            </div>
        );
    }
}