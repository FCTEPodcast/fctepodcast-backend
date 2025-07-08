import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Usuario } from "../usuarios/Usuario";
import { Podcast } from "../podcast/Podcast";

@Entity("episodios")
export class Episodio {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  titulo!: string;

  @Column()
  descricao!: string;

  @Column()
  audio_path!: string;

  // comentarios

  @Column({ default: 0 })
  numero_de_comentarios!: number;

  @ManyToMany(() => Usuario)
  @JoinTable({
    name: "episodios_curtidos",
    joinColumn: {
      name: "episodio_id",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "usuario_id",
      referencedColumnName: "id",
    },
  })
  curtidas!: Usuario[];

  @Column({ default: 0 })
  reproducoes!: number;

  @Column({ default: 0 })
  duracao!: number; // em segundos

  @Column({ default: 0 })
  numero_de_curtidas!: number;

  @ManyToOne(() => Podcast, (podcast) => podcast.episodios)
  podcast!: Podcast;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}
