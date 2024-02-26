import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ControlContainer, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { SelectItem } from '@angular-auth/libs/common';
import { SelectComponent } from './select.component';

describe('selectComponent', () => {
  it('should create', () => {
    const { hostComponent } = setup();
    expect(hostComponent).toBeTruthy();
  });

  it('should render select', () => {
    const { selectDebugElement } = setup();
    const select = selectDebugElement.query(By.css('[data-testing-id="select"]'));
    expect(select).toBeTruthy();
  });

  it('should render placeholder', () => {
    const { hostComponent, fixture, selectDebugElement } = setup();

    hostComponent.placeholder = 'Test placeholder';
    fixture.detectChanges();

    const option: HTMLElement = selectDebugElement.query(By.css('[data-testing-id="default-option"]')).nativeElement;

    expect(option.getAttribute('value')).toBe('0');
  });

  it('should set placeholder as selected and disabled option', () => {
    const { hostComponent, fixture, selectDebugElement } = setup();

    hostComponent.placeholder = 'Test placeholder';
    fixture.detectChanges();

    const option: HTMLElement = selectDebugElement.query(By.css('[data-testing-id="default-option"]')).nativeElement;

    expect(option.getAttribute('selected')).toBe('');
    expect(option.getAttribute('disabled')).toBe('');
  });

  it('should render options', () => {
    const { hostComponent, fixture, selectDebugElement } = setup();

    hostComponent.list = [
      { id: 1, name: 'option 1' },
      { id: 2, name: 'option 2' },
    ];
    fixture.detectChanges();

    const options = selectDebugElement.queryAll(By.css('[data-testing-id="option"]'));

    expect(options.length).toBe(2);
  });

  it('should render option with value and text', () => {
    const { hostComponent, fixture, selectDebugElement } = setup();

    hostComponent.list = [{ id: 1, name: 'option 1' }];
    fixture.detectChanges();

    const option: HTMLElement = selectDebugElement.query(By.css('[data-testing-id="option"]')).nativeElement;

    expect(option.getAttribute('value')).toBe('1');
    expect(option.innerHTML.trim()).toBe('option 1');
  });

  it('should render error message if form control is invalid and touched', () => {
    const { hostComponent, fixture, selectDebugElement } = setup();

    const formControl = new FormControl(null, Validators.required);
    formControl.markAsTouched();

    hostComponent.formControl = formControl;
    fixture.detectChanges();

    const inputErrorLabel = selectDebugElement.query(By.css('[data-testing-id="select-error-label"]'));

    expect(inputErrorLabel).toBeTruthy();
  });

  it('should render error message if form control is invalid and dirty', () => {
    const { hostComponent, fixture, selectDebugElement } = setup();

    const formControl = new FormControl(null, Validators.required);
    formControl.markAsDirty();

    hostComponent.formControl = formControl;
    fixture.detectChanges();

    const inputErrorLabel = selectDebugElement.query(By.css('[data-testing-id="select-error-label"]'));

    expect(inputErrorLabel).toBeTruthy();
  });

  it('should not render error message if form control is valid', () => {
    const { hostComponent, fixture, selectDebugElement } = setup();

    const formControl = new FormControl(true, Validators.required);

    hostComponent.formControl = formControl;
    hostComponent.formControl.markAsTouched();
    hostComponent.formControl.markAsDirty();
    fixture.detectChanges();

    const inputErrorLabel = selectDebugElement.query(By.css('[data-testing-id="select-error-label"]'));

    expect(inputErrorLabel).toBeFalsy();
  });

  it('should not render error message if form control is untouched and pristine', () => {
    const { hostComponent, fixture, selectDebugElement } = setup();

    const formControl = new FormControl(null, Validators.required);

    hostComponent.formControl = formControl;
    fixture.detectChanges();

    const inputErrorLabel = selectDebugElement.query(By.css('[data-testing-id="select-error-label"]'));

    expect(inputErrorLabel).toBeFalsy();
  });

  it('should apply error classes if form control is invalid and touched', () => {
    const { hostComponent, fixture, selectDebugElement } = setup();

    const formControl = new FormControl(null, Validators.required);
    formControl.markAsTouched();

    hostComponent.formControl = formControl;
    fixture.detectChanges();

    const select: HTMLElement = selectDebugElement.query(By.css('[data-testing-id="select"]')).nativeElement;
    const selectErrorLabel: HTMLElement = selectDebugElement.query(
      By.css('[data-testing-id="select-error-label"]'),
    ).nativeElement;

    expect(select.classList).toContain('select-error');
    expect(selectErrorLabel.classList).toContain('text-error');
  });

  it('should apply error classes if form control is invalid and dirty', () => {
    const { hostComponent, fixture, selectDebugElement } = setup();

    const formControl = new FormControl(null, Validators.required);
    formControl.markAsDirty();

    hostComponent.formControl = formControl;
    fixture.detectChanges();

    const select: HTMLElement = selectDebugElement.query(By.css('[data-testing-id="select"]')).nativeElement;
    const selectErrorLabel: HTMLElement = selectDebugElement.query(
      By.css('[data-testing-id="select-error-label"]'),
    ).nativeElement;

    expect(select.classList).toContain('select-error');
    expect(selectErrorLabel.classList).toContain('text-error');
  });

  it('should not apply error classes if form control is valid', () => {
    const { hostComponent, fixture, selectDebugElement } = setup();

    const formControl = new FormControl(true, Validators.required);

    hostComponent.formControl = formControl;
    hostComponent.formControl.markAsTouched();
    hostComponent.formControl.markAsDirty();
    fixture.detectChanges();

    const select: HTMLElement = selectDebugElement.query(By.css('[data-testing-id="select"]')).nativeElement;
    const selectErrorLabel = selectDebugElement.query(By.css('[data-testing-id="select-error-label"]'));

    expect(select.getAttribute('class')).not.toContain('select-error');
    expect(selectErrorLabel).toBeFalsy();
  });

  it('should not apply error classes if form control is untouched and pristine', () => {
    const { hostComponent, fixture, selectDebugElement } = setup();

    const formControl = new FormControl(null, Validators.required);

    hostComponent.formControl = formControl;
    fixture.detectChanges();

    const select: HTMLElement = selectDebugElement.query(By.css('[data-testing-id="select"]')).nativeElement;
    const selectErrorLabel = selectDebugElement.query(By.css('[data-testing-id="select-error-label"]'));

    expect(select.getAttribute('class')).not.toContain('select-error');
    expect(selectErrorLabel).toBeFalsy();
  });
});

function setup() {
  @Component({
    standalone: true,
    imports: [SelectComponent],
    template: `
      <aa-select
        [list]="list"
        [placeholder]="placeholder"
        [formControlName]="formControlName"
        [formControl]="formControl"
      />
    `,
  })
  class SelectHostComponent {
    list!: SelectItem[];
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
    imports: [SelectComponent, SelectHostComponent],
    providers: [{ provide: ControlContainer, useValue: formGroupDirective }],
  });

  const fixture = TestBed.createComponent(SelectHostComponent);
  const selectDebugElement = fixture.debugElement.query(By.directive(SelectComponent));
  const hostComponent = fixture.componentInstance;

  hostComponent.formControlName = formControlName;
  hostComponent.formControl = formControl;

  fixture.detectChanges();

  return {
    fixture,
    selectDebugElement,
    hostComponent,
  };
}
