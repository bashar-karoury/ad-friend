function replaceAds() {
  const adSelectors = [
    "iframe[src^='ads']",
    "div[id*='-ad-']",
    "div[class*=' ad']",
    "div[class*='-ad']",
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
    let replacement = document.createElement("img");
    replacement.src = chrome.runtime.getURL('images/timeIsSword.jpg');
    replacement.style.width = ad.clientWidth + "px";
    replacement.style.height = ad.clientHeight + "px";
    // replacement.style.minHeight = "10px";
    // replacement.style.objectFit = "cover";
    // replacement.style.border = "2px solid #ddd";
    // replacement.innerText = "Your Ad-Friend Content Here";

    ad.innerHTML = '';
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
// // Monitor dynamically loaded ads
// const observer = new MutationObserver(replaceAds);
// observer.observe(document.body, { childList: true, subtree: true });