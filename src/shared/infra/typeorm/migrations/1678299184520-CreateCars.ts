import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateCars1678299184520 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "cars",
                columns: [
                    {
                        name:  "id",
                        type: "uuid",
                        isPrimary: true
                    },
                    {
                        name:  "name",
                        type: "varchar"
                    },
                    {
                        name:  "description",
                        type: "varchar"
                    },
                    {
                        name:  "daily_rate",
                        type: "numeric"
                    },
                    {
                        name:  "available",
                        type: "boolean",
                        default: true
                    },
                    {
                        name:  "license_plate",
                        type: "varchar"
                    },
                    {
                        name:  "fine_amount",
                        type: "numeric"
                    },
                    {
                        name:  "brand",
                        type: "varchar"
                    },
                    {
                        name:  "category_id",
                        type: "uuid",
                        isNullable: true,
                    },
                    {
                        name:  "created_at",
                        type: "timestamp",
                        default: "now()",
                    }
                ],
                foreignKeys: [
                    {
                        name: "FKCategoryCar",
                        referencedTableName: "categories",
                        referencedColumnNames: ["id"],
                        columnNames: ["category_id"],
                        onDelete: "SET NULL",
                        onUpdate: "SET NULL",
                    }
                ]
            })
        );
    }

    /**
     * foreignKeys:
     *  
     * name: Nome da chave estrangeira (FKCategoryCar).
     * referencedTableName: Nome da tabela referenciada ("categories").
     * referencedColumnNames: Nome da(s) coluna(s) na tabela referenciada que faz(em) parte da chave primária (["id"]).
     * columnNames: Nome da(s) coluna(s) na tabela atual que correspondem à(s) coluna(s) da tabela referenciada ([“category_id”]).
     * 
     * onDelete: Define a ação a ser tomada quando a linha correspondente na tabela referenciada for excluída. 
     * Neste caso, o valor é "SET_NULL", o que significa que o valor desta chave estrangeira nesta tabela será definido
     * como NULL quando a linha correspondente na tabela referenciada for excluída.
     * 
     * onUpdate: Define a ação a ser tomada quando uma ou mais colunas na linha correspondente na tabela referenciada 
     * forem atualizadas. Neste caso, o valor também é "SET_NULL", o que significa que o valor desta chave estrangeira 
     * nesta tabela será definido como NULL quando as colunas correspondentes na tabela referenciada forem atualizadas.
     */

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("cars");
    }

}
