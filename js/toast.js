function showToast(message, type) {
    const toastContainer = document.getElementById("toastContainer");
    const toast = document.createElement("div");
    toast.classList.add("toast");
    toast.classList.add(type); // 'success' ou 'error'
    toast.innerText = message;

    // Adiciona o toast à tela
    toastContainer.appendChild(toast);

    // Exibe o toast com animação
    setTimeout(() => {
      toast.classList.add("show");
    }, 100);

    // Remove o toast após 3 segundos
    setTimeout(() => {
      toast.classList.remove("show");
      setTimeout(() => {
        toastContainer.removeChild(toast);
      }, 500);
    }, 3000);
  }