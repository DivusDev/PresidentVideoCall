import React from "react";
import PeerJs from 'peerjs';


const Overview = () => {


    const history = useHistory();
    const [availablePeer] = React.useState(peer);
    // use local copy of the global to manage the different behaviors reliably
    const [availableConnection, setAvailableConnection] =
      React.useState(connection);
  
    const submit = React.useCallback(
      (ev) => {
        const input = ev.currentTarget.elements.namedItem("name");
        const otherUser = input.value;
        ev.preventDefault();
        // make the call
        setAvailableConnection(availablePeer.connect(otherUser));
      },
      [availablePeer]
    );
  
    React.useEffect(() => {
      connection = availableConnection;
  
      if (!availablePeer) {
        // no peer yet? we need to start at the name input
        history.replace("/");
      } else if (availableConnection) {
        // already a connection? then let's show the ongoing call
        history.replace("/call");
      } else {
        // let's wait for a connection to be made
        peer.on("connection", setAvailableConnection);
        return () => peer.off("connection", setAvailableConnection);
      }
    }, [availablePeer, availableConnection]);
  
    return (
      <div>
        <h1>Hi, {availablePeer?.id}</h1>
        <form onSubmit={submit}>
          <label>Name to call:</label>
          <input name="name" />
          <button>Call</button>
        </form>
      </div>
    );
  };

  export default Overview