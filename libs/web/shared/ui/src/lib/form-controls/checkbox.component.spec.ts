import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ControlContainer, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { CheckboxComponent } from './checkbox.component';

describe('CheckboxComponent', () => {
  it('should create', () => {
    const { hostComponent } = setup();
    expect(hostComponent).toBeTruthy();
  });

  it('should render checkbox input', () => {
    const { checkboxDebugElement } = setup();
    const checkboxInput = checkboxDebugElement.query(By.css('[data-testing-id="checkbox-input"]'));
    expect(checkboxInput).toBeTruthy();
  });

  it('should project content', () => {
    const { checkboxDebugElement } = setup();
    const checkboxLabel = checkboxDebugElement.query(By.css('[data-testing-id="checkbox-label"]'));
    expect((checkboxLabel.nativeElement as HTMLElement).innerHTML).toBe('Test checkbox');
  });

  it('should render error message if form control is invalid and touched', () => {
    const { hostComponent, fixture, checkboxDebugElement } = setup();

    const formControl = new FormControl(null, Validators.required);
    formControl.markAsTouched();

    hostComponent.formControl = formControl;
    fixture.detectChanges();

    const checkboxErrorLabel = checkboxDebugElement.query(By.css('[data-testing-id="checkbox-error-label"]'));

    expect(checkboxErrorLabel).toBeTruthy();
  });

  it('should render error message if form control is invalid and dirty', () => {
    const { hostComponent, fixture, checkboxDebugElement } = setup();

    const formControl = new FormControl(null, Validators.required);
    formControl.markAsDirty();

    hostComponent.formControl = formControl;
    fixture.detectChanges();

    const checkboxErrorLabel = checkboxDebugElement.query(By.css('[data-testing-id="checkbox-error-label"]'));

    expect(checkboxErrorLabel).toBeTruthy();
  });

  it('should not render error message if form control is valid', () => {
    const { hostComponent, fixture, checkboxDebugElement } = setup();

    const formControl = new FormControl(true, Validators.required);

    hostComponent.formControl = formControl;
    hostComponent.formControl.markAsTouched();
    hostComponent.formControl.markAsDirty();
    fixture.detectChanges();

    const checkboxErrorLabel = checkboxDebugElement.query(By.css('[data-testing-id="checkbox-error-label"]'));

    expect(checkboxErrorLabel).toBeFalsy();
  });

  it('should not render error message if form control is untouched and pristine', () => {
    const { hostComponent, fixture, checkboxDebugElement } = setup();

    const formControl = new FormControl(null, Validators.required);

    hostComponent.formControl = formControl;
    fixture.detectChanges();

    const checkboxErrorLabel = checkboxDebugElement.query(By.css('[data-testing-id="checkbox-error-label"]'));

    expect(checkboxErrorLabel).toBeFalsy();
  });

  it('should apply error classes if form control is invalid and touched', () => {
    const { hostComponent, fixture, checkboxDebugElement } = setup();

    const formControl = new FormControl(null, Validators.required);
    formControl.markAsTouched();

    hostComponent.formControl = formControl;
    fixture.detectChanges();

    const checkboxInput: HTMLElement = checkboxDebugElement.query(
      By.css('[data-testing-id="checkbox-input"]'),
    ).nativeElement;
    const checkboxErrorLabel: HTMLElement = checkboxDebugElement.query(
      By.css('[data-testing-id="checkbox-error-label"]'),
    ).nativeElement;

    expect(checkboxInput.classList).toContain('checkbox-error');
    expect(checkboxErrorLabel.classList).toContain('text-error');
  });

  it('should apply error classes if form control is invalid and dirty', () => {
    const { hostComponent, fixture, checkboxDebugElement } = setup();

    const formControl = new FormControl(null, Validators.required);
    formControl.markAsDirty();

    hostComponent.formControl = formControl;
    fixture.detectChanges();

    const checkboxInput: HTMLElement = checkboxDebugElement.query(
      By.css('[data-testing-id="checkbox-input"]'),
    ).nativeElement;
    const checkboxErrorLabel: HTMLElement = checkboxDebugElement.query(
      By.css('[data-testing-id="checkbox-error-label"]'),
    ).nativeElement;

    expect(checkboxInput.classList).toContain('checkbox-error');
    expect(checkboxErrorLabel.classList).toContain('text-error');
  });

  it('should not apply error classes if form control is valid', () => {
    const { hostComponent, fixture, checkboxDebugElement } = setup();

    const formControl = new FormControl(true, Validators.required);
    formControl.markAsTouched();
    formControl.markAsDirty();

    hostComponent.formControl = formControl;
    fixture.detectChanges();

    const checkboxInput: HTMLElement = checkboxDebugElement.query(
      By.css('[data-testing-id="checkbox-input"]'),
    ).nativeElement;
    const checkboxErrorLabel = checkboxDebugElement.query(By.css('[data-testing-id="checkbox-error-label"]'));

    expect(checkboxInput.classList).not.toContain('checkbox-error');
    expect(checkboxErrorLabel).toBeFalsy();
  });

  it('should not apply error classes if form control is untouched and pristine', () => {
    const { hostComponent, fixture, checkboxDebugElement } = setup();

    const formControl = new FormControl(null, Validators.required);

    hostComponent.formControl = formControl;
    fixture.detectChanges();

    const checkboxInput: HTMLElement = checkboxDebugElement.query(
      By.css('[data-testing-id="checkbox-input"]'),
    ).nativeElement;
    const checkboxErrorLabel = checkboxDebugElement.query(By.css('[data-testing-id="checkbox-error-label"]'));

    expect(checkboxInput.classList).not.toContain('checkbox-error');
    expect(checkboxErrorLabel).toBeFalsy();
  });
});

function setup() {
  @Component({
    standalone: true,
    imports: [CheckboxComponent],
    template: `
      <aa-checkbox [formControlName]="formControlName" [formControl]="formControl">Test checkbox</aa-checkbox>
    `,
  })
  class CheckboxHostComponent {
    formControlName!: string;
    formControl!: FormControl;
  }

  const formControlName = 'test';
  const formGroup = new FormGroup({
    [formControlName]: new FormControl(false),
  });
  const formControl = formGroup.get(formControlName) as FormControl;
  const formGroupDirective = new FormGroupDirective([], []);
  formGroupDirective.form = formGroup;

  TestBed.configureTestingModule({
    imports: [CheckboxComponent, CheckboxHostComponent],
    providers: [{ provide: ControlContainer, useValue: formGroupDirective }],
  });

  const fixture = TestBed.createComponent(CheckboxHostComponent);
  const checkboxDebugElement = fixture.debugElement.query(By.directive(CheckboxComponent));
  const hostComponent = fixture.componentInstance;

  hostComponent.formControlName = formControlName;
  hostComponent.formControl = formControl;

  fixture.detectChanges();

  return {
    fixture,
    checkboxDebugElement,
    hostComponent,
  };
}
