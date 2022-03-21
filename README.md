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
- [x] Deve ser possível cadastrar uma especificação para um carro.
- [x] Deve ser possível listar todas as especificações.

**Regra de negócio**
- [x] Não deve ser possível cadastrar uma especificação para um carro não cadastrado.
- [x] Não deve ser possível cadastrar uma especificação já existente para um mesmo carro.
- [x] O usuário responsável pelo cadastro deve ser um administrador.

# Cadastro de imagens do carro

**Requisitos Funcionais**
- [x] Deve ser possível cadastrar a imagem do carro.

**Requisitos Não Funcionais**
- [x] Utilizar o multer para upload dos arquivos

**Regra de negócio**
- [x] Usuário deve poder cadastrar mais de uma imagem para o mesmo carro.
- [x] O usuário responsável pelo cadastro deve ser um administrador.

# Aluguel de carro

**Requisitos Funcionais**
- [x] Deve ser possível cadastrar um aluguel

**Regra de negócio**
- [x] O aluguel deve ter duração mínima de 24 horas.
- [x] Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo usuário.
- [x] Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo carro.
- [x] O usuário deve estar logado na aplicação.
- [x] Ao realizar um aluguel, o status do carro deverá ser atualizado para indisponível

# Devolução do carro

**Requisitos Funcionais**

- [x] Deve ser possível realizar a devolução de um carro

**Regra de Negócio**

- [x] Se o carro for devolvido em menos de 24h deverá ser cobrado uma diária completa.
- [x] Ao realizar a devolução, o carro deverá ser liberado para outro aluguel.
- [x] Ao realizar a devolução, o usuário deverá ser liberado para outro aluguel.
- [x] Ao realizar a devolução, deverá ser calculado o total do aluguel.
- [x] Caso o horário da devolução seja superior ao horário previsto de entrega, deverá ser cobrado multa proporcional aos dias de atraso.
- [x] Caso haja multa, deverá ser somado ao total.
- [x] O usuário deve estar logado na aplicação.

# Listagem de aluguéis para usuário

**Requisitos Funcionais**

- [x] Deve ser possível realizar a busca de todos os aluguéis para um usuário

**Regra de Negócio**

- [x] O usuário deve estar logado na aplicação.

# Recuperar senha

**Requisitos Funcionais**

- [x] Deve ser possível o usuário recuperar a senha usando o e-mail
- [x] O usuário deve receber um e-mail com o passo a passo para a recuperação de senha
- [x] O usuário deve conseguir inserir uma nova senha

**Regra de Negócio**

- [x] O usuário precisa inserir uma nova senha
- [x] O link enviado para recuperação deve expirar em 3h