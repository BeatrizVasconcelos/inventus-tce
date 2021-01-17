import { NgModule } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';

import { ListarConjuntosComponent } from './conjuntos/listar-conjuntos/listar-conjuntos.component';
import { CriarConjuntosComponent } from './conjuntos/criar-conjuntos/criar-conjuntos.component';
import { LoginComponent } from './auth/login/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';

const routes: Routes = [
  { path: '', component: ListarConjuntosComponent },
  { path: 'criar', component: CriarConjuntosComponent },
  { path: 'editar/:conjuntoId', component: CriarConjuntosComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}
