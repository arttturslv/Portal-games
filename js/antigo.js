fetch ('LINK DO RAWG + KEY')
.then(res => res.json())
.then(data => {
    let str = '';
    for (let i=0; i<6;i++)  {
        let jg = data.results[i];
        str += `AQUI VAI FICAR O CONTEUDO DA DIV`
    }
    document.getElementById('AQUI É O ID DO DIV PAI, ONDE OS CARDS VAO SER EXIBIDOS').innerHTML = str;
})









const location = window.location.search;
const urlParams = new URLSearchParams(location);

const id = urlParams.get('id');
JogoDetalhes(id);























/*
    function bttAtualizaJogos (qntCardJogos) {
        if (qntCardJogos<19)    {
            qntCardJogos +=4;
            jogosApi (qntCardJogos);
        } else {
            console.log("Btn parou de funcionar, lançamento chegou ao limite")
            document.getElementById('btnLancamentosWide').style.display="none";
            document.getElementById('btnLancamentosSmall').style.display="none";
        }
    }

*/















/*
            function jogosApi (games, qntCardJogos) {
                let str = '';
                for (let i=0; i<qntCardJogos;i++)  {
                    let jg = games.results[i];
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
        
            function bttAtualizaJogos (qntCardJogos) {
                if (qntCardJogos<19)    {
                    qntCardJogos +=4;
                    jogosApi(games, qntCardJogos);
                } else {
                    console.log("Btn parou de funcionar, lançamento chegou ao limite")
                    document.getElementById('btnLancamentosWide').style.display="none";
                    document.getElementById('btnLancamentosSmall').style.display="none";
                }
            }*/



































