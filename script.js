// ===============================
// DOM do Produto
// ===============================

// contador dos produtos
let contadorProdutos = 1;

async function adicionarProduto() {
  // fazer a requisição para carregar o HTML do produto
  const response = await fetch("components/produto.html");
  if (!response.ok) throw new Error(`Erro ao carregar componente: ${response.statusText}`);

  // pegar o conteúdo HTML, criar o wrapper para a manipulação
  const html = await response.text();
  const $wrapper = $("<div>").html(html.trim());
  const $produto = $wrapper.children().first();

  // atualizar a numeração do h3
  const $titulo = $produto.find("h3");
  $titulo.text(`Produto - ${contadorProdutos}`);

  // remover o produto com o click do botão
  const $botaoRemover = $produto.find(".remover-produto");
  $botaoRemover.on("click", () => {
    $produto.remove();
    // atualizar as numerações dos produtos restantes após remoção
    atualizarH3Produtos();
  });

  // selecionar inputs
  const $quantidadeInput = $produto.find('input[name="quantidade"]');
  const $valorUnitarioInput = $produto.find('input[name="valorUnitario"]');
  const $valorTotalInput = $produto.find('input[name="valorTotal"]');

  // atualizar o valor total multiplicando quantidade x valor unitário
  const atualizarValorTotal = () => {
    const quantidade = parseFloat($quantidadeInput.val()) || 0;
    const valorUnitario = parseFloat($valorUnitarioInput.val()) || 0;
    const total = quantidade * valorUnitario;
    $valorTotalInput.val(total.toFixed(2));
  };

  // atualizar o valor total qd a quantidade ou valor unitário mudarem
  $quantidadeInput.on("input", atualizarValorTotal);
  $valorUnitarioInput.on("input", atualizarValorTotal);

  // adicionar ao container de produtos na página
  $("#produtos-container").append($produto);
  contadorProdutos++;
}

//  atualizar os títulos h3 dos produtos com a numeração correta
function atualizarH3Produtos() {
  $(".produto-unitario").each(function(index) {
    $(this).find("h3").text(`Produto - ${index + 1}`);
  });
  contadorProdutos = $(".produto-unitario").length + 1;
}

// depois do DOM carregar, adiciona sempre um produto incial
$(document).ready(() => {
  adicionarProduto();

  $("#adicionar-produto").on("click", () => {
    adicionarProduto();
  });
});

// ===============================
// DOM do Anexo
// ===============================

let contadorAnexos = 1;
// guardar os anexos em memória
let listaDeAnexos = [];

const $listaAnexosContainer = $(".lista-anexos");
const $botaoAdicionarAnexo = $("#adicionar-anexo");

$botaoAdicionarAnexo.on("click", () => {
  // criar input file temporário
  const input = document.createElement("input");
  input.type = "file";
  input.accept = "*/*";

  // quando o usuário selecionar um arquivo, ele será lido e convertido para base64
  input.addEventListener("change", (event) => {
    const arquivo = event.target.files[0];
    if (!arquivo) return;

    const reader = new FileReader();
    reader.onload = () => {
      listaDeAnexos.push({
        id: Date.now(), 
        nome: arquivo.name,
        blob: arquivo,
        base64: reader.result
      });

      renderizarListaAnexos();
    };
    reader.readAsDataURL(arquivo);
  });

  // abrir o seletor de arq
  input.click();
});

function renderizarListaAnexos() {
  $listaAnexosContainer.empty();

  listaDeAnexos.forEach((anexo, index) => {
    fetch("components/anexo.html")
      .then(response => response.text())
      .then(html => {
        const $wrapper = $("<div>").html(html.trim());
        const $novoAnexo = $wrapper.children().first();

        // atualizar o título do anexo
        $novoAnexo.find(".nome-doc").text(`Documento Anexo ${index + 1}`);

        // visualizar o anexo ao clicar no botão, fazendo download
        $novoAnexo.find(".visualizar-doc").on("click", () => {
          const url = URL.createObjectURL(anexo.blob);
          const link = document.createElement("a");
          link.href = url;
          link.download = anexo.nome;
          link.click();
          URL.revokeObjectURL(url);
        });

        // remover o anexo da lista e atualizar
        $novoAnexo.find(".remover-doc").on("click", () => {
          listaDeAnexos = listaDeAnexos.filter(a => a.id !== anexo.id);
          renderizarListaAnexos();
        });

        $listaAnexosContainer.append($novoAnexo);
      });
  });

  contadorAnexos = listaDeAnexos.length + 1;
}

