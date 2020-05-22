var video = document.getElementsByTagName("video")[0];
var stamps_holder = document.getElementsByClassName("stamps")[0]
var stamps;
var global_end = video.duration;
function player() {
    video.play()
}
fetch('info.json')
    .then(function (res) {
        return res.json()
    })
    .then(function (data) {
        stamps = data.info;
        document.getElementById("video_title").innerHTML = data.meta[0]["Video Title"]

        stamps.forEach(function (stamp) {
            var new_stamp = document.createElement("div");
            new_stamp.classList.add("stamp");
            var title = document.createElement("div");
            title.classList.add("stamp_title")
            var stamp_info = document.createElement("div");
            stamp_info.classList.add("stamp_info")

            title.innerHTML = stamp.Title;
            stamp_info.innerHTML = `${stamp['Start Time']} - ${stamp['End Time']}`
            new_stamp.appendChild(title);
            new_stamp.appendChild(stamp_info);
            stamps_holder.appendChild(new_stamp);

            var start_time = parseFloat(stamp['Start Time'].split(":")[1]);
            var end_time = parseFloat(stamp['End Time'].split(":")[1]);

            new_stamp.onclick = function () {
                updateTime(start_time);
                global_end = end_time;
                global_start = start_time;
            }

        })
    })


function updateTime(start) {
    video.currentTime = start;
    video.play()
}

function stop(end) {
    if (video.currentTime >= end) {
        // video.currentTime = 0;
        video.pause();
    }

}

function reset() {
    global_end = video.duration;

}


video.addEventListener("timeupdate", function () {
    stop(global_end)
})
video.addEventListener("seeked", function () {
    if (video.currentTime < global_start || video.currentTime > global_end) {
        reset()
    }
})

document.getElementById("cover").onclick = function () {
    alert("ok")
}