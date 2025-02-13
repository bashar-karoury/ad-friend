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

  // Filter out nested elements
  // console.log('before filtering');
  // print_ads(ads);
  ads = ads.filter(ad => !isNested(ad, ads));
  console.log('after filtering');
  print_ads(ads);
  // console.log(ads);

  ads.forEach(ad => {

    const replacement = contentGenerator(ad);
    ad.innerHTML = '';
    ad.style.display = 'flex';
    ad.style.justifyContent = 'center';
    ad.style.alignItems = 'center';
    ad.appendChild(replacement);
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
window.addEventListener("load", replaceAds);


function print_ads(ads) {
  ads.forEach(ad => { console.log(ad) });
}



// Function to generate content dynamically
function contentGenerator(adElement) {
  // const { width, height } = adElement.getBoundingClientRect();
  const width = adElement.clientWidth;
  const height = adElement.clientHeight;

  if (width > 100 && height > 100) {
    // Large slot → Image replacement
    return generateImage(adElement, width, height);
  } else {
    // Small slot → Text replacement
    return generateText(adElement);
  }
}

// Function to replace an ad with an image
function generateImage(adElement, width, height) {
  const img = document.createElement("img");
  img.src = getRandomImageURL(width, height);
  img.style.width = `${width}px`;
  img.style.height = `${height}px`;
  img.style.borderRadius = "5px";
  img.style.objectFit = "cover";

  return img;
}

// Function to replace an ad with text
function generateText(adElement) {
  const textContainer = document.createElement("div");
  textContainer.innerText = getRandomQuote();
  textContainer.style.padding = "10px";
  textContainer.style.margin = "10px";
  textContainer.style.fontSize = "20px";
  textContainer.style.backgroundColor = "#000000";
  textContainer.style.color = "#FFFFFF";
  textContainer.style.borderRadius = "2px";
  textContainer.style.textAlign = "center";
  return textContainer;
}

// Function to get a random image (dummy function for now)
function getRandomImageURL(width, height) {
  return `https://placehold.co/${Math.round(width)}x${Math.round(height)}`;
}

// Function to get a random motivational quote (dummy function for now)
function getRandomQuote() {
  const quotes = [
    "Believe in yourself!😀",
    "Stay positive and work hard!",
    "Success is the sum of small efforts repeated daily.",
    "Dream big, take action!"
  ];
  return quotes[Math.floor(Math.random() * quotes.length)];
}

// // Run the replacement process on page load
// window.onload = function () {
//   const adElements = getAdPlaceholders();
//   adElements.forEach(contentGenerator);
// };

// // Monitor dynamically loaded ads
// const observer = new MutationObserver(replaceAds);
// observer.observe(document.body, { childList: true, subtree: true });