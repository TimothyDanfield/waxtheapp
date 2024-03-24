import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  MeetingProvider,
  MeetingConsumer,
  useMeeting,
  useParticipant,
  usePubSub,
} from "@videosdk.live/react-sdk";
import { authToken, createMeeting } from "./API";
import axios from '../utils/axiosConfig'
import ReactPlayer from "react-player";
import toast, { Toaster } from "react-hot-toast";
import "./Livestream.css";

function ChatView() {
  // destructure publish method from usePubSub hook
  const { publish, messages } = usePubSub("CHAT");

  //   onMessageReceived: (message) => {
  //     window.alert(message.senderName + "says" + message.message);
  //   };
  const [message, setMessage] = useState("");

  const handleSendMessage = () => {
    // Sending the Message using the publish method
    publish(message, { persist: true });
    // Clearing the message input
    setMessage("");
  };

  return (
    <>
      <div className="message-box">
        <p className="message-header">Messages:</p>
        <div className="message-list">
          {messages.map((message, index) => (
            <div key={index} className="message">
              <span className="sender">{message.senderName}: </span>
              <span className="message-text">{message.message}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="input-container">
        <input
          className="message-input"
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
        />
        <button className="send-button" onClick={handleSendMessage}>
          Send Message
        </button>
      </div>
    </>
  );
}

function AttendessCount() {
  const { participants } = useMeeting();

  const attendeesCount = useMemo(() => {
    const attendees = [...participants.values()].filter((participant) => {
      return participant.mode === "VIEWER";
    });
    return attendees.length || 0;
  }, [participants]);

  return (
    <>
      <p>Number of Attendess: {attendeesCount}</p>
    </>
  );
}

function JoinScreen({ getMeetingAndToken }) {
  const [meetingId, setMeetingId] = useState(localStorage.getItem("LiveID"));
  const createMeeting = async () => {
    await getMeetingAndToken(meetingId);
  };

  const joinMeeting = async () => {
    if (meetingId === null) {
      toast.error("Invalid meeting ID")
      return
    }
    await getMeetingAndToken(meetingId)
  }
  return (
    <div>
      {/* <input
        type="text"
        placeholder="Enter Meeting Id"
        onChange={(e) => {
          setMeetingId(e.target.value);
        }}
      /> */}
      <button className="button" onClick={joinMeeting}>
        Join
      </button>
      {" or "}
      <button className="button" onClick={createMeeting}>
        Create Meeting
      </button>
      <Toaster />
    </div>
  );
}

function ParticipantView(props) {
  const micRef = useRef(null);
  const { webcamStream, micStream, webcamOn, micOn, isLocal, displayName } =
    useParticipant(props.participantId);

  const videoStream = useMemo(() => {
    if (webcamOn && webcamStream) {
      const mediaStream = new MediaStream();
      mediaStream.addTrack(webcamStream.track);
      return mediaStream;
    }
  }, [webcamStream, webcamOn]);

  useEffect(() => {
    if (micRef.current) {
      if (micOn && micStream) {
        const mediaStream = new MediaStream();
        mediaStream.addTrack(micStream.track);

        micRef.current.srcObject = mediaStream;
        micRef.current
          .play()
          .catch((error) =>
            console.error("videoElem.current.play() failed", error)
          );
      } else {
        micRef.current.srcObject = null;
      }
    }
  }, [micStream, micOn]);

  return (
    <div className="participant-container">
      <div className="participant-info">
        <p>
          Participant: {displayName} | Webcam: {webcamOn ? "ON" : "OFF"} | Mic:{" "}
          {micOn ? "ON" : "OFF"}
        </p>
      </div>
      <div className="chat-and-stream">
        {webcamOn && (
          <ReactPlayer
            playsinline
            pip={false}
            light={false}
            controls={false}
            muted={true}
            playing={true}
            url={videoStream}
            onError={(err) => {
              console.log(err, "participant video error");
            }}
          />
        )}
      </div>

      <audio ref={micRef} autoPlay playsInline muted={isLocal} />
    </div>
  );
}

function Controls() {
  const { leave, toggleMic, toggleWebcam } = useMeeting();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("User")))
  return (
    <div>
      <button onClick={async () => {
        await axios.patch(`http://localhost:3001/user/${user._id}`, {
          liveID: null
        })
        localStorage.removeItem("LiveID")
        leave()
      }}>Leave</button>
      <button onClick={() => toggleMic()}>toggleMic</button>
      <button onClick={() => toggleWebcam()}>toggleWebcam</button>
    </div>
  );
}

function MeetingView(props) {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("User")))
  const [joined, setJoined] = useState(null);

  //Get the method which will be used to join the meeting.
  //We will also get the participants list to display all participants
  const { join, participants } = useMeeting({
    //callback for when meeting is joined successfully
    onMeetingJoined: () => {
      setJoined("JOINED");
    },
    //callback for when meeting is left
    onMeetingLeft: () => {
      props.onMeetingLeave();
    },
  });
  const joinMeeting = async () => {
    if (user.role === "admin" || user.role === "seller") {
      const updateUser = await axios.patch(`http://localhost:3001/user/${user._id}`, {
        liveID: props.meetingId
      })
      if (updateUser) {
        setJoined("JOINING")
        join()
        return
      }
    }
    setJoined("JOINING");
    join();
  };

  return (
    <div className="container">
      <h3>Meeting Id: {props.meetingId}</h3>
      {joined && joined == "JOINED" ? (
        <div>
          <Controls />
          {/* //For rendering all the participants in the meeting */}
          {[...participants.keys()].map((participantId) => (
            <ParticipantView
              participantId={participantId}
              key={participantId}
            />
          ))}
        </div>
      ) : joined && joined == "JOINING" ? (
        <p>Joining the meeting...</p>
      ) : (
        <button onClick={joinMeeting}>Join</button>
      )}
    </div>
  );
}

function App() {
  const [meetingId, setMeetingId] = useState(null);
  const [joined, setJoined] = useState(false);
  const [user, setUser] = useState("")

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("User")))
  }, [])

  const getMeetingAndToken = async (id) => {
    const meetingId =
      id === null ? await createMeeting({ token: authToken }) : id;
    setMeetingId(meetingId);
    setJoined(true);
  };

  const onMeetingLeave = () => {
    setMeetingId(null);
    setJoined(false);
  };

  return authToken && meetingId ? (
    <MeetingProvider
      config={{
        meetingId,
        micEnabled: false,
        webcamEnabled: false,
        name: user.name,
      }}
      token={authToken}
    >
      <MeetingView meetingId={meetingId} onMeetingLeave={onMeetingLeave} />
      {joined && <ChatView />}
    </MeetingProvider>
  ) : (
    <JoinScreen getMeetingAndToken={getMeetingAndToken} />
  );
}

export default App;
