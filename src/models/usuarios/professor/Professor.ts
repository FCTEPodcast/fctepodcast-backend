import { ChildEntity, OneToMany } from "typeorm";
import { Podcast } from "../../podcast/Podcast";
import { Usuario } from "../Usuario";

@ChildEntity("PROFESSOR")
export class Professor extends Usuario {
  @OneToMany(() => Podcast, (podcast) => podcast.autor)
  podcasts_criados!: Podcast[];
}
