const getButton   = document.getElementById("getButton");
const getResponse = document.getElementById("getResponse");

const postButton   = document.getElementById("postButton");
const postResponse = document.getElementById("postResponse");

const deleteButton   = document.getElementById("deleteButton");
const deleteResponse = document.getElementById("deleteResponse");

const countButton = document.getElementById("countButton");
const doneCounter = document.getElementById("doneCounter");
const undoneCounter = document.getElementById("undoneCounter");


getButton.addEventListener( 'click', () => {
    fetch('https://jsonplaceholder.typicode.com/todos')
        .then(response => {
            if(!response.ok) {
                throw new Error(`HTTP-Fehler: ${response.status}`)
            }
            return response.text()
        })
        .then(data => getResponse.textContent = data)
        .catch(error => console.error("fehler: ", error ))
});

postButton.addEventListener( 'click', () => {
    fetch('https://jsonplaceholder.typicode.com/todos/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify ({
            title: 'Neues To-Do',
            completed: false,
            userId: 1
        })
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP-Fehler: ${response.status}`);
            }
            return response.text();
        })       
        .then(data => postResponse.textContent = data)
        .catch(error => console.error("fehler: ", error ))
 });

deleteButton.addEventListener( 'click', () => {
    fetch('https://jsonplaceholder.typicode.com/todos/1', {
        method: 'DELETE'
      })
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP-Fehler: ${response.status}`);
          }
          return response.text()
        })
        .then( data => deleteResponse.textContent = data )
        .catch(error => console.error('Fehler beim Löschen:', error));
});

countButton.addEventListener( 'click', () => {
    fetch('https://jsonplaceholder.typicode.com/todos/')
        .then(response => response.json())        
        .then(data => {
        let done = 0;
        let undone = 0;
        data.forEach(element => {
            if(element.completed) {
                done++;
            } else {
                undone++;
            }
        });
        doneCounter.textContent = done;
        undoneCounter.textContent = undone;
        } )
        .catch(error => console.error('Fehler beim Abrufen:', error));  
});
