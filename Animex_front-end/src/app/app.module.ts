import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NavBarComponent} from './components/nav-bar/nav-bar.component';
import {HomeComponent} from './components/home/home.component';
import {AnimeHomeComponent} from './components/anime-home/anime-home.component';
import {HttpClientModule} from "@angular/common/http";
import {NgOptimizedImage} from "@angular/common";
import { FooterComponent } from './components/footer/footer.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { AnimeDetailComponent } from './components/anime-detail/anime-detail.component';
import { LoginComponent } from './components/login/login.component';
import { SigninComponent } from './components/signin/signin.component';
import { ProfileComponent } from './components/profile/profile.component';
import { MyListComponent } from './components/my-list/my-list.component';
import { AboutComponent } from './components/about/about.component';
import { UpdateAnimeComponent } from './components/update-anime/update-anime.component';
import { DeleteAnimeComponent } from './components/delete-anime/delete-anime.component';
import { AnimeManageComponent } from './components/anime-manage/anime-manage.component';
import { AccountsComponent } from './components/accounts/accounts.component';
import { CreateAnimeComponent } from './components/create-anime/create-anime.component';
import { CreateAccComponent } from './components/create-acc/create-acc.component';
import { UpdateAccComponent } from './components/update-acc/update-acc.component';



@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HomeComponent,
    AnimeHomeComponent,
    FooterComponent,
    AnimeDetailComponent,
    LoginComponent,
    SigninComponent,
    ProfileComponent,
    MyListComponent,
    AboutComponent,
    UpdateAnimeComponent,
    DeleteAnimeComponent,
    AnimeManageComponent,
    AccountsComponent,
    CreateAnimeComponent,
    CreateAccComponent,
    UpdateAccComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgOptimizedImage,
    FormsModule,
    ReactiveFormsModule,
    SweetAlert2Module.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
