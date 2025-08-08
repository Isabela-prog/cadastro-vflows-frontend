// ===============================
// DOM do Produto
// ===============================
let contadorProdutos = 1;

async function adicionarProduto() {

  const response = await fetch("components/produto.html");
  if (!response.ok) throw new Error(`Erro ao carregar componente: ${response.statusText}`);

  const html = await response.text();
  const wrapper = document.createElement("div");
  wrapper.innerHTML = html.trim();
  const produto = wrapper.firstElementChild;

  const titulo = produto.querySelector("h3");
  titulo.textContent = `Produto - ${contadorProdutos}`;

  const botaoRemover = produto.querySelector(".remover-produto");
  botaoRemover.addEventListener("click", () => {
    produto.remove();
    atualizarH3Produtos();
  });

  const quantidadeInput = produto.querySelector('input[name="quantidade"]');
  const valorUnitarioInput = produto.querySelector('input[name="valorUnitario"]');
  const valorTotalInput = produto.querySelector('input[name="valorTotal"]');

  const atualizarValorTotal = () => {
    const quantidade = parseFloat(quantidadeInput.value) || 0;
    const valorUnitario = parseFloat(valorUnitarioInput.value) || 0;
    const total = quantidade * valorUnitario;
    valorTotalInput.value = total.toFixed(2);
  };

  quantidadeInput.addEventListener("input", atualizarValorTotal);
  valorUnitarioInput.addEventListener("input", atualizarValorTotal);

  document.getElementById("produtos-container").appendChild(produto);
  contadorProdutos++;
}

function atualizarH3Produtos() {
  const produtos = document.querySelectorAll(".produto-unitario");
  produtos.forEach((produto, index) => {
    const titulo = produto.querySelector("h3");
    titulo.textContent = `Produto - ${index + 1}`;
  });

  contadorProdutos = produtos.length + 1;
}

window.addEventListener("DOMContentLoaded", () => {
  adicionarProduto();
});

document.getElementById("adicionar-produto").addEventListener("click", () => {
  adicionarProduto();
});

// ===============================
// DOM do Anexo
// ===============================

let contadorAnexos = 1; 
// Lista em memória com os anexos
let listaDeAnexos = [];

const listaAnexosContainer = document.querySelector('.lista-anexos');
const botaoAdicionarAnexo = document.getElementById('adicionar-anexo');


botaoAdicionarAnexo.addEventListener('click', () => {
  // criar um input novo na memória e tranformá-lo em seletor de files (de qlqr tipo - /)
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '*/*';

  // quando o usuário escolhe o arq ele dispara
  input.addEventListener('change', (event) => {
    
    // pegar arq selecionado
    const arquivo = event.target.files[0];
    if (!arquivo) return;

    // adicionar o arq na lista memória
    listaDeAnexos.push({
      id: Date.now(),
      nome: arquivo.name,
      blob: arquivo
    });

    //salvarAnexosNoSessionStorage();
    renderizarListaAnexos();
  });

  // fazer a janela de escolha do arq aparecer
  input.click();
  
});

// recriar todos os anexos na tela com a numeração atualizada
function renderizarListaAnexos() {
  // limpar anexos atuais
  listaAnexosContainer.innerHTML = ""; 
  // faz um for para percorrer anexos e montá-los
  for (let index = 0; index < listaDeAnexos.length; index++) {
    const anexo = listaDeAnexos[index];
    
    fetch("components/anexo.html")
      .then(response => response.text())
      .then(html => {
        const wrapper = document.createElement("div");
        wrapper.innerHTML = html.trim();
        const novoAnexo = wrapper.firstElementChild;

    // título dinâmico
    novoAnexo.querySelector(".nome-doc").textContent = `Documento Anexo ${index + 1}`;

    // visualizar (download)
    novoAnexo.querySelector(".visualizar-doc").addEventListener("click", () => {
      const url = URL.createObjectURL(anexo.blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = anexo.nome;
      link.click();
      URL.revokeObjectURL(url);
    });

    // remover
    novoAnexo.querySelector(".remover-doc").addEventListener("click", () => {
      listaDeAnexos = listaDeAnexos.filter((a) => a.id !== anexo.id);
      renderizarListaAnexos();
    });

    listaAnexosContainer.appendChild(novoAnexo);
  });
}
  contadorAnexos = listaDeAnexos.length + 1;
}

// ===============================
// Consumo API via CEP 
// ===============================
document.addEventListener("DOMContentLoaded", () => {
  const cepInput = document.getElementById("cep");
  const enderecoInput = document.getElementById("endereco");
  const bairroInput = document.getElementById("bairro");
  const municipioInput = document.getElementById("municipio");
  const estadoInput = document.getElementById("estado");

  const buscarEndereco = async (cep) => {
    // remover caractéres que não sejam números
    const cepPuro = String(cep).replace(/\D/g, "");
    // verificar se tem 8 dígitos
    if (cepPuro.length !== 8) {
      return;
    }

    // consumo da API
    const url = `https://viacep.com.br/ws/${cepPuro}/json/`;

    // fetch faz a requisição
    const response = await fetch(url);

    if (!response.ok) {
      return;
    }

    // converter a resposta da API para Json
    const data = await response.json();

    // preencher os campos
    enderecoInput.value = data.logradouro || "";
    bairroInput.value = data.bairro || "";
    municipioInput.value = data.localidade || "";
     estadoInput.value = data.uf || "";
  };

  // chama a API após o usuário digitar 8 dígitos
  cepInput.addEventListener("input", () => {
   const cepLimpo = cepInput.value.replace(/\D/g, "");
    if (cepLimpo.length === 8) {
      buscarEndereco(cepInput.value);
    }
  });

});

// ===============================
// Gerar e baixar JSON com todos os dados
// ===============================

document.getElementById("salvar-fornecedor").addEventListener("click", () => {
  
  // só poderá fazer o download do JSON se houver pelo menos um anexo
  if (listaDeAnexos.length === 0) {
    alert("Adicione ao menos um anexo antes de salvar o fornecedor!");
    return;
  }

  const form = document.getElementById("form-fornecedor");
  const formData = new FormData(form);

  // capturar campos do fornecedor
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

  // capturar campos do produtos
  const produtos = [];
  document.querySelectorAll(".produto-unitario").forEach((produtoEl, index) => {
    produtos.push({
      indice: index + 1,
      descricaoProduto: produtoEl.querySelector('input[name="descricaoProduto"]').value,
      unidadeMedida: produtoEl.querySelector('select[name="unidadeMedida"]').value,
      qtdeEstoque: produtoEl.querySelector('input[name="quantidade"]').value,
      valorUnitario: produtoEl.querySelector('input[name="valorUnitario"]').value,
      valorTotal: produtoEl.querySelector('input[name="valorTotal"]').value
    });
  });

  // captura campos do anexo, aproveitando a listaDeAnexos
  const anexos = listaDeAnexos.map((anexo, index) => {
    return {
      indice: index + 1,
      nomeArquivo: anexo.nome,
      blobArquivo: anexo.blob.name || anexo.blob.type 
    };
  });

  // juntar dados em um objeto final
  const dadosFinal = {
    ...fornecedor,
    produtos,
    anexos
  };

  // baixar arq Json
  // converter o objeto em string JSON
  const jsonString = JSON.stringify(dadosFinal, null, 2); 
  // criar um blob
  const blob = new Blob([jsonString], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = `fornecedor_${fornecedor.razaoSocial || "dados"}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
});
