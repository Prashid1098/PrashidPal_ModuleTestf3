const API_KEY="gDNdC2n0h1sKrgChpXcsxLkNSyFPf59YwbEBVkzP";
const forms=document.getElementById("search-form");
const searchSub=forms.querySelector("#datesub");
const dateD=document.querySelector("#current-image-container");
const prevD=document.querySelector("#search-history");
const url_n="https://api.nasa.gov/planetary/apod?api_key=";


async function checkDate(dates)
{
    const response=await fetch(url_n+API_KEY+`&date=${dates}`);
    var info= await response.json();
    console.log(info);
    const result=getImageOfTheDay(info);
    // addSearchToHistory(`${info.date}`);
    return result;
}

function getImageOfTheDay(info)
{
    dateD.classList.add("date-d");
    dateD.innerHTML=`
    <div class="nasa-result">
    <div class="header-n">Picture on: ${info.date}</div>
    <img src="${info.url}" alt="" id="nasa-photo">
    <div class="contain-n">
    <div id="title">${info.title}</div><br>
    <div id="descrip">${info.explanation}</div>
    </div>
    </div>`
    saveSearch(info,dateD);
    return dateD;
}

function saveSearch(info,dateD)
{
    const store=[];
    store.push(dateD);
    addSearchToHistory(`${info.date}`);
}

function addSearchToHistory(date)
{
    const anchor = document.createElement("a");
    anchor.textContent = date;
    anchor.href="#";

    const listItem = document.createElement("li");

    listItem.appendChild(anchor);

    prevD.appendChild(listItem);

    anchor.addEventListener("click",()=>{
        if(date==anchor.textContent)
        {
            checkDate(date);
            prevD.removeChild(listItem);
        }
    });
}

searchSub.addEventListener("click",()=>{
    event.preventDefault();
    //console.log(100);
    const searchBox=forms.querySelector("#search-input");
    const dates=searchBox.value;
    checkDate(dates);

    // if (prevD.lastChild) {
    //     prevD.removeChild(prevD.lastChild);
    // }
    //console.log(dates+"date");
});