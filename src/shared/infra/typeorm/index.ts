import { Connection, createConnection, getConnectionOptions } from "typeorm";

interface IOptions {
  host: string;
}

getConnectionOptions().then(options => {

  const newOptions = options as IOptions;
  newOptions.host = 'database_acar';
  
  //Essa opção deverá ser EXATAMENTE o nome dado ao service do banco de dados
  createConnection({
    ...options,
  });
});

export default async(host = 'database_acar'): Promise<Connection> => {
  
  const defaultOptions = await getConnectionOptions();

  console.log('defaultOptions', defaultOptions)

  console.log('assign', Object.assign(defaultOptions, {
    host
 }))
  
  return createConnection(
    Object.assign(defaultOptions, {
       host
    })
  )
}