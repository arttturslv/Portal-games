
    //Passa id p/ detalhes.html -  obrigatorio ficar no topo*/
      const myKeyValue = window.location.search;
      const urlParams = new URLSearchParams(myKeyValue);
      const id = urlParams.get('id');
 
/* ***************************************************************
        FUNÇÕES:
            apenas na home-pag
                - Fetch (games) => lançamentos.
                - Fetch (publishers) => publishers
                - Fetch (plataformas) => publishers
                - Carrega mais lançamentos/publishers/plataformas
            apenas na detalhes-pag
                - Fetch (game${id}) => detalhes.html
            apenas na pesquisa-pag
                - Fetch (game${jogo.name}) => pesquisa.html
            em qualquer lugar 
                - Adiciona generos
                - Traduz classificação indicativa (teen -> adolescentes)
                - Transforma data (mm/dd/yyyy -> dd/mm/yyyy)
                - Transforma review (4.1 -> ⭐⭐⭐⭐)
                - Verifica se tem descrição no jogo e escreve.
        
   *************************************************************** */
    let qntCardJogos = 8;   //tam padrão para a quant de jogos exibidos    
    let qntCardPublishers = 3; //tam padrão para a quant de pb exibidos 
    let qntCardPlataforma = 3; //tam padrão para a quant de pt exibidos 
    
    // So chama a funcões se a div estiver na pagina, ou seja != de null. - evita erros de carregamento
            const pagJogos = document.getElementById('rwJogos');
            const pagPublishers = document.getElementById('rwPublishers');
            const pagPlataformas = document.getElementById('rwPlataformas');
            const pagDetalhes = document.getElementById('mainDetalhes');

            if (pagJogos !== null) {
                console.log("Apis serão carregadas - lançamentos");
                jogosApi (qntCardJogos);
            }
            if (pagPublishers !== null) {
                console.log("Apis serão carregadas - publishers");
                publishersApi (qntCardPublishers);
            }
            if (pagPlataformas !== null) {
                console.log("Apis serão carregadas - plataformas");
                plataformasApi (qntCardPlataforma);
            }

            if (pagDetalhes !== null) {
                console.log("A api será carregada - Detalhes de id");
                JogoDetalhes ();
            }


    function jogosApi () {
        fetch ('https://api.rawg.io/api/games?key=4167d5a86b9b47439d0b46aa63a7d97c')
        .then(res => res.json())
        .then(data => {
            let strJg = '';
            for (let i=0; i<qntCardJogos;i++)  {
                let jg = data.results[i];
                strJg += `<div class="col-md-6 col-lg-4 col-xxl-3" onclick="alert( this.nomeJogo.value )">
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
            document.getElementById('rwJogos').innerHTML = strJg;
        })
    }

    function JogoDetalhes ()  {
        fetch (`https://api.rawg.io/api/games/${id}?key=4167d5a86b9b47439d0b46aa63a7d97c`)
            .then(res => res.json())
            .then(data => {
                if (data===undefined)   {
                    console.log('nao existe')
                    alert('O jogo não foi encontrado!');
                } else {
                    let strDt = '';
                        let dt = data;
                        let description = dt.description;
                        let esrb = dt.esrb_rating.name;
                        strDt += `<div class="jogoDetalhado">
                        <div class="row jgdt">
                            <div class="col-xl-6 col-lg-12">
                                <div class="midia">
                                    <img src="${dt.background_image}" alt="Bootstrap" width="100%">
                                </div>
                            </div>
                            <div class="col tx">
                                <div class="textos">
                                    <h4>${dt.name}</h4>
                                    <p>
                                    ${verificaDescription(description)}
                                    </p>
                                    
                                        <ul class="addInfoDetalhes">
                                            <li><strong>Classificação</strong>: ${classficacaoTransform(esrb)}</li>
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
                                                <a href="https://www.youtube.com/results?search_query=${dt.slug}"> <li><i class="fa-brands fa-youtube icon"></i></li> </a>
                                                <a href="${dt.reddit_url}"> <li><i class="fa-brands fa-reddit icon"></i></li> </a>
                                                <a href="https://www.youtube.com/results?search_query=${dt.slug}"> <li><i  class="fa-brands fa-steam icon"></i></li> </a>
                                                <a href="https://store.playstation.com/pt-br/search/${dt.slug}"> <li><i class="fa-brands fa-playstation icon"></i></li> </a>
                                                <a href="https://store.epicgames.com/pt-BR/browse?q=${dt.slug}"> <li><iconify-icon  icon="cib:epic-games" class="icon"></iconify-icon></li> </a>
                                                <a href="https://www.microsoft.com/pt-br/search/explore?q=${dt.slug}"> <li><i class="fa-brands fa-microsoft icon"></i></li> </a>
                                            </ul>
                                        </div>
                                    </div>
                
                    </div>`
                    document.getElementById('mainDetalhes').innerHTML = strDt;
                }
            })
    }
    
    function publishersApi (qntCardPublishers) {
        fetch ('https://api.rawg.io/api/publishers?key=4167d5a86b9b47439d0b46aa63a7d97c')
            .then(res => res.json())
            .then(data => {
                let strPb = '';
                for (let i=0; i<qntCardPublishers;i++)  {
                    let pb = data.results[i];
                    strPb += `<div class="col">
                    <div class="conteudo_publ">
                        <h4>${pb.name}</h4>
                        <img src="${pb.image_background}" alt="Bootstrap" width="160" height="90">
                        <h5>Principais jogos</h5>
                        <li>${pb.games[0].name}</li>
                        <li>${pb.games[1].name}</li>
                        <li>${pb.games[2].name}</li>
                        <p> <a class="moreInfo" href="https://www.google.com/search?q=${pb.slug}">Mais detalhes</a></p>
                    </div>
                    </div>`
                }
                document.getElementById('rwPublishers').innerHTML = strPb;
            })
    }
    
    function plataformasApi (qntCardPlataforma) {
        fetch ('https://api.rawg.io/api/platforms?key=4167d5a86b9b47439d0b46aa63a7d97c')
            .then(res => res.json())
            .then(data => {
                let strPf = '';
                for (let i=0; i<qntCardPlataforma;i++)  {
                    let pf = data.results[i];
                    strPf += `        <div class="col">
                    <div class="conteudo_plat">
                      <h4>${pf.name}</h4>
                      <img src="${pf.image_background}" alt="Bootstrap" width="160" height="90">
                      <h5>Principais jogos</h5>
                      <li>${pf.games[0].name}</li>
                      <li>${pf.games[1].name}</li>
                      <li>${pf.games[2].name}</li>
                      <p> <a class="moreInfo" href="https://www.google.com/search?q=${pf.slug}">Mais detalhes</a></p>
                    </div>
                  </div>`
                }
                document.getElementById('rwPlataformas').innerHTML = strPf;
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

    function bttAtualizaPlataformas () { 
        if(typeof window !== 'undefined')   {
            if (qntCardPlataforma<9)    {
                qntCardPlataforma +=3;
                plataformasApi(qntCardPlataforma);
                } else {
                console.log("Btn parou de funcionar, publishers chegou ao limite")
                document.getElementById('btnPlataformasWide').style.display="none";
                document.getElementById('btnPlataformasSmall').style.display="none";
            }
        }
        else {
            console.log("document not accessible - bttAtualizaPlataformas()")
        }
    }
    
    function classficacaoTransform (esrb) {
        if (esrb == "Teen")   {
            return "Adolescentes"
        } else if (esrb == "Mature") {
            return "Jovem adulto"
        } else if (esrb == "Adults Only") {
            return "Apenas adultos"
        } else if (esrb == "Everyone") {
            return "Todos"
        } else {
            return "Sem classificação"
        }
    }
     
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
        let fraseGeneros = '';
        for(let i=0; i<genres.length; i++) {
            if (i!=0)   {
               fraseGeneros += ", "     
            }
            fraseGeneros += genres[i].name;
        }
        return fraseGeneros;
    }