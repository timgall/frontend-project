const quotes = [`That is a canvas sheet—the most versatile object known to man. It can be used to make tents, backpacks, shoes, stretchers, sails, tarpaulins, and I suppose, in the most dire of circumstances, it can be a surface on which to make art.`,
`There is only one bad word: taxes.`,
`There's more than one crib tree in a forest. That's not a lesson, by the way, just a comment on lumber availability.`,
`When people get too chummy with me, I like to call them by the wrong name to let them know I don’t really care about them.`,
`I’ve cried twice in my life. Once when I was 7 and hit by a school bus. And then again when I heard that Li’l Sebastian had passed.`,
`Capitalism: God’s way of determining who is smart and who is poor.`,
`Crying: Acceptable at funerals and the Grand Canyon.`,
`Fishing relaxes me. It’s like yoga, except I still get to kill something.`,
`Great job, everyone. The reception will be held in each of our individual houses, alone.`,
`History began on July 4, 1776. Everything that happened before that was a mistake.`,
`Literally everything is a weapon, son. That folder, in my hands, is far deadlier than this bow of yours.`,
`I have a hernia. I’ve had it for a while, and I’ve been ignoring it successfully. But uh, this morning, I made the mistake of sneezing. But as long as I sit still and don’t move my head or torso, I’m good. I got this.`,
`Straight down the middle. No hook, no spin, no fuss. Anything more and this becomes figure skating.`,
`Cowardice and weak-willed men… and hazelnuts.`,
`Birthdays were invented by Hallmark to sell cards.`,
`Any dog under fifty pounds is a cat and cats are useless.`,
`I would rather bleed out than sit here and talk about my feelings for 10 minutes.`];

const quoteElem = document.getElementById("quote");

function getRandomQuote() {
  const quoteTag = document.createElement("p")
  const randomNumber = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomNumber];

  quoteTag.innerText=quote;
  quoteElem.append(quoteTag);
  console.log(quoteTag)
}

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
            li.on('click',()=>{
              const clickedBreweryName = li.text();
              const clickedBreweryData = data.filter(brewery => brewery.name === clickedBreweryName)[0];
              const breweryDiv = $('<div>');
              breweryDiv.text(`${clickedBreweryData.name}, ${clickedBreweryData.city}, ${clickedBreweryData.state}`);
              clickedBrewery.append(breweryDiv);
            })
        });
          city.val("");
          state.val("");
          result.append(image);
          getRandomQuote();
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
              li.on('click',()=>{
                const clickedBreweryName = li.text();
                const clickedBreweryData = data.filter(brewery => brewery.name === clickedBreweryName)[0];
                const breweryDiv = $('<div>');
                breweryDiv.text(`${clickedBreweryData.name}, ${clickedBreweryData.city}, ${clickedBreweryData.state}`);
                clickedBrewery.append(breweryDiv);
              })
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
const clickedBrewery=$(".clickedBrewery")

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
                li.on('click',()=>{
                  const clickedBreweryName = li.text();
                  const clickedBreweryData = data.filter(brewery => brewery.name === clickedBreweryName)[0];
                  const breweryDiv = $('<div>');
                  breweryDiv.text(`${clickedBreweryData.name}, ${clickedBreweryData.city}, ${clickedBreweryData.state}`);
                  clickedBrewery.append(breweryDiv);
                })
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


//add an eventlistner to each of the names that
//add an eventlistner to each of the names that appears and have the entire data appear to the right (twiddler)
//see if you can add images or a map that pulls in their address