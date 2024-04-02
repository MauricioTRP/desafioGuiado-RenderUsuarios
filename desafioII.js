console.log("Desafio II")


// nombreModulo.getDatos()

let nombreModulo = (() => {
  const getDatos = async () => {
    let url = "https://randomuser.me/api/?results=10"
  
    try {
      const response = await fetch(url);
    
      const data = await response.json();
      const users = data.results
    
      let condicionDatosUsuarios = users.every(user => {
        return user.name && user.email && user.cell && user.picture
      })
      
      if (condicionDatosUsuarios) {
        console.log(users)
        return users
      } else {
        throw new Error("La data no cumple con las condiciones mínimas 🥹")
      }
  
    } catch (error) {
      console.log(error.stack)
    }
  }

  /**
   * Renderiza datos de usuarios en HTML
   *
   * @param { Array } data
   * @returns { null }
   */
  function renderUsers(data) {
    // Lógica para mostrar usuarios en HTML
    let usersList = '';

    data.forEach(user => {
      let li = `<li>
        <img src="${user.picture.thumbnail}">
        <p>${user.name.title} ${user.name.first} ${user.name.last}</p>
        <p>${user.email}</p>
        <p>${user.cell}</p>
      </li>`

      usersList += li;

      document.getElementById("user-data").innerHTML = `<ul>${usersList}</ul>`;
    })
  }

  function renderError() {
    document.getElementById("user-data").innerHTML = `<h2>No pudimos traer la información</h2>`;
  }

  return {
    getDatos: getDatos,
    renderUsers: renderUsers,
    renderError: renderError,
  }
})();


nombreModulo.getDatos()
  .then(data => nombreModulo.renderUsers(data))
  .catch(() => renderError())
