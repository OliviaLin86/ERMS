import { Component } from '@angular/core';
import 'devextreme/data/odata/store';
import { map } from 'rxjs/operators';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { RequestService } from 'src/app/services/request.service';
import * as _ from 'lodash';
import { UserType } from 'src/app/enums/userType';
import { Subscription } from 'rxjs';
import { SupplyService } from 'src/app/services/supply.service';
import { Supply } from 'src/app/models/supply';
import { RequestUI } from 'src/app/models/request';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  {
  dataSource: any;
  clients: User[] = [];
  currentUser: User | undefined;
  dataGridVisible: boolean = false;
  selectedSupplyIds: number[] = [];
  selectedVendorIds: number[] = [];
  subscriptions$: Subscription[] = [];
  supplies: Supply[] = [];
  users: User[] = [];
  vendors: User[] = [];

  constructor(
    private requestService: RequestService,
    private supplyService: SupplyService,
    private userService: UserService,
    private toastr: ToastrService) {
  }

  ngOnInit(): void {
    const userSubscription$ = this.userService.getUsers().subscribe((users) => {
      this.users = users;
      this.clients = users.filter(u => u.userType === UserType.Client);
      this.vendors = users.filter(u => u.userType === UserType.Vendor);
    },
      (err: any) => this.toastr.error(err.message, err.name)
    );
    this.subscriptions$.push(userSubscription$);

    const supplySubscription$ = this.supplyService.getSupplies().subscribe((supplies) => {
      this.supplies = supplies;
    },
      (err: any) => this.toastr.error(err.message, err.name)
    );
    this.subscriptions$.push(supplySubscription$);
  }

  ngOnDestroy(): void {
    this.subscriptions$.forEach((s) => s.unsubscribe());
  }

  acknowledge(r: RequestUI) {
    if (this.currentUser?.userId != undefined) {
      this.requestService.acknowledge(r.requestId, this.currentUser?.userId).subscribe((isSuccess: boolean) => {
        if (isSuccess) {
          r.isReceived = true;
        }
      });
    }
  }

  getDataSource(userId: number) {
    return this.requestService.getRequestsByUserId(userId).pipe(map((res: any) => {
      this.dataSource = res;
      this.dataGridVisible = true;
    })).subscribe();
  }

  isUserClient(): boolean {
    return this.currentUser?.userType === UserType.Client;
  }

  onSaving(e: any) {
    if (this.isUserClient()) {
      let newRequests: RequestUI[] = [];
      let updatedRequests: RequestUI[] = [];
      e.changes.forEach((change: any) => {
        if (this.currentUser?.userId !== undefined) {
          if (change.type === "insert") {
            let newVendorUserId = change.data.vendorUserId;
            let newSupplyId = change.data.supplyId;
            let index = this.selectedVendorIds.indexOf(newVendorUserId);
            if (index > -1 && this.selectedSupplyIds[index] === newSupplyId) {
              this.toastr.warning("The vendor and supply combo already exists in this request.");
              newRequests = [];
              e.cancel = true;
              return;
            } else {
              this.selectedSupplyIds.push(change.data.supplyId);
              this.selectedVendorIds.push(change.data.vendorUserId);
              newRequests.push({ requestId: 0, clientUserId: this.currentUser?.userId, vendorUserId: newVendorUserId, supplyId: newSupplyId });
            }
          } else if (change.type === "update") {
            let updatedRequest = Object.assign({}, change.key);
            Object.keys(change.data).forEach(field => {
              updatedRequest[field] = change.data[field];
            });
            updatedRequests.push(updatedRequest);
          }
        }
      });

      if (newRequests.length > 0) {
        const addSubscription$: any = this.requestService.add(newRequests).subscribe((responses: RequestUI[]) => {
          this.dataSource = responses;
          this.selectedSupplyIds = [];
          this.selectedVendorIds = [];
        },
        (err: any) => this.toastr.error(err.message, err.name));
        this.subscriptions$.push(addSubscription$);
      }

      if (updatedRequests.length > 0) {
        const updatedSubscription$: any = this.requestService.update(updatedRequests).subscribe((responses: any) => {
          this.toastr.success("The requests have been updated.");
        },
        (err: any) => this.toastr.error(err.message, err.name));
        this.subscriptions$.push(updatedSubscription$);
      }
    } else {
      this.acknowledge(e.changes[0].key);
    }
  }

  onSelectionChanged(e: any) {
    this.currentUser = e.selectedItem;
    this.getDataSource(e.selectedItem.userId);
  }
}