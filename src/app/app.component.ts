import { Component, HostListener } from '@angular/core';
import { Keys } from './enums/Keys';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalsService } from './services/modals.service';
import { Canvas } from './models/Canvas';
import { Line } from './models/Line';
import { Rectangle } from './models/Rectangle';
import { Fill } from './models/Fill';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  get Keys() {
    return Keys;
  }

  public canvasForm: FormGroup;
  public figureForm: FormGroup;
  public fillCanvasForm: FormGroup;
  public isVisibleNewCanvas: boolean;
  public isVisibleNewFigure: boolean;
  public isVisibleFillCanvas: boolean;
  public modalTitle: string;
  public hasCanvas: boolean;
  public canvas: Canvas;

  constructor(
    private fb: FormBuilder,
    private modalsService: ModalsService
  ) {}

  private static validateForms(form: FormGroup) {
    // tslint:disable-next-line:forin
    for (const i in form.controls) {
      form.controls[i].markAsDirty();
      form.controls[i].updateValueAndValidity();
    }
  }

  private static printMatrix(matrix: any[]) {
    for ( let i = 0 ;  i < matrix.length ; i++ ) {
      console.log(`${i + 100} ${JSON.stringify(matrix[i].join(' '))}`);
    }
  }

  private isKeyValid(key: string) {
    return Object.values(Keys).includes(key) || this.isVisibleNewCanvas || this.isVisibleNewFigure || this.isVisibleFillCanvas;
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.defaultPrevented) {
      return; // Should do nothing if the default action has been cancelled
    }

    const { code } = event;
    if (this.isKeyValid(code)) {
      this.handlePressedKey(code as Keys);
    } else {
      this.modalsService.errorKeyModal();
      console.log('Invalid Key');
    }
  }

  private handlePressedKey(code: Keys) {
    const func = ({
      [Keys.KeyC]: () => this.openModalNewCanvas(),
      [Keys.KeyL]: () => this.openModalNewFigure(Keys.KeyL),
      [Keys.KeyR]: () => this.openModalNewFigure(Keys.KeyR),
      [Keys.KeyB]: () => this.openModalFillCanvas(),
      [Keys.KeyQ]: () => this.quitProgram()
    })[code];

    // tslint:disable-next-line:no-unused-expression
    !!func && func();
  }

  private openModalNewCanvas() {
    this.canvasForm = this.fb.group({
      width: new FormControl(1, [Validators.required, Validators.min(1)]),
      height: new FormControl(1, [Validators.required, Validators.min(1)])
    });
    this.modalsService.closeAll();
    this.isVisibleNewCanvas = true;
  }

  private openModalNewFigure(key: Keys) {
    this.modalTitle = key;
    if (!this.hasCanvas) {
      this.noCanvasError();
      return;
    }

    const maxX = this.canvas.width;
    const maxY = this.canvas.height;

    this.figureForm = this.fb.group({
      x1: new FormControl(1, [Validators.required, Validators.min(1), Validators.max(maxX)]),
      y1: new FormControl(1, [Validators.required, Validators.min(1), Validators.max(maxY)]),
      x2: new FormControl(1, [Validators.required, Validators.min(1), Validators.max(maxX)]),
      y2: new FormControl(1, [Validators.required, Validators.min(1), Validators.max(maxY)])
    });
    this.isVisibleNewFigure = true;
  }

  private openModalFillCanvas() {
    if (!this.hasCanvas) {
      this.noCanvasError();
      return;
    }

    const maxX = this.canvas.width;
    const maxY = this.canvas.height;

    this.fillCanvasForm = this.fb.group({
      x: new FormControl(1, [Validators.required, Validators.min(1), Validators.max(maxX)]),
      y: new FormControl(1, [Validators.required, Validators.min(1), Validators.max(maxY)]),
      color: new FormControl('', [Validators.required]),
    });

    this.isVisibleFillCanvas = true;
  }

  public createNewCanvas() {
    AppComponent.validateForms(this.canvasForm);

    if (this.canvasForm.invalid) {
      return;
    }

    const { width, height } = this.canvasForm.value;

    this.canvas = new Canvas(width, height);
    this.hasCanvas = true;
    this.hideModals();
  }

  public createNewFigure() {
    this.modalTitle === Keys.KeyL ? this.addLine() : this.addRectangle();
  }

  private addLine() {
    AppComponent.validateForms(this.figureForm);

    if (this.figureForm.invalid) {
      return;
    }

    const { x1, y1, x2, y2 } = this.figureForm.value;

    if (x1 !== x2 && y1 !== y2) {
      this.modalsService.errorGeneralModal('It is not a line', 'Those coordinates doesnt draw a line');
      return;
    }

    const newLine = new Line(x1, y1, x2, y2);
    this.canvas.drawLine(newLine);
    this.hideModals();
  }

  private addRectangle() {
    AppComponent.validateForms(this.figureForm);

    if (this.figureForm.invalid) {
      return;
    }

    const { x1, y1, x2, y2 } = this.figureForm.value;

    if (x1 === x2 && y1 === y2) {
      this.modalsService.errorGeneralModal('It is not a Rectangle', 'Those coordinates doesnt draw a rectangle');
      return;
    }

    const newRectangle = new Rectangle(x1, y1, x2, y2);
    this.canvas.drawRectangle(newRectangle);
    this.hideModals();
  }

  private hideModals() {
    this.isVisibleNewCanvas = false;
    this.isVisibleNewFigure = false;
    this.isVisibleFillCanvas = false;
    AppComponent.printMatrix(this.canvas.canvas);
  }

  public fillArea() {
    AppComponent.validateForms(this.fillCanvasForm);

    if (this.fillCanvasForm.invalid) {
      return;
    }

    const { x, y, color } = this.fillCanvasForm.value;

    if (this.canvas.canvas[y][x] === 'x') {
      this.modalsService.errorGeneralModal('Invalid point', 'You cant fill a line');
      return;
    }

    const newFill = new Fill(x, y, color);
    this.canvas.fillCanvas(newFill);
    this.hideModals();
  }

  private quitProgram() {
    this.modalsService.confirmModal(() => {
      this.hasCanvas = false;
      this.canvas.emptyCanvas();
    });
  }

  private noCanvasError() {
    this.modalsService.errorGeneralModal('Canvas doesnt exit', 'Please, press C key to create a new Canvas');
  }

}
