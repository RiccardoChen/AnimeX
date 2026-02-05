import {Component, OnInit} from '@angular/core';
import {AnimeRequestService} from "../../services/anime/anime-request.service";
import {IAnime} from "../../interfaces/IAnime";
import {ActivatedRoute, Params} from "@angular/router";
import {IPage} from "../../interfaces/IPage";



@Component({
  selector: 'app-anime-home',
  templateUrl: './anime-home.component.html',
  styleUrls: ['./anime-home.component.css']
})
export class AnimeHomeComponent implements OnInit {

  isLoading: boolean = false;

  animes: IAnime[] = [];
  visiblePages: number[] = [];

  animeNameList: string[] = [];

  searchName: string = "";
  searchCategory: string = "";
  searchYear: number = 0;

  paging: number = 0;
  isFirstPage: boolean = false;
  isLastPage: boolean = false;
  totPages: number = 0;

  categories: string[] = [
    '', 'Adventure', 'Drama', 'Action', 'Fantasy', 'Romance',
    'Isekai', 'Sports', 'Mecha', 'Supernatural',
    'Historical', 'Comedy', 'Slice of Life', 'Mystery'
  ];

  years: number[] = [
    1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007,
    2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016,
    2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025
  ];

  constructor(private httpAnime: AnimeRequestService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {

    const saved: string | null = localStorage.getItem('animeState');
    if (saved) {
      const {paging, name, category, year} = JSON.parse(saved);
      this.paging = paging;
      this.searchName = name;
      this.searchCategory = category;
      this.searchYear = year;
      localStorage.removeItem('animeState');
    }

    this.route.queryParams.subscribe((params: Params) => {
      const queryCategory = params['category'];
      if (queryCategory) {
        this.searchCategory = queryCategory;
      }

      this.loadAllAnimes(this.searchName, this.searchCategory, this.searchYear, this.paging);

    });
  }


  loadAllAnimes(searchName: string = "", searchCategory: string = "", searchYear: number, page: number = 0) {

    const params = {
      name: searchName,
      category: searchCategory,
      year: searchYear,
      page: page,
    }

    this.isLoading = true;

    this.httpAnime.getAllAnime(params).subscribe({
      next: (response: IPage<IAnime>) => {
        console.log(response);
        this.animes = response.content;
        this.totPages = response.totPages;
        this.isFirstPage = response.firstPage;
        this.isLastPage = response.lastPage;
        this.updateVisiblePages();
      },
      error: error => {
        console.log(error);
      },
      complete: () => {
        this.isLoading = false;
      }
    })
  }
  onSearch() {
    this.paging = 0;
    this.loadAllAnimes(this.searchName, this.searchCategory,this.searchYear, this.paging);
  }

  onSearchCategory(category: string) {
    this.searchCategory = category;
    this.paging = 0;
    this.searchName = "";
    this.loadAllAnimes(this.searchName, this.searchCategory,this.searchYear, this.paging);
  }

  private updateVisiblePages() {
    if (!this.totPages || this.totPages < 1) {
      this.visiblePages = [];
      return;
    }
    const start: number = Math.max(0, this.paging - 2);
    const end: number = Math.min(this.totPages - 1, this.paging + 2);
    this.visiblePages = [];
    for (let i = start; i <= end; i++) {
      this.visiblePages.push(i);
    }
  }

  onClickPage(page: number) {
    this.paging = page;
    this.loadAllAnimes(this.searchName, this.searchCategory,this.searchYear, page);
    window.scrollTo({top: 0, behavior: "instant",});
  }

  onClickPrev() {
    if (!this.isFirstPage && this.paging > 0) {
      this.paging--;
      this.loadAllAnimes(this.searchName, this.searchCategory, this.searchYear, this.paging);
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  }
  onClickNext() {
    if (!this.isLastPage) {
      this.paging++;
      this.loadAllAnimes(this.searchName, this.searchCategory, this.searchYear, this.paging);
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  }

  backtoFirstPage() {
    this.paging = 0;
    this.loadAllAnimes(this.searchName, this.searchCategory, this.searchYear, this.paging);
    window.scrollTo({ top: 0, behavior: "instant" });
  }

  gotoLastPage() {
    if (this.totPages && this.totPages > 0) {
      this.paging = this.totPages - 1;
      this.loadAllAnimes(this.searchName, this.searchCategory, this.searchYear, this.paging);
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  }

  showLeftEllipsis(): boolean {
    return this.visiblePages.length > 0 && this.visiblePages[0] > 0;
  }

  showRightEllipsis(): boolean {
    return this.visiblePages.length > 0 && this.totPages != null &&
      this.visiblePages[this.visiblePages.length - 1] < this.totPages - 1;
  }

  suggestsAnimeName(){
    this.animeNameList = [];
    this.httpAnime.getNames(this.searchName).subscribe({
      next: animeList => {
        this.animeNameList = animeList;
      },
      error: err => {
        console.log(err);
      }
    })
  }
  onSelectAnime(animeName: string){
    this.searchName = animeName;
    this.onSearch();
    this.animeNameList = [];
  }


}
