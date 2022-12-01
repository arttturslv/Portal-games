//funcao para verificar se a descrição esta 
  /* depois de passar o id pra pagina detalhes via url*/
  const myKeyValue = window.location.search;
  const urlParams = new URLSearchParams(myKeyValue);
  
  const id = urlParams.get('id');
  JogoDetalhes(id);


function verificaDescription (description) {
    if (description == "") {
        console.log("O jogo não possui descrição");
        let text = "O jogo ainda não possui uma descrição documentada na API Rawg.<br>Verifique o reddit ou uma loja de games para poder ler a descrição completa."
        return text;
    } else {
        return description;
    }
}
function verificaGenres (genres) {
    console.log(genres);
    let fraseGeneros = '';
    for(let i=0; i<genres.length; i++) {
        if (i!=0)   {
           fraseGeneros += ", "     
        }
        fraseGeneros += genres[i].name;
    }
    return fraseGeneros;
}



// funcao para mostrar os detalhes dos jogos
function JogoDetalhes ()  {
    fetch (`https://api.rawg.io/api/games/${id}?key=4167d5a86b9b47439d0b46aa63a7d97c`)
        .then(res => res.json())
        .then(data => {
            if (data===undefined)   {
                console.log('nao existe')
                alert('O jogo não foi encontrado!');
            } else {
                let str = '';
                    let dt = data;
                    let description = dt.description;
                    //let genres = dt.genres
                    var review = dt.esrb_rating.name;

                    str += `<div class="jogoDetalhado">
                    <div class="row jgdt">
                        <div class="col-xl-6 col-lg-12">
                            <div class="midia">
                                <img src="assets/mojang-logo.webp" alt="Bootstrap" width="100%">
                            </div>
                        </div>
                        <div class="col tx">
                            <div class="textos">
                                <h4>${dt.name}</h4>
                                <p>
                                ${verificaDescription(description)}
                                </p>
                                
                                    <ul class="addInfoDetalhes">
                                        <li><strong>Classificação</strong>: ${classficacaoTransform(review)}</li>
                                        <li><strong>Tempo de jogo</strong>: ${dt.playtime}h</li>
                                        <li><strong>Lançamento</strong>: ${dataTransform(dt.released)}</li>
                                        <li><strong>Generos</strong>: ${verificaGenres (dt.genres)}</li>
                                        <li><strong>Review</strong>: ${reviewTransform(dt.rating)}</li>
                                    </ul>
                                    
                            </div>
                        </div>
            
                    </div>
                    <div class="row jhs">
            
                                    <div class="col">
                                        <ul class="icones">
                                            <li><i href="https://www.youtube.com/results?search_query=${dt.slug}" class="fa-brands fa-youtube icon"></i></li>
                                            <li><i href="${dt.reddit_url}" class="fa-brands fa-reddit icon"></i></li>
                                            <li><i href="https://store.steampowered.com/search/?term=${dt.slug}" class="fa-brands fa-steam icon"></i></li>
                                            <li><i href="https://store.playstation.com/pt-br/search/${dt.slug}" class="fa-brands fa-playstation icon"></i></li>
                                            <li><iconify-icon href="https://store.epicgames.com/pt-BR/browse?q=${dt.slug}&sortBy=relevancy&sortDir=DESC&count=40" icon="cib:epic-games" class="icon"></iconify-icon></li>
                                            <li><i href="https://www.microsoft.com/pt-br/search/explore?q=${dt.slug}" class="fa-brands fa-microsoft icon"></i></li>
                                        </ul>
                                    </div>
                                </div>
            
                </div>`
                console.log(str);
                document.getElementById('mainDetalhes').innerHTML = str;
            }
        })
}









// Recebe o valor do input e armaneza em valorInput
        const btn = document.querySelector("#txt-button");
        btn.addEventListener("click", function(e) {
            e.preventDefault();//para o evento default formulario
        
            const busca = document.querySelector("#txt");
            const valorInput = busca.value;
            console.log(valorInput);
            pesquisa(valorInput);
    
        })

