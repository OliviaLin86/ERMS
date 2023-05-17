export class RequestUI {
    requestId: number;
    clientUserId: number;
    clientUserName?: string;
    vendorUserId: number;
    vendorUserName?: string;
    supplyId: number;
    supplyName?: string;
    isReceived?: boolean;

    constructor(){
        this.requestId = 0;
        this.clientUserId = 0;
        this.clientUserName = '';
        this.vendorUserId = 0;
        this.vendorUserName = '';
        this.supplyId = 0;
        this.supplyName = '';
        this.isReceived = false;
    }
}