import {
    Component, OnInit, ViewEncapsulation,
    ChangeDetectorRef, Inject, InjectionToken,
    ViewChild, ContentChild, TemplateRef
} from '@angular/core';
import { NgIfContext } from '@angular/common';
import { MeepoCache } from 'meepo-base';
import { StoreService } from 'meepo-store';
import { Title } from '@angular/platform-browser';
import { AxiosService } from 'meepo-axios';
import { UtilService } from 'meepo-core';
export const CATEGORY_TOKEN = new InjectionToken('category token');

@Component({
    selector: 'category',
    templateUrl: './category.html',
    styleUrls: ['./category.scss'],
    encapsulation: ViewEncapsulation.None
})
export class CategoryComponent extends MeepoCache {
    data: any[] = [];
    key: string = 'category';
    items: any[] = [];
    @ContentChild('ref') template: TemplateRef<any>;
    constructor(
        store: StoreService,
        cd: ChangeDetectorRef,
        title: Title,
        public util: UtilService,
        public axios: AxiosService,
        @Inject(CATEGORY_TOKEN) public cfg: any
    ) {
        super(store, cd, title);
        this.items = this.store.get(this.key + '.active.items', this.items);
    }

    meepoInit() {
        if (this.data && this.util.isArray(this.data) && this.data.length > 0) {

        } else {
            this.axios.get(this.cfg).subscribe((res: any) => {
                let data = res.info;
                this.updateCache(data);
            });
        }
    }

    private _setActive(item: any) {
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
