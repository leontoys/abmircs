let myLeads = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const leadsFromLocalStorage = JSON.parse( localStorage.getItem("myLeads") )
const tabBtn = document.getElementById("tab-btn")

//check if local storage of the browser is aleady filled
if (leadsFromLocalStorage) {
    //if it is filled, this variable contains the parsed value ie, the array 
    //that we have filled with the key "myLeads"
    //this array will contain urls 
    myLeads = leadsFromLocalStorage
    //then call render function
    render(myLeads)
}

//this function will be called at the save tab button click 
tabBtn.addEventListener("click", function(){    
    //this is chrome tab api
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        //the url is pushed to the myleads array
        myLeads.push(tabs[0].url)
        //the stringified array is added to the local storage
        localStorage.setItem("myLeads", JSON.stringify(myLeads) )
        //show this in the list item
        render(myLeads)
    })
})

//this function takes array and adds it to the list item HTML element
function render(leads) {
    //empty string
    let listItems = ""
    //loop through the array and fill the string with HTML list item
    //and the urls or each item of the array
    for (let i = 0; i < leads.length; i++) {
        listItems += `
            <li>
                <a target='_blank' href='${leads[i]}'>
                    ${leads[i]}
                </a>
            </li>
        `
    }
    //once that is done, push it to the unordered list item HTML element
    //when we pass empty array, it will clear everything 
    ulEl.innerHTML = listItems
}

//this function will be called at the double clicking of delete button
deleteBtn.addEventListener("dblclick", function() {
    //it clears the local storage of the browser
    localStorage.clear()
    //it clear the array 
    myLeads = []
    //then calls render function with empty array
    render(myLeads)
})

//this function will be called when we click on the save input button
inputBtn.addEventListener("click", function() {
    //whatever we enter in the input value fill it in the array
    myLeads.push(inputEl.value)
    //clear the input
    inputEl.value = ""
    //fill local storage with the array as string - stringified array
    //so that we can read it later we use the key as "myLeads"
    localStorage.setItem("myLeads", JSON.stringify(myLeads) )
    //call render function that adds the input to the list item
    render(myLeads)
})