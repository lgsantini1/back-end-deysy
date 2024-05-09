const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'luis@123',
  port: 5432,
});

function getTodosUsuarios(){
  return pool.query('SELECT * FROM usuarios')
    .then(res => res.rows)
    .catch(err => console.error(err));
}

function getUsuarioPorId(id){
  return pool.query(`SELECT * FROM usuarios WHERE idusuario = $1`, [id])
    .then(res => res.rows[0])
    .catch(err => console.error(err));
}

function getUsuarioPorTelefone(telefone){
  const telefoneLimpo = telefone.replace(/[^0-9]/g, '');
  console.log(telefoneLimpo);

  return pool.query(`SELECT * FROM usuarios WHERE telefone = $1`, [telefoneLimpo])
    .then(res => res.rows[0])
    .catch(err => console.error(err));
}

function insereUsuario(usuarioNovo){
  const {
    nomeusuario,
    Telefone,
    Email,
    Cpf,
    Senha,
    TipoUsuario,
    InformacoesContato,
    CEP,
    Endereco,
    Cidade,
    Estado,
    DataDeNascimento
  } = usuarioNovo;

  return pool.query(`
    INSERT INTO usuarios (
      nomeusuario,
      telefone,
      email,
      cpf,
      senha,
      tipousuario,
      informacoescontato,
      cep,
      endereco,
      cidade,
      estado,
      datadenascimento
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *
  `, [
    nomeusuario,
    Telefone,
    Email,
    Cpf,
    Senha,
    TipoUsuario,
    InformacoesContato,
    CEP,
    Endereco,
    Cidade,
    Estado,
    DataDeNascimento
  ])
  .then(res => res.rows[0])
  .catch(err => console.error(err));
}
function modificaUsuario(modificacoes, id){
  const { nome, telefone, email, cpf, senha, tipoUsuario, informacoesContato, cep, endereco, cidade, estado, dataDeNascimento } = modificacoes;
  return pool.query(`UPDATE usuarios SET nomeusuario = $1, telefone = $2, email = $3, cpf = $4, senha = $5, tipousuario = $6, informacoescontato = $7, cep = $8, endereco = $9, cidade = $10, estado = $11, datadenascimento = $12 WHERE idusuario = $13 RETURNING *`, [nome, telefone, email, cpf, senha, tipoUsuario, informacoesContato, cep, endereco, cidade, estado, dataDeNascimento, id])
    .then(res => res.rows[0])
    .catch(err => console.error(err));
}

function excluirUsuario(id){
  return pool.query(`DELETE FROM usuarios WHERE idusuario = $1`, [id])
    .then(res => res.rowCount)
    .catch(err => console.error(err));
}

module.exports = {
  getTodosUsuarios,
  getUsuarioPorId,
  getUsuarioPorTelefone,
  insereUsuario,
  modificaUsuario,
  excluirUsuario
};

