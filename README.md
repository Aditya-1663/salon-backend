
# Salon Backend

The backend will consist of RESTful APIs to manage salon
booking functionalities such as setting availability, listing available slots, scheduling
bookings, and checking booked slots


## Install

    npm install

## Run the app

    node .\index.js



# REST API

The REST API to the example app is described below.

## Create New Users

### Request

`POST /api/auth/createuser`


http://localhost:5000/api/auth/createuser

https://salon-backend-koay.onrender.com/api/auth/createuser

#### 'HTTP header'
`Content-Type:application/json`
#### 'body'
```json
{

  "name": "username",

  "email": "email@gmail.com",

  "password": "123456789"
 
}
```



### Response
```json
   {

       "success":true,
       
       "authtoken":"asdbashdvasgdkhsadgascdasdcasghdcasdasdhgascd"
   }
   ```
## Users Login

### Request

`POST /api/auth/login`


http://localhost:5000/api/auth/login

https://salon-backend-koay.onrender.com/api/auth/login

#### 'HTTP header'
`Content-Type:application/json`
#### 'body'
```json
{

  "email": "email@gmail.com",

  "password": "123456789"
 
}
```



### Response
```json
   {

       "success":true,

       "authtoken":"asdbashdvasgdkhsadgascdasdcasghdcasdasdhgascd"
   }
```


## Create Availability

### Request

`POST /api/availability`


http://localhost:5000/api/availability

https://salon-backend-koay.onrender.com/api/availability

#### 'HTTP header'
`Content-Type:application/json`
#### 'body'
```json
{

  "availability": [

    {
      "date":"2024-04-09",
      "day": "Tuesday",
      "slots": [
        {
          "start": "09:00:00",
          "end": "09:45:00",
          "maxCapacity": 5
        },{
          "start": "10:00:00",
          "end": "10:45:00",
          "maxCapacity": 4
        },
        {
          "start": "11:00:00",
          "end": "11:30:00",
          "maxCapacity": 3
        }
      ]
    },
    {
      "date":"2024-04-10",
      "day": "Wednesday",
      "slots": [
        {
          "start": "13:30:00",
          "end": "14:15:00",
          "maxCapacity": 4
        },
        {
          "start": "15:00:00",
          "end": "15:30:00",
          "maxCapacity": 5
        }
      ]
    },
     {
      "date":"2024-04-11",
      "day": "Thursday",
      "slots": [
        {
          "start": "16:00:00",
          "end": "16:45:00",
          "maxCapacity": 4
        },
        {
          "start": "17:00:00",
          "end": "17:30:00",
          "maxCapacity": 2
        }
      ]
    }
    
  ]
}
```


### Response
```json
   {

  "availability": [

    {
      "date":"2024-04-09",
      "day": "Tuesday",
      "slots": [
        {
          "start": "09:00:00",
          "end": "09:45:00",
          "maxCapacity": 5
        },{
          "start": "10:00:00",
          "end": "10:45:00",
          "maxCapacity": 4
        },
        {
          "start": "11:00:00",
          "end": "11:30:00",
          "maxCapacity": 3
        }
      ]
    },
    {
      "date":"2024-04-10",
      "day": "Wednesday",
      "slots": [
        {
          "start": "13:30:00",
          "end": "14:15:00",
          "maxCapacity": 4
        },
        {
          "start": "15:00:00",
          "end": "15:30:00",
          "maxCapacity": 5
        }
      ]
    },
     {
      "date":"2024-04-11",
      "day": "Thursday",
      "slots": [
        {
          "start": "16:00:00",
          "end": "16:45:00",
          "maxCapacity": 4
        },
        {
          "start": "17:00:00",
          "end": "17:30:00",
          "maxCapacity": 2
        }
      ]
    }
    
  ]
}

```

##  Check Available Slots In Given Date 

### Request

`GET api/available-slots/:date`


