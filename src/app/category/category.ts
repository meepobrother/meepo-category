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
    max: number = 8;
    maxHis: number = 1;
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
                item.items = [history, ...item.items];
                if (item.items.length > 8) {
                    item.items = item.items.splice(0, this.max);
                }
            }
        });
        if (!has) {
            this.historys.unshift({
                title: title,
                items: [history]
            });
        }
        this.historys = this.historys.splice(0, this.maxHis);
        this.store.set(this.key + '.historys', this.historys);
    }


    meepoInit() {
        this.historys = this.store.get(this.key + '.historys', this.historys);
        if (this.data && this.util.isArray(this.data) && this.data.length > 0) {

        } else {
            this.axios.get(this.cfg).subscribe((res: any) => {
                let data = res.info;
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
        this.updateCache(datas);
    }
}
