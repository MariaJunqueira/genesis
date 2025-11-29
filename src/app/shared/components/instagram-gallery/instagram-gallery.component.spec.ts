import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstagramGalleryComponent } from './instagram-gallery.component';

describe('InstagramGalleryComponent', () => {
    let component: InstagramGalleryComponent;
    let fixture: ComponentFixture<InstagramGalleryComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [InstagramGalleryComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(InstagramGalleryComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
