// Dados dos projetos
const projetos = [
    { id: 1, nome: 'Criar Logo Empresarial', descricao: 'Preciso de uma logo para minha empresa de advocacia' },
    { id: 2, nome: 'Website Pessoal', descricao: 'Preciso de um website pessoal com portfólio' },
    { id: 3, nome: 'E-commerce', descricao: 'Desenvolvimento de um e-commerce para roupas' },
  ];
  
  // Página inicial: redirecionar ao clicar no botão "Ver Detalhes"
  if (document.querySelector('.projetos')) {
    document.querySelectorAll('.detalhes-btn').forEach((button) => {
      button.addEventListener('click', (event) => {
        const projetoId = event.target.closest('.projeto-card').dataset.id;
        localStorage.setItem('projetoSelecionado', projetoId);
        window.location.href = 'detalheService.html';
      });
    });
  }
  
  // Página de detalhes: carregar as informações do projeto
  if (document.querySelector('#detalhes-projeto')) {
    const projetoId = localStorage.getItem('projetoSelecionado');
    const projeto = projetos.find((p) => p.id == projetoId);
  
    if (projeto) {
      document.querySelector('#titulo-projeto').textContent = projeto.nome;
      document.querySelector('#descricao-projeto').textContent = projeto.descricao;
    } else {
      document.querySelector('#detalhes-projeto').innerHTML = '<p>Projeto não encontrado.</p>';
    }
  }
  