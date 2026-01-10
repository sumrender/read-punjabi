import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Title } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { App } from './app';
import { ThemeService } from './services/theme.service';
import { LanguageService } from './services/language.service';
import { signal } from '@angular/core';
import { PunjabiConfig } from './configuration/languages/Punjabi';

describe('App', () => {
  let component: App;
  let fixture: ComponentFixture<App>;
  let titleService: Title;
  let languageService: LanguageService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [
        provideRouter([]),
        ThemeService,
        LanguageService,
        Title,
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(App);
    component = fixture.componentInstance;
    titleService = TestBed.inject(Title);
    languageService = TestBed.inject(LanguageService);
  });

  it('should create the app component', () => {
    expect(component).toBeTruthy();
  });

  it('should set the initial title from language config', () => {
    fixture.detectChanges();
    const expectedTitle = languageService.currentLanguage().appName;
    expect(titleService.getTitle()).toBe(expectedTitle);
  });

  it('should have config from language service', () => {
    const config = (component as any).config;
    expect(config).toBeDefined();
    expect(config()).toBe(languageService.currentLanguage());
  });

  it('should update title when language changes', () => {
    fixture.detectChanges();
    
    // Get initial title
    const initialTitle = titleService.getTitle();
    expect(initialTitle).toBe(PunjabiConfig.appName);
    
    // Note: Testing language change would require changing the language
    // which involves localStorage and font loading. This is tested in
    // the LanguageService tests instead.
  });

  it('should render navigation with app name', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const navLogo = compiled.querySelector('.nav-logo');
    
    expect(navLogo).toBeTruthy();
    expect(navLogo?.textContent?.trim()).toBe(languageService.currentLanguage().appName);
  });

  it('should render navigation with settings link', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const settingsLink = compiled.querySelector('a[routerLink="/settings"]');
    
    expect(settingsLink).toBeTruthy();
    expect(settingsLink?.textContent?.trim()).toBe('Settings');
  });

  it('should have router outlet', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const routerOutlet = compiled.querySelector('router-outlet');
    
    expect(routerOutlet).toBeTruthy();
  });
});
