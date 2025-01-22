// Função para criar e exibir o toast
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

function sendResetCode() {
  const email = document.getElementById("email").value;

  if (!email) {
    showToast("Por favor, insira o seu e-mail.", "error");
    return;
  }

  // Simulação de validação do e-mail (substitua com verificação real)
  const validEmail = "will@will";

  if (email !== validEmail) {
    showToast("Email não credenciado.", "error");
    return;
  }

  // Simula o envio de código de redefinição
  document.querySelector(".reset-loading").style.display = "block";

  setTimeout(() => {
    document.querySelector(".reset-loading").style.display = "none";
    showToast("Código enviado para o seu e-mail (simulado)!", "success");

    // Aqui você pode chamar a função para processar o código de redefinição
    showResetCodeForm(); // Exibe o formulário para inserir o código
  }, 2000);
}

// Exibir o formulário para inserir o código de redefinição
function showResetCodeForm() {
  const emailSection = document.querySelector(".input-container");
  emailSection.innerHTML = `
          <label for="resetCode">Digite o código enviado para o seu e-mail</label>
          <input type="text" id="resetCode" placeholder="Código de 6 dígitos" />
        `;
  const button = document.querySelector(".btn-cadastrar");
  button.innerHTML = `
          Verificar Código
          <div class="loading reset-loading"></div>
        `;
  button.setAttribute("onclick", "verifyResetCode()");
}

// Função para verificar o código de redefinição
function verifyResetCode() {
  const resetCode = document.getElementById("resetCode").value;

  // Simulação de código correto (substitua com verificação real)
  const correctCode = "123456";

  if (!resetCode) {
    showToast("Por favor, insira o código de redefinição.", "error");
    return;
  }

  if (resetCode !== correctCode) {
    showToast("Código incorreto.", "error");
    return;
  }

  // Exibe o campo de nova senha
  showNewPasswordForm();
}

// Exibir o campo para a nova senha
function showNewPasswordForm() {
  const resetSection = document.querySelector(".inputs");
  resetSection.innerHTML = `
         <div class="input-container">
          <label for="newPassword">Digite sua nova senha</label>
          <input type="password" id="newPassword" placeholder="Nova Senha" />
 </div >
           <div class="input-container">
          <label for="confirmPassword">Confirmar nova senha</label>
          <input type="password" id="confirmPassword" placeholder="Confirmar Senha" />
           </div>
        `;

  const button = document.querySelector(".btn-cadastrar");
  button.innerHTML = `
          Alterar Senha
          <div class="loading reset-loading"></div>
        `;
  button.setAttribute("onclick", "changePassword()");
}

// Função para alterar a senha
function changePassword() {
  const newPassword = document.getElementById("newPassword").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  if (!newPassword || !confirmPassword) {
    showToast("Por favor, preencha todos os campos de senha.", "error");
    return;
  }

  if (newPassword !== confirmPassword) {
    showToast("As senhas não coincidem.", "error");
    return;
  }

  // Simula a alteração da senha
  setTimeout(() => {
    showToast("Senha alterada com sucesso!", "success");

    // Redireciona para a tela de login
    setTimeout(() => {
      window.location.href = "../pages/login.html";
    }, 1000);
  }, 2000);
}
