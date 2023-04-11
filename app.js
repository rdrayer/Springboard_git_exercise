// select form, ul for delegate, input field
const form = document.querySelector('#todoForm');
const ul = document.querySelector('#todos');
const textInput = document.querySelector('[name="textInput"]');

// get todosArray from localStorage
let todosArray = JSON.parse(localStorage.getItem('array'));

// if the array isn't empty, display the contents
if (todosArray != null) {
    // display stored array items
    for(todoItem of todosArray) {
        // create li
        const newItem = document.createElement('li');
        // create button attached to li, set type and value
        const inputButton = document.createElement('input');
        inputButton.setAttribute('type', 'button');
        inputButton.setAttribute('value', 'Remove');

        // set li's innerText and completed attribute based on values in todosArray
        newItem.innerText = todoItem.todo + ' ';
        newItem.completed = todoItem.completed;

        // append button to li
        newItem.appendChild(inputButton);
        // append li to ul
        ul.appendChild(newItem);
        }
    } else {
        todosArray = [];
    }


// 1. build out submit event listener on the form
// to take in info and create lis and buttons
// 2. append them to the ul for display
// 3. store in local storage
form.addEventListener('submit', function(e) {
    // prevent default
    e.preventDefault();
    // create li
    const newItem = document.createElement('li');
    // create button attached to li, set type and value
    const inputButton = document.createElement('input');
    inputButton.setAttribute('type', 'button');
    inputButton.setAttribute('value', 'Remove');

    // set innerText of li
    newItem.innerText = textInput.value + ' ';
    // set completed to false
    newItem.completed = false;

    // append button to li
    newItem.appendChild(inputButton);
    // append li to ul
    ul.appendChild(newItem);

    // add new item to todosArray
    todosArray.push({ todo: textInput.value, completed: false });
    console.log(todosArray);
    // set to localStorage using stringify
    localStorage.setItem('array', JSON.stringify(todosArray));
    //console.log('stringified:');
    console.log(localStorage);

    // test parse
    //console.log('parsed')
    //console.log(JSON.parse(localStorage.getItem('array')));

    // reset input field
    textInput.value = '';
});

// click event listener to mark todo completed or remove
// ul is delegate parent element
ul.addEventListener('click', function(e) {
    if(e.target.tagName === 'INPUT') {
        // get parent li
        const liText = e.target.parentElement.innerText;
        // get position in todosArray
        const position = todosArray.map(e => e.todo).indexOf(liText);

        // remove parent li from DOM
        e.target.parentElement.remove();

        // remove todo from todosArray
        todosArray.splice(position, 1);
        console.log(todosArray);

        // update local storage
        localStorage.setItem('array', JSON.stringify(todosArray));
        console.log(localStorage);
    }
    if(e.target.tagName === 'LI') {
        e.target.classList.toggle('done');
    }
});