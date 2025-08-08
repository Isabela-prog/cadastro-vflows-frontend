# Desafio Técnico - VFlows

Este projeto foi desenvolvido como parte do processo seletivo para estágio na **VFlows**. O desafio consiste em um formulário de cadastro de fornecedores e produtos, com preenchimento automático de endereço do cliente via CEP e valor de total do produto (considerando o valor unitário x a quantidade em estoque)

## Tecnologias Permitidas

- HTML5
- CSS3
- JavaScript (ES6+)
- ViaCEP API - busca de endereço automática

## Funcionalidades
- Formulário de cadastro: 
  - [x] Razão social (obrigatório)
  - [x] Nome Fantasia (obrigatório)
  - [x] CNPJ (obrigatório)
  - [x] Inscrição Estadual (opcional)
  - [x] Inscrição Municipal (opcional)
  - [x] Endereço preenchido automaticamente via API CEP (obrigatório)
  - [x] Nome da pessoa de contato (obrigatório)
  - [x] Telefone (obrigatório)
  - [x] E-mail (obrigatório)

  - [x] Tabela de produto:
    - [x] Descrição (obrigatório)
    - [x] Unidade de Medida (obrigatório)
    - [x] Quantidade em Estoque (obrigatório)
    - [x] Valor Unitário (obrigatório)
    - [x] Valor Total calculado automaticamente através do valor unitário x a quantidade em estoque (obrigatório)
  
  - [x] Tabela de anexos:
    - [x] Visualização e download de arquivo selecionado (armazenado em memória - blob e session storage)
    - [x] Remoção de arquivo (doc deve ser excluído da memória)
    - [x] Adaptar o DOM do script.js para jQuery
  
  - [x] Arquivo fornecedor salvo em Json (mostrar modal de loading de envio) - download


## Estrutura do Projeto

├── assets/

│ └── img/ # imagens usadas no projeto

├── components/

│ ├── anexo.html # componente de anexo

│ └── produto.html # componente de produto

├── styles/

│ └── style.css # arquivo  de estilos CSS

├── index.html # página principal do projeto

├── script.js #  lógica da aplicação

└── README.md # documentação do projeto


## Organização do projeto

- Spring 1
    - [x] rascunho do projeto
    - [x] divisão das DIVs e sections
    - [x] estruturar no index.html a section Dados do Fornecedor
    - [x] estruturar no index.html a section Produtos
    - [x] estruturar no index.html a section Anexos
    - [x] componentizar produto unitário
    - [x] criar DOM do produto unitário
      - [x] quando a pag é redenrizada criar um form de produto
      - [x] criar um novo form do produto sempre que o botão de adc for clicado
      - [x] icone da lixeira exclui o produto - atualiza o número dos outros produtos que ficaram
      - [x] valor total ser preenchido automaticamente a partir dos valores fornecidos de quantidade e valor unitário
  
- Spring 2
  - [x] consumo API CEP
  - [x] componentizar Anexos
  - [x] criar DOM de Anexos
  - [x] botão de salvar fonecedor
  - [x] modal de loading
  - [x] estilizar pag
  - [x] modificar script.js para JQuery
  
## Considerações
Durante a execução deste teste, senti que consegui consolidar melhor meus conhecimentos em manipulação de blobs, uso do sessionStorage e na dinâmica do modal de loading.

### Principais desafios que encontrei foram:
- Modal de loading:
Inicialmente, o modal não aparecia durante o processo de download e não apresentava erros no console. Após pesquisas, identifiquei que isso acontecia devido a velocidade com que o download era executado. Pararesolver, utilizei a função setTimeout para garantir a exibição correta do modal antes do início do download.

- Uso do jQuery:
Como ainda não havia trabalhado com jQuery para manipulação dinâmica dos elementos, preferi inicialmente resolver o teste utilizando apenas o DOM nativo. Depois adaptei o código para jQuery, mas encontrei dificuldades na integração com o fetch e precisei investir bastante tempo em pesquisa para conversão dos seletores.

### O que eu melhoria:
- Iniciaria diretamente a manipulação dinâmica dos elementos utilizando jQuery, o que teria tornado o desenvolvimento mais produtivo.
- Aplicaria um replace no blob para remover informações desnecessárias, como data, otimizando o tamanho do arquivo.
- Aperfeiçoaria o CSS para deixá-lo mais alinhado ao layout original fornecido.
  
## Como executar
O arquivo index.html pode ser aberto diretamente no navegador ou ser aberto utilizando a extensão Live Server (no VSCode) para o teste.
