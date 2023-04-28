//##PREENCHA ATENTAMENTE AS VARIÁVEIS A SEGUIR.
/**
 * dominios -> é a lista de domínios que devem ser tagueados no formato: ['dominio.com' , 'exemplo.com'];
 * nome_de_origem ->  Nome do site atual, que aparecerá como "source" do tráfego: 'Meu Site';
 * detectar_subdominios -> quando "true" (padrão) irá buscar automaticamente qualquer link que aponte p/ *.dominio_atual
 */
// lista de domínios que devem ser tagueados no formato: ['dominio.com' , 'exemplo.com'];
// Atenção: caso detectar_subdominios esteja "true", não precisa listar aqui os subdomínios do site.
let dominios = ['materiais.prorim.org.br', 'doutoronline.org.br', 'materiais.creatinometro.dev2'];

// Nome do site atual, que aparecerá como "source" do tráfegi.
let nome_de_origem = 'Creatinômetro';

//Ativa a detecção automática de subdomínios
let detectar_subdominios = true;

/** #############################################################################     */
/* NÃO MEXER DAQUI PARA BAIXO*/

let media = "referral"; //advanced option only
if (detectar_subdominios) {
    // Fallback to prevent BIOS
    dominio_atual = document.location.hostname;
    dominio_atual = dominio_atual.replace("www.", ""); // remove fake subdomain if it exists

    let over_subdomains = dominios.filter(function (item) {
        return typeof item == 'string' && item.indexOf(dominio_atual) > -1;
    });
    over_subdomains.forEach(function (item) {
        index = dominios.indexOf(item);
        if (index > -1) { // only splice array when item is found
            dominios.splice(index, 1); // 2nd parameter means remove one item only
        }
    });
    dominios.push(dominio_atual);
}

window.setTimeout(function () {
    //everything will go here
}, 7000);

//iterate all domains to select all links
//at the end, "links" will serve it all.
let links = Array();
dominios.forEach(function (dominio) { //iterate with all domains
    local_links = document.querySelectorAll('a[href*="' + dominio + '"]'); //get all links from each domain
    local_links.forEach(function (link) { //iterate with links to aggregate it
        links.push(link); //send link to main array list
    });
});

// Build UTM Parameters for links without utms (building)
let utm_ = {
    utm_source: nome_de_origem,
    utm_medium: media,
    utm_campaign: document.location.hostname,
    utm_content: document.location.pathname
}
let final_string = "";
for (let [key, value] of Object.entries(utm_)) {
    final_string += key + "=" + encodeURI(value) + "&";
}
const QUERY_FINAL = final_string.slice(0, -1);
// end build utm params

//---------- Real updating final URL: -----------
links.forEach(function (link, key) {
    //if there is utm_ terms, then search and replace it
    if (link.href.indexOf("utm_") > 0) {
        updateLinkAsReplace(link);
    } else {
        updateLinkAsNew(link);
    }
});

function updateLinkAsReplace(link) {
    // get arguments from url
    original_search_string = link.search.substring(1);
    //parse to object
    let search_obj = JSON.parse('{"' + decodeURI(original_search_string).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}');
    //iterate with 4 UTMs defined and replace on search_obj. If does not exists, create it.
    for (const key in utm_) {
        search_obj[key] = utm_[key];
    };
    let final_string = new URLSearchParams(search_obj).toString();
    let base_href = link.href.slice(0, link.href.indexOf("?"));
    let final_url = base_href + "?" + final_string;
    link.href = final_url;
}

function updateLinkAsNew(link) {

    //Get original href of the link
    original_href = link.href;
    // Check if url contains "?" and return wich use to start joining parameters
    let joinner = original_href.includes('?') ? '&' : '?';
    //make the new href string
    let final_url = original_href + joinner + QUERY_FINAL;
    //update link href
    link.href = final_url;
}