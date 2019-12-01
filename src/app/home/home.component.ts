import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';

import { User } from '@/_models';
import { UserService, AuthenticationService } from '@/_services';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent implements OnInit, OnDestroy {
    currentUser: User;
    currentUserSubscription: Subscription;
    users: User[] = [];
    
   // zoom: number = 3;
    lat =17.387140;
     lng = 78.491684;
     previous:any=null;
    cities = [

        {lat: 17.387140, lng: 78.491684,  label: 'A',
        draggable: true, url:'http://maps.google.com/mapfiles/ms/icons/green-dot.png'},

        {lat: 18.000055, lng:79.588165,  label: 'B',
        draggable: true,url:'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'},

        {lat: 17.920000, lng:77.519722,  label: 'C',
        draggable: true,url:'http://maps.google.com/mapfiles/ms/icons/pink-dot.png'},

        {lat: 17.33763, lng:76.83787,  label: 'D',
        draggable: true,url:'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png'},
       
      ];
    count: number;
    constructor(
        private authenticationService: AuthenticationService,
        private userService: UserService
    ) {
        this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
            this.currentUser = user;
        });
    }
    clickedMarker(infowindow){
        if(this.previous){
            this.previous.close();
        }
        this.previous=infowindow;
    }
    ngOnInit() {
        this.loadAllUsers();
    }

    ngOnDestroy() {
        // unsubscribe to ensure no memory leaks
        this.currentUserSubscription.unsubscribe();
    }

    deleteUser(id: number) {
        this.userService.delete(id).pipe(first()).subscribe(() => {
            this.loadAllUsers()
        });
    }

    private loadAllUsers() {
        this.userService.getAll().pipe(first()).subscribe(users => {
            this.users = users;
            this.count=users.length;
        });
    }
}