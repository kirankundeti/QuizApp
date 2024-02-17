import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StartquizComponent } from './startquiz/startquiz.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { QuestionsComponent } from './questions/questions.component';



const routes: Routes = [
  { path: 'domain/electricalmachines', component: StartquizComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '',   redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'domain/electricalmachines/quiz', component: QuestionsComponent },
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
