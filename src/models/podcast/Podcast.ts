import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Professor } from "../usuarios/professor/Professor";
import { Episodio } from "../episodio/Episodio";
import { Usuario } from "../usuarios/Usuario";

@Entity("podcasts")
export class Podcast {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  titulo!: string;

  @Column()
  image_path!: string;

  @Column()
  descricao!: string;

  @OneToOne(() => Professor, (professor) => professor.podcasts_criados)
  autor!: Professor;

  @ManyToMany(() => Professor)
  @JoinTable({
    name: "podcast_coautores",
    joinColumn: {
      name: "podcast_id",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "professor_id",
      referencedColumnName: "id",
    },
  })
  coautores!: Professor[];

  @ManyToMany(() => Usuario)
  @JoinTable({
    name: "podcast_monitores",
    joinColumn: {
      name: "podcast_id",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "usuario_id",
      referencedColumnName: "id",
    },
  })
  monitores!: Usuario[];

  @OneToMany(() => Episodio, (episodio) => episodio.podcast)
  episodios!: Episodio[];

  @OneToMany(() => Episodio, (episodio) => episodio.podcast)
  @Column({ default: 0 })
  numero_de_episodios!: number;

  @Column({ default: 0 })
  reproducoes!: number;

  @Column("text", { array: true })
  tags!: string[];
}
