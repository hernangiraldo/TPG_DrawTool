import { AppComponent } from './app.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Keys } from './enums/Keys';

describe('Testing AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NgZorroAntdModule,
        ReactiveFormsModule
      ],
      declarations: [ AppComponent ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  describe('Init', () => {
    it('Init component', () => {
      expect(component).toBeTruthy();
    });
  });

  describe('Test canvas', () => {
    beforeEach(() => {
      component.canvasForm = new FormGroup({
        width: new FormControl(20),
        height: new FormControl(4)
      });
      component.createNewCanvas();
    });

    describe('Canvas exist', () => {
      it('Check exist', () => {
        expect(component.canvas.canvas.length).toEqual(6);
        expect(component.canvas.canvas[0].length).toEqual(22);
        expect(component.hasCanvas).toBeTruthy();
      });
    });

    describe('Draw line', () => {
      const lineTest = ['|', 'x', 'x', 'x', 'x', 'x', 'x', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '|'];
      beforeEach(() => {
        component.figureForm = new FormGroup({
          x1: new FormControl(6),
          y1: new FormControl(2),
          x2: new FormControl(1),
          y2: new FormControl(2)
        });
        component.modalTitle = Keys.KeyL;
      });

      it('Create new line', () => {
        component.createNewFigure();
        expect(component.canvas.canvas[2]).toEqual(lineTest);
      });
    });

    describe('Draw rectangle and Fill canvas', () => {
      beforeEach(() => {
        component.figureForm = new FormGroup({
          x1: new FormControl(20),
          y1: new FormControl(3),
          x2: new FormControl(16),
          y2: new FormControl(1)
        });
        component.modalTitle = Keys.KeyR;

        component.fillCanvasForm = new FormGroup({
          x: new FormControl(10),
          y: new FormControl(3),
          color: new FormControl('i')
        });
      });

      it('Create new rectangle', () => {
        component.createNewFigure();
        expect(component.canvas.canvas[1].slice(16, component.canvas.width + 1)).toEqual(['x', 'x', 'x', 'x', 'x']);
        expect(component.canvas.canvas[2].slice(16, component.canvas.width + 1)).toEqual(['x', ' ', ' ', ' ', 'x']);
        expect(component.canvas.canvas[3].slice(16, component.canvas.width + 1)).toEqual(['x', 'x', 'x', 'x', 'x']);
      });

      it('Fill', () => {
        const lineTest0 = ['|', 'i', 'i', 'i', 'i', 'i', 'i', 'i', 'i', 'i', 'i', 'i', 'i', 'i', 'i', 'i', 'x', 'x', 'x', 'x', 'x', '|'];
        const lineTest1 = ['|', 'i', 'i', 'i', 'i', 'i', 'i', 'i', 'i', 'i', 'i', 'i', 'i', 'i', 'i', 'i', 'x', ' ', ' ', ' ', 'x', '|'];
        const lineTest2 = ['|', 'i', 'i', 'i', 'i', 'i', 'i', 'i', 'i', 'i', 'i', 'i', 'i', 'i', 'i', 'i', 'x', 'x', 'x', 'x', 'x', '|'];
        const lineTest3 = ['|', 'i', 'i', 'i', 'i', 'i', 'i', 'i', 'i', 'i', 'i', 'i', 'i', 'i', 'i', 'i', 'i', 'i', 'i', 'i', 'i', '|'];
        component.createNewFigure();
        component.fillArea();
        expect(component.canvas.canvas[1]).toEqual(lineTest0);
        expect(component.canvas.canvas[2]).toEqual(lineTest1);
        expect(component.canvas.canvas[3]).toEqual(lineTest2);
        expect(component.canvas.canvas[4]).toEqual(lineTest3);
      });
    });
  });

});

