//This function returns a string that contain the current date and time. 
export function getCurrentTime(input) {
    if (input != null) {
        const today = new Date(input)
        let date = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();
        let minutes = today.getMinutes();
        let time;
        // checking the case when number of minutes smaller than 10.
        if (minutes > 10) {
            time = today.getHours() + ":" + today.getMinutes();
        } else {
            time = today.getHours() + ":0" + today.getMinutes();
        }
        let dateTime = time + ', ' + date;
        return String(dateTime)
    }
}