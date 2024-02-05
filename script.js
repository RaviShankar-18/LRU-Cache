class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = [];
  }

  // Function to get the value from the cache
  get(key) {
    const index = this.cache.findIndex((item) => item.key === key);

    if (index !== -1) {
      // If the key exists, move it to the front of the cache (most recently used)
      const item = this.cache.splice(index, 1)[0];
      this.cache.unshift(item);
      return item.value;
    }

    return -1; // Return -1 if the key is not found
  }

  // Function to put a new key-value pair in the cache
  put(key, value) {
    const index = this.cache.findIndex((item) => item.key === key);

    if (index !== -1) {
      // If the key exists, update the value and move it to the front
      this.cache.splice(index, 1);
    } else if (this.cache.length >= this.capacity) {
      // If the cache is full, remove the least recently used item (last item in the array)
      this.cache.pop();
    }

    // Add the new key-value pair to the front of the cache
    this.cache.unshift({ key, value });
  }
}
const lruCache = new LRUCache(5);

function initialiseCache(event) {
  lruCache.capacity = 3;
  const key = document.querySelector("#item").value;
  console.log(key);
  const value = document.querySelector("#item").value;
  lruCache.put(key, value);
  // lruCache.cache = [];
  displayCacheWithTimestamp();
  document.querySelector("#item").value = "";
}

// function displayCache() {
//   const cacheContent = lruCache.cache
//     .map((item) => `(${item.key}, ${item.value})`)
//     .join(", ");
//   document.getElementById(
//     "output"
//   ).innerHTML = `Current Cache Content: [${cacheContent}]`;
// }

// function getCacheValue() {
//   const key = document.querySelector("#item").value;
//   const result = lruCache.get(key);
//   if (result !== -1) {
//     document.querySelector(
//       "#output"
//     ).innerHTML = `Value for key ${key}: ${result}`;
//   } else {
//     document.querySelector(
//       "#output"
//     ).innerHTML = `Key ${key} not found in the cache.`;
//   }
// }

function displayCacheWithTimestamp() {
  const outputDiv = document.getElementById("output");
  outputDiv.innerHTML = "";

  lruCache.cache.forEach((item, index) => {
    const cardDiv = document.createElement("div");
    cardDiv.className = "cache-card";

    const timestampIcon = document.createElement("span");
    timestampIcon.className = "timestamp-icon";
    timestampIcon.innerHTML = `🕒`; // You can use a clock or any other time-related icon

    const cacheContent = document.createElement("span");
    // cacheContent.textContent = `(${item.key}, ${item.value})`;
    cacheContent.textContent = ` ${item.value}`;

    // cacheContent.textContent = getCacheValue();
    // console.log("cache Content", cacheContent);

    cardDiv.appendChild(timestampIcon);
    cardDiv.appendChild(cacheContent);

    outputDiv.appendChild(cardDiv);
  });
}

const button = document.querySelector("#btn");
button.addEventListener("click", initialiseCache);
