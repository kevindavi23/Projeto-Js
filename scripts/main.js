let lista = JSON.parse(localStorage.getItem("lista"))

let Usuario = JSON.parse(localStorage.getItem("usuario"))
let animesFav = []

let animes = [{nome: "Naruto", imagem: "https://imgsrv.crunchyroll.com/cdn-cgi/image/fit=contain,format=auto,quality=85,width=480,height=720/catalog/crunchyroll/8532171bec0d05bfe45769a330fbab82.jpg"},
    {nome: "Dragon Ball", imagem: "https://br.web.img2.acsta.net/pictures/22/11/22/14/02/3642167.jpg"},
    {nome: "One Piece", imagem: "https://www.suika.com.br/13583/manga-one-piece-volume-106.jpg"},
    {nome: "Jujstu Kaisen", imagem: "https://br.web.img3.acsta.net/pictures/20/09/14/10/31/4875617.jpg"}
]

let nomeIn = document.querySelector("#nome")
let emailIn = document.querySelector("#email")
let senhaIn = document.querySelector("#senha")
let botao = document.querySelector("#Cadastrar")
let select = document.querySelector("select")

/*for (const option of select.options){
    console.log(option,"ue");
    option.addEventListener("click",function(){
        console.log("entrou aqui")
        console.log(option.selected)
        if(option.selected){
            option.select = false;
        }
        else{
            option.selected = true; 
            console.log("selecionou")
        }   
     })
}*/


if(botao != null){
    
    botao.addEventListener("click",function(){
        if (lista == null){
            lista = []
        }
        if (emailIn.value != "" && senhaIn.value != ""){   
            for (const option of select.options){
                if(option.selected){
                    animesFav.push(option.textContent)
                }
            } 
            let myObj = { nome: nomeIn.value, email : emailIn.value,senha: senhaIn.value, animes: animesFav };
            lista.push(myObj)
            localStorage.setItem("lista",JSON.stringify(lista));

            // Ler item:
            let myItem = JSON.parse(localStorage.getItem("lista"));
            console.log(lista[0])
            window.location.href = "./login.html";
    }
})}



// Codigo pra pagina de login
botaoLogin = document.querySelector("#login");

if(botaoLogin != null){
    botaoLogin.addEventListener("click",function(){
        if (emailIn.value != "" && senhaIn.value != ""){
            for (elemento of lista){
                if (elemento.email == emailIn.value && elemento.senha == senhaIn.value){
                    console.log("login com sucesso")
                    localStorage.setItem("usuario",JSON.stringify(elemento));
                    window.location.href = "./home.html";
                    
                }
            }
            console.log("terminou o for") 
        }
    })
}

//Codigo para pagina Home
let conteudo = document.querySelector("#conteudo");
if(conteudo != null){
    let titulo = document.createElement("h1");
    titulo.textContent = `Seja bem vindo,${Usuario.nome}!`
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
    for(elementos of Usuario.animes){
        let anime;
        for(i of animes){
            console.log(i)
            if (i.nome == elementos){
                
                anime = i;
            }
        }
        let divDetalhes = document.createElement("div");
        divDetalhes.id = "detalhes"
        let img = document.createElement("img")
        img.src = anime.imagem
        let nomeAnime = document.createElement("p");
        nomeAnime.textContent = anime.nome;
        
        divDetalhes.appendChild(img)
        divDetalhes.appendChild(nomeAnime)
        divAnimes.appendChild(divDetalhes)




    }
    let voltar = document.createElement("button");
    voltar.textContent = "voltar"
    conteudo.appendChild(voltar);
    
    voltar.addEventListener("click",function(){
        window.location.href = "./login.html"
    })



    



}