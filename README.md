## qrcode for angular
```html
<category #category>
    <ng-template #ref let-item>
        <h2>{{item.title}}</h2>
        <ul>
            <li (click)="setItem(data)" *ngFor="let data of item.items">
                <img [src]="data.image">
                {{data.title}}
            </li>
        </ul>
    </ng-template>
</category>
```

```ts
import {
  Component, OnInit, ChangeDetectionStrategy,
  ViewChild, ElementRef, ChangeDetectorRef
} from '@angular/core';
import { EventService } from 'meepo-event';
import { CategoryComponent } from '../../src/app/app';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  @ViewChild('category') category: CategoryComponent;
  constructor(
    public event: EventService
  ) {
    let now = new Date();
    let version = new Date(now.getFullYear(), now.getMonth() + 1, now.getDate()).getTime();
    this.event.checkVersion(version);
  }

  setItem(item: any) {
    this.category.addHistory(item);
    if(item.link){
      
    }
  }
}
```