/* ***************************************************************
        INVOCANDO FUNÇÕES:
            - Carregar lançamentos
            - Carregar publishers
        
   *************************************************************** */
            let qntCardJogos = 8;                 // define a quantidade de jogos a serem mostrados por vez.
            atualizaJogos(qntCardJogos);            // chama a função que mostra o card dos jogos no lançamento.
             
            //let qntCardPublishers = 3;              // define a quantidade de publishers a serem mostrados por vez.
            //atualizaPublishers (qntCardPublishers)  // chama a função que mostra o card dos publishers
            
                // Recebe o valor do input e armaneza em valorInput
            const btn = document.querySelector("#txt-button");
                btn.addEventListener("click", function(e) {
                    e.preventDefault();//para o evento default formulario
                
                    const busca = document.querySelector("#txt");
                    const valorInput = busca.value;
                    console.log(valorInput);
                    recebeInput(valorInput);
            
                })
            
            /* ***************************************************************
                    CRIANDO FUNÇÕES:
                        - Pesquisa (API)            pesquisa (valorInput)
                        - Classificação etária      traduzClassificação (perm)
                        - Lançamentos (API)         atualizaJogos (qntCardJogos)
                        - Data de lançamento        dataLancamento(dataEN)
                        - Rating em icones          reviewEstrelas (rating)
                        - Button + jogos            bttAtualizaJogos ()
                        - Lançamentos (API)         atualizaPublishers (qntCardPublishers)
                        - Button + publishers       bttAtualizaPublishers ()
                    
               *************************************************************** */
            
                // função que faz fetch com a api dependendo do input e mostra na tela.
            function recebeInput (valorInput) {
                    fetch (`https://api.rawg.io/api/games?key=4167d5a86b9b47439d0b46aa63a7d97c&search=${valorInput}`)
                    .then(res => res.json())
                    .then(data => {
                        if (data===undefined)   {
                            console.log('nao existe')
                            alert('O jogo não foi encontrado!');
                        } else {
                            var resultadoPesquisa = data;
                            window.location.href = "/pesquisa.html";
                            return resultadoPesquisa;
                        }})
            
            }
                
            function pesquisa (resultadoPesquisa) {
                fetch (`https://api.rawg.io/api/games?key=4167d5a86b9b47439d0b46aa63a7d97c&search=${resultadoPesquisa}`)
                    .then(res => res.json())
                    .then(data => {
                        if (data===undefined)   {
                            console.log('nao existe')
                            alert('O jogo não foi encontrado!');
                        } else {
                            let str = '';
                            for (let i=0; i<6;i++)  {
                                let search = data.results[i];
                                var review = jsg.esrb_rating.name;
                                str += `  <div class="jogosPesquisados" id="ds">
                                <div class="row">
                                    <div class="col-md-2 col-sm-4 imgdiv">
                                        <img class="img" src="${search.background_image}">
                                    </div>
                                    <div class="col-md-10 col-sm-8 ">
                                        <h5> ${search.name}</h5>
                                        <ul>
                                            <li><p>Review: ${search.rating}</p></li>
                                            <li><p>Data de lançamento: ${dataLancamento(search.released)}</p></li>
                                            <li><p>Classificação indicativa: ${traduzClassificação (review)} </p></li>
                                        </ul>
                                    </div>
                                </div>
                              </div>`
                            }
                            console.log(str);
                            document.getElementById('resultados').innerHTML = str;
                        }
                    })
            }
            
                // função para receber a classificação etaria e traduzir
            function traduzClassificação (review) {
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
            
                // função que faz fetch com a api e mostra apenas a qnt necessaria de jogos.
            function atualizaJogos (qntCardJogos) {
                fetch ('https://api.rawg.io/api/games?key=4167d5a86b9b47439d0b46aa63a7d97c')
                .then(res => res.json())
                .then(data => {
                    let str = '';
                    for (let i=0; i<qntCardJogos;i++)  {
                        let jg = data.results[i];
                        str += `<div class="col-md-6 col-lg-4 col-xxl-3">
                        <div class="card_jogo">
                        <h4 id="nomeJogo">${jg.name}</h4>
                        <div id="cf">
                            <img class="bottom" src="${jg.short_screenshots[1].image}" alt="Bootstrap" width="160"
                            height="90">
                            <img class="top" src="${jg.background_image}" alt="Bootstrap" width="160" height="90">
                        </div>
                        <p> <a class="moreInfo" id="strela" href="#">Notas: ${reviewEstrelas(jg.rating)}</a></p>
                        <p> <a class="moreInfo" id="dta" href="#">Data de lançamento: ${dataLancamento(data.results[i].released)}</a></p>
                        <p> <a class="moreInfo" href="https://www.youtube.com/watch?v=K-jQz0qA1xA">Mais detalhes</a></p>
                        </div>
                    </div>`
                    }
                    document.getElementById('rwJogos').innerHTML = str;
                })
            }
                // função que pega o released e transforma em data brasileira
            function dataLancamento(dataEN) {
                let ano = dataEN.substring(4,0);
                let mes = dataEN.substring(7,5);
                let dia = dataEN.substring(10,8);
            
                let dataPT = dia + '/'+ mes + '/'+ano;
                    return dataPT;
            }
            
                // função pega o rating e transforma em icones de estrela
            function reviewEstrelas (rating) { 
                let qtnEstrelas = 0;
                let pontas='<i class="fa-solid fa-star"></i>';
                
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
                            pontas+='<i class="fa-solid fa-star"></i>';
                        }
                        } else {
                            pontas = '<i class="fa-regular fa-trash-can"></i>';
                    }
                return pontas;    
            }
            
                // função que deixa o botão de "carregar" funcional
            function bttAtualizaJogos () {
                if (qntCardJogos<19)    {
                    qntCardJogos +=4;
                    atualizaJogos(qntCardJogos, firstTime)
                } else {
                    console.log("Btn parou de funcionar, lançamento chegou ao limite")
                    document.getElementById('btnLancamentosWide').style.display="none";
                    document.getElementById('btnLancamentosSmall').style.display="none";
                }
            }
            
                // função que faz fetch com a api e mostra apenas a qnt necessaria de publishers.
            function atualizaPublishers (qntCardPublishers) {
                fetch ('https://api.rawg.io/api/publishers?key=4167d5a86b9b47439d0b46aa63a7d97c')
                    .then(res => res.json())
                    .then(data => {
                        let str1 = '';
                        for (let i=0; i<qntCardPublishers;i++)  {
                            let pb = data.results[i];
                            str1 += `<div class="col">
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
                        document.getElementById('rwPublishers').innerHTML = str1;
                        //console.log(str1)
                    })
            }
            
                // função que deixa o botão de "carregar" funcional
            function bttAtualizaPublishers () {
            
                if(typeof window !== 'undefined')   {
            
                    if (qntCardPublishers<9)    {
                        qntCardPublishers +=3;
                        atualizaPublishers (qntCardPublishers)
                        } else {
                        console.log("Btn parou de funcionar, publishers chegou ao limite")
                        document.getElementById('btnPublishersWide').style.display="none";
                        document.getElementById('btnPublishersSmall').style.display="none";
                    }
                }
                else {
                    console.log("nao da pra acessar o document")
                }
            }
            