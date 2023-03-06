A camada em questão contém código que pode ser compartilhado em diferentes partes do projeto, tais como módulos, classes, funções e outros arquivos.
Ao ter um local centralizado para compartilhar código, a pasta "shared" pode ajudar a tornar o código mais organizado e fácil de manter.

## Sub-camadas:
<hr>


**container:** Armazenar configurações e módulos de injeção de dependência (DI) que podem ser compartilhados entre diferentes partes do aplicativo. A injeção de dependência é um padrão de projeto que permite separar o código em módulos independentes, onde cada módulo é responsável por resolver suas próprias dependências.
<hr>

**errors:** Armazenar arquivos relacionados a tratamento de erros, como classes de erro personalizadas e funções de tratamento de erros.
<hr/>

**infra:** "Em um projeto, a pasta 'infra' tem a função de agrupar recursos e componentes externos que oferecem suporte a outros módulos. Essa camada permite isolar tudo o que não faz parte da regra de negócio (camada externa), facilitando a organização do projeto.

**infra/http:** Atualmente, todos os componentes que são conectados ao Express são incorporados à camada HTTP. No entanto, se em algum momento for necessário mudar para outro framework, é possível simplesmente criar uma nova referência dentro da pasta e implementá-la.

**infra/typeorm:** As migrations estão atualmente ligadas ao TypeORM e são compartilhadas em diferentes partes do aplicativo. A pasta em questão é o local apropriado para esse tipo de recurso.
<hr>
