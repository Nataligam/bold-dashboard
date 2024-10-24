// utils/toast-util.ts
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
    providedIn: 'root'
})
export class ToastUtil {
    constructor(private messageService: MessageService) { }

    showToast(severity: 'success' | 'info' | 'warn' | 'error', summary: string, detail: string, life: number = 3000) {
        this.messageService.add({
            severity,
            summary,
            detail,
            life
        });
    }
}
