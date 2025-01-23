function showToast(message, type) {
    const toastContainer = document.getElementById('toastContainer') || createToastContainer();
    const toast = document.createElement('div');
    toast.classList.add('toast', type); // Tipos: 'success' ou 'error'
    toast.innerText = message;

    toastContainer.appendChild(toast);

    // Exibe e remove o toast com animação
    setTimeout(() => toast.classList.add('show'), 100);
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toastContainer.removeChild(toast), 500);
    }, 3000);
  }

  function createToastContainer() {
    const container = document.createElement('div');
    container.id = 'toastContainer';
    container.style.position = 'fixed';
    container.style.top = '10px';
    container.style.right = '10px';
    container.style.zIndex = '9999';
    document.body.appendChild(container);
    return container;
  }

  // Função para carregar projetos do localStorage
  function loadProjects() {
    const projects = JSON.parse(localStorage.getItem('projects')) || [];
    const projectsList = document.getElementById('projects-list');
    projectsList.innerHTML = projects.length === 0
      ? '<p>Não há projetos no momento.</p>'
      : '';

    projects.forEach((project, index) => {
      const projectCard = document.createElement('div');
      projectCard.classList.add('project-card');
      projectCard.innerHTML = `
        <h3>${project.name}</h3>
        <p>${project.description}</p>
        <button onclick="deleteProject(${index})">Deletar</button>
      `;
      projectsList.appendChild(projectCard);
    });
  }

  // Função para criar um novo projeto
  function createProject() {
    const projectName = document.getElementById('project-name').value;
    const projectDescription = document.getElementById('project-description').value;

    if (projectName && projectDescription) {
      const projects = JSON.parse(localStorage.getItem('projects')) || [];
      projects.push({ id: Date.now(), name: projectName, description: projectDescription });
      localStorage.setItem('projects', JSON.stringify(projects));
      showToast('Projeto criado com sucesso!', 'success');
      location.href = 'buscarFreelancer.html';
    } else {
      showToast('Preencha todos os campos.', 'error');
    }
  }

  // Função para deletar um projeto
  function deleteProject(index) {
    const projects = JSON.parse(localStorage.getItem('projects')) || [];
    projects.splice(index, 1);
    localStorage.setItem('projects', JSON.stringify(projects));
    showToast('Projeto deletado com sucesso!', 'success');
    loadProjects();
  }

  // Função para carregar detalhes do projeto para edição
  function loadProjectDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const projectId = parseInt(urlParams.get('id'));
    const projects = JSON.parse(localStorage.getItem('projects')) || [];
    const project = projects.find(p => p.id === projectId);

    if (project) {
      document.getElementById('project-name').value = project.name;
      document.getElementById('project-description').value = project.description;
    } else {
      showToast('Projeto não encontrado.', 'error');
      location.href = 'buscarFreelancer.html';
    }
  }

  // Função para salvar alterações do projeto
  function saveProject() {
    const urlParams = new URLSearchParams(window.location.search);
    const projectId = parseInt(urlParams.get('id'));
    const projects = JSON.parse(localStorage.getItem('projects')) || [];
    const projectIndex = projects.findIndex(p => p.id === projectId);

    if (projectIndex > -1) {
      projects[projectIndex].name = document.getElementById('project-name').value;
      projects[projectIndex].description = document.getElementById('project-description').value;
      localStorage.setItem('projects', JSON.stringify(projects));
      showToast('Projeto atualizado com sucesso!', 'success');
      location.href = 'buscarFreelancer.html';
    } else {
      showToast('Projeto não encontrado.', 'error');
    }
  }

  // Função para registrar um freelancer
  function registerFreelancer(event) {
    event.preventDefault();
    const freelancer = {
      nomeCompleto: document.getElementById('nomeCompleto').value,
      email: document.getElementById('email').value,
      categoriaServico: document.getElementById('categoriaServico').value
    };

    if (freelancer.nomeCompleto && freelancer.email && freelancer.categoriaServico) {
      localStorage.setItem('freelancer', JSON.stringify(freelancer));
      showToast('Cadastro realizado com sucesso!', 'success');
      location.href = '../pages/pageInicialFreelancer.html';
    } else {
      showToast('Preencha todos os campos.', 'error');
    }
  }

  // Função para carregar freelancers interessados
  function loadInterestedFreelancers() {
    const urlParams = new URLSearchParams(window.location.search);
    const projectId = parseInt(urlParams.get('id'));
    const interestedFreelancers = JSON.parse(localStorage.getItem('interestedFreelancers')) || {};

    const freelancersList = document.getElementById('interested-list');
    freelancersList.innerHTML = interestedFreelancers[projectId]?.length
      ? interestedFreelancers[projectId].map(id => `<li>Freelancer ID: ${id}</li>`).join('')
      : '<p>Não há freelancers interessados.</p>';
  }

  // Carrega os projetos ao iniciar a página
  window.onload = function () {
    if (document.getElementById('projects-list')) loadProjects();
    if (document.getElementById('interested-list')) loadInterestedFreelancers();
    if (document.getElementById('project-name')) loadProjectDetails();
  };