# criando-api-com-nodejs
Aula: API luguel de carros. O desenvolvimento envolve conceito S.O.L.D, Singleton Pattern, Upload, Swagger e documentação.

O projeto possui comentários, com o objetivo de fixar o conhecimento em algo experimental.

# Requisitos

**RF - Requisitos funcionais**
São os recursos e funcionalidades específicas que um sistema deve ter para atender às necessidades dos usuários.

**RNF - Requisitos não funcionais**
São as características que um sistema deve ter para garantir que ele seja eficiente, confiável, seguro e fácil de usar.

**RN - Regra de negócio**
São as normas e procedimentos que governam a forma como a empresa funciona e que devem ser incorporados no sistema.

## Cadastro de carro

**RF**

- Deve ser possível cadastrar um novo carro.
- Deve ser possível listar todas as categorias.

**RN**

- Não dever possível cadastrar um carro com a placa já existente.
- Não deve ser possível alterar a placa de um carro já cadastrado.
- O carro deve ser cadastrado, por padrão, com diponibilidade.
- O usuário deve ter perfil administrador para incluir um novo cadastro.

## Listagem de carros

**RF**

- Deve ser posssível listar os carros disponíveis.
- Deve ser posssível listar todos os carros disponíveis pelo nome do carro.
- Deve ser posssível listar todos os carros disponíveis pelo nome da categoria.

**RN**

- O usuário não precisa estar logado no sistema.

## Cadastro de especificaçao no carro

**RF**

- Deve ser possível cadastrar uma especificação para um carro.
- Deve ser possível listar todas as especificações.
- Deve ser possível listar todos os carros.

**RN**

- O usuário deve ter perfil administrador para incluir um novo cadastro.
- Não deve ser possível cadastrar uma especificação para um carro não cadastrado.
- Não deve ser possível cadastrar uma especificação já existente para o mesmo carro.

## Cadastro de imagens do carro

**RF**

- Deve ser possível cadastrar a imagem do carro.
- Deve ser possível listar todos os carros.

**RNF**

- Utilizar o multer para upload dos arquivos.

**RN**

- O usuário deve ter perfil administrador para incluir um novo cadastro.
- O usuário deve poder cadastrar mais de uma imagem para o mesmo carro.

## Aluguel de carro

**RF**

- Deve ser possível cadastrar um aluguel.

**RN**

- O aluguel deve ter duração minima de 24 horas.
- Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo usuário.
- Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo carro.