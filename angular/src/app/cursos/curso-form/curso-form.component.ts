import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { CursosService } from '../services/cursos.service';
import { Curso } from './../model/curso';

@Component({
  selector: 'app-curso-form',
  templateUrl: './curso-form.component.html',
  styleUrls: ['./curso-form.component.scss']
})
export class CursoFormComponent implements OnInit {

  form: FormGroup;
  passedCurso: Curso;

  constructor(
    private formBuilder: FormBuilder,
    private cursosService: CursosService,
    private snackBar: MatSnackBar,
    private location: Location){
    this.form = this.formBuilder.group({
      name: [null],
      category: [null]
    });
    this.passedCurso = history.state.data as Curso;
    if(this.passedCurso){
      this.form.patchValue({
        name: this.passedCurso.name,
        category: this.passedCurso.category
      });
    }
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if(!this.passedCurso){
      this.cursosService.save(this.form.value).subscribe({
        complete: () => { this.onSuccess(); },
        error: () => { this.onError(); }
      });
    }
    else {
      this.passedCurso.name = this.form.value['name'];
      this.passedCurso.category = this.form.value['category'];

      this.cursosService.update(this.passedCurso).subscribe({
        complete: () => { this.onSuccess(); },
        error: () => { this.onError(); }
      });
    }
  }

  onCancel() {
    this.location.back();
  }

  private onSuccess(){
    this.snackBar.open('Curso salvo com sucesso.', '', {duration: 4000})
    this.onCancel();
  }

  private onError(){
    this.snackBar.open('Erro ao salvar curso.', '', {duration: 2000})
  }
}