http://localhost:5000/api/available-slots/2024-04-15

https://salon-backend-koay.onrender.com/api/available-slots/2024-04-15


### Response
```json
[
  {

    "start": "15:52:00",
    "end": "03:52:00",
    "maxCapacity": 5,
    "_id": "66144379b9acb500e40fd645"},{
    "start": "21:52:00",
    "end": "03:52:00",
    "maxCapacity": 5,
    "_id": "66144379b9acb500e40fd646"
  }
]
```


## To Boook Slot

### Request

`POST /api/booking

http://localhost:5000/api/booking

https://salon-backend-koay.onrender.com/api/booking

#### HTTP header
`Content-Type:application/json`

`auth-token:dasdasdasdeewfdcxvrgfvfvfghtbghy`

#### Body
```json
{

  "date":"2024-04-15",

   "slot": 

        {
          "start": "21:52:00",
          "end": "03:52:00"
        }

}
```


### Response
```json
   {

  "user": "6613fae3f043c955605f3632",

  "slot": {

    "start": "21:52:00",
    "end": "03:52:00"
  },

  "_id": "66149dd0a3cf02e8e04f5e56",

  "__v": 0
}

```

## All Booked slots

### Request

`GET /api/booking`


http://localhost:5000/api/booking

https://salon-backend-koay.onrender.com/api/booking

### Response
```json
   [
  {

    "slot": {
      "start": "21:52:00",
      "end": "03:52:00"
    },
    "_id": "6614215c15dbc7d09f3088f0",
    "user": "6613fae3f043c955605f3632",
    "__v": 0
  },
  {

    "slot": {
      "start": "21:52:00",
      "end": "03:52:00"
    },
    "_id": "6614218a2e376e21a8e0f8f8",
    "user": "6613fae3f043c955605f3632",
    "__v": 0
  }]
  ```
## Users all Booked slots

### Request

`GET api/booking/usersbooking`


http://localhost:5000/api/booking/usersbooking

https://salon-backend-koay.onrender.com/api/booking/usersbooking
#### HTTP header
`Content-Type:application/json`

`auth-token:dasdasdasdeewfdcxvrgfvfvfghtbghy`

### Response
```json
   [
  {

    "slot": {
      "start": "21:52:00",
      "end": "03:52:00"
    },
    "_id": "6614215c15dbc7d09f3088f0",
    "user": "6613fae3f043c955605f3632",
    "__v": 0
  },
  {

    "slot": {
      "start": "21:52:00",
      "end": "03:52:00"
    },
    "_id": "6614218a2e376e21a8e0f8f8",
    "user": "6613fae3f043c955605f3632",
    "__v": 0
  }]
```

## Delete user

### Request

`DELETE /api/auth/delete`


http://localhost:5000/api/auth/delete

https://salon-backend-koay.onrender.com/api/auth/delete

#### 'HTTP header'
`Content-Type:application/json`

`auth-token:asdjhadtewwggcfyugeyfgcvydutfev`

### Response
```json
  {

  "sucess": "user is deleted"

}
```
## Delete Availability in Given Date

### Request

`DELETE api/available-slots/:date`


http://localhost:5000/api/available-slots/2024-04-15

https://salon-backend-koay.onrender.com/available-slots/2024-04-15

### Response
```json
  {

  "sucess": "data is deleted"

}
```
## Users slot Delete

### Request

`DELETE /api/booking/deleteusersslot


http://localhost:5000/api/booking/deleteusersslot

https://salon-backend-koay.onrender.com/api/booking/deleteusersslot

#### 'HTTP header'
`Content-Type:application/json`

`auth-token:asdjhadtewwggcfyugeyfgcvydutfev`

#### Body
```json
{

  "date":"2024-04-15",

   "slot": 

        {
          "start": "09:52:00",
          "end": "09:45:00"
        }

}
```
### Response
```json
  {

  "sucess": "slot is deleted"

}

```
  
