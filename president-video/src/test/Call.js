import React from "react";
import PeerJs from 'peerjs';


const Call = () => {

    const [messages, setMessages] = React.useState([])

        React.useEffect(() => {
            connection = availableConnection;
        
            if (!availableConnection) {
            history.replace('/overview');
            } else {
            const dataHandler = (data) => {
                setMessages((msgs) => [...msgs, data]);
            };
            const closeHandler = () => {
                setAvailableConnection(undefined);
            };
            availableConnection.on('data', dataHandler);
            availableConnection.on('close', closeHandler);
            return () => {
                availableConnection.off('data', dataHandler);
                availableConnection.off('close', closeHandler);
            };
            }
        }, [availableConnection]);
        
        const submit = React.useCallback(
            (ev) => {
            const input = ev.currentTarget.elements.namedItem('message');
            const message = input.value;
            ev.preventDefault();
            availableConnection.send(message);
            input.value = '';
            },
            [availableConnection],
        );
        
        const disconnect = React.useCallback(() => {
            availableConnection.close();
            setAvailableConnection(undefined);
        }, [availableConnection]);

    return (
        <div>
            <h1>
            {availablePeer?.id} ⬄ {availableConnection?.peer} <button onClick={disconnect}>Hang up</button>
            </h1>
            <video ref={otherVideo} width={500} height={500} />
            <video ref={selfVideo} width={200} height={200} />
            <div>
            {messages.map((msg) => (
                <p key={msg.id} style={{ color: msg.self ? '#999' : '#222' }}>
                <b>{msg.user}</b> ({msg.time}): {msg.message}
                </p>
            ))}
            </div>
            <form onSubmit={submit}>
            <input name="message" />
            <button>Send</button>
            </form>
        </div>
        );
    
}