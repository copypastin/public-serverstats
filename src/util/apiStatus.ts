import fetch from "node-fetch";

export default function apiStatus() {
    var status;

    fetch('https://api.mcsrvstat.us/')
    .then(res => {
       if(res.ok || res.status === 200) status = true
       if(res.status = 404) status = false;
    })
    .catch(() => {
        status = false
    })
    return(status)
}