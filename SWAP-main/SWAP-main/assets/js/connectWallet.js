(function ($) {
  ("use strict");
  /*-- check metamask is installed on the browser --*/
  const isMetaMaskInstalled = () => {
    if (window.ethereum) {
      return true;
    }
    return false;
  };

  /*-- connect metamask wallet --*/
  const connectWallet = async () => {
    if (isMetaMaskInstalled()) {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      return accounts[0];
    }
  };

  /*-- disconnect metamask wallet --*/
  const disconnectWallet = async () => {
    sessionStorage.removeItem("selectedAccount");
  };

  /*-- check metamask wallet is connected --*/
  const isWalletConnected = () => {
    const selectedAccountText = sessionStorage.getItem("selectedAccount");
    if (selectedAccountText !== null) {
      return true;
    }
    return false;
  };

  // wallet address
  const walletAddress = () => {
    const selectedAccountText = sessionStorage.getItem("selectedAccount");
    const gittuConnectWalletBtn = document.querySelectorAll(
      ".connect-wallet-btn"
    );
    const gittuConnectWalletBtnV7 = document.querySelectorAll(
      ".connect-wallet-btn-v7"
    );

    if (selectedAccountText != null) {
      const _walletAddress =
        selectedAccountText.slice(0, 4) + "..." + selectedAccountText.slice(-4);
      const _walletAddressShort =
        selectedAccountText.slice(0, 2) + "..." + selectedAccountText.slice(-2);
      gittuConnectWalletBtn.forEach((item, i) => {
        item.innerHTML =
          `<span>` +
          _walletAddress +
          `</span>` +
          `<span class='short-address'>` +
          _walletAddressShort +
          `</span>` +
          `<img src="./assets/images/icon/dropdown.svg" alt="icon" />`;
      });
      gittuConnectWalletBtnV7.forEach((item, i) => {
        item.innerHTML =
          `<span class="w-50"><img src="./assets/images/icon/wallet.svg" alt="icon">Wallet</span><strong><img src="./assets/images/icon/plus.svg" alt="icon"></strong><span class="w-45 justify-end">` +
          _walletAddressShort +
          `<img src="./assets/images/icon/dropdown.svg" alt="icon" /></span>`;
      });
    } else {
      gittuConnectWalletBtn.forEach((item, i) => {
        item.innerHTML = `Connect <span>Wallet</span>`;
      });

      gittuConnectWalletBtnV7.forEach((item, i) => {
        item.innerHTML = `<span class="w-50"><img src="./assets/images/icon/wallet.svg" alt="icon">Wallet</span><strong><img src="./assets/images/icon/plus.svg" alt="icon"></strong><span class="w-45 justify-end">Connect</span>`;
      });
    }
  };

  // Chain ID to Symbol Mapping
  const chainSymbols = {
    1: "ETH", // Ethereum Mainnet
    5: "ETH", // Goerli Testnet
    11155111: "ETH", // Sepolia Testnet
    56: "BNB", // Binance Smart Chain
    97: "tBNB", // Binance Smart Chain Testnet
    137: "MATIC", // Polygon Mainnet
    80001: "MATIC", // Polygon Mumbai Testnet
    43114: "AVAX", // Avalanche Mainnet
    43113: "AVAX", // Avalanche Fuji Testnet
    10: "ETH", // Optimism
    42161: "ETH", // Arbitrum One
    8453: "ETH", // Base Mainnet
    84531: "ETH", // Base Goerli Testnet
  };

  const getWalletInfo = async () => {
    const selectedAccountText = sessionStorage.getItem("selectedAccount");
    const walletAddressText = document.querySelectorAll(".wallet-address");
    const walletBalanceText = document.querySelectorAll(".wallet-balance");

    if (selectedAccountText != null) {
      //address
      const _walletAddress =
        selectedAccountText.slice(0, 4) + "..." + selectedAccountText.slice(-4);
      walletAddressText.forEach((item, i) => {
        item.innerHTML = _walletAddress;
      });

      // balance
      const chainId = await window.ethereum.request({ method: "eth_chainId" });
      const chainIdDecimal = parseInt(chainId, 16);
      const symbol = chainSymbols[chainIdDecimal] || "";
      const balance = await window.ethereum.request({
        method: "eth_getBalance",
        params: [selectedAccountText, "latest"],
      });
      const balanceInEth = (parseInt(balance, 16) / 10 ** 18).toFixed(2);

      walletBalanceText.forEach((item, i) => {
        item.innerHTML = balanceInEth + " " + symbol;
      });
    } else {
      walletAddressText.forEach((item, i) => {
        item.innerHTML = "";
      });

      walletBalanceText.forEach((item, i) => {
        item.innerHTML = "0 ETH";
      });
    }
  };

  // copy wallet address
  var copyWalletBtn = $(".gittu-copywallet-btn");
  if (copyWalletBtn.length) {
    document
      .querySelector(".gittu-copywallet-btn")
      .addEventListener("click", () => {
        const selectedAccountText = sessionStorage.getItem("selectedAccount");
        navigator.clipboard
          .writeText(selectedAccountText)
          .then(() => {
            console.log("copied");
          })
          .catch((err) => {
            console.error("Failed to copy:", err);
          });
      });
  }

  /*-- window load scripts --*/
  $(window).on("load", async () => {
    try {
      if (isMetaMaskInstalled()) {
        if (isWalletConnected()) {
          // Listen for account changes
          window.ethereum.on("accountsChanged", (accounts) => {
            if (accounts.length > 0) {
              sessionStorage.setItem("selectedAccount", accounts[0]);
              walletAddress();
              getWalletInfo();
            }
          });

          // Listen for chain changes
          window.ethereum.on("chainChanged", (chainId) => {
            walletAddress();
            getWalletInfo();
          });
        }

        // get wallet address in connect wallet btn
        walletAddress();
        // get wallet address & balance
        getWalletInfo();

        //connect modal
        var connectModal;
        var connectModalDiv = $("#connectModal");
        if (connectModalDiv.length) {
          connectModal = new bootstrap.Modal(
            document.querySelector("#connectModal")
          );
        }

        // disconnect modal
        var disconnectModal;
        var disconnectModalDiv = $("#disconnectModal");
        if (disconnectModalDiv.length) {
          disconnectModal = new bootstrap.Modal(
            document.querySelector("#disconnectModal")
          );
        }

        // connect wallet button
        var connectWalletBtn = $(".connect-wallet-btn");
        if (connectWalletBtn.length) {
          document
            .querySelectorAll(".connect-wallet-btn")
            .forEach((element) => {
              element.addEventListener("click", async () => {
                if (isWalletConnected()) {
                  disconnectModal.show();
                } else {
                  connectModal.show();
                }
              });
            });
        }

        var connectWalletBtnV7 = $(".connect-wallet-btn-v7");
        if (connectWalletBtnV7.length) {
          document
            .querySelectorAll(".connect-wallet-btn-v7")
            .forEach((element) => {
              element.addEventListener("click", async () => {
                if (isWalletConnected()) {
                  disconnectModal.show();
                } else {
                  connectModal.show();
                }
              });
            });
        }

        // connect wallet
        var gittuConnectBtn = $(".gittu-connect-btn");
        if (gittuConnectBtn.length) {
          document
            .querySelector(".gittu-connect-btn")
            .addEventListener("click", async () => {
              const _selectedAccount = await connectWallet();
              connectModal.hide();
              sessionStorage.setItem("selectedAccount", _selectedAccount);
              walletAddress();
              getWalletInfo();
            });
        }

        // disconnect wallet
        var gittuConnectBtn = $(".gittu-disconnect-btn");
        if (gittuConnectBtn.length) {
          document
            .querySelector(".gittu-disconnect-btn")
            .addEventListener("click", async () => {
              await disconnectWallet();
              disconnectModal.hide();
              walletAddress();
              getWalletInfo();
            });
        }
      } else {
        console.log("Metamask Not Installed!");
      }
    } catch (error) {
      console.log(error);
    }
  });
})(jQuery);
