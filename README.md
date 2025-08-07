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
  
  - [] Tabela de anexos:
    - [] Visualização e download de arquivo selecionado (armazenado em memória - blob e session storage)
    - [] Remoção de arquivo (doc deve ser excluído da memória)
    - [] Arquivo salvo em Json (mostrar modal de loading de envio)

## Estrutura do Projeto

## Organização do projeto

- Spring 1
    - [x] portifólio
    - [x] divisão das DIVs e sections
    - [x] estruturar no index.html a section Dados do Fornecedor
    - [x] estruturar no index.html a section Produtos
    - [x] estruturar no index.html a section Anexos
    - [] componentizar produto unitário
    - [] criar DOM do produto unitário
  
- Spring 2
  - [] componentizar Anexos
  - [] criar DOM de Anexos
  - [] estilizar pag
  
### Como executar
O arquivo index.html pode ser aberto diretamente no navegador ou ser aberto utilizando a extensão Live Server (no VSCode) para o teste.