

console.log('teste1')
let qntCardJogos = 8;


atualizaJogos(qntCardJogos) //chamando função p/ carregar lançamentos

// criacao de funcoes para os lançamentos

function atualizaJogos (qntCardJogos) {
fetch ('https://api.rawg.io/api/games?key=4167d5a86b9b47439d0b46aa63a7d97c')
    .then(res => res.json())
    .then(data => {
        let str = '';
        for (let i=0; i<qntCardJogos;i++)  {
            let jg = data.results[i];
            str += `<div class="col-md-6 col-lg-4 col-xxl-3">
            <div class="card_jogo">
              <h5 id="strela">${reviewEstrelas(jg.rating)}</h5>
              <h4 id="nomeJogo">${jg.name}</h4>
              <div id="cf">
                <img class="bottom" src="${jg.short_screenshots[1].image}" alt="Bootstrap" width="160"
                  height="90">
                <img class="top" src="${jg.background_image}" alt="Bootstrap" width="160" height="90">
              </div>
              <p> <a class="moreInfo" id="dta" href="#">Data de lançamento: ${dtLanca(data.results[i].released)}</a></p>
              <p> <a class="moreInfo" href="https://www.youtube.com/watch?v=K-jQz0qA1xA">Mais detalhes</a></p>
            </div>
          </div>`
        }
        document.getElementById('rwJogos').innerHTML = str;
    })
}

function dtLanca(dtbr) { //pega o released e transforma em data brasileira
    let ano = dtbr.substring(4,0);
    let mes = dtbr.substring(7,5);
    let dia = dtbr.substring(10,8);

    let lancamentoData = dia + '/'+ mes + '/'+ano;
        return lancamentoData;
}

function reviewEstrelas (rating) { //pega o rating e transforma em icones de estrela
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
function bttAtualizaJogos () {
    if (qntCardJogos<19)    {
        qntCardJogos +=4;
        atualizaJogos(qntCardJogos)
    } else {
        console.log("Btn parou de funcionar, lançamento chegou ao limite")
        document.getElementById('btnLancamentosWide').style.display="none";
        document.getElementById('btnLancamentosSmall').style.display="none";
    }
}

// criacao de funcoes para os publishers

let qntCardPublishers = 3;

atualizaPublishers (qntCardPublishers)

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











/*
fetch ('https://api.rawg.io/api/games?key=4167d5a86b9b47439d0b46aa63a7d97c')
    .then(res => res.json())
    .then(data => console.log(data.results[1]))

fetch ('https://api.rawg.io/api/games?key=4167d5a86b9b47439d0b46aa63a7d97c')
    .then(res => res.json())
    .then(data => document.getElementById('nomeJogo').innerHTML = (data.results[1].name))


fetch ('https://api.rawg.io/api/games?key=4167d5a86b9b47439d0b46aa63a7d97c')
    .then(res => res.json())
    .then(data => document.getElementById('dta').innerHTML += (data.results[1].released.replaceAll("-", " ")))
*/
    