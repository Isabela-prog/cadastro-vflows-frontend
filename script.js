let contadorProdutos = 1;

// Função para adicionar formulário de produto
async function adicionarProduto() {
  try {
    // buscar o componente produto.html
    const response = await fetch("components/produto.html");
    if (!response.ok) throw new Error(`Erro ao carregar componente: ${response.statusText}`);

    const html = await response.text();
    // Criar container temporário para converter o HTML em elemento DOM
    const wrapper = document.createElement("div");
    wrapper.innerHTML = html.trim();

    // Pega o elemento .produto-unitario
    const produto = wrapper.firstElementChild;

    // Atualizar o título com o número do produto
    const titulo = produto.querySelector("h3");
    titulo.textContent = `Produto - ${contadorProdutos}`;

     // remover ao clicar na lixeira
    const botaoRemover = produto.querySelector(".remover-produto");
    botaoRemover.addEventListener("click", () => {
      produto.remove();
      atualizarH3Produtos();
    });

    // calcular o valor total
    // selecionar os inputs
    const quantidadeInput = produto.querySelector('input[name="quantidade"]');
    const valorUnitarioInput = produto.querySelector('input[name="valorUnitario"]');
    const valorTotalInput = produto.querySelector('input[name="valorTotal"]');

    const atualizarValorTotal = () => {
      // converter o texto para numero decimal ou utilizar zero (para não gerar erros)
      const quantidade = parseFloat(quantidadeInput.value) || 0;
      const valorUnitario = parseFloat(valorUnitarioInput.value) || 0;
      // realizar a operação
      const total = quantidade * valorUnitario;
      // inserir o valor, com duas casas decimais, no local
      valorTotalInput.value = total.toFixed(2);
    };

    // sempre que o usuário alterar algum valor dentro dos respectivos campos, a função é acionada
    quantidadeInput.addEventListener("input", atualizarValorTotal);
    valorUnitarioInput.addEventListener("input", atualizarValorTotal);

    // inserir produto no container que está na index
    document.getElementById("produtos-container").appendChild(produto);

    contadorProdutos++;
  } catch (error) {
    console.error("Erro ao adicionar produto:", error);
  }
}

// atualiza os títulos o h3 do produto sempre que um for removido
function atualizarH3Produtos() {
  const produtos = document.querySelectorAll(".produto-unitario");
  produtos.forEach((produto, index) => {
    const titulo = produto.querySelector("h3");
    titulo.textContent = `Produto - ${index + 1}`;
  });

  // atualiza o contador global para não adc número repetido
  contadorProdutos = produtos.length + 1;
}


// ao carregar a página, já adiciona 1 formulário de produto
window.addEventListener("DOMContentLoaded", () => {
  adicionarProduto();
});

// listener do botão para adicionar mais produtos
document.getElementById("adicionar-produto").addEventListener("click", () => {
  adicionarProduto();
});