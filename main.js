//##PREENCHA ATENTAMENTE AS VARIÁVEIS A SEGUIR.
/**
 * dominios -> é a lista de domínios que devem ser tagueados no formato: ['dominio.com' , 'exemplo.com'];
 * nome_de_origem ->  Nome do site atual, que aparecerá como "source" do tráfego: 'Meu Site';
 * detectar_subdominios -> quando "true" (padrão) irá buscar automaticamente qualquer link que aponte p/ *.dominio_atual
 */
// lista de domínios que devem ser tagueados no formato: ['dominio.com' , 'exemplo.com'];
// Atenção: caso detectar_subdominios esteja "true", não precisa listar aqui os subdomínios do site.
var dominios = ['coleaqui.com.br'];

// Nome do site atual, que aparecerá como "source" do tráfegi.
var nome_de_origem = 'Nome do seu Site';

//Ativa a detecção automática de subdomínios
var detectar_subdominios = true;

/* ############################################################################# 
  
       NÃO MEXER DAQUI PARA BAIXO

#############################################################################*/

var media = "referral"; //advanced option only
if (detectar_subdominios) {
    // Fallback to prevent BIOS
    dominio_atual = document.location.hostname;
    dominio_atual = dominio_atual.replace("www.", ""); // remove fake subdomain if it exists

    var over_subdomains = dominios.filter(function (item) {
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


function updateLinkAsReplace(link) {
    // get arguments from url
    original_search_string = link.search.substring(1);
    //parse to object
    var search_obj = JSON.parse('{"' + decodeURI(original_search_string).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}');
    //iterate with 4 UTMs defined and replace on search_obj. If does not exists, create it.
    for (key in utm_) {
        search_obj[key] = utm_[key];
    };
    var final_string = new URLSearchParams(search_obj).toString();
    var base_href = link.href.slice(0, link.href.indexOf("?"));
    var final_url = base_href + "?" + final_string;
    link.href = final_url;
}

function updateLinkAsNew(link) {

    //Get original href of the link
    original_href = link.href;
    // Check if url contains "?" and return wich use to start joining parameters
    var joinner = original_href.includes('?') ? '&' : '?';
    //make the new href string
    var final_url = original_href + joinner + QUERY_FINAL;
    //update link href
    link.href = final_url;
}

window.setTimeout(function () {
    //iterate all domains to select all links
    //at the end, "links" will serve it all.
    var links = Array();
    dominios.forEach(function (dominio) { //iterate with all domains
        local_links = document.querySelectorAll('a[href*="' + dominio + '"]'); //get all links from each domain
        local_links.forEach(function (link) { //iterate with links to aggregate it
            links.push(link); //send link to main array list
        });
    });

    // Build UTM Parameters for links without utms (building)
    utm_ = {
        utm_source: nome_de_origem,
        utm_medium: media,
        utm_campaign: document.location.hostname,
        utm_content: document.location.pathname
    }
    var final_string = "";
    keys = Object.keys(utm_);
    keys.forEach(function (k) {
        final_string += k + "=" + encodeURI(utm_[k]) + "&";
    });

    /*for ([key, value] of Object.entries(utm_)) {
        final_string += key + "=" + encodeURI(value) + "&";
    }*/
    QUERY_FINAL = final_string.slice(0, -1);
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
}, 1500);