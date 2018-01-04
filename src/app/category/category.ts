import {
    Component, OnInit, ViewEncapsulation,
    ChangeDetectorRef, Inject, InjectionToken,
    ViewChild, ContentChild, TemplateRef, Input
} from '@angular/core';
import { NgIfContext } from '@angular/common';
import { MeepoCache } from 'meepo-base';
import { StoreService } from 'meepo-store';
import { Title } from '@angular/platform-browser';
import { AxiosService } from 'meepo-axios';
import { UtilService, DateTimeService } from 'meepo-core';

export const CATEGORY_TOKEN = new InjectionToken('category token');

@Component({
    selector: 'category',
    templateUrl: './category.html',
    styleUrls: ['./category.scss'],
    encapsulation: ViewEncapsulation.None
})
export class CategoryComponent extends MeepoCache {
    @Input() top: string = '0px';
    @Input() bottom: string = '55px';
    
    data: any[] = [];
    key: string = 'category';
    historys: any[] = [];
    // 当前记录
    items: any[] = [];
    @ContentChild('ref') template: TemplateRef<any>;
    constructor(
        store: StoreService,
        cd: ChangeDetectorRef,
        title: Title,
        public util: UtilService,
        public axios: AxiosService,
        @Inject(CATEGORY_TOKEN) public cfg: any,
        public dateTime: DateTimeService
    ) {
        super(store, cd, title);
        this.items = this.store.get(this.key + '.active.items', this.items);
    }

    addHistory(history: any) {
        let date = new Date();
        let year = date.getFullYear(),
            month = date.getMonth() + 1,
            day = date.getDate();
        let title = `${this.dateTime.fourDigit(year)}年${this.dateTime.twoDigit(month)}月${this.dateTime.twoDigit(day)}日`

        let has = false;
        this.historys.map(item => {
            if (item.title === title) {
                has = true;
                let exist = item.items.indexOf(history);
                if (exist >= 0) { } else {
                    item.items = [...item.items, ...history]
                }
            }
        });
        if (!has) {
            this.historys.push({
                title: title,
                items: [history]
            });
        }
        this.store.set(this.key + '.historys', this.historys);
    }


    meepoInit() {
        this.historys = this.store.get(this.key + '.historys', this.historys);
        this.items = this.historys;
        if (this.data && this.util.isArray(this.data) && this.data.length > 0) {
            this.data.map(res => {
                res.active = 'off';
            });
        } else {
            this.axios.get(this.cfg).subscribe((res: any) => {
                let data = res.info;
                data.map(res => {
                    res.active = 'off';
                });
                this.updateCache(data);
            });
        }
    }

    _setActive(item: any) {
        this.items = item.children;
        this.store.set(this.key + '.active.items', this.items);
    }

    _activeSlide(item: any) {
        let datas = this.data;
        datas.map(res => {
            res.active = 'off';
        });
        item.active = 'on';
        this._setActive(item);
        this.updateCache(datas);
    }

}
