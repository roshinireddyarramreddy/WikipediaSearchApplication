let searchInputEl = document.getElementById("searchInput");

let searchResultsEl = document.getElementById("searchResults");

let spinner = document.getElementById("spinner");

function createAndAppendSearchResults(result) {

    let {
        title,
        link,
        description
    } = result;

    //1.DivContainer -- result-item
    let resultItemElement = document.createElement("div");
    resultItemElement.classList.add("result-item");
    searchResultsEl.appendChild(resultItemElement);

    //Anchor Title -- result-title
    let resultTitleElement = document.createElement("a");
    resultTitleElement.classList.add("result-title");
    resultTitleElement.textContent = title;
    resultTitleElement.href = link;
    resultTitleElement.target = "_blank";
    resultItemElement.appendChild(resultTitleElement);

    //3.Title break
    let titleBreakElement = document.createElement("br");
    resultItemElement.appendChild(titleBreakElement);

    //4.Anchor URL -- result-url
    let urlElement = document.createElement("a");
    urlElement.classList.add("result-url");
    urlElement.href = link;
    urlElement.target = "_blank";
    urlElement.textContent = link;
    resultItemElement.appendChild(urlElement);

    //5. Line break
    let lineBreakElement = document.createElement("br");
    resultItemElement.appendChild(lineBreakElement);

    //6.Paragraph description
    let descriptionElement = document.createElement("p");
    descriptionElement.classList.add("line-description");
    descriptionElement.textContent = description;
    resultItemElement.appendChild(descriptionElement);
}

function displayResults(searchResults) {
    spinner.classList.toggle("d-none");
    for (let result of searchResults) {
        createAndAppendSearchResults(result);
    }
}

function searchWikipedia(event) {
    if (event.key === "Enter") {
        searchResultsEl.textContent = "";
        spinner.classList.toggle("d-none");
        let searchInput = searchInputEl.value;
        let url = "https://apis.ccbp.in/wiki-search?search=" + searchInput;

        let options = {
            method: "GET",
        }
        fetch(url, options)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsonData) {
                let {
                    search_results
                } = jsonData;
                displayResults(search_results);
            })
        console.log(searchInput);
        console.log(url);
    }
}

searchInputEl.addEventListener("keydown", searchWikipedia);
