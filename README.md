# Desafio Técnico - VFlows

Este projeto foi desenvolvido como parte do processo seletivo para estágio na **VFlows**. O desafio consiste em um formulário de cadastro de fornecedores e produtos, com preenchimento automático de endereço do cliente via CEP e valor de total do produto (considerando o valor unitário x a quantidade em estoque)

## Tecnologias Permitidas

- HTML5
- CSS3
- JavaScript (ES6+)
- ViaCEP API - busca de endereço automática

## Funcionalidades
- Formulário de cadastro: 
  - [] Razão social (obrigatório)
  - [] Nome Fantasia (obrigatório)
  - [] CNPJ (obrigatório)
  - [] Inscrição Estadual (opcional)
  - [] Inscrição Municipal (opcional)
  - [] Endereço preenchido automaticamente via API CEP (obrigatório)
  - [] Nome da pessoa de contato (obrigatório)
  - [] Telefone (obrigatório)
  - [] E-mail (obrigatório)

  - [] Tabela de produto:
    - [] Descrição (obrigatório)
    - [] Unidade de Medida (obrigatório)
    - [] Quantidade em Estoque (obrigatório)
    - [] Valor Unitário (obrigatório)
    - Valor Total calculado automaticamente através do valor unitário x a quantidade em estoque (obrigatório)
  - [] Tabela de anexos:
    - [] Visualização e download de arquivo selecionado (armazenado em memória - blob e session storage)
    - [] Remoção de arquivo (doc deve ser excluído da memória)
    - [] Arquivo salvo em Json (mostrar modal de loading de envio)

## Estrutura do Projeto

### Como executar
O arquivo index.html pode ser aberto diretamente no navegador ou ser aberto utilizando a extensão Live Server (no VSCode) para o teste.