async function fetchDataFromAPI(api) {
    const res = await fetch(api);
    const data = await res.json();
    return data;
}

function getCachedData(key) {
    return JSON.parse(localStorage.getItem(key));
}

function cacheData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

function searchByName(arr, searchState) {
    return arr.filter(elm => elm.name.common.toLowerCase().includes(searchState.toLowerCase()));
}

function searchByFilter(arr, filter, value) {
    if (value == 'all') return arr;
    return arr.filter(elm =>
        elm[`${filter.toLowerCase()}`].toLowerCase() == value.toLowerCase()
    )
}

function searchByRegion(arr, region) {
    if (region.toLowerCase() == 'all') return arr;

    return arr.filter(elm => elm.region.toLowerCase() == region.toLowerCase())
}

function searchByLanguage(arr, language) {
    if (language.toLowerCase() == 'all') return arr;

    return arr.filter(elm => {
        const langs = elm.languages;
        for (elm in langs) {
            if (langs[elm] == language) return true;
        }
    });
}

function copyArray(arr) {
    let newArr = [];
    arr.forEach(val => newArr.push(val));

    return newArr;
}

function getCountryNamefromCCA(cca) {
    
}

function divideArray(inputArray, numSubarrays) {
    console.log(inputArray);
    // Calculate the number of elements in each subarray
    const elementsPerSubarray = Math.floor(inputArray.length / numSubarrays);

    // Initialize an array to store the subarrays
    const subarrays = [];

    // Divide the input array into subarrays
    for (let i = 0; i < numSubarrays; i++) {
        const startIndex = i * elementsPerSubarray;
        const endIndex = (i + 1) * elementsPerSubarray;

        // Slice the input array to create a subarray
        const subarray = inputArray.slice(startIndex, endIndex);

        // Add the subarray to the list of subarrays
        subarrays.push(subarray);
    }

    // If there are any remaining elements, add them to the last subarray
    if (inputArray.length % numSubarrays !== 0) {
        const remainingElements = inputArray.slice(numSubarrays * elementsPerSubarray);
        subarrays[numSubarrays - 1] = subarrays[numSubarrays - 1].concat(remainingElements);
    }

    return subarrays;
}

export default {
    fetchDataFromAPI,
    getCachedData,
    cacheData,
    searchByName,
    searchByFilter,
    copyArray,
    searchByRegion,
    searchByLanguage,
    divideArray
}