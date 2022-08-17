import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, Observable, of } from 'rxjs';

import { Curso } from '../model/curso';
import { CursosService } from '../services/cursos.service';
import { ErrorDialogComponent } from './../../shared/components/error-dialog/error-dialog.component';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.scss']
})
export class CursosComponent implements OnInit {

  cursos$: Observable<Curso[]>;
  displayedColumns = ['name', 'category', 'actions']; //não precisa de tipagem, ts entende que é lista de string

  //cursosService: CursosService;

  constructor(
    private cursosService: CursosService,
    public dialog: MatDialog,
    private router: Router,
    private actvRoute: ActivatedRoute,
    private snackBar: MatSnackBar
    ) {
    this.cursos$ = this.listarCursos();
    //this.cursosService = new CursosService();
    //this.cursosService.listaCursos().subscribe(cursos => this.cursos = cursos);
  }

  listarCursos(){
    return this.cursosService.listaCursos()
    .pipe(catchError(error => {
      this.onError('Erro ao carregar cursos.');
      return of([]);
    }));
  }

  ngOnInit(): void {
  }

  onError(errorMsg:string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg
    })
  }

  onAdd() {
    // this.router.navigate(['cursos/new']);
    this.router.navigate(['new'], {relativeTo: this.actvRoute});
  }

  onEdit(curso:Curso) {
    this.router.navigate(['edit'], {relativeTo: this.actvRoute, state:{data: curso}});
  }

  onDelete(curso:Curso) {
    this.cursosService.delete(curso).subscribe({
      complete: () => {
        this.snackBar.open('Curso removido com sucesso.', '', {duration: 4000})
        this.cursos$ = this.listarCursos();
      },
      error: () => {
        this.onError('Erro de conexão com a internet.');
      }
    });
  }
}