function pesquisa (valorInput) {
    fetch (`https://api.rawg.io/api/games?key=4167d5a86b9b47439d0b46aa63a7d97c&search=${valorInput}`)
        .then(res => res.json())
        .then(data => {
            if (data===undefined)   {
                console.log('nao existe')
                alert('O jogo não foi encontrado!');
            } else {
                let str = '';
                for (let i=0; i<6;i++)  {
                    let search = data.results[i];
                    var review = search.esrb_rating.name;
                    str += `  <div class="jogosPesquisados" id="ds">
                    <div class="row">
                        <div class="col-md-2 col-sm-4 imgdiv">
                            <img class="img" src="${search.background_image}">
                        </div>
                        <div class="col-md-10 col-sm-8 ">
                            <h5> ${search.name}</h5>
                            <ul>
                                <li><p>Review: ${search.rating}</p></li>
                                <li><p>Data de lançamento: ${dataTransform(search.released)}</p></li>
                                <li><p>Classificação indicativa: ${classficacaoTransform (review)} </p></li>
                            </ul>
                        </div>
                    </div>
                    </div>`
                }
                console.log(str);
                document.getElementById('resultado').innerHTML = str;
            }
        })
}











/* ***************************************************************
        INVOCANDO FUNÇÕES:
            - Fetch (games) => lançamentos & destaques.
            - Fetch (publishers) => publishers
                - Carregamento dos destaques, lançamentos e publishers.
        
   *************************************************************** */
    let qntCardJogos = 8;   //tam padrão para a quant de jogos exibidos    
    let qntCardPublishers = 3; //tam padrão para a quant de pb exibidos 
    let qntCardPlataforma = 3; //tam padrão para a quant de pb exibidos 

    jogosApi (qntCardJogos);
    //publishersApi (qntCardPublishers)
    //plataformasApi (qntCardPlataforma)
    
    function jogosApi (qntCardJogos) {
        fetch ('https://api.rawg.io/api/games?key=4167d5a86b9b47439d0b46aa63a7d97c')
        .then(res => res.json())
        .then(data => {
            let str = '';
            for (let i=0; i<qntCardJogos;i++)  {
                let jg = data.results[i];
                str += `<div class="col-md-6 col-lg-4 col-xxl-3" onclick="alert( this.nomeJogo.value )">
                <div class="card_jogo">
                    <h4 id="nomeJogo">${jg.name}</h4>
                    <div id="cf">
                    <img class="bottom" src="${jg.short_screenshots[1].image}" alt="Bootstrap" width="160"
                        height="90">
                    <img class="top" src="${jg.background_image}" alt="Bootstrap" width="160" height="90">
                    </div>
                    <ul>
                    <div class="informações">
                    <span class="info"><strong>Notas:</strong> ${reviewTransform(jg.rating)}</span>
                    <span class="info"><strong>Data de lançamento:</strong> ${dataTransform(jg.released)}</span>
                    <span class="info"><strong>Tempo de jogo:</strong> ${jg.playtime}h</span>
                    <p> <a class="moreInfo" href="detalhes.html?id=${jg.id}">Mais detalhes</a></p>
                    </div>
                    </ul>
                </div>
                </div>`
            }
            document.getElementById('rwJogos').innerHTML = str;
        })
    }
    
    function publishersApi (qntCardPublishers) {
        fetch ('https://api.rawg.io/api/publishers?key=4167d5a86b9b47439d0b46aa63a7d97c')
            .then(res => res.json())
            .then(data => {
                let str = '';
                for (let i=0; i<qntCardPublishers;i++)  {
                    let pb = data.results[i];
                    str += `<div class="col">
                    <div class="conteudo_publ">
                        <h4>${pb.name}</h4>
                        <img src="${pb.image_background}" alt="Bootstrap" width="160" height="90">
                        <h5>Principais jogos</h5>
                        <li>${pb.games[0].name}</li>
                        <li>${pb.games[1].name}</li>
                        <li>${pb.games[2].name}</li>
                        <p> <a class="moreInfo" href="#">Mais detalhes</a></p>
                    </div>
                    </div>`
                    console.log(pb)
                }
                document.getElementById('rwPublishers').innerHTML = str;
                //console.log(str1)
            })
    }
    
    function plataformasApi (qntCardPlataforma) {
        fetch ('https://api.rawg.io/api/platforms?key=4167d5a86b9b47439d0b46aa63a7d97c')
            .then(res => res.json())
            .then(data => {
                let str = '';
                for (let i=0; i<qntCardPlataforma;i++)  {
                    let pf = data.results[i];
                    str += `        <div class="col">
                    <div class="conteudo_plat">
                      <h4>${pf.name}</h4>
                      <img src="${pf.image_background}" alt="Bootstrap" width="160" height="90">
                      <h5>Principais jogos</h5>
                      <li>${pf.games[0].name}</li>
                      <li>${pf.games[1].name}</li>
                      <li>${pf.games[2].name}</li>
                      <p> <a class="moreInfo" href="#">Mais detalhes</a></p>
                    </div>
                  </div>`
                    console.log(pb)
                }
                document.getElementById('rwPlataformas').innerHTML = str;
                //console.log(str1)
            })
    }

    function dataTransform (dataEN) {
        let ano = dataEN.substring(4,0);
        let mes = dataEN.substring(7,5);
        let dia = dataEN.substring(10,8);
    
        let dataPT = dia + '/'+ mes + '/'+ano;
            return dataPT;
    }

    function reviewTransform (rating) { 
        let qtnEstrelas = 0;
        let starIcones ='<i class="fa-solid fa-star"></i>';
        
            if (rating > 4.5) {
                qtnEstrelas = 5;
            } else if (rating > 3.5) {
                qtnEstrelas = 4;
            } else if (rating > 2.5) {
                qtnEstrelas = 3;
            } else if (rating > 1.5) {
                qtnEstrelas = 2;
            } else if (rating > 3) {
                qtnEstrelas = 1;
            } else {
                qtnEstrelas = 0;
            }
    
            if (qtnEstrelas!=0)    {
                for (let i=1; i<qtnEstrelas; i++)  {
                    starIcones +='<i class="fa-solid fa-star"></i>';
                }
                } else {
                    starIcones = '<i class="fa-regular fa-trash-can"></i>';
            }
        return starIcones;    
    }

    function bttAtualizaJogos () {
        console.log(qntCardJogos);
        if(typeof window !== 'undefined')   {
            if (qntCardJogos<19)    {
                qntCardJogos +=4;
                jogosApi(qntCardJogos);
                } else {
                console.log("Btn parou de funcionar, publishers chegou ao limite")
                document.getElementById('btnLancamentosWide').style.display="none";
                document.getElementById('btnLancamentosSmall').style.display="none";
            }
        }
        else {
            console.log("document not accessible - bttAtualizaJogos ()")
        }
    }

    function bttAtualizaPublishers () { 
        if(typeof window !== 'undefined')   {
            if (qntCardPublishers<9)    {
                qntCardPublishers +=3;
                publishersApi(qntCardPublishers);
                } else {
                console.log("Btn parou de funcionar, publishers chegou ao limite")
                document.getElementById('btnPublishersWide').style.display="none";
                document.getElementById('btnPublishersSmall').style.display="none";
            }
        }
        else {
            console.log("document not accessible - bttAtualizaPublishers()")
        }
    }
    
    function classficacaoTransform (review) {
        if (review == "Teen")   {
            return "Adolescentes"
        } else if (review == "Mature") {
            return "Jovem adulto"
        } else if (review == "Adults Only") {
            return "Apenas adultos"
        } else if (review == "Everyone") {
            return "Todos"
        } else {
            return "Sem classificação"
        }
    }
            
    /*  tecnicamente isso funciona pra imprimir os jogos toda vez com 1 fetch, mas o botao parou de funcionar
        let dataGames;
    
        const getData = async () => {
            const response = await fetch("https://api.rawg.io/api/games?key=4167d5a86b9b47439d0b46aa63a7d97c");
            const data = await response.json();
            dataGames = data;
            return data;
            };
    function printJogos (qntCardJogos) {
            (async () => {
            await getData();
            //console.log(dataGames);
            let str = '';
            for (let i=0; i<qntCardJogos;i++)  {
                let jg = dataGames.results[i];
                str += `<div class="col-md-6 col-lg-4 col-xxl-3" onclick="alert( this.nomeJogo.value )">
                <div class="card_jogo">
                    <h4 id="nomeJogo">${jg.name}</h4>
                    <div id="cf">
                    <img class="bottom" src="${jg.short_screenshots[1].image}" alt="Bootstrap" width="160"
                        height="90">
                    <img class="top" src="${jg.background_image}" alt="Bootstrap" width="160" height="90">
                    </div>
                    <ul>
                    <div class="informações">
                    <span class="info"><strong>Notas:</strong> ${reviewTransform(jg.rating)}</span>
                    <span class="info"><strong>Data de lançamento:</strong> ${dataTransform(jg.released)}</span>
                    <span class="info"><strong>Tempo de jogo:</strong> ${jg.playtime}h</span>
                    <p> <a class="moreInfo" href="#">Mais detalhes</a></p>
                    </div>
                    </ul>
                </div>
                </div>`
            }
            document.getElementById('rwJogos').innerHTML = str;
            })();
    }
    printJogos(qntCardJogos);
    */
