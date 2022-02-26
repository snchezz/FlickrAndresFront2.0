import { Component, OnInit } from '@angular/core';
import { ImagenService } from '../imagen.service';
import { Imagenes } from '../imagenes/imagenes.module';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})

export class ListaComponent implements OnInit {

  tutoriales?: Imagenes[];
  tutorialActual: Imagenes = {};
  indiceActual = -1;
  titulo = '';

  constructor(private imagenService: ImagenService) { }

  ngOnInit(): void {
    this.recuperarTutoriales();
  }
  recuperarTutoriales(): void {
    this.imagenService.getTodosTutoriales()
      .subscribe({
        next: (data) => {
          this.tutoriales = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }

  refrescarLista(): void {
    this.recuperarTutoriales();
    this.tutorialActual = {};
    this.indiceActual = -1;
  }

  setTutorialActivo(tutorial: Imagenes, indice: number): void {
    this.tutorialActual = tutorial;
    this.indiceActual = indice;
  }

  eliminarTodosTutoriales(): void {
    this.imagenService.eliminarTodosImagenes()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.refrescarLista();
        },
        error: (e) => console.error(e)
      });
  }

  buscarTitulo(): void {
    this.tutorialActual = {};
    this.indiceActual = -1;

    this.imagenService.findByTitulo(this.titulo)
      .subscribe({
        next: (data) => {
          this.tutoriales = data;
          console.log(data);
        },
        error: (e) => console.error(e)
      });
  }
}

