import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {AnimeHomeComponent} from "./components/anime-home/anime-home.component";
import {AnimeDetailComponent} from "./components/anime-detail/anime-detail.component";
import {ProfileComponent} from "./components/profile/profile.component";
import {LoginComponent} from "./components/login/login.component";
import {SigninComponent} from "./components/signin/signin.component";
import {MyListComponent} from "./components/my-list/my-list.component";
import {AboutComponent} from "./components/about/about.component";
import {UpdateAnimeComponent} from "./components/update-anime/update-anime.component";
import {DeleteAnimeComponent} from "./components/delete-anime/delete-anime.component";
import {AnimeManageComponent} from "./components/anime-manage/anime-manage.component";
import {AccountsComponent} from "./components/accounts/accounts.component";
import { CreateAnimeComponent } from './components/create-anime/create-anime.component';
import {CreateAccComponent} from "./components/create-acc/create-acc.component";
import {UpdateAccComponent} from "./components/update-acc/update-acc.component";
import {authGuard} from "./guards/auth.guard";
import {nonAuthGuard} from "./guards/non-auth.guard";
import {adminGuard} from "./guards/admin.guard";
import {blockAdminGuard} from "./guards/blockAdmin.guard";
import {onlyAdminGuard} from "./guards/only-admin.guard";

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'animeHome', component: AnimeHomeComponent},
  {path: 'animeDetail/:animeId', component: AnimeDetailComponent},
  {path: 'login', component: LoginComponent, canActivate: [authGuard]},
  {path: 'signin', component: SigninComponent, canActivate: [authGuard]},
  {path: 'profile', component: ProfileComponent, canActivate: [nonAuthGuard]},
  {path: 'myList', component: MyListComponent, canActivate: [nonAuthGuard, adminGuard]},
  {path: 'about', component: AboutComponent, canActivate: [blockAdminGuard]},
  {path: 'animeManage', component: AnimeManageComponent, canActivate: [onlyAdminGuard],
  children: [
    {path: 'createAnime', component: CreateAnimeComponent},
    {path: 'updateAnime', component: UpdateAnimeComponent},
    {path: 'deleteAnime', component: DeleteAnimeComponent},
  ]},
  {path: 'accounts', component: AccountsComponent, canActivate: [onlyAdminGuard],
  children: [
    {path: 'createAcc', component: CreateAccComponent},
    {path: 'updateAcc/:accId', component: UpdateAccComponent},
  ]},
  {path: '**', redirectTo: 'home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
