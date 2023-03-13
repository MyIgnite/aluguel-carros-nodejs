import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { Category } from "./Category";

/** NOTE Typeorm
 * Fornece uma coleção para a entidade
 */

@Entity("cars")
class Car {

  @PrimaryColumn()
  id: string;
  
  @Column()
  name: string;
  
  @Column()
  description: string;
  
  @Column()
  daily_rate: number;
  
  @Column()
  license_plate: string;
  
  @Column()
  fine_amount: number;
  
  @Column()
  brand: string;

  /**
   * @JoinColumn({ name: "category_id"}) especifica que a coluna "category_id"
   * na tabela atual é a chave estrangeira que referencia a tabela "Category".
   * 
   * @ManyToOne(() => Category) especifica que a entidade atual tem uma relação 
   * muitos-para-um com a entidade "Category".
   */

  @ManyToOne(() => Category)
  @JoinColumn({ name: "category_id"})
  category: Category;
  
  @Column()
  category_id: string;

  @Column()
  available: boolean;
  
  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if(!this.id) {
      this.id = uuidv4();
      this.available = true;
    }
  }
}

export { Car };
