import React, { useState } from 'react'

import { Jutsu, useJitsi }  from 'react-jutsu'
import {connect} from "react-redux";

function CallView(props) {
    const [room, setRoom] = useState('')
    const [name, setName] = useState('')
    const [call, setCall] = useState(false)
    const [password, setPassword] = useState('')

    const handleClick = event => {
        event.preventDefault()
        if (room && name) setCall(true)
    }

    // return call ? (
    //     <Jutsu
    //         roomName={room}
    //         displayName={name}
    //         password={password}
    //         onMeetingEnd={() => console.log('Meeting has ended')}
    //         loadingComponent={<p>loading ...</p>}
    //         errorComponent={<p>Oops, something went wrong</p>} />
    // ) : (
    //     <form>
    //         <input id='room' type='text' placeholder='Room' value={room} onChange={(e) => setRoom(e.target.value)} />
    //         <input id='name' type='text' placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} />
    //         <input id='password' type='text' placeholder='Password (optional)' value={password} onChange={(e) => setPassword(e.target.value)} />
    //         <button onClick={handleClick} type='submit'>
    //             Start / Join
    //         </button>
    //     </form>
    // )

    const jitsiConfig = {
        roomName: Date.now(),
        displayName: 'David Osterberger',
        userInfo: {
            email: 'david@osterberger.eu',
            displayName: 'David Osterberger'
        },
        subject: 'Your Meeting with Benedikt Stelzl',
        password: 'asamplepasswordforpeeroulette',
        parentNode: 'jitsi-container',
        width: '100%',
        height: '100%',
        configOverwrite: {
            startWithAudioMuted: false,
            enableWelcomePage: false,
        },
        interfaceConfigOverwrite: {
            DEFAULT_REMOTE_DISPLAY_NAME: 'Fellow Peer',
            DISPLAY_WELCOME_FOOTER: false,
            DISPLAY_WELCOME_PAGE_ADDITIONAL_CARD: false,
            DISPLAY_WELCOME_PAGE_CONTENT: false,
            DISPLAY_WELCOME_PAGE_TOOLBAR_ADDITIONAL_CONTENT: false,
            RECENT_LIST_ENABLED: false,
            SETTINGS_SECTIONS: [],
            SHARING_FEATURES: [],
            SHOW_JITSI_WATERMARK: false,
            GENERATE_ROOMNAMES_ON_WELCOME_PAGE: false,
        },
    };
    const { loading, error, jitsi } = useJitsi(jitsiConfig);

    return (
        <div style={{height:"100%"}}>
            {error && <p>{error}</p>}
            <div  style={{height:"100%"}} id={jitsiConfig.parentNode} />
        </div>
    );
}

export default connect()(CallView);