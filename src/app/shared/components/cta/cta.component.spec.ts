import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CtaComponent } from './cta.component';

describe('CtaComponent', () => {
    let component: CtaComponent;
    let fixture: ComponentFixture<CtaComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [CtaComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(CtaComponent);
        component = fixture.componentInstance;
        fixture.componentRef.setInput('heading', 'Test Heading');
        fixture.componentRef.setInput('buttonText', 'Test Button');
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
