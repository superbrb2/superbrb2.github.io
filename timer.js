function createCookie(data) {
    document.cookie = 'data=' + JSON.stringify(data)
}

function beautify(timeLeft) {
    var seconds = Math.floor(timeLeft / 1000);
    var minutes = Math.floor(seconds / 60);
    var hours = Math.floor(minutes / 60);
    var days = Math.floor(hours / 24);

    hours = hours - (days * 24);
    minutes = minutes - (days * 24 * 60) - (hours * 60);
    seconds = seconds - (days * 24 * 60 * 60) - (hours * 60 * 60) - (minutes * 60);
    return [days, hours, minutes, seconds]
}

function getTime(date) {
    if (date == 'unknown') {
        return 'Unknown'
    }
    var dateEnd = new Date(date);
    var dateCurrent = new Date();
    var timeLeft = dateEnd.getTime() - dateCurrent.getTime();

    if (timeLeft < 0) {
        return 'complete'
    }

    return beautify(timeLeft);
}

function fetchJSONData() {
    fetch("./dates.json")
        .then((res) => {
            if (!res.ok) {
                throw new Error
                    (`HTTP error! Status: ${res.status}`);
            }
            return res.json();
        })
        .then((data) => {
            setInterval(main, 1000, data)
        })
        .catch((error) =>
            console.error("Unable to fetch data:", error));

    return ret_data
}

function addDate(name, date) {
    dictOfDates.set(name, date);
}

function main(dictOfDates) {
    console.log(dictOfDates);
    let temp = '';
    for (let i = 0; i < dictOfDates['names'].length; i++) {
        var timeArray = getTime(dictOfDates.dates[i]);
        if (timeArray == 'complete') {
            temp += '<li><h1>' + dictOfDates.names[i] + '</h1><p>' + getTime(dictOfDates.dates[i]) + '</p></li>';
        }
        else if (timeArray == 'Unknown') {
            temp += '<li><h1>' + dictOfDates.names[i] + '</h1><p>' + getTime(dictOfDates.dates[i]) + '</p></li>';
        }
        else {
            temp += '<li><h1>' + dictOfDates.names[i] + '</h1><div class="days"><span>' + timeArray[0] + '</span><br><span class="text">Days</span></div><div class="hours"><span>' + timeArray[1] + '</span><br><span class="text">hours</span></div><div class="mins"><span>' + timeArray[2] + '</span><br><span class="text">minutes</span></div><div class="secs"><span>' + timeArray[3] + '</span><br><span class="text">seconds</span></div></li>'
        }
    }
    document.getElementById('lists').innerHTML = temp;
}
fetchJSONData();




