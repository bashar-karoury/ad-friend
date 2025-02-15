let resources = {};
let userSettings = {
  "category": "default"
}
async function fetchResources() {
  const url = chrome.runtime.getURL("resources.json");

  try {
    const response = await fetch(url);
    resources = await response.json();
    console.log("resources:", resources);
  } catch (error) {
    console.error("Error loading JSON:", error);
  }
}


function getUserSettings() {
  chrome.storage.sync.get(['userSettings']).then(result => {

    console.log('userSetting stored', result);
    if (result.userSettings) {
      Object.keys(result.userSettings).forEach(key => {
        userSettings[key] = result.userSettings[key];
      });
    }
  })

}
getUserSettings();

function replaceAds() {
  const adSelectors = [
    "iframe[src^='ads']",
    "div[id*='-ad-']",
    "div[class*=' ad ']",
    "div[class$='-ad']",
    "div[class*='-ad-']",
    // "div[class^='ad']",
    "div[class$=' ad']",
    "div[class$=' ad ']",
    "ins.adsbygoogle",
    "ins",
    "section[data-name*='advertisement']",
    "[data-ad-placeholder]"
  ];

  let ads = [];
  adSelectors.forEach(selector => {
    document.querySelectorAll(selector).forEach(ad => {
      ads.push(ad);
    });
  });

  ads = ads.filter(ad => !isNested(ad, ads));
  console.log('after filtering');
  print_ads(ads);

  // get user category selection from 

  ads.forEach(ad => {

    const replacement = contentGenerator(ad);
    if (replacement) {

      ad.style.display = 'flex';
      ad.style.alignItems = 'center';
      ad.style.justifyContent = 'center';
      ad.innerHTML = '';
      ad.appendChild(replacement);
    }
  });
}

function isNested(element, ads) {
  for (let ad of ads) {
    if (ad !== element && ad.contains(element)) {
      return true;
    }
  }
  return false;
}

// Run on page load
window.addEventListener("load", async () => {
  await fetchResources();
  replaceAds();
});


function print_ads(ads) {
  ads.forEach(ad => { console.log(ad) });
}



// Function to generate content dynamically
function contentGenerator(adElement) {
  return generateText(adElement);
}



// Function to replace an ad with text
function generateText(adElement) {
  const text = getRandomText();
  if (!text)
    return
  const textContainer = document.createElement("div");
  textContainer.innerText = text;
  textContainer.style.padding = "10px";
  textContainer.style.margin = "30px";
  textContainer.style.fontSize = "28px";
  textContainer.style.backgroundColor = "#000000";
  textContainer.style.color = "#FFFFFF";
  textContainer.style.borderRadius = "2px";
  textContainer.style.width = "auto";
  textContainer.style.height = "100%";
  textContainer.style.border = "2px solid #FFFFFF";
  textContainer.style.borderRadius = "10px";
  textContainer.style.display = "flex";
  textContainer.style.alignItems = "center";
  textContainer.style.justifyContent = "center";
  return textContainer;
}



// Function to get a random motivational quote (dummy function for now)
function getRandomText() {
  const quotes = resources[userSettings.category];
  if (quotes) {
    return quotes[Math.floor(Math.random() * quotes.length)];
  }
}

// Monitor dynamically loaded ads
// const observer = new MutationObserver(replaceAds);
// observer.observe(document.body, { childList: true, subtree: true });