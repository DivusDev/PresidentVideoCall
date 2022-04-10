
import React from "react";
import PeerJs from 'peerjs';



const NameInput = () => {
    const history = useHistory();
    // use local copy of the global to manage the different behaviors reliably
    const [availablePeer, setAvailablePeer] = React.useState(peer);
  
    const submit = React.useCallback((ev) => {
      const input = ev.currentTarget.elements.namedItem("name");
      const user = input.value;
      ev.preventDefault();
      // let's set the peer
      setAvailablePeer(new PeerJs(user));
    }, []);
  
    React.useEffect(() => {
      // apply the local peer to the global variables
      peer = availablePeer;
  
      // entering the name is only necessary if we don't have a peer yet;
      // if we have then let's show the overview
      if (availablePeer) {
        history.replace("/overview");
      }
    }, [availablePeer]);
  
    return (
      <form onSubmit={submit}>
        <label>Your name:</label>
        <input name="name" />
        <button>Save</button>
      </form>
    );
  };

  export default NameInput