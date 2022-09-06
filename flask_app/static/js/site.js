console.log('starting....')
function getUsers(){
    fetch('http://localhost:5000/users')
        .then(res =>  res.json())
        .then(data => {
            var users = document.getElementById('users');

            // take a second to clear the table so we don't have duplicates.
            while (users.firstChild) {
                users.removeChild(users.firstChild)
            }

            // then, create new table rows.
            for( let i = 0; i < data.length; i++){
                let row = document.createElement('tr')

                let name = document.createElement('td')
                name.innerHTML = data[i].user_name;
                row.appendChild(name)

                let email = document.createElement('td')
                email.innerHTML = data[i].email
                row.appendChild(email)
                users.appendChild(row)
            }
        })

}
getUsers();

const myForm = document.getElementById('myForm')
myForm.onsubmit = function(e) {
    // 'e' refers to the captured event.
    // We are stopping its default behaviour here.
    e.preventDefault();

    // now we need to create a FormData object to send it through to flask.
    let form = new FormData(myForm)
    // this is how you create a 'fetch post request' and send the data.
    fetch("http://localhost:5000/create/user", {method : 'POST', body : form})
    .then( response => response.json() )
    .then ( submit_data => console.log( submit_data ))
    .then ( getUsers())
}
