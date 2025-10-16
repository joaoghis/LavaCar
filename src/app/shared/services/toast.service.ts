import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface ToastData {
    title: string;
    message: string;
    type: 'success' | 'danger' | 'info' | 'warning';
    show: boolean;
    delay?: number;
}

@Injectable({
    providedIn: 'root'
})
export class ToastService {
    private _toastData = new BehaviorSubject<ToastData>({ title: '', message: '', type: 'info', show: false });
    public toastData$: Observable<ToastData> = this._toastData.asObservable();

    constructor() { }

    show(title: string, message: string, type: ToastData['type'], delay: number = 5000): void {
        console.log(title, message);
        this._toastData.next({ title, message, type, show: true, delay });
    }

    showSuccess(title: string, message: string, delay?: number): void { this.show(title, message, 'success', delay); }
    showError(title: string, message: string, delay?: number): void { this.show(title, message, 'danger', delay); }
    showInfo(title: string, message: string, delay?: number): void { this.show(title, message, 'info', delay); }
    showWarning(title: string, message: string, delay?: number): void { this.show(title, message, 'warning', delay); }

    hide(): void {
        this._toastData.next({ ...this._toastData.getValue(), show: false });
    }
}
