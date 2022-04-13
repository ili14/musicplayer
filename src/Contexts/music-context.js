import React from 'react'

const MusicContext = React.createContext({
    data:{
        musicSrc: "",
    },
    setData: (data)=>{}
})

export default MusicContext;
