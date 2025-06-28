INTRODUÇÃO : O código visa programar um sistema para uma escola, de forma que um administrador possa cadastrar alunos e professores.
O software permite que os alunos vejam suas informações, enquanto os professores observam, juntamente também aos seus dados, a relação de turmas e alunos.

============================================================================================


OBS : O sistema viabiliza a troca de senha do usuário e verifica o estado de autorização do login do usuário antes de acessar uma rota específica.

============================================================================================

ARQUITETURA : O sistema é desenvolvido seguindo os parâmetros convencionais da arquitetura MVC (model-view-controller), em que o model corresponde ao 
modelo que será implementado no banco de dados; a view corresponde às telas em que o usuário irá acessa; e os controllers correspondem às integrações entre
views e models, de maneira a processar requisições e enviar respostas.

============================================================================================

DEPENDÊNCIAS NECESSÁRIAS : A fim de conseguir executar o sistema corretamente, deve-se importar os pacotes :
  -Express;
  -Mustache-express;
  -Express-session;
  -Sequelize;
  -Sqlite3

============================================================================================

BANCO DE DADOS : O sistema utiliza o software de banco de dados relacional SQLite3, haja vista a facilidade de implementação e baixa necessidade de um banco 
robusto.

============================================================================================

COMO UTILIZAR : Primeiramente utilize o acesso 'admin@email.com.br' com a senha 'admin' para realizar o primeiro login. Após isso, navegue pela página do 
administrador para inserir ou excluir contas de professores ou alunos. Por fim, logue com uma das contas listadas - de professor ou aluno - para acessar a 
respectiva página.

============================================================================================

INTEGRANTES DO GRUPO : 
  -Thiago Castro Gonçalves
  -Gustavo Nunes Silva
  -Renan Augusto Barbosa Inácio da Silva
  -Moises Marcellino Xavier Santos De Paula

============================================================================================

INSTITUIÇÃO : Universidade Católica de Brasília (UCB)
