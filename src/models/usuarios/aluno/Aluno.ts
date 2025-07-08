import { ChildEntity, JoinTable, ManyToMany } from "typeorm";
import { Usuario } from "../Usuario";
import { Podcast } from "../../podcast/Podcast";

@ChildEntity("ALUNO")
export class Aluno extends Usuario {
  @ManyToMany(() => Podcast)
  @JoinTable({
    name: "aluno_monitor_podcast",
    joinColumn: {
      name: "aluno_id",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "podcast_id",
      referencedColumnName: "id",
    },
  })
  monitor_podcasts!: Podcast[];
}
