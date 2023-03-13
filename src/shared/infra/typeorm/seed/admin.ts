// 1 - Criar conexão com banco
import { User } from "@modules/accounts/infra/typeorm/entities/User";
import { hash } from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
import createConnection from "../index";

async function create() {
  const id = uuidv4();
  const connection = await createConnection('localhost');
  const password = await hash("admin", 8);

  const user = await connection.getRepository(User)
    .createQueryBuilder("users")
    .where("users.email = :email", { email: 'admin@email.com' })
    .getOne()

  if(!user) {
    const values = {
      id,
      name: 'admin', 
      email: 'admin@email.com',
      password, 
      is_admin: true,
      driver_license: 'XYZ-0000',
      created_at: () => 'now()'
    }
    
    await connection.createQueryBuilder()
      .insert()
      .into('users')
      .values(values)
      .execute()
      
  }

  await connection.close();
}

create()
  .then(() => console.log("User admin created!"))
  .catch((err) => console.log("err", err))
