import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";

/** NOTE Typeorm
 * Fornece uma coleção para a entidade
 */

@Entity("users")
class User {

  @PrimaryColumn()
  id?: string;
  
  @Column()
  name: string;
  
  @Column()
  email: string;
  
  @Column()
  password: string;
  
  @Column()
  driver_license: string;

  @Column()
  is_admin?: boolean;

  @Column()
  avatar: string;
  
  @CreateDateColumn()
  created_at: Date;


  constructor() {
    if(!this.id) {
      this.id = uuidV4();
    }

    if(!this.is_admin) {
      this.is_admin = false; 
    }
  }
}

export { User };
