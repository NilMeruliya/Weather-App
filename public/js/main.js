const day = document.getElementById("day"); //day
const today_data = document.getElementById("today_data"); //date
const cityName = document.getElementById("cityName"); //input city
const city_name = document.getElementById("city_name"); //output city
const submitBtn = document.getElementById("submitBtn"); //search
const temp = document.getElementById("temp"); //tempereture
const temp_status = document.getElementById("temp_status"); //temp_status
const datahide = document.querySelector(".middle_layer");




// for day 

const CurDay_data = () => {
    
    const weekday = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

    let currentTime = new Date();
    let day = weekday[currentTime.getDay()]

    // currentTime.getDay() = it gives result in 0 to 6 ACCOrding to days: mon, tue, wed, thu, fri, sat.

    // console.log(day);
    return day; 
}

day.innerHTML = `${CurDay_data()}`;



// for date and time 

const CurDate_data = () => {
    
    const months = ["Jan","Feb","Mar","Apr","May","June","July", "Aug", "Sept", "Oct", "Nov", "Dec"];

            let curTime = new Date();
            let date = curTime.getDate();
            let month = months[curTime.getMonth()];

            let hr = curTime.getHours();
            let min = curTime.getMinutes();
            let sec = curTime.getSeconds();

            let period = "AM";

            if(hr < 11){
                console.log(period);
            }else{
                period = "PM";
                if(hr > 12){
                    hr -= 12;
                }
                if(min < 10){
                    min = `0${min}`
                }
                // console.log("PM");
                // console.log(`${hr}:${min}:${sec} PM`);

            }

            return `${date} ${month} | ${hr}:${min}:${sec} ${period}`
}

today_data.innerHTML = `${CurDate_data()}`;




const getInfo = async (event) => {

    event.preventDefault();
    let cityVal = cityName.value;
    if(cityVal === ""){
        city_name.innerHTML = `Please write your city name.`
        dataHide.classList.add("data_hide");
    }else{
        try {
            let url = `http://api.openweathermap.org/data/2.5/weather?q=${cityVal}&units=metric&appid=3d87dd373e68808fa36d934d21697474`

            const response = await fetch(url);           
            // console.log(response); // got the response in the form of JSON 

            const data = await response.json();
            // console.log(data); // if we do not use "await" above, we got the promise || but if we use the promise we get "coord". // both returns the right data.

            // convert data into array 
            const arrData = [data];

            city_name.innerText = arrData[0].name; 
            temp.innerHTML = `${arrData[0].main.temp}`;  

            const tempStatus = arrData[0].weather[0].main; 

            //conditions to check sunny, cloudy, rainy...
            if(tempStatus == "Sunny"){
                temp_status.innerHTML =  '<i class="fas fa-sun" style="color : #eccc68"></i>'
            }
            else if(tempStatus == "Clouds"){
                temp_status.innerHTML =  "<i class='fas fa-cloud' style='color : #dfe4ea'></i>"
            }
            else if(tempStatus == "Drizzle"){
                temp_status.innerHTML =  '<i class="fas fa-tint" style="color : #dfe4ea"></i>'
            }
            else if(tempStatus == "Rain"){
                temp_status.innerHTML =  '<i class="fas fa-cloud-rain" style="color : #dfe4ea"></i>'
            }
            else if(tempStatus == "Thunderstorm"){
                temp_status.innerHTML =  '<i class="fas fa-bolt" style="color : #dfe4ea"></i>'
            }
            else if(tempStatus == "Snow"){
                temp_status.innerHTML =  '<i class="fas fa-snowflake" style="color : #dfe4ea"></i>'
            }
            else if(tempStatus == "Clear"){
                temp_status.innerHTML =  '<i class="fas fa-cloud" style="color : #dfe4ea"></i>'
            }

            datahide.classList.remove("data_hide")
    

        } catch  {
            
            datahide.classList.add("data_hide")
            city_name.innerHTML = `Please enter the "correct" city name.`
        }
       
    }
}

submitBtn.addEventListener("click", getInfo)