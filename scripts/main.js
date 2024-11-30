let lista = JSON.parse(localStorage.getItem("lista"))

let Usuario = JSON.parse(localStorage.getItem("usuario"))
let animesFav = []

let listaAnimes = []

// função para adicionar os animes da api no select da pagina de cadastrar
async function retornarAnimes() {
    let animesApi = await fetch("https://projetoweb-api.vercel.app/anime");
    let json = await animesApi.json();
    listaAnimes = json.animes
    let select = document.querySelector("select");
    for(let elemento of listaAnimes ){
        let option = document.createElement("option");
        option.value = elemento.id;
        option.textContent = elemento.title;
        select.appendChild(option)
    }
    
}



const nomeIn = document.getElementById("nome");
const emailIn = document.getElementById("email");
const senhaIn = document.getElementById("password");

let botao = document.querySelector("#Cadastrar")
let select = document.querySelector("select")
const emailError = document.getElementById("error");
const passwordError = document.getElementById("error");

if(botao != null){
    retornarAnimes();
    botao.addEventListener("click",function(){
        if (lista == null){
            lista = []
        }
            // Validação de e-mail (RegEx para verificar formato de e-mail)
        const emailRegEx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegEx.test(emailIn.value)) {
        emailError.textContent = 'Formato de e-mail inválido';
        return;
        }

        // Validação de senha (mínimo de 8 caracteres, com pelo menos 1 letra e 1 número)
        const passwordRegEx = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        if (!passwordRegEx.test(senhaIn.value)) {
        passwordError.textContent = 'A senha deve ter no mínimo 8 caracteres, incluindo letras e números.';
        return;
        }
        if (emailIn.value != "" && senhaIn.value != ""){   
            for (const option of select.options){
                if(option.selected){
                    animesFav.push(option.value)
                }
            } 
            let myObj = { nome: nomeIn.value, email : emailIn.value,senha: senhaIn.value, animes: animesFav };
            lista.push(myObj)
            localStorage.setItem("lista",JSON.stringify(lista));
            let myItem = JSON.parse(localStorage.getItem("lista"));
            console.log(lista[0])
            registerUser();
        }
})}



// Codigo pra pagina de login
botaoLogin = document.querySelector("#login");

if(botaoLogin != null){
    botaoLogin.addEventListener("click",function(){
        // Validação de e-mail (RegEx para verificar formato de e-mail)
        
    login();
        
    })
}


async function registerUser() {
    try {
        console.log( nomeIn.value,senhaIn.value,animesFav  )
        
        const response = await fetch('https://projetoweb-api.vercel.app/auth/register', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json', // Envia dados em formato JSON
            },
            body: JSON.stringify({
                name: nomeIn.value,  
                email: emailIn.value, 
                password: senhaIn.value,
                anime_preference: animesFav  
            })
        });

        if (response.ok) {
            const data = await response.json();
            console.log('Cadastro bem-sucedido!', data);
            window.location.href = './login.html'; 
        } else {
            const errorData = await response.json();
            console.error('Erro ao cadastrar usuário:', errorData);
            alert('Erro ao cadastrar, tente novamente!');
        }
    } catch (error) {
        console.error('Erro de rede:', error.message);
        alert('Ocorreu um erro. Tente novamente mais tarde.');
    }
}


async function login(){
    try{
        console.log(emailIn.value,senhaIn.value)
        const response = await fetch('https://projetoweb-api.vercel.app/auth/login', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json', // Envia dados em formato JSON
            },
            body: JSON.stringify({
                email: emailIn.value,
                password: senhaIn.value
            })
        })
        console.log(response.message);
        if (response.ok) {
            const data = await response.json();
            console.log("login com sucesso")
            localStorage.setItem("usuario", JSON.stringify(data.user));
            window.location.href = "./home.html";
        };
    }catch(error){
        console.log(error);
    }
}


  
//Codigo para pagina Home
let conteudo = document.querySelector("#conteudo");
if(conteudo != null){
    console.log(Usuario.animes)
    let titulo = document.createElement("h1");
    titulo.textContent = `Seja bem vindo,${Usuario.name}!`
    conteudo.appendChild(titulo)
    
    let p = document.createElement("p");
    p.textContent = `Seu Email é: ${Usuario.email}`
    conteudo.appendChild(p)

    let h2 = document.createElement("h2");
    h2.textContent = "Animes Favoritos";
    conteudo.appendChild(h2)
    
    let divAnimes = document.createElement("div");
    divAnimes.id = "animesFavoritos"
    conteudo.appendChild(divAnimes)
    
    async function mostrarAnimes(){
        let animesApi = await fetch('https://projetoweb-api.vercel.app/anime');
        let json = await animesApi.json();
        listaAnimes = json.animes;
        for(elementos of Usuario.animes){
            let anime;
            for(i of listaAnimes){
                console.log(i)
                if (i.title == elementos.title){
                    
                    anime = i;
                }
            }
            let divDetalhes = document.createElement("div");
            divDetalhes.id = "detalhes"
            let img = document.createElement("img")
            img.src = anime.cover
            let nomeAnime = document.createElement("p");
            nomeAnime.textContent = anime.title;
            
            divDetalhes.appendChild(img)
            divDetalhes.appendChild(nomeAnime)
            divAnimes.appendChild(divDetalhes)
        }
    
    }

    mostrarAnimes();
    
    }
    let voltar = document.createElement("button");
    voltar.textContent = "voltar"
    conteudo.appendChild(voltar);
    
    voltar.addEventListener("click",function(){
        window.location.href = "./login.html"
    })


