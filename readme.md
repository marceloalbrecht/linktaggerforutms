# **Link Tagger for UTMs**
Este script tem por finalidade incluir em todos os links da página que direcionem para **``dominios``** os parâmetros de UTMs para trackeamento.

## **Instalação**

Utilize o Tagmanager para fazer a instalação.
- Cria uma nova tag do tipo HTML
- Na primeira linha, digite: ``<script>``
- na última linha, digite: ``</script>``
- E entre estas duas linhas, cole todo o conteúdo do arquivo [main.js](main.js)

## **Configuração**

Dois parâmetros podem ser configurados:
### dominios
 Entre **[]** deve ficar a lista de domínios que você deseja traquear.
 - **Este parâmetro é obrigatório.**
 - Este parâmetro passa a ser opcional se ``detectar_subdominios`` estiver como ``true``.
 - exemplo: ``dominios = ['meublog.com.br', 'outrosite.com.br']``
 - observe atentamente o uso de 'aspas simples' delimitando o nome de cada domínio

 ### nome_de_origem
 **Este é o parâmetro mais importante**. Ele define o nome que irá aparecer em "utm_source" no Google Analytics.
 - Seja claro e especifique apenas o nome do site. Ex.: "Site Hover Leads" ou apenas "Site Institucional".
 - Este parâmetro é obrigatório

 ### detectar_subdominios
 Por padrão, vem definido como **"true"**. Isto significa que, por padrão, o script irá buscar por qualquer endereço que contenha um subdomínio pertencente ao mesmo domínio da página atual.
 - Normalmente ficará em seu valor padrão. Mude apenas se souber o que está fazendo.

 Criado com ❤ por [Hover Leads](https://hoverleads.com.br/)