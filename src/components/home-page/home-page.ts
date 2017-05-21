// App
import { Component, OnInit, OnDestroy, ViewEncapsulation } from "@angular/core";
import { LogService } from '../../services/log-service';

interface IConfig {
    columns: Array<{
        visible: boolean,
        size: number,
        rows: Array<{
            visible: boolean,
            size: number,
            type: string
        }>
    }>;
    disabled: boolean;
};

const defaultConfig: IConfig = {
    columns: [
        {
            visible: true,
            size: 25,
            rows: [
                { visible: true, size: 25, type: 'A' },
                { visible: true, size: 75, type: 'B' }
            ]
        },
        {
            visible: true,
            size: 50,
            rows: [
                { visible: true, size: 60, type: 'doc' },
                { visible: true, size: 40, type: 'C' }    
            ]
        },
        {
            visible: true,
            size: 25,
            rows: [
                { visible: true, size: 20, type: 'D' },
                { visible: true, size: 30, type: 'E' },    
                { visible: true, size: 50, type: 'F' }    
            ]
        }
    ],
    disabled: false
};

@Component({
  moduleId: module.id,
  selector: 'home-page',
  styleUrls: ['./home-page.scss'],
  template: './home-page.html'})
export class HomePageComponent implements OnInit, OnDestroy {
  public config: IConfig = defaultConfig;

  constructor(private logger: LogService) {
  }
  public ngOnInit() {
    this.logger.info('ngOnInit');
  }

  public ngOnDestroy() {
    this.logger.info('ngOnDestroy');
  }
}
