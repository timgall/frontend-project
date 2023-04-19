const searchBtn = $(".search");
const zipCode = $("#zip-code");
const result = $(".result");

searchBtn.on('click', () => {
    const query = zipCode.val().substr(0, 5); // extract first five digits of the zip code
    $.get(`https://api.openbrewerydb.org/v1/breweries?by_postal=${query}&per_page=20`, (data)=>{
        result.html("");
        const breweries = data.filter(brewery => brewery.postal_code.substr(0, 5) === query)
                              .map(brewery => brewery.name);
        if (breweries.length === 0) {
            const image = $('<img>').attr('src', 'sadRon.png');
            result.html("");
            result.append(image);
        }else {
          const ul = $('<ul>');
          const image = $('<img>').attr('src', 'https://media.tenor.com/i1MnpOuskr4AAAAC/parks-and-rec-ron-swanson.gif').attr('width', '500').attr('height', '300');
          breweries.forEach(name=>{
              const li=$('<li>').text(name);
              ul.append(li);
            });
            city.val("");
            state.val("");
            result.append(image);
            result.append(ul);
        }
    });
});

const stateSearchBtn=$(".searchState");
const state = $("#state");
const stateResult = $(".stateResult");

stateSearchBtn.on('click', () => {
    const query = state.val();
    $.get(`https://api.openbrewerydb.org/v1/breweries?by_state=${query}&per_page=20`, (data)=>{
        stateResult.html("");
        const breweries = data.filter(brewery => brewery.state_province === query)
                              .map(brewery => brewery.name);
        if (breweries.length === 0) {
          const img = $('<img>').attr('src', 'sadRon.png');
          stateResult.html("");
          stateResult.append(img);
         }else {
            const ul = $('<ul>');
            const image = $('<img>').attr('src', 'https://media.tenor.com/i1MnpOuskr4AAAAC/parks-and-rec-ron-swanson.gif').attr('width', '500').attr('height', '300');
            breweries.forEach(name=>{
                const li=$('<li>').text(name);
                ul.append(li);
            });
            city.val("");
            zipCode.val("");
            stateResult.append(image);
            stateResult.append(ul);
        }
    });
});

const citySearchBtn = $(".searchCity");
const city = $("#city");
const cityResult = $(".cityResult");

citySearchBtn.on('click', ()=>{
    const query = city.val();
    $.get(`https://api.openbrewerydb.org/v1/breweries?by_city=${query}&per_page=20`, (data)=>{
        cityResult.html("");
        const breweries = data.filter(brewery => brewery.city === query)
                              .map(brewery=> brewery.name);
        if (breweries.length === 0) {
          const img = $('<img>').attr('src', 'sadRon.png');
          cityResult.html("");
          cityResult.append(img);
        }
        else {
            const ul = $('<ul>');
            const image = $('<img>').attr('src', 'https://media.tenor.com/i1MnpOuskr4AAAAC/parks-and-rec-ron-swanson.gif').attr('width', '500').attr('height', '300');
            breweries.forEach(name=>{
                const li=$('<li>').text(name);
                ul.append(li);
            });
            zipCode.val("");
            state.val("");
            cityResult.append(image);
            cityResult.append(ul);
        }
    });
});

const clearBtn = $(".clear");
clearBtn.on('click', ()=> {
    city.val("");
    $(".searchByZip").eq(0).css("display","none");
    $(".searchByState").eq(0).css("display","none");
    $(".searchByCity").eq(0).css("display","none");
    zipCode.val("");
    state.val("");
    result.html("");
});

//add an eventlistner to each of the names that
//add an eventlistner to each of the names that appears and have the entire data appear to the right (twiddler)
//add cool background
//see if you can add images or a map that pulls in their address
$(document).ready(function() {
  function myFunction() {
    $('#myDropdown').toggleClass('show');
  }
  function filterFunction() {
    var input, filter, ul, li, a, i;
    input = $('#myInput');
    filter = input.val().toUpperCase();
    div = $('#myDropdown');
    a = div.find('a');
    for (i = 0; i < a.length; i++) {
      txtValue = a[i].textContent || a[i].innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        $(a[i]).show();
      } else {
        $(a[i]).hide();
      }
    }
  }

  const zipCodeLink = $('a[href="#zipCodeSearchLink"]');

  zipCodeLink.click(function() {
    $('.searchByState').hide();
    $('.searchByCity').hide();
    const zipCodeSearchDiv = $('#zipCodeSearchDiv');
    zipCodeSearchDiv.show();
  });

  const stateLink = $('a[href="#stateSearchLink"]');

  stateLink.click(function() {
    $('.searchByZip').hide();
    $('.searchByCity').hide();
    const stateSearchDiv = $('#stateSearchDiv');
    stateSearchDiv.show();
  });

  const cityLink = $('a[href="#citySearchLink"]');

  cityLink.click(function() {
    $('.searchByZip').hide();
    $('.searchByState').hide();
    const citySearchDiv = $('#citySearchDiv');
    citySearchDiv.show();
  });
});
