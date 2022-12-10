
// Your Code Here

const main = async() =>  {
    // Pulling JSON File
    let response = await fetch('http://localhost:3004/listBooks')
    // Assigning books variable to json file
    let books = await response.json()
    // Creating for loop for each object
    books.forEach(renderBook) 
}

const renderBook = (book) => {
    //selecting the div root from index.html
    let root = document.querySelector('#root')
    //creating a bullet item 
    let li = document.createElement('li')
    //assigning bullet item for title
    li.textContent = book.title + " "
    // creating a new variable and creating a new element for a input field
    let quantityInput = document.createElement('input')
    //the input field will take the value "number" 
    quantityInput.value = book.quantity

    //creating a new button
    let saveButton = document.createElement('button')
    //creating text for the button "Save"
    saveButton.textContent = 'Save'
    //Add style to button
    saveButton.style.backgroundColor = 'skyblue'

    /*Adding a event listener to the DOM  the first argument is a click*/
    saveButton.addEventListener('click', () => {
        // Second argument
        fetch('http://localhost:3004/updateBook', {
            //PATCH updates json file
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            //convert json file to string
            body: JSON.stringify({
                id: book.id,
                quantity: quantityInput.value
            })
        })
    })
    //changes the quantity of the value
    li.append(quantityInput, saveButton)

    root.append(li)
}

main();