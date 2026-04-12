import { success, error } from "@pnotify/core/dist/PNotify.js";
import * as PNotifyMobile from "@pnotify/mobile/dist/PNotifyMobile.js";
import "@pnotify/mobile/dist/PNotifyMobile.css";
import "@pnotify/core/dist/PNotify.css";
import "@pnotify/core/dist/BrightTheme.css";
import debounce from "../node_modules/lodash.debounce/";

const inputRef = document.querySelector(".checkcountry");
const listRef = document.querySelector(".list")

inputRef.addEventListener(
  "input",
  debounce((event) => {
    const value = event.target.value;
    accets(value).then((res) => {
        listRef.innerHTML= ""
      if (res.length > 10) {
        error({
          title: "Oh No!",
          text: "зробіть запит спецефічним",
        });
        return;
      }
      if(res.length > 2&& res.length < 10){
        listRef.innerHTML = ""
        const item = res.map(country =>{
            return `<li class="country">${country.name.common}</li>`
        }).join("")
        listRef.innerHTML= item
      }
       if(res.length === 1 ){
        console.log(res);
        
        listRef.innerHTML = ""
        const item = res.map(country =>{
            const languages  = Object.values(country.languages)
            console.log(languages);
            
            return `<li class="country">
             <h2>${country.name.common}</h2>
             <p>Capital: ${country.capital[0]}</p>
             <p>Population: ${country.population}</p>
             <h3>Languages: </h3>
            <ul>${languages.map(()=>{
                return `<li>${country.languages.fra}</li>
                <li>${country.languages.gsw}</li>
                <li>${country.languages.ita}</li>
                <li>${country.languages.roh}</li>`
            })
        }</ul>
            </li>`
        }).join("")
        listRef.innerHTML= item
    }
    });
   
  }, 500),
);

function accets(value) {
  return fetch(`https://restcountries.com/v3.1/name/${value}`).then((res) =>
    res.json(),
  );
}
