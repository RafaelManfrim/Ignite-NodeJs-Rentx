# Cadastro de Categoria

**Requisitos Funcionais**
- [x] Deve ser possível cadastrar uma nova categoria.
- [x] Deve ser possível importar categorias de um arquivo csv.

**Regra de negócio**
- [x] Não deve ser possível cadastrar uma categoria com mesmo nome.

# Cadastro de Especificação

**Requisitos Funcionais**
- [x] Deve ser possível cadastrar uma nova especificação

**Regra de negócio**
- [x] Não deve ser possível cadastrar uma especificação com mesmo nome.

# Cadastro de Usuário

**Requisitos Funcionais**
- [x] Deve ser possível cadastrar um novo usuário.

**Regra de negócio**
- [x] Não deve ser possível cadastrar um usuário com mesmo email.

# Cadastro de carro

**Requisitos Funcionais**
- [x] Deve ser possível cadastrar um novo carro.

**Regra de negócio**
- [x] Não deve ser possível cadastrar um carro com uma placa já cadastrada.
- [x] O carro deve ser cadastrado com disponibilidade por padrão.
- [x] O usuário responsável pelo cadastro deve ser administrador.

# Listagem de carros

**Requisitos Funcionais**
- [x] Deve ser possível listar todos os carros disponíveis.
- [x] Deve ser possível listar todos os carros disponíveis pela categoria.
- [x] Deve ser possível listar todos os carros disponíveis pela marca.
- [x] Deve ser possível listar todos os carros disponíveis pelo nome do carro.

**Regra de negócio**
- [x] O usuário não precisa estar logado no sistema.

# Cadastro de especificação no carro

**Requisitos Funcionais**
- [ ] Deve ser possível cadastrar uma especificação para um carro.
- [x] Deve ser possível listar todas as especificações.
- [ ] Deve ser possível listar todos os carros.

**Regra de negócio**
- [ ] Não deve ser possível cadastrar uma especificação para um carro não cadastrado.
- [ ] Não deve ser possível cadastrar uma especificação já existente para um mesmo carro.
- [ ] O usuário responsável pelo cadastro deve ser um administrador.

# Cadastro de imagens do carro

**Requisitos Funcionais**
- [ ] Deve ser possível cadastrar a imagem do carro.
- [ ] Deve ser possível listar todas os carros.

**Requisitos Não Funcionais**
- [ ] Utilizar o multer para upload dos arquivos

**Regra de negócio**
- [ ] Usuário deve poder cadastrar mais de uma imagem para o mesmo carro.
- [ ] O usuário responsável pelo cadastro deve ser um administrador.

# Aluguel de carro

**Requisitos Funcionais**
- [ ] Deve ser possível cadastrar um aluguel

**Regra de negócio**
- [ ] O aluguel deve ter duração mínima de 24 horas.
- [ ] Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo usuário.
- [ ] Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo carro.