const date_time = document.getElementById('date');

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const d = new Date();
let month = months[d.getMonth()];
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let day = days[d.getDay()];
const markup = `<h2>${day},${d.getDate()+' '+month+','+d.getFullYear()}</h2>`
                
date_time.innerHTML = markup;

