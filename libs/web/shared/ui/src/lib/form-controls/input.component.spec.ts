import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ControlContainer, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { InputComponent } from './input.component';

describe('InputComponent', () => {
  it('should create', () => {
    const { hostComponent } = setup();
    expect(hostComponent).toBeTruthy();
  });

  it('should render input', () => {
    const { inputDebugElement } = setup();
    const input = inputDebugElement.query(By.css('[data-testing-id="input"]'));
    expect(input).toBeTruthy();
  });

  it('should render placeholder', () => {
    const { hostComponent, fixture, inputDebugElement } = setup();

    hostComponent.placeholder = 'Test placeholder';
    fixture.detectChanges();

    const input = inputDebugElement.query(By.css('[data-testing-id="input"]'));

    expect(input.nativeElement.getAttribute('placeholder')).toBe('Test placeholder');
  });

  it('should render type', () => {
    const { hostComponent, fixture, inputDebugElement } = setup();

    hostComponent.type = 'password';
    fixture.detectChanges();

    const input = inputDebugElement.query(By.css('[data-testing-id="input"]'));

    expect(input.nativeElement.getAttribute('type')).toBe('password');
  });

  it('should render error message if form control is invalid and touched', () => {
    const { hostComponent, fixture, inputDebugElement } = setup();

    const formControl = new FormControl(null, Validators.required);
    formControl.markAsTouched();

    hostComponent.formControl = formControl;
    fixture.detectChanges();

    const checkboxErrorLabel = inputDebugElement.query(By.css('[data-testing-id="input-error-label"]'));

    expect(checkboxErrorLabel).toBeTruthy();
  });

  it('should render error message if form control is invalid and dirty', () => {
    const { hostComponent, fixture, inputDebugElement } = setup();

    const formControl = new FormControl(null, Validators.required);
    formControl.markAsDirty();

    hostComponent.formControl = formControl;
    fixture.detectChanges();

    const checkboxErrorLabel = inputDebugElement.query(By.css('[data-testing-id="input-error-label"]'));

    expect(checkboxErrorLabel).toBeTruthy();
  });

  it('should not render error message if form control is valid', () => {
    const { hostComponent, fixture, inputDebugElement } = setup();

    const formControl = new FormControl(true, Validators.required);

    hostComponent.formControl = formControl;
    hostComponent.formControl.markAsTouched();
    hostComponent.formControl.markAsDirty();
    fixture.detectChanges();

    const checkboxErrorLabel = inputDebugElement.query(By.css('[data-testing-id="input-error-label"]'));

    expect(checkboxErrorLabel).toBeFalsy();
  });

  it('should not render error message if form control is untouched and pristine', () => {
    const { hostComponent, fixture, inputDebugElement } = setup();

    const formControl = new FormControl(null, Validators.required);

    hostComponent.formControl = formControl;
    fixture.detectChanges();

    const checkboxErrorLabel = inputDebugElement.query(By.css('[data-testing-id="input-error-label"]'));

    expect(checkboxErrorLabel).toBeFalsy();
  });

  it('should apply error classes if form control is invalid and touched', () => {
    const { hostComponent, fixture, inputDebugElement } = setup();

    const formControl = new FormControl(null, Validators.required);
    formControl.markAsTouched();

    hostComponent.formControl = formControl;
    fixture.detectChanges();

    const input: HTMLElement = inputDebugElement.query(By.css('[data-testing-id="input"]')).nativeElement;
    const inputErrorLabel: HTMLElement = inputDebugElement.query(
      By.css('[data-testing-id="input-error-label"]'),
    ).nativeElement;

    expect(input.classList).toContain('input-error');
    expect(inputErrorLabel.classList).toContain('text-error');
  });

  it('should apply error classes if form control is invalid and dirty', () => {
    const { hostComponent, fixture, inputDebugElement } = setup();

    const formControl = new FormControl(null, Validators.required);
    formControl.markAsDirty();

    hostComponent.formControl = formControl;
    fixture.detectChanges();

    const input: HTMLElement = inputDebugElement.query(By.css('[data-testing-id="input"]')).nativeElement;
    const inputErrorLabel: HTMLElement = inputDebugElement.query(
      By.css('[data-testing-id="input-error-label"]'),
    ).nativeElement;

    expect(input.classList).toContain('input-error');
    expect(inputErrorLabel.classList).toContain('text-error');
  });

  it('should not apply error classes if form control is valid', () => {
    const { hostComponent, fixture, inputDebugElement } = setup();

    const formControl = new FormControl(true, Validators.required);

    hostComponent.formControl = formControl;
    hostComponent.formControl.markAsTouched();
    hostComponent.formControl.markAsDirty();
    fixture.detectChanges();

    const input: HTMLElement = inputDebugElement.query(By.css('[data-testing-id="input"]')).nativeElement;
    const inputErrorLabel = inputDebugElement.query(By.css('[data-testing-id="input-error-label"]'));

    expect(input.classList).not.toContain('input-error');
    expect(inputErrorLabel).toBeFalsy();
  });

  it('should not apply error classes if form control is untouched and pristine', () => {
    const { hostComponent, fixture, inputDebugElement } = setup();

    const formControl = new FormControl(null, Validators.required);

    hostComponent.formControl = formControl;
    fixture.detectChanges();

    const input: HTMLElement = inputDebugElement.query(By.css('[data-testing-id="input"]')).nativeElement;
    const inputErrorLabel = inputDebugElement.query(By.css('[data-testing-id="input-error-label"]'));

    expect(input.classList).not.toContain('input-error');
    expect(inputErrorLabel).toBeFalsy();
  });
});

function setup() {
  @Component({
    standalone: true,
    imports: [InputComponent],
    template: `
      <aa-input
        [type]="type"
        [placeholder]="placeholder"
        [formControlName]="formControlName"
        [formControl]="formControl"
      />
    `,
  })
  class InputHostComponent {
    type!: string;
    placeholder!: string;
    formControlName!: string;
    formControl!: FormControl;
  }

  const formControlName = 'test';
  const formGroup = new FormGroup({
    [formControlName]: new FormControl(''),
  });
  const formControl = formGroup.get(formControlName) as FormControl;
  const formGroupDirective = new FormGroupDirective([], []);
  formGroupDirective.form = formGroup;

  TestBed.configureTestingModule({
    imports: [InputComponent, InputHostComponent],
    providers: [{ provide: ControlContainer, useValue: formGroupDirective }],
  });

  const fixture = TestBed.createComponent(InputHostComponent);
  const inputDebugElement = fixture.debugElement.query(By.directive(InputComponent));
  const hostComponent = fixture.componentInstance;

  hostComponent.formControlName = formControlName;
  hostComponent.formControl = formControl;

  fixture.detectChanges();

  return {
    fixture,
    inputDebugElement,
    hostComponent,
  };
}
