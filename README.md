# Botanica FrontEnd

Bem-vindo ao repositório **Botanica FrontEnd**! 🌿

Este é o front-end do projeto **Botanica**, uma plataforma voltada para o gerenciamento e exibição de plantas. O sistema permite adicionar, editar, visualizar e excluir informações sobre espécies de plantas. Desenvolvido com **React**, **Vite**, e **Tailwind CSS**, o projeto visa proporcionar uma experiência moderna e responsiva para os usuários.

## Tecnologias Utilizadas

- **React** (Frontend)
- **Vite** (Ferramenta de build rápida)
- **Tailwind CSS** (Framework de estilização)
- **Axios** (Para comunicação com a API)
- **Font Awesome** (Ícones)
- **Poppins** (Fonte principal para a aplicação)
  
## Funcionalidades

- **Página de Home**: Exibição de plantas com informações detalhadas.
- **Modal de Adição de Plantas**: Permite adicionar novas espécies com informações e imagens.
- **Modal de Edição e Exclusão**: Permite editar ou excluir plantas existentes.
- **Responsive Design**: A interface é responsiva e adaptável a diferentes dispositivos.
- **Autenticação**: Futuramente integrará autenticação e autorização (em progresso).

## Instalação

Siga os passos abaixo para rodar o projeto localmente:

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/botanicad/Botanica-FrontEnd.git
   ```

2. **Instale as dependências:**
   No diretório do projeto, execute:
   ```bash
   npm install
   ```

3. **Execute o servidor de desenvolvimento:**
   Para rodar o projeto localmente, execute:
   ```bash
   npm run dev
   ```

4. Abra o navegador e acesse `http://localhost:3000`.

## Estrutura do Projeto

Aqui está uma visão geral da estrutura do diretório do projeto:

```plaintext
Botanica-FrontEnd/
│
├── public/                 # Arquivos públicos como ícones e imagens
├── src/
│   ├── assets/             # Imagens, ícones e outros recursos estáticos
│   ├── components/         # Componentes reutilizáveis da interface
│   ├── pages/              # Páginas principais (ex. Home, Detalhes da Planta)
│   ├── services/           # Funções de requisição API (Axios)
│   ├── styles/             # Arquivos de estilo, Tailwind CSS
│   ├── App.jsx             # Componente principal da aplicação
│   └── main.jsx            # Ponto de entrada
├── tailwind.config.js      # Configuração do Tailwind CSS
├── vite.config.js          # Configuração do Vite
├── package.json            # Dependências do projeto
└── README.md               # Este arquivo!
```

## Como Contribuir

1. **Faça um fork do repositório**.
2. **Clone o seu fork**:
   ```bash
   git clone https://github.com/SEU-USUARIO/Botanica-FrontEnd.git
   ```
3. Crie uma nova branch para suas modificações:
   ```bash
   git checkout -b nova-funcionalidade
   ```
4. Faça suas alterações e adicione os arquivos modificados:
   ```bash
   git add .
   ```
5. Faça o commit das suas alterações:
   ```bash
   git commit -m "Descrição das mudanças"
   ```
6. Envie para o seu fork:
   ```bash
   git push origin nova-funcionalidade
   ```
7. Abra um pull request no repositório original.

## Roadmap

- [ ] Integração com back-end para persistência de dados.
- [ ] Implementação de autenticação de usuário.
- [ ] Melhoria na responsividade e otimização de layout.
- [ ] Adição de testes automatizados.

## Licença

Este projeto é licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

Agradecemos por contribuir para o **Botanica**! 🌱
