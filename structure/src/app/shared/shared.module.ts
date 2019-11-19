import {ModuleWithProviders, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from './components/spinner/spinner.component';
import {NgxSpinnerModule} from 'ngx-spinner';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [SpinnerComponent],
  imports: [
    CommonModule,
    NgxSpinnerModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    NgxSpinnerModule,
    SpinnerComponent,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule
    };
  }
}
