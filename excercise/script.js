
document.addEventListener("DOMContentLoaded", () => {
    loadTodos();
});

const todoForm = document.getElementById("todoForm");
const todoInput = document.getElementById("todoInput");
const todoList = document.getElementById("todoList");



// todo: implement a function that loads all items using the fetch function 
// from https://jsonplaceholder.typicode.com/todos
//
// hint: use the addTodoList() function to add the results to the DOM
// hint: don't forget to catch possible errors
function loadTodos() {
    fetch('https://jsonplaceholder.typicode.com/todos')
    .then(response => {
        if(!response.ok) {
            throw new Error(`HTTP-Fehler: ${response.status}`)
        }
        return response.json()
    })
    .then(data => {
        data.forEach(todo => {
            addTodoToList(todo);
        });
    })
    .catch(error => console.error("Error: ", error))
}

// todo: use the fetch function to post an item to https://jsonplaceholder.typicode.com/todos
//
// hint: use the addTodoList() function to add the result to the DOM
// hint: don't forget to catch possible errors
// notice: leave event.preventDefault() in place to avoid nasty form submission
todoForm.addEventListener("submit", event => {
    event.preventDefault(); // Verhindert das Standardverhalten des Formulars

    // Neues Todo-Objekt mit den Daten aus dem Eingabefeld
    const newTodo = {
        userId: 1, // Beispielhafte UserId (dies kann dynamisch gesetzt werden)
        title: todoInput.value, // Titel aus dem Eingabefeld
        completed: false // Das neue Todo ist standardmäßig nicht abgeschlossen
    };

    // Führe einen POST-Request aus, um das neue Todo zu erstellen
    fetch('https://jsonplaceholder.typicode.com/todos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newTodo) // Konvertiere das Todo-Objekt in JSON
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP-Fehler: ${response.status}`);
        }
        return response.json(); // JSON-Daten der Antwort erhalten
    })
    .then(data => {
        addTodoToList(data); // Das neue Todo wird der Liste hinzugefügt
        const confirmationMessage = document.createElement("p");
        confirmationMessage.textContent = "Das Todo wurde erfolgreich hinzugefügt!";
        document.body.appendChild(confirmationMessage); // Fügt die Nachricht zum Dokument hinzu
        todoInput.value = ""; // Eingabefeld nach dem Absenden leeren
        
        // Bestätigung in der Konsole ausgeben
        console.log('Post-Request erfolgreich ausgeführt!');
        console.log('Antwort der API:', data);
    })
    .catch(error => {
        console.error("Fehler beim Hinzufügen des Todos:", error);
    });
});




// todo: implement a function that add a todo item fetched from 
// the API to the DOM list
//
// hint: you will need a li element with proper textContent
// hint: don't forget to add a delete button
function addTodoToList(todo) {
    //leere liste erstellen
    const listItem = document.createElement("li");
    
    //Erstelle den to do eintrag mit allen wichtigen infos
    listItem.textContent = `Title: ${todo.title} (ID: ${todo.id}, User ID: ${todo.userId}, Completed: ${todo.completed ? "Yes" : "No"})`;
    
    // Löschen-Button hinzufügen
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete"; // Löschen-Button hinzufügen
    deleteButton.addEventListener("click", () => {
        deleteTodo(todo.id, listItem); // Entfernt das Listenelement, wenn der Button geklickt wird
    });
    //Delete Button zum Listenelement hinzufügen
    listItem.appendChild(deleteButton);

    //anhängen von toDo an todoList
    todoList.appendChild(listItem);
}

// todo: implement a function that can be attached to the delete buttons
// the function should perform a DELETE request using fetch
//
// hint: don't forget to remove the listItem from DOM
// hint: don't forget to catch possible errors
// notice: you cannot delete items that you submitted previously because it's just a mock api
function deleteTodo(id, listItem) {
    // Führe den DELETE-Request aus, um das Todo zu löschen
    fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP-Fehler: ${response.status}`);
        }
        // Wenn die API-Antwort erfolgreich ist, entfernen wir das Listenelement aus der DOM
        listItem.remove();
        const confirmationMessage = document.createElement("p");
        confirmationMessage.textContent = `Todo mit der ID ${id} wurde gelöscht.`;
        document.body.appendChild(confirmationMessage); // Fügt die Nachricht zum Dokument hinzu
        console.log(`Todo mit der ID ${id} wurde gelöscht.`);
    })
    .catch(error => {
        console.error("Fehler beim Löschen des Todos:", error);
    });
}