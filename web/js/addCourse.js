function addCourse(courseName, courseDes, courseFee, courseStartDate, courseTeacher) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        course_name: courseName,
        course_des: courseDes,
        course_fee: courseFee,
        course_startdate: courseStartDate,
        course_teacher: courseTeacher,
    });

    var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
    };

    fetch("http://localhost:4000/course/add", requestOptions)
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.log("error", error));
}