// ===============================
// Consumo API via CEP
// ===============================

$(document).ready(() => {
  const $cepInput = $("#cep");
  const $enderecoInput = $("#endereco");
  const $bairroInput = $("#bairro");
  const $municipioInput = $("#municipio");
  const $estadoInput = $("#estado");

  // fazer a requisição para a API ViaCEP e preenche os campos do endereço
  const buscarEndereco = async (cep) => {
    const cepPuro = String(cep).replace(/\D/g, "");
    if (cepPuro.length !== 8) return;

    const url = `https://viacep.com.br/ws/${cepPuro}/json/`;

    const response = await fetch(url);
    if (!response.ok) return;

    const data = await response.json();

    $enderecoInput.val(data.logradouro || "");
    $bairroInput.val(data.bairro || "");
    $municipioInput.val(data.localidade || "");
    $estadoInput.val(data.uf || "");
  };

  // apenas com o CEP completo (8 dígitos), chama a função
  $cepInput.on("input", () => {
    const cepLimpo = $cepInput.val().replace(/\D/g, "");
    if (cepLimpo.length === 8) {
      buscarEndereco($cepInput.val());
    }
  });
});

// ===============================
// Gerar e baixar JSON com todos os dados
// ===============================

$("#salvar-fornecedor").on("click", () => {
  // verificar se há pelo menos 1 anexo para continuar
  if (listaDeAnexos.length === 0) {
    alert("Adicione ao menos um anexo antes de salvar o fornecedor!");
    return;
  }

  // exibir o modal de loading
  mostrarModalLoading();

  // timeout para garantir que o modal aparece antes do processamento
  setTimeout(() => {
    const form = $("#form-fornecedor")[0];
    const formData = new FormData(form);

    // dados do fornecedor
    const fornecedor = {
      razaoSocial: formData.get("razaoSocial"),
      nomeFantasia: formData.get("nomeFantasia"),
      cnpj: formData.get("cnpj"),
      inscricaoEstadual: formData.get("inscricaoEstadual"),
      inscricaoMunicipal: formData.get("inscricaoMunicipal"),
      nomeContato: formData.get("contato"),
      telefoneContato: formData.get("telefone"),
      emailContato: formData.get("email")
    };

    // dados dos produtos 
    const produtos = [];
    $(".produto-unitario").each(function(index) {
      const $produto = $(this);
      produtos.push({
        indice: index + 1,
        descricaoProduto: $produto.find('input[name="descricaoProduto"]').val(),
        unidadeMedida: $produto.find('select[name="unidadeMedida"]').val(),
        qtdeEstoque: $produto.find('input[name="quantidade"]').val(),
        valorUnitario: $produto.find('input[name="valorUnitario"]').val(),
        valorTotal: $produto.find('input[name="valorTotal"]').val()
      });
    });

    // dados dos anexos armazenados na lista
    const anexos = listaDeAnexos.map((anexo, index) => ({
      indice: index + 1,
      nomeArquivo: anexo.nome,
      blobArquivo: anexo.base64
    }));

    // juntar todos os dados em um objeto final
    const dadosFinal = {
      ...fornecedor,
      produtos,
      anexos
    };

    // converter o objeto em JSON formatado e criar o blob
    const jsonString = JSON.stringify(dadosFinal, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    // link temporário para download e disparar o clique
    const link = document.createElement("a");
    link.href = url;
    link.download = `fornecedor_${fornecedor.razaoSocial || "dados"}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    // fechar o modal de loading após finalizar
    esconderModalLoading();
  }, 500);
});

function mostrarModalLoading() {
  $("#modal-loading").removeClass("hidden");
}

function esconderModalLoading() {
  $("#modal-loading").addClass("hidden");
}