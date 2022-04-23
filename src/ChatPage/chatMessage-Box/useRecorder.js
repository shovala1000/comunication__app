import { useEffect, useState } from "react";

/*
creating userRecording state, for tracking the state when recording a message.
*/
const useRecorder = () => {
    const [audioURL, setAudioURL] = useState("");
    const [isRecording, setIsRecording] = useState(false);
    const [recorder, setRecorder] = useState(null);

    // setting useState fot displaying the recording bar.
    const [currentAudioClassName, setAudioClassName] = useState('audio-recording-hide');

    useEffect(() => {

        // Obtained the first time we record.
        if (recorder == null) {
            if (isRecording) {
                requestRecorder().then(setRecorder, console.error);
            }
            return;
        }

        // Change recorder state.
        if (isRecording) {
            recorder.start();
        } else {
            recorder.stop();
        }

        const handleData = e => {
            setAudioURL(URL.createObjectURL(e.data));
        };

        // adding listener to the recording
        recorder.addEventListener("dataavailable", handleData);
        return () => recorder.removeEventListener("dataavailable", handleData);

    }, [recorder, isRecording]);

    // change the state at start recording.
    const startRecording = () => {
        setIsRecording(true);
    }

    // change the state at stop recording.
    const stopRecording = () => {
        setIsRecording(false);
    }

    // changing the name of the class, use the function when pressing the microphone button
    const changeAudioClassName = () => {

        if (isRecording === true) {
            stopRecording();
        }
        let name = currentAudioClassName;
        if (name === 'audio-recording-hide') {
            name = 'audio-recording';
        }
        else {
            name = "audio-recording-hide";
        }
        setAudioClassName(name);
        setAudioURL("");
    }

    return [audioURL, isRecording, startRecording, stopRecording, currentAudioClassName, changeAudioClassName];

};

// requesting the recording, creating new recording for the user.
async function requestRecorder() {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    return new MediaRecorder(stream);
}

export default useRecorder;