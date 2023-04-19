
const searchBtn = document.querySelector(".search");
const zipCode = document.getElementById("zip-code");
const result = document.querySelector(".result");

searchBtn.addEventListener('click', () => {
    const query = zipCode.value.substr(0, 5); // extract first five digits of the zip code
    $.get(`https://api.openbrewerydb.org/v1/breweries?by_postal=${query}&per_page=20`, (data)=>{
        result.innerHTML = "";
        const breweries = data.filter(brewery => brewery.postal_code.substr(0, 5) === query)
                              .map(brewery => brewery.name);
        if (breweries.length === 0) {
            const image = document.createElement('img')
            image.src="sadRon.png";
            result.innerHTML = ""
            result.appendChild(image)
        } else {
            const ul = document.createElement('ul');
            breweries.forEach(name => {
                const li = document.createElement('li');
                li.innerText = name;
                ul.appendChild(li);
            });
            city.value="";
            state.value="";
            result.appendChild(ul);
        }
    });
});

const stateSearchBtn=document.querySelector(".searchState");
const state = document.getElementById("state");
const stateResult = document.querySelector(".stateResult")

stateSearchBtn.addEventListener('click', () => {
    const query = state.value; // extract first five digits of the zip code
    $.get(`https://api.openbrewerydb.org/v1/breweries?by_state=${query}&per_page=20`, (data)=>{
        result.innerHTML = "";
        const breweries = data.filter(brewery => brewery.state_province === query)
                              .map(brewery => brewery.name);
        if (breweries.length === 0) {
            const img = document.createElement('img');
            img.src = "sadRon.png";
            cityResult.innerHTML = ""; // clear the cityResult element
            cityResult.appendChild(img); 
        } else {
            const ul = document.createElement('ul');
            breweries.forEach(name => {
                const li = document.createElement('li');
                li.innerText = name;
                ul.appendChild(li);
            });
            city.value="";
            zipCode.value="";
            result.appendChild(ul);
        }
    });
});
const citySearchBtn = document.querySelector(".searchCity")
const city = document.getElementById("city");
const cityResult = document.querySelector(".cityResult")
citySearchBtn.addEventListener('click', ()=>{
    const query = city.value
    $.get(`https://api.openbrewerydb.org/v1/breweries?by_city=${query}&per_page=20`, (data)=>{
        result.innerHTML="";
        const breweries = data.filter(brewery => brewery.city === query)
                                .map(brewery=> brewery.name);
            if (breweries.length === 0) {
            const img = document.createElement('img');
            img.src = "sadRon.png";
            cityResult.innerHTML = ""; // clear the cityResult element
            cityResult.appendChild(img); 
            }
            else {
                const ul = document.createElement('ul')
                breweries.forEach(name=>{
                    const li=document.createElement('li');
                    li.innerText = name;
                    ul.appendChild(li);
                })
                zipCode.value="";
                state.value="";
                result.appendChild(ul);
            }
    })
})
const clearBtn = document.querySelector(".clear");
clearBtn.addEventListener('click', ()=> {
    city.value="";
    document.getElementsByClassName("searchByZip")[0].style.display="none"
    document.getElementsByClassName("searchByState")[0].style.display="none"
    document.getElementsByClassName("searchByCity")[0].style.display="none"
    zipCode.value="";
    state.value="";
    result.innerHTML = "";

})

//add an eventlistner to each of the names that appears and have the entire data appear to the right (twiddler)
//add cool background
//see if you can add images or a map that pulls in their address

/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
  }
  
  function filterFunction() {
    var input, filter, ul, li, a, i;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    div = document.getElementById("myDropdown");
    a = div.getElementsByTagName("a");
    for (i = 0; i < a.length; i++) {
      txtValue = a[i].textContent || a[i].innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        a[i].style.display = "";
      } else {
        a[i].style.display = "none";
      }
    }
  }
  const zipCodeLink = document.querySelector('a[href="#zipCodeSearchLink"]');

  zipCodeLink.addEventListener('click', function() {
    document.getElementsByClassName("searchByState")[0].style.display="none"
    document.getElementsByClassName("searchByCity")[0].style.display="none"
    const zipCodeSearchDiv = document.querySelector('#zipCodeSearchDiv');
    zipCodeSearchDiv.style.display = 'block';
  });

  const stateLink= document.querySelector('a[href="#stateSearchLink"]');

  stateLink.addEventListener('click', function() {
    document.getElementsByClassName("searchByZip")[0].style.display="none"
    document.getElementsByClassName("searchByCity")[0].style.display="none"
    const stateSearchDiv = document.querySelector('#stateSearchDiv');
    stateSearchDiv.style.display = 'block';
  });
  const cityLink = document.querySelector('a[href="#citySearchLink"]');

  cityLink.addEventListener('click', function() {
    document.getElementsByClassName("searchByZip")[0].style.display="none"
    document.getElementsByClassName("searchByState")[0].style.display="none"
    const citySearchDiv = document.querySelector('#citySearchDiv');
    citySearchDiv.style.display = 'block';
  });