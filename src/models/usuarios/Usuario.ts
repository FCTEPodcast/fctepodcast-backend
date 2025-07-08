import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  TableInheritance,
  UpdateDateColumn,
} from "typeorm";
import type { Episodio } from "../episodio/Episodio";

@Entity("usuarios")
@TableInheritance({ column: { type: "varchar", name: "role" } })
export class Usuario {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nome!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  senha!: string;

  @Column()
  role!: "ALUNO" | "PROFESSOR";

  @Column({ default: true })
  ativo!: boolean;

  @OneToMany(
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    () => require("../episodio/Episodio").Episodio,
    (episodio: Episodio) => episodio.curtidas
  )
  episodios_curtidos!: Episodio[];

  @Column({ default: "" })
  profile_picture!: string;

  @Column({ default: "" })
  cover_picture!: string;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}
