const provider = new ethers.providers.Web3Provider(window.ethereum);
let signer, user;

const NKTx_TOKEN = "0xSeuContratoAqui"; // Endereço do token NKTx
const USDT_TOKEN = "0x55d398326f99059fF775485246999027B3197955"; // USDT BSC
const ROUTER = "0x10ED43C718714eb63d5aA57B78B54704E256024E"; // PancakeSwap v2 Router

const sellInput = document.getElementById("sellAmount");
const buyInput = document.getElementById("buyAmount");
const connectBtn = document.getElementById("connectWallet");
const swapBtn = document.getElementById("swapBtn");

// Conectar carteira
connectBtn.addEventListener("click", async () => {
  await provider.send("eth_requestAccounts", []);
  signer = provider.getSigner();
  user = await signer.getAddress();
  connectBtn.textContent = `Conectado: ${user.slice(0, 6)}...${user.slice(-4)}`;
});

// Calcular estimativa (exemplo: 1 NKTx = 0.5 USDT)
sellInput.addEventListener("input", () => {
  const amount = parseFloat(sellInput.value) || 0;
  const fee = amount * 0.003;
  const price = 0.5; // preço fixo para exemplo
  buyInput.value = ((amount - fee) * price).toFixed(2);
});

// Executar swap real
swapBtn.addEventListener("click", async () => {
  if (!signer) return alert("Conecte a carteira primeiro!");
  const amount = parseFloat(sellInput.value);
  if (!amount || amount <= 0) return alert("Digite um valor válido!");

  const router = new ethers.Contract(ROUTER, [
    "function swapExactTokensForTokens(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline) external returns (uint[] memory amounts)"
  ], signer);

  const amountIn = ethers.utils.parseUnits(amount.toString(), 18); // assumindo 18 decimais
  const path = [NKTx_TOKEN, USDT_TOKEN];
  const deadline = Math.floor(Date.now() / 1000) + 60 * 5;

  const tx = await router.swapExactTokensForTokens(
    amountIn,
    0, // mínimo (slippage livre)
    path,
    user,
    deadline
  );

  alert("Swap enviado! TX: " + tx.hash);
});
// swap.js - Script funcional para swap de tokens via Uniswap V2/Pancake/QuickSwap


const Web3 = window.Web3;
let web3;
let accounts;


// Configurações iniciais
const routers = {
ethereum: {
address: "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D", // Uniswap V2
usdt: "0xdAC17F958D2ee523a2206206994597C13D831ec7"
},
bsc: {
address: "0x10ED43C718714eb63d5aA57B78B54704E256024E", // Pancake V2
usdt: "0x55d398326f99059fF775485246999027B3197955"
},
polygon: {
address: "0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff", // QuickSwap
usdt: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174"
}
};


let selectedChain = 'bsc'; // Altere aqui conforme necessário
let router;
let routerContract;


async function connectWallet() {
if (window.ethereum) {
web3 = new Web3(window.ethereum);
await window.ethereum.enable();
accounts = await web3.eth.getAccounts();
router = routers[selectedChain].address;
routerContract = new web3.eth.Contract(uniswapAbi, router);
document.getElementById('walletStatus').innerText = `Conectado: ${accounts[0]}`;
} else {
alert("MetaMask não detectado");
}
}


async function getQuote() {
const amountIn = document.getElementById('sellAmount').value;
const tokenIn = document.getElementById('sellToken').innerText;
const tokenOut = document.getElementById('buyToken').innerText;
if (!amountIn || amountIn <= 0) return;


const path = [tokenIn, tokenOut];
const amountInWei = web3.utils.toWei(amountIn, 'ether');


try {
const amounts = await routerContract.methods.getAmountsOut(amountInWei, path).call();
const quote = web3.utils.fromWei(amounts[1], 'ether');
document.getElementById('buyAmount').value = quote;
} catch (e) {
console.error(e);
alert("Falha ao obter cotação: verifique liquidez");
}
}


async function approveToken(tokenAddress, amount) {
const tokenContract = new web3.eth.Contract(erc20Abi, tokenAddress);
try {
await tokenContract.methods.approve(router, amount).send({ from: accounts[0] });
alert("Token aprovado com sucesso!");
} catch (e) {
console.error(e);
alert("Erro ao aprovar token");
}
}

async function swapTokens() {
const amountIn = web3.utils.toWei(document.getElementById('sellAmount').value, 'ether');
const tokenIn = document.getElementById('sellToken').innerText;
const tokenOut = document.getElementById('buyToken').innerText;


const path = [tokenIn, tokenOut];
const to = accounts[0];
const deadline = Math.floor(Date.now() / 1000) + 60 * 20;


try {
await routerContract.methods.swapExactTokensForTokens(
amountIn,
0, // slippage tolerância mínima
path,
to,
deadline
).send({ from: accounts[0] });


alert("Swap realizado com sucesso!");
} catch (e) {
console.error(e);
alert("Erro ao realizar swap");
}
}

document.addEventListener("DOMContentLoaded", function () {
  const btn = document.getElementById("test-1");

  if (btn) {
    btn.addEventListener("click", function () {
      // Direciona para o layout principal do site
      window.location.href = "main.html"; // ajuste para o caminho real do seu layout
    });
  }
});