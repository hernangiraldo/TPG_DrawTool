import { Injectable } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd';

@Injectable({
  providedIn: 'root'
})
export class ModalsService {

  constructor(
    private modalService: NzModalService
  ) { }

  public errorKeyModal() {
    this.closeAll();
    this.modalService.error({
      nzTitle: 'Invalid key',
      nzContent: `
          <span><strong>Press C</strong> to create a new canvas</span><br/>
          <span><strong>Press L</strong> to create a new Line</span><br/>
          <span><strong>Press R</strong> to create a new Rectangle</span><br/>
          <span><strong>Press B</strong> to fill the content</span><br/>
          <span><strong>Press Q</strong> to quit the program</span>
        `
    });
  }

  public errorGeneralModal(title: string, message: string) {
    this.closeAll();
    this.modalService.error({
      nzTitle: title,
      nzContent: message
    });
  }

  public confirmModal(fn: () => void) {
    this.closeAll();
    this.modalService.confirm({
      nzTitle: '<i>Do you want to delete this canvas?</i>',
      nzContent: '<b>Press OK to continue</b>',
      nzOnOk: () => fn()
    });
  }

  public closeAll() {
    this.modalService.closeAll();
  }
}